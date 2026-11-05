import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal as PaperModal, Portal } from "react-native-paper";

interface LatePaymentFeeConfigModalProps {
  isVisible: boolean;
  onClose: () => void;
  onUpdate: (
    type: "Waive" | "Percent" | "Fixed",
    value: string,
    days: string,
  ) => void;
}

export default function LatePaymentFeeConfigModal({
  isVisible,
  onClose,
  onUpdate,
}: LatePaymentFeeConfigModalProps) {
  const [feeType, setFeeType] = useState<"Waive" | "Percent" | "Fixed">(
    "Percent",
  );
  const [percentValue, setPercentValue] = useState("10");
  const [daysAfter, setDaysAfter] = useState("4");

  return (
    <Portal>
      <PaperModal
        visible={isVisible}
        onDismiss={onClose}
        contentContainerStyle={styles.paperOverride}
      >
        <View style={styles.modalCard}>
          <TouchableOpacity style={styles.closeAbsoluteIcon} onPress={onClose}>
            <Ionicons name="close" size={22} color="#8a94a6" />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>LATE PAYMENT FEE</Text>
          <Text style={styles.modalDescription}>
            If 'percent' is selected, the value will be calculated based on rent
            amount that is applicable at the time the fee is imposed. This fee
            shall be added to the rent amount 4 days after the due date
          </Text>

          {/* Custom Radio Group Selection Alignment Matrix */}
          <View style={styles.radioGroupRow}>
            {/* Waive Option */}
            <TouchableOpacity
              style={styles.radioButtonOption}
              onPress={() => setFeeType("Waive")}
            >
              <Ionicons
                name={
                  feeType === "Waive" ? "radio-button-on" : "radio-button-off"
                }
                size={22}
                color="#4fa3f7"
              />
              <Text style={styles.radioLabelText}>Waive</Text>
            </TouchableOpacity>

            {/* Percent Option */}
            <TouchableOpacity
              style={styles.radioButtonOption}
              onPress={() => setFeeType("Percent")}
            >
              <Ionicons
                name={
                  feeType === "Percent" ? "radio-button-on" : "radio-button-off"
                }
                size={22}
                color="#4fa3f7"
              />
              <Text style={styles.radioLabelText}>Percent</Text>
            </TouchableOpacity>

            {/* Fixed Amount Option */}
            <TouchableOpacity
              style={styles.radioButtonOption}
              onPress={() => setFeeType("Fixed")}
            >
              <Ionicons
                name={
                  feeType === "Fixed" ? "radio-button-on" : "radio-button-off"
                }
                size={22}
                color="#4fa3f7"
              />
              <Text style={styles.radioLabelText}>Fixed Amount</Text>
            </TouchableOpacity>
          </View>

          {/* Outlined Form Field Input Stack */}
          <View style={styles.formRowContainer}>
            <View style={styles.outlinedFormCard}>
              <Text style={styles.fieldsetFloatingLabel}>Percent Value</Text>
              <View style={styles.fieldInnerContent}>
                <TextInput
                  style={styles.textInput}
                  value={percentValue}
                  onChangeText={setPercentValue}
                  keyboardType="numeric"
                />
                <Text style={styles.percentageSymbolText}>%</Text>
              </View>
            </View>

            <View style={styles.outlinedFormCard}>
              <Text style={styles.fieldsetFloatingLabel}>Days After</Text>
              <TextInput
                style={styles.textInput}
                value={daysAfter}
                onChangeText={setDaysAfter}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Submission Action Control Array */}
          <View style={styles.actionButtonsRow}>
            <TouchableOpacity
              style={styles.cancelRoundButton}
              onPress={onClose}
            >
              <Text style={styles.cancelRoundButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.updateRoundButton}
              onPress={() => onUpdate(feeType, percentValue, daysAfter)}
            >
              <Text style={styles.updateRoundButtonText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </PaperModal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  paperOverride: { flex: 1, justifyContent: "center", alignItems: "center" },
  modalCard: {
    width: "100%",
    maxWidth: 370,
    backgroundColor: "#1c2431",
    borderRadius: 24,
    padding: 24,
    position: "relative",
  },
  closeAbsoluteIcon: {
    position: "absolute",
    top: 16,
    right: 16,
    padding: 4,
    zIndex: 10,
    ...Platform.select({ web: { cursor: "pointer" } }),
  },
  modalTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
    marginBottom: 16,
    textAlign: "center",
  },
  modalDescription: {
    color: "#cbd5e1",
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 20,
  },
  radioGroupRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    paddingHorizontal: 2,
  },
  radioButtonOption: { flexDirection: "row", alignItems: "center", gap: 6 },
  radioLabelText: { color: "#ffffff", fontSize: 13, fontWeight: "400" },
  formRowContainer: { flexDirection: "row", gap: 16, marginBottom: 32 },
  outlinedFormCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#4fa3f7",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    position: "relative",
    backgroundColor: "#161c24",
    height: 56,
    justifyContent: "center",
  },
  fieldsetFloatingLabel: {
    position: "absolute",
    top: -10,
    left: 16,
    backgroundColor: "#1c2431",
    paddingHorizontal: 6,
    color: "#8a94a6",
    fontSize: 12,
  },
  fieldInnerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textInput: {
    flex: 1,
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
    ...Platform.select({ web: { outlineStyle: "none" } as any }),
  },
  percentageSymbolText: { color: "#4fa3f7", fontSize: 16, fontWeight: "600" },
  actionButtonsRow: { flexDirection: "row", gap: 16 },
  cancelRoundButton: {
    flex: 1,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: "#343e50",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelRoundButtonText: { color: "#4fa3f7", fontSize: 15, fontWeight: "500" },
  updateRoundButton: {
    flex: 1,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#86d3ff",
    alignItems: "center",
    justifyContent: "center",
  },
  updateRoundButtonText: { color: "#161c24", fontSize: 15, fontWeight: "600" },
});
