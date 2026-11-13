import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal, Portal } from "react-native-paper";

interface UnsavedChangesModalProps {
  visible: boolean;
  onDiscard: () => void;
  onApply: () => void;
  onContinueEditing: () => void;
}

export function UnsavedChangesModal({
  visible,
  onDiscard,
  onApply,
  onContinueEditing,
}: UnsavedChangesModalProps) {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onContinueEditing}
        contentContainerStyle={styles.dialogContainer}
      >
        <View style={styles.dialogBox}>
          <Text style={styles.dialogTitle}>Unsaved changes</Text>
          <Text style={styles.dialogMessage}>
            We've noticed that you made some changes to the unit description
            using the Custom approach. Would you like to save these changes?
          </Text>

          <TouchableOpacity style={styles.dialogDiscardBtn} onPress={onDiscard}>
            <Text style={styles.dialogDiscardText}>Discard changes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.dialogApplyBtn} onPress={onApply}>
            <Text style={styles.dialogApplyText}>Apply changes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dialogContinueBtn}
            onPress={onContinueEditing}
          >
            <Text style={styles.dialogContinueText}>Continue editing</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialogContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 20,
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%",
    alignSelf: "center",
  },
  dialogBox: {
    backgroundColor: "#1E252D",
    borderRadius: 12,
    padding: 20,
    width: "100%",
    maxWidth: 400,
    borderWidth: 1,
    borderColor: "#334155",
  },
  dialogTitle: {
    color: "#F8FAFC",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  dialogMessage: {
    color: "#94A3B8",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  dialogDiscardBtn: {
    borderWidth: 1,
    borderColor: "#475569",
    borderRadius: 23,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  dialogDiscardText: { color: "#F8FAFC", fontSize: 14, fontWeight: "500" },
  dialogApplyBtn: {
    backgroundColor: "#7DD3FC",
    borderRadius: 23,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  dialogApplyText: { color: "#0F172A", fontSize: 14, fontWeight: "600" },
  dialogContinueBtn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  dialogContinueText: { color: "#7DD3FC", fontSize: 14, fontWeight: "500" },
});
