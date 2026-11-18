// components/ui/landlord/units/DeleteUnitModal.tsx
import { Platform, StyleSheet, View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

interface DeleteUnitModalProps {
  visible: boolean;
  unitName?: string;
  onCancel: () => void;
  onConfirm: (e: any) => void;
}

export default function DeleteUnitModal({
  visible,
  unitName = "this unit",
  onCancel,
  onConfirm,
}: DeleteUnitModalProps) {
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onCancel}
        style={styles.dialogContainer}
      >
        <View style={styles.contentWrapper}>
          <Dialog.Title style={styles.title}>Delete Unit</Dialog.Title>

          <Dialog.Content style={styles.content}>
            <Text style={styles.messageText}>
              Are you sure you want to delete {unitName}?
            </Text>
          </Dialog.Content>

          <Dialog.Actions style={styles.actions}>
            <Button
              onPress={onCancel}
              labelStyle={styles.actionButtonLabel}
              textColor="#7BC4FA"
              rippleColor="rgba(123, 196, 250, 0.15)"
            >
              CANCEL
            </Button>
            <Button
              onPress={onConfirm}
              labelStyle={styles.actionButtonLabel}
              textColor="#7BC4FA"
              rippleColor="rgba(123, 196, 250, 0.15)"
            >
              DELETE
            </Button>
          </Dialog.Actions>
        </View>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialogContainer: {
    backgroundColor: "#24313D",
    borderRadius: 16,
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%",
    alignSelf: "center",
    elevation: 8,
  },
  contentWrapper: {
    width: "100%",
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
  },
  messageText: {
    color: "#E2E8F0",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "left",
  },
  actions: {
    paddingHorizontal: 16,
    paddingBottom: 14,
    justifyContent: "flex-end",
    gap: 8,
  },
  actionButtonLabel: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.6,
  },
});
