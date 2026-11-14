// app/(tabs)/_layout.tsx
import { useGlobalNavigation } from "@/context/NavigationContext";
import { Ionicons } from "@expo/vector-icons"; // 💡 Using standard Ionicons for crisp uniform styling
import { Tabs, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DrawerMenu from "../../components/global/DrawerMenu";
import { useAppSelector } from "../../hooks";
import { useUserRole } from "../_layout";

export default function TabsLayout() {
  const { setIsDrawerOpen, currentRole } = useUserRole();
  const { isAuthenticated, isInitializing } = useAppSelector(
    (state) => state.auth,
  );
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();

  // 💡 Redux state hooks to read active sub-dashboard layout state dynamically
  // If your sub-dashboard tracking lives in local state instead, you can expose a custom React Context provider handler hook!
  const { currentSubDashboard, selectedBuildingName, navigateToSubDashboard } =
    useGlobalNavigation();

  // Localized Tab Firewall Guard
  useEffect(() => {
    // 🛑 CRITICAL RE-ROUTE PROTECTION SHIELD:
    // ONLY run firewall redirection rules AFTER your bootstrap thunk has
    // finished reading tokens out of local storage (isInitializing === false)
    if (!isInitializing) {
      if (!isAuthenticated || currentRole === "guest") {
        router.replace("/search-property" as any);
      }
    }
  }, [isAuthenticated, isInitializing, currentRole, router]);

  // 💡 RENDER INTERCEPT LOADING MASK:
  // Blocks Expo Router from testing paths or falling back to onboarding
  // during the split second Redux reads your storage data on a page reload.
  if (isInitializing) {
    return (
      <View style={styles.loadingScreenContainer}>
        <Text style={styles.loadingText}>Restoring session context...</Text>
      </View>
    );
  }

  if (!isAuthenticated || currentRole === "guest") {
    return null;
  }

  // 💡 Platform-Agnostic Title Formatter Evaluator
  const getDynamicHeaderTitle = (routeTitle: string) => {
    if (routeTitle === "notification") {
      return "Notification";
    }

    if (routeTitle !== "Home") {
      return routeTitle; // Standard tab fallback titles (Chat, Settings)
    }

    // Dynamic Title Mapping Matrix for Landlord Home Sub-Dashboards
    switch (currentSubDashboard) {
      case "notification":
        return "Notification";
      case "add_unit":
        return "Add Unit";
      case "edit_unit":
        return "Edit Unit";
      case "add_building":
        return "Add Building";
      case "apply_lease":
        return "Apply For Lease";
      case "permissions":
        return "Permissions";
      case "wallets":
        return "Wallets";
      case "wallet_details":
        return "Wallet Ledger Details";
      case "inventory":
        return "Asset Inventory";
      case "building_details":
        return "Building Details";
      case "building_tenants":
        return "Building Tenants";
      case "building_settings":
        return "Building Settings";
      case "statement_verification":
        return "Statement Verification";
      case "bulk_sms":
        return "Bulk SMS";
      case "sms_details":
        return "SMS Details";
      case "purchase_tokens":
        return "Purchase Tokens";
      case "search_tenant":
        return "Select Recipients";
      case "analytics":
        return "Analytics Data";
      case "unit_performance":
        return "Unit Performance";
      case "base":
      default:
        return selectedBuildingName; // Dynamic Active Building Selector Title Name
    }
  };

  return (
    <View style={styles.container}>
      {/* Drawer menu layer stays fixed over tabs whenever toggled active */}
      <DrawerMenu />

      <Tabs
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "#8E8E93",
          headerStyle: {
            backgroundColor: "#1c2431", // High fidelity dark app bar tone matching your screen snapshots
            borderBottomWidth: 1,
            borderBottomColor: "#252f41",
            height: 60,
          },
          headerTintColor: "#ffffff",

          // 💡 PERSISTENT LEFT DRAWER ICON WITH DYNAMIC TEXT NEXT TO IT
          headerLeft: () => (
            <View style={styles.headerLeftGroup}>
              <TouchableOpacity
                onPress={() => setIsDrawerOpen(true)}
                style={styles.drawerIconButton}
                activeOpacity={0.7}
              >
                <Ionicons name="menu" size={26} color="#ffffff" />
              </TouchableOpacity>
              <Text style={styles.dynamicHeaderTitleText} numberOfLines={1}>
                {getDynamicHeaderTitle(
                  route.name === "index" ? "Home" : route.name,
                )}
              </Text>
            </View>
          ),

          // 💡 PERSISTENT RIGHT-ALIGNED NOTIFICATION AND PROFILE CONTAINER
          headerRight: () => (
            <View style={styles.headerRightGroup}>
              <TouchableOpacity
                style={styles.notificationButton}
                onPress={() => navigateToSubDashboard("notification")}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="#ffffff"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.profileAvatarWrapper}
                onPress={() => router.push("/(tabs)/settings")}
                activeOpacity={0.8}
              >
                <Text style={styles.avatarText}>L</Text>
                <View style={styles.onlineIndicatorDot} />
              </TouchableOpacity>
            </View>
          ),

          // Hides the default center-aligned text node to prevent text duplication collisions
          headerTitle: () => null,
        })}
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
  container: {
    flex: 1,
  },
  loadingScreenContainer: {
    flex: 1,
    backgroundColor: "#121820", // Matches your high-fidelity theme
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
  headerLeftGroup: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
    gap: 12,
  },
  drawerIconButton: {
    padding: 4,
    ...Platform.select({ web: { cursor: "pointer" } }),
  },
  dynamicHeaderTitleText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "500",
    maxWidth: 220,
  },
  headerRightGroup: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 16,
    gap: 14,
  },
  notificationButton: {
    padding: 4,
    ...Platform.select({ web: { cursor: "pointer" } }),
  },
  profileAvatarWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#23783c", // Profile background vector tint matching your screens
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    ...Platform.select({ web: { cursor: "pointer" } }),
  },
  avatarText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 14,
  },
  onlineIndicatorDot: {
    position: "absolute",
    bottom: -1,
    right: -1,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#52c41a", // Green alive status indicator dot
    borderWidth: 1.5,
    borderColor: "#1c2431",
  },
});
