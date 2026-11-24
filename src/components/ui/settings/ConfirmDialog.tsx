import { Modal, Text, TouchableOpacity, View } from "react-native";
import { DIALOG_HIT_SLOP, dialogStyles as s } from "./dialogStyles";

interface Props {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  visible,
  title,
  message,
  confirmLabel = "OK",
  cancelLabel,
  destructive = false,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={s.overlay}>
        <View style={s.container}>
          <Text style={s.title}>{title}</Text>
          <Text style={s.message}>{message}</Text>

          <View style={s.buttons}>
            {cancelLabel ? (
              <TouchableOpacity onPress={onCancel} hitSlop={DIALOG_HIT_SLOP}>
                <Text style={s.actionText}>{cancelLabel}</Text>
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity onPress={onConfirm} hitSlop={DIALOG_HIT_SLOP}>
              <Text style={[s.actionText, destructive && s.destructiveText]}>
                {confirmLabel}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
