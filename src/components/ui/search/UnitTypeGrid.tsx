import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export interface UnitTypeItem {
  id: string;
  label: string;
}

interface UnitTypeGridProps {
  categories: UnitTypeItem[];
  onSelectCategory: (id: string) => void;
}

const unitIcons: Record<string, React.ReactNode> = {
  bedsitter: (
    <MaterialCommunityIcons
      name="bed-single-outline"
      size={22}
      color="#85C1E9"
    />
  ),
  "single-room": <FontAwesome5 name="couch" size={16} color="#85C1E9" />,
  "1-bed": (
    <MaterialCommunityIcons
      name="bed-double-outline"
      size={22}
      color="#85C1E9"
    />
  ),
  "2-bed": (
    <MaterialCommunityIcons name="bed-king-outline" size={22} color="#85C1E9" />
  ),
  "3-bed": (
    <MaterialCommunityIcons name="bed-empty" size={22} color="#85C1E9" />
  ),
  "single-family": <Ionicons name="home-outline" size={20} color="#85C1E9" />,
  apartment: (
    <MaterialCommunityIcons
      name="office-building-outline"
      size={22}
      color="#85C1E9"
    />
  ),
  shop: (
    <MaterialCommunityIcons
      name="storefront-outline"
      size={22}
      color="#85C1E9"
    />
  ),
  condo: (
    <MaterialCommunityIcons
      name="city-variant-outline"
      size={22}
      color="#85C1E9"
    />
  ),
};

export function UnitTypeGrid({
  categories,
  onSelectCategory,
}: UnitTypeGridProps) {
  return (
    <>
      <Text style={styles.sectionTitle}>Explore Unit Types</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.gridRowWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => onSelectCategory(item.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.gridCardText} numberOfLines={1}>
              {item.label}
            </Text>
            <View style={styles.iconWrapper}>
              {unitIcons[item.id] || (
                <Ionicons name="home-outline" size={20} color="#85C1E9" />
              )}
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={styles.footerNoteContainer}>
        <Text style={styles.footerNoteText}>
          For additional filters including: pricing and amenities,
        </Text>
        <Text style={styles.footerNoteText}>
          use the filter button (
          <Ionicons name="options-outline" size={14} color="#85C1E9" />)
          provided above
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  listContent: { paddingHorizontal: 12 },
  gridRowWrapper: { justifyContent: "space-between", marginBottom: 12 },
  gridCard: {
    flex: 0.485,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1C2534",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: "#242F42",
  },
  gridCardText: {
    color: "#E5E9F0",
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
    marginRight: 8,
  },
  iconWrapper: { width: 24, alignItems: "center", justifyContent: "center" },
  footerNoteContainer: {
    paddingVertical: 20,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(36, 47, 66, 0.4)",
    marginHorizontal: 16,
  },
  footerNoteText: {
    color: "#9EA5B1",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
  },
});
