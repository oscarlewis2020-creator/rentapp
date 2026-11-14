import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  // Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";

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
    loadSettings();
  }, [visible]);

  // Enable biometric authentication
  const enableBiometrics = async () => {
    try {
      setLoading(true);

      const hasHardware = await LocalAuthentication.hasHardwareAsync();

      if (!hasHardware) {
        Alert.alert(
          "Unavailable",
          "Your device does not support biometric authentication.",
        );
        return;
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!isEnrolled) {
        Alert.alert(
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

      Alert.alert(
        "Success",
        isEnabled
          ? "Auto-lock time updated!"
          : "Biometric authentication enabled successfully!",
      );
    } catch (error) {
      Alert.alert(
        "Authentication Error",
        "Unable to enable biometric authentication.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Biometric Activation Modal */}

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {isEnabled ? "Auto-lock time" : "Enable Biometrics"}
            </Text>

            <Text style={styles.description}>
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

            <View style={styles.buttons}>
              <TouchableOpacity disabled={loading} onPress={() => onClose()}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity disabled={loading} onPress={enableBiometrics}>
                {loading ? (
                  <ActivityIndicator color="#75CCF5" />
                ) : (
                  <Text style={styles.proceedText}>
                    {isEnabled ? "Save" : "Proceed"}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  modalContainer: {
    width: "100%",
    maxWidth: 450,
    backgroundColor: "#223138",
    borderRadius: 45,
    paddingHorizontal: 30,
    paddingVertical: 45,
  },

  modalTitle: {
    color: "#EAECEE",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 40,
  },

  description: {
    color: "#E1E5E7",
    fontSize: 17,
    lineHeight: 27,
    marginBottom: 25,
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    marginBottom: 20,
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },

  radioOuter: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#B5C2C8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 18,
  },

  radioSelected: {
    borderColor: "#75CCF5",
  },

  radioInner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#75CCF5",
  },

  optionText: {
    color: "#E1E5E7",
    fontSize: 17,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 45,
    marginTop: 35,
  },

  cancelText: {
    color: "#75CCF5",
    fontSize: 17,
  },

  proceedText: {
    color: "#75CCF5",
    fontSize: 17,
  },
});
