// components/ui/landlord/wallets/TransactionFiltersModal.tsx
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal, Portal } from "react-native-paper";

interface TransactionFiltersModalProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
}

interface FilterState {
  preset: string;
  minAmount: string;
  maxAmount: string;
}

const PRESETS = [
  { id: "last-year", label: "last year" },
  { id: "last-6-months", label: "last 6 months" },
  { id: "last-3-months", label: "last 3 months" },
  { id: "last-30-days", label: "last 30 days" },
  { id: "last-7-days", label: "last 7 days" },
  { id: "yesterday", label: "yesterday" },
  { id: "today", label: "today" },
];

export function TransactionFiltersModal({
  visible,
  onClose,
  onApplyFilters,
}: TransactionFiltersModalProps) {
  const [activePreset, setActivePreset] = useState("last-year");
  const [minAmount, setMinAmount] = useState("0");
  const [maxAmount, setMaxAmount] = useState("50000");

  const handleClearFilters = () => {
    setActivePreset("");
    setMinAmount("0");
    setMaxAmount("50000");
  };

  const handleApply = () => {
    onApplyFilters({ preset: activePreset, minAmount, maxAmount });
    onClose();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        dismissable={true}
        style={styles.modalOverlay}
        contentContainerStyle={styles.sheetContainer}
      >
        {/* Top Handle Decor Accent */}
        <View style={styles.topHandleBar} />

        {/* Close Button Header Row */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={onClose}
            style={styles.closeButton}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollList}
          showsVerticalScrollIndicator={false}
        >
          {/* ================= DURATION CARD SECTION ================= */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Duration</Text>

            {/* Range Date Input Read-Only Field */}
            <View style={styles.dateRangePickerRow}>
              <Text style={styles.dateRangeText}>
                From Jan-01-2025 to Nov-03-2026
              </Text>
              <TouchableOpacity
                style={styles.calendarSquareBtn}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons
                  name="calendar-month-outline"
                  size={22}
                  color="#85C1E9"
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.subLabelText}>Time presets :</Text>

            {/* Time Presets Wrap Container Feed */}
            <View style={styles.pillsContainer}>
              {PRESETS.map((preset) => {
                const isCurrent = preset.id === activePreset;
                return (
                  <TouchableOpacity
                    key={preset.id}
                    style={[
                      styles.presetPill,
                      isCurrent && styles.activePresetPill,
                    ]}
                    onPress={() => setActivePreset(preset.id)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.pillText}>{preset.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* ================= AMOUNT CARD SECTION ================= */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Amount</Text>

            <View style={styles.inputsRow}>
              {/* Min Input Frame */}
              <View style={styles.inputCellWrapper}>
                <Text style={styles.floatingFieldLabel}>Min</Text>
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  value={minAmount}
                  onChangeText={setMinAmount}
                  {...Platform.select({ web: { outlineStyle: "none" } })}
                />
              </View>

              {/* Max Input Frame */}
              <View style={styles.inputCellWrapper}>
                <Text style={styles.floatingFieldLabel}>Max</Text>
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  value={maxAmount}
                  onChangeText={setMaxAmount}
                  {...Platform.select({ web: { outlineStyle: "none" } })}
                />
              </View>
            </View>
          </View>

          {/* ================= BOTTOM ACTION CONTROL BUTTONS ================= */}
          <View style={styles.actionButtonsRow}>
            <TouchableOpacity
              style={styles.clearFiltersBtn}
              onPress={handleClearFilters}
              activeOpacity={0.7}
            >
              <Ionicons
                name="close"
                size={18}
                color="#FFF"
                style={styles.btnIcon}
              />
              <Text style={styles.clearBtnText}>Clear filters</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.applyFiltersBtn}
              onPress={handleApply}
              activeOpacity={0.8}
            >
              <Text style={styles.applyBtnText}>Apply filters</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  sheetContainer: {
    backgroundColor: "#004B6E", // True deep blue base color matching image exactly
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 34 : 20,
    maxHeight: "90%",
  },
  topHandleBar: {
    width: 44,
    height: 5,
    backgroundColor: "#1C2D37",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 8,
    opacity: 0.6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  closeButton: {
    padding: 4,
  },
  scrollList: {
    paddingHorizontal: 16,
    marginTop: 4,
  },
  sectionCard: {
    backgroundColor: "#16222A", // Dark inset backdrop card surfaces matching your display
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.03)",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFF",
    marginBottom: 18,
  },
  dateRangePickerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#3E4C5E",
    borderRadius: 8,
    paddingLeft: 14,
    paddingRight: 6,
    paddingVertical: 6,
    marginBottom: 16,
  },
  dateRangeText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "400",
  },
  calendarSquareBtn: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: "#202E38",
    alignItems: "center",
    justifyContent: "center",
  },
  subLabelText: {
    color: "#9EA5B1",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 14,
  },
  pillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  presetPill: {
    borderWidth: 1,
    borderColor: "#3A4654",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "transparent",
  },
  activePresetPill: {
    borderColor: "#85C1E9",
    backgroundColor: "rgba(133, 193, 227, 0.05)",
  },
  pillText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "400",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginTop: 4,
  },
  inputCellWrapper: {
    flex: 1,
    position: "relative",
  },
  floatingFieldLabel: {
    position: "absolute",
    left: 12,
    top: -9,
    backgroundColor: "#16222A",
    paddingHorizontal: 6,
    fontSize: 12,
    color: "#9EA5B1",
    zIndex: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#3E4C5E",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
  },
  actionButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 16,
    gap: 16,
  },
  clearFiltersBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#3E4C5E",
    borderRadius: 24,
    paddingVertical: 14,
    gap: 6,
  },
  btnIcon: {
    marginTop: 1,
  },
  clearBtnText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "600",
  },
  applyFiltersBtn: {
    flex: 1,
    backgroundColor: "#85C1E9", // Vibrant active background pill matching screenshot callout
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  applyBtnText: {
    color: "#121824",
    fontSize: 15,
    fontWeight: "700",
  },
});
