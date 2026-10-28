// components/ui/landlord/chat/LeaseStatusPickerModal.tsx
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

interface StatusOption {
  id: string;
  label: string;
}

interface LeaseStatusPickerModalProps {
  visible: boolean;
  onClose: () => void;
  selectedStatuses: string[];
  onStatusesChange: (statuses: string[]) => void;
}

const LEASE_STATUSES: StatusOption[] = [
  { id: "Rejected", label: "Rejected" },
  { id: "Canceled", label: "Canceled" },
  { id: "Requested", label: "Requested" },
  { id: "Approved", label: "Approved" },
  { id: "Terminated", label: "Terminated" },
  { id: "Past Due", label: "Past Due" },
  { id: "Due Soon", label: "Due Soon" },
  { id: "Grace Period", label: "Grace Period" },
  { id: "Upcoming", label: "Upcoming" },
  { id: "Up To Date", label: "Up To Date" },
];

export function LeaseStatusPickerModal({
  visible,
  onClose,
  selectedStatuses,
  onStatusesChange,
}: LeaseStatusPickerModalProps) {
  const handleToggleStatus = (statusId: string) => {
    if (selectedStatuses.includes(statusId)) {
      // Remove status if already checked
      onStatusesChange(selectedStatuses.filter((id) => id !== statusId));
    } else {
      // Add status if unchecked
      onStatusesChange([...selectedStatuses, statusId]);
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
        {/* Top Handle Bar Decoration Line Accent */}
        <View style={styles.topHandleBar} />

        {/* Modal Sheet Upper Close Row Header Panel */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeIconButton}>
            <Ionicons name="close" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Inner Sub-Header Title Contrast Band */}
        <View style={styles.titleBand}>
          <Text style={styles.titleText}>Lease statuses</Text>
        </View>

        {/* Scrollable Checkbox Option Content List */}
        <ScrollView
          style={styles.listScroll}
          showsVerticalScrollIndicator={false}
        >
          {LEASE_STATUSES.map((status) => {
            const isChecked = selectedStatuses.includes(status.id);
            return (
              <TouchableOpacity
                key={status.id}
                style={styles.itemRow}
                onPress={() => handleToggleStatus(status.id)}
                activeOpacity={0.7}
              >
                {/* Dynamic Checkbox Toggle Icon Graphic */}
                <Ionicons
                  name={isChecked ? "checkbox" : "square-outline"}
                  size={24}
                  color={isChecked ? "#85C1E9" : "#FFF"} // Light blue accent match when checked
                  style={styles.checkboxIcon}
                />

                <Text
                  style={[
                    styles.itemText,
                    isChecked && styles.selectedItemText,
                  ]}
                >
                  {status.label}
                </Text>
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
    justifyContent: "flex-end", // Layout snaps the bottom sheet flush to lower edge
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  sheetContainer: {
    backgroundColor: "#004B6E", // True deep blue corporate background color matching image
    width: "100%",
    maxWidth: Platform.OS === "web" ? 500 : "100%", // Responsive desktop design container caps
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 40 : 24, // Clear bottom notch safe spaces
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
  titleBand: {
    backgroundColor: "#003A57", // Darkened sub-header contrast track block row
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
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.03)",
  },
  checkboxIcon: {
    marginRight: 16,
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
