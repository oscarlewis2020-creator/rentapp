import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const UNIT_CATEGORIES = [
  { name: "Bedsitter", icon: "bed-outline", type: "MaterialCommunityIcons" },
  { name: "Single Room", icon: "sofa-outline", type: "MaterialCommunityIcons" },
  {
    name: "1 Bedroom",
    icon: "bed-king-outline",
    type: "MaterialCommunityIcons",
  },
  {
    name: "2 Bedroom",
    icon: "bed-double-outline",
    type: "MaterialCommunityIcons",
  },
  { name: "3 Bedroom", icon: "bed-outline", type: "MaterialCommunityIcons" },
  { name: "Single family", icon: "home-outline", type: "Ionicons" },
  { name: "Apartment", icon: "business-outline", type: "Ionicons" },
  { name: "Shop", icon: "storefront-outline", type: "Ionicons" },
  { name: "Condominium", icon: "city-outline", type: "MaterialCommunityIcons" },
];

export default function ExploreUnitsScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Top Search Bar (acts as trigger to search screen) */}
      <TouchableOpacity
        style={styles.searchBarContainer}
        activeOpacity={0.9}
        onPress={() => router.push("/search" as any)}
      >
        <Ionicons
          name="search"
          size={20}
          color="#9ca3af"
          style={{ marginRight: 10 }}
        />
        <Text style={styles.searchText}>Search by name or location</Text>
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Explore Unit Types</Text>

        <View style={styles.gridContainer}>
          {UNIT_CATEGORIES.map((cat, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryCard}
              activeOpacity={0.8}
              onPress={() =>
                router.push({
                  pathname: "/search" as any,
                  params: { category: cat.name },
                })
              }
            >
              <Text style={styles.categoryCardTitle}>{cat.name}</Text>
              {cat.type === "Ionicons" ? (
                <Ionicons name={cat.icon as any} size={24} color="#38bdf8" />
              ) : (
                <MaterialCommunityIcons
                  name={cat.icon as any}
                  size={24}
                  color="#38bdf8"
                />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footerInfo}>
          <View style={styles.divider} />
          <Text style={styles.footerText}>
            For additional filters including: pricing and amenities, use the
            filter button provided above
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111827", paddingTop: 50 },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1f2937",
    marginHorizontal: 16,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    // No border here as requested
  },
  searchText: { color: "#9ca3af", fontSize: 15 },
  scrollContent: { padding: 16, paddingBottom: 40 },
  sectionTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    width: "48%",
    backgroundColor: "#1f2937",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#374151",
    height: 75,
  },
  categoryCardTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
    marginRight: 8,
  },
  footerInfo: { marginTop: 24, alignItems: "center", paddingHorizontal: 10 },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#374151",
    marginBottom: 16,
  },
  footerText: {
    color: "#9ca3af",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },
});
