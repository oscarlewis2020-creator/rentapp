// app/(tabs)/_layout.tsx
import { Ionicons } from "@expo/vector-icons"; // 💡 Using standard Ionicons for crisp uniform styling
import { Tabs, useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import DrawerMenu from "../../components/global/DrawerMenu";
import { useAppSelector } from "../../hooks";
import { useUserRole } from "../_layout";

export default function TabsLayout() {
  const { setIsDrawerOpen, currentRole } = useUserRole();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();

  // Localized Tab Firewall Guard
  useEffect(() => {
    if (!isAuthenticated || currentRole === "guest") {
      router.replace("/search-property" as any);
    }
  }, [isAuthenticated, currentRole, router]);

  if (!isAuthenticated || currentRole === "guest") {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Drawer menu layer stays fixed over tabs whenever toggled active */}
      <DrawerMenu />

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "#8E8E93",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => setIsDrawerOpen(true)}
              style={{ marginLeft: 16 }}
            >
              <Ionicons name="menu" size={28} color="#000" />
            </TouchableOpacity>
          ),
        }}
      >
        {/* 💡 Added Home icon */}
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="home-outline"
                size={size}
                color={typeof color === "string" ? color : undefined}
              />
            ),
          }}
        />

        {/* 💡 Added Chat/Messages icon */}
        <Tabs.Screen
          name="chat"
          options={{
            title: "Chat",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="chatbubbles-outline"
                size={size}
                color={typeof color === "string" ? color : undefined}
              />
            ),
          }}
        />

        {/* 💡 Added Settings icon */}
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="settings-outline"
                size={size}
                color={typeof color === "string" ? color : undefined}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
