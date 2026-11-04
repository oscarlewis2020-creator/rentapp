// components/roles/sales/SalesHome.tsx
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function SalesHome() {
  // Automatically updates the display with the target formatted date string shown in your layout
  const [selectedDate, setSelectedBuilding] = useState("Oct-30-2026");

  return (
    <SafeAreaView style={styles.container}>
      {/* ================= 1. CALENDAR DATE SELECTOR ROW ================= */}
      <View style={styles.calendarSelectorBar}>
        <View style={styles.dateLabelGroup}>
          <Text style={styles.topSubLabel}>Buildings registered on:</Text>
          <Text style={styles.activeDateText}>{selectedDate}</Text>
        </View>

        <TouchableOpacity
          style={styles.calendarIconButton}
          activeOpacity={0.75}
        >
          <MaterialCommunityIcons
            name="calendar-month-outline"
            size={24}
            color="#85C1E9"
          />
        </TouchableOpacity>
      </View>

      {/* ================= 2. EMPTY CORE STREAM CONTENT WORKSPACE ================= */}
      <View style={styles.emptyContentWorkspace}>
        <Text style={styles.emptyPlaceholderText}>
          No data found for the selected period
        </Text>
      </View>

      {/* ================= 3. LOWER STICKY OVERLAY CONTROLS TRACK BAR ================= */}
      <View style={styles.bottomOverlayContainer}>
        {/* Left Filter Pill Button */}
        <TouchableOpacity
          style={styles.unverifiedPillButton}
          activeOpacity={0.8}
        >
          <Ionicons
            name="home"
            size={16}
            color="#9EA5B1"
            style={styles.pillIcon}
          />
          <Text style={styles.pillText}>Unverified</Text>
        </TouchableOpacity>

        {/* Right Floating Action Button (FAB) Trigger */}
        <TouchableOpacity
          style={styles.floatingActionButton}
          activeOpacity={0.85}
        >
          <Ionicons name="add" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#19222B", // True matte deep slate background matching image
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%", // Responsive desktop centering caps
    alignSelf: "center",
    position: "relative",
  },
  calendarSelectorBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 16,
  },
  dateLabelGroup: {
    flexDirection: "column",
    gap: 4,
  },
  topSubLabel: {
    color: "#6C7A8C", // Muted secondary tracking text hex color match
    fontSize: 14,
    fontWeight: "500",
  },
  activeDateText: {
    color: "#85C1E9", // Sky blue date highlight text string tone match
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  calendarIconButton: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: "#202E38", // Inset calendar container square card background color
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  emptyContentWorkspace: {
    flex: 0.75, // Centers the callout label perfectly down the middle column axis
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  emptyPlaceholderText: {
    color: "#E5E9F0",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    opacity: 0.9,
    letterSpacing: 0.2,
  },
  bottomOverlayContainer: {
    position: "absolute",
    bottom: 24,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    pointerEvents: "box-none", // Fixes touch handling fall-through on web browser interfaces
  },
  unverifiedPillButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A3644", // Semi-translucent grayish blue selection pill highlight color
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#3E4C5E",
    ...Platform.select({
      web: { cursor: "pointer", userSelect: "none" },
    }),
  },
  pillIcon: {
    marginRight: 8,
    marginTop: -2,
  },
  pillText: {
    color: "#E5E9F0",
    fontSize: 15,
    fontWeight: "600",
  },
  floatingActionButton: {
    backgroundColor: "#004B63", // Deep turquoise blue FAB trigger background color match
    width: 56,
    height: 56,
    borderRadius: 14, // Rounded square geometry curve matching your layout image asset perfectly
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
        cursor: "pointer",
        userSelect: "none",
      },
    }),
  },
});
