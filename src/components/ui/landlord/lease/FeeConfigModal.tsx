// components/ui/landlord/lease/FeeConfigModal.tsx
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Platform, Pressable, StyleSheet, TextInput, View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

export type FeeModeType = "waive" | "percent" | "fixed";

interface FeeConfigModalProps {
  visible: boolean;
  variant: "security_deposit" | "late_payment_fee";
  initialMode?: FeeModeType;
  initialAmountOrPercent?: string;
  initialDaysAfter?: string;
  onCancel: () => void;
  onUpdate: (payload: {
    mode: FeeModeType;
    value: string;
    daysAfter: string;
  }) => void;
}

export default function FeeConfigModal({
  visible,
  variant,
  initialMode,
  initialAmountOrPercent,
  initialDaysAfter,
  onCancel,
  onUpdate,
}: FeeConfigModalProps) {
  const isDeposit = variant === "security_deposit";

  const defaultMode: FeeModeType =
    initialMode || (isDeposit ? "fixed" : "percent");
  const defaultVal = initialAmountOrPercent || (isDeposit ? "15000" : "10");
  const defaultDays = initialDaysAfter || (isDeposit ? "15" : "4");

  const [mode, setMode] = useState<FeeModeType>(defaultMode);
  const [valueInput, setValueInput] = useState(defaultVal);
  const [daysInput, setDaysInput] = useState(defaultDays);

  useEffect(() => {
    if (visible) {
      setMode(defaultMode);
      setValueInput(defaultVal);
      setDaysInput(defaultDays);
    }
  }, [visible, defaultMode, defaultVal, defaultDays]);

  const headerTitle = isDeposit ? "SECURITY DEPOSIT" : "LATE PAYMENT FEE";

  const descriptionText = isDeposit
    ? `The deposit shall be returned to the tenant ${daysInput || "15"} days after the lease end date. This change will override existing security deposit configuration.`
    : `This fee shall be added to the rent amount ${daysInput || "4"} days after the due date. This change will take effect from now going forward. Past fees shall be left untouched.`;

  const valueFloatingLabel =
    mode === "percent" ? "Percent Value" : "Fixed Amount";

  const radioOptions: { key: FeeModeType; label: string }[] = [
    { key: "waive", label: "Waive" },
    { key: "percent", label: "Percent" },
    { key: "fixed", label: "Fixed Amount" },
  ];

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onCancel}
        style={styles.dialogContainer}
      >
        {/* Top-Right Close X */}
        <Pressable onPress={onCancel} hitSlop={10} style={styles.topCloseBtn}>
          <Ionicons name="close" size={24} color="#E2E8F0" />
        </Pressable>

        <Text style={styles.headerTitle}>{headerTitle}</Text>

        <Dialog.Content style={styles.content}>
          <Text style={styles.descriptionText}>{descriptionText}</Text>

          {/* Radio Row: Waive | Percent | Fixed Amount */}
          <View style={styles.radioRow}>
            {radioOptions.map((opt) => {
              const selected = mode === opt.key;
              return (
                <Pressable
                  key={opt.key}
                  onPress={() => setMode(opt.key)}
                  style={styles.radioItem}
                >
                  <View
                    style={[
                      styles.radioOuter,
                      selected && styles.radioOuterSelected,
                    ]}
                  >
                    {selected && <View style={styles.radioInner} />}
                  </View>
                  <Text style={styles.radioLabel}>{opt.label}</Text>
                </Pressable>
              );
            })}
          </View>

          {/* Two Side-by-Side Inputs (unless Waive is selected) */}
          {mode !== "waive" && (
            <View style={styles.inputsRow}>
              <View style={styles.fieldCol}>
                <Text style={styles.floatingLabel}>{valueFloatingLabel}</Text>
                <View style={styles.inputBox}>
                  <TextInput
                    value={valueInput}
                    onChangeText={setValueInput}
                    keyboardType="numeric"
                    style={styles.inputText}
                  />
                  {mode === "percent" && (
                    <Text style={styles.suffixText}>%</Text>
                  )}
                </View>
              </View>

              <View style={styles.fieldCol}>
                <Text style={styles.floatingLabel}>Days After</Text>
                <View style={styles.inputBox}>
                  <TextInput
                    value={daysInput}
                    onChangeText={setDaysInput}
                    keyboardType="numeric"
                    style={styles.inputText}
                  />
                </View>
              </View>
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.buttonsRow}>
            <Button
              mode="contained"
              onPress={onCancel}
              style={styles.cancelBtn}
              labelStyle={styles.cancelLabel}
              buttonColor="#0A3A4E"
              textColor="#79D2FA"
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={() =>
                onUpdate({
                  mode,
                  value: mode === "waive" ? "0" : valueInput.trim(),
                  daysAfter: daysInput.trim(),
                })
              }
              style={styles.updateBtn}
              labelStyle={styles.updateLabel}
              buttonColor="#79D2FA"
              textColor="#0F172A"
            >
              Update
            </Button>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialogContainer: {
    backgroundColor: "#26333F",
    borderRadius: 20,
    width: Platform.OS === "web" ? "92%" : "90%",
    maxWidth: 440,
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 14,
  },
  topCloseBtn: {
    alignSelf: "flex-end",
    marginRight: 14,
    marginTop: 2,
    padding: 4,
  },
  headerTitle: {
    color: "#F8FAFC",
    fontSize: 19,
    fontWeight: "600",
    letterSpacing: 0.6,
    textAlign: "center",
    marginBottom: 12,
  },
  content: {
    paddingHorizontal: 16,
    gap: 18,
  },
  descriptionText: {
    color: "#E2E8F0",
    fontSize: 15,
    lineHeight: 22,
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 8,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterSelected: {
    borderColor: "#79D2FA",
  },
  radioInner: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: "#79D2FA",
  },
  radioLabel: {
    color: "#F8FAFC",
    fontSize: 15,
  },
  inputsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 4,
  },
  fieldCol: {
    flex: 1,
    position: "relative",
  },
  floatingLabel: {
    position: "absolute",
    top: -9,
    left: 12,
    zIndex: 2,
    backgroundColor: "#26333F",
    paddingHorizontal: 4,
    color: "#CBD5E1",
    fontSize: 12,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1.5,
    borderColor: "#79D2FA",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  inputText: {
    flex: 1,
    color: "#F8FAFC",
    fontSize: 16,
    paddingVertical: 2,
  },
  suffixText: {
    color: "#CBD5E1",
    fontSize: 16,
    marginLeft: 6,
  },
  buttonsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    marginTop: 6,
  },
  cancelBtn: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 4,
  },
  cancelLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  updateBtn: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 4,
  },
  updateLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
});
