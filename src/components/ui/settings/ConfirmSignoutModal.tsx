// components/ui/settings/ConfirmSignOutModal.tsx
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal, Portal } from "react-native-paper";

interface ConfirmSignOutModalProps {
  visible: boolean;
  onClose: () => void;
  onProceed: () => void;
  onBackupPress: () => void;
}

export function ConfirmSignOutModal({
  visible,
  onClose,
  onProceed,
  onBackupPress,
}: ConfirmSignOutModalProps) {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        dismissable={true}
        style={styles.modalOverlay}
        contentContainerStyle={styles.dialogCard}
      >
        {/* Modal Header Panel */}
        <Text style={styles.modalTitle}>Confirm sign out</Text>

        {/* Informative Description Callout */}
        <Text style={styles.descriptionText}>
          Signing out will clear everything, including chat messages. However,
          all data except chat messages will be retrieved during backup. You can
          back up your chat messages to Google Drive. Are you sure you want to
          proceed?
        </Text>

        {/* Backup Shortcut Anchor Action Link */}
        <TouchableOpacity
          style={styles.backupLinkButton}
          onPress={onBackupPress}
          activeOpacity={0.7}
        >
          <Text style={styles.backupLinkText}>Backup Chats before log out</Text>
        </TouchableOpacity>

        {/* Lower Dialog Action Buttons Tray Layout */}
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity style={styles.textButton} onPress={onClose}>
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.textButton} onPress={onProceed}>
            <Text style={styles.proceedBtnText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.65)", // Semi-transparent overlay dim level matching layout image
  },
  dialogCard: {
    backgroundColor: "#1B2A34", // True gray-teal matte card background surface match
    width: "88%",
    maxWidth: Platform.OS === "web" ? 440 : "100%", // Responsive wide monitor capping limits
    borderRadius: 24, // Premium rounded block borders matching your screenshot UI assets
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 24,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  modalTitle: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 18,
  },
  descriptionText: {
    color: "#CFD8DC", // Balanced high-readability off-white tint
    fontSize: 15,
    lineHeight: 22,
    textAlign: "left",
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  backupLinkButton: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 4,
    marginBottom: 28,
  },
  backupLinkText: {
    color: "#85C1E9", // Light cyan sky blue accent link text color match
    fontSize: 15,
    fontWeight: "600",
  },
  actionButtonsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 28,
    paddingRight: 4,
  },
  textButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  cancelBtnText: {
    color: "#85C1E9",
    fontSize: 16,
    fontWeight: "600",
  },
  proceedBtnText: {
    color: "#85C1E9",
    fontSize: 16,
    fontWeight: "600",
  },
});
