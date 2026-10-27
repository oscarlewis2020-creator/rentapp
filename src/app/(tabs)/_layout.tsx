// app/(tabs)/_layout.tsx
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Tabs } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import DrawerMenu from "../../components/global/DrawerMenu";
import { useUserRole } from "../_layout";

export default function TabsLayout() {
  const { setIsDrawerOpen } = useUserRole();

  return (
    <View style={styles.container}>
      {/* Drawer menu layer stays fixed over tabs whenever toggled active */}
      <DrawerMenu />

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#007AFF",
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
        <Tabs.Screen name="index" options={{ title: "Home" }} />
        <Tabs.Screen name="chat" options={{ title: "Chat" }} />
        <Tabs.Screen name="settings" options={{ title: "Settings" }} />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
