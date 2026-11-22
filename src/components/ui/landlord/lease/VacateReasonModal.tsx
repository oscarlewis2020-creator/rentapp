// components/ui/landlord/lease/VacateReasonModal.tsx
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

export type VacateReasonOption =
  | "Non-payment of rent"
  | "Breach of lease terms"
  | "Property damage"
  | "Unauthorized subletting"
  | "Illegal activity on premises"
  | "Excessive disturbance or nuisance"
  | "Repeated lease violations"
  | "Failure to maintain agreed responsibilities"
  | "Owner's intent to reoccupy the property"
  | "Excessive utility consumption"
  | "Violation of occupancy limits"
  | "Unauthorized alterations to the property"
  | "Misuse of property facilities"
  | "Creation of unsafe living conditions"
  | "Harassment or intimidation of neighbors"
  | "Chronic wastefulness or misuse of resources"
  | "Failure to adhere to community or HOA guidelines"
  | "Substantial breach of lease covenants regarding conduct"
  | "Persistent disregard for property rules"
  | "Other";

export const VACATE_REASON_OPTIONS: VacateReasonOption[] = [
  "Non-payment of rent",
  "Breach of lease terms",
  "Property damage",
  "Unauthorized subletting",
  "Illegal activity on premises",
  "Excessive disturbance or nuisance",
  "Repeated lease violations",
  "Failure to maintain agreed responsibilities",
  "Owner's intent to reoccupy the property",
  "Excessive utility consumption",
  "Violation of occupancy limits",
  "Unauthorized alterations to the property",
  "Misuse of property facilities",
  "Creation of unsafe living conditions",
  "Harassment or intimidation of neighbors",
  "Chronic wastefulness or misuse of resources",
  "Failure to adhere to community or HOA guidelines",
  "Substantial breach of lease covenants regarding conduct",
  "Persistent disregard for property rules",
  "Other",
];

interface VacateReasonModalProps {
  visible: boolean;
  selectedReasons: VacateReasonOption[];
  onToggleReason: (reason: VacateReasonOption) => void;
  onClose: () => void;
}

export default function VacateReasonModal({
  visible,
  selectedReasons,
  onToggleReason,
  onClose,
}: VacateReasonModalProps) {
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
            <Text style={styles.bannerText}>Reason to vacate</Text>
          </View>

          <ScrollView
            style={styles.listScroll}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          >
            {VACATE_REASON_OPTIONS.map((reason) => {
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
    maxHeight: "90%",
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
    paddingBottom: 18,
    gap: 6,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    gap: 16,
  },
  optionLabel: {
    color: "#F8FAFC",
    fontSize: 16,
    lineHeight: 22,
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
