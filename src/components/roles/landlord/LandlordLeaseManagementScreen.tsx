// components/roles/landlord/LandlordLeaseManagementScreen.tsx
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { LandlordCashPaymentDetailsScreen } from "./LandlordCashPaymentDetailsScreen";
import { LandlordLeaseNotesScreen } from "./LandlordLeaseNotesScreen";
import { LandlordLipaNaMpesaPaymentScreen } from "./LandlordLipaNaMpesaPaymentScreen";
import { LandlordUnderstandingLeaseStatusesScreen } from "./LandlordUnderstandingLeaseStatusesScreen";
import { LandlordUploadReceiptPaymentScreen } from "./LandlordUploadReceiptPaymentScreen";

import {
  LEASE_ACTION_ITEMS,
  LEASE_BANNERS,
  LeaseActionKey,
} from "../../ui/landlord/lease/LeaseActionConfig";
import LeaseManagementModals from "../../ui/landlord/lease/LeaseManagementModals";
import LeasePaymentActionsSection from "../../ui/landlord/lease/LeasePaymentActionsSection";
import LeaseSummarySection from "../../ui/landlord/lease/LeaseSummarySection";

import ConfirmLeaseDeletionModal from "../../ui/landlord/units/ConfirmLeaseDeletionModal";
import DeleteTenancyModal from "../../ui/landlord/units/DeleteTenancyModal";
import GenerateLeaseStatementModal from "../../ui/landlord/units/GenerateLeaseStatementModal";
import LeasePaymentsFilterModal, {
  DEFAULT_LEASE_PAYMENT_FILTERS,
  LeasePaymentFilters,
} from "../../ui/landlord/units/LeasePaymentsFilterModal";
import LeasePaymentsSortModal, {
  PaymentSortOrder,
} from "../../ui/landlord/units/LeasePaymentsSortModal";
import { PaymentTypeValue } from "../../ui/landlord/units/PaymentTypesModal";
import { UnitLeaseItem } from "../../ui/landlord/units/UnitLeasesList";

import { useGlobalNavigation } from "@/context/NavigationContext";

export interface LeaseTenantMember {
  id: string;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
  role: string;
}

export interface LeasePaymentEntry {
  id: string;
  kind: "Discount" | "Waiver" | "Discrepancy" | string;
  paymentType?: PaymentTypeValue;
  amount: string;
  date: string;
  payer?: string;
  status?: string;
  hasDiscrepancy?: boolean;
  isDeleted?: boolean;
}

interface LandlordLeaseManagementScreenProps {
  lease: UnitLeaseItem;
  onBack: () => void;
  onDeleteLeaseConfirmed: (leaseId: string) => void;
  onActionPress?: (actionKey: string, lease: UnitLeaseItem) => void;
  onViewTenantDetails?: (
    tenant: LeaseTenantMember,
    lease: UnitLeaseItem,
  ) => void;
  onAddTenantsPress?: (lease: UnitLeaseItem) => void;
}

