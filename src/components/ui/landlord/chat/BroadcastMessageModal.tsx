// components/ui/landlord/chat/BroadcastMessageModal.tsx
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal, Portal } from "react-native-paper";
import { LeaseStatusPickerModal } from "./LeaseStatusPickerModal";

interface BroadcastMessageModalProps {
  visible: boolean;
  onClose: () => void;
  onSendMessage: (message: string, selectedStatuses: string[]) => void;
}

export function BroadcastMessageModal({
  visible,
  onClose,
  onSendMessage,
}: BroadcastMessageModalProps) {
  const [message, setMessage] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([
    "Past Due",
    "Due Soon",
    "Grace Period",
  ]);
  const [statusPickerOpen, setStatusPickerOpen] = useState(false);

  // 💡 Accordion open/close state
  const [presetsExpanded, setPresetsExpanded] = useState(true);
  const [activePreset, setActivePreset] = useState("arrears");

  const displayText =
    selectedStatuses.length > 0
      ? selectedStatuses.join(" ,")
      : "Select lease statuses";

  // Preset configuration click handler
  const applyPreset = (presetType: string) => {
    setActivePreset(presetType);
    if (presetType === "all") {
      setSelectedStatuses([
        "Requested",
        "Approved",
        "Past Due",
        "Due Soon",
        "Grace Period",
        "Up To Date",
      ]);
    } else if (presetType === "active") {
      setSelectedStatuses(["Approved", "Up To Date"]);
    } else if (presetType === "inactive") {
      setSelectedStatuses(["Rejected", "Canceled", "Terminated"]);
    } else if (presetType === "arrears") {
      setSelectedStatuses(["Past Due", "Due Soon", "Grace Period"]);
    }
  };

  const handleSend = () => {
    if (!message.trim()) return;
    onSendMessage(message, selectedStatuses);
    setMessage("");
    onClose();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        dismissable={true}
        style={styles.modalOverlay}
        contentContainerStyle={styles.dialogCard}
      >
        <Text style={styles.modalTitle}>Send message to property tenants</Text>

        {/* 1. Message Area Box with Paperclip */}
        <View style={styles.textAreaWrapper}>
          <TouchableOpacity style={styles.attachmentButton} activeOpacity={0.7}>
            <Ionicons name="attach-outline" size={20} color="#9EA5B1" />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message"
            placeholderTextColor="#6C7A8C"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={message}
            onChangeText={setMessage}
          />
        </View>

        {/* 2. Lease Status Custom Dropdown Trigger */}
        <View style={styles.inputContainer}>
          <Text style={styles.floatingLabel}>
            Lease statuses to send mess...
          </Text>
          <TouchableOpacity
            style={styles.dropdownTrigger}
            activeOpacity={0.8}
            onPress={() => setStatusPickerOpen(true)}
          >
            <View style={styles.leftInputGroup}>
              <MaterialCommunityIcons
                name="filter-remove-outline"
                size={20}
                color="#85C1E9"
              />
              <Text style={styles.inputText} numberOfLines={1}>
                {displayText}
              </Text>
            </View>
            <Ionicons name="chevron-down" size={16} color="#9EA5B1" />
          </TouchableOpacity>
        </View>

        {/* 3. 🔥 QUICK LEASE STATUS PRESETS ACCORDION PANEL */}
        <View style={styles.presetsWrapper}>
          <TouchableOpacity
            style={styles.presetsAccordionRow}
            activeOpacity={0.8}
            onPress={() => setPresetsExpanded(!presetsExpanded)}
          >
            <Text style={styles.presetsText}>Quick lease status presets</Text>
            <Ionicons
              name={presetsExpanded ? "chevron-up" : "chevron-down"}
              size={16}
              color="#FFF"
            />
          </TouchableOpacity>

          {presetsExpanded && (
            <View style={styles.pillsContainer}>
              <TouchableOpacity
                style={[
                  styles.pill,
                  activePreset === "all" && styles.activePill,
                ]}
                onPress={() => applyPreset("all")}
              >
                <Text style={styles.pillText}>all</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.pill,
                  activePreset === "active" && styles.activePill,
                ]}
                onPress={() => applyPreset("active")}
              >
                <Text style={styles.pillText}>active leases</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.pill,
                  activePreset === "inactive" && styles.activePill,
                ]}
                onPress={() => applyPreset("inactive")}
              >
                <Text style={styles.pillText}>inactive leases</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.pill,
                  activePreset === "arrears" && styles.activePill,
                ]}
                onPress={() => applyPreset("arrears")}
              >
                {activePreset === "arrears" && (
                  <Ionicons
                    name="checkmark"
                    size={14}
                    color="#FFF"
                    style={styles.checkIcon}
                  />
                )}
                <Text style={styles.pillText}>leases with arrears</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* 4. Validation Error Warning Callout Label */}
        <Text style={styles.errorWarningText}>
          No tenant found for the selected leases in the building
        </Text>

        {/* 5. Action Execution Layout Control Buttons */}
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity style={styles.closeTextButton} onPress={onClose}>
            <Text style={styles.closeBtnText}>Close</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.sendPillButton,
              !message.trim() && styles.disabledSendBtn,
            ]}
            onPress={handleSend}
            disabled={!message.trim()}
          >
            <Ionicons
              name="send"
              size={16}
              color="#9EA5B1"
              style={styles.sendIcon}
            />
            <Text
              style={[
                styles.sendBtnText,
                !message.trim() && styles.disabledSendText,
              ]}
            >
              Send message
            </Text>
          </TouchableOpacity>
        </View>

        {/* Nested Multiselect Selector Sub-Sheet Portal Frame Layer */}
        <LeaseStatusPickerModal
          visible={statusPickerOpen}
          onClose={() => setStatusPickerOpen(false)}
          selectedStatuses={selectedStatuses}
          onStatusesChange={(updatedList) => setSelectedStatuses(updatedList)}
        />
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  dialogCard: {
    backgroundColor: "#1B222A", // Matched perfectly with the card tone in your image
    width: "92%",
    maxWidth: Platform.OS === "web" ? 480 : "100%",
    borderRadius: 16,
    padding: 20,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#252F3A",
  },
  modalTitle: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "400",
    textAlign: "center",
    lineHeight: 30,
    marginBottom: 20,
  },
  textAreaWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#3A4654",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 14,
    minHeight: 150,
    backgroundColor: "#13181E",
    marginBottom: 16,
  },
  attachmentButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#3A4654",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    backgroundColor: "#222C37",
  },
  textInput: {
    flex: 1,
    color: "#FFF",
    fontSize: 16,
    paddingTop: Platform.OS === "ios" ? 6 : 2,
    ...Platform.select({ web: { outlineStyle: "none" } }),
  } as any,
  inputContainer: {
    position: "relative",
    width: "100%",
    marginBottom: 16,
  },
  floatingLabel: {
    position: "absolute",
    left: 12,
    top: -9,
    backgroundColor: "#1B222A",
    paddingHorizontal: 6,
    fontSize: 12,
    color: "#9EA5B1",
    zIndex: 10,
  },
  dropdownTrigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#3A4654",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: "#13181E",
  },
  leftInputGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  inputText: {
    color: "#FFF",
    fontSize: 15,
    flex: 1,
  },
  presetsWrapper: {
    backgroundColor: "#13181E",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#252F3A",
    paddingHorizontal: 12,
    paddingBottom: 12,
    marginBottom: 16,
  },
  presetsAccordionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  presetsText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "600",
  },
  pillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 4,
  },
  pill: {
    borderWidth: 1,
    borderColor: "#3A4654",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "transparent",
  },
  activePill: {
    backgroundColor: "#034769", // Premium teal pill highlight color
    borderColor: "#007AFF",
  },
  pillText: {
    color: "#FFF",
    fontSize: 14,
  },
  checkIcon: {
    display: "flex",
    marginRight: 4,
    alignSelf: "center",
  },
  errorWarningText: {
    color: "#F1948A",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  actionButtonsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  closeTextButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  closeBtnText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  sendPillButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#293542", // Grayish blue send button overlay color match
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 24,
  },
  disabledSendBtn: {
    backgroundColor: "rgba(41, 53, 66, 0.4)",
  },
  sendIcon: {
    marginRight: 8,
  },
  sendBtnText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "600",
  },
  disabledSendText: {
    color: "#6C7A8C",
  },
});
