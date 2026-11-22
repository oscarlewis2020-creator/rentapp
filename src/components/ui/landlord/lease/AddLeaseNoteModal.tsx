// components/ui/landlord/lease/AddLeaseNoteModal.tsx
import { useEffect, useState } from "react";
import { Platform, StyleSheet, TextInput, View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

interface AddLeaseNoteModalProps {
  visible: boolean;
  initialValue?: string;
  modalTitle?: string;
  onCancel: () => void;
  onSubmit: (noteText: string) => void;
}

export default function AddLeaseNoteModal({
  visible,
  initialValue = "",
  modalTitle = "Add lease note",
  onCancel,
  onSubmit,
}: AddLeaseNoteModalProps) {
  const [noteText, setNoteText] = useState(initialValue);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (visible) {
      setNoteText(initialValue);
      setErrorMsg("");
    }
  }, [visible, initialValue]);

  const handleSubmit = () => {
    const trimmed = noteText.trim();
    if (!trimmed) {
      setErrorMsg("Please type a note before submitting.");
      return;
    }
    onSubmit(trimmed);
  };

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onCancel}
        style={styles.dialogContainer}
      >
        <Dialog.Title style={styles.title}>{modalTitle}</Dialog.Title>

        <Dialog.Content style={styles.content}>
          <View style={[styles.inputBox, errorMsg ? styles.inputError : null]}>
            <TextInput
              value={noteText}
              onChangeText={(val) => {
                setNoteText(val);
                if (errorMsg) setErrorMsg("");
              }}
              placeholder="Type in a a note"
              placeholderTextColor="#94A3B8"
              multiline
              textAlignVertical="top"
              style={styles.textArea}
            />
          </View>

          {!!errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
        </Dialog.Content>

        <Dialog.Actions style={styles.actions}>
          <Button
            mode="outlined"
            onPress={onCancel}
            style={styles.cancelBtn}
            labelStyle={styles.cancelLabel}
            textColor="#7BC4FA"
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.submitBtn}
            labelStyle={styles.submitLabel}
            buttonColor="#79D2FA"
            textColor="#0F172A"
          >
            Submit
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
    gap: 8,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: "#8A8F98",
    borderRadius: 8,
    minHeight: 165,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  inputError: {
    borderColor: "#F87171",
  },
  textArea: {
    color: "#F8FAFC",
    fontSize: 16,
    lineHeight: 22,
    minHeight: 140,
  },
  errorText: {
    color: "#F87171",
    fontSize: 13,
  },
  actions: {
    paddingHorizontal: 18,
    paddingBottom: 16,
    justifyContent: "flex-end",
    gap: 12,
  },
  cancelBtn: {
    borderColor: "#64748B",
    borderRadius: 10,
    paddingHorizontal: 6,
  },
  cancelLabel: {
    fontSize: 15,
    fontWeight: "600",
  },
  submitBtn: {
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  submitLabel: {
    fontSize: 15,
    fontWeight: "600",
  },
});
