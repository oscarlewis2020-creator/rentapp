import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TenantHomeScreen() {
  // State to toggle between Leases and Payments views
  const [activeTab, setActiveTab] = useState<"leases" | "payments">("leases");

  // Handler to navigate to the dedicated Search screen
  const handleOpenSearch = () => {
    router.push("../screens/tenant/search");
  };

  return (
    <View style={styles.container}>
      {/* 1. Search Bar Card (Navigates to Search Screen on Press) */}
      <TouchableOpacity style={styles.searchCard} onPress={handleOpenSearch}>
        <Text style={styles.searchIcon}>🔍</Text>
        <Text style={styles.searchText}>Search for properties</Text>
      </TouchableOpacity>

      {/* 2. Leases / Payments Toggle Bar */}
      <View style={styles.tabSwitcher}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "leases" && styles.activeTab]}
          onPress={() => setActiveTab("leases")}
        >
          <Text style={styles.tabText}>Leases</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "payments" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("payments")}
        >
          <Text style={styles.tabText}>Payments</Text>
        </TouchableOpacity>
      </View>

      {/* 3. Conditional Screen Views */}
      <View style={styles.contentContainer}>
        {activeTab === "leases" ? (
          <LeasesViewPlaceholder />
        ) : (
          <PaymentsViewPlaceholder />
        )}
      </View>
    </View>
  );
}

// --- Inline Sub-Screen Components ---

function LeasesViewPlaceholder() {
  return (
    <View style={styles.screenCard}>
      <Text style={styles.cardHeading}>Leases Overview</Text>
      <Text style={styles.cardSubtext}>
        Your active and past leases will appear here.
      </Text>
    </View>
  );
}

function PaymentsViewPlaceholder() {
  return (
    <View style={styles.screenCard}>
      <Text style={styles.cardHeading}>Payment History</Text>
      <Text style={styles.cardSubtext}>No payments found.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchCard: {
    backgroundColor: "#1e293b",
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  searchText: {
    color: "#38bdf8",
    fontSize: 16,
    fontWeight: "600",
  },
  tabSwitcher: {
    flexDirection: "row",
    backgroundColor: "#1e293b",
    borderRadius: 8,
    marginBottom: 16,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: "#334155",
  },
  tabText: {
    color: "#f8fafc",
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
  },
  screenCard: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  cardHeading: {
    color: "#f8fafc",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardSubtext: {
    color: "#94a3b8",
    fontSize: 14,
    textAlign: "center",
  },
});
