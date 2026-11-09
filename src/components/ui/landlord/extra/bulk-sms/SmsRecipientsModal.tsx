import { Ionicons } from "@expo/vector-icons";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal as PaperModal, Portal } from "react-native-paper";

interface SmsRecipientsModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function SmsRecipientsModal({
  isVisible,
  onClose,
}: SmsRecipientsModalProps) {
  return (
    <Portal>
      <PaperModal
        visible={isVisible}
        onDismiss={onClose}
        contentContainerStyle={styles.paperModalOverride}
      >
        <View style={styles.modalBackdropScrim}>
          <View style={styles.modalCardContainer}>
            {/* Top Sheet Notch Accent */}
            <View style={styles.sheetGrabber} />

            {/* Close absolute vector icon */}
            <TouchableOpacity style={styles.closeIconButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#ffffff" />
            </TouchableOpacity>

            <Text style={styles.modalMainTitle}>SMS recipients</Text>

            {/* Empty State Inner Content Container matching Image 1 */}
            <View style={styles.emptyStateBox}>
              <Text style={styles.emptyStateMessageText}>
                No tenants found for this property.
              </Text>
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
    justifyContent: "flex-end",
  },
  modalBackdropScrim: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },
  modalCardContainer: {
    width: "100%",
    maxWidth: 600,
    height: "52%",
    backgroundColor: "#034763", // High-fidelity dark slate blue overlay tone from image 1
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    alignSelf: "center",
    position: "relative",
  },
  sheetGrabber: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#1b5b75",
    alignSelf: "center",
    marginBottom: 8,
  },
  closeIconButton: {
    position: "absolute",
    top: 24,
    right: 24,
    padding: 4,
    zIndex: 10,
    ...Platform.select({ web: { cursor: "pointer" } }),
  },
  modalMainTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  emptyStateBox: {
    backgroundColor: "#111922", // Internal pure dark listing backdrop card mask from capture
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginBottom: 10,
  },
  emptyStateMessageText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});
