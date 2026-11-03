// components/roles/landlord/LandlordInventory.tsx
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserRole } from "../../../app/_layout";
import { LandlordSampleInventoryView } from "./LandlordSampleInventoryView";

import { CreateInventoryItemModal } from "@/components/ui/landlord/extra/inventory/CreateInventoryItemModal";

interface InventoryCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export function LandlordInventory({
  onViewSamplePress,
  onAddItemPress,
}: {
  onViewSamplePress?: () => void;
  onAddItemPress?: () => void;
}) {
  const { setIsDrawerOpen } = useUserRole();

  // 💡 State to track whether the speed dial menu layer is popped open
  const [isFabMenuOpen, setIsFabMenuOpen] = useState(false);

  // 💡 Add sub-route view navigation state hook
  const [activeSubRoute, setActiveSubRoute] = useState<
    "list_view" | "sample_view"
  >("list_view");

  // 💡 Add explicit form visibility state hook
  const [createItemModalOpen, setCreateItemModalOpen] = useState(false);

  const categories: InventoryCategory[] = [
    {
      id: "furniture",
      label: "Furniture",
      icon: <FontAwesome5 name="couch" size={14} color="#9EA5B1" />,
    },
    {
      id: "appliances",
      label: "Appliances",
      icon: (
        <MaterialCommunityIcons
          name="washing-machine"
          size={18}
          color="#9EA5B1"
        />
      ),
    },
    {
      id: "utilities",
      label: "Utilities & fixtures",
      icon: <MaterialCommunityIcons name="tools" size={18} color="#9EA5B1" />,
    },
    {
      id: "maintenance",
      label: "Building & maintenance",
      icon: (
        <MaterialCommunityIcons
          name="hammer-screwdriver"
          size={18}
          color="#9EA5B1"
        />
      ),
    },
    {
      id: "safety",
      label: "Safety & security",
      icon: (
        <MaterialCommunityIcons
          name="shield-lock-outline"
          size={18}
          color="#9EA5B1"
        />
      ),
    },
    {
      id: "amenities",
      label: "Common area amenities",
      icon: (
        <MaterialCommunityIcons
          name="google-circles-communities"
          size={18}
          color="#9EA5B1"
        />
      ),
    },
    {
      id: "misc",
      label: "Miscellaneous",
      icon: (
        <MaterialCommunityIcons
          name="dots-horizontal-circle-outline"
          size={18}
          color="#9EA5B1"
        />
      ),
    },
  ];

  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    furniture: false,
    appliances: false,
    utilities: false,
    maintenance: false,
    safety: false,
    amenities: false,
    misc: false,
  });

  const isAllExpanded = Object.values(expandedSections).every(
    (status) => status === true,
  );

  const handleToggleGlobalExpandState = () => {
    const targetState = !isAllExpanded;
    const updatedMap = Object.keys(expandedSections).reduce(
      (acc, key) => {
        acc[key] = targetState;
        return acc;
      },
      {} as Record<string, boolean>,
    );
    setExpandedSections(updatedMap);
  };

  // 🔥 INTERCEPT ROUTING PHASE: Switch out components dynamically on state changes
  if (activeSubRoute === "sample_view") {
    return (
      <LandlordSampleInventoryView
        onBackPress={() => setActiveSubRoute("list_view")} // Direct back trace return track
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* ================= 1. UPPER NAVIGATION APPBAR ================= */}
      <View style={styles.appBar}>
        <View style={styles.appBarLeft}>
          <TouchableOpacity
            onPress={() => setIsDrawerOpen(true)}
            style={styles.menuButton}
          >
            <Ionicons name="menu" size={28} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.appBarTitle}>Test 1 Inventory</Text>
        </View>
        <View style={styles.appBarRight}>
          <TouchableOpacity style={styles.appBarIconButton}>
            <Ionicons name="notifications" size={24} color="#FFF" />
          </TouchableOpacity>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>L</Text>
            <View style={styles.onlineStatusDot} />
          </View>
        </View>
      </View>

      {/* ================= 2. MASTER SUMMARY ACCOUNTING TRACK ROW ================= */}
      <View style={styles.summaryBarRow}>
        <View style={styles.summaryLeftGroup}>
          <MaterialCommunityIcons
            name="clipboard-text-search-outline"
            size={20}
            color="#9EA5B1"
          />
          <Text style={styles.summaryTitleText}>Your inventory (0)</Text>
        </View>
        <TouchableOpacity
          style={styles.globalToggleBtn}
          onPress={handleToggleGlobalExpandState}
          activeOpacity={0.7}
        >
          <Text style={styles.globalToggleBtnText}>
            {isAllExpanded ? "Collapse all" : "Expand all"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* ================= 3. SCROLLABLE CATEGORIES DATA FEED CONTAINER ================= */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => {
          const isSectionOpen = expandedSections[category.id];
          return (
            <View key={category.id} style={styles.accordionContainerBlock}>
              <TouchableOpacity
                style={styles.categoryHeaderRow}
                onPress={() =>
                  setExpandedSections((p) => ({
                    ...p,
                    [category.id]: !p[category.id],
                  }))
                }
                activeOpacity={0.7}
              >
                <View style={styles.categoryHeaderLeft}>
                  <View style={styles.categoryIconCircle}>{category.icon}</View>
                  <Text style={styles.categoryLabelText}>{category.label}</Text>
                </View>
                <Ionicons
                  name={isSectionOpen ? "chevron-up" : "chevron-down"}
                  size={18}
                  color="#FFF"
                />
              </TouchableOpacity>
              {isSectionOpen && (
                <View style={styles.emptyFallbackCell}>
                  <Text style={styles.emptyFallbackText}>No items added</Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>

      {/* ================= 4. 🔥 SPEED DIAL INTERACTION OVERLAY LAYER ================= */}
      {isFabMenuOpen && (
        // Absolute backdrop overlay dims the rest of the list rows when toggled active
        <Pressable
          style={styles.dimBackdropMask}
          onPress={() => setIsFabMenuOpen(false)}
        >
          <View style={styles.speedDialMenuStack}>
            {/* Top Speed Dial Option: View Sample List */}
            <TouchableOpacity
              style={styles.actionRow}
              activeOpacity={0.8}
              onPress={() => {
                setIsFabMenuOpen(false);
                setActiveSubRoute("sample_view"); // 💡 ROUTE TO NEW LIST SCREEN
              }}
            >
              <Text style={styles.actionRowText}>
                View sample inventory list
              </Text>
              <View style={styles.smallFabCircle}>
                <MaterialCommunityIcons
                  name="clipboard-list-outline"
                  size={20}
                  color="#FFF"
                />
              </View>
            </TouchableOpacity>

            {/* Middle Speed Dial Option: Add Inventory Item */}
            <TouchableOpacity
              style={styles.actionRow}
              activeOpacity={0.8}
              onPress={() => {
                setIsFabMenuOpen(false);
                setCreateItemModalOpen(true); // 💡 LAUNCH NEW FORM MODAL ON CLICK
              }}
            >
              <Text style={styles.actionRowText}>Add inventory item</Text>
              <View style={styles.smallFabCircle}>
                <MaterialCommunityIcons
                  name="clipboard-plus-outline"
                  size={20}
                  color="#FFF"
                />
              </View>
            </TouchableOpacity>
          </View>
        </Pressable>
      )}

      {/* ================= 5. BASE FLOATING ACTION TRIGGER (FAB) ================= */}
      <View style={styles.fabContainerOverlay}>
        <TouchableOpacity
          style={[
            styles.floatingActionButton,
            isFabMenuOpen && styles.floatingActionButtonActive,
          ]}
          activeOpacity={0.85}
          onPress={() => setIsFabMenuOpen(!isFabMenuOpen)}
        >
          <Ionicons
            name={isFabMenuOpen ? "close" : "add"}
            size={28}
            color="#FFF"
          />
        </TouchableOpacity>
      </View>

      {/* 💡 INJECT THE NEWLY CONSTRUCTED CREATE ITEM OVERLAY FORM LAYER PORTAL */}
      <CreateInventoryItemModal
        visible={createItemModalOpen}
        onClose={() => setCreateItemModalOpen(false)}
        onSubmit={(newItemPayload) => {
          console.log(
            "Pushing newly generated inventory tracking metrics straight to pipeline:",
            newItemPayload,
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161D26",
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%",
    alignSelf: "center",
    position: "relative",
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#242F42",
    backgroundColor: "#161D26",
  },
  appBarLeft: { flexDirection: "row", alignItems: "center", gap: 16 },
  menuButton: { padding: 2 },
  appBarTitle: { color: "#FFF", fontSize: 20, fontWeight: "500" },
  appBarRight: { flexDirection: "row", alignItems: "center", gap: 16 },
  appBarIconButton: { padding: 2 },
  avatarCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#85C1E9",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  avatarText: { color: "#121824", fontSize: 15, fontWeight: "700" },
  onlineStatusDot: {
    position: "absolute",
    bottom: -1,
    right: -1,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#4CD964",
    borderWidth: 1.5,
    borderColor: "#161D26",
  },
  summaryBarRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(36, 47, 66, 0.4)",
  },
  summaryLeftGroup: { flexDirection: "row", alignItems: "center", gap: 12 },
  summaryTitleText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
  globalToggleBtn: {
    backgroundColor: "#202E3A",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#2D3E4E",
  },
  globalToggleBtnText: { color: "#85C1E9", fontSize: 14, fontWeight: "600" },
  scrollContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 120 },
  accordionContainerBlock: { marginBottom: 8 },
  categoryHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 4,
  },
  categoryHeaderLeft: { flexDirection: "row", alignItems: "center", gap: 16 },
  categoryIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#202E3A",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.03)",
  },
  categoryLabelText: { color: "#9EA5B1", fontSize: 16, fontWeight: "500" },
  emptyFallbackCell: {
    backgroundColor: "#202A36",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.02)",
  },
  emptyFallbackText: {
    color: "#E5E9F0",
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
  },

  // 💡 SPEED DIAL STYLES METRICS
  dimBackdropMask: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(10, 15, 22, 0.82)", // Opaque blur factor shade matching screenshot exactly
    zIndex: 40,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingBottom: 100, // Positions actions layout rows cleanly above primary FAB trigger
    paddingRight: 16,
  },
  speedDialMenuStack: {
    flexDirection: "column",
    gap: 20,
    alignItems: "flex-end",
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  actionRowText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  smallFabCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#203444", // Deep gray slate action button fill matching your prompt image
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  fabContainerOverlay: {
    position: "absolute",
    bottom: 30,
    right: 16,
    left: 16,
    alignItems: "flex-end",
    pointerEvents: "box-none",
    zIndex: 50,
  },
  floatingActionButton: {
    backgroundColor: "#004D61",
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: { elevation: 6 },
      web: {
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
        cursor: "pointer",
        userSelect: "none",
      },
    }),
  },
  floatingActionButtonActive: {
    backgroundColor: "#005F78", // Vibrant teal color transformation state when menu expands
  },
});
