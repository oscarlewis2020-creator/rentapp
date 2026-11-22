// components/ui/landlord/lease/LeaseActionBanner.tsx
import { Ionicons } from "@expo/vector-icons";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface LeaseActionBannerProps {
  visible: boolean;
  message: string;
  onDismiss: () => void;
}

export default function LeaseActionBanner({
  visible,
  message,
  onDismiss,
}: LeaseActionBannerProps) {
  if (!visible) return null;

  return (
    <View style={styles.bannerWrapper}>
      <View style={styles.bannerBox}>
        <Text style={styles.bannerText}>{message}</Text>
        <Pressable onPress={onDismiss} hitSlop={10} style={styles.closeBtn}>
          <Ionicons name="close" size={22} color="#0F172A" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bannerWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 50,
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%",
    alignSelf: "center",
  },
  bannerBox: {
    backgroundColor: "#79D2FA",
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  bannerText: {
    flex: 1,
    color: "#0F172A",
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "500",
  },
  closeBtn: {
    padding: 4,
  },
});
