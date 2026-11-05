// components/ui/landlord/buildings/LeaseTermRow.tsx
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface TermItem {
  id: string;
  title: string;
  body: string;
}

interface LeaseTermRowProps {
  item: TermItem;
  viewMode: "terms" | "suggestions";
  onEdit: () => void;
  onAction: () => void;
}

export function LeaseTermRow({
  item,
  viewMode,
  onEdit,
  onAction,
}: LeaseTermRowProps) {
  return (
    <View style={styles.termCardRow}>
      <View style={styles.cardContentLeft}>
        <Text style={styles.termTitle}>{item.title}</Text>
        <Text style={styles.termBodyText}>{item.body}</Text>
      </View>

      <View style={styles.cardActionsRight}>
        <TouchableOpacity
          style={styles.actionIconCell}
          activeOpacity={0.7}
          onPress={onEdit}
        >
          <MaterialCommunityIcons name="pencil" size={22} color="#85C1E9" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionIconCell}
          activeOpacity={0.7}
          onPress={onAction}
        >
          <Ionicons
            name={viewMode === "terms" ? "trash" : "add-circle"}
            size={viewMode === "terms" ? 20 : 24}
            color={viewMode === "terms" ? "#FF9292" : "#85C1E9"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  termCardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
    paddingVertical: 18,
    paddingHorizontal: 4,
  },
  cardContentLeft: { flex: 1, gap: 6, paddingRight: 16 },
  termTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  termBodyText: { color: "#CFD8DC", fontSize: 14, lineHeight: 20 },
  cardActionsRight: {
    flexDirection: "column",
    gap: 18,
    justifyContent: "center",
    alignItems: "center",
    width: 32,
  },
  actionIconCell: { padding: 4 },
});
