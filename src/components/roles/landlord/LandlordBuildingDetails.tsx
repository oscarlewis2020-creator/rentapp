// components/roles/landlord/BuildingDetails.tsx
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserRole } from "../../../app/_layout";

// 💡 IMPORT THE NEWLY CREATED EDIT SCREEN VIEW
import { EditBuildingScreen } from "./LandlordEditBuildingScreen";

type ActiveTabType = "leases" | "info" | "ratings";

interface BuildingDetailsProps {
  onFilterPress?: () => void;
  onSortPress?: () => void;
  onSharePress?: () => void;
  onUploadPress?: () => void;
  onDeletePress?: () => void;
}

interface InfoRowItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueColor?: string;
}

// Reusable Info Parameter Row Entry Line Item Component
function InfoRowItem({
  icon,
  label,
  value,
  valueColor = "#FFF",
}: InfoRowItemProps) {
  return (
    <View style={styles.infoLineRow}>
      <View style={styles.infoLineLeft}>
        <View style={styles.infoRowIconWrapper}>{icon}</View>
        <Text style={styles.infoRowLabelText}>{label}</Text>
      </View>
      <Text
        style={[styles.infoRowValueText, { color: valueColor }]}
        numberOfLines={1}
      >
        {value}
      </Text>
    </View>
  );
}

