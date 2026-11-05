// components/ui/landlord/buildings/LocationPickerModal.tsx
import { Feather, Ionicons } from "@expo/vector-icons";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal, Portal } from "react-native-paper";

interface LocationPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onPickCurrentLocation: () => void;
  onPickFromMap: () => void;
}

export function LocationPickerModal({
  visible,
  onClose,
  onPickCurrentLocation,
  onPickFromMap,
}: LocationPickerModalProps) {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        dismissable={true}
        style={styles.modalOverlay}
        contentContainerStyle={styles.sheetContainer}
      >
        {/* Top Drag Handle Accent Line */}
        <View style={styles.topHandleBar} />

        {/* Close Button Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={onClose}
            style={styles.closeButton}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Buttons Action Workspace Container */}
        <View style={styles.contentContainer}>
          {/* Button 1: Pick Current Location */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onPickCurrentLocation}
            activeOpacity={0.8}
          >
            <Ionicons
              name="location"
              size={20}
              color="#85C1E9"
              style={styles.btnIcon}
            />
            <Text style={styles.btnText}>Pick current location</Text>
          </TouchableOpacity>

          {/* Button 2: Pick From Map */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onPickFromMap}
            activeOpacity={0.8}
          >
            <Feather
              name="map"
              size={18}
              color="#85C1E9"
              style={styles.btnIcon}
            />
            <Text style={styles.btnText}>Pick from map</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  sheetContainer: {
    backgroundColor: "#034863", // Dark corporate teal matching your screen assets precisely [image_0cJ1Pm.png]
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 34 : 24,
  },
  topHandleBar: {
    width: 44,
    height: 5,
    backgroundColor: "#1C2D37",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 8,
    opacity: 0.6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  closeButton: {
    padding: 4,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 16,
    alignItems: "center",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1C2534", // Inset matching dark buttons background [image_0cJ1Pm.png]
    width: "80%",
    maxWidth: 280,
    borderRadius: 8,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#242F42",
    ...Platform.select({
      web: { cursor: "pointer", userSelect: "none" },
    }),
  },
  btnIcon: {
    marginRight: 12,
  },
  btnText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