export function LandlordLeaseManagementScreen({
  lease,
  onBack,
  onDeleteLeaseConfirmed,
  onActionPress,
  onViewTenantDetails,
  onAddTenantsPress,
}: LandlordLeaseManagementScreenProps) {
  const {
    currentSubDashboard,
    navigateToSubDashboard,
    navigateBack,
    updateUnitName,
    updateBuildingName,
  } = useGlobalNavigation();

  const unitLabel = lease.unitName || "Room 7";
  const buildingLabel = lease.buildingName || "Demo Building";

  useEffect(() => {
    updateUnitName(unitLabel);
    updateBuildingName(buildingLabel);
  }, [unitLabel, buildingLabel, updateUnitName, updateBuildingName]);

  // ---------------- SUB-SCREENS & SEGMENTS ----------------
  const [subScreen, setSubScreen] = useState<"notes" | "status_guide" | null>(
    null,
  );
  const [activeSegment, setActiveSegment] = useState<
    "actions" | "payments" | "tenants"
  >("actions");

  // // -----------------   PAYMENT MODE SCREENS -----------------

  // const [paymentScreenMode, setPaymentScreenMode] = useState<
  //   "receipt" | "mpesa" | "cash" | null
  // >(null);

  // ---------------- LEASE ACTION MODALS & BANNER ----------------
  const [isPayRentOpen, setIsPayRentOpen] = useState(false);
  const [isChangeRentOpen, setIsChangeRentOpen] = useState(false);
  const [isWaiveRentOpen, setIsWaiveRentOpen] = useState(false);
  const [dateModalConfig, setDateModalConfig] = useState<{
    open: boolean;
    mode: "grace" | "endDate";
  }>({ open: false, mode: "grace" });
  const [isTerminateOpen, setIsTerminateOpen] = useState(false);
  const [isVacateNoticeOpen, setIsVacateNoticeOpen] = useState(false);
  const [isPhotoIdUploadOpen, setIsPhotoIdUploadOpen] = useState(false);
  const [isUnitSwitchOpen, setIsUnitSwitchOpen] = useState(false);
  const [isEmergencyContactOpen, setIsEmergencyContactOpen] = useState(false);
  const [isEditPhoneOpen, setIsEditPhoneOpen] = useState(false);
  const [feeModalConfig, setFeeModalConfig] = useState<{
    open: boolean;
    variant: "security_deposit" | "late_payment_fee";
  }>({ open: false, variant: "security_deposit" });
  const [prorateModalTarget, setProrateModalTarget] = useState<
    "first_month" | "final_month" | null
  >(null);

  const [banner, setBanner] = useState<{ visible: boolean; message: string }>({
    visible: false,
    message: "",
  });

  const showBanner = (message: string) => setBanner({ visible: true, message });
  const hideBanner = () => setBanner((prev) => ({ ...prev, visible: false }));

  // ---------------- BILLING, TENANTS & PAYMENTS STATE ----------------
  const [billingCycle, setBillingCycle] = useState("Monthly");
  const [prorateFirstMonth, setProrateFirstMonth] = useState(true);
  const [prorateFinalMonth, setProrateFinalMonth] = useState(false);
  const [tenantPhone, setTenantPhone] = useState("723568974");
  const [tenantSecondaryPhone, setTenantSecondaryPhone] = useState("");

  const [isStatementModalOpen, setIsStatementModalOpen] = useState(false);
  const [isConfirmLeaseDeleteOpen, setIsConfirmLeaseDeleteOpen] =
    useState(false);
  const [tenantToDelete, setTenantToDelete] =
    useState<LeaseTenantMember | null>(null);

  const [tenants, setTenants] = useState<LeaseTenantMember[]>([
    {
      id: "t1",
      name: "Leakay Mbogo",
      status: "Approved",
      startDate: "Apr-17-2025",
      endDate: "Apr-16-2026",
      role: "Resident Lease Holder",
    },
    {
      id: "t2",
      name: "Wanjiku Mwangi",
      status: "Approved",
      startDate: "Apr-17-2025",
      endDate: "Apr-16-2026",
      role: "Resident Lease Holder",
    },
  ]);

  const [payments, setPayments] = useState<LeasePaymentEntry[]>([
    {
      id: "p1",
      kind: "Discount",
      amount: "KES 4,000",
      date: "Apr-17-2025 18:59",
    },
    {
      id: "p2",
      kind: "Waiver",
      amount: "KES 5,000",
      date: "Apr-17-2025 18:58",
    },
    {
      id: "p3",
      kind: "Discrepancy",
      payer: "LEAKEY MBOGO",
      amount: "KES 1,200",
      status: "Approved",
      date: "Apr-17-2025",
    },
  ]);

  const [isPaymentsFilterOpen, setIsPaymentsFilterOpen] = useState(false);
  const [isPaymentsSortOpen, setIsPaymentsSortOpen] = useState(false);
  const [paymentFilters, setPaymentFilters] = useState<LeasePaymentFilters>(
    DEFAULT_LEASE_PAYMENT_FILTERS,
  );
  const [paymentSortOrder, setPaymentSortOrder] =
    useState<PaymentSortOrder>("newest");

  const hasOverpayment = false;
  const primaryTenantName = lease.tenantName || tenants[0]?.name || "Outis";

  const handleActionPress = (key: LeaseActionKey) => {
    onActionPress?.(key, lease);

    switch (key) {
      case "pay_rent":
        return setIsPayRentOpen(true);
      case "change_rent":
        return setIsChangeRentOpen(true);
      case "refund_rent":
        if (!hasOverpayment) showBanner(LEASE_BANNERS.noOverpaymentRefund);
        return;
      case "waive_debt":
        return setIsWaiveRentOpen(true);
      case "adjust_grace_period":
        return setDateModalConfig({ open: true, mode: "grace" });
      case "adjust_lease_end_date":
      case "adjust_tenant_end_date":
        return setDateModalConfig({ open: true, mode: "endDate" });
      case "terminate_lease":
        setIsTerminateOpen(true);
        return showBanner(LEASE_BANNERS.pendingRequestsTerminate);
      case "issue_notice_to_vacate":
        return setIsVacateNoticeOpen(true);
      case "lease_notes":
        return setSubScreen("notes");
      case "update_tenant_photo_id":
        return setIsPhotoIdUploadOpen(true);
      case "add_emergency_contact":
        return setIsEmergencyContactOpen(true);
      case "edit_tenant_phone":
        return setIsEditPhoneOpen(true);
      case "understanding_lease_status":
        return setSubScreen("status_guide");
      default:
        return;
    }
  };

  const handleProrateProceed = () => {
    if (prorateModalTarget === "first_month") {
      setProrateFirstMonth((prev) => !prev);
    } else if (prorateModalTarget === "final_month") {
      setProrateFinalMonth((prev) => !prev);
    }
    setProrateModalTarget(null);
    showBanner(LEASE_BANNERS.noChangesMade);
  };

  const visiblePayments = useMemo(() => {
    const filtered = payments.filter((entry) => {
      if (!paymentFilters.includeDeleted && entry.isDeleted) return false;
      if (
        paymentFilters.onlyDiscrepancies &&
        !entry.hasDiscrepancy &&
        entry.kind !== "Discrepancy"
      ) {
        return false;
      }
      if (
        paymentFilters.statuses.length > 0 &&
        entry.status &&
        !paymentFilters.statuses.includes(entry.status as any)
      ) {
        return false;
      }
      if (paymentFilters.types.length > 0) {
        const normalizedType = entry.paymentType || entry.kind;
        if (
          !paymentFilters.types.includes(normalizedType as PaymentTypeValue)
        ) {
          return false;
        }
      }
      return true;
    });

    return paymentSortOrder === "newest" ? filtered : [...filtered].reverse();
  }, [payments, paymentFilters, paymentSortOrder]);

  if (subScreen === "notes") {
    return (
      <LandlordLeaseNotesScreen
        unitName={unitLabel}
        onBack={() => setSubScreen(null)}
      />
    );
  }

  if (subScreen === "status_guide") {
    return (
      <LandlordUnderstandingLeaseStatusesScreen
        onBack={() => setSubScreen(null)}
      />
    );
  }

  // ✅ Driven by currentSubDashboard so TabsLayout's persisted header title stays in sync
  if (
    currentSubDashboard === "upload_receipt_payment" ||
    currentSubDashboard === "payment_details"
  ) {
    return (
      <LandlordUploadReceiptPaymentScreen
        unitName={unitLabel}
        buildingName={buildingLabel}
        defaultPhone={tenantPhone}
        onBack={navigateBack}
        onSubmitPayment={(payload) => {
          console.log("Receipt payment submitted:", payload);
          navigateBack();
        }}
      />
    );
  }

  if (currentSubDashboard === "mpesa_payment") {
    return (
      <LandlordLipaNaMpesaPaymentScreen
        unitName={unitLabel}
        defaultPhone={tenantPhone}
        onBack={navigateBack}
        onSubmitMpesa={(payload) => {
          console.log("M-Pesa payment submitted:", payload);
          navigateBack();
        }}
      />
    );
  }

  if (currentSubDashboard === "cash_payment_details") {
    return (
      <LandlordCashPaymentDetailsScreen
        defaultPhone={tenantPhone}
        onBack={navigateBack}
        onSubmitCash={(payload) => {
          console.log("Cash payment submitted:", payload);
          navigateBack();
        }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.topHeader}>
        <Pressable onPress={onBack} hitSlop={10} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#F1F5F9" />
        </Pressable>
        <Text style={styles.headerTitle}>{lease.unitName} Lease</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Lease Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryTop}>
            <Text style={styles.statusUnderline}>
              {lease.status.toUpperCase()}
            </Text>
            <Pressable
              onPress={() => setIsConfirmLeaseDeleteOpen(true)}
              style={styles.topDeleteBtn}
            >
              <Ionicons name="trash" size={16} color="#F87171" />
            </Pressable>
          </View>

          <View style={styles.balanceRow}>
            <View style={styles.rowLeft}>
              <MaterialCommunityIcons
                name="scale-balance"
                size={19}
                color="#94A3B8"
              />
              <Text style={styles.rowLabel}>Balance</Text>
            </View>
            <View style={styles.balanceRight}>
              <Text style={styles.balanceValue}>
                {lease.balance} <Text style={styles.debtTag}>[Debt]</Text>
              </Text>
              <Ionicons name="ellipsis-vertical" size={16} color="#E2E8F0" />
            </View>
          </View>

          <View style={[styles.dueDateRow, styles.lastRow]}>
            <View style={styles.rowLeft}>
              <Ionicons name="time-outline" size={19} color="#38BDF8" />
              <Text style={styles.rowLabel}>Due Date</Text>
            </View>
            <Text style={styles.dueDateValue}>
              {lease.dueDate || "Apr-17-2025"}
            </Text>
          </View>
        </View>

        {/* Segment Bar */}
        <View style={styles.segmentRow}>
          <Pressable
            onPress={() => setActiveSegment("actions")}
            style={[
              styles.segmentTab,
              activeSegment === "actions" && styles.segmentTabActive,
            ]}
          >
            <MaterialCommunityIcons
              name="message-plus-outline"
              size={17}
              color="#E2E8F0"
            />
            <Text style={styles.segmentText}>Actions</Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveSegment("payments")}
            style={[
              styles.segmentTab,
              styles.segmentTabBorder,
              activeSegment === "payments" && styles.segmentTabActive,
            ]}
          >
            <MaterialCommunityIcons
              name="account-cash-outline"
              size={18}
              color="#E2E8F0"
            />
            <Text style={styles.segmentText}>Payments</Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveSegment("tenants")}
            style={[
              styles.segmentTab,
              activeSegment === "tenants" && styles.segmentTabActive,
            ]}
          >
            <MaterialCommunityIcons
              name="bed-outline"
              size={18}
              color="#E2E8F0"
            />
            <Text style={styles.segmentText}>Tenants</Text>
          </Pressable>
        </View>

        {/* SEGMENT 1: ACTIONS */}
        {activeSegment === "actions" && (
          <View style={styles.sectionStack}>
            <Text style={styles.sectionTitle}>Lease Actions</Text>

            <View style={styles.cardBox}>
              {LEASE_ACTION_ITEMS.map((item, idx) => (
                <Pressable
                  key={item.key}
                  onPress={() => handleActionPress(item.key)}
                  style={[
                    styles.actionRow,
                    idx === LEASE_ACTION_ITEMS.length - 1 && styles.lastRow,
                  ]}
                >
                  <View style={styles.actionLeft}>
                    <MaterialCommunityIcons
                      name={item.iconName}
                      size={20}
                      color={item.iconColor || "#38BDF8"}
                    />
                    <Text style={styles.actionTitle}>{item.title}</Text>
                  </View>
                  <View style={styles.chevronCircle}>
                    <Feather name="chevron-right" size={15} color="#0F172A" />
                  </View>
                </Pressable>
              ))}
            </View>

            <LeasePaymentActionsSection
              billingCycle={billingCycle}
              prorateFirstMonth={prorateFirstMonth}
              prorateFinalMonth={prorateFinalMonth}
              onCycleBillingCycle={() =>
                setBillingCycle((prev) =>
                  prev === "Monthly"
                    ? "Daily"
                    : prev === "Daily"
                      ? "Semester"
                      : "Monthly",
                )
              }
              onPressInfo={() => showBanner(LEASE_BANNERS.dailyBillingInfo)}
              onEditSecurityDeposit={() =>
                setFeeModalConfig({ open: true, variant: "security_deposit" })
              }
              onEditLateFee={() =>
                setFeeModalConfig({ open: true, variant: "late_payment_fee" })
              }
              onEditMonthlyDiscount={() => {
                if (billingCycle !== "Monthly") {
                  showBanner(LEASE_BANNERS.monthlyDiscountOnly);
                }
              }}
              onToggleProrateFirstMonth={() =>
                setProrateModalTarget("first_month")
              }
              onToggleProrateFinalMonth={() =>
                setProrateModalTarget("final_month")
              }
            />

            <LeaseSummarySection lease={lease} />
          </View>
        )}

        {/* SEGMENT 2: PAYMENTS */}
        {activeSegment === "payments" && (
          <View style={styles.sectionStack}>
            {visiblePayments.map((entry) => (
              <View key={entry.id} style={styles.paymentCard}>
                <View style={styles.paymentKindCol}>
                  <Text style={styles.paymentKindTitle}>{entry.kind}</Text>
                  {entry.kind === "Discrepancy" && (
                    <View style={styles.discrepancyBadge}>
                      <Ionicons
                        name="alert-circle-outline"
                        size={14}
                        color="#FCA5A5"
                      />
                      <Text style={styles.discrepancyBadgeText}>
                        Discrepancy
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.paymentDetailsCol}>
                  {entry.payer && (
                    <View style={styles.paymentDetailRow}>
                      <View style={styles.rowLeft}>
                        <Ionicons
                          name="person-outline"
                          size={16}
                          color="#94A3B8"
                        />
                        <Text style={styles.paymentDetailLabel}>Payer</Text>
                      </View>
                      <Text style={styles.blueMetaValue}>{entry.payer}</Text>
                    </View>
                  )}

                  <View style={styles.paymentDetailRow}>
                    <View style={styles.rowLeft}>
                      <MaterialCommunityIcons
                        name="cash-100"
                        size={16}
                        color="#94A3B8"
                      />
                      <Text style={styles.paymentDetailLabel}>Amount</Text>
                    </View>
                    <Text style={styles.blueMetaValue}>{entry.amount}</Text>
                  </View>

                  {entry.status && (
                    <View style={styles.paymentDetailRow}>
                      <View style={styles.rowLeft}>
                        <MaterialCommunityIcons
                          name="playlist-check"
                          size={16}
                          color="#94A3B8"
                        />
                        <Text style={styles.paymentDetailLabel}>Status</Text>
                      </View>
                      <Text style={styles.approvedStatus}>{entry.status}</Text>
                    </View>
                  )}

                  <View style={styles.paymentDetailRow}>
                    <View style={styles.rowLeft}>
                      <MaterialCommunityIcons
                        name="calendar-check-outline"
                        size={16}
                        color="#94A3B8"
                      />
                      <Text style={styles.paymentDetailLabel}>Date</Text>
                    </View>
                    <Text style={styles.blueMetaValue}>{entry.date}</Text>
                  </View>

                  <View style={styles.voidRow}>
                    <View style={styles.rowLeft}>
                      <MaterialCommunityIcons
                        name="playlist-check"
                        size={16}
                        color="#94A3B8"
                      />
                      <Text style={styles.paymentDetailLabel}>Action</Text>
                    </View>

                    <Pressable
                      onPress={() =>
                        setPayments((prev) =>
                          prev.filter((item) => item.id !== entry.id),
                        )
                      }
                      style={styles.voidPillBtn}
                    >
                      <Ionicons name="ban-outline" size={14} color="#F87171" />
                      <Text style={styles.voidPillText}>Void</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* SEGMENT 3: TENANTS */}
        {activeSegment === "tenants" && (
          <View style={styles.sectionStack}>
            {tenants.map((tenant) => (
              <View key={tenant.id} style={styles.tenantCard}>
                <View style={styles.tenantRow}>
                  <View style={styles.rowLeft}>
                    <Ionicons name="person-outline" size={18} color="#94A3B8" />
                    <Text style={styles.rowLabel}>Name</Text>
                  </View>
                  <Text style={styles.blueMetaValue}>{tenant.name}</Text>
                </View>

                <View style={styles.tenantRow}>
                  <View style={styles.rowLeft}>
                    <MaterialCommunityIcons
                      name="playlist-check"
                      size={18}
                      color="#94A3B8"
                    />
                    <Text style={styles.rowLabel}>Status</Text>
                  </View>
                  <Text style={styles.approvedStatus}>{tenant.status}</Text>
                </View>

                <View style={styles.tenantRow}>
                  <View style={styles.rowLeft}>
                    <MaterialCommunityIcons
                      name="calendar-check-outline"
                      size={18}
                      color="#94A3B8"
                    />
                    <Text style={styles.rowLabel}>Start Date</Text>
                  </View>
                  <Text style={styles.blueMetaValue}>{tenant.startDate}</Text>
                </View>

                <View style={styles.tenantRow}>
                  <View style={styles.rowLeft}>
                    <MaterialCommunityIcons
                      name="calendar-arrow-right"
                      size={18}
                      color="#94A3B8"
                    />
                    <Text style={styles.rowLabel}>End Date</Text>
                  </View>
                  <Text style={styles.blueMetaValue}>{tenant.endDate}</Text>
                </View>

                <View style={[styles.tenantFooterRow, styles.lastRow]}>
                  <View style={styles.rowLeft}>
                    <MaterialCommunityIcons
                      name="account-group-outline"
                      size={18}
                      color="#94A3B8"
                    />
                    <Text style={styles.blueMetaValue}>{tenant.role}</Text>
                  </View>

                  <View style={styles.tenantActionsRight}>
                    <Pressable
                      onPress={() => setTenantToDelete(tenant)}
                      style={styles.tenantTrashBtn}
                    >
                      <Ionicons name="trash" size={16} color="#F87171" />
                    </Pressable>

                    <Pressable
                      onPress={() => onViewTenantDetails?.(tenant, lease)}
                      style={styles.tenantChevronBtn}
                    >
                      <Feather
                        name="chevrons-right"
                        size={16}
                        color="#E2E8F0"
                      />
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Bottom Floating Controls */}
      {activeSegment === "payments" ? (
        <View style={styles.bottomPaymentsBar}>
          <Pressable
            onPress={() => setIsPaymentsFilterOpen(true)}
            style={styles.paymentsFilterBtn}
          >
            <Ionicons name="options-outline" size={18} color="#E2E8F0" />
            <Text style={styles.paymentsFilterText}>Filter</Text>
          </Pressable>
          <View style={styles.verticalSep} />
          <Pressable
            onPress={() => setIsPaymentsSortOpen(true)}
            style={styles.paymentsFilterBtn}
          >
            <MaterialCommunityIcons
              name="sort-variant"
              size={18}
              color="#E2E8F0"
            />
            <Text style={styles.paymentsFilterText}>Sort</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.bottomFloatingRow}>
          <Pressable
            onPress={() => setIsStatementModalOpen(true)}
            style={styles.statementPillBtn}
          >
            <Ionicons name="document-text-outline" size={20} color="#E2E8F0" />
            <Text style={styles.statementPillText}>Statement</Text>
          </Pressable>

          {activeSegment === "tenants" ? (
            <Pressable
              onPress={() => onAddTenantsPress?.(lease)}
              style={styles.addTenantsBtn}
            >
              <MaterialCommunityIcons
                name="account-multiple-plus-outline"
                size={19}
                color="#CBD5E1"
              />
              <Text style={styles.addTenantsText}>Add Tenants</Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => showBanner(LEASE_BANNERS.statementAndProrateInfo)}
              style={styles.infoCircleBtn}
            >
              <Ionicons name="information-outline" size={20} color="#38BDF8" />
            </Pressable>
          )}
        </View>
      )}

      {/* Statement, Deletion & Payment Filter/Sort Modals */}
      <GenerateLeaseStatementModal
        visible={isStatementModalOpen}
        initialStartDate={lease.leaseStartDate || "Apr-17-2025"}
        initialEndDate="Apr-17-2026"
        onCancel={() => setIsStatementModalOpen(false)}
        onGeneratePdf={(start, end) => {
          console.log("Generating lease PDF statement:", {
            leaseId: lease.id,
            start,
            end,
          });
          setIsStatementModalOpen(false);
        }}
      />

      <DeleteTenancyModal
        visible={Boolean(tenantToDelete)}
        tenantName={tenantToDelete?.name}
        onCancel={() => setTenantToDelete(null)}
        onConfirm={() => {
          if (tenantToDelete) {
            setTenants((prev) =>
              prev.filter((t) => t.id !== tenantToDelete.id),
            );
          }
          setTenantToDelete(null);
        }}
      />

      <ConfirmLeaseDeletionModal
        visible={isConfirmLeaseDeleteOpen}
        leaseStatus={lease.status}
        onCancel={() => setIsConfirmLeaseDeleteOpen(false)}
        onConfirm={() => {
          setIsConfirmLeaseDeleteOpen(false);
          onDeleteLeaseConfirmed(lease.id);
        }}
      />

      <LeasePaymentsFilterModal
        visible={isPaymentsFilterOpen}
        initialFilters={paymentFilters}
        onClose={() => setIsPaymentsFilterOpen(false)}
        onApplyFilters={(filters) => setPaymentFilters(filters)}
      />

      <LeasePaymentsSortModal
        visible={isPaymentsSortOpen}
        selectedSort={paymentSortOrder}
        onSelectSort={(order) => setPaymentSortOrder(order)}
        onClose={() => setIsPaymentsSortOpen(false)}
      />

      {/* Action Modals & Banner */}
      <LeaseManagementModals
        tenantName={primaryTenantName}
        unitName={unitLabel}
        buildingName={lease.buildingName || "Demo Building"}
        tenantPhone={tenantPhone}
        tenantSecondaryPhone={tenantSecondaryPhone}
        onUpdateTenantPhones={(phone, secondary) => {
          setTenantPhone(phone);
          setTenantSecondaryPhone(secondary);
        }}
        isPayRentOpen={isPayRentOpen}
        onClosePayRent={() => setIsPayRentOpen(false)}
        onSelectPaymentMethod={(method) => {
          setIsPayRentOpen(false);
          if (method === "receipt")
            navigateToSubDashboard("upload_receipt_payment");
          if (method === "mpesa") navigateToSubDashboard("mpesa_payment");
          if (method === "cash") navigateToSubDashboard("cash_payment_details");
          console.log("Selected payment method:", method);
        }}
        isChangeRentOpen={isChangeRentOpen}
        onCloseChangeRent={() => setIsChangeRentOpen(false)}
        onSubmitRentChange={(payload) => {
          setIsChangeRentOpen(false);
          console.log("Rent changed:", payload);
        }}
        isWaiveRentOpen={isWaiveRentOpen}
        onCloseWaiveRent={() => setIsWaiveRentOpen(false)}
        onConfirmWaiveRent={(amount) => {
          setIsWaiveRentOpen(false);
          console.log("Rent waived:", amount);
        }}
        dateModalConfig={dateModalConfig}
        onCloseDateModal={() =>
          setDateModalConfig((prev) => ({ ...prev, open: false }))
        }
        onConfirmDateAdjust={(newDate) => {
          setDateModalConfig((prev) => ({ ...prev, open: false }));
          console.log("Adjusted date:", dateModalConfig.mode, newDate);
        }}
        isTerminateOpen={isTerminateOpen}
        onCloseTerminate={() => {
          setIsTerminateOpen(false);
          hideBanner();
        }}
        onConfirmTerminate={(terminationDate) => {
          setIsTerminateOpen(false);
          hideBanner();
          console.log("Lease terminated on:", terminationDate);
        }}
        isVacateNoticeOpen={isVacateNoticeOpen}
        onCloseVacateNotice={() => setIsVacateNoticeOpen(false)}
        onConfirmVacateNotice={(payload) => {
          setIsVacateNoticeOpen(false);
          console.log("Vacate notice issued:", payload);
        }}
        isPhotoIdUploadOpen={isPhotoIdUploadOpen}
        onClosePhotoIdUpload={() => setIsPhotoIdUploadOpen(false)}
        onSubmitPhotoId={(source) => {
          setIsPhotoIdUploadOpen(false);
          console.log("Photo ID submitted from:", source);
        }}
        isUnitSwitchOpen={isUnitSwitchOpen}
        onCloseUnitSwitch={() => setIsUnitSwitchOpen(false)}
        onConfirmUnitSwitch={(newUnit) => {
          setIsUnitSwitchOpen(false);
          console.log("Switched tenant to unit:", newUnit);
        }}
        isEmergencyContactOpen={isEmergencyContactOpen}
        onCloseEmergencyContact={() => setIsEmergencyContactOpen(false)}
        onSaveEmergencyContacts={(selected) => {
          setIsEmergencyContactOpen(false);
          console.log("Saved emergency contacts:", selected);
        }}
        isEditPhoneOpen={isEditPhoneOpen}
        onCloseEditPhone={() => setIsEditPhoneOpen(false)}
        feeModalConfig={feeModalConfig}
        onCloseFeeModal={() =>
          setFeeModalConfig((prev) => ({ ...prev, open: false }))
        }
        onUpdateFeeConfig={(payload) => {
          setFeeModalConfig((prev) => ({ ...prev, open: false }));
          console.log("Updated fee config:", feeModalConfig.variant, payload);
        }}
        isProrateModalOpen={prorateModalTarget !== null}
        onCloseProrateModal={() => setProrateModalTarget(null)}
        onProceedProrate={handleProrateProceed}
        banner={banner}
        onDismissBanner={hideBanner}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121824",
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%",
    alignSelf: "center",
  },
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 14,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    color: "#F1F5F9",
    fontSize: 18,
    fontWeight: "600",
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingBottom: 110,
  },
  summaryCard: {
    backgroundColor: "#1A2332",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#283548",
    padding: 14,
    marginBottom: 14,
  },
  summaryTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  statusUnderline: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "600",
    textDecorationLine: "underline",
    letterSpacing: 0.5,
  },
  topDeleteBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(248, 113, 113, 0.14)",
    borderWidth: 1,
    borderColor: "rgba(248, 113, 113, 0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#243142",
  },
  balanceRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  balanceValue: {
    color: "#E2E8F0",
    fontSize: 14,
    fontWeight: "600",
  },
  debtTag: {
    color: "#F87171",
    fontWeight: "600",
  },
  dueDateRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 12,
    paddingBottom: 4,
    borderTopWidth: 1,
    borderTopColor: "#243142",
  },
  dueDateValue: {
    color: "#38BDF8",
    fontSize: 14,
    fontWeight: "500",
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  rowLabel: {
    color: "#E2E8F0",
    fontSize: 14,
  },
  segmentRow: {
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#334155",
    overflow: "hidden",
    marginBottom: 18,
  },
  segmentTab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 11,
    backgroundColor: "#161F2D",
  },
  segmentTabBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#334155",
  },
  segmentTabActive: {
    backgroundColor: "#35495C",
  },
  segmentText: {
    color: "#F1F5F9",
    fontSize: 14,
    fontWeight: "600",
  },
  sectionStack: {
    gap: 14,
  },
  sectionTitle: {
    color: "#F1F5F9",
    fontSize: 17,
    fontWeight: "600",
  },
  cardBox: {
    backgroundColor: "#1A2332",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#283548",
    paddingHorizontal: 14,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#243142",
    gap: 12,
  },
  actionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    flex: 1,
  },
  actionTitle: {
    color: "#F1F5F9",
    fontSize: 15,
    fontWeight: "500",
  },
  chevronCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#38BDF8",
    alignItems: "center",
    justifyContent: "center",
  },
  blueMetaValue: {
    color: "#38BDF8",
    fontSize: 14,
    fontWeight: "500",
  },
  paymentCard: {
    flexDirection: "row",
    backgroundColor: "#1A2332",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#283548",
    overflow: "hidden",
  },
  paymentKindCol: {
    width: 112,
    backgroundColor: "#161E2B",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    gap: 8,
    borderRightWidth: 1,
    borderRightColor: "#283548",
  },
  paymentKindTitle: {
    color: "#F1F5F9",
    fontSize: 15,
    fontWeight: "600",
  },
  discrepancyBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#F87171",
    backgroundColor: "rgba(248, 113, 113, 0.12)",
  },
  discrepancyBadgeText: {
    color: "#FCA5A5",
    fontSize: 11,
    fontWeight: "600",
  },
  paymentDetailsCol: {
    flex: 1,
    padding: 12,
    gap: 10,
  },
  paymentDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  paymentDetailLabel: {
    color: "#E2E8F0",
    fontSize: 14,
  },
  approvedStatus: {
    color: "#4ADE80",
    fontSize: 14,
    fontWeight: "600",
  },
  voidRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 2,
  },
  voidPillBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#243040",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  voidPillText: {
    color: "#F87171",
    fontSize: 13,
    fontWeight: "600",
  },
  tenantCard: {
    backgroundColor: "#1A2332",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#283548",
    padding: 14,
    gap: 12,
  },
  tenantRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tenantFooterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 2,
  },
  tenantActionsRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  tenantTrashBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#243040",
    alignItems: "center",
    justifyContent: "center",
  },
  tenantChevronBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#243040",
    alignItems: "center",
    justifyContent: "center",
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  bottomFloatingRow: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statementPillBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#065F73",
    paddingHorizontal: 22,
    paddingVertical: 15,
    borderRadius: 18,
    elevation: 5,
  },
  statementPillText: {
    color: "#F8FAFC",
    fontSize: 15,
    fontWeight: "600",
  },
  addTenantsBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#1E293B",
    borderWidth: 1,
    borderColor: "#334155",
    paddingHorizontal: 18,
    paddingVertical: 13,
    borderRadius: 14,
  },
  addTenantsText: {
    color: "#CBD5E1",
    fontSize: 14,
    fontWeight: "600",
  },
  infoCircleBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: "#38BDF8",
    backgroundColor: "#121824",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomPaymentsBar: {
    position: "absolute",
    left: 16,
    bottom: 18,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#243242",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#36475A",
    paddingVertical: 11,
    paddingHorizontal: 14,
  },
  paymentsFilterBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 6,
  },
  paymentsFilterText: {
    color: "#E2E8F0",
    fontSize: 14,
    fontWeight: "500",
  },
  verticalSep: {
    width: 1,
    height: 18,
    backgroundColor: "#475569",
    marginHorizontal: 8,
  },
});
