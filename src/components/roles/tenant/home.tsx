import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LeasesList, { LeaseItem } from "./LeasesList";
import PaymentsList from "./PaymentsList";

const INITIAL_LEASES: LeaseItem[] = [
  {
    id: "1",
    building: "Test 1",
    unit: "Room 3",
    status: "Requested",
    startDate: "Jul-09-2026",
    endDate: "Jul-08-2027",
  },
  {
    id: "2",
    building: "Las Vegas",
    unit: "A",
    status: "Past Due",
    startDate: "Jul-09-2026",
    endDate: "Jul-08-2027",
  },
  {
    id: "3",
    building: "Jandj",
    unit: "Jj 1",
    status: "Past Due",
    startDate: "Jul-15-2026",
    endDate: "Aug-15-2026",
  },
  {
    id: "4",
    building: "Jandj",
    unit: "Jj 1",
    status: "Canceled",
    startDate: "Jul-09-2026",
    endDate: "Jul-30-2027",
  },
];

export default function TenantHome() {
  const [activeTab, setActiveTab] = useState<"leases" | "payments">("leases");
  const [leases, setLeases] = useState<LeaseItem[]>(INITIAL_LEASES);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" />

      {/* Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu-outline" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tenant Home</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={22} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>B</Text>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Header Banner */}
        <TouchableOpacity
          style={styles.searchBanner}
          activeOpacity={0.8}
          onPress={() => router.push("/explore-units" as any)}
        >
          <View style={styles.searchIconContainer}>
            <Ionicons name="home-outline" size={20} color="#38bdf8" />
          </View>
          <Text style={styles.searchBannerText}>Search for properties</Text>
        </TouchableOpacity>

        {/* Segmented Tab Switcher (Leases / Payments) */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "leases" && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab("leases")}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "leases" && styles.activeTabText,
              ]}
            >
              Leases
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "payments" && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab("payments")}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "payments" && styles.activeTabText,
              ]}
            >
              Payments
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content Display */}
        {activeTab === "leases" ? (
          <LeasesList leases={leases} onUpdateLeases={setLeases} />
        ) : (
          <PaymentsList />
        )}
      </ScrollView>

      {/* Floating Action Bar (Filter / Sort) */}
      <View style={[styles.floatingActionBar, { bottom: insets.bottom + 16 }]}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="options-outline" size={18} color="#94a3b8" />
          <Text style={styles.actionText}>Filter</Text>
        </TouchableOpacity>
        <View style={styles.actionDivider} />
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="swap-vertical-outline" size={18} color="#94a3b8" />
          <Text style={styles.actionText}>Sort</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1f2937",
  },
  menuButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginRight: 12,
    padding: 4,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#38bdf8",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#0f172a",
    fontWeight: "700",
    fontSize: 14,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 90,
  },
  searchBanner: {
    backgroundColor: "#1f2937",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#374151",
  },
  searchIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  searchBannerText: {
    color: "#38bdf8",
    fontSize: 15,
    fontWeight: "600",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#1f2937",
    borderRadius: 8,
    padding: 3,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#374151",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 6,
  },
  activeTabButton: {
    backgroundColor: "#374151",
  },
  tabText: {
    color: "#9ca3af",
    fontSize: 14,
    fontWeight: "600",
  },
  activeTabText: {
    color: "#ffffff",
  },
  floatingActionBar: {
    position: "absolute",
    left: 20,
    right: 20,
    backgroundColor: "#1f2937",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#374151",
    elevation: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    color: "#94a3b8",
    marginLeft: 6,
    fontWeight: "600",
    fontSize: 14,
  },
  actionDivider: {
    width: 1,
    height: 20,
    backgroundColor: "#374151",
  },
});
