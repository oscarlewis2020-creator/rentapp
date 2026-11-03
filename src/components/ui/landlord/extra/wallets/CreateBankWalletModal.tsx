// components/ui/landlord/wallets/CreateBankWalletModal.tsx
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
import { BankSelectionModal } from "./BankSelectionModal";

interface CreateBankWalletModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
}

const PAYEE_OPTIONS = ["Tenant", "Management"];

export function CreateBankWalletModal({
  visible,
  onClose,
  onSubmit,
}: CreateBankWalletModalProps) {
  const [accountName, setAccountName] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Dropdown visibility states
  const [isPayeeDropdownOpen, setIsPayeeDropdownOpen] = useState(false);
  const [selectedPayee, setSelectedPayee] = useState("Tenant");
  const [bankPickerOpen, setBankPickerOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState("Bank");

  const filteredPayeeOptions = PAYEE_OPTIONS.filter(
    (opt) => opt !== selectedPayee,
  );

  const clearForm = () => {
    setAccountName("");
    setAccountNo("");
    setPhoneNumber("");
    setSelectedPayee("Tenant");
    setSelectedBank("Bank");
    setIsPayeeDropdownOpen(false);
    setBankPickerOpen(false);
  };

  const handleClose = () => {
    clearForm();
    onClose();
  };

  const handleSubmitForm = () => {
    if (
      !accountName.trim() ||
      !accountNo.trim() ||
      !phoneNumber.trim() ||
      selectedBank === "Bank"
    ) {
      return;
    }

    onSubmit({
      accountName,
      accountNo,
      phoneNumber,
      feeResponsibility: selectedPayee,
      bank: selectedBank,
    });
    clearForm();
    onClose();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={handleClose}
        dismissable={true}
        style={styles.modalOverlay}
        contentContainerStyle={styles.dialogCard}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollForm}
          contentContainerStyle={styles.scrollFormContent}
        >
          {/* Building Ribbon Banner Header Display */}
          <View style={styles.buildingDisplayBox}>
            <View style={styles.flagRibbon} />
            <View style={styles.buildingInfoColumn}>
              <Text style={styles.buildingSubLabel}>Building</Text>
              <Text style={styles.buildingValueText}>Test 1</Text>
            </View>
          </View>

          {/* 1. Account Name Input Box */}
          <View style={styles.inputBorderRow}>
            <MaterialCommunityIcons
              name="bank"
              size={22}
              color="#85C1E9"
              style={styles.fieldIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Account Name"
              placeholderTextColor="#6C7A8C"
              value={accountName}
              onChangeText={setAccountName}
              {...Platform.select({ web: { outlineStyle: "none" } })}
            />
          </View>

          {/* 2. Account Number Input Box */}
          <View style={styles.inputBorderRow}>
            <MaterialCommunityIcons
              name="credit-card-outline"
              size={22}
              color="#85C1E9"
              style={styles.fieldIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Account Number"
              placeholderTextColor="#6C7A8C"
              keyboardType="numeric"
              value={accountNo}
              onChangeText={setAccountNo}
              {...Platform.select({ web: { outlineStyle: "none" } })}
            />
          </View>

          {/* 3. Phone Number Input Box with Country Prefix Block */}
          <View style={styles.inputBorderRow}>
            <View style={styles.countryCodeBadge}>
              <View style={styles.miniFlagContainer}>
                <View style={[styles.flagStrip, { backgroundColor: "#000" }]} />
                <View
                  style={[styles.flagStrip, { backgroundColor: "#FF0000" }]}
                />
                <View
                  style={[styles.flagStrip, { backgroundColor: "#00A884" }]}
                />
              </View>
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

          {/* 4. FEE RESPONSIBILITY DROPDOWN PANEL */}
          <View style={styles.inputContainer}>
            <Text style={styles.floatingInputLabel}>
              Select fee responsibility
            </Text>
            <View style={styles.dropdownWithIconRow}>
              <TouchableOpacity
                style={[
                  styles.dropdownTrigger,
                  isPayeeDropdownOpen && styles.dropdownTriggerActive,
                ]}
                activeOpacity={0.85}
                onPress={() => {
                  setIsPayeeDropdownOpen(!isPayeeDropdownOpen);
                }}
              >
                <Text style={styles.dropdownValueText}>{selectedPayee}</Text>
                <Ionicons
                  name={isPayeeDropdownOpen ? "chevron-up" : "chevron-down"}
                  size={16}
                  color="#FFF"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.infoFloatingBadge}
                activeOpacity={0.6}
              >
                <Ionicons
                  name="information-circle-outline"
                  size={22}
                  color="#85C1E9"
                />
              </TouchableOpacity>
            </View>

            {isPayeeDropdownOpen && (
              <View style={styles.dropdownMenuBlock}>
                {filteredPayeeOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.menuItemRow}
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

          {/* 5. BANK CHANNELS BOTTOM SHEET TRIGGER PANEL */}
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={styles.dropdownTrigger}
              activeOpacity={0.85}
              onPress={() => {
                setIsPayeeDropdownOpen(false);
                setBankPickerOpen(true);
              }}
            >
              <View style={styles.leftInputGroup}>
                <MaterialCommunityIcons
                  name="bank"
                  size={22}
                  color="#85C1E9"
                  style={styles.fieldIcon}
                />
                <Text
                  style={[
                    styles.dropdownValueText,
                    selectedBank === "Bank" && styles.placeholderColor,
                  ]}
                >
                  {selectedBank}
                </Text>
              </View>
              <Ionicons name="chevron-down" size={16} color="#9EA5B1" />
            </TouchableOpacity>
          </View>

          {/* 6. SUBMIT ACCENT PILL ACTION BUTTON */}
          {!isPayeeDropdownOpen && (
            <TouchableOpacity
              style={[
                styles.submitPillButton,
                (!accountName.trim() ||
                  !accountNo.trim() ||
                  !phoneNumber.trim() ||
                  selectedBank === "Bank") &&
                  styles.disabledButton,
              ]}
              onPress={handleSubmitForm}
              disabled={
                !accountName.trim() ||
                !accountNo.trim() ||
                !phoneNumber.trim() ||
                selectedBank === "Bank"
              }
              activeOpacity={0.8}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          )}
        </ScrollView>

        {/* INJECT THE LIVE PORTAL BANK PICKER OVERLAY LAYER HERE */}
        <BankSelectionModal
          visible={bankPickerOpen}
          onClose={() => setBankPickerOpen(false)}
          selectedBank={selectedBank}
          onSelectBank={(bankChoice) => setSelectedBank(bankChoice)}
        />
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  dialogCard: {
    backgroundColor: "#171F2A",
    width: "92%",
    maxWidth: 450,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#242F42",
    maxHeight: "85%",
  },
  scrollForm: {
    width: "100%",
  },
  scrollFormContent: {
    paddingVertical: 10,
    gap: 16,
  },
  buildingDisplayBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    borderWidth: 1,
    borderColor: "#2C3545",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 16,
  },
  flagRibbon: {
    width: 12,
    height: 16,
    backgroundColor: "#85C1E9",
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
  buildingInfoColumn: {
    flexDirection: "column",
  },
  buildingSubLabel: {
    color: "#6C7A8C",
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 2,
  },
  buildingValueText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
  inputBorderRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2C3545",
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
    gap: 8,
  },
  miniFlagContainer: {
    gap: 1.5,
  },
  flagStrip: {
    width: 16,
    height: 3.5,
    borderRadius: 0.5,
  },
  prefixText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  verticalSplitLine: {
    width: 1,
    height: 24,
    backgroundColor: "#2C3545",
    marginHorizontal: 14,
  },
  inputContainer: {
    position: "relative",
    width: "100%",
  },
  floatingInputLabel: {
    position: "absolute",
    left: 12,
    top: -9,
    backgroundColor: "#171F2A",
    paddingHorizontal: 6,
    fontSize: 12,
    color: "#9EA5B1",
    zIndex: 10,
  },
  dropdownWithIconRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  dropdownTrigger: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#2C3545",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
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
  dropdownValueText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "400",
  },
  placeholderColor: {
    color: "#6C7A8C",
  },
  infoFloatingBadge: {
    marginLeft: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownMenuBlock: {
    backgroundColor: "#171F2A",
    borderWidth: 1,
    borderColor: "#2C3545",
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
  },
  submitPillButton: {
    backgroundColor: "#73C2FB",
    width: "55%",
    alignSelf: "center",
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: "#121824",
    fontSize: 16,
    fontWeight: "700",
  },
});
