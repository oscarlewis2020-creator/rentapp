import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  // Alert,
  Modal,
  StyleSheet,
  // Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import ConfirmDialog from "./ConfirmDialog";

import { colors, type } from "@/constants/typography";
import {
  DIALOG_ACCENT,
  DIALOG_HIT_SLOP,
  dialogStyles as s,
} from "./dialogStyles";

interface Props {
  visible: boolean;
  isEnabled: boolean;
  onEnabled: (timeout: number) => void;
  onClose: () => void;
}

const LOCK_OPTIONS = [5, 15, 30, 60];

export default function BiometricsSettings({
  visible,
  isEnabled,
  onEnabled,
  onClose,
}: Props) {
  const [selectedTime, setSelectedTime] = useState(5);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState<{
    title: string;
    text: string;
  } | null>(null);

  // Show after the biometrics modal has finished closing, so two modals never overlap
  const showMessage = (title: string, text: string) => {
    setTimeout(() => setMessage({ title, text }), 300);
  };

  useEffect(() => {
    if (!visible) return;
    const loadSettings = async () => {
      try {
        const savedTimeout =
          await SecureStore.getItemAsync("biometrics_timeout");
        setSelectedTime(savedTimeout ? Number(savedTimeout) : 5);
      } catch (error) {
        console.log("Error loading biometric settings:", error);
      }
    };
    void loadSettings();
  }, [visible]);

  // Enable biometric authentication
  const enableBiometrics = async () => {
    try {
      setLoading(true);

      const hasHardware = await LocalAuthentication.hasHardwareAsync();

      if (!hasHardware) {
        onClose();
        showMessage(
          "Unavailable",
          "Your device does not support biometric authentication.",
        );

        return;
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!isEnrolled) {
        onClose();
        showMessage(
          "No Biometrics Registered",
          "Please register your fingerprint or face in your device settings.",
        );
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: isEnabled
          ? "Confirm to change auto-lock"
          : "Enable RentHub Biometrics",
        cancelLabel: "Cancel",
      });

      if (!result.success) {
        return;
      }

      await SecureStore.setItemAsync("biometrics_enabled", "true");

      await SecureStore.setItemAsync(
        "biometrics_timeout",
        selectedTime.toString(),
      );

      onEnabled(selectedTime);
      onClose();

      showMessage(
        "Success",
        isEnabled
          ? "Auto-lock time updated!"
          : "Biometric authentication enabled successfully!",
      );
    } catch (error) {
      console.log("Error enabling biometrics:", error);
      onClose();
      showMessage(
        "Authentication Error",
        "Unable to enable biometric authentication.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        <View style={s.overlay}>
          <View style={s.container}>
            <Text style={s.title}>
              {isEnabled ? "Auto-lock time" : "Enable Biometrics"}
            </Text>

            <Text style={s.message}>
              {isEnabled
                ? "Choose how long RentHub can stay in the background before it locks."
                : "Would you like to enable biometric authentication to lock RentHub for enhanced security? When enabled, you'll need to use fingerprint, face or other unique identifiers to open RentHub."}
            </Text>

            <Text style={styles.sectionTitle}>Auto-lock after:</Text>

            {LOCK_OPTIONS.map((time) => (
              <TouchableOpacity
                key={time}
                style={styles.option}
                onPress={() => setSelectedTime(time)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.radioOuter,
                    selectedTime === time && styles.radioSelected,
                  ]}
                >
                  {selectedTime === time && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.optionText}>{time} seconds</Text>
              </TouchableOpacity>
            ))}

            <View style={s.buttons}>
              <TouchableOpacity
                disabled={loading}
                onPress={onClose}
                hitSlop={DIALOG_HIT_SLOP}
              >
                <Text style={s.actionText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={loading}
                onPress={enableBiometrics}
                hitSlop={DIALOG_HIT_SLOP}
              >
                {loading ? (
                  <ActivityIndicator color={DIALOG_ACCENT} />
                ) : (
                  <Text style={s.actionText}>
                    {isEnabled ? "Save" : "Proceed"}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ConfirmDialog
        visible={message !== null}
        title={message?.title ?? ""}
        message={message?.text ?? ""}
        confirmLabel="OK"
        onConfirm={() => setMessage(null)}
        onCancel={() => setMessage(null)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    ...type.body,
    color: colors.textPrimary,
    marginBottom: 20,
  },
  option: { flexDirection: "row", alignItems: "center", marginBottom: 25 },
  radioOuter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.radioBorder,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  radioSelected: { borderColor: colors.accent },
  radioInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.accent,
  },
  optionText: { ...type.body, color: colors.textPrimary },
});
