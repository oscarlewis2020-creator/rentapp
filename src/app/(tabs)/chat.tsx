// app/(tabs)/chat.tsx
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useAppSelector } from "../../store/hooks";
import { RoleScreenRegistry } from "../../types/navigation";

import { LandlordChat } from "../screens/landlord/chat";
import { TenantChat } from "../screens/tenant/chat";

// 💡 A clean placeholder view to show the sales team until the feature is built
function SalesChatPlaceholder() {
  return (
    <View style={styles.center}>
      <Text variant="titleMedium" style={styles.text}>
        Sales CRM Chat Coming Soon
      </Text>
      <Text variant="bodyMedium" style={styles.subtext}>
        The instant messaging center is currently optimized for Landlord and
        Tenant operations.
      </Text>
    </View>
  );
}

export default function GenericChatScreen() {
  const { currentRole } = useAppSelector((state) => state.role);

  // 💡 TypeScript is happy now because every key in UserRole ("tenant" | "landlord" | "sales") is fully handled!
  const chatRegistry: RoleScreenRegistry = {
    tenant: <TenantChat />,
    landlord: <LandlordChat />,
    sales: <SalesChatPlaceholder />,
  };

  if (currentRole === "guest") return null;

  return chatRegistry[currentRole];
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#FFF",
  },
  text: {
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 8,
    textAlign: "center",
  },
  subtext: {
    color: "#8E8E93",
    textAlign: "center",
    maxWidth: 280,
    lineHeight: 20,
  },
});
