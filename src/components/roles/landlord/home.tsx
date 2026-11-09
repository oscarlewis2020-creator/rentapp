// components/roles/landlord/LandlordHome.tsx
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  BackHandler,
  FlatList,
  Platform,
  StyleSheet,
  View,
} from "react-native";
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
import { LandlordAnalytics } from "./LandlordAnalytics";
import { LandlordBuildingDetails } from "./LandlordBuildingDetails";
import { LandlordBuildingSettings } from "./LandlordBuildingSettings";
import { LandlordBuildingTenants } from "./LandlordBuildingTenants";
import { LandlordBulkSms } from "./LandlordBulkSms";
import { LandlordInventory } from "./LandlordInventory";
import { LandlordPermissions } from "./LandlordPermissions";
import { LandlordPurchaseTokensScreen } from "./LandlordPurchaseTokens";
import { LandlordSearchTenantScreen } from "./LandlordSearchTenantScreen";
import { LandlordSmsDetails } from "./LandlordSmsDetailsScreen";
import { LandlordStatementVerification } from "./LandlordStatementVerification";
import { LandlordUnitPerformanceScreen } from "./LandlordUnitPerfomanceScreen";
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

// 1. Define your view state tracking handles types explicitly
type DashboardState =
  | "base"
  | "permissions"
  | "wallets"
  | "wallet_details"
  | "inventory"
  | "building_details"
  | "building_tenants"
  | "building_settings"
  | "statement_verification"
  | "bulk_sms"
  | "sms_details"
  | "purchase_tokens"
  | "search_tenant"
  | "analytics"
  | "unit_performance";

