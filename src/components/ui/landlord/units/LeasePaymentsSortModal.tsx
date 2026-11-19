// components/ui/landlord/units/LeasePaymentsSortModal.tsx
import { Ionicons } from "@expo/vector-icons";
import { Modal, Platform, Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export type PaymentSortOrder = "newest" | "oldest";

interface LeasePaymentsSortModalProps {
  visible: boolean;
  selectedSort: PaymentSortOrder;
  onSelectSort: (order: PaymentSortOrder) => void;
  onClose: () => void;
}

const SORT_OPTIONS: { label: string; value: PaymentSortOrder }[] = [
  { label: "New payments first", value: "newest" },
  { label: "Old payments first", value: "oldest" },
];

export default function LeasePaymentsSortModal({
  visible,
  selectedSort,
  onSelectSort,
  onClose,
}: LeasePaymentsSortModalProps) {
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

          <View style={styles.optionsList}>
            {SORT_OPTIONS.map((option) => {
              const isSelected = selectedSort === option.value;

              return (
                <Pressable
                  key={option.value}
                  onPress={() => {
                    onSelectSort(option.value);
                    onClose();
                  }}
                  style={styles.optionRow}
                >
                  <Text style={styles.optionLabel}>{option.label}</Text>

                  <View
                    style={[
                      styles.radioOuter,
                      isSelected && styles.radioOuterSelected,
                    ]}
                  >
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
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
    paddingBottom: 32,
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
    paddingHorizontal: 26,
    paddingTop: 18,
    gap: 24,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  optionLabel: {
    color: "#F8FAFC",
    fontSize: 17,
    fontWeight: "400",
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterSelected: {
    borderColor: "#89CEFF",
  },
  radioInner: {
    width: 11,
    height: 11,
    borderRadius: 5.5,
    backgroundColor: "#89CEFF",
  },
});
