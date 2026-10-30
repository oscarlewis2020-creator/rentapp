// app/(tabs)/index.tsx
import { Text, View, StyleSheet } from "react-native";
import { useAppSelector } from "../../hooks";
import { RoleScreenRegistry } from "../../types/navigation";
// Import your custom role-specific content layouts
import { ErrorComponent } from "../../components/global/ErrorComponent";
import { LandlordHome } from "../../components/roles/landlord/home";
import { SalesHome } from "../../components/roles/sales/home";
// import { TenantHome } from "../../components/roles/tenant/home";

export default function GenericHomeScreen() {
  const { currentRole } = useAppSelector((state) => state.role);

  // 💡 Define your strict functional view registry map (Omitting guest since they are firewall-blocked)
  const homeRegistry: RoleScreenRegistry = {
    tenant: (
      <View style={styles.center}>
        <Text>Tenant home Coming Soon</Text>
      </View>
    ), // Placeholder
    landlord: <LandlordHome />,
    sales: <SalesHome />,
  };

  // Fallback structural rendering safety guard
  if (currentRole === "guest") {
    return (
      <ErrorComponent message="Guests are not permitted within this dashboard view." />
    );
  }

  return homeRegistry[currentRole];
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1C2026",
  },
  text: {
    color: "#E5E9F0",
    fontWeight: "600",
  },
});
