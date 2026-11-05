import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Import your sub-components
import LeasesList from "./LeasesList";
import PaymentsList from "./PaymentsList";

export default function TenantHome() {
  const [activeTab, setActiveTab] = useState<"leases" | "payments">("leases");

  const handleOpenSearch = () => {
    router.push("/search");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Search Bar Card Trigger */}
        <TouchableOpacity
          style={styles.searchCard}
          onPress={handleOpenSearch}
          activeOpacity={0.8}
        >
          <View style={styles.searchIconCircle}>
            <Ionicons name="home-outline" size={24} color="#38bdf8" />
          </View>
          <Text style={styles.searchText}>Search for properties</Text>
        </TouchableOpacity>

        {/* 2. Leases / Payments Switcher Bar */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "leases" && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab("leases")}
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

        {/* 3. Render Active Tab Component */}
        {activeTab === "leases" ? <LeasesList /> : <PaymentsList />}
      </ScrollView>

      {/* 4. Floating Action Bar (Filter / Sort) */}
      <View style={styles.floatingActionBar}>
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
    backgroundColor: "#111827", // Dark theme background matching Photo 2
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  searchCard: {
    backgroundColor: "#1f2937",
    borderRadius: 12,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#374151",
  },
  searchIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#38bdf8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  searchText: {
    color: "#38bdf8",
    fontSize: 16,
    fontWeight: "600",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#1f2937",
    borderRadius: 10,
    padding: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#374151",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: "#374151",
  },
  tabText: {
    color: "#9ca3af",
    fontSize: 15,
    fontWeight: "600",
  },
  activeTabText: {
    color: "#ffffff",
  },
  floatingActionBar: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: "#1f2937",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#374151",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  actionText: {
    color: "#94a3b8",
    fontSize: 14,
    fontWeight: "500",
  },
  actionDivider: {
    width: 1,
    height: "100%",
    backgroundColor: "#374151",
    marginHorizontal: 16,
  },
});
