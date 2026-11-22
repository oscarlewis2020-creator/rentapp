// components/ui/landlord/lease/WaiveRentModal.tsx
import { useEffect, useState } from "react";
import { Platform, StyleSheet, TextInput, View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

interface WaiveRentModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirmWaive: (amount: number) => void;
}

export default function WaiveRentModal({
  visible,
  onCancel,
  onConfirmWaive,
}: WaiveRentModalProps) {
  const [amountInput, setAmountInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (visible) {
      setAmountInput("");
      setErrorMsg("");
    }
  }, [visible]);

  const handleWaivePress = () => {
    const parsed = Number(amountInput.replace(/,/g, "").trim());
    if (!amountInput.trim() || Number.isNaN(parsed) || parsed <= 0) {
      setErrorMsg("Please enter a valid amount to waive.");
      return;
    }
    onConfirmWaive(parsed);
  };

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onCancel}
        style={styles.dialogContainer}
      >
        <Dialog.Title style={styles.title}>Waive Rent</Dialog.Title>

        <Dialog.Content style={styles.content}>
          <View style={[styles.inputBox, errorMsg ? styles.inputError : null]}>
            <TextInput
              value={amountInput}
              onChangeText={(val) => {
                setAmountInput(val);
                if (errorMsg) setErrorMsg("");
              }}
              placeholder="amount to waive"
              placeholderTextColor="#94A3B8"
              keyboardType="numeric"
              style={styles.textInput}
            />
          </View>

          {!!errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
        </Dialog.Content>

        <Dialog.Actions style={styles.actions}>
          <Button
            onPress={onCancel}
            labelStyle={styles.btnLabel}
            textColor="#7BC4FA"
            rippleColor="rgba(123, 196, 250, 0.15)"
          >
            Cancel
          </Button>
          <Button
            onPress={handleWaivePress}
            labelStyle={styles.btnLabel}
            textColor="#7BC4FA"
            rippleColor="rgba(123, 196, 250, 0.15)"
          >
            Waive
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
    marginTop: 8,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 4,
    gap: 8,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: "#8A8F98",
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  inputError: {
    borderColor: "#F87171",
  },
  textInput: {
    color: "#F8FAFC",
    fontSize: 16,
    paddingVertical: 4,
  },
  errorText: {
    color: "#F87171",
    fontSize: 13,
  },
  actions: {
    paddingHorizontal: 16,
    paddingBottom: 14,
    justifyContent: "flex-end",
    gap: 12,
  },
  btnLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
});
