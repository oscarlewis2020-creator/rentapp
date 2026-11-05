import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal as PaperModal, Portal } from "react-native-paper";

interface LandlordContactsModalProps {
  isVisible: boolean;
  onCancel: () => void;
  onSave: (email: string, phone: string) => void;
}

export default function LandlordContactsModal({
  isVisible,
  onCancel,
  onSave,
}: LandlordContactsModalProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <Portal>
      <PaperModal
        visible={isVisible}
        onDismiss={onCancel}
        contentContainerStyle={styles.paperOverride}
      >
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Landlord Contacts</Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="mail"
              size={20}
              color="#4fa3f7"
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#8a94a6"
              style={styles.textInput}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.phoneRowContainer}>
            <View style={styles.countryCodeBadge}>
              <Text style={styles.flagEmoji}>🇰🇪</Text>
              <Text style={styles.codeText}>+254</Text>
            </View>
            <View style={styles.phoneInputWrapper}>
              <TextInput
                placeholder="phone number"
                placeholderTextColor="#8a94a6"
                style={styles.textInput}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.textButton} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.textButton}
              onPress={() => onSave(email, phone)}
            >
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </PaperModal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  paperOverride: { flex: 1, justifyContent: "center", alignItems: "center" },
  modalCard: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: "#1c2431",
    borderRadius: 24,
    padding: 24,
  },
  modalTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 24,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#343e50",
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 14,
    marginBottom: 16,
    backgroundColor: "#161c24",
  },
  inputIcon: { marginRight: 12 },
  textInput: {
    flex: 1,
    color: "#ffffff",
    fontSize: 16,
    ...Platform.select({ web: { outlineStyle: "none" } as any }),
  },
  phoneRowContainer: { flexDirection: "row", gap: 12, marginBottom: 32 },
  countryCodeBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#343e50",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#161c24",
    height: 50,
  },
  flagEmoji: { fontSize: 18, marginRight: 6 },
  codeText: { color: "#ffffff", fontSize: 15, fontWeight: "500" },
  phoneInputWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#343e50",
    borderRadius: 8,
    paddingHorizontal: 14,
    backgroundColor: "#161c24",
    height: 50,
    justifyContent: "center",
  },
  actionRow: { flexDirection: "row", justifyContent: "flex-end", gap: 24 },
  textButton: { paddingVertical: 6, paddingHorizontal: 4 },
  cancelText: { color: "#4fa3f7", fontSize: 16, fontWeight: "600" },
  saveText: { color: "#4fa3f7", fontSize: 16, fontWeight: "600" },
});
