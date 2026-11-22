// components/ui/landlord/lease/EditTenantPhoneModal.tsx
import { useEffect, useState } from "react";
import { Platform, StyleSheet, TextInput, View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

interface EditTenantPhoneModalProps {
  visible: boolean;
  tenantName: string;
  initialPhone?: string;
  initialSecondaryPhone?: string;
  onCancel: () => void;
  onSave: (payload: { phone: string; secondaryPhone?: string }) => void;
}

export default function EditTenantPhoneModal({
  visible,
  tenantName,
  initialPhone = "723568974",
  initialSecondaryPhone = "",
  onCancel,
  onSave,
}: EditTenantPhoneModalProps) {
  const [phone, setPhone] = useState(initialPhone);
  const [secondaryPhone, setSecondaryPhone] = useState(initialSecondaryPhone);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (visible) {
      setPhone(initialPhone);
      setSecondaryPhone(initialSecondaryPhone);
      setErrorMsg("");
    }
  }, [visible, initialPhone, initialSecondaryPhone]);

  const handleSave = () => {
    if (!phone.trim()) {
      setErrorMsg("Primary phone number is required.");
      return;
    }
    onSave({
      phone: phone.trim(),
      secondaryPhone: secondaryPhone.trim() || undefined,
    });
  };

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onCancel}
        style={styles.dialogContainer}
      >
        <Dialog.Title style={styles.title}>
          Update {tenantName} phone no.
        </Dialog.Title>

        <Dialog.Content style={styles.content}>
          {/* Primary Phone */}
          <View style={styles.phoneRow}>
            <View style={styles.codeBox}>
              <Text style={styles.flagText}>🇰🇪</Text>
              <Text style={styles.codeText}>+254</Text>
            </View>
            <View
              style={[styles.inputBox, errorMsg ? styles.inputError : null]}
            >
              <TextInput
                value={phone}
                onChangeText={(val) => {
                  setPhone(val);
                  if (errorMsg) setErrorMsg("");
                }}
                placeholder="723568974"
                placeholderTextColor="#94A3B8"
                keyboardType="phone-pad"
                style={styles.inputField}
              />
            </View>
          </View>

          {!!errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

          {/* Optional Secondary Phone */}
          <View style={styles.secondaryWrapper}>
            <Text style={styles.optionalLabel}>Optional</Text>
            <View style={styles.phoneRow}>
              <View style={styles.codeBox}>
                <Text style={styles.flagText}>🇰🇪</Text>
                <Text style={styles.codeText}>+254</Text>
              </View>
              <View style={styles.inputBox}>
                <TextInput
                  value={secondaryPhone}
                  onChangeText={setSecondaryPhone}
                  placeholder="Secondary Phone"
                  placeholderTextColor="#94A3B8"
                  keyboardType="phone-pad"
                  style={styles.inputField}
                />
              </View>
            </View>
          </View>
        </Dialog.Content>

        <Dialog.Actions style={styles.actions}>
          <Button
            onPress={onCancel}
            labelStyle={styles.btnLabel}
            textColor="#7BC4FA"
            rippleColor="rgba(123, 196, 250, 0.15)"
          >
            Cancel
          </Button>
          <Button
            onPress={handleSave}
            labelStyle={styles.btnLabel}
            textColor="#7BC4FA"
            rippleColor="rgba(123, 196, 250, 0.15)"
          >
            Save
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialogContainer: {
    backgroundColor: "#202429",
    borderRadius: 22,
    width: Platform.OS === "web" ? "90%" : "88%",
    maxWidth: 420,
    alignSelf: "center",
  },
  title: {
    color: "#F8FAFC",
    fontSize: 22,
    fontWeight: "600",
    marginTop: 8,
  },
  content: {
    paddingHorizontal: 18,
    gap: 14,
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  codeBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "#8A8F98",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  flagText: {
    fontSize: 16,
  },
  codeText: {
    color: "#E2E8F0",
    fontSize: 16,
    fontWeight: "500",
  },
  inputBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#8A8F98",
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  inputError: {
    borderColor: "#F87171",
  },
  inputField: {
    color: "#F8FAFC",
    fontSize: 16,
    paddingVertical: 4,
  },
  errorText: {
    color: "#F87171",
    fontSize: 13,
    marginTop: -6,
  },
  secondaryWrapper: {
    marginTop: 4,
    gap: 8,
  },
  optionalLabel: {
    color: "#E2E8F0",
    fontSize: 15,
    fontWeight: "500",
  },
  actions: {
    paddingHorizontal: 16,
    paddingBottom: 14,
    justifyContent: "flex-end",
    gap: 12,
  },
  btnLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
});
