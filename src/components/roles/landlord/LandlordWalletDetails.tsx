// components/roles/landlord/LandlordWalletDetails.tsx
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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
import { useUserRole } from "../../../app/_layout";

import { TransactionFiltersModal } from "../../ui/landlord/extra/wallets/TransactionFiltersModal";
import { TransactionSortModal } from "../../ui/landlord/extra/wallets/TransactionSortModal";
import { UnitsFilterPickerModal } from "../../ui/landlord/extra/wallets/UnitFilterPickerModal";

interface LandlordWalletDetailsProps {
  onBackPress?: () => void;
  onTransactionsPress?: () => void;
  onFilterPress?: () => void;
  onSortPress?: () => void;
}

export function LandlordWalletDetails({
  onTransactionsPress,
  onFilterPress,
  onSortPress,
}: LandlordWalletDetailsProps) {
  const { setIsDrawerOpen } = useUserRole();
  const [selectedUnits, setSelectedUnits] = useState<string[]>([]);
  const [unitsPickerOpen, setUnitsPickerOpen] = useState(false);
  const [filtersModalOpen, setFiltersModalOpen] = useState(false);
  const [sortModalOpen, setSortModalOpen] = useState(false);
  const [activeSortKey, setActiveSortKey] = useState("newest");

  // Compute text rendering string conditionally depending on selection array length
  const dropdownValueText =
    selectedUnits.length > 0 ? selectedUnits.join(" ,") : "Select a unit";

  return (
    <SafeAreaView style={styles.container}>
      {/* ================= 1. UPPER APPBAR ROW NAVIGATION ================= */}
      <View style={styles.appBar}>
        <View style={styles.appBarLeft}>
          <TouchableOpacity
            onPress={() => setIsDrawerOpen(true)}
            style={styles.menuButton}
          >
            <Ionicons name="menu" size={28} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.appBarTitle}>Test 1 wallet details</Text>
        </View>
        <View style={styles.appBarRight}>
          <TouchableOpacity style={styles.appBarIconButton}>
            <Ionicons name="notifications" size={24} color="#FFF" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>L</Text>
            <View style={styles.onlineIndicatorDot} />
          </View>
        </View>
      </View>

      {/* ================= 2. CORE WORKSPACE AREA CONTROLLER ================= */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Wallet Main Informational Status Block Card */}
        <View style={styles.walletDetailsCard}>
          <Text style={styles.cardHeaderTitle}>Manual receipt wallet</Text>

          {/* Data Row A: Total Balance Valuation */}
          <View style={styles.dataDetailRow}>
            <View style={styles.dataLeftGroup}>
              <MaterialCommunityIcons
                name="scale-balance"
                size={18}
                color="#85C1E9"
              />
              <Text style={styles.dataLabelText}>Total amount</Text>
            </View>
            <Text style={styles.dataValueText}>KES 0.00</Text>
          </View>

          {/* Data Row B: Virtual Account Mapping Numbers */}
          <View style={[styles.dataDetailRow, styles.noBorderRow]}>
            <View style={styles.dataLeftGroup}>
              <MaterialCommunityIcons
                name="bank-outline"
                size={18}
                color="#85C1E9"
              />
              <Text style={styles.dataLabelText}>Account no.</Text>
            </View>
            <Text style={styles.dataValueText}>N/A</Text>
          </View>
        </View>

        {/* Interactive Full-Width Transactions Log Button Row */}
        <TouchableOpacity
          style={styles.transactionsTriggerButton}
          activeOpacity={0.8}
          onPress={
            onTransactionsPress ||
            (() => console.log("View transactions details"))
          }
        >
          <Ionicons
            name="eye-outline"
            size={18}
            color="#FFF"
            style={styles.btnIcon}
          />
          <Text style={styles.transactionsButtonText}>Transactions</Text>
        </TouchableOpacity>

        {/* Custom Inset Floating Label Unit Selection Dropdown Block Trigger */}
        <View style={styles.dropdownInputContainer}>
          <TouchableOpacity
            style={styles.dropdownTriggerFrame}
            activeOpacity={0.8}
            onPress={() => setUnitsPickerOpen(true)}
          >
            <View style={styles.dropdownLeftGroup}>
              <Ionicons
                name="bed-outline"
                size={22}
                color="#85C1E9"
                style={styles.fieldIcon}
              />
              <Text
                style={[
                  styles.dropdownText,
                  selectedUnits.length > 0 && { color: "#FFF" }, // 💡 Text shifts to high contrast white when units are selected
                ]}
                numberOfLines={1}
              >
                {dropdownValueText}
              </Text>
            </View>
            <Ionicons name="chevron-down" size={16} color="#9EA5B1" />
          </TouchableOpacity>
        </View>

        {/* Centered Empty Ledger State Workspace Placeholder Callout */}
        <View style={styles.emptyPlaceholderWrapper}>
          <Text style={styles.emptyPlaceholderText}>
            No transactions found.
          </Text>
        </View>
      </ScrollView>

      {/* ================= 3. LOWER STICKY OVERLAY CONTROLS PILL BAR ================= */}
      <View style={styles.bottomOverlayBarContainer}>
        <View style={styles.filterSortPillContainer}>
          {/* Left Split Action: Filter Trigger */}
          <TouchableOpacity
            style={styles.pillActionBtn}
            onPress={() => setFiltersModalOpen(true)}
            activeOpacity={0.7}
          >
            <Ionicons name="funnel-outline" size={16} color="#FFF" />
            <Text style={styles.pillBtnText}>Filter</Text>
          </TouchableOpacity>

          <View style={styles.pillVerticalSeparatorLine} />

          {/* Right Split Action: Sort Selector Trigger */}
          <TouchableOpacity
            style={styles.pillActionBtn}
            onPress={() => setSortModalOpen(true)}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name="swap-vertical"
              size={18}
              color="#FFF"
            />
            <Text style={styles.pillBtnText}>Sort</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 💡 INJECT THE LIVE PORTAL UNITS SHEET OVERLAY COMPONENT HERE */}
      <UnitsFilterPickerModal
        visible={unitsPickerOpen}
        onClose={() => setUnitsPickerOpen(false)}
        selectedUnits={selectedUnits}
        onUnitsChange={(updatedList) => setSelectedUnits(updatedList)}
      />

      {/* 💡 INJECT THE TRANSACTION FILTERS BOTTOM SHEET MODAL LAYER HERE */}
      <TransactionFiltersModal
        visible={filtersModalOpen}
        onClose={() => setFiltersModalOpen(false)}
        onApplyFilters={(selectedCriteria) => {
          console.log(
            `Applying filters parameter matrices -> Presets: ${selectedCriteria.preset}, Range: ${selectedCriteria.minAmount} - ${selectedCriteria.maxAmount}`,
          );
        }}
      />

      {/* 💡 INJECT THE TRANSACTION SORT SHEET MODAL LAYER PORTAL HERE */}
      <TransactionSortModal
        visible={sortModalOpen}
        onClose={() => setSortModalOpen(false)}
        selectedSortKey={activeSortKey}
        onSortKeyChange={(updatedKey) => {
          setActiveSortKey(updatedKey);
          console.log(
            `Re-ordering transaction list collection by parameter criteria: ${updatedKey}`,
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161D26", // Precise matching dark canvas color from screenshot asset
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%",
    alignSelf: "center",
    position: "relative",
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#242F42",
    backgroundColor: "#161D26",
  },
  appBarLeft: { flexDirection: "row", alignItems: "center", gap: 16 },
  menuButton: { padding: 2 },
  appBarTitle: { color: "#FFF", fontSize: 20, fontWeight: "500" },
  appBarRight: { flexDirection: "row", alignItems: "center", gap: 16 },
  appBarIconButton: { position: "relative", padding: 2 },
  notificationDot: {
    position: "absolute",
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4CD964",
  },
  avatarCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#85C1E9",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  avatarText: { color: "#121824", fontSize: 15, fontWeight: "700" },
  onlineIndicatorDot: {
    position: "absolute",
    bottom: -1,
    right: -1,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#4CD964",
    borderWidth: 1.5,
    borderColor: "#161D26",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 120,
  },
  walletDetailsCard: {
    backgroundColor: "#1C2534",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 4,
    borderWidth: 1,
    borderColor: "#242F42",
    marginBottom: 16,
  },
  cardHeaderTitle: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 16,
    letterSpacing: 0.2,
  },
  dataDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(36, 47, 66, 0.6)",
  },
  noBorderRow: {
    borderBottomWidth: 0,
  },
  dataLeftGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dataLabelText: {
    color: "#E5E9F0",
    fontSize: 15,
    fontWeight: "500",
  },
  dataValueText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "600",
  },
  transactionsTriggerButton: {
    flexDirection: "row",
    backgroundColor: "#293542", // Muted dark blue-gray link container button
    width: "100%",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#374554",
    marginBottom: 16,
  },
  btnIcon: {
    marginRight: 8,
  },
  transactionsButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  dropdownInputContainer: {
    width: "100%",
    marginBottom: 24,
  },
  dropdownTriggerFrame: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#3E4C5E",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "transparent",
  },
  dropdownLeftGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  fieldIcon: {
    marginRight: 14,
  },
  dropdownText: {
    color: "#9EA5B1",
    fontSize: 16,
    fontWeight: "500",
  },
  emptyPlaceholderWrapper: {
    flex: 1,
    paddingTop: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyPlaceholderText: {
    color: "#9EA5B1",
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
  },
  bottomOverlayBarContainer: {
    position: "absolute",
    bottom: 24,
    left: 16,
    right: 16,
    alignItems: "center",
    pointerEvents: "box-none",
  },
  filterSortPillContainer: {
    flexDirection: "row",
    backgroundColor: "#243242", // Pill background matching image perfectly
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#304257",
    width: "100%",
    maxWidth: 280, // Restricts horizontal bloating expansion on wide web monitors
    overflow: "hidden",
  },
  pillActionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    gap: 8,
  },
  pillBtnText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 14,
  },
  pillVerticalSeparatorLine: {
    width: 1,
    backgroundColor: "#304257",
    marginVertical: 8,
  },
});
