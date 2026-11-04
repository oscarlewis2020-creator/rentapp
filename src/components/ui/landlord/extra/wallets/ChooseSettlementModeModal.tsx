// components/ui/landlord/wallets/ChooseSettlementModeModal.tsx
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Modal, Portal } from "react-native-paper";

interface ChooseSettlementModeModalProps {
  visible: boolean;
  onClose: () => void;
  onProceed: (selectedMode: string, carrier?: "MPESA" | "AIRTEL") => void;
}

const ALL_MODES = ["Bank", "Phone"];

export function ChooseSettlementModeModal({
  visible,
  onClose,
  onProceed,
}: ChooseSettlementModeModalProps) {
  const [isDropdownExpanded, setIsDropdownExpanded] = useState(false);
  const [selectedMode, setSelectedMode] = useState<"Bank" | "Phone">("Phone");
  const [selectedCarrier, setSelectedCarrier] = useState<"MPESA" | "AIRTEL">(
    "MPESA",
  );

  // 💡 GLITCH RESOLUTION: Dynamically filters out the currently selected choice from repeating itself inside the vertical list
  const filteredDropdownOptions = ALL_MODES.filter(
    (mode) => mode !== selectedMode,
  );

  const handleProceed = () => {
    onProceed(selectedMode);
    setIsDropdownExpanded(false);
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
        {/* Modal Center Header Display */}
        <Text style={styles.modalTitle}>Choose Settlement Mode</Text>

        {/* Instructive Descriptions Callout List */}
        <Text style={styles.descriptionText}>
          1. Bank settlement mode, the rent will be deposited directly to a bank
          account
        </Text>
        <Text style={[styles.descriptionText, styles.spacingBottom]}>
          2. Phone settlement mode, the rent will be deposited to a mobile
          wallet, currently only MPesa and Airtel Money are supported.
        </Text>

        {/* 🔥 SELECT SETTLEMENT MODE DROPDOWN COMPONENT */}
        <View style={styles.inputContainer}>
          <Text style={styles.floatingInputLabel}>Select Settlement Mode</Text>

          {/* Main Display Box Trigger */}
          <TouchableOpacity
            style={[
              styles.dropdownTrigger,
              isDropdownExpanded && styles.dropdownTriggerActive,
            ]}
            activeOpacity={0.85}
            onPress={() => setIsDropdownExpanded(!isDropdownExpanded)}
          >
            <Text style={styles.dropdownValueText}>{selectedMode}</Text>
            <Ionicons
              name={isDropdownExpanded ? "chevron-up" : "chevron-down"}
              size={18}
              color="#FFF"
            />
          </TouchableOpacity>

          {/* Collapsible Dropdown Inset Menu Block */}
          {isDropdownExpanded && (
            <View style={styles.dropdownMenuBlock}>
              {filteredDropdownOptions.map((mode) => (
                <TouchableOpacity
                  key={mode}
                  style={styles.menuItemRow}
                  activeOpacity={0.7}
                  onPress={() => {
                    setSelectedMode(mode as "Bank" | "Phone");
                    setIsDropdownExpanded(false); // Snap shut dropdown upon selection
                  }}
                >
                  <Text style={styles.menuItemText}>{mode}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* 🔥 VISIBLE CARRIER RADIO SELECTORS (Shows conditionally when Phone is active) */}
        {!isDropdownExpanded && selectedMode === "Phone" && (
          <View style={styles.carrierSection}>
            <Text style={styles.carrierTitle}>Choose a Phone Wallet</Text>
            <View style={styles.radioRow}>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setSelectedCarrier("MPESA")}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={
                    selectedCarrier === "MPESA"
                      ? "radio-button-on"
                      : "radio-button-off"
                  }
                  size={22}
                  color={selectedCarrier === "MPESA" ? "#85C1E9" : "#FFF"}
                />
                <Text style={styles.radioLabel}>MPESA</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setSelectedCarrier("AIRTEL")}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={
                    selectedCarrier === "AIRTEL"
                      ? "radio-button-on"
                      : "radio-button-off"
                  }
                  size={22}
                  color={selectedCarrier === "AIRTEL" ? "#85C1E9" : "#FFF"}
                />
                <Text style={styles.radioLabel}>AIRTEL</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Lower Dialog Operational Keys (Hide when menu covers display area) */}
        {!isDropdownExpanded && (
          <View style={styles.actionButtonsRow}>
            <TouchableOpacity style={styles.textButton} onPress={onClose}>
              <Text style={styles.actionBtnText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.textButton} onPress={handleProceed}>
              <Text style={styles.actionBtnText}>Proceed</Text>
            </TouchableOpacity>
          </View>
        )}
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.65)",
  },
  dialogCard: {
    backgroundColor: "#1B2A34",
    width: "88%",
    maxWidth: 440,
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 24,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  modalTitle: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 20,
  },
  descriptionText: {
    color: "#CFD8DC",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  spacingBottom: { marginBottom: 24 },
  inputContainer: { position: "relative", width: "100%", marginBottom: 24 },
  floatingInputLabel: {
    position: "absolute",
    left: 12,
    top: -9,
    backgroundColor: "#1B2A34",
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
    borderColor: "#42526E",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  dropdownTriggerActive: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
  },
  dropdownValueText: { color: "#FFF", fontSize: 16 },
  dropdownMenuBlock: {
    borderWidth: 1,
    borderColor: "#42526E",
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  menuItemRow: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(66, 82, 110, 0.4)",
  },
  menuItemText: { color: "#FFF", fontSize: 16 },
  carrierSection: { width: "100%", marginBottom: 24 },
  carrierTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
  },
  radioRow: { flexDirection: "row", gap: 32, paddingLeft: 4 },
  radioButton: { flexDirection: "row", alignItems: "center", gap: 12 },
  radioLabel: { color: "#FFF", fontSize: 16, fontWeight: "500" },
  actionButtonsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 32,
    marginTop: 8,
  },
  textButton: { paddingVertical: 4 },
  actionBtnText: { color: "#85C1E9", fontSize: 16, fontWeight: "600" },
});
