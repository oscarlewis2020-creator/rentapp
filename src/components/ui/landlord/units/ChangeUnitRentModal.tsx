// components/ui/landlord/units/ChangeUnitRentModal.tsx
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Platform, StyleSheet, TextInput, View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

interface ChangeUnitRentModalProps {
  visible: boolean;
  unitName: string;
  currentRentNumeric: string;
  onCancel: () => void;
  onSubmit: (newRentAmount: string) => void;
}

export default function ChangeUnitRentModal({
  visible,
  unitName,
  currentRentNumeric,
  onCancel,
  onSubmit,
}: ChangeUnitRentModalProps) {
  const [amount, setAmount] = useState(currentRentNumeric);

  useEffect(() => {
    if (visible) {
      setAmount(currentRentNumeric);
    }
  }, [visible, currentRentNumeric]);

  const handleConfirm = () => {
    const cleaned = amount.replace(/[^0-9]/g, "");
    if (!cleaned) return;
    onSubmit(cleaned);
  };

  return (
    <Portal>
      <View pointerEvents={visible ? "auto" : "none"} style={styles.portalHost}>
        <View style={styles.webFrame}>
          <Dialog visible={visible} onDismiss={onCancel} style={styles.dialog}>
            <Dialog.Title style={styles.title}>Change rent</Dialog.Title>

            <Dialog.Content style={styles.content}>
              {/* Unit badge row */}
              <View style={styles.unitBadgeBox}>
                <Ionicons name="pricetag" size={18} color="#38BDF8" />
                <Text style={styles.unitBadgeText}>Unit : {unitName}</Text>
              </View>

              {/* Rent amount input row */}
              <View style={styles.inputBox}>
                <MaterialCommunityIcons
                  name="cash-100"
                  size={22}
                  color="#38BDF8"
                />
                <TextInput
                  value={amount}
                  onChangeText={(text) =>
                    setAmount(text.replace(/[^0-9]/g, ""))
                  }
                  placeholder="New rent amount"
                  placeholderTextColor="#94A3B8"
                  keyboardType="numeric"
                  style={styles.input}
                />
              </View>
            </Dialog.Content>

            <Dialog.Actions style={styles.actions}>
              <Button
                onPress={onCancel}
                textColor="#7BC4FA"
                labelStyle={styles.btnLabel}
              >
                Cancel
              </Button>
              <Button
                onPress={handleConfirm}
                textColor="#7BC4FA"
                labelStyle={styles.btnLabel}
              >
                Submit
              </Button>
            </Dialog.Actions>
          </Dialog>
        </View>
      </View>
    </Portal>
  );
}

const styles = StyleSheet.create({
  portalHost: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
  },
  webFrame: {
    flex: 1,
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%",
    alignSelf: "center",
    justifyContent: "center",
  },
  dialog: {
    backgroundColor: "#24313D",
    borderRadius: 16,
    marginHorizontal: 24,
    elevation: 8,
  },
  title: {
    color: "#F1F5F9",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10,
  },
  content: {
    gap: 14,
    paddingTop: 6,
  },
  unitBadgeBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#2D3C4A",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  unitBadgeText: {
    color: "#E2E8F0",
    fontSize: 15,
    fontWeight: "500",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#1B252F",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#64748B",
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  input: {
    flex: 1,
    color: "#F8FAFC",
    fontSize: 15,
    paddingVertical: 10,
  },
  actions: {
    paddingHorizontal: 16,
    paddingBottom: 14,
    gap: 8,
  },
  btnLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
});
