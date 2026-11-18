// components/ui/landlord/units/UnitLeasesFilterModal.tsx
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "react-native-paper";

import LeaseStatusesModal, { LeaseStatusValue } from "./LeaseStatusesModal";

export type LeaseBillingCycleOption = "" | "monthly" | "daily" | "semester";

export interface UnitLeaseFilters {
  statuses: LeaseStatusValue[];
  billingCycle: LeaseBillingCycleOption;
  securityDepositSet: boolean;
  lateFeeSet: boolean;
  includeDeleted: boolean;
}

interface UnitLeasesFilterModalProps {
  visible: boolean;
  initialFilters?: UnitLeaseFilters;
  onClose: () => void;
  onApplyFilters: (filters: UnitLeaseFilters) => void;
}

const BILLING_CYCLE_OPTIONS: {
  label: string;
  value: LeaseBillingCycleOption;
}[] = [
  { label: "monthly", value: "monthly" },
  { label: "daily", value: "daily" },
  { label: "semester", value: "semester" },
];

export const DEFAULT_UNIT_LEASE_FILTERS: UnitLeaseFilters = {
  statuses: [],
  billingCycle: "",
  securityDepositSet: false,
  lateFeeSet: false,
  includeDeleted: false,
};

export default function UnitLeasesFilterModal({
  visible,
  initialFilters = DEFAULT_UNIT_LEASE_FILTERS,
  onClose,
  onApplyFilters,
}: UnitLeasesFilterModalProps) {
  const [statuses, setStatuses] = useState<LeaseStatusValue[]>(
    initialFilters.statuses,
  );
  const [billingCycle, setBillingCycle] = useState<LeaseBillingCycleOption>(
    initialFilters.billingCycle,
  );
  const [securityDepositSet, setSecurityDepositSet] = useState<boolean>(
    initialFilters.securityDepositSet,
  );
  const [lateFeeSet, setLateFeeSet] = useState<boolean>(
    initialFilters.lateFeeSet,
  );
  const [includeDeleted, setIncludeDeleted] = useState<boolean>(
    initialFilters.includeDeleted,
  );

  const [isBillingMenuOpen, setIsBillingMenuOpen] = useState(false);
  const [isStatusesModalOpen, setIsStatusesModalOpen] = useState(false);

  useEffect(() => {
    if (visible) {
      setStatuses(initialFilters.statuses);
      setBillingCycle(initialFilters.billingCycle);
      setSecurityDepositSet(initialFilters.securityDepositSet);
      setLateFeeSet(initialFilters.lateFeeSet);
      setIncludeDeleted(initialFilters.includeDeleted);
      setIsBillingMenuOpen(false);
      setIsStatusesModalOpen(false);
    }
  }, [visible, initialFilters]);

  const handleToggleStatus = (item: LeaseStatusValue) => {
    setStatuses((prev) =>
      prev.includes(item) ? prev.filter((s) => s !== item) : [...prev, item],
    );
  };

  const selectedStatusLabel =
    statuses.length > 0 ? statuses.join(", ") : "Lease statuses";

  const selectedBillingLabel =
    BILLING_CYCLE_OPTIONS.find((item) => item.value === billingCycle)?.label ||
    "Billing cycle";

  const handleClearFilters = () => {
    setStatuses([]);
    setBillingCycle("");
    setSecurityDepositSet(false);
    setLateFeeSet(false);
    setIncludeDeleted(false);
    setIsBillingMenuOpen(false);
    setIsStatusesModalOpen(false);
    onApplyFilters(DEFAULT_UNIT_LEASE_FILTERS);
  };

  const handleApply = () => {
    setIsBillingMenuOpen(false);
    setIsStatusesModalOpen(false);
    onApplyFilters({
      statuses,
      billingCycle,
      securityDepositSet,
      lateFeeSet,
      includeDeleted,
    });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <Pressable style={styles.backdropDismiss} onPress={onClose} />

        <View style={styles.sheetContainer}>
          {/* Top Drag Handle & Close Row */}
          <View style={styles.sheetHeader}>
            <View style={styles.dragHandle} />
            <Pressable
              onPress={onClose}
              hitSlop={10}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#E2E8F0" />
            </Pressable>
          </View>

          <ScrollView
            style={styles.bodyScroll}
            contentContainerStyle={styles.bodyContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Card 1: Lease status */}
            <View style={[styles.sectionCard, { zIndex: 30 }]}>
              <Text style={styles.sectionTitle}>Lease status</Text>
              <View style={styles.sectionDivider} />

              <Pressable
                onPress={() => {
                  setIsBillingMenuOpen(false);
                  setIsStatusesModalOpen(true);
                }}
                style={styles.dropdownTrigger}
              >
                <View style={styles.dropdownLeft}>
                  <MaterialCommunityIcons
                    name="playlist-check"
                    size={22}
                    color="#7BC4FA"
                  />
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.dropdownText,
                      statuses.length > 0 && styles.dropdownTextSelected,
                    ]}
                  >
                    {selectedStatusLabel}
                  </Text>
                </View>
                <Ionicons name="caret-down" size={14} color="#E2E8F0" />
              </Pressable>
            </View>

            {/* Card 2: Lease billing cycle */}
            <View style={[styles.sectionCard, { zIndex: 20 }]}>
              <Text style={styles.sectionTitle}>Lease billing cycle</Text>
              <View style={styles.sectionDivider} />

              <Pressable
                onPress={() => {
                  setIsBillingMenuOpen((prev) => !prev);
                }}
                style={styles.dropdownTrigger}
              >
                <Text
                  style={[
                    styles.dropdownText,
                    billingCycle && styles.dropdownTextSelected,
                  ]}
                >
                  {selectedBillingLabel}
                </Text>
                <Ionicons
                  name={isBillingMenuOpen ? "caret-up" : "caret-down"}
                  size={14}
                  color="#E2E8F0"
                />
              </Pressable>

              {isBillingMenuOpen && (
                <View style={styles.dropdownMenu}>
                  {BILLING_CYCLE_OPTIONS.map((option, idx) => (
                    <Pressable
                      key={option.value}
                      onPress={() => {
                        setBillingCycle(option.value);
                        setIsBillingMenuOpen(false);
                      }}
                      style={[
                        styles.dropdownOption,
                        idx === BILLING_CYCLE_OPTIONS.length - 1 &&
                          styles.dropdownOptionLast,
                      ]}
                    >
                      <Text style={styles.dropdownOptionText}>
                        {option.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>

            {/* Card 3: Lease configurations */}
            <View style={[styles.sectionCard, { zIndex: 10 }]}>
              <Text style={styles.sectionTitle}>Lease configurations</Text>
              <View style={styles.sectionDivider} />

              <Pressable
                onPress={() => setSecurityDepositSet((prev) => !prev)}
                style={styles.checkboxRow}
              >
                <Text style={styles.checkboxLabel}>Security deposit set</Text>
                <View
                  style={[
                    styles.checkboxBox,
                    securityDepositSet && styles.checkboxBoxChecked,
                  ]}
                >
                  {securityDepositSet && (
                    <Ionicons name="checkmark" size={15} color="#0F172A" />
                  )}
                </View>
              </Pressable>

              <View style={styles.rowDivider} />

              <Pressable
                onPress={() => setLateFeeSet((prev) => !prev)}
                style={styles.checkboxRow}
              >
                <Text style={styles.checkboxLabel}>Late fee set</Text>
                <View
                  style={[
                    styles.checkboxBox,
                    lateFeeSet && styles.checkboxBoxChecked,
                  ]}
                >
                  {lateFeeSet && (
                    <Ionicons name="checkmark" size={15} color="#0F172A" />
                  )}
                </View>
              </Pressable>

              <View style={styles.rowDivider} />

              <Pressable
                onPress={() => setIncludeDeleted((prev) => !prev)}
                style={styles.checkboxRowTopAligned}
              >
                <View style={styles.deletedTextCol}>
                  <Text style={styles.checkboxLabel}>Deleted</Text>
                  <Text style={styles.deletedSubtext}>
                    These include leases that other property managers have
                    deleted but you haven&apos;t deleted on your end.
                  </Text>
                </View>
                <View
                  style={[
                    styles.checkboxBox,
                    includeDeleted && styles.checkboxBoxChecked,
                  ]}
                >
                  {includeDeleted && (
                    <Ionicons name="checkmark" size={15} color="#0F172A" />
                  )}
                </View>
              </Pressable>
            </View>
          </ScrollView>

          {/* Bottom Action Bar */}
          <View style={styles.footerBar}>
            <Pressable
              onPress={handleClearFilters}
              style={styles.clearFiltersBtn}
            >
              <Ionicons name="close" size={18} color="#7BC4FA" />
              <Text style={styles.clearFiltersText}>Clear filters</Text>
            </Pressable>

            <Pressable onPress={handleApply} style={styles.applyFiltersBtn}>
              <Text style={styles.applyFiltersText}>Apply filters</Text>
            </Pressable>
          </View>
        </View>

        <LeaseStatusesModal
          visible={isStatusesModalOpen}
          selectedStatuses={statuses}
          onToggleStatus={handleToggleStatus}
          onClose={() => setIsStatusesModalOpen(false)}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.58)",
    justifyContent: "flex-end",
  },
  backdropDismiss: {
    flex: 1,
  },
  sheetContainer: {
    backgroundColor: "#044A67",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%",
    alignSelf: "center",
    maxHeight: "90%",
    overflow: "hidden",
  },
  sheetHeader: {
    paddingTop: 10,
    paddingBottom: 14,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#648899",
    alignItems: "center",
    justifyContent: "center",
  },
  dragHandle: {
    width: 34,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#071E29",
    marginBottom: 8,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 4,
  },
  bodyScroll: {
    flexGrow: 0,
  },
  bodyContent: {
    padding: 14,
    gap: 14,
    paddingBottom: 24,
  },
  sectionCard: {
    backgroundColor: "#1C1E22",
    borderRadius: 12,
    padding: 16,
    position: "relative",
  },
  sectionTitle: {
    color: "#F1F5F9",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: "#33373E",
    marginHorizontal: -16,
    marginBottom: 14,
  },
  dropdownTrigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#8A8F98",
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: "#1C1E22",
  },
  dropdownLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    flex: 1,
    marginRight: 8,
  },
  dropdownText: {
    color: "#CBD5E1",
    fontSize: 15,
    flexShrink: 1,
  },
  dropdownTextSelected: {
    color: "#F8FAFC",
    fontWeight: "500",
  },
  dropdownMenu: {
    marginTop: 6,
    backgroundColor: "#1C1E22",
    borderWidth: 1,
    borderColor: "#8A8F98",
    borderRadius: 6,
    overflow: "hidden",
  },
  dropdownOption: {
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#33373E",
  },
  dropdownOptionLast: {
    borderBottomWidth: 0,
  },
  dropdownOptionText: {
    color: "#F1F5F9",
    fontSize: 15,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  checkboxRowTopAligned: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingTop: 12,
    paddingBottom: 4,
    gap: 12,
  },
  deletedTextCol: {
    flex: 1,
    gap: 4,
  },
  checkboxLabel: {
    color: "#F1F5F9",
    fontSize: 15,
    fontWeight: "500",
  },
  deletedSubtext: {
    color: "#CBD5E1",
    fontSize: 13,
    fontStyle: "italic",
    lineHeight: 19,
  },
  checkboxBox: {
    width: 22,
    height: 22,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  checkboxBoxChecked: {
    backgroundColor: "#7BC4FA",
    borderColor: "#7BC4FA",
  },
  rowDivider: {
    height: 1,
    backgroundColor: "#33373E",
  },
  footerBar: {
    backgroundColor: "#1E2229",
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  clearFiltersBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#8A8F98",
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 11,
  },
  clearFiltersText: {
    color: "#7BC4FA",
    fontSize: 14,
    fontWeight: "600",
  },
  applyFiltersBtn: {
    backgroundColor: "#89CEFF",
    borderRadius: 999,
    paddingHorizontal: 26,
    paddingVertical: 12,
  },
  applyFiltersText: {
    color: "#0A2538",
    fontSize: 14,
    fontWeight: "700",
  },
});
