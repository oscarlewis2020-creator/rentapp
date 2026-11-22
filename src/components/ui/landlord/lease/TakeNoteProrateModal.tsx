// components/ui/landlord/lease/TakeNoteProrateModal.tsx
import { Platform, StyleSheet } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

interface TakeNoteProrateModalProps {
  visible: boolean;
  onCancel: () => void;
  onProceed: () => void;
}

export default function TakeNoteProrateModal({
  visible,
  onCancel,
  onProceed,
}: TakeNoteProrateModalProps) {
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onCancel}
        style={styles.dialogContainer}
      >
        <Dialog.Title style={styles.title}>Take Note</Dialog.Title>

        <Dialog.Content style={styles.content}>
          <Text style={styles.bodyText}>
            prorate is not applicable when billing is done on a daily basis.
          </Text>
        </Dialog.Content>

        <Dialog.Actions style={styles.actions}>
          <Button
            onPress={onCancel}
            labelStyle={styles.btnLabel}
            textColor="#79D2FA"
            rippleColor="rgba(121, 210, 250, 0.15)"
          >
            Cancel
          </Button>
          <Button
            onPress={onProceed}
            labelStyle={styles.btnLabel}
            textColor="#79D2FA"
            rippleColor="rgba(121, 210, 250, 0.15)"
          >
            Proceed
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialogContainer: {
    backgroundColor: "#26333F",
    borderRadius: 20,
    width: Platform.OS === "web" ? "90%" : "88%",
    maxWidth: 420,
    alignSelf: "center",
  },
  title: {
    color: "#F8FAFC",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 2,
    paddingBottom: 6,
  },
  bodyText: {
    color: "#F1F5F9",
    fontSize: 16,
    lineHeight: 24,
  },
  actions: {
    paddingHorizontal: 18,
    paddingBottom: 14,
    justifyContent: "flex-end",
    gap: 14,
  },
  btnLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
});
