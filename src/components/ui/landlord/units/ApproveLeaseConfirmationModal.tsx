// components/ui/landlord/units/ApproveLeaseConfirmationModal.tsx
import { Platform, StyleSheet } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

interface ApproveLeaseConfirmationModalProps {
  visible: boolean;
  entityType?: "lease" | "tenancy";
  onCancel: () => void;
  onConfirmApprove: () => void;
}

export default function ApproveLeaseConfirmationModal({
  visible,
  entityType = "lease",
  onCancel,
  onConfirmApprove,
}: ApproveLeaseConfirmationModalProps) {
  const isTenancy = entityType === "tenancy";

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onCancel}
        style={styles.dialogContainer}
      >
        <Dialog.Title style={styles.title}>
          {isTenancy ? "Confirm Tenancy Approval" : "Confirmation"}
        </Dialog.Title>

        <Dialog.Content style={styles.content}>
          <Text style={styles.messageText}>
            Are you sure you want to approve this{" "}
            {isTenancy ? "tenancy" : "lease"}.
          </Text>
        </Dialog.Content>

        <Dialog.Actions style={styles.actions}>
          <Button
            onPress={onCancel}
            labelStyle={styles.cancelLabel}
            textColor="#89CEFF"
            rippleColor="rgba(137, 206, 255, 0.15)"
          >
            CANCEL
          </Button>

          <Button
            onPress={onConfirmApprove}
            labelStyle={styles.approveLabel}
            textColor="#89CEFF"
            rippleColor="rgba(137, 206, 255, 0.15)"
          >
            {isTenancy ? "Approve Tenancy" : "Approve Lease"}
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
    paddingHorizontal: 16,
    paddingBottom: 14,
    justifyContent: "flex-end",
    gap: 10,
  },
  cancelLabel: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.6,
  },
  approveLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
});
