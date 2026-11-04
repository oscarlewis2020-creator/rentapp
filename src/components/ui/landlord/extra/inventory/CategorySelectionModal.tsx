// components/ui/landlord/inventory/CategorySelectionModal.tsx
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

interface CategorySelectionModalProps {
  visible: boolean;
  onClose: () => void;
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
}

const INVENTORY_CATEGORIES = [
  "Furniture",
  "Appliances",
  "Building & maintenance",
  "Common area amenities",
  "Parking & storage",
  "Safety & security",
  "Utilities & fixtures",
  "Miscellaneous",
];

export function CategorySelectionModal({
  visible,
  onClose,
  selectedCategories,
  onCategoriesChange,
}: CategorySelectionModalProps) {
  const handleToggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoriesChange(
        selectedCategories.filter((item) => item !== category),
      );
    } else {
      onCategoriesChange([...selectedCategories, category]);
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
        {/* Top Handle Decorative Bar */}
        <View style={styles.topHandleBar} />

        {/* Close Button Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={onClose}
            style={styles.closeIconButton}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={26} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Scrollable Checkbox Rows Matrix */}
        <ScrollView
          style={styles.listScroll}
          showsVerticalScrollIndicator={false}
        >
          {INVENTORY_CATEGORIES.map((category) => {
            const isChecked = selectedCategories.includes(category);
            return (
              <TouchableOpacity
                key={category}
                style={styles.itemRow}
                onPress={() => handleToggleCategory(category)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.itemText,
                    isChecked && styles.selectedItemText,
                  ]}
                >
                  {category}
                </Text>

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
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  sheetContainer: {
    backgroundColor: "#004B6E", // True deep blue base color matching image exactly
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
  listScroll: {
    paddingHorizontal: 24,
    marginTop: 8,
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
    fontSize: 17,
    color: "#FFF",
    fontWeight: "400",
  },
  selectedItemText: {
    fontWeight: "500",
  },
});
