// components/roles/landlord/LandlordExtraView.tsx
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface LandlordExtraViewProps {
  onMenuPress: (menuId: string) => void;
}

export function LandlordExtraView({ onMenuPress }: LandlordExtraViewProps) {
  // 💡 Modeled directly from your interface menu layout list
  const menuItems: MenuItem[] = [
    {
      id: "permissions",
      label: "Permissions",
      icon: (
        <Ionicons name="shield-checkmark-outline" size={22} color="#85C1E9" />
      ),
    },
    {
      id: "wallets",
      label: "Wallets",
      icon: <Ionicons name="wallet-outline" size={22} color="#85C1E9" />,
    },
    {
      id: "inventory",
      label: "Inventory",
      icon: <MaterialCommunityIcons name="dolly" size={22} color="#85C1E9" />,
    },
    {
      id: "details",
      label: "Building Details",
      icon: <Ionicons name="business-outline" size={22} color="#85C1E9" />,
    },
    {
      id: "tenants",
      label: "Building Tenants",
      icon: <Ionicons name="people-outline" size={22} color="#85C1E9" />,
    },
    {
      id: "settings",
      label: "Building settings",
      icon: <Ionicons name="settings-outline" size={22} color="#85C1E9" />,
    },
    {
      id: "statement",
      label: "Statement verification",
      icon: <Ionicons name="newspaper-outline" size={22} color="#85C1E9" />,
    },
    {
      id: "sms",
      label: "Bulk SMS",
      icon: (
        <Ionicons
          name="chatbubble-ellipses-outline"
          size={22}
          color="#85C1E9"
        />
      ),
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <Ionicons name="bar-chart-outline" size={22} color="#85C1E9" />,
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.menuBox}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuRow}
            onPress={() => onMenuPress(item.id)}
          >
            <View style={styles.leftGroup}>
              <View style={styles.iconContainer}>{item.icon}</View>
              <Text style={styles.labelText}>{item.label}</Text>
            </View>

            {/* Right-aligned chevron operational indicator circle */}
            <View style={styles.chevronCircle}>
              <Ionicons name="chevron-forward" size={14} color="#121824" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 4,
  },
  menuBox: {
    backgroundColor: "#1A2232", // Inner container block matching dark styling
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#242F42",
    marginBottom: 40,
  },
  menuRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#242F42",
  },
  leftGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  iconContainer: {
    width: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  labelText: {
    color: "#E5E9F0",
    fontSize: 16,
    fontWeight: "500",
  },
  chevronCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#85C1E9", // Light blue filled circles matching the image layout assets
    alignItems: "center",
    justifyContent: "center",
  },
});
