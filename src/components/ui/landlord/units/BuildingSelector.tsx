import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface BuildingSelectorProps {
  label: string;
  selectedValue: string;
  onPress: () => void;
}

export function BuildingSelector({
  label,
  selectedValue,
  onPress,
}: BuildingSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.floatingLabel}>{label}</Text>
      <TouchableOpacity style={styles.dropdownTrigger} onPress={onPress}>
        <View style={styles.dropdownInner}>
          <Ionicons name="home" size={20} color="#007AFF" style={styles.icon} />
          <Text style={styles.dropdownText}>{selectedValue}</Text>
        </View>
        <Ionicons name="chevron-down" size={18} color="#9EA5B1" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, marginTop: 12, position: "relative" },
  floatingLabel: {
    position: "absolute",
    left: 28,
    top: -8,
    backgroundColor: "#121824",
    paddingHorizontal: 6,
    fontSize: 12,
    color: "#9EA5B1",
    zIndex: 10,
  },
  dropdownTrigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#2C3545",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: "#1A2232",
  },
  dropdownInner: { flexDirection: "row", alignItems: "center" },
  icon: { marginRight: 8 },
  dropdownText: { color: "#FFF", fontSize: 16, fontWeight: "500" },
});
