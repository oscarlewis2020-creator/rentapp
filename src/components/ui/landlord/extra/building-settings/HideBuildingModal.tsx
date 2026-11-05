import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal as PaperModal, Portal } from "react-native-paper";

interface HideBuildingModalProps {
  isVisible: boolean;
  buildingName: string;
  onCancel: () => void;
  onProceed: () => void;
}

export default function HideBuildingModal({
  isVisible,
  buildingName,
  onCancel,
  onProceed,
}: HideBuildingModalProps) {
  return (
    <Portal>
      <PaperModal
        visible={isVisible}
        onDismiss={onCancel}
        // contentContainerStyle needs to define transparent background
        // to let the custom centering container background overlay handle alignment layout
        contentContainerStyle={styles.paperModalContentOverride}
      >
        <View style={styles.modalBackdropScrim}>
          <View style={styles.modalContainerCard}>
            <Text style={styles.modalTitleText}>Hide building</Text>
            <Text style={styles.modalBodyMessageText}>
              Are you sure you want to hide the building - {buildingName} from
              the public ?
            </Text>

            <View style={styles.modalActionRow}>
              <TouchableOpacity
                style={styles.modalTextButton}
                onPress={onCancel}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelActionBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalTextButton}
                onPress={onProceed}
                activeOpacity={0.7}
              >
                <Text style={styles.proceedActionBtnText}>Proceed</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </PaperModal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  paperModalContentOverride: {
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
    maxWidth: 340,
    backgroundColor: "#1c2431",
    borderRadius: 28,
    padding: 24,
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
    marginBottom: 32,
    textAlign: "center",
  },
  modalActionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 24,
  },
  modalTextButton: {
    paddingVertical: 8,
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
  proceedActionBtnText: {
    color: "#4fa3f7",
    fontSize: 15,
    fontWeight: "600",
  },
});
