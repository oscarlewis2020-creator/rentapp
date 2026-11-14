// app/(tabs)/settings.tsx
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Switch } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

// Central Hooks and Actions
import { useAppDispatch, useAppSelector } from "../../hooks";
import { logOutUser } from "../../store/authSlice";

// Shared Reusable UI Components
import BiometricsSettings from "../../components/ui/settings/BiometricsSettings";
import { ConfirmSignOutModal } from "../../components/ui/settings/ConfirmSignoutModal";
import { ProfileHeader } from "../../components/ui/settings/ProfileHeader";
import { SettingsItem } from "../../components/ui/settings/SettingsItem";

export default function GenericSettingsScreen() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { currentRole } = useAppSelector((state) => state.role);

  // Toggle state trackers
  const [isDefaultUser, setIsDefaultUser] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isBiometricSecure, setIsBiometricSecure] = useState(false);
  const [signOutModalVisible, setSignOutModalVisible] = useState(false);
  const [showBiometrics, setShowBiometrics] = useState(false);
  const [biometricTimeout, setBiometricTimeout] = useState<number | null>(null);

  // Making the biometrics stored value the single source of truth
  useEffect(() => {
    if (Platform.OS === "web") return; // Web does not support SecureStore
    (async () => {
      try {
        const enabled = await SecureStore.getItemAsync("biometrics_enabled");
        const timeout = await SecureStore.getItemAsync("biometrics_timeout");
        setIsBiometricSecure(enabled === "true");
        setBiometricTimeout(timeout ? Number(timeout) : null);
      } catch (e) {
        console.log("Error loading biometrics setting:", e);
      }
    })();
  }, []);

  //switch off handler for biometrics
  const handleBiometricToggle = async (next: boolean) => {
    if (next) {
      setShowBiometrics(true);
      return;
    }

    // Turning off: require authentication first
    try {
      const enrolled = await LocalAuthentication.isEnrolledAsync();

      // If the user removed all biometrics/passcode from the device,
      // they could never pass the prompt, so let them disable it
      if (enrolled) {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: "Confirm to disable RentHub biometrics",
          cancelLabel: "Cancel",
        });
        if (!result.success) return; // switch stays on
      }

      await SecureStore.deleteItemAsync("biometrics_enabled");
      await SecureStore.deleteItemAsync("biometrics_timeout");
      setIsBiometricSecure(false);
      setBiometricTimeout(null);
    } catch (error) {
      console.log("Error disabling biometrics:", error);
      Alert.alert("Error", "Unable to disable biometric authentication.");
    }
  };

  // Capitalize active role text for display purposes
  const formattedRole =
    currentRole.charAt(0).toUpperCase() + currentRole.slice(1);

  // Execution call when the user clicks 'Proceed' inside our layout alert window box
  const handleFinalSignOut = async () => {
    setSignOutModalVisible(false);

    // Clear biometric lock settings so the next person on this device starts fresh
    try {
      await SecureStore.deleteItemAsync("biometrics_enabled");
      await SecureStore.deleteItemAsync("biometrics_timeout");
    } catch (error) {
      console.log("Error clearing biometric settings:", error);
    }

    // 1. Wipe credentials token values across store and local storage layers
    await dispatch(logOutUser());

    // 2. Safely jump directly back to the welcome public stack screen loop boundary
    router.replace("/welcome-screen" as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 💡 FIXED TOP LAYER: Profile Header stays anchored here outside the ScrollView */}
      <View style={styles.stickyHeaderContainer}>
        <ProfileHeader
          name="Stanley Brandon"
          phone="+254 715 176 103"
          email="stanleybrandon606@gmail.com"
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ================= GENERAL SUBSECTION ================= */}
        <Text style={styles.sectionTitle}>GENERAL</Text>
        <View style={styles.sectionBlock}>
          <SettingsItem
            icon={
              <MaterialCommunityIcons
                name="swap-horizontal"
                size={22}
                color="#85C1E9"
              />
            }
            label={`Default user: ${formattedRole}`}
            rightElement={
              <Switch
                value={isDefaultUser}
                onValueChange={setIsDefaultUser}
                color="#00A884"
              />
            }
          />
          <SettingsItem
            icon={
              <MaterialCommunityIcons
                name="theme-light-dark"
                size={22}
                color="#85C1E9"
              />
            }
            label="Dark mode"
            rightElement={
              <Switch
                value={isDarkMode}
                onValueChange={setIsDarkMode}
                color="#00A884"
              />
            }
          />

          <SettingsItem
            icon={
              <Ionicons name="lock-closed-outline" size={20} color="#85C1E9" />
            }
            label="Secure with biometric"
            sublabel={
              isBiometricSecure && biometricTimeout
                ? `Auto-lock after ${biometricTimeout} seconds`
                : undefined
            }
            onPress={() => setShowBiometrics(true)}
            rightElement={
              <Switch
                value={isBiometricSecure}
                onValueChange={handleBiometricToggle}
                color="#00A884"
              />
            }
          />

          <SettingsItem
            icon={
              <Ionicons
                name="notifications-outline"
                size={22}
                color="#85C1E9"
              />
            }
            label="Manage notifications"
            onPress={() => console.log("Open notify settings")}
          />
          <SettingsItem
            icon={<Ionicons name="refresh-outline" size={22} color="#85C1E9" />}
            label="Refresh data"
            onPress={() => console.log("Refresh app records cache")}
          />
        </View>

        {/* ================= INFO SUBSECTION ================= */}
        <Text style={styles.sectionTitle}>INFO</Text>
        <View style={styles.sectionBlock}>
          <SettingsItem
            icon={<Ionicons name="school-outline" size={22} color="#85C1E9" />}
            label="Tutorials"
            onPress={() => console.log("Open tutorials")}
          />
          <SettingsItem
            icon={<Ionicons name="chatbox-outline" size={22} color="#85C1E9" />}
            label="Share feedback"
            onPress={() => console.log("Open feedback form")}
          />
          <SettingsItem
            icon={
              <Ionicons name="help-circle-outline" size={22} color="#85C1E9" />
            }
            label="Help center"
            onPress={() => console.log("Open help links")}
          />
          <SettingsItem
            icon={
              <Ionicons
                name="document-text-outline"
                size={22}
                color="#85C1E9"
              />
            }
            label="Privacy policy"
            onPress={() => console.log("Open legal texts")}
          />
          <SettingsItem
            icon={<Ionicons name="globe-outline" size={22} color="#85C1E9" />}
            label="Website"
            onPress={() => console.log("Launch portal website")}
          />
          <SettingsItem
            icon={<Ionicons name="link-outline" size={22} color="#85C1E9" />}
            label="Our Socials"
            onPress={() => console.log("Display social networks")}
          />
        </View>

        {/* ================= OTHER SUBSECTION ================= */}
        <Text style={styles.sectionTitle}>OTHER</Text>
        <View style={styles.sectionBlock}>
          <SettingsItem
            icon={<Ionicons name="folder-outline" size={22} color="#85C1E9" />}
            label="Chat download location"
            sublabel="Not yet set"
            onPress={() => console.log("Storage location")}
          />
          <SettingsItem
            icon={<Ionicons name="warning-outline" size={22} color="#FF4D4D" />}
            label="Delete account"
            destructive
            onPress={() => console.log("Account delete confirmation")}
          />
          <SettingsItem
            icon={
              <Ionicons name="cloud-upload-outline" size={22} color="#85C1E9" />
            }
            label="Back up chats"
            onPress={() => console.log("Sync cloud backups")}
          />
          <SettingsItem
            icon={
              <Ionicons
                name="cloud-download-outline"
                size={22}
                color="#85C1E9"
              />
            }
            label="Restore chats"
            onPress={() => console.log("Restore cloud files")}
          />
          <SettingsItem
            icon={<Ionicons name="log-out-outline" size={22} color="#85C1E9" />}
            label="Sign out"
            onPress={() => setSignOutModalVisible(true)}
          />
        </View>

        <Text style={styles.versionText}>Rent Hub 2.5.3 (137)</Text>
      </ScrollView>
      {/* 💡 INJECT CONTEXTUAL CONFIRM SIGN OUT OVERLAY MODAL SHEET HERE */}
      <ConfirmSignOutModal
        visible={signOutModalVisible}
        onClose={() => setSignOutModalVisible(false)}
        onBackupPress={() =>
          console.log("Run immediate preemptive chat sync sequence...")
        }
        onProceed={handleFinalSignOut}
      />

      <BiometricsSettings
        visible={showBiometrics}
        isEnabled={isBiometricSecure}
        onEnabled={(timeout) => {
          setIsBiometricSecure(true);
          setBiometricTimeout(timeout);
        }}
        onClose={() => setShowBiometrics(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121824",
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%",
    alignSelf: "center",
  },
  stickyHeaderContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: "#121824", // Blends with parent context canvas background color
    zIndex: 20, // Forces stack composition on top of scrolling lists on web browsers
  },
  scrollContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40 },
  sectionTitle: {
    color: "#9EA5B1",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  sectionBlock: {
    backgroundColor: "#1A2232",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#242F42",
    marginBottom: 20,
  },
  versionText: {
    color: "#7B889B",
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 12,
    marginBottom: 16,
  },
});
