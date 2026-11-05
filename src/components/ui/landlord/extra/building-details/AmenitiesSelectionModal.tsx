// components/ui/landlord/buildings/AmenitiesSelectionModal.tsx
import { Ionicons } from "@expo/vector-icons";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal, Portal } from "react-native-paper";

interface AmenitiesSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  selectedAmenities: string[];
  onAmenitiesChange: (amenities: string[]) => void;
}

const ALL_AMENITIES = [
  "High-speed internet access",
  "Backup power",
  "Swimming pool",
  "Parking",
  "Playground",
  "Fitness center",
  "Elevator",
];

export function AmenitiesSelectionModal({
  visible,
  onClose,
  selectedAmenities,
  onAmenitiesChange,
}: AmenitiesSelectionModalProps) {
  const handleToggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      onAmenitiesChange(selectedAmenities.filter((item) => item !== amenity));
    } else {
      onAmenitiesChange([...selectedAmenities, amenity]);
    }
  };

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

        {/* Modal Window Upper Close Trigger Button */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={onClose}
            style={styles.closeIconButton}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Dark Blue Title Section Header Bar */}
        <View style={styles.titleBand}>
          <Text style={styles.titleText}>Building Amenities</Text>
        </View>

        {/* Scrollable Checkbox Rows Matrix Feed List */}
        <ScrollView
          style={styles.listScroll}
          showsVerticalScrollIndicator={false}
        >
          {ALL_AMENITIES.map((amenityName) => {
            const isChecked = selectedAmenities.includes(amenityName);
            return (
              <TouchableOpacity
                key={amenityName}
                style={styles.itemRow}
                onPress={() => handleToggleAmenity(amenityName)}
                activeOpacity={0.7}
              >
                <Text style={styles.itemText}>{amenityName}</Text>

                <Ionicons
                  name={isChecked ? "checkbox" : "square-outline"}
                  size={24}
                  color={isChecked ? "#85C1E9" : "#FFF"}
                  style={styles.checkboxIcon}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
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
    backgroundColor: "#034863", // Premium corporate dark teal sheet background matching your image perfectly
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 34 : 16,
    maxHeight: "85%",
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
  closeIconButton: {
    padding: 4,
  },
  titleBand: {
    backgroundColor: "#023750",
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginTop: 4,
    marginBottom: 12,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFF",
    letterSpacing: 0.3,
  },
  listScroll: {
    paddingHorizontal: 20,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.04)",
  },
  checkboxIcon: {
    marginRight: 4,
  },
  itemText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "400",
  },
});
