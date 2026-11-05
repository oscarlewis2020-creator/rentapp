import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

export interface PredefinedSmsItem {
  id: string;
  title: string;
  collapsedText: string;
  expandedText: string;
  isEnabled: boolean;
}

interface PredefinedSmsCardProps {
  item: PredefinedSmsItem;
  onToggleSwitch: (id: string) => void;
  onSendNowPress: () => void;
  onViewDetailsPress: () => void;
}

export default function PredefinedSmsCard({
  item,
  onToggleSwitch,
  onSendNowPress,
  onViewDetailsPress,
}: PredefinedSmsCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.cardRow}>
      {/* Top Header Metrics Row */}
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <View style={styles.switchWrapper}>
          <Switch
            value={item.isEnabled}
            onValueChange={() => onToggleSwitch(item.id)}
            trackColor={{ false: "#2d384a", true: "#00a878" }}
            thumbColor="#ffffff"
            style={styles.switchScale}
          />
          <Text style={styles.switchLabel}>
            {item.isEnabled ? "Enabled" : "Disabled"}
          </Text>
        </View>
      </View>

      {/* Description String Blocks with Expand link */}
      <Text style={styles.cardBody}>
        {isExpanded ? item.expandedText : item.collapsedText}{" "}
        <Text
          style={styles.toggleLink}
          onPress={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "View less" : "View more"}
        </Text>
      </Text>

      {/* Operational Action Footer */}
      <View style={styles.cardFooter}>
        <View style={styles.tokenBadge}>
          <MaterialCommunityIcons
            name="gold"
            size={16}
            color="#ffb900"
            style={{ marginRight: 4 }}
          />
          <Text style={styles.tokenCount}>0</Text>
        </View>
        <View style={styles.footerButtons}>
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={onViewDetailsPress}
          >
            <Text style={styles.detailsText}>View Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton} onPress={onSendNowPress}>
            <Ionicons
              name="send"
              size={13}
              color="#161c24"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.sendText}>Send Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardRow: {
    backgroundColor: "#1c2431",
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#252f41",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  cardTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    paddingRight: 8,
  },
  switchWrapper: { alignItems: "center", gap: 2 },
  switchScale: { transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] },
  switchLabel: { color: "#8a94a6", fontSize: 10, fontWeight: "500" },
  cardBody: {
    color: "#cbd5e1",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 20,
  },
  toggleLink: { color: "#4fa3f7", fontWeight: "600", fontSize: 13.5 },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tokenBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#161c24",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tokenCount: { color: "#ffb900", fontSize: 14, fontWeight: "700" },
  footerButtons: { flexDirection: "row", gap: 12 },
  detailsButton: {
    borderWidth: 1,
    borderColor: "#343e50",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#161c24",
  },
  detailsText: { color: "#ffffff", fontSize: 13.5, fontWeight: "500" },
  sendButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#86d3ff",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  sendText: { color: "#161c24", fontSize: 13.5, fontWeight: "600" },
});
