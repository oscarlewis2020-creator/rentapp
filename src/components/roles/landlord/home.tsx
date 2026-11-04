// components/roles/landlord/LandlordHome.tsx
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Reusable Core layout UI Components
import {
  BuildingItem,
  BuildingPickerModal,
} from "../../ui/landlord/units/BuildingPickerModal";
import { BuildingSelector } from "../../ui/landlord/units/BuildingSelector";
import { ControlActionBar } from "../../ui/landlord/units/ControlActionBar";
import { SegmentTabs, TabOption } from "../../ui/landlord/units/SegmentTabs";
import { UnitCard, UnitItem } from "../../ui/landlord/units/UnitCard";

// 💡 Sub-view Screen Imports
import { LandlordActionView } from "../../ui/landlord/action/ActionView";
import { LandlordExtraView } from "../../ui/landlord/extra/ExtraView";
import { LandlordInventory } from "./LandlordInventory";
import { LandlordPermissions } from "./LandlordPermissions";
import { LandlordWalletDetails } from "./LandlordWalletDetails";
import { LandlordWallets } from "./LandlordWallets";

const MOCK_BUILDINGS: BuildingItem[] = [
  { id: "b1", name: "Test 1" },
  { id: "b2", name: "Demo Building" },
];

const MOCK_UNITS: UnitItem[] = [
  {
    id: "1",
    name: "Room1",
    rent: "KES 5,000",
    type: "Bedsitter",
    bedrooms: 0,
    status: "vacant",
  },
  {
    id: "2",
    name: "Room2",
    rent: "KES 5,000",
    type: "Bedsitter",
    bedrooms: 0,
    status: "vacant",
  },
  {
    id: "3",
    name: "Room3",
    rent: "KES 5,000",
    type: "Bedsitter",
    bedrooms: 0,
    status: "vacant",
  },
];

export function LandlordHome() {
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingItem>(
    MOCK_BUILDINGS[0],
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("units");
  // 1. Add an extended view state hook tracker right below your active tab hook definitions:
  const [currentSubDashboard, setCurrentSubDashboard] = useState<
    "base" | "permissions" | "wallets" | "wallet_details" | "inventory"
  >("base");
  // Dynamic tab configuration structures
  const tabOptions: TabOption[] = [
    {
      id: "units",
      label: "Units",
      icon: (
        <Ionicons
          name="business"
          size={18}
          color={activeTab === "units" ? "#FFF" : "#9EA5B1"}
        />
      ),
    },
    {
      id: "extra",
      label: "Extra",
      icon: (
        <Ionicons
          name="options-outline"
          size={18}
          color={activeTab === "extra" ? "#FFF" : "#9EA5B1"}
        />
      ),
    },
    {
      id: "action",
      label: "Action",
      icon: (
        <MaterialCommunityIcons
          name="new-box"
          size={22}
          color={activeTab === "action" ? "#FFF" : "#4CD964"}
        />
      ),
    },
  ];

  // 2. Wrap your layout return choices to catch sub-dashboard operations:
  if (currentSubDashboard === "permissions") {
    return <LandlordPermissions />;
  }

  // Check path rendering criteria:
  if (currentSubDashboard === "wallets") {
    return (
      <LandlordWallets
        onManualWalletPress={() => setCurrentSubDashboard("wallet_details")}
        onCreateWalletPress={() => setIsModalVisible(true)}
      />
    );
  }

  if (currentSubDashboard === "wallet_details") {
    return (
      <LandlordWalletDetails
        onBackPress={() => setCurrentSubDashboard("wallets")} // Direct return back onto wallet dashboard
        onTransactionsPress={() => console.log("Open full ledger log streams")}
        onFilterPress={() =>
          console.log("Open transaction filters options sheet")
        }
        onSortPress={() => console.log("Toggle ledger element sorting")}
      />
    );
  }

  if (currentSubDashboard === "inventory") {
    return (
      <LandlordInventory
        onAddItemPress={() =>
          console.log("Launch Add Inventory Asset Item Form component sheet")
        }
      />
    );
  }

  // Handler for menu selections inside the Extra tab view
  const handleMenuNavigation = (menuId: string) => {
    if (menuId === "permissions") {
      setCurrentSubDashboard("permissions");
    } else if (menuId === "wallets") {
      setCurrentSubDashboard("wallets"); // 💡 SWITCH TO WALLETS SUB-VIEW PANEL ON TAP
    } else if (menuId === "inventory") {
      setCurrentSubDashboard("inventory"); // 💡 LAUNCH THE COMPREHENSIVE INVENTORY SUB-VIEW PANEL ON CLICK
    } else {
      console.log(`Open other menus: ${menuId}`);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* 1. Dropdown input selector shell trigger */}
      <BuildingSelector
        label="Select a Building"
        selectedValue={selectedBuilding.name}
        onPress={() => setIsModalVisible(true)}
      />

      {/* 2. Top Segmented Sub-Tab Navigator bar */}
      <SegmentTabs
        options={tabOptions}
        activeTabId={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* 3. 🔥 DYNAMIC WORKSPACE ROUTER ROUTING ENVELOPE */}
      {activeTab === "units" ? (
        <View style={styles.tabContentWrapper}>
          <FlatList
            data={MOCK_UNITS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <UnitCard
                item={item}
                onEdit={(id) => console.log(`Edit unit ${id}`)}
                onDelete={(id) => console.log(`Delete unit ${id}`)}
                onShare={(id) => console.log(`Share unit ${id}`)}
                onViewDetails={(id) => console.log(`View unit ${id} details`)}
              />
            )}
            contentContainerStyle={styles.scrollListContent}
            showsVerticalScrollIndicator={false}
          />
          {/* Keep filters floating bar active only when managing units list */}
          <ControlActionBar
            onFilterPress={() => console.log("Open filter controls panel")}
            onSortPress={() => console.log("Trigger sorting mechanism")}
            onAddPress={() => console.log("Open Add Property modal view popup")}
          />
        </View>
      ) : activeTab === "extra" ? (
        <View style={styles.tabContentWrapper}>
          <LandlordExtraView onMenuPress={handleMenuNavigation} />
        </View>
      ) : (
        <View style={styles.tabContentWrapper}>
          <LandlordActionView />
        </View>
      )}

      {/* 4. THE GUEST/BUILDING INTERACTIVE SHEET SLIDE SELECTION MODAL LAYER */}
      <BuildingPickerModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        buildings={MOCK_BUILDINGS}
        selectedBuildingId={selectedBuilding.id}
        onSelectBuilding={(building) => setSelectedBuilding(building)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121824",
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%",
    alignSelf: "center",
  },
  tabContentWrapper: {
    flex: 1,
    width: "100%",
  },
  scrollListContent: {
    paddingHorizontal: 16,
    paddingBottom: 100, // Safe padding spacer block so content clears the control bar overlay
  },
});
