// components/ui/landlord/wallets/UnitsFilterPickerModal.tsx
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

interface UnitsFilterPickerModalProps {
  visible: boolean;
  onClose: () => void;
  selectedUnits: string[];
  onUnitsChange: (units: string[]) => void;
}

// Mocking out the comprehensive Room list array matches from image data feed logs
const MOCK_ROOMS = Array.from({ length: 12 }, (_, i) => `Room${i + 1}`);

export function UnitsFilterPickerModal({
  visible,
  onClose,
  selectedUnits,
  onUnitsChange,
}: UnitsFilterPickerModalProps) {
  const handleToggleUnit = (unitName: string) => {
    if (selectedUnits.includes(unitName)) {
      onUnitsChange(selectedUnits.filter((item) => item !== unitName));
    } else {
      onUnitsChange([...selectedUnits, unitName]);
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
        {/* Top Drag Handle Accent Indicator line decoration */}
        <View style={styles.topHandleBar} />

        {/* Modal Window Upper Close Trigger Banner bar */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={onClose}
            style={styles.closeIconButton}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Dark Blue Title Subsection Tracks Section Line */}
        <View style={styles.titleBand}>
          <Text style={styles.titleText}>Units</Text>
        </View>

        {/* Scrollable Checkbox Rows Matrix Feed lists */}
        <ScrollView
          style={styles.listScroll}
          showsVerticalScrollIndicator={false}
        >
          {MOCK_ROOMS.map((roomName) => {
            const isChecked = selectedUnits.includes(roomName);
            return (
              <TouchableOpacity
                key={roomName}
                style={styles.itemRow}
                onPress={() => handleToggleUnit(roomName)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.itemText,
                    isChecked && styles.selectedItemText,
                  ]}
                >
                  {roomName}
                </Text>

                {/* Dynamic Checkbox Toggle Selection status */}
                <Ionicons
                  name={isChecked ? "checkbox" : "square-outline"}
                  size={22}
                  color={isChecked ? "#85C1E9" : "#FFF"} // Accent blue when checked matching standard patterns
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
    justifyContent: "flex-end", // Snaps bottom sheet flush onto lower screen borders
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  sheetContainer: {
    backgroundColor: "#004B6E", // Deep ocean blue background color matching image asset
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%", // Responsive desktop monitor container caps
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 34 : 16,
    maxHeight: "85%", // Prevent text overflow loops on short monitor screens viewports
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
    backgroundColor: "#003A57", // Dark blue header block band matching image exactly
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginTop: 8,
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
    justifyContent: "space-between", // Pushes checkbox elements flush to right edge
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.03)",
  },
  checkboxIcon: {
    marginRight: 4,
  },
  itemText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "400",
  },
  selectedItemText: {
    fontWeight: "500",
  },
});
