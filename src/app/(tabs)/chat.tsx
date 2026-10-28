// app/(tabs)/chat.tsx
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useAppSelector } from "../../store/hooks";
import { UserRole } from "../../types/navigation";

// Component Imports
import { LandlordChat } from "../../components/roles/landlord/chat";
import { LandlordNewChatContacts } from "../../components/ui/landlord/chat/LandlordNewChatContacts";

// 💡 1. The local integrated helper handles the screen switching via internal hooks
function LandlordChatWorkspace() {
  const [currentView, setCurrentView] = useState<"inbox" | "new-chat">("inbox");

  if (currentView === "new-chat") {
    return (
      <LandlordNewChatContacts
        onBackPress={() => setCurrentView("inbox")}
        onInitiateChat={(building, unit) => {
          console.log(
            `Launch communication thread sequence: ${building} - ${unit}`,
          );
        }}
      />
    );
  }

  return <LandlordChat onNewChatPress={() => setCurrentView("new-chat")} />;
}

// 💡 2. The temporary placeholder component for the sales team
function SalesChatPlaceholder() {
  return (
    <View style={styles.center}>
      <Text variant="titleMedium" style={styles.text}>
        Sales CRM Chat Coming Soon
      </Text>
    </View>
  );
}

// 💡 3. The absolute main Tab screen export required by Expo Router
export default function GenericChatScreen() {
  const { currentRole } = useAppSelector((state) => state.role);

  // Strictly maps your types/navigation.ts registry contract requirements
  const chatRegistry: Record<UserRole, React.ReactElement> = {
    tenant: (
      <View style={styles.center}>
        <Text>Tenant Chat Coming Soon</Text>
      </View>
    ), // Placeholder
    landlord: <LandlordChatWorkspace />, // Connected workspace layout engine!
    sales: <SalesChatPlaceholder />,
  };

  // Firewall bypass rule protecting tabs from guest intrusions
  if (currentRole === "guest") return null;

  return chatRegistry[currentRole];
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
