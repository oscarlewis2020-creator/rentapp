import { colors, type } from "@/constants/typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  // Alert,
  AppState,
  BackHandler,
  Linking,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Snackbar, Switch } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import ConfirmDialog from "./ConfirmDialog";

type CategoryKey =
  | "property"
  | "unit"
  | "payment"
  | "lease"
  | "permission"
  | "tenant"
  | "rates"
  | "wallet"
  | "inventory_item"
  | "inventory_item_tracker";

type Prefs = Record<CategoryKey, boolean>;

type DialogConfig = {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm?: () => void;
};

const CATEGORIES: {
  key: CategoryKey;
  title: string;
  description: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  warning?: string; //categories that are risky to switch off
}[] = [
  {
    key: "property",
    title: "Property",
    description:
      "Receive notifications for updates to property details, terms, late payment fees, and security deposits.",
    icon: "home-outline",
  },
  {
    key: "unit",
    title: "Unit",
    description:
      "Enable notifications for changes to unit information, such as amenities and labels.",
    icon: "office-building-outline",
  },
  {
    key: "payment",
    title: "Payment",
    description:
      "Receive notifications for payment activities, including new, approved, rejected, or canceled payments.",
    icon: "credit-card-outline",
    warning:
      "Turning this off means you may miss important payment updates, including payment confirmations, rejected payments, canceled payments, and failed transactions.",
  },
  {
    key: "lease",
    title: "Lease",
    description:
      "Enable notifications for lease actions, including new, approved, rejected, or canceled leases.",
    icon: "file-document-outline",
  },
  {
    key: "permission",
    title: "Permission",
    description:
      "Receive notifications related to permission changes, approvals, and requests for user access.",
    icon: "account-check-outline",
  },
  {
    key: "tenant",
    title: "Tenant",
    description:
      "Receive notifications for secondary tenant actions, including new, approved, rejected, or canceled additions.",
    icon: "account-outline",
  },
  {
    key: "rates",
    title: "Rates",
    description: "Get notified of any changes in rates across all leases.",
    icon: "chart-timeline-variant",
  },
  {
    key: "wallet",
    title: "Wallet",
    description:
      "Enable notifications for wallet-related automated payment statuses, including approvals, rejections, and failures.",
    icon: "wallet-outline",
    warning:
      "Turning this off means you may miss important wallet updates, including failed automatic payments, rejected transactions, and wallet activity.",
  },
  {
    key: "inventory_item",
    title: "Inventory Item",
    description:
      "Receive notifications when a property inventory item is added by other managers.",
    icon: "clipboard-list-outline",
  },
  {
    key: "inventory_item_tracker",
    title: "Inventory Item Tracker",
    description:
      "Get notified for updates on inventory items, including changes, update requests, and approvals.",
    icon: "playlist-edit",
  },
];

const buildPrefs = (value: boolean): Prefs =>
  Object.fromEntries(CATEGORIES.map((c) => [c.key, value])) as Prefs;

const STORAGE_KEY = "notification_prefs";

//TODO: Local-only for now. I'll swap these two bodies for API calls once the backend exists.
async function fetchPrefs(): Promise<Prefs> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return buildPrefs(true);
  try {
    // Merge over defaults so categories added later start switched on
    return { ...buildPrefs(true), ...JSON.parse(raw) };
  } catch {
    return buildPrefs(true);
  }
}

async function persistPrefs(prefs: Prefs): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

