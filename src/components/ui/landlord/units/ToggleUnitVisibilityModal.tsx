// components/ui/landlord/units/ToggleUnitVisibilityModal.tsx
import { Platform, StyleSheet, View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

interface ToggleUnitVisibilityModalProps {
  visible: boolean;
  unitName: string;
  isCurrentlyHidden: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ToggleUnitVisibilityModal({
  visible,
  unitName,
  isCurrentlyHidden,
  onCancel,
  onConfirm,
}: ToggleUnitVisibilityModalProps) {
  const title = isCurrentlyHidden ? "Show unit" : "Hide unit";
  const message = isCurrentlyHidden
    ? `Are you sure you want to show the unit - ${unitName} to the public ?`
    : `Are you sure you want to hide the unit - ${unitName} from the public ?`;

  return (
    <Portal>
      <View pointerEvents={visible ? "auto" : "none"} style={styles.portalHost}>
        <View style={styles.webFrame}>
          <Dialog visible={visible} onDismiss={onCancel} style={styles.dialog}>
            <Dialog.Title style={styles.title}>{title}</Dialog.Title>

            <Dialog.Content style={styles.content}>
              <Text style={styles.message}>{message}</Text>
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
                onPress={onConfirm}
                textColor="#7BC4FA"
                labelStyle={styles.btnLabel}
              >
                Proceed
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
    paddingHorizontal: 24,
    paddingBottom: 14,
  },
  message: {
    color: "#E2E8F0",
    fontSize: 15,
    lineHeight: 22,
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