export function LandlordBuildingDetails({
  onFilterPress,
  onSortPress,
  onSharePress,
  onUploadPress,
  onDeletePress,
}: BuildingDetailsProps) {
  const { setIsDrawerOpen } = useUserRole();
  const [activeTab, setActiveTab] = useState<ActiveTabType>("leases");
  const [detailsSubRoute, setDetailsSubRoute] = useState<
    "base_details" | "edit_form"
  >("base_details");

  // 🔥 INTERCEPT ROUTING LAYER: If user clicked the quick action edit icon, show Edit form instead
  if (detailsSubRoute === "edit_form") {
    return (
      <EditBuildingScreen
        onBackPress={() => setDetailsSubRoute("base_details")} // Returns safely back to detail tabs
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* ================= 1. UPPER APPBAR HEADER ROW ================= */}
      <View style={styles.appBar}>
        <View style={styles.appBarLeft}>
          <TouchableOpacity
            onPress={() => setIsDrawerOpen(true)}
            style={styles.menuButton}
          >
            <Ionicons name="menu" size={28} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.appBarTitle}>Test 1 Details</Text>
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

      {/* ================= 2. CORE WORKSPACE CONTENT STREAM ================= */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Quick Actions Management Header Card */}
        <View style={styles.quickActionsCard}>
          <Text style={styles.cardHeadline}>Building quick actions</Text>
          <View style={styles.actionIconsRow}>
            <TouchableOpacity
              onPress={onSharePress}
              style={styles.iconActionButton}
              activeOpacity={0.75}
            >
              <Ionicons name="share-social-outline" size={18} color="#85C1E9" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setDetailsSubRoute("edit_form")}
              style={styles.iconActionButton}
              activeOpacity={0.75}
            >
              <Ionicons name="cloud-upload-outline" size={18} color="#85C1E9" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onDeletePress}
              style={styles.iconActionButton}
              activeOpacity={0.75}
            >
              <Ionicons name="trash-outline" size={18} color="#FF6B6B" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Segmented Segment Control Tab Menu Bar */}
        <View style={styles.tabsContainerSegment}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "leases" && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab("leases")}
          >
            <MaterialCommunityIcons
              name="file-document-outline"
              size={16}
              color={activeTab === "leases" ? "#FFF" : "#9EA5B1"}
              style={styles.tabIcon}
            />
            <Text
              style={[
                styles.tabButtonText,
                activeTab === "leases" && styles.tabButtonTextActive,
              ]}
            >
              Leases
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "info" && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab("info")}
          >
            <MaterialCommunityIcons
              name="information-variant"
              size={16}
              color={activeTab === "info" ? "#FFF" : "#9EA5B1"}
              style={styles.tabIcon}
            />
            <Text
              style={[
                styles.tabButtonText,
                activeTab === "info" && styles.tabButtonTextActive,
              ]}
            >
              Info
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "ratings" && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab("ratings")}
          >
            <Ionicons
              name="star-outline"
              size={16}
              color={activeTab === "ratings" ? "#FFF" : "#9EA5B1"}
              style={styles.tabIcon}
            />
            <Text
              style={[
                styles.tabButtonText,
                activeTab === "ratings" && styles.tabButtonTextActive,
              ]}
            >
              Ratings
            </Text>
          </TouchableOpacity>
        </View>

        {/* Dynamic Display workspace depending on selection triggers */}
        <View style={styles.tabContentWorkspace}>
          {/* === SEGMENT A: LEASES INTERFACE === */}
          {activeTab === "leases" && (
            <Text style={styles.emptyPlaceholderText}>No leases found.</Text>
          )}

          {/* === SEGMENT B: 🔥 LIVE BUILDING INFO INTERFACE MODULE === */}
          {activeTab === "info" && (
            <View style={styles.infoWorkspace}>
              {/* Part 1: Structural Parameters Card Block */}
              <Text style={styles.subsectionTitle}>Building Info</Text>
              <View style={styles.infoSectionCard}>
                <InfoRowItem
                  icon={<Ionicons name="business" size={18} color="#85C1E9" />}
                  label="Type"
                  value="residential"
                />
                <InfoRowItem
                  icon={<Ionicons name="location" size={18} color="#85C1E9" />}
                  label="Address"
                  value="Eldoret, Kenya"
                />
                <InfoRowItem
                  icon={<Ionicons name="call" size={18} color="#85C1E9" />}
                  label="Phone"
                  value="+254 796 758 021"
                />
                <InfoRowItem
                  icon={<Ionicons name="mail" size={18} color="#85C1E9" />}
                  label="Service email"
                  value="oscarlewis2020@gmail.com"
                />
                <InfoRowItem
                  icon={<Ionicons name="ribbon" size={18} color="#85C1E9" />}
                  label="Average rating"
                  value="Not yet rated"
                  valueColor="#85C1E9"
                />
                <InfoRowItem
                  icon={<Ionicons name="home" size={18} color="#85C1E9" />}
                  label="Vacant units"
                  value="20 out of 20"
                />
                <InfoRowItem
                  icon={<Ionicons name="people" size={18} color="#85C1E9" />}
                  label="Occupied units"
                  value="0 out of 20"
                />
              </View>

              {/* Part 2: Horizontal Features Amenities Pill List Section */}
              <Text style={styles.subsectionTitle}>Building Amenities</Text>
              <View style={styles.infoSectionCard}>
                <View style={styles.amenitiesWrapLayout}>
                  <View style={styles.amenityPill}>
                    <Ionicons
                      name="wifi"
                      size={16}
                      color="#85C1E9"
                      style={styles.pillIcon}
                    />
                    <Text style={styles.amenityPillText}>
                      High-speed internet access
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* === SEGMENT C: RATINGS VIEW === */}

          {activeTab === "ratings" && (
            <Text style={styles.emptyPlaceholderText}>
              No ratings or tenant review submissions posted yet.
            </Text>
          )}
        </View>
      </ScrollView>

      {/* ================= 3. LOWER STICKY OVERLAY CONTROLS PILL BAR ================= */}
      {/* 💡 Hide filter/sort overlay pill options cleanly when looking at building details info stats */}

      {activeTab !== "info" && (
        <View style={styles.bottomOverlayBarContainer}>
          <View style={styles.filterSortPillContainer}>
            <TouchableOpacity
              style={styles.pillActionBtn}
              onPress={onFilterPress}
              activeOpacity={0.7}
            >
              <Ionicons name="funnel-outline" size={16} color="#FFF" />
              <Text style={styles.pillBtnText}>Filter</Text>
            </TouchableOpacity>

            <View style={styles.pillVerticalSeparatorLine} />

            <TouchableOpacity
              style={styles.pillActionBtn}
              onPress={onSortPress}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name="swap-vertical"
                size={18}
                color="#FFF"
              />
              <Text style={styles.pillBtnText}>Sort</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
  scrollContent: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 60 },

  quickActionsCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1C2534",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: "#242F42",
    marginBottom: 20,
  },
  cardHeadline: { color: "#FFF", fontSize: 18, fontWeight: "700" },
  actionIconsRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconActionButton: {
    width: 38,
    height: 38,
    borderRadius: 6,
    backgroundColor: "#242F42",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.03)",
  },
  tabsContainerSegment: {
    flexDirection: "row",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#2A384A",
    borderRadius: 8,
    overflow: "hidden",
    height: 46,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRightWidth: 1,
    borderRightColor: "#2A384A",
  },
  tabButtonActive: { backgroundColor: "#29394B" },
  tabIcon: { marginRight: 6 },
  tabButtonText: { color: "#9EA5B1", fontSize: 14, fontWeight: "600" },
  tabButtonTextActive: { color: "#FFF" },
  tabContentWorkspace: { flex: 1, width: "100%" },
  emptyPlaceholderText: {
    color: "#CFD8DC",
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
    paddingTop: 20,
  },
  // 💡 LIVE INFO SUB-VIEW STYLES
  infoWorkspace: { width: "100%" },
  subsectionTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    marginLeft: 4,
    letterSpacing: 0.1,
  },
  infoSectionCard: {
    backgroundColor: "#1C2534",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#242F42",
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 24,
  },
  infoLineRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(36, 47, 66, 0.5)",
  },
  noBorderRow: { borderBottomWidth: 0 },
  infoLineLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    flex: 0.5,
  },
  infoRowIconWrapper: {
    width: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  infoRowLabelText: { color: "#9EA5B1", fontSize: 15, fontWeight: "500" },
  infoRowValueText: {
    fontSize: 15,
    fontWeight: "500",
    textAlign: "right",
    flex: 0.5,
    paddingLeft: 8,
  },
  amenitiesWrapLayout: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 8,
  },
  amenityPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#243242",
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#304257",
  },
  pillIcon: { marginRight: 8 },
  amenityPillText: { color: "#E5E9F0", fontSize: 14, fontWeight: "600" },
  bottomOverlayBarContainer: {
    position: "absolute",
    bottom: 24,
    left: 16,
    right: 16,
    alignItems: "flex-start",
    pointerEvents: "box-none",
  },
  filterSortPillContainer: {
    flexDirection: "row",
    backgroundColor: "#243242",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#304257",
    width: "100%",
    maxWidth: 240,
    overflow: "hidden",
  },
  pillActionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    gap: 8,
  },
  pillBtnText: { color: "#FFF", fontWeight: "600", fontSize: 14 },
  pillVerticalSeparatorLine: {
    width: 1,
    backgroundColor: "#304257",
    marginVertical: 8,
  },
});
