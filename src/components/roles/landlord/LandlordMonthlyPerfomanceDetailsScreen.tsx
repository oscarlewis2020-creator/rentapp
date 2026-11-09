import AnalyticsFilterModal from "@/components/ui/landlord/extra/analytics/AnalyticsFilterModal";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface MonthlyPerformanceDetailsScreenProps {
  monthName: string;
  onBackPress: () => void;
}

export function LandlordMonthlyPerformanceDetails({
  monthName = "Aug",
  onBackPress,
}: MonthlyPerformanceDetailsScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [displayFilterText, setDisplayFilterText] = useState("occupied units");

  return (
    <SafeAreaView style={styles.outerContainer}>
      <View style={styles.responsiveWrapper} pointerEvents="box-none">
        {/* Top Header App Bar */}
        <View style={styles.appBar}>
          <TouchableOpacity style={styles.iconButton} onPress={onBackPress}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{monthName}</Text>
        </View>

        {/* Input Bar Row Matrix with Filter Trigger */}
        <View style={styles.searchRowBar}>
          <View style={styles.searchInputContainerField}>
            <Ionicons
              name="search"
              size={20}
              color="#8a94a6"
              style={{ marginRight: 12 }}
            />
            <TextInput
              placeholder="Search unit by label"
              placeholderTextColor="#8a94a6"
              style={styles.textInputStyle}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <TouchableOpacity
            style={styles.filterIconButton}
            onPress={() => setIsFilterModalOpen(true)}
          >
            <Ionicons name="options-outline" size={22} color="#4fa3f7" />
          </TouchableOpacity>
        </View>

        {/* Dynamic Filter Status Hint Labels Banner */}
        <Text style={styles.filterMetaHintTextText}>
          Showing only{" "}
          <Text style={styles.underlinedTextHighlight}>
            {displayFilterText}
          </Text>
          .{" "}
          <Text
            style={styles.changeActionLinkText}
            onPress={() => setIsFilterModalOpen(true)}
          >
            Change
          </Text>
        </Text>
        <Text style={styles.foundEntriesCountText}>Found 0 entries .</Text>

        {/* Central Core Empty State Layout View */}
        <View style={styles.emptyCenterWrapper}>
          <Text style={styles.emptyStateMessageText}>No entries found.</Text>
        </View>

        {/* Segmented Filter Settings Bottom Sheet Overlay Modal */}
        <AnalyticsFilterModal
          isVisible={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          onApplyFilters={(selectedUnits) => {
            setDisplayFilterText(selectedUnits.join(" & ") || "all units");
            setIsFilterModalOpen(false);
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outerContainer: { flex: 1, backgroundColor: "#121820" },
  responsiveWrapper: {
    flex: 1,
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
    backgroundColor: "#161c24",
    position: "relative",
    ...Platform.select({ web: { boxShadow: "0px 0px 20px rgba(0,0,0,0.3)" } }),
  },
  appBar: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#1c2431",
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
  searchRowBar: {
    flexDirection: "row",
    gap: 12,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
  },
  searchInputContainerField: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e2736",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
  },
  textInputStyle: {
    flex: 1,
    color: "#ffffff",
    fontSize: 15,
    ...Platform.select({ web: { outlineStyle: "none" } as any }),
  },
  filterIconButton: {
    width: 50,
    height: 50,
    backgroundColor: "#1e2736",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({ web: { cursor: "pointer" } }),
  },
  filterMetaHintTextText: {
    color: "#ffffff",
    fontSize: 14.5,
    paddingHorizontal: 18,
    marginTop: 8,
    lineHeight: 20,
  },
  underlinedTextHighlight: { color: "#4fa3f7", fontWeight: "500" },
  changeActionLinkText: {
    color: "#4fa3f7",
    textDecorationLine: "underline",
    fontWeight: "600",
    ...Platform.select({ web: { cursor: "pointer" } }),
  },
  foundEntriesCountText: {
    color: "#8a94a6",
    fontSize: 13.5,
    paddingHorizontal: 18,
    marginTop: 6,
  },
  emptyCenterWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 60,
  },
  emptyStateMessageText: { color: "#ffffff", fontSize: 16, fontWeight: "500" },
});
