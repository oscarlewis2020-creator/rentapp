// components/ui/landlord/units/DeleteTenancyModal.tsx
import { Platform, StyleSheet } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

interface DeleteTenancyModalProps {
  visible: boolean;
  tenantName?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteTenancyModal({
  visible,
  onCancel,
  onConfirm,
}: DeleteTenancyModalProps) {
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onCancel}
        style={styles.dialogContainer}
      >
        <Dialog.Title style={styles.title}>Delete Tenancy</Dialog.Title>

        <Dialog.Content style={styles.content}>
          <Text style={styles.messageText}>
            Are you sure you want to permanently delete this tenant? This action
            is irreversible.
          </Text>
        </Dialog.Content>

        <Dialog.Actions style={styles.actions}>
          <Button
            onPress={onCancel}
            labelStyle={styles.actionLabel}
            textColor="#89CEFF"
            rippleColor="rgba(137, 206, 255, 0.15)"
          >
            Cancel
          </Button>

          <Button
            onPress={onConfirm}
            labelStyle={styles.actionLabel}
            textColor="#89CEFF"
            rippleColor="rgba(137, 206, 255, 0.15)"
          >
            Delete
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialogContainer: {
    backgroundColor: "#23303C",
    borderRadius: 20,
    width: Platform.OS === "web" ? "90%" : "86%",
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
    paddingHorizontal: 24,
    paddingBottom: 14,
  },
  messageText: {
    color: "#E2E8F0",
    fontSize: 15,
    lineHeight: 22,
  },
  actions: {
    paddingHorizontal: 18,
    paddingBottom: 14,
    justifyContent: "flex-end",
    gap: 8,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
});
