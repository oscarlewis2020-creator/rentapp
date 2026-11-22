// components/ui/landlord/lease/TerminateLeaseModal.tsx
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Platform, StyleSheet, TextInput, View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

interface TerminateLeaseModalProps {
  visible: boolean;
  initialEndDate?: string;
  defaultTerminationDate?: string;
  onCancel: () => void;
  onConfirmTerminate: (terminationDate: string) => void;
}

export default function TerminateLeaseModal({
  visible,
  initialEndDate = "Nov-16-2027",
  defaultTerminationDate = "Nov-19-2026",
  onCancel,
  onConfirmTerminate,
}: TerminateLeaseModalProps) {
  const [terminationDate, setTerminationDate] = useState(
    defaultTerminationDate,
  );

  useEffect(() => {
    if (visible) {
      setTerminationDate(defaultTerminationDate);
    }
  }, [visible, defaultTerminationDate]);

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onCancel}
        style={styles.dialogContainer}
      >
        <Dialog.Title style={styles.title}>Lease Termination</Dialog.Title>

        <Dialog.Content style={styles.content}>
          <Text style={styles.subtitle}>Specify the termination date</Text>

          {/* Initial End Date */}
          <View style={styles.fieldWrapper}>
            <Text style={styles.floatingLabelMuted}>Initial end date</Text>
            <View style={styles.readOnlyBox}>
              <MaterialCommunityIcons
                name="calendar-check"
                size={22}
                color="#64748B"
              />
              <Text style={styles.readOnlyText}>{initialEndDate}</Text>
            </View>
          </View>

          {/* Termination Date */}
          <View style={styles.fieldWrapper}>
            <Text style={styles.floatingLabelActive}>Termination date</Text>
            <View style={styles.editableBox}>
              <MaterialCommunityIcons
                name="calendar-check"
                size={22}
                color="#94A3B8"
              />
              <TextInput
                value={terminationDate}
                onChangeText={setTerminationDate}
                placeholder={defaultTerminationDate}
                placeholderTextColor="#94A3B8"
                style={styles.editableInput}
              />
            </View>
          </View>

          <Text style={styles.helperNote}>
            This lease will be billed until the end of the day you selected. If
            you don&apos;t want this day to be included, select the previous
            date.
          </Text>
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
              onConfirmTerminate(
                terminationDate.trim() || defaultTerminationDate,
              )
            }
            labelStyle={styles.btnLabel}
            textColor="#7BC4FA"
            rippleColor="rgba(123, 196, 250, 0.15)"
          >
            Terminate lease
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
  helperNote: {
    color: "#E2E8F0",
    fontSize: 15,
    lineHeight: 22,
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
