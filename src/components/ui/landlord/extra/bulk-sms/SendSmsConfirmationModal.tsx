import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal as PaperModal, Portal } from "react-native-paper";

interface SendSmsConfirmationModalProps {
  isVisible: boolean;
  onCancel: () => void;
  onSend: () => void;
  onShowRecipientsInfo?: () => void;
}

export default function SendSmsConfirmationModal({
  isVisible,
  onCancel,
  onSend,
  onShowRecipientsInfo = () =>
    console.log("Show detailed recipient information stream"),
}: SendSmsConfirmationModalProps) {
  return (
    <Portal>
      <PaperModal
        visible={isVisible}
        onDismiss={onCancel}
        contentContainerStyle={styles.paperModalOverride}
      >
        <View style={styles.modalBackdropScrim}>
          <View style={styles.modalContainerCard}>
            <Text style={styles.modalTitleText}>Send SMS</Text>

            <Text style={styles.modalBodyMessageText}>
              Are you sure you want to send this SMS? This will send the message
              to 0 tenants.
            </Text>

            <TouchableOpacity
              style={styles.infoLinkButton}
              onPress={onShowRecipientsInfo}
              activeOpacity={0.7}
            >
              <Text style={styles.infoLinkButtonText}>
                Show recipients info
              </Text>
            </TouchableOpacity>

            <View style={styles.modalActionRow}>
              <TouchableOpacity
                style={styles.actionTextButton}
                onPress={onCancel}
              >
                <Text style={styles.cancelActionBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionTextButton}
                onPress={onSend}
              >
                <Text style={styles.sendActionBtnText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </PaperModal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  paperModalOverride: {
    margin: 0,
    padding: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackdropScrim: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  modalContainerCard: {
    width: "100%",
    maxWidth: 320,
    backgroundColor: "#1c2431", // Dark blue slate from screenshot
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    ...Platform.select({
      web: {
        boxShadow: "0px 10px 25px rgba(0,0,0,0.5)",
      },
    }),
  },
  modalTitleText: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 16,
    textAlign: "center",
  },
  modalBodyMessageText: {
    color: "#cbd5e1",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
    textAlign: "center",
  },
  infoLinkButton: {
    paddingVertical: 4,
    marginBottom: 32,
    ...Platform.select({
      web: { cursor: "pointer" },
    }),
  },
  infoLinkButtonText: {
    color: "#4fa3f7",
    fontSize: 15,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  modalActionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    gap: 24,
    paddingRight: 8,
  },
  actionTextButton: {
    paddingVertical: 6,
    paddingHorizontal: 4,
    ...Platform.select({
      web: { cursor: "pointer" },
    }),
  },
  cancelActionBtnText: {
    color: "#4fa3f7",
    fontSize: 15,
    fontWeight: "600",
  },
  sendActionBtnText: {
    color: "#4fa3f7",
    fontSize: 15,
    fontWeight: "600",
  },
});
