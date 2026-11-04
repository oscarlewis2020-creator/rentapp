import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface UnitItem {
  id: string;
  name: string;
  rent: string;
  type: string;
  bedrooms: number;
  status: "vacant" | "occupied";
}

interface UnitCardProps {
  item: UnitItem;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onShare: (id: string) => void;
  onViewDetails: (id: string) => void;
}

export function UnitCard({
  item,
  onEdit,
  onDelete,
  onShare,
  onViewDetails,
}: UnitCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <View style={styles.actionIconsRow}>
          <TouchableOpacity
            onPress={() => onShare(item.id)}
            style={styles.iconButton}
          >
            <Ionicons name="share-social-outline" size={18} color="#9EA5B1" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onEdit(item.id)}
            style={styles.iconButton}
          >
            <Ionicons name="pencil" size={18} color="#9EA5B1" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onDelete(item.id)}
            style={styles.iconButton}
          >
            <Ionicons name="trash-outline" size={18} color="#FF4D4D" />
          </TouchableOpacity>
        </View>
      </View>

      <InfoRow
        icon={<MaterialCommunityIcons name="cash" size={18} color="#9EA5B1" />}
        label="Rent"
        value={item.rent}
      />
      <InfoRow
        icon={<Ionicons name="list-outline" size={18} color="#9EA5B1" />}
        label="Type"
        value={item.type}
      />
      <InfoRow
        icon={
          <MaterialCommunityIcons
            name="bed-king-outline"
            size={18}
            color="#9EA5B1"
          />
        }
        label="Bedrooms"
        value={item.bedrooms.toString()}
      />

      <View style={styles.cardFooter}>
        <View style={styles.vacantBadge}>
          <Text style={styles.vacantBadgeText}>{item.status}</Text>
        </View>
        <TouchableOpacity
          onPress={() => onViewDetails(item.id)}
          style={styles.unitLinkButton}
        >
          <Text style={styles.unitLinkText}>Unit »</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Micro-component internally isolated for clean layout mapping
function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoLabelGroup}>
        {icon}
        <Text style={styles.infoLabelText}>{label}</Text>
      </View>
      <Text style={styles.infoValueText}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1A2232",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#242F42",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  cardTitle: { fontSize: 18, fontWeight: "700", color: "#FFF" },
  actionIconsRow: { flexDirection: "row", gap: 12 },
  iconButton: { padding: 4 },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#242F42",
  },
  infoLabelGroup: { flexDirection: "row", alignItems: "center", gap: 10 },
  infoLabelText: { color: "#43A047", fontSize: 15, fontWeight: "500" },
  infoValueText: { color: "#FFF", fontSize: 15, fontWeight: "500" },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
  },
  vacantBadge: {
    backgroundColor: "#2C233D",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  vacantBadgeText: { color: "#B388FF", fontSize: 12, fontWeight: "600" },
  unitLinkButton: { paddingVertical: 4, paddingHorizontal: 8 },
  unitLinkText: { color: "#9EA5B1", fontSize: 15, fontWeight: "500" },
});
