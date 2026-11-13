import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal as PaperModal, Portal } from "react-native-paper";

export interface UnitsFilterState {
  unitLabel: string;
  statuses: string[];
  unitTypes: string[];
}

interface UnitsFilterModalProps {
  isVisible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: UnitsFilterState) => void;
  availableLabels?: string[];
}

const UNIT_STATUS_OPTIONS = ["Occupied", "Vacant"];
const UNIT_TYPE_OPTIONS = [
  "Apartment",
  "Single Family",
  "Condominium",
  "Bedsitter",
  "Single Room",
  "Shop",
];

export default function UnitsFilterModal({
  isVisible,
  onClose,
  onApplyFilters,
  availableLabels = ["Room1", "Room2", "Room3"],
}: UnitsFilterModalProps) {
  const [selectedLabel, setSelectedLabel] = useState<string>("");
  const [isLabelDropdownOpen, setIsLabelDropdownOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const toggleItem = (
    value: string,
    currentList: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setter(
      currentList.includes(value)
        ? currentList.filter((item) => item !== value)
        : [...currentList, value],
    );
  };

  const handleClear = () => {
    setSelectedLabel("");
    setSelectedStatuses([]);
    setSelectedTypes([]);
    setIsLabelDropdownOpen(false);
  };

  const handleApply = () => {
    onApplyFilters({
      unitLabel: selectedLabel,
      statuses: selectedStatuses,
      unitTypes: selectedTypes,
    });
    onClose();
  };

  return (
    <Portal>
      <PaperModal
        visible={isVisible}
        onDismiss={onClose}
        contentContainerStyle={styles.paperModalOverride}
      >
        <View style={styles.backdropScrim}>
          <View style={styles.sheetContainer}>
            {/* Top Sheet Grabber & Close Button */}
            <View style={styles.grabber} />
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#ffffff" />
            </TouchableOpacity>
            <View style={styles.headerDivider} />

            {/* Scrollable Filter Sections */}
            <ScrollView
              style={styles.scrollArea}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={Platform.OS === "web"}
            >
              {/* Section 1: Unit Label */}
              <View style={styles.sectionCard}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionHeaderText}>Unit Label</Text>
                </View>
                <View style={styles.sectionBody}>
                  <TouchableOpacity
                    style={styles.dropdownTrigger}
                    onPress={() => setIsLabelDropdownOpen(!isLabelDropdownOpen)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.dropdownLeft}>
                      <Ionicons
                        name="business"
                        size={20}
                        color="#86d3ff"
                        style={{ marginRight: 12 }}
                      />
                      <Text style={styles.dropdownText}>
                        {selectedLabel || "Unit label"}
                      </Text>
                    </View>
                    <Ionicons
                      name={isLabelDropdownOpen ? "chevron-up" : "chevron-down"}
                      size={20}
                      color="#cbd5e1"
                    />
                  </TouchableOpacity>

                  {isLabelDropdownOpen && (
                    <View style={styles.dropdownMenu}>
                      <TouchableOpacity
                        style={styles.dropdownOption}
                        onPress={() => {
                          setSelectedLabel("");
                          setIsLabelDropdownOpen(false);
                        }}
                      >
                        <Text style={styles.dropdownOptionMuted}>
                          All units
                        </Text>
                      </TouchableOpacity>
                      {availableLabels.map((label) => (
                        <TouchableOpacity
                          key={label}
                          style={styles.dropdownOption}
                          onPress={() => {
                            setSelectedLabel(label);
                            setIsLabelDropdownOpen(false);
                          }}
                        >
                          <Text style={styles.dropdownOptionText}>{label}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              </View>

              {/* Section 2: Unit status */}
              <View style={styles.sectionCard}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionHeaderText}>Unit status</Text>
                </View>
                <View style={styles.sectionBody}>
                  {UNIT_STATUS_OPTIONS.map((status) => {
                    const isChecked = selectedStatuses.includes(status);
                    return (
                      <TouchableOpacity
                        key={status}
                        style={styles.checkboxRow}
                        onPress={() =>
                          toggleItem(
                            status,
                            selectedStatuses,
                            setSelectedStatuses,
                          )
                        }
                        activeOpacity={0.7}
                      >
                        <Ionicons
                          name={isChecked ? "checkbox" : "square-outline"}
                          size={22}
                          color={isChecked ? "#86d3ff" : "#cbd5e1"}
                        />
                        <Text style={styles.checkboxLabel}>{status}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* Section 3: Unit types */}
              <View style={styles.sectionCard}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionHeaderText}>Unit types</Text>
                </View>
                <View style={styles.sectionBody}>
                  {UNIT_TYPE_OPTIONS.map((type) => {
                    const isChecked = selectedTypes.includes(type);
                    return (
                      <TouchableOpacity
                        key={type}
                        style={styles.checkboxRow}
                        onPress={() =>
                          toggleItem(type, selectedTypes, setSelectedTypes)
                        }
                        activeOpacity={0.7}
                      >
                        <Ionicons
                          name={isChecked ? "checkbox" : "square-outline"}
                          size={22}
                          color={isChecked ? "#86d3ff" : "#cbd5e1"}
                        />
                        <Text style={styles.checkboxLabel}>{type}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </ScrollView>

            {/* Persistent Bottom Action Bar */}
            <View style={styles.footerBar}>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={handleClear}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="close"
                  size={16}
                  color="#86d3ff"
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.clearButtonText}>Clear filters</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.applyButton}
                onPress={handleApply}
                activeOpacity={0.85}
              >
                <Text style={styles.applyButtonText}>Apply filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </PaperModal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  paperModalOverride: {
    margin: 0,
    padding: 0,
    flex: 1,
    justifyContent: "flex-end",
  },
  backdropScrim: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    justifyContent: "flex-end",
  },
  sheetContainer: {
    width: "100%",
    maxWidth: 600,
    maxHeight: "88%",
    backgroundColor: "#02435e",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    alignSelf: "center",
    paddingTop: 12,
    position: "relative",
  },
  grabber: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#122c38",
    alignSelf: "center",
    marginBottom: 8,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginRight: 18,
    padding: 4,
    ...Platform.select({ web: { cursor: "pointer" } }),
  },
  headerDivider: {
    height: 1,
    backgroundColor: "#195a76",
    marginTop: 8,
    marginHorizontal: 14,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 14,
    gap: 14,
  },
  sectionCard: {
    backgroundColor: "#161c24",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#252f41",
    overflow: "hidden",
  },
  sectionHeader: {
    backgroundColor: "#1e2736",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#252f41",
  },
  sectionHeaderText: {
    color: "#ffffff",
    fontSize: 15.5,
    fontWeight: "600",
  },
  sectionBody: {
    padding: 14,
  },
  dropdownTrigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#42526e",
    borderRadius: 8,
    paddingHorizontal: 14,
    height: 50,
    backgroundColor: "#161c24",
    ...Platform.select({ web: { cursor: "pointer" } }),
  },
  dropdownLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownText: {
    color: "#e2e8f0",
    fontSize: 15,
  },
  dropdownMenu: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: "#343e50",
    borderRadius: 8,
    backgroundColor: "#1c2431",
    overflow: "hidden",
  },
  dropdownOption: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#252f41",
  },
  dropdownOptionText: {
    color: "#ffffff",
    fontSize: 14.5,
  },
  dropdownOptionMuted: {
    color: "#8a94a6",
    fontSize: 14.5,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 16,
    ...Platform.select({ web: { cursor: "pointer" } }),
  },
  checkboxLabel: {
    color: "#e2e8f0",
    fontSize: 15.5,
  },
  footerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 26 : 16,
    backgroundColor: "#02435e",
    borderTopWidth: 1,
    borderTopColor: "#195a76",
    gap: 16,
  },
  clearButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: "#527382",
    ...Platform.select({ web: { cursor: "pointer" } }),
  },
  clearButtonText: {
    color: "#86d3ff",
    fontSize: 15,
    fontWeight: "500",
  },
  applyButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 46,
    borderRadius: 23,
    backgroundColor: "#86d3ff",
    ...Platform.select({ web: { cursor: "pointer" } }),
  },
  applyButtonText: {
    color: "#062838",
    fontSize: 15,
    fontWeight: "600",
  },
});
