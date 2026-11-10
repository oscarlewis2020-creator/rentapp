import AnalyticsRevenueView from "@/components/ui/landlord/extra/analytics/AnalyticsRevenueView";
import AnalyticsUnitsView from "@/components/ui/landlord/extra/analytics/AnalyticsUnitsView";
import CutoffDateModal from "@/components/ui/landlord/extra/analytics/CutoffDateModal";
import { BuildingSelector } from "@/components/ui/landlord/units/BuildingSelector"; // 💡 Imported your pre-built custom Selector component
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LandlordMonthlyPerformanceDetails } from "./LandlordMonthlyPerfomanceDetailsScreen";

interface LandlordAnalyticsScreenProps {
  buildingName: string;
  onBackPress: () => void;
  onViewUnitPerformancePress: () => void;
  onBuildingFieldPress: () => void; // 💡 Added prop callback handle to map global modal trigger up
}

const MONTHS_LIST = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function LandlordAnalytics({
  buildingName,
  onBackPress,
  onViewUnitPerformancePress,
  onBuildingFieldPress,
}: LandlordAnalyticsScreenProps) {
  const [activeTab, setActiveTab] = useState<"revenue" | "units">("revenue");
  const [isCutoffModalOpen, setIsCutoffModalOpen] = useState(false);
  const [activeCutoffDay, setActiveCutoffDay] = useState("10");
  const [selectedPerformanceMonth, setSelectedPerformanceMonth] = useState<
    string | null
  >(null);

  // Year Dropdown Local States
  const [selectedYear, setSelectedYear] = useState("2026");
  const [isYearOpen, setIsYearOpen] = useState(false);

  if (selectedPerformanceMonth) {
    return (
      <LandlordMonthlyPerformanceDetails
        monthName={selectedPerformanceMonth}
        onBackPress={() => setSelectedPerformanceMonth(null)}
      />
    );
  }

  return (
    <SafeAreaView style={styles.outerContainer}>
      <View style={styles.responsiveWrapper}>
        {/* Top App Bar Header
        <View style={styles.appBar}>
          <TouchableOpacity style={styles.iconButton} onPress={onBackPress}>
            <Ionicons name="menu" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Analytics</Text>
          <View style={styles.rightHeader}>
            <Ionicons
              name="notifications"
              size={24}
              color="#fff"
              style={{ marginRight: 14 }}
            />
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>L</Text>
            </View>
          </View>
        </View> */}

        <ScrollView
          style={styles.mainScrollView}
          contentContainerStyle={styles.scrollContentLayout}
          showsVerticalScrollIndicator={Platform.OS === "web"}
        >
          {/* 💡 REFURBISHED FILTERS ROWET: Integrates your BuildingSelector perfectly */}
          <View style={styles.filtersContainerRow}>
            <View style={styles.buildingSelectorWrapper}>
              <BuildingSelector
                label="Select a Building"
                selectedValue={buildingName}
                onPress={onBuildingFieldPress} // 💡 Wires layout interaction back to parent modal pipeline
              />
            </View>

            {/* Year Dropdown Input Block */}
            <View style={styles.yearDropdownWrapper}>
              <View style={styles.yearInternalPositioningContainer}>
                <Text style={styles.yearFloatingLabel}>Year</Text>
                <TouchableOpacity
                  style={[
                    styles.yearDropdownTrigger,
                    isYearOpen && styles.yearDropdownTriggerActive,
                  ]}
                  onPress={() => setIsYearOpen(!isYearOpen)}
                  activeOpacity={0.9}
                >
                  <Text style={styles.yearTextValue}>
                    {isYearOpen ? ".." : selectedYear}
                  </Text>
                  <Ionicons
                    name={isYearOpen ? "chevron-up" : "chevron-down"}
                    size={18}
                    color="#9EA5B1"
                  />
                </TouchableOpacity>

                {/* Floating Year Popover List Matrix */}
                {isYearOpen && (
                  <View style={styles.expandedYearDropdownContainer}>
                    {["2024", "2025", "2026"].map((year) => (
                      <TouchableOpacity
                        key={year}
                        style={[
                          styles.dropdownYearItemRow,
                          selectedYear === year &&
                            styles.dropdownYearItemRowActive,
                        ]}
                        onPress={() => {
                          setSelectedYear(year);
                          setIsYearOpen(false);
                        }}
                      >
                        <Text style={styles.dropdownYearItemText}>{year}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>
          </View>

          <Text style={styles.sectionHeaderTitle}>
            Comprehensive data analytics
          </Text>
          <Text style={styles.sectionSubText}>
            Note: The data shown is dynamic and may change based on updates or
            deletions in user records.
          </Text>

          {/* Segmented View Mode Tabs */}
          <View style={styles.segmentedTabsContainer}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === "revenue" && styles.tabButtonActive,
              ]}
              onPress={() => setActiveTab("revenue")}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  activeTab === "revenue" && styles.tabButtonTextActive,
                ]}
              >
                Revenue
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === "units" && styles.tabButtonActive,
              ]}
              onPress={() => setActiveTab("units")}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  activeTab === "units" && styles.tabButtonTextActive,
                ]}
              >
                Units
              </Text>
            </TouchableOpacity>
          </View>

          {/* Lean Sub-View Panels Router */}
          {activeTab === "revenue" ? (
            <AnalyticsRevenueView
              monthsList={MONTHS_LIST}
              onChangeCutoffPress={() => setIsCutoffModalOpen(true)}
              onMonthlyPerformancePress={(month) =>
                setSelectedPerformanceMonth(month)
              }
            />
          ) : (
            <AnalyticsUnitsView
              monthsList={MONTHS_LIST}
              onViewDetailedPerformancePress={onViewUnitPerformancePress}
            />
          )}
        </ScrollView>
      </View>

      <CutoffDateModal
        isVisible={isCutoffModalOpen}
        currentDay={activeCutoffDay}
        onClose={() => setIsCutoffModalOpen(false)}
        onSubmit={(newDay) => {
          setActiveCutoffDay(newDay);
          setIsCutoffModalOpen(false);
        }}
      />
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
    zIndex: 10,
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 16,
  },
  rightHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  iconButton: {
    padding: 6,
    ...Platform.select({ web: { cursor: "pointer" } }),
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#23783c",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#ffffff", fontWeight: "bold", fontSize: 14 },
  mainScrollView: { flex: 1 },

  /* 💡 FIXED ADAPTIVE FILTERS ROW MATRIX GRID CONFIGURATION */
  scrollContentLayout: { paddingBottom: 40 },
  filtersContainerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingRight: 16, // Offsets the left padding inside your custom component box cleanly
    zIndex: 200,
    marginTop: 4,
    marginBottom: 12,
  },
  buildingSelectorWrapper: {
    flex: 1.8,
    paddingHorizontal: 0,
    marginRight: -4, // Ties the gaps together tightly
  },
  yearDropdownWrapper: {
    flex: 1,
    paddingTop: 12, // Perfectly balances your component box vertical heights metrics
  },
  yearInternalPositioningContainer: {
    position: "relative",
    width: "100%",
  },
  yearFloatingLabel: {
    position: "absolute",
    left: 12,
    top: -8,
    backgroundColor: "#161c24", // Blends with screen background palette
    paddingHorizontal: 6,
    fontSize: 12,
    color: "#9EA5B1",
    zIndex: 10,
  },
  yearDropdownTrigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#2C3545",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50, // Matches your custom component vertical box baseline height bounds
    backgroundColor: "#1A2232",
    ...Platform.select({ web: { cursor: "pointer" } }),
  },
  yearDropdownTriggerActive: {
    borderColor: "#4fa3f7",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  yearTextValue: { color: "#FFF", fontSize: 16, fontWeight: "500" },

  /* Floating Selection Overlay Box View Style Parameters */
  expandedYearDropdownContainer: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#1c2431",
    borderWidth: 1,
    borderColor: "#2C3545",
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    overflow: "hidden",
    ...Platform.select({
      web: { boxShadow: "0px 8px 16px rgba(0,0,0,0.4)" },
    }),
  },
  dropdownYearItemRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#242f42",
  },
  dropdownYearItemRowActive: { backgroundColor: "#20293d" },
  dropdownYearItemText: { color: "#4fa3f7", fontSize: 15, fontWeight: "500" },

  sectionHeaderTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 18,
    marginBottom: 4,
    paddingHorizontal: 16,
  },
  sectionSubText: {
    color: "#8a94a6",
    fontSize: 12.5,
    lineHeight: 18,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  segmentedTabsContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#343e50",
    borderRadius: 8,
    height: 46,
    overflow: "hidden",
    backgroundColor: "#161c24",
    marginHorizontal: 16,
    marginBottom: 24,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    ...Platform.select({ web: { cursor: "pointer" } }),
  },
  tabButtonActive: { backgroundColor: "#2d384a" },
  tabButtonText: { color: "#8a94a6", fontSize: 14, fontWeight: "500" },
  tabButtonTextActive: { color: "#ffffff", fontWeight: "600" },
});
