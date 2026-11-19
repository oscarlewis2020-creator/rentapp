// components/ui/landlord/units/RejectionReasonModal.tsx
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

export type RejectionReasonOption =
  | "Incomplete application"
  | "Violation of terms"
  | "Overdue rent history"
  | "Property already leased"
  | "Missing required documentation"
  | "Unverifiable employment or income"
  | "Failure to pay the application fee"
  | "Does not meet landlord's tenant criteria"
  | "Failed background or security check"
  | "Other";

export const REJECTION_REASON_OPTIONS: RejectionReasonOption[] = [
  "Incomplete application",
  "Violation of terms",
  "Overdue rent history",
  "Property already leased",
  "Missing required documentation",
  "Unverifiable employment or income",
  "Failure to pay the application fee",
  "Does not meet landlord's tenant criteria",
  "Failed background or security check",
  "Other",
];

interface RejectionReasonModalProps {
  visible: boolean;
  selectedReasons: RejectionReasonOption[];
  onToggleReason: (reason: RejectionReasonOption) => void;
  onClose: () => void;
}

export default function RejectionReasonModal({
  visible,
  selectedReasons,
  onToggleReason,
  onClose,
}: RejectionReasonModalProps) {
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
          <View style={styles.sheetTopBar}>
            <View style={styles.dragHandle} />
            <Pressable onPress={onClose} hitSlop={10} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color="#E2E8F0" />
            </Pressable>
          </View>

          <View style={styles.banner}>
            <Text style={styles.bannerText}>Rejection reason</Text>
          </View>

          <ScrollView
            style={styles.listScroll}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          >
            {REJECTION_REASON_OPTIONS.map((reason) => {
              const isChecked = selectedReasons.includes(reason);

              return (
                <Pressable
                  key={reason}
                  onPress={() => onToggleReason(reason)}
                  style={styles.optionRow}
                >
                  <Text style={styles.optionLabel}>{reason}</Text>

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
    maxHeight: "88%",
    paddingBottom: 24,
  },
  sheetTopBar: {
    paddingTop: 10,
    paddingHorizontal: 18,
    paddingBottom: 8,
    alignItems: "center",
  },
  dragHandle: {
    width: 34,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#071E29",
    marginBottom: 4,
  },
  closeBtn: {
    alignSelf: "flex-end",
    padding: 4,
  },
  banner: {
    backgroundColor: "#00648B",
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  bannerText: {
    color: "#F8FAFC",
    fontSize: 16,
    fontWeight: "600",
  },
  listScroll: {
    flexGrow: 0,
  },
  listContent: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 16,
    gap: 8,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 13,
    gap: 14,
  },
  optionLabel: {
    color: "#F8FAFC",
    fontSize: 16,
    fontWeight: "400",
    flex: 1,
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
});
