// components/roles/landlord/LandlordNewChatContacts.tsx
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BroadcastMessageModal } from "./BroadcastMessageModal";
// Basic type maps matching layout specifications
interface SelectionOption {
  id: string;
  name: string;
}

interface LandlordNewChatContactsProps {
  onBackPress?: () => void;
  onInitiateChat?: (buildingId: string, unitId: string | null) => void;
}

export function LandlordNewChatContacts({
  onBackPress,
  onInitiateChat,
}: LandlordNewChatContactsProps) {
  // Selection states mapping
  const [selectedBuilding, setSelectedBuilding] = useState<SelectionOption>({
    id: "b1",
    name: "Test 1",
  });
  const [selectedUnit, setSelectedUnit] = useState<SelectionOption | null>({
    id: "u1",
    name: "Room1",
  });
  // 💡 Add modal open tracking trigger state
  const [broadcastModalOpen, setBroadcastModalOpen] = useState(false);

  const handleActionButtonPress = () => {
    // If they click the action pill while no specific unit is chosen, trigger modal broadcast
    if (!selectedUnit) {
      setBroadcastModalOpen(true);
    } else if (onInitiateChat) {
      onInitiateChat(selectedBuilding.id, selectedUnit.id);
    } else {
      console.log(
        `Initializing chat channel stream target -> Building: ${selectedBuilding.name}, Unit: ${selectedUnit?.name || "All Tenants"}`,
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Upper Navigation Header bar for independent stack view back-tracking */}
      {onBackPress && (
        <View style={styles.header}>
          <TouchableOpacity onPress={onBackPress} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
            <Text style={styles.headerTitle}>Contacts</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Main Form Body Control Card Layout Frame Wrapper */}
      <View style={styles.bodyContent}>
        <View style={styles.formCard}>
          {/* 1. Building Selector Input Dropdown Block */}
          <View style={styles.inputContainer}>
            <Text style={styles.floatingLabel}>Select a building</Text>
            <TouchableOpacity
              style={styles.dropdownTrigger}
              activeOpacity={0.7}
            >
              <View style={styles.leftInputGroup}>
                <Ionicons
                  name="home"
                  size={20}
                  color="#007AFF"
                  style={styles.inputIcon}
                />
                <Text style={styles.inputText}>{selectedBuilding.name}</Text>
              </View>
              <Ionicons name="chevron-down" size={16} color="#9EA5B1" />
            </TouchableOpacity>
          </View>

          {/* 2. Unit Selector Input Dropdown Block */}
          <View style={styles.inputContainer}>
            <Text style={styles.floatingLabel}>Select a unit</Text>
            <TouchableOpacity
              style={styles.dropdownTrigger}
              activeOpacity={0.7}
            >
              <View style={styles.leftInputGroup}>
                <MaterialCommunityIcons
                  name="bed-king-outline"
                  size={20}
                  color="#007AFF"
                  style={styles.inputIcon}
                />
                <Text style={styles.inputText}>
                  {selectedUnit ? selectedUnit.name : "All Units"}
                </Text>
              </View>
              <Ionicons name="chevron-down" size={16} color="#9EA5B1" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 3. Central Informative Callout Prompt Instructions Label Description */}
        <Text style={styles.helperText}>
          Tap the floating action button to chat with all the tenants or select
          a unit to chat with a specific tenant.
        </Text>
      </View>

      {/* 4. Lower Right Adaptive Sticky Floating Action Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handleActionButtonPress}
        activeOpacity={0.85}
      >
        <Ionicons
          name="chatbubble"
          size={20}
          color="#FFF"
          style={styles.buttonIcon}
        />
        <Text style={styles.buttonText}>
          {selectedUnit ? "Chat Tenant" : "All Tenants"}
        </Text>
      </TouchableOpacity>
      {/* 💡 INJECT THE LIVE BROADCAST OVERLAY PORTAL LAYER HERE */}
      <BroadcastMessageModal
        visible={broadcastModalOpen}
        onClose={() => setBroadcastModalOpen(false)}
        onSendMessage={(msg, statuses) => {
          console.log(
            `Blasting mass system notifications via webhook queue: ${msg} for status tiers: ${statuses}`,
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C2026", // Deep slate background palette match
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%",
    alignSelf: "center",
    position: "relative",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#242F42",
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFF",
  },
  bodyContent: {
    padding: 16,
    alignItems: "center",
  },
  formCard: {
    backgroundColor: "#12161B", // Darker embedded card core box container
    width: "100%",
    borderRadius: 12,
    padding: 16,
    gap: 24,
    borderWidth: 1,
    borderColor: "#242F42",
    marginTop: 8,
  },
  inputContainer: {
    position: "relative",
    width: "100%",
  },
  floatingLabel: {
    position: "absolute",
    left: 12,
    top: -9,
    backgroundColor: "#12161B", // Subtracts border lines neatly behind font strings
    paddingHorizontal: 6,
    fontSize: 12,
    color: "#9EA5B1",
    zIndex: 10,
  },
  dropdownTrigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#2C3545",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "transparent",
  },
  leftInputGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  inputIcon: {
    marginTop: -2,
  },
  inputText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
  },
  helperText: {
    color: "#E5E9F0",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    marginTop: 28,
    paddingHorizontal: 12,
    opacity: 0.9,
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 24,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#035273", // Deep turquoise brand button match
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)",
        cursor: "pointer",
        userSelect: "none",
      },
    }),
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
