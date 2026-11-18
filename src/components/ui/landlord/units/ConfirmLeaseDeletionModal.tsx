// components/ui/landlord/units/ConfirmLeaseDeletionModal.tsx
import { Platform, StyleSheet } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

interface ConfirmLeaseDeletionModalProps {
  visible: boolean;
  leaseStatus?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmLeaseDeletionModal({
  visible,
  leaseStatus,
  onCancel,
  onConfirm,
}: ConfirmLeaseDeletionModalProps) {
  const isTerminated = leaseStatus?.trim().toLowerCase() === "terminated";

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onCancel}
        style={styles.dialogContainer}
      >
        <Dialog.Title style={styles.title}>Confirm lease deletion</Dialog.Title>

        <Dialog.Content style={styles.content}>
          <Text style={styles.messageText}>
            Are you sure you want to permanently delete this lease? This action
            is irreversible.This action will also impact the data displayed in
            your analytics.
          </Text>

          {isTerminated && (
            <Text style={styles.secondaryWarning}>
              This action will remove all tenants and associated manual receipt
              upload payments, excluding them from the building revenue summary
              and analytics.
            </Text>
          )}
        </Dialog.Content>

        <Dialog.Actions style={styles.actions}>
          <Button
            onPress={onCancel}
            labelStyle={styles.actionLabel}
            textColor="#7BC4FA"
            rippleColor="rgba(123, 196, 250, 0.15)"
          >
            CANCEL
          </Button>

          <Button
            onPress={onConfirm}
            labelStyle={styles.actionLabel}
            textColor="#7BC4FA"
            rippleColor="rgba(123, 196, 250, 0.15)"
          >
            DELETE
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialogContainer: {
    backgroundColor: "#24313D",
    borderRadius: 16,
    width: Platform.OS === "web" ? "90%" : "86%",
    maxWidth: 420,
    alignSelf: "center",
    elevation: 8,
  },
  title: {
    color: "#F1F5F9",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 4,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 14,
  },
  messageText: {
    color: "#E2E8F0",
    fontSize: 15,
    lineHeight: 22,
  },
  secondaryWarning: {
    color: "#E2E8F0",
    fontSize: 15,
    lineHeight: 22,
  },
  actions: {
    paddingHorizontal: 16,
    paddingBottom: 14,
    justifyContent: "flex-end",
    gap: 8,
  },
  actionLabel: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.6,
  },
});
