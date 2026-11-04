// app/(public)/search-property.tsx
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Component Library Imports
import {
  PropertyCard,
  PropertyItem,
} from "../../components/ui/search/PropertyCard";
import { SearchHeader } from "../../components/ui/search/SearchHeader";
import {
  UnitTypeGrid,
  UnitTypeItem,
} from "../../components/ui/search/UnitTypeGrid";

import { useAuthGuard } from "../../hooks/useAuthGuard";

const ALL_CATEGORIES: UnitTypeItem[] = [
  { id: "bedsitter", label: "Bedsitter" },
  { id: "single-room", label: "Single Room" },
  { id: "1-bed", label: "1 Bedroom" },
  { id: "2-bed", label: "2 Bedroom" },
  { id: "3-bed", label: "3 Bedroom" },
  { id: "single-family", label: "Single family" },
  { id: "apartment", label: "Apartment" },
  { id: "shop", label: "Shop" },
  { id: "condo", label: "Condominium" },
];

const MOCK_PROPERTIES: PropertyItem[] = [
  {
    id: "p1",
    name: "Leslos A",
    email: "leslosinc@gmail.com",
    location: "Moi uni (main), Eldoret",
    type: "residential",
    unitsCount: 80,
    image: require("../../../assets/leslos-img.png"),
  },
  {
    id: "p2",
    name: "Mwangaza Residence",
    email: "collinskipkirui23@gmail.com",
    location: "Moi uni (main), Eldoret",
    type: "residential",
    unitsCount: 11,
    image: require("../../../assets/mwangaza-img.png"),
  },
];

export default function SearchPropertyScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const inputRef = useRef<React.ComponentRef<typeof TextInput>>(null);

  // 💡 Initialize the guard intercept thunk controller
  const { executeProtectedAction } = useAuthGuard();

  const handlePropertySelection = (property: PropertyItem) => {
    // 💡 Wrap navigation target calls inside the security validation engine
    executeProtectedAction(() => {
      console.log(
        `Access granted! Navigating to protected property dashboard panel: ${property.name}`,
      );
      // Actual routing path execution for authenticated users goes here:
      // router.push({ pathname: "/property-details", params: { id: property.id } });
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchHeader
        searchQuery={searchQuery}
        onChangeSearchQuery={setSearchQuery}
        inputRef={inputRef as any}
        onFilterPress={() => console.log("Open options sheet")}
      />

      {!selectedCategory ? (
        <UnitTypeGrid
          categories={ALL_CATEGORIES}
          onSelectCategory={setSelectedCategory}
        />
      ) : (
        <View style={styles.resultsWorkspace}>
          <View style={styles.horizontalBarOuter}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScrollContent}
            >
              {ALL_CATEGORIES.map((category) => {
                const isCurrent = category.id === selectedCategory;
                return (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.pillOption,
                      isCurrent && styles.activePillOption,
                    ]}
                    onPress={() =>
                      setSelectedCategory(isCurrent ? null : category.id)
                    }
                    activeOpacity={0.7}
                  >
                    {isCurrent && (
                      <Ionicons
                        name="checkmark"
                        size={16}
                        color="#FFF"
                        style={styles.pillCheckIcon}
                      />
                    )}
                    <Text style={styles.pillText}>{category.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          <Text style={styles.resultsSummaryLabel}>
            Showing <Text style={styles.highlightNumberText}>8</Text> out of{" "}
            <Text style={styles.highlightNumberText}>78</Text> results
          </Text>

          <FlatList
            data={MOCK_PROPERTIES}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.propertiesListContent}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              // 💡 Wrap card elements in an active touchable tracking row layer
              <TouchableOpacity
                onPress={() => handlePropertySelection(item)}
                activeOpacity={0.95}
              >
                <PropertyCard item={item} />
              </TouchableOpacity>
            )}
          />
        </View>
      )}
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
  resultsWorkspace: { flex: 1 },
  horizontalBarOuter: { height: 50, marginBottom: 8 },
  horizontalScrollContent: {
    paddingHorizontal: 16,
    alignItems: "center",
    gap: 8,
  },
  pillOption: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3A4654",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "transparent",
  },
  activePillOption: { backgroundColor: "#034769", borderColor: "#007AFF" },
  pillCheckIcon: { marginRight: 6 },
  pillText: { color: "#FFF", fontSize: 14, fontWeight: "500" },
  resultsSummaryLabel: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "600",
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  highlightNumberText: { color: "#85C1E9" },
  propertiesListContent: { paddingHorizontal: 16, paddingBottom: 40 },
});
