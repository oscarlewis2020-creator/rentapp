// components/ui/landlord/units/UnitLeasesSortModal.tsx
import { Ionicons } from "@expo/vector-icons";
import { Modal, Platform, Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export type LeaseSortOrder = "newest" | "oldest";

interface UnitLeasesSortModalProps {
  visible: boolean;
  selectedSort: LeaseSortOrder;
  onSelectSort: (order: LeaseSortOrder) => void;
  onClose: () => void;
}

export default function UnitLeasesSortModal({
  visible,
  selectedSort,
  onSelectSort,
  onClose,
}: UnitLeasesSortModalProps) {
  const handleChoose = (order: LeaseSortOrder) => {
    onSelectSort(order);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <Pressable style={styles.backdropDismiss} onPress={onClose} />

        <View style={styles.sheetContainer}>
          {/* Top Drag Handle & Close Button */}
          <View style={styles.sheetHeader}>
            <View style={styles.dragHandle} />
            <Pressable
              onPress={onClose}
              hitSlop={10}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#E2E8F0" />
            </Pressable>
          </View>

          {/* Radio Options */}
          <View style={styles.optionsList}>
            <Pressable
              onPress={() => handleChoose("newest")}
              style={styles.optionRow}
            >
              <Text style={styles.optionLabel}>New leases first</Text>
              <View style={styles.radioOuter}>
                {selectedSort === "newest" && (
                  <View style={styles.radioInner} />
                )}
              </View>
            </Pressable>

            <Pressable
              onPress={() => handleChoose("oldest")}
              style={styles.optionRow}
            >
              <Text style={styles.optionLabel}>Old leases first</Text>
              <View style={styles.radioOuter}>
                {selectedSort === "oldest" && (
                  <View style={styles.radioInner} />
                )}
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.58)",
    justifyContent: "flex-end",
  },
  backdropDismiss: {
    flex: 1,
  },
  sheetContainer: {
    backgroundColor: "#044A67",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%",
    alignSelf: "center",
    paddingBottom: 28,
  },
  sheetHeader: {
    paddingTop: 10,
    paddingBottom: 14,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#648899",
    alignItems: "center",
    justifyContent: "center",
  },
  dragHandle: {
    width: 34,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#071E29",
    marginBottom: 8,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 4,
  },
  optionsList: {
    paddingHorizontal: 22,
    paddingTop: 16,
    gap: 18,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  optionLabel: {
    color: "#F8FAFC",
    fontSize: 16,
    fontWeight: "500",
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#89CEFF",
  },
});
