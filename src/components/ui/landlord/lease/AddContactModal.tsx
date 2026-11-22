// components/ui/landlord/lease/AddContactModal.tsx
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Platform, StyleSheet, TextInput, View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

export interface EmergencyContactItem {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

interface AddContactModalProps {
  visible: boolean;
  onCancel: () => void;
  onAddContact: (contact: EmergencyContactItem) => void;
}

export default function AddContactModal({
  visible,
  onCancel,
  onAddContact,
}: AddContactModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (visible) {
      setName("");
      setPhone("");
      setEmail("");
      setErrorMsg("");
    }
  }, [visible]);

  const handleAdd = () => {
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName || !trimmedPhone) {
      setErrorMsg("Please enter both contact name and phone number.");
      return;
    }

    onAddContact({
      id: `contact-${Date.now()}`,
      name: trimmedName,
      phone: trimmedPhone.startsWith("+254")
        ? trimmedPhone
        : `+254${trimmedPhone.replace(/^0/, "")}`,
      email: email.trim() || undefined,
    });
  };

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onCancel}
        style={styles.dialogContainer}
      >
        <Dialog.Title style={styles.title}>Add new account</Dialog.Title>

        <Dialog.Content style={styles.content}>
          <Text style={styles.subtitle}>
            Please provide the name, phone number and optionally an email.
          </Text>

          {/* Contact Name */}
          <View style={styles.inputBox}>
            <Ionicons name="person" size={20} color="#94A3B8" />
            <TextInput
              value={name}
              onChangeText={(val) => {
                setName(val);
                if (errorMsg) setErrorMsg("");
              }}
              placeholder="Contact name"
              placeholderTextColor="#94A3B8"
              style={styles.inputField}
            />
          </View>

          {/* +254 Contact Phone */}
          <View style={styles.phoneRow}>
            <View style={styles.countryCodeBox}>
              <Text style={styles.flagText}>🇰🇪</Text>
              <Text style={styles.codeText}>+254</Text>
            </View>
            <View style={styles.phoneInputBox}>
              <TextInput
                value={phone}
                onChangeText={(val) => {
                  setPhone(val);
                  if (errorMsg) setErrorMsg("");
                }}
                placeholder="Contact phone"
                placeholderTextColor="#94A3B8"
                keyboardType="phone-pad"
                style={styles.inputField}
              />
            </View>
          </View>

          {/* Email (optional) */}
          <View style={styles.inputBox}>
            <MaterialCommunityIcons name="email" size={20} color="#94A3B8" />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email (optional)"
              placeholderTextColor="#94A3B8"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.inputField}
            />
          </View>

          {!!errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
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
            onPress={handleAdd}
            labelStyle={styles.btnLabel}
            textColor="#7BC4FA"
            rippleColor="rgba(123, 196, 250, 0.15)"
          >
            Add account
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
  subtitle: {
    color: "#E2E8F0",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 2,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#8A8F98",
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  countryCodeBox: {
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
  phoneInputBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#8A8F98",
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  inputField: {
    flex: 1,
    color: "#F8FAFC",
    fontSize: 16,
    paddingVertical: 4,
  },
  errorText: {
    color: "#F87171",
    fontSize: 13,
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