export function LandlordHome() {
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingItem>(
    MOCK_BUILDINGS[0],
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("units");
  const [focusedSmsRow, setFocusedSmsRow] = useState({
    title: "",
    bodyText: "",
    isEnabled: false,
  });

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

  // 1. Add an extended view state hook tracker right below your active tab hook definitions:
  const [currentSubDashboard, setCurrentSubDashboard] =
    useState<DashboardState>("base");
  const [historyStack, setHistoryStack] = useState<DashboardState[]>(["base"]);

  // 💡 Platform-Agnostic Navigation Wrapper Function
  const navigateToSubDashboard = (nextState: DashboardState) => {
    if (nextState === currentSubDashboard) return;

    // Push next screen choice parameters onto local state tracking matrix list array
    setHistoryStack((prevStack) => [...prevStack, nextState]);
    setCurrentSubDashboard(nextState);

    // Web Intercept Integration Layer
    if (Platform.OS === "web" && window.history) {
      window.history.pushState({ screen: nextState }, "", "");
    }
  };

  // 💡 Platform-Agnostic Backward Navigation Function
  const navigateBack = () => {
    if (historyStack.length <= 1) {
      // If user is at the root "base" screen, fallback actions trigger close app logic parameters
      return false;
    }

    setHistoryStack((prevStack) => {
      const updatedStack = [...prevStack];
      updatedStack.pop(); // Remove current screen view identifier frame
      const targetPreviousState =
        updatedStack[updatedStack.length - 1] || "base";

      setCurrentSubDashboard(targetPreviousState);
      return updatedStack;
    });

    return true; // Event handled successfully mapping parameters bounds
  };

  // 💡 Synchronize hardware back buttons lifecycles (Mobile + Web PopStates)
  useEffect(() => {
    // Mobile hardware back handler intercept binding logic layer
    const backHandlerSubscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => navigateBack(),
    );

    // Web browser popstate hardware listener alignment matrix
    const handleWebPopState = (event: PopStateEvent) => {
      if (event.state && event.state.screen) {
        setCurrentSubDashboard(event.state.screen);
        // Sync arrays alignment pointers back down
        setHistoryStack((prev) => {
          const idx = prev.indexOf(event.state.screen);
          return idx !== -1
            ? prev.slice(0, idx + 1)
            : ["base", event.state.screen];
        });
      } else {
        setCurrentSubDashboard("base");
        setHistoryStack(["base"]);
      }
    };

    if (Platform.OS === "web") {
      // Seed an initial baseline layout entry point to hook browsers pops loops context trackers securely
      if (window.history && !window.history.state) {
        window.history.replaceState({ screen: "base" }, "", "");
      }
      window.addEventListener("popstate", handleWebPopState);
    }

    return () => {
      backHandlerSubscription.remove();
      if (Platform.OS === "web") {
        window.removeEventListener("popstate", handleWebPopState);
      }
    };
  }, [historyStack, currentSubDashboard]);

  // Handler for menu selections inside the Extra tab view
  const handleMenuNavigation = (menuId: string) => {
    if (menuId === "permissions") {
      navigateToSubDashboard("permissions");
    } else if (menuId === "wallets") {
      navigateToSubDashboard("wallets"); // 💡 SWITCH TO WALLETS SUB-VIEW PANEL ON TAP
    } else if (menuId === "inventory") {
      navigateToSubDashboard("inventory"); // 💡 LAUNCH THE COMPREHENSIVE INVENTORY SUB-VIEW PANEL ON CLICK
    } else if (menuId === "building_details" || menuId === "details") {
      navigateToSubDashboard("building_details"); // 💡 ROUTE DIRECTLY TO REPLICATED BUILDING VIEW DETAILS SCREEN
    } else if (menuId === "building_tenants" || menuId === "tenants") {
      navigateToSubDashboard("building_tenants"); // 💡 ROUTE TO THE BUILDING TENANTS LAYOUT
    } else if (menuId === "building_settings" || menuId === "settings") {
      navigateToSubDashboard("building_settings");
    } else if (menuId === "statement_verification" || menuId === "statement") {
      navigateToSubDashboard("statement_verification");
    } else if (menuId === "bulk_sms" || menuId === "sms") {
      navigateToSubDashboard("bulk_sms");
    } else if (menuId === "analytics" || menuId === "charts") {
      navigateToSubDashboard("analytics");
    } else {
      console.log(`Open option category: ${menuId}`);
    }
  };

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

  if (currentSubDashboard === "building_details") {
    return (
      <LandlordBuildingDetails
        onFilterPress={() => console.log("Open leases filtering overlay sheet")}
        onSortPress={() => console.log("Open leases sorting matrix logs")}
      />
    );
  }

  if (currentSubDashboard === "building_tenants") {
    return (
      <LandlordBuildingTenants
        buildingName={selectedBuilding.name}
        onBackPress={() => setCurrentSubDashboard("base")}
      />
    );
  }

  if (currentSubDashboard === "building_settings") {
    return (
      <LandlordBuildingSettings
        buildingName={selectedBuilding.name}
        onBackPress={() => setCurrentSubDashboard("building_tenants")}
      />
    );
  }

  if (currentSubDashboard === "statement_verification") {
    return (
      <LandlordStatementVerification
        buildingName={selectedBuilding.name}
        onBackPress={() => setCurrentSubDashboard("base")} // Routes gracefully back to core navigation dashboard
      />
    );
  }

  if (currentSubDashboard === "bulk_sms") {
    return (
      <LandlordBulkSms
        buildingName={selectedBuilding.name} // 💡 Passes down the dynamic building title string text
        onBackPress={() => setCurrentSubDashboard("base")} // Clears sub-state to reveal the main screen grid layout
        onViewDetailsPress={(item) => {
          // 💡 3. Safely update parent state blocks here!
          setFocusedSmsRow({
            title: item.title,
            bodyText: item.expandedText,
            isEnabled: item.isEnabled,
          });
          setCurrentSubDashboard("sms_details");
        }}
        onPurchaseTokensPress={() => setCurrentSubDashboard("purchase_tokens")}
        onSearchTenantPress={() => setCurrentSubDashboard("search_tenant")}
      />
    );
  }

  if (currentSubDashboard === "sms_details") {
    return (
      <LandlordSmsDetails
        smsDetailData={focusedSmsRow} // 💡 Binds dynamic card choices values seamlessly
        onBackPress={() => setCurrentSubDashboard("bulk_sms")} // Safely cascades back out into bulk sms dashboard matrix view on click
      />
    );
  }

  if (currentSubDashboard === "purchase_tokens") {
    return (
      <LandlordPurchaseTokensScreen
        onBackPress={() => setCurrentSubDashboard("bulk_sms")} // Routes user safely back into parent bulk message workspace tree panel context
      />
    );
  }

  if (currentSubDashboard === "search_tenant") {
    return (
      <LandlordSearchTenantScreen
        onBackPress={() => setCurrentSubDashboard("bulk_sms")} // Closes screen back to SMS composer layout
        onSelectDone={(count, ids) => {
          console.log(
            `Selected ${count} tenant recipients. Saved tracking array:`,
            ids,
          );
          // 💡 Hook your local state variables to pass total counts straight back into your modal counters line
          setCurrentSubDashboard("bulk_sms");
        }}
      />
    );
  }

  if (currentSubDashboard === "analytics") {
    return (
      <View style={{ flex: 1 }}>
        <LandlordAnalytics
          buildingName={selectedBuilding.name}
          onBackPress={navigateBack}
          onViewUnitPerformancePress={() =>
            setCurrentSubDashboard("unit_performance")
          }
          onBuildingFieldPress={() => setIsModalVisible(true)}
        />

        {/* 💡 MOUNTED HERE: Accessible when on Analytics screen */}
        <BuildingPickerModal
          visible={isModalVisible}
          buildings={MOCK_BUILDINGS} // 💡 Fixed: Pass your complete properties array pool
          selectedBuildingId={selectedBuilding.id} // 💡 Fixed: Pass your active property ID string handle
          onClose={() => setIsModalVisible(false)}
          onSelectBuilding={(building: BuildingItem) => {
            setSelectedBuilding(building);
            setIsModalVisible(false);
          }}
        />
      </View>
    );
  }

  if (currentSubDashboard === "unit_performance") {
    return (
      <LandlordUnitPerformanceScreen
        buildingName={selectedBuilding.name}
        onBackPress={navigateBack} // Shifting routes back smoothly into parent analytics workspace tree panel
      />
    );
  }

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
