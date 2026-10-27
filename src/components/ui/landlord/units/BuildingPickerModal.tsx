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

// Type definitions for building options
export interface BuildingItem {
  id: string;
  name: string;
}

interface BuildingPickerModalProps {
  visible: boolean;
  onClose: () => void;
  buildings: BuildingItem[];
  selectedBuildingId: string;
  onSelectBuilding: (building: BuildingItem) => void;
}

export function BuildingPickerModal({
  visible,
  onClose,
  buildings,
  selectedBuildingId,
  onSelectBuilding,
}: BuildingPickerModalProps) {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        dismissable={true}
        style={styles.modalOverlay}
        contentContainerStyle={styles.sheetContainer}
      >
        {/* Top Handle Decorative Accent */}
        <View style={styles.topHandleBar} />

        {/* Modal Header Panel */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Buildings</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeIconButton}>
            <Ionicons name="close" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Scrollable Building Option Selection Items */}
        <ScrollView
          style={styles.listScroll}
          showsVerticalScrollIndicator={false}
        >
          {buildings.map((building) => {
            const isSelected = building.id === selectedBuildingId;
            return (
              <TouchableOpacity
                key={building.id}
                style={styles.itemRow}
                onPress={() => {
                  onSelectBuilding(building);
                  onClose(); // Automatically close sheet panel on click selection
                }}
              >
                <Text
                  style={[
                    styles.itemText,
                    isSelected && styles.selectedItemText,
                  ]}
                >
                  {building.name}
                </Text>

                {/* Dynamic Checkbox Accent Toggle Indicator */}
                <Ionicons
                  name={isSelected ? "checkbox" : "square-outline"}
                  size={24}
                  color={isSelected ? "#85C1E9" : "#FFF"} // Light steel blue checkmark match
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
    justifyContent: "flex-end", // Pulls sheet modal flush to the lower viewport area
    alignItems: "center",
  },
  sheetContainer: {
    backgroundColor: "#004B6E", // Deep blue corporate wash theme match
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%", // Desktop responsive capping layout
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 40 : 24, // Account for lower notch safe indicators
    maxHeight: "80%", // Prevent long listing data blocks from escaping viewport
  },
  topHandleBar: {
    width: 44,
    height: 5,
    backgroundColor: "#1C2D37",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 16,
    opacity: 0.6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#003A57", // Darkened sub-header contrast band row
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFF",
  },
  closeIconButton: {
    padding: 4,
  },
  listScroll: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  itemText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "500",
  },
  selectedItemText: {
    fontWeight: "600",
  },
});
