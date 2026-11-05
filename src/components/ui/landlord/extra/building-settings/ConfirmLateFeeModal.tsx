import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Modal as PaperModal, Portal } from "react-native-paper";

interface ConfirmLateFeeModalProps {
  isVisible: boolean;
  onCancel: () => void;
  onYes: () => void;
}

export default function ConfirmLateFeeModal({
  isVisible,
  onCancel,
  onYes,
}: ConfirmLateFeeModalProps) {
  return (
    <Portal>
      <PaperModal
        visible={isVisible}
        onDismiss={onCancel}
        contentContainerStyle={styles.paperOverride}
      >
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Add late payment fee</Text>
          <Text style={styles.modalMessage}>
            Add late payment fee to this building terms and conditions.
          </Text>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.textButton} onPress={onCancel}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.textButton} onPress={onYes}>
              <Text style={styles.btnText}>Yes</Text>
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
    borderRadius: 28,
    padding: 24,
  },
  modalTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 16,
    textAlign: "center",
  },
  modalMessage: {
    color: "#cbd5e1",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 32,
    textAlign: "center",
  },
  actionRow: { flexDirection: "row", justifyContent: "flex-end", gap: 28 },
  textButton: { paddingVertical: 4 },
  btnText: { color: "#4fa3f7", fontSize: 15, fontWeight: "600" },
});
