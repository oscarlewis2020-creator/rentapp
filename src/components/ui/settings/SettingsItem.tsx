import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface SettingsItemProps {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  rightElement?: React.ReactNode;
  onPress?: () => void;
  destructive?: boolean;
}

export function SettingsItem({
  icon,
  label,
  sublabel,
  rightElement,
  onPress,
  destructive,
}: SettingsItemProps) {
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}
    >
      <View style={styles.rowLeft}>
        <View style={styles.iconContainer}>{icon}</View>
        <View style={styles.labelContainer}>
          <Text
            style={[styles.labelText, destructive && styles.destructiveText]}
          >
            {label}
          </Text>
          {sublabel && <Text style={styles.sublabelText}>{sublabel}</Text>}
        </View>
      </View>
      <View style={styles.rowRight}>
        {rightElement !== undefined ? (
          rightElement
        ) : (
          <View style={styles.chevronCircle}>
            <Ionicons name="chevron-forward" size={12} color="#121824" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#242F42",
  },
  rowLeft: { flexDirection: "row", alignItems: "center", gap: 14, flex: 1 },
  iconContainer: { width: 24, alignItems: "center", justifyContent: "center" },
  labelContainer: { flex: 1 },
  labelText: { color: "#E5E9F0", fontSize: 16, fontWeight: "500" },
  sublabelText: { color: "#7B889B", fontSize: 12, marginTop: 2 },
  destructiveText: { color: "#FF4D4D" },
  rowRight: { justifyContent: "center", alignItems: "center" },
  chevronCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#85C1E9",
    alignItems: "center",
    justifyContent: "center",
  },
});
