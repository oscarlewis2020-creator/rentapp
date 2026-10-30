import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-paper";

interface ProfileHeaderProps {
  name: string;
  phone: string;
  email: string;
}

export function ProfileHeader({ name, phone, email }: ProfileHeaderProps) {
  return (
    <View style={styles.profileCard}>
      <View style={styles.avatarWrapper}>
        <Avatar.Text
          size={100}
          label={name[0] || "U"}
          style={{ backgroundColor: "#85C1E9" }}
          labelStyle={styles.avatarLabel}
        />
        <TouchableOpacity style={styles.editAvatarButton} activeOpacity={0.8}>
          <MaterialCommunityIcons name="pencil" size={16} color="#FFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileInfo}>
        {[name, phone, email].map((value, idx) => (
          <View key={idx} style={styles.infoField}>
            <Text style={styles.infoText} numberOfLines={1}>
              {value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    flexDirection: "row",
    backgroundColor: "#1A2232",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#242F42",
    padding: 16,
    alignItems: "center",
    marginBottom: 20,
    gap: 16,
  },
  avatarWrapper: { position: "relative" },
  avatarLabel: { fontSize: 36, fontWeight: "600", color: "#121824" },
  editAvatarButton: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: "#42526E",
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#1A2232",
  },
  profileInfo: { flex: 1, gap: 8 },
  infoField: {
    backgroundColor: "#242F42",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  infoText: { color: "#E5E9F0", fontSize: 14, fontWeight: "500" },
});
