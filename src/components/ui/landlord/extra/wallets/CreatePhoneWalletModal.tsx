// components/ui/landlord/wallets/CreatePhoneWalletModal.tsx
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal, Portal } from "react-native-paper";

interface CreatePhoneWalletModalProps {
  visible: boolean;
  carrier: "MPESA" | "AIRTEL";
  onClose: () => void;
  onSubmit: (formData: any) => void;
}

const PAYEE_OPTIONS = ["Tenant", "Management"];

export function CreatePhoneWalletModal({
  visible,
  carrier,
  onClose,
  onSubmit,
}: CreatePhoneWalletModalProps) {
  const [accountName, setAccountName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Dropdown states tracking
  const [isPayeeDropdownOpen, setIsPayeeDropdownOpen] = useState(false);
  const [selectedPayee, setSelectedPayee] = useState("Tenant");

  // Filters out the active choice from repeating inside the vertical options stack list
  const filteredPayeeOptions = PAYEE_OPTIONS.filter(
    (opt) => opt !== selectedPayee,
  );

  const handleSubmitForm = () => {
    if (!accountName.trim() || !phoneNumber.trim()) return;
    onSubmit({
      accountName,
      phoneNumber,
      feeResponsibility: selectedPayee,
      carrier,
    });
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
        <Text style={styles.modalTitle}>Create {carrier} Wallet</Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollForm}
        >
          {/* Building Informational Read-Only Container Frame */}
          <View style={styles.buildingDisplayBox}>
            <Text style={styles.floatingInputLabel}>Building</Text>
            <View style={styles.buildingInnerRow}>
              <Ionicons
                name="home"
                size={22}
                color="#85C1E9"
                style={styles.fieldIcon}
              />
              <Text style={styles.buildingValueText}>Test 1</Text>
            </View>
          </View>

          {/* 1. Account Name Input Box with Floating Label */}
          <View style={styles.inputContainer}>
            <Text style={styles.floatingInputLabel}>Account Name</Text>
            <View style={styles.inputBorderRow}>
              <MaterialCommunityIcons
                name="bank"
                size={22}
                color="#85C1E9"
                style={styles.fieldIcon}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Enter account name"
                placeholderTextColor="#6C7A8C"
                value={accountName}
                onChangeText={setAccountName}
                {...Platform.select({ web: { outlineStyle: "none" } })}
              />
            </View>
          </View>

          {/* 2. Phone Number Input Box with Floating Label & Country Prefix */}
          <View style={styles.inputContainer}>
            <Text style={styles.floatingInputLabel}>Phone Number</Text>
            <View style={styles.inputBorderRow}>
              <View style={styles.countryCodeBadge}>
                {/* Kenya Flag indicator color block stack decoration */}
                <View style={[styles.flagStrip, { backgroundColor: "#000" }]} />
                <View
                  style={[styles.flagStrip, { backgroundColor: "#FF0000" }]}
                />
                <View
                  style={[styles.flagStrip, { backgroundColor: "#00A884" }]}
                />
                <Text style={styles.prefixText}>+254</Text>
              </View>
              <View style={styles.verticalSplitLine} />
              <TextInput
                style={styles.textInput}
                placeholder="Phone Number"
                placeholderTextColor="#6C7A8C"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                {...Platform.select({ web: { outlineStyle: "none" } })}
              />
            </View>
          </View>

          {/* 3. SELECT FEE RESPONSIBILITY ACCORDION DROPDOWN PANEL */}
          <View style={styles.inputContainer}>
            <Text style={styles.floatingInputLabel}>
              Select fee responsibility
            </Text>

            {/* Main Trigger Selector Row Header */}
            <TouchableOpacity
              style={[
                styles.dropdownTrigger,
                isPayeeDropdownOpen && styles.dropdownTriggerActive,
              ]}
              activeOpacity={0.85}
              onPress={() => setIsPayeeDropdownOpen(!isPayeeDropdownOpen)}
            >
              <View style={styles.leftInputGroup}>
                <TouchableOpacity
                  onPress={() => setIsPayeeDropdownOpen(!isPayeeDropdownOpen)}
                  style={styles.pressableIconWrapper}
                  activeOpacity={0.6}
                >
                  <Ionicons
                    name="information-circle-outline"
                    size={20}
                    color="#85C1E9"
                  />
                </TouchableOpacity>
                <Text style={styles.dropdownValueText}>{selectedPayee}</Text>
              </View>
              <Ionicons
                name={isPayeeDropdownOpen ? "chevron-up" : "chevron-down"}
                size={16}
                color="#FFF"
              />
            </TouchableOpacity>

            {/* Inset Collapsible Vertical Selection List Options */}
            {isPayeeDropdownOpen && (
              <View style={styles.dropdownMenuBlock}>
                {filteredPayeeOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.menuItemRow}
                    activeOpacity={0.7}
                    onPress={() => {
                      setSelectedPayee(option);
                      setIsPayeeDropdownOpen(false);
                    }}
                  >
                    <Text style={styles.menuItemText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* 4. Bottom Action Buttons Row Frame */}
          {!isPayeeDropdownOpen && (
            <View style={styles.actionButtonsRow}>
              <TouchableOpacity style={styles.textButton} onPress={onClose}>
                <Text style={styles.actionBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.textButton,
                  (!accountName.trim() || !phoneNumber.trim()) &&
                    styles.disabledTextBtn,
                ]}
                onPress={handleSubmitForm}
                disabled={!accountName.trim() || !phoneNumber.trim()}
              >
                <Text style={styles.actionBtnText}>Create wallet</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
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
    width: "90%",
    maxWidth: 460,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    maxHeight: "85%",
  },
  modalTitle: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  scrollForm: {
    width: "100%",
  },
  buildingDisplayBox: {
    position: "relative",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    borderWidth: 1,
    borderColor: "#42526E",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 24,
  },
  buildingInnerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  buildingValueText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
  inputContainer: {
    position: "relative",
    width: "100%",
    marginBottom: 24,
  },
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
  inputBorderRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#42526E",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  fieldIcon: {
    marginRight: 14,
  },
  textInput: {
    flex: 1,
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
  },
  countryCodeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  flagStrip: {
    width: 3,
    height: 14,
    borderRadius: 1,
  },
  prefixText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 2,
  },
  verticalSplitLine: {
    width: 1,
    height: 22,
    backgroundColor: "#42526E",
    marginHorizontal: 12,
  },
  dropdownTrigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#42526E",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "transparent",
  },
  dropdownTriggerActive: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
  },
  leftInputGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  pressableIconWrapper: {
    padding: 4,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownValueText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "400",
  },
  dropdownMenuBlock: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#42526E",
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  menuItemRow: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(66, 82, 110, 0.4)",
  },
  menuItemText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "400",
  },
  actionButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    paddingHorizontal: 4,
  },
  textButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  disabledTextBtn: {
    opacity: 0.4,
  },
  actionBtnText: {
    color: "#85C1E9",
    fontSize: 16,
    fontWeight: "600",
  },
});
