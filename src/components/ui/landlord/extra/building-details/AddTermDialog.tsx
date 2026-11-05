// components/ui/landlord/buildings/AddTermDialog.tsx
import { useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal, Portal } from "react-native-paper";

interface AddTermDialogProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (title: string, description: string) => void;
  initialTitle?: string;
  initialDescription?: string;
}

export function AddTermDialog({
  visible,
  onClose,
  onAdd,
  initialTitle = "",
  initialDescription = "",
}: AddTermDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // 💡 Pre-populate fields automatically whenever an initial item payload injection changes
  useEffect(() => {
    if (visible) {
      setTitle(initialTitle);
      setDescription(initialDescription);
    }
  }, [visible, initialTitle, initialDescription]);

  const handleAddSubmit = () => {
    if (!title.trim() || !description.trim()) return;
    onAdd(title, description);
    setTitle("");
    setDescription("");
    onClose();
  };

  const handleCancelClose = () => {
    setTitle("");
    setDescription("");
    onClose();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={handleCancelClose}
        dismissable={true}
        style={styles.modalOverlay}
        contentContainerStyle={styles.dialogCard}
      >
        <Text style={styles.dialogTitle}>
          {initialTitle ? "Edit Term" : "Add Term"}
        </Text>

        <View style={styles.inputFrameBox}>
          <TextInput
            style={styles.singleLineInput}
            placeholder="Title"
            placeholderTextColor="#9EA5B1"
            value={title}
            onChangeText={setTitle}
            {...Platform.select({ web: { outlineStyle: "none" } })}
          />
        </View>

        <View style={[styles.inputFrameBox, styles.textAreaFrameBox]}>
          <TextInput
            style={styles.multiLineTextArea}
            placeholder="Term description"
            placeholderTextColor="#9EA5B1"
            value={description}
            onChangeText={setDescription}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
            {...Platform.select({ web: { outlineStyle: "none" } })}
          />
        </View>

        <View style={styles.actionRowTray}>
          <TouchableOpacity
            style={styles.cancelPillBtn}
            onPress={handleCancelClose}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.addPillBtn,
              (!title.trim() || !description.trim()) && styles.disabledAddBtn,
            ]}
            onPress={handleAddSubmit}
            disabled={!title.trim() || !description.trim()}
            activeOpacity={0.8}
          >
            <Text style={styles.addBtnText}>
              {initialTitle ? "Save" : "Add"}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    zIndex: 30,
  },
  dialogCard: {
    backgroundColor: "#1F2933",
    width: "84%",
    maxWidth: 400,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.04)",
  },
  dialogTitle: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  inputFrameBox: {
    borderWidth: 1,
    borderColor: "#42526E",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
  },
  textAreaFrameBox: { height: 120, paddingVertical: 8, marginBottom: 24 },
  singleLineInput: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
    width: "100%",
  },
  multiLineTextArea: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "400",
    width: "100%",
    height: "100%",
  },
  actionRowTray: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  cancelPillBtn: {
    backgroundColor: "#24323D",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 24,
  },
  cancelBtnText: { color: "#85C1E9", fontSize: 15, fontWeight: "700" },
  addPillBtn: {
    backgroundColor: "#85C1E9",
    paddingVertical: 12,
    paddingHorizontal: 36,
    borderRadius: 24,
  },
  disabledAddBtn: { opacity: 0.5 },
  addBtnText: { color: "#121824", fontSize: 15, fontWeight: "700" },
});
