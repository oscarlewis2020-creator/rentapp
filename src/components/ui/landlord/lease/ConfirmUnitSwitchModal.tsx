// components/ui/landlord/lease/ConfirmUnitSwitchModal.tsx
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

interface ConfirmUnitSwitchModalProps {
  visible: boolean;
  availableUnits?: string[];
  onCancel: () => void;
  onConfirmSwitch: (selectedUnit: string) => void;
}

const DEFAULT_UNITS = [
  "Room 1",
  "Room 2",
  "Room 3",
  "Room 4",
  "Room 5",
  "Room 6",
];

export default function ConfirmUnitSwitchModal({
  visible,
  availableUnits = DEFAULT_UNITS,
  onCancel,
  onConfirmSwitch,
}: ConfirmUnitSwitchModalProps) {
  const [selectedUnit, setSelectedUnit] = useState<string>("");
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (visible) {
      setSelectedUnit("");
      setIsPickerOpen(false);
      setErrorMsg("");
    }
  }, [visible]);

  const handleConfirm = () => {
    if (!selectedUnit) {
      setErrorMsg("Please select a unit to switch to.");
      return;
    }
    onConfirmSwitch(selectedUnit);
  };

  return (
    <>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={onCancel}
          style={styles.dialogContainer}
        >
          <Dialog.Title style={styles.title}>Confirm Unit Switch</Dialog.Title>

          <Dialog.Content style={styles.content}>
            <Text style={styles.bodyText}>
              Are you sure you want to switch the tenant to the new unit? This
              action will update the tenant&apos;s unit assignment and adjust
              billing accordingly.
            </Text>

            <Pressable
              onPress={() => setIsPickerOpen(true)}
              style={[
                styles.dropdownBox,
                errorMsg ? styles.dropdownError : null,
              ]}
            >
              <View style={styles.dropdownLeft}>
                <MaterialCommunityIcons name="bed" size={22} color="#94A3B8" />
                <Text
                  style={[
                    styles.dropdownLabel,
                    selectedUnit && styles.dropdownLabelSelected,
                  ]}
                >
                  {selectedUnit || "Select a unit"}
                </Text>
              </View>
              <MaterialCommunityIcons
                name="menu-down"
                size={22}
                color="#E2E8F0"
              />
            </Pressable>

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
              onPress={handleConfirm}
              labelStyle={styles.btnLabel}
              textColor="#7BC4FA"
              rippleColor="rgba(123, 196, 250, 0.15)"
            >
              Confirm
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Modal
        visible={isPickerOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsPickerOpen(false)}
      >
        <Pressable
          style={styles.pickerBackdrop}
          onPress={() => setIsPickerOpen(false)}
        >
          <Pressable
            onPress={(e) => e.stopPropagation()}
            style={styles.pickerCard}
          >
            <Text style={styles.pickerTitle}>Select a unit</Text>
            <ScrollView style={styles.pickerScroll}>
              {availableUnits.map((unit) => (
                <Pressable
                  key={unit}
                  onPress={() => {
                    setSelectedUnit(unit);
                    setErrorMsg("");
                    setIsPickerOpen(false);
                  }}
                  style={styles.pickerItem}
                >
                  <Text style={styles.pickerItemText}>{unit}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
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
  bodyText: {
    color: "#E2E8F0",
    fontSize: 16,
    lineHeight: 23,
  },
  dropdownBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#8A8F98",
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  dropdownError: {
    borderColor: "#F87171",
  },
  dropdownLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dropdownLabel: {
    color: "#CBD5E1",
    fontSize: 16,
  },
  dropdownLabelSelected: {
    color: "#F8FAFC",
    fontWeight: "500",
  },
  errorText: {
    color: "#F87171",
    fontSize: 13,
    marginTop: -8,
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
  pickerBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  pickerCard: {
    width: "100%",
    maxWidth: 340,
    maxHeight: 360,
    backgroundColor: "#252A30",
    borderRadius: 16,
    paddingVertical: 12,
  },
  pickerTitle: {
    color: "#F8FAFC",
    fontSize: 17,
    fontWeight: "600",
    paddingHorizontal: 18,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#363C45",
  },
  pickerScroll: {
    paddingVertical: 4,
  },
  pickerItem: {
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  pickerItemText: {
    color: "#E2E8F0",
    fontSize: 16,
  },
});
