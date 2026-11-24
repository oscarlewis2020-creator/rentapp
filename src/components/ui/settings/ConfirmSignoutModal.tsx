import { colors, type } from "@/constants/typography";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DIALOG_HIT_SLOP, dialogStyles as s } from "./dialogStyles";

interface ConfirmSignOutModalProps {
  visible: boolean;
  onClose: () => void;
  onProceed: () => void;
  onBackupPress: () => void;
}

export function ConfirmSignOutModal({
  visible,
  onClose,
  onProceed,
  onBackupPress,
}: ConfirmSignOutModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={s.overlay}>
        <View style={s.container}>
          <Text style={s.title}>Confirm sign out</Text>

          <Text style={s.message}>
            Signing out will clear everything, including chat messages. However,
            all data except chat messages will be retrieved during backup. You
            can back up your chat messages to Google Drive. Are you sure you
            want to proceed?
          </Text>

          <TouchableOpacity
            style={styles.backupLink}
            onPress={onBackupPress}
            activeOpacity={0.7}
            hitSlop={DIALOG_HIT_SLOP}
          >
            <Text style={styles.backupLinkText}>
              Backup Chats before log out
            </Text>
          </TouchableOpacity>

          <View style={s.buttons}>
            <TouchableOpacity onPress={onClose} hitSlop={DIALOG_HIT_SLOP}>
              <Text style={s.actionText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onProceed} hitSlop={DIALOG_HIT_SLOP}>
              <Text style={s.actionText}>Proceed</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backupLink: { alignSelf: "flex-start" },
  backupLinkText: { ...type.body, color: colors.accent },
});
