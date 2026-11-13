import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal, Portal } from "react-native-paper";

const AMENITIES_LIST = [
  "Balcony",
  "Ceiling Fan",
  "Hot Shower",
  "Fireplace",
  "In-unit Laundry",
  "Tiled Floor",
];

interface AmenitiesModalProps {
  visible: boolean;
  selectedAmenities: string[]; // Accepts an array of selected items
  onToggleAmenity: (amenity: string) => void;
  onApply: () => void;
  onClose: () => void;
}

export function AmenitiesModal({
  visible,
  selectedAmenities,
  onToggleAmenity,
  onApply,
  onClose,
}: AmenitiesModalProps) {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.modalContainer}
      >
        <View style={styles.dragHandle} />
        <View style={styles.modalHeader}>
          <Text style={styles.modalHeaderText}>Unit Amenities</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={22} color="#F1F5F9" />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          {AMENITIES_LIST.map((item, idx) => {
            const isSelected = selectedAmenities.includes(item);
            return (
              <TouchableOpacity
                key={idx}
                style={styles.optionRow}
                onPress={() => onToggleAmenity(item)} // Toggles item in array without closing modal
                activeOpacity={0.7}
              >
                <Text style={styles.optionText}>{item}</Text>
                <View
                  style={[
                    styles.checkbox,
                    isSelected && styles.checkboxSelected,
                  ]}
                >
                  {isSelected && (
                    <MaterialCommunityIcons
                      name="check"
                      size={16}
                      color="#F8FAFC"
                    />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Apply Button to save selected items and close modal */}
        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.applyBtn} onPress={onApply}>
            <Text style={styles.applyBtnText}>Apply Selection</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#0F2735",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 20,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#64748B",
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 8,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#113548",
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  modalHeaderText: {
    color: "#F8FAFC",
    fontSize: 16,
    fontWeight: "600",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#1E3A4C",
  },
  optionText: {
    color: "#F8FAFC",
    fontSize: 16,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1.5,
    borderColor: "#94A3B8",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: {
    backgroundColor: "#0284C7",
    borderColor: "#0284C7",
  },
  footerContainer: {
    paddingHorizontal: 20,
    paddingTop: 14,
  },
  applyBtn: {
    backgroundColor: "#7DD3FC",
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  applyBtnText: {
    color: "#0F172A",
    fontSize: 15,
    fontWeight: "600",
  },
});
