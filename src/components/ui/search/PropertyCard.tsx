import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export interface PropertyItem {
  id: string;
  name: string;
  email: string;
  location: string;
  type: string;
  unitsCount: number;
  image: any;
}

interface PropertyCardProps {
  item: PropertyItem;
}

export function PropertyCard({ item }: PropertyCardProps) {
  return (
    <View style={styles.propertyCard}>
      {/* 1. Background Image using standard absolute positioning */}
      <Image
        source={item.image}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />

      {/* 2. Content Overlay Layout stacked directly on top */}
      <View style={styles.darkDimOverlay}>
        <Text style={styles.propertyName}>{item.name}</Text>

        <InfoRow icon="mail" value={item.email} />
        <InfoRow icon="location" value={item.location} />
        <InfoRow icon="business" value={item.type} />
        <InfoRow icon="bed" value={`${item.unitsCount} Units`} />
      </View>
    </View>
  );
}

// 3. Strongly typed InfoRow component without runtime casts
function InfoRow({
  icon,
  value,
}: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  value: string;
}) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.iconCircle}>
        <Ionicons name={icon} size={14} color="#121824" />
      </View>
      <Text style={styles.infoText}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  propertyCard: {
    height: 240,
    borderRadius: 16,
    overflow: "hidden", // Ensures background image inherits the 16px corner radius
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#242F42",
    backgroundColor: "#1A2232",
    position: "relative",
  },
  darkDimOverlay: {
    ...StyleSheet.absoluteFill, // Stretches across the parent layout boundary
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    padding: 20,
    justifyContent: "center",
    gap: 12,
  },
  propertyName: {
    color: "#FFF",
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 4,
  },
  infoRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#85C1E9",
    alignItems: "center",
    justifyContent: "center",
  },
  infoText: { color: "#E5E9F0", fontSize: 14, fontWeight: "500" },
});
