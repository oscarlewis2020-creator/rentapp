import { colors, type } from "@/constants/typography";
import {
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
  SUPPORT_WHATSAPP,
} from "@/constants/support";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Linking,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DIALOG_HIT_SLOP, dialogStyles as s } from "./dialogStyles";

interface Props {
  visible: boolean;
  onClose: () => void;
}

const OPTIONS = [
  {
    key: "call",
    label: "Call us",
    icon: "call-outline" as const,
    url: `tel:${SUPPORT_PHONE}`,
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    icon: "logo-whatsapp" as const,
    url: `https://wa.me/${SUPPORT_WHATSAPP}`,
  },
  {
    key: "email",
    label: "Email us",
    icon: "mail-outline" as const,
    url: `mailto:${SUPPORT_EMAIL}?subject=RentHub%20support`,
  },
];

export default function HelpCenterDialog({ visible, onClose }: Props) {
  const [failed, setFailed] = useState<string | null>(null);

  const open = async (label: string, url: string) => {
    try {
      setFailed(null);
      await Linking.openURL(url);
      onClose();
    } catch (error) {
      console.log(`Error opening ${label}:`, error);
      setFailed(`Couldn't open ${label}. Please try another option.`);
    }
  };

  const close = () => {
    setFailed(null);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={close}
    >
      <View style={s.overlay}>
        <View style={s.container}>
          <Text style={s.title}>Help center</Text>
          <Text style={s.message}>How would you like to reach us?</Text>

          {OPTIONS.map((o) => (
            <TouchableOpacity
              key={o.key}
              style={styles.option}
              onPress={() => open(o.label, o.url)}
              activeOpacity={0.7}
            >
              <Ionicons name={o.icon} size={22} color={colors.accent} />
              <Text style={styles.optionText}>{o.label}</Text>
            </TouchableOpacity>
          ))}

          {failed && <Text style={styles.error}>{failed}</Text>}

          <View style={s.buttons}>
            <TouchableOpacity onPress={close} hitSlop={DIALOG_HIT_SLOP}>
              <Text style={s.actionText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  optionText: { ...type.body, color: colors.dialogText },
  error: { ...type.sublabel, color: colors.dangerText, marginTop: 14 },
});
