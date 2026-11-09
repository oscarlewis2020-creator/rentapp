import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface UnitPerformanceScreenProps {
  buildingName: string;
  onBackPress: () => void;
}

type SortOption = "High revenue units first" | "Low revenue units first";
type YearOption = "2024" | "2025" | "2026";

export function LandlordUnitPerformanceScreen({
  buildingName = "Test 1",
  onBackPress,
}: UnitPerformanceScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Dropdown States
  const [sortOption, setSortOption] = useState<SortOption>(
    "High revenue units first",
  );
  const [isSortOpen, setIsSortOpen] = useState(false);

  const [selectedYear, setSelectedYear] = useState<YearOption>("2026");
  const [isYearOpen, setIsYearOpen] = useState(false);

  return (
    <SafeAreaView style={styles.outerContainer}>
      {/* Responsive Shell Wrapper Framework Container (Max 600px Width on Web) */}
      <View style={styles.responsiveWrapper}>
        {/* Top Header App Bar */}
        <View style={styles.appBar}>
          <TouchableOpacity style={styles.iconButton} onPress={onBackPress}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            Unit performance for {buildingName}
          </Text>
        </View>

        {/* Search Bar section */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#8a94a6"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#8a94a6"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Dropdowns Selection Filter Bar Block */}
        <View style={styles.filtersRowContainer}>
          {/* 💡 Sort Selection Field */}
          <View style={styles.dropdownMasterWrapper}>
            <TouchableOpacity
              style={[
                styles.outlinedFormCard,
                isSortOpen && styles.outlinedFormCardActive,
              ]}
              onPress={() => {
                setIsSortOpen(!isSortOpen);
                setIsYearOpen(false); // Close sibling dropdown
              }}
              activeOpacity={0.9}
            >
              <Text style={styles.fieldsetFloatingLabel}>Sort</Text>
              <View style={styles.dropdownInnerContent}>
                <Text style={styles.dropdownTextValue} numberOfLines={1}>
                  {isSortOpen ? "Sort" : sortOption}
                </Text>
                <Ionicons
                  name={isSortOpen ? "caret-up" : "caret-down"}
                  size={14}
                  color="#8a94a6"
                />
              </View>
            </TouchableOpacity>

            {/* Sort Expanded Inline Menu */}
            {isSortOpen && (
              <View style={styles.expandedDropdownContainer}>
                {(
                  [
                    "High revenue units first",
                    "Low revenue units first",
                  ] as SortOption[]
                ).map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.dropdownItemRow,
                      sortOption === option && styles.dropdownItemRowActive,
                    ]}
                    onPress={() => {
                      setSortOption(option);
                      setIsSortOpen(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* 💡 Year Selection Field */}
          <View style={[styles.dropdownMasterWrapper, { flex: 0.55 }]}>
            <TouchableOpacity
              style={[
                styles.outlinedFormCard,
                isYearOpen && styles.outlinedFormCardActive,
              ]}
              onPress={() => {
                setIsYearOpen(!isYearOpen);
                setIsSortOpen(false); // Close sibling dropdown
              }}
              activeOpacity={0.9}
            >
              <Text style={styles.fieldsetFloatingLabel}>Year</Text>
              <View style={styles.dropdownInnerContent}>
                <Text style={styles.dropdownTextValue}>
                  {isYearOpen ? ".." : selectedYear}
                </Text>
                <Ionicons
                  name={isYearOpen ? "caret-up" : "caret-down"}
                  size={14}
                  color="#8a94a6"
                />
              </View>
            </TouchableOpacity>

            {/* Year Expanded Inline Menu */}
            {isYearOpen && (
              <View style={styles.expandedDropdownContainer}>
                {(["2024", "2025", "2026"] as YearOption[]).map((year) => (
                  <TouchableOpacity
                    key={year}
                    style={[
                      styles.dropdownItemRow,
                      selectedYear === year && styles.dropdownItemRowActive,
                    ]}
                    onPress={() => {
                      setSelectedYear(year);
                      setIsYearOpen(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{year}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Empty State Layout Canvas Area */}
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>No results found.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#121820",
  },
  responsiveWrapper: {
    flex: 1,
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
    backgroundColor: "#161c24",
  },
  appBar: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#161c24",
  },
  iconButton: {
    padding: 4,
    ...Platform.select({ web: { cursor: "pointer" } }),
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1c2431",
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 12,
    paddingHorizontal: 16,
    height: 50,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: "#ffffff",
    fontSize: 16,
    ...Platform.select({ web: { outlineStyle: "none" } as any }),
  },
  filtersRowContainer: {
    flexDirection: "row",
    gap: 12,
    marginHorizontal: 16,
    marginTop: 20,
    zIndex: 100, // Guarantees dropdown items sit on top of content
  },
  dropdownMasterWrapper: {
    flex: 1,
    position: "relative",
  },
  outlinedFormCard: {
    borderWidth: 1,
    borderColor: "#343e50",
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 48,
    position: "relative",
    backgroundColor: "#161c24",
    justifyContent: "center",
    ...Platform.select({ web: { cursor: "pointer" } }),
  },
  outlinedFormCardActive: {
    borderColor: "#4fa3f7",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  fieldsetFloatingLabel: {
    position: "absolute",
    top: -9,
    left: 10,
    backgroundColor: "#161c24",
    paddingHorizontal: 6,
    color: "#8a94a6",
    fontSize: 11,
    fontWeight: "500",
  },
  dropdownInnerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownTextValue: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "500",
    flex: 1,
  },
  expandedDropdownContainer: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#1c2431",
    borderWidth: 1,
    borderColor: "#343e50",
    borderTopWidth: 0,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    overflow: "hidden",
    ...Platform.select({
      web: { boxShadow: "0px 8px 16px rgba(0,0,0,0.3)" },
    }),
  },
  dropdownItemRow: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#242f42",
  },
  dropdownItemRowActive: {
    backgroundColor: "#20293d",
  },
  dropdownItemText: {
    color: "#4fa3f7",
    fontSize: 14.5,
    fontWeight: "500",
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 80,
  },
  emptyStateText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "400",
    opacity: 0.9,
  },
});
