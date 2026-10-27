import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface TabOption {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface SegmentTabsProps {
  options: TabOption[];
  activeTabId: string;
  onSelectTab: (id: string) => void;
}

export function SegmentTabs({
  options,
  activeTabId,
  onSelectTab,
}: SegmentTabsProps) {
  return (
    <View style={styles.tabSegmentsRow}>
      {options.map((tab) => {
        const isActive = tab.id === activeTabId;
        return (
          <TouchableOpacity
            key={tab.id}
            style={[styles.segmentTab, isActive && styles.activeSegmentTab]}
            onPress={() => onSelectTab(tab.id)}
          >
            {tab.icon}
            <Text
              style={[
                styles.segmentTabText,
                !isActive && styles.inactiveSegmentText,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabSegmentsRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginVertical: 16,
    gap: 8,
  },
  segmentTab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1A2232",
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2C3545",
  },
  activeSegmentTab: { backgroundColor: "#3A506B", borderColor: "#4A6283" },
  segmentTabText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 4,
  },
  inactiveSegmentText: { color: "#9EA5B1" },
});
