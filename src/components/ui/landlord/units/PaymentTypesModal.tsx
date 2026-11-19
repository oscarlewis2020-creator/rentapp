// components/ui/landlord/units/PaymentTypesModal.tsx
import { Ionicons } from "@expo/vector-icons";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "react-native-paper";

export type PaymentTypeValue =
  | "Automated payment"
  | "Receipt payment"
  | "Waiver"
  | "Refund"
  | "Discount"
  | "Cash";

const PAYMENT_TYPE_ITEMS: PaymentTypeValue[] = [
  "Automated payment",
  "Receipt payment",
  "Waiver",
  "Refund",
  "Discount",
  "Cash",
];

interface PaymentTypesModalProps {
  visible: boolean;
  selectedTypes: PaymentTypeValue[];
  onToggleType: (type: PaymentTypeValue) => void;
  onClose: () => void;
}

export default function PaymentTypesModal({
  visible,
  selectedTypes,
  onToggleType,
  onClose,
}: PaymentTypesModalProps) {
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
          <View style={styles.dragHandle} />

          <View style={styles.closeRow}>
            <Pressable
              onPress={onClose}
              hitSlop={10}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#E2E8F0" />
            </Pressable>
          </View>

          <View style={styles.headerBanner}>
            <Text style={styles.headerBannerText}>Payment type</Text>
          </View>

          <ScrollView
            style={styles.listScroll}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          >
            {PAYMENT_TYPE_ITEMS.map((item) => {
              const isChecked = selectedTypes.includes(item);

              return (
                <Pressable
                  key={item}
                  onPress={() => onToggleType(item)}
                  style={styles.optionRow}
                >
                  <View
                    style={[
                      styles.checkboxBox,
                      isChecked && styles.checkboxBoxChecked,
                    ]}
                  >
                    {isChecked && (
                      <Ionicons name="checkmark" size={16} color="#044A67" />
                    )}
                  </View>
                  <Text style={styles.optionLabel}>{item}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
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
    paddingTop: 10,
    paddingBottom: 24,
    maxHeight: "75%",
  },
  dragHandle: {
    width: 34,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#071E29",
    alignSelf: "center",
    marginBottom: 8,
  },
  closeRow: {
    paddingHorizontal: 18,
    paddingBottom: 10,
    alignItems: "flex-end",
  },
  closeButton: {
    padding: 4,
  },
  headerBanner: {
    backgroundColor: "#00648B",
    marginHorizontal: 4,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 6,
  },
  headerBannerText: {
    color: "#F8FAFC",
    fontSize: 16,
    fontWeight: "600",
  },
  listScroll: {
    flexGrow: 0,
  },
  listContent: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 12,
    gap: 6,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingVertical: 14,
    paddingHorizontal: 6,
  },
  checkboxBox: {
    width: 22,
    height: 22,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxBoxChecked: {
    backgroundColor: "#89CEFF",
    borderColor: "#89CEFF",
  },
  optionLabel: {
    color: "#F8FAFC",
    fontSize: 17,
    fontWeight: "400",
  },
});
