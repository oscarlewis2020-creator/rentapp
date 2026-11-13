import { Ionicons } from "@expo/vector-icons";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal as PaperModal, Portal } from "react-native-paper";

export type SortOrderType = "asc" | "desc";

interface UnitsSortModalProps {
  isVisible: boolean;
  selectedSort: SortOrderType;
  onSelectSort: (order: SortOrderType) => void;
  onClose: () => void;
}

export default function UnitsSortModal({
  isVisible,
  selectedSort,
  onSelectSort,
  onClose,
}: UnitsSortModalProps) {
  const handleSelect = (order: SortOrderType) => {
    onSelectSort(order);
    onClose();
  };

  return (
    <Portal>
      <PaperModal
        visible={isVisible}
        onDismiss={onClose}
        contentContainerStyle={styles.paperModalOverride}
      >
        <View style={styles.backdropScrim}>
          <View style={styles.sheetContainer}>
            {/* Top Grabber & Close Button */}
            <View style={styles.grabber} />
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#ffffff" />
            </TouchableOpacity>
            <View style={styles.headerDivider} />

            {/* Radio Options */}
            <View style={styles.optionsList}>
              <TouchableOpacity
                style={styles.radioRow}
                onPress={() => handleSelect("asc")}
                activeOpacity={0.7}
              >
                <Text style={styles.radioLabel}>Ascending : "A → Z"</Text>
                <Ionicons
                  name={
                    selectedSort === "asc"
                      ? "radio-button-on"
                      : "radio-button-off"
                  }
                  size={24}
                  color={selectedSort === "asc" ? "#86d3ff" : "#cbd5e1"}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.radioRow}
                onPress={() => handleSelect("desc")}
                activeOpacity={0.7}
              >
                <Text style={styles.radioLabel}>Descending : "Z → A"</Text>
                <Ionicons
                  name={
                    selectedSort === "desc"
                      ? "radio-button-on"
                      : "radio-button-off"
                  }
                  size={24}
                  color={selectedSort === "desc" ? "#86d3ff" : "#cbd5e1"}
                />
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
    justifyContent: "flex-end",
  },
  backdropScrim: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    justifyContent: "flex-end",
  },
  sheetContainer: {
    width: "100%",
    maxWidth: 600,
    backgroundColor: "#02435e",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    alignSelf: "center",
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 36 : 28,
  },
  grabber: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#122c38",
    alignSelf: "center",
    marginBottom: 8,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginRight: 18,
    padding: 4,
    ...Platform.select({ web: { cursor: "pointer" } }),
  },
  headerDivider: {
    height: 1,
    backgroundColor: "#195a76",
    marginTop: 8,
    marginHorizontal: 14,
  },
  optionsList: {
    paddingHorizontal: 22,
    paddingTop: 16,
    gap: 12,
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    ...Platform.select({ web: { cursor: "pointer" } }),
  },
  radioLabel: {
    color: "#ffffff",
    fontSize: 16.5,
    fontWeight: "400",
  },
});
