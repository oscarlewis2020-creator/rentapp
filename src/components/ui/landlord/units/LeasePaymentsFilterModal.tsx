// components/ui/landlord/units/LeasePaymentsFilterModal.tsx
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

import PaymentStatusesModal, {
  PaymentStatusValue,
} from "./PaymentStatusesModal";
import PaymentTypesModal, { PaymentTypeValue } from "./PaymentTypesModal";

export interface LeasePaymentFilters {
  statuses: PaymentStatusValue[];
  types: PaymentTypeValue[];
  onlyDiscrepancies: boolean;
  includeDeleted: boolean;
}

export const DEFAULT_LEASE_PAYMENT_FILTERS: LeasePaymentFilters = {
  statuses: [],
  types: [],
  onlyDiscrepancies: false,
  includeDeleted: false,
};

interface LeasePaymentsFilterModalProps {
  visible: boolean;
  initialFilters?: LeasePaymentFilters;
  onClose: () => void;
  onApplyFilters: (filters: LeasePaymentFilters) => void;
}

export default function LeasePaymentsFilterModal({
  visible,
  initialFilters = DEFAULT_LEASE_PAYMENT_FILTERS,
  onClose,
  onApplyFilters,
}: LeasePaymentsFilterModalProps) {
  const [statuses, setStatuses] = useState<PaymentStatusValue[]>(
    initialFilters.statuses,
  );
  const [types, setTypes] = useState<PaymentTypeValue[]>(initialFilters.types);
  const [onlyDiscrepancies, setOnlyDiscrepancies] = useState<boolean>(
    initialFilters.onlyDiscrepancies,
  );
  const [includeDeleted, setIncludeDeleted] = useState<boolean>(
    initialFilters.includeDeleted,
  );

  const [isStatusesModalOpen, setIsStatusesModalOpen] = useState(false);
  const [isTypesModalOpen, setIsTypesModalOpen] = useState(false);

  useEffect(() => {
    if (visible) {
      setStatuses(initialFilters.statuses);
      setTypes(initialFilters.types);
      setOnlyDiscrepancies(initialFilters.onlyDiscrepancies);
      setIncludeDeleted(initialFilters.includeDeleted);
      setIsStatusesModalOpen(false);
      setIsTypesModalOpen(false);
    }
  }, [visible, initialFilters]);

  const handleToggleStatus = (item: PaymentStatusValue) => {
    setStatuses((prev) =>
      prev.includes(item) ? prev.filter((s) => s !== item) : [...prev, item],
    );
  };

  const handleToggleType = (item: PaymentTypeValue) => {
    setTypes((prev) =>
      prev.includes(item) ? prev.filter((t) => t !== item) : [...prev, item],
    );
  };

  const handleClearFilters = () => {
    setStatuses([]);
    setTypes([]);
    setOnlyDiscrepancies(false);
    setIncludeDeleted(false);
    onApplyFilters(DEFAULT_LEASE_PAYMENT_FILTERS);
  };

  const handleApply = () => {
    onApplyFilters({
      statuses,
      types,
      onlyDiscrepancies,
      includeDeleted,
    });
    onClose();
  };

  const selectedStatusLabel =
    statuses.length > 0 ? statuses.join(", ") : "Payment statuses";

  const selectedTypeLabel =
    types.length > 0 ? types.join(", ") : "Payment type";

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
            {/* Card 1: Payment status */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Payment status</Text>
              <View style={styles.sectionDivider} />

              <Pressable
                onPress={() => setIsStatusesModalOpen(true)}
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

            {/* Card 2: Payment type */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Payment type</Text>
              <View style={styles.sectionDivider} />

              <Pressable
                onPress={() => setIsTypesModalOpen(true)}
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
                      types.length > 0 && styles.dropdownTextSelected,
                    ]}
                  >
                    {selectedTypeLabel}
                  </Text>
                </View>
                <Ionicons name="caret-down" size={14} color="#E2E8F0" />
              </Pressable>
            </View>

            {/* Card 3: Miscellaneous */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Miscellaneous</Text>
              <View style={styles.sectionDivider} />

              <Pressable
                onPress={() => setOnlyDiscrepancies((prev) => !prev)}
                style={styles.checkboxRow}
              >
                <Text style={styles.checkboxLabel}>
                  Payments with discrepancies
                </Text>
                <View
                  style={[
                    styles.checkboxBox,
                    onlyDiscrepancies && styles.checkboxBoxChecked,
                  ]}
                >
                  {onlyDiscrepancies && (
                    <Ionicons name="checkmark" size={15} color="#0F172A" />
                  )}
                </View>
              </Pressable>

              <Pressable
                onPress={() => setIncludeDeleted((prev) => !prev)}
                style={styles.checkboxRowTopAligned}
              >
                <View style={styles.deletedTextCol}>
                  <Text style={styles.checkboxLabel}>Deleted</Text>
                  <Text style={styles.deletedSubtext}>
                    These include payments that other property managers have
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

        <PaymentStatusesModal
          visible={isStatusesModalOpen}
          selectedStatuses={statuses}
          onToggleStatus={handleToggleStatus}
          onClose={() => setIsStatusesModalOpen(false)}
        />

        <PaymentTypesModal
          visible={isTypesModalOpen}
          selectedTypes={types}
          onToggleType={handleToggleType}
          onClose={() => setIsTypesModalOpen(false)}
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
