// components/ui/landlord/lease/DateAdjustmentModal.tsx
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Platform, StyleSheet, TextInput, View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

interface DateAdjustmentModalProps {
  visible: boolean;
  title?: string;
  subtitle?: string;
  initialDateLabel?: string;
  initialDateValue?: string;
  newDateLabel?: string;
  defaultNewDateValue?: string;
  onCancel: () => void;
  onConfirmAdjust: (newDate: string) => void;
}

export default function DateAdjustmentModal({
  visible,
  title = "Adjust Due Date",
  subtitle = "Pick Your New Due Date",
  initialDateLabel = "Initial Due Date",
  initialDateValue = "Nov-20-2026",
  newDateLabel = "New Due Date",
  defaultNewDateValue = "Nov-27-2026",
  onCancel,
  onConfirmAdjust,
}: DateAdjustmentModalProps) {
  const [newDate, setNewDate] = useState(defaultNewDateValue);

  useEffect(() => {
    if (visible) {
      setNewDate(defaultNewDateValue);
    }
  }, [visible, defaultNewDateValue]);

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onCancel}
        style={styles.dialogContainer}
      >
        <Dialog.Title style={styles.title}>{title}</Dialog.Title>

        <Dialog.Content style={styles.content}>
          <Text style={styles.subtitle}>{subtitle}</Text>

          {/* Initial Date (Read-only style) */}
          <View style={styles.fieldWrapper}>
            <Text style={styles.floatingLabelMuted}>{initialDateLabel}</Text>
            <View style={styles.readOnlyBox}>
              <MaterialCommunityIcons
                name="calendar-check"
                size={22}
                color="#64748B"
              />
              <Text style={styles.readOnlyText}>{initialDateValue}</Text>
            </View>
          </View>

          {/* New Date Input */}
          <View style={styles.fieldWrapper}>
            <Text style={styles.floatingLabelActive}>{newDateLabel}</Text>
            <View style={styles.editableBox}>
              <MaterialCommunityIcons
                name="calendar-check"
                size={22}
                color="#94A3B8"
              />
              <TextInput
                value={newDate}
                onChangeText={setNewDate}
                placeholder={defaultNewDateValue}
                placeholderTextColor="#94A3B8"
                style={styles.editableInput}
              />
            </View>
          </View>
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
            onPress={() =>
              onConfirmAdjust(newDate.trim() || defaultNewDateValue)
            }
            labelStyle={styles.btnLabel}
            textColor="#7BC4FA"
            rippleColor="rgba(123, 196, 250, 0.15)"
          >
            Adjust
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
    gap: 18,
  },
  subtitle: {
    color: "#E2E8F0",
    fontSize: 16,
    textAlign: "center",
    marginTop: -4,
  },
  fieldWrapper: {
    position: "relative",
  },
  floatingLabelMuted: {
    position: "absolute",
    top: -9,
    left: 12,
    zIndex: 2,
    backgroundColor: "#202429",
    paddingHorizontal: 4,
    color: "#94A3B8",
    fontSize: 12,
  },
  floatingLabelActive: {
    position: "absolute",
    top: -9,
    left: 12,
    zIndex: 2,
    backgroundColor: "#202429",
    paddingHorizontal: 4,
    color: "#CBD5E1",
    fontSize: 12,
  },
  readOnlyBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#3A3F47",
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  readOnlyText: {
    color: "#64748B",
    fontSize: 16,
  },
  editableBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#8A8F98",
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  editableInput: {
    flex: 1,
    color: "#F8FAFC",
    fontSize: 16,
    paddingVertical: 4,
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
