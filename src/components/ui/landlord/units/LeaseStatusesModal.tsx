// components/ui/landlord/units/LeaseStatusesModal.tsx
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

export type LeaseStatusValue =
  | "Rejected"
  | "Canceled"
  | "Requested"
  | "Approved"
  | "Terminated"
  | "Past Due"
  | "Due Soon"
  | "Grace Period"
  | "Upcoming"
  | "Up To Date";

export const LEASE_STATUS_ITEMS: LeaseStatusValue[] = [
  "Rejected",
  "Canceled",
  "Requested",
  "Approved",
  "Terminated",
  "Past Due",
  "Due Soon",
  "Grace Period",
  "Upcoming",
  "Up To Date",
];

interface LeaseStatusesModalProps {
  visible: boolean;
  selectedStatuses: LeaseStatusValue[];
  onToggleStatus: (status: LeaseStatusValue) => void;
  onClose: () => void;
}

export default function LeaseStatusesModal({
  visible,
  selectedStatuses,
  onToggleStatus,
  onClose,
}: LeaseStatusesModalProps) {
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
          {/* Top Handle & Close Row */}
          <View style={styles.topBar}>
            <View style={styles.dragHandle} />
            <Pressable onPress={onClose} hitSlop={10} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color="#E2E8F0" />
            </Pressable>
          </View>

          {/* Teal Title Banner */}
          <View style={styles.bannerHeader}>
            <Text style={styles.bannerTitle}>Lease statuses</Text>
          </View>

          {/* Scrollable Checkbox List */}
          <ScrollView
            style={styles.listScroll}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          >
            {LEASE_STATUS_ITEMS.map((item) => {
              const checked = selectedStatuses.includes(item);

              return (
                <Pressable
                  key={item}
                  onPress={() => onToggleStatus(item)}
                  style={styles.statusRow}
                >
                  <View
                    style={[
                      styles.checkboxBox,
                      checked && styles.checkboxBoxChecked,
                    ]}
                  >
                    {checked && (
                      <Ionicons name="checkmark" size={16} color="#052E40" />
                    )}
                  </View>

                  <Text style={styles.statusLabel}>{item}</Text>
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
    overflow: "hidden",
  },
  topBar: {
    paddingTop: 10,
    paddingHorizontal: 18,
    paddingBottom: 6,
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
  bannerHeader: {
    backgroundColor: "#065C80",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  bannerTitle: {
    color: "#F8FAFC",
    fontSize: 17,
    fontWeight: "600",
  },
  listScroll: {
    flexGrow: 0,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    paddingBottom: 32,
    gap: 20,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 22,
    paddingVertical: 4,
  },
  checkboxBox: {
    width: 24,
    height: 24,
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
  statusLabel: {
    color: "#F8FAFC",
    fontSize: 17,
    fontWeight: "400",
  },
});
