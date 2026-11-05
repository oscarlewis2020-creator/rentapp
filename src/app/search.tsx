import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";
import { router } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const UNIT_TYPES = [
  { id: "1", title: "Bedsitter", icon: "bed-outline", type: "Bedsitter" },
  { id: "2", title: "Single Room", icon: "sofa-outline", type: "Single Room" },
  { id: "3", title: "1 Bedroom", icon: "bed-king-outline", type: "1 Bedroom" },
  { id: "4", title: "2 Bedroom", icon: "home-city-outline", type: "2 Bedroom" },
  { id: "5", title: "3 Bedroom", icon: "home-outline", type: "3 Bedroom" },
  {
    id: "6",
    title: "Single family",
    icon: "home-heart",
    type: "Single family",
  },
  { id: "7", title: "Apartment", icon: "office-building", type: "Apartment" },
  { id: "8", title: "Shop", icon: "storefront-outline", type: "Shop" },
  {
    id: "9",
    title: "Condominium",
    icon: "city-variant-outline",
    type: "Condominium",
  },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const insets = useSafeAreaInsets();

  const handleSelectUnitType = (unitType: string) => {
    // Navigation action or filter handler for the selected unit type
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <StatusBar barStyle="light-content" />

      {/* Header Bar with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Explore Properties</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Input Bar */}
        <View style={styles.inputContainer}>
          <Ionicons
            name="search-outline"
            size={20}
            color="#9ca3af"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Search by name or location"
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={18} color="#9ca3af" />
            </TouchableOpacity>
          )}
        </View>

        {/* Section Heading */}
        <Text style={styles.sectionTitle}>Explore Unit Types</Text>

        {/* Grid of Unit Type Cards */}
        <View style={styles.gridContainer}>
          {UNIT_TYPES.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              activeOpacity={0.7}
              onPress={() => handleSelectUnitType(item.type)}
            >
              <Text style={styles.cardTitle}>{item.title}</Text>
              <MaterialCommunityIcons
                name={item.icon as any}
                size={26}
                color="#38bdf8"
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer Helper Text */}
        <Text style={styles.footerText}>
          For additional filters including: pricing and amenities, use the
          filter button (
          <Ionicons name="options-outline" size={14} color="#38bdf8" />)
          provided above
        </Text>
      </ScrollView>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1f2937",
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1f2937",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: "#374151",
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: "#ffffff",
    fontSize: 15,
  },
  sectionTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 14,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#1f2937",
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#374151",
  },
  cardTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
  },
  footerText: {
    color: "#9ca3af",
    fontSize: 12,
    textAlign: "center",
    marginTop: 24,
    paddingHorizontal: 20,
    lineHeight: 18,
  },
});
