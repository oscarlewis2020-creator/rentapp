// components/ui/landlord/lease/ChangeRentModal.tsx
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Platform, StyleSheet, TextInput, View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

interface ChangeRentModalProps {
  visible: boolean;
  unitName: string;
  initialEffectiveDate?: string;
  onCancel: () => void;
  onSubmit: (payload: { newRentAmount: number; effectiveDate: string }) => void;
}

export default function ChangeRentModal({
  visible,
  unitName,
  initialEffectiveDate = "Nov-20-2026",
  onCancel,
  onSubmit,
}: ChangeRentModalProps) {
  const [rentInput, setRentInput] = useState("");
  const [effectiveDate, setEffectiveDate] = useState(initialEffectiveDate);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (visible) {
      setRentInput("");
      setEffectiveDate(initialEffectiveDate);
      setErrorMsg("");
    }
  }, [visible, initialEffectiveDate]);

  const handleConfirm = () => {
    const parsed = Number(rentInput.replace(/,/g, "").trim());
    if (!rentInput.trim() || Number.isNaN(parsed) || parsed <= 0) {
      setErrorMsg("Please enter a valid new rent amount.");
      return;
    }
    onSubmit({
      newRentAmount: parsed,
      effectiveDate: effectiveDate.trim() || initialEffectiveDate,
    });
  };

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onCancel}
        style={styles.dialogContainer}
      >
        <Dialog.Title style={styles.title}>Change rent</Dialog.Title>

        <Dialog.Content style={styles.content}>
          {/* Unit Readout Pill */}
          <View style={styles.unitBox}>
            <Ionicons name="pricetag" size={18} color="#94A3B8" />
            <Text style={styles.unitText}>Unit : {unitName}</Text>
          </View>

          {/* New Rent Amount Input */}
          <View style={[styles.inputBox, errorMsg ? styles.inputError : null]}>
            <MaterialCommunityIcons name="cash-100" size={22} color="#94A3B8" />
            <TextInput
              value={rentInput}
              onChangeText={(val) => {
                setRentInput(val);
                if (errorMsg) setErrorMsg("");
              }}
              placeholder="New rent amount"
              placeholderTextColor="#94A3B8"
              keyboardType="numeric"
              style={styles.textInput}
            />
          </View>

          {!!errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

          {/* New Rate Effective On */}
          <View style={styles.dateWrapper}>
            <Text style={styles.dateFloatingLabel}>New rate effective on</Text>
            <View style={styles.dateBox}>
              <MaterialCommunityIcons
                name="calendar-check"
                size={22}
                color="#94A3B8"
              />
              <TextInput
                value={effectiveDate}
                onChangeText={setEffectiveDate}
                placeholder="Nov-20-2026"
                placeholderTextColor="#94A3B8"
                style={styles.textInput}
              />
            </View>
          </View>
        </Dialog.Content>

        <Dialog.Actions style={styles.actions}>
          <Button
            onPress={onCancel}
            labelStyle={styles.actionBtnLabel}
            textColor="#7BC4FA"
            rippleColor="rgba(123, 196, 250, 0.15)"
          >
            Cancel
          </Button>
          <Button
            onPress={handleConfirm}
            labelStyle={styles.actionBtnLabel}
            textColor="#7BC4FA"
            rippleColor="rgba(123, 196, 250, 0.15)"
          >
            Submit
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialogContainer: {
    backgroundColor: "#202429",
    borderRadius: 22,
    width: Platform.OS === "web" ? "90%" : "88%",
    maxWidth: 420,
    alignSelf: "center",
  },
  title: {
    color: "#F8FAFC",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 8,
  },
  content: {
    paddingHorizontal: 18,
    gap: 16,
  },
  unitBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#2C3036",
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 15,
  },
  unitText: {
    color: "#E2E8F0",
    fontSize: 16,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#8A8F98",
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  inputError: {
    borderColor: "#F87171",
  },
  textInput: {
    flex: 1,
    color: "#F8FAFC",
    fontSize: 16,
    paddingVertical: 4,
  },
  errorText: {
    color: "#F87171",
    fontSize: 13,
    marginTop: -10,
  },
  dateWrapper: {
    position: "relative",
    marginTop: 4,
  },
  dateFloatingLabel: {
    position: "absolute",
    top: -9,
    left: 12,
    zIndex: 2,
    backgroundColor: "#202429",
    paddingHorizontal: 4,
    color: "#CBD5E1",
    fontSize: 12,
  },
  dateBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#8A8F98",
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  actions: {
    paddingHorizontal: 16,
    paddingBottom: 14,
    justifyContent: "flex-end",
    gap: 12,
  },
  actionBtnLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
});
