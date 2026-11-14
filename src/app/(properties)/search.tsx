import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MOCK_BUILDINGS } from "../../data/mockBuildings";

const CATEGORIES = ["All", "Bedsitter", "Single Room", "1 Bedroom", "Hostel"];

export default function SearchScreen() {
  const params = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    (params.category as string) || null,
  );

  const hasSearched =
    searchQuery.trim().length > 0 || selectedCategory !== null;

  const filteredBuildings = hasSearched
    ? MOCK_BUILDINGS.filter((item) => {
        const matchesSearch =
          searchQuery.trim() === "" ||
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory =
          selectedCategory === null ||
          selectedCategory === "All" ||
          item.type.toLowerCase() === selectedCategory.toLowerCase();

        return matchesSearch && matchesCategory;
      })
    : MOCK_BUILDINGS; // Shows all if category was pre-selected from explore screen

  return (
    <View style={styles.container}>
      {/* Search Header Bar - Borderless */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginRight: 12 }}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search building or location..."
          placeholderTextColor="#9ca3af"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoFocus
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close" size={20} color="#9ca3af" />
          </TouchableOpacity>
        )}
      </View>

      {/* Category Filter Chips */}
      <View style={{ height: 60 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryChip,
                selectedCategory === cat && styles.activeCategoryChip,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat && styles.activeCategoryText,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Text style={styles.resultsCount}>
        Showing {filteredBuildings.length} results
      </Text>

      <ScrollView
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        {filteredBuildings.map((building) => (
          <TouchableOpacity
            key={building.id}
            style={styles.buildingCard}
            activeOpacity={0.9}
            onPress={() =>
              router.push({
                pathname: "/building-details" as any,
                params: { id: building.id },
              })
            }
          >
            <Image
              source={{ uri: building.images[0] }}
              style={styles.cardImage}
            />

            <View style={styles.cardDetails}>
              <View style={styles.cardRow}>
                <Ionicons
                  name="home"
                  size={16}
                  color="#38bdf8"
                  style={styles.iconStyle}
                />
                <Text style={styles.buildingName}>{building.name}</Text>
              </View>

              <View style={styles.cardRow}>
                <MaterialCommunityIcons
                  name="email-outline"
                  size={16}
                  color="#38bdf8"
                  style={styles.iconStyle}
                />
                <Text style={styles.cardText}>{building.email}</Text>
              </View>

              <View style={styles.cardRow}>
                <Ionicons
                  name="location"
                  size={16}
                  color="#38bdf8"
                  style={styles.iconStyle}
                />
                <Text style={styles.cardText} numberOfLines={1}>
                  {building.location}
                </Text>
              </View>

              <View style={styles.cardRow}>
                <Ionicons
                  name="options"
                  size={16}
                  color="#38bdf8"
                  style={styles.iconStyle}
                />
                <Text style={styles.cardText}>
                  {building.type.toLowerCase()}
                </Text>
              </View>

              <View style={styles.cardRow}>
                <MaterialCommunityIcons
                  name="bed"
                  size={16}
                  color="#38bdf8"
                  style={styles.iconStyle}
                />
                <Text style={styles.cardText}>
                  {building.unitsAvailable > 0
                    ? `${building.unitsAvailable} Units`
                    : "No units available"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111827", paddingTop: 40 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1f2937",
    marginHorizontal: 16,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    // Removed borderWidth and borderColor to eliminate any white/light border
  },
  searchInput: { flex: 1, color: "#ffffff", fontSize: 15 },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#374151",
    marginRight: 8,
    backgroundColor: "#1f2937",
    height: 38,
  },
  activeCategoryChip: { backgroundColor: "#38bdf8", borderColor: "#38bdf8" },
  categoryText: { color: "#9ca3af", fontSize: 13, fontWeight: "600" },
  activeCategoryText: { color: "#0f172a" },
  resultsCount: {
    color: "#9ca3af",
    fontSize: 13,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  listContainer: { paddingHorizontal: 16, paddingBottom: 40 },
  buildingCard: {
    backgroundColor: "#1f2937",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#374151",
  },
  cardImage: { width: "100%", height: 180 },
  cardDetails: { padding: 14 },
  cardRow: { flexDirection: "row", alignItems: "center", marginVertical: 3 },
  iconStyle: { marginRight: 8 },
  buildingName: { color: "#ffffff", fontSize: 16, fontWeight: "700" },
  cardText: { color: "#d1d5db", fontSize: 13 },
});