export default function ManageNotificationsScreen() {
  const router = useRouter();
  const [saved, setSaved] = useState<Prefs | null>(null);
  const [prefs, setPrefs] = useState<Prefs>(buildPrefs(true));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [savedToast, setSavedToast] = useState(false);
  const [dialog, setDialog] = useState<DialogConfig | null>(null);
  const closeDialog = () => setDialog(null);

  const [permission, setPermission] =
    useState<Notifications.PermissionStatus | null>(null);

  const checkPermission = useCallback(async () => {
    if (Platform.OS === "web") return;
    try {
      const { status } = await Notifications.getPermissionsAsync();
      setPermission(status);
    } catch (e) {
      console.log("Error checking notification permission:", e);
    }
  }, []);

  // Check on open, and again when the user comes back from system settings
  useEffect(() => {
    checkPermission();
    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active") void checkPermission();
    });
    return () => sub.remove();
  }, [checkPermission]);

  const handleAllowNotifications = async () => {
    try {
      if (permission === "undetermined") {
        // Step 1: Android channel (needed before the prompt on Android 13+)
        try {
          if (Platform.OS === "android") {
            await Notifications.setNotificationChannelAsync("default", {
              name: "default",
              importance: Notifications.AndroidImportance.DEFAULT,
            });
          }
        } catch (e) {
          console.log("Channel setup failed:", e);
        }

        // Step 2: the system permission prompt
        const result = await Notifications.requestPermissionsAsync();
        setPermission(result.status);
        return;
      }

      // Denied: the system won't ask again, so send them to settings
      await Linking.openSettings();
    } catch (e) {
      console.log("Permission request failed:", e);
      try {
        await Linking.openSettings();
      } catch {
        setDialog({
          title: "Couldn't change notification settings",
          message:
            "Open your phone's Settings, then Apps, Notifications, and allow notifications for this app.",
          confirmLabel: "OK",
        });
      }
    }
  };

  const loadPrefs = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    try {
      const p = await fetchPrefs();
      setSaved(p);
      setPrefs(p);
    } catch (e) {
      console.log("Error loading notification prefs:", e);
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPrefs();
  }, [loadPrefs]);

  const dirty =
    saved !== null && CATEGORIES.some((c) => prefs[c.key] !== saved[c.key]);
  const allEnabled = CATEGORIES.every((c) => prefs[c.key]);

  const leave = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/(tabs)/settings" as any);
  };

  const confirmDiscard = () => {
    setDialog({
      title: "Discard changes?",
      message: "You have unsaved changes.",
      confirmLabel: "Discard",
      cancelLabel: "Keep editing",
      destructive: true,
      onConfirm: leave,
    });
  };

  const handleBack = () => {
    if (dirty) confirmDiscard();
    else leave();
  };

  // Always holds the latest value, so the handler can never read a stale one
  const dirtyRef = useRef(false);
  useEffect(() => {
    dirtyRef.current = dirty;
  }, [dirty]);

  // Android hardware back button: only active while this screen is focused
  useFocusEffect(
    useCallback(() => {
      const sub = BackHandler.addEventListener("hardwareBackPress", () => {
        // console.log("hardware back pressed, dirty =", dirtyRef.current);
        if (dirtyRef.current) confirmDiscard();
        else leave();
        return true; // handled here
      });
      return () => sub.remove();
    }, []),
  );

  const handleSave = async () => {
    setSaveError(null);
    try {
      setSaving(true);
      await persistPrefs(prefs);
      setSaved(prefs);
      setSavedToast(true);
    } catch (error) {
      console.log("Error saving notification prefs:", error);
      setSaveError(
        "Couldn't save your changes. Check your connection and try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  const toggleAll = (next: boolean) => {
    setSaveError(null);

    if (!next) {
      const critical = CATEGORIES.filter((c) => c.warning && prefs[c.key]);
      if (critical.length > 0) {
        setDialog({
          title: "Turn off all notifications?",
          message: `This includes ${critical
            .map((c) => c.title)
            .join(
              " and ",
            )} alerts, which warn you about failed or rejected payments.`,
          confirmLabel: "Turn off all",
          cancelLabel: "Keep on",
          destructive: true,
          onConfirm: () => setPrefs(buildPrefs(false)),
        });
        return;
      }
    }

    setPrefs(buildPrefs(next));
  };

  const toggleOne = (key: CategoryKey, next: boolean) => {
    setSaveError(null);

    const category = CATEGORIES.find((c) => c.key === key);
    if (!next && category?.warning) {
      setDialog({
        title: `Turn off ${category.title} notifications?`,
        message: category.warning,
        confirmLabel: "Turn off",
        cancelLabel: "Keep on",
        destructive: true,
        onConfirm: () => setPrefs((prev) => ({ ...prev, [key]: false })),
      });
      return;
    }

    setPrefs((prev) => ({ ...prev, [key]: next }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={26}
              color="#EAECEE"
            />
          </TouchableOpacity>

          <View style={styles.headerText}>
            <Text style={styles.title}>Manage notification</Text>
            <Text style={styles.subtitle}>
              Enable or disable the notifications you would like to receive.
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.saveButton, dirty && styles.saveButtonActive]}
            disabled={!dirty || saving}
            onPress={handleSave}
            activeOpacity={0.7}
          >
            {saving ? (
              <ActivityIndicator color="#121824" />
            ) : (
              <>
                <MaterialCommunityIcons
                  name="content-save"
                  size={20}
                  color={dirty ? "#121824" : "#8A9199"}
                />
                <Text style={[styles.saveText, dirty && styles.saveTextActive]}>
                  Save
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <MaterialCommunityIcons name="bell" size={30} color="#75CCF5" />
          <View style={styles.rowText}>
            <Text style={styles.rowTitle}>All notifications</Text>
            <Text style={styles.rowDescription}>Enable all notifications</Text>
          </View>
          <Switch
            value={allEnabled}
            onValueChange={toggleAll}
            disabled={loading || loadError || saving}
            color="#00A884"
          />
        </View>
      </View>

      {permission !== null && permission !== "granted" && (
        <View style={styles.banner}>
          <MaterialCommunityIcons
            name="bell-off-outline"
            size={26}
            color="#F5B14C"
          />
          <View style={styles.bannerText}>
            <Text style={styles.bannerTitle}>
              Notifications are turned off on this device
            </Text>
            <Text style={styles.bannerBody}>
              You won't receive these alerts until you allow notifications for
              RentHub.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.bannerButton}
            onPress={handleAllowNotifications}
            activeOpacity={0.7}
          >
            <Text style={styles.bannerButtonText}>
              {permission === "undetermined" ? "Allow" : "Open settings"}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {saveError && (
        <View style={styles.saveErrorBanner}>
          <MaterialCommunityIcons
            name="alert-circle-outline"
            size={22}
            color="#FF9A9A"
          />
          <Text style={styles.saveErrorText}>{saveError}</Text>
        </View>
      )}

      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} color="#75CCF5" />
      ) : loadError ? (
        <View style={styles.errorBox}>
          <MaterialCommunityIcons
            name="alert-circle-outline"
            size={40}
            color="#F5B14C"
          />
          <Text style={styles.errorTitle}>
            Couldn't load your notification settings
          </Text>
          <Text style={styles.errorBody}>
            Check your connection and try again.
          </Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={loadPrefs}
            activeOpacity={0.7}
          >
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          {CATEGORIES.map((c) => (
            <View key={c.key} style={styles.row}>
              <MaterialCommunityIcons name={c.icon} size={28} color="#75CCF5" />
              <View style={styles.rowText}>
                <View style={styles.titleRow}>
                  <Text style={styles.rowTitle}>{c.title}</Text>
                  {c.warning && (
                    <Text style={styles.importantTag}>Important</Text>
                  )}
                </View>
                <Text style={styles.rowDescription}>{c.description}</Text>
              </View>
              <Switch
                value={prefs[c.key]}
                onValueChange={(v) => toggleOne(c.key, v)}
                disabled={saving}
                color="#00A884"
              />
            </View>
          ))}
        </ScrollView>
      )}

      <ConfirmDialog
        visible={dialog !== null}
        title={dialog?.title ?? ""}
        message={dialog?.message ?? ""}
        confirmLabel={dialog?.confirmLabel}
        cancelLabel={dialog?.cancelLabel}
        destructive={dialog?.destructive}
        onConfirm={() => {
          const action = dialog?.onConfirm;
          closeDialog();
          action?.();
        }}
        onCancel={closeDialog}
      />

      <Modal
        visible={saving}
        transparent
        animationType="fade"
        onRequestClose={() => {}}
      >
        <View style={styles.savingOverlay}>
          <View style={styles.savingCard}>
            <ActivityIndicator size="large" color="#75CCF5" />
            <Text style={styles.savingText}>Saving changes</Text>
          </View>
        </View>
      </Modal>

      <Snackbar
        visible={savedToast}
        onDismiss={() => setSavedToast(false)}
        duration={2500}
        style={styles.snackbar}
      >
        <Text style={styles.snackbarText}>Notification settings saved</Text>
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  backButton: { paddingVertical: 4, paddingRight: 14 },
  headerText: { flex: 1, paddingRight: 8 },
  title: { ...type.title, color: colors.textPrimary },
  subtitle: {
    ...type.sublabel,
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
    marginTop: 4,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 96,
    gap: 6,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  saveButtonActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  saveText: { ...type.label, color: colors.textMuted },
  saveTextActive: { color: colors.background },

  list: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 40 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 14,
  },
  rowText: { flex: 1 },
  rowTitle: { ...type.label, color: colors.textPrimary },
  rowDescription: {
    ...type.sublabel,
    color: colors.textMuted,
    lineHeight: 18,
    marginTop: 2,
  },

  banner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.warningBg,
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 12,
    padding: 12,
  },
  bannerText: { flex: 1 },
  bannerTitle: { ...type.label, fontSize: 14, color: "#F5D9A8" },
  bannerBody: {
    ...type.sublabel,
    color: "#D9C7A3",
    lineHeight: 18,
    marginTop: 2,
  },
  bannerButton: {
    borderWidth: 1,
    borderColor: colors.warning,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  bannerButtonText: { ...type.sublabel, color: colors.warning },

  saveErrorBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.dangerBg,
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 12,
    padding: 12,
  },
  saveErrorText: {
    ...type.sublabel,
    flex: 1,
    fontSize: 14,
    color: colors.dangerText,
    lineHeight: 20,
  },

  errorBox: { alignItems: "center", paddingHorizontal: 32, paddingTop: 60 },
  errorTitle: {
    ...type.body,
    color: colors.textPrimary,
    marginTop: 14,
    textAlign: "center",
  },
  errorBody: {
    ...type.sublabel,
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 6,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: 10,
    paddingHorizontal: 28,
    paddingVertical: 10,
  },
  retryText: { ...type.label, color: colors.accent },

  snackbar: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    marginHorizontal: 16,
  },
  snackbarText: { ...type.label, color: colors.textPrimary },

  savingOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    alignItems: "center",
    justifyContent: "center",
  },
  savingCard: {
    backgroundColor: colors.dialogCard,
    borderRadius: 28,
    paddingHorizontal: 36,
    paddingVertical: 28,
    alignItems: "center",
    gap: 16,
  },
  savingText: { ...type.body, color: colors.dialogTitle },

  titleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  importantTag: {
    ...type.sublabel,
    fontSize: 11,
    color: colors.warning,
    borderWidth: 1,
    borderColor: colors.warning,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 1,
  },
});
