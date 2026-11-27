// components/roles/landlord/LandlordUnitDetailsScreen.tsx
import ChangeUnitRentModal from "@/components/ui/landlord/units/ChangeUnitRentModal";
import ConfirmLeaseDeletionModal from "@/components/ui/landlord/units/ConfirmLeaseDeletionModal";
import DeleteUnitModal from "@/components/ui/landlord/units/DeleteUnitModal";
import EditUnitImagesModal from "@/components/ui/landlord/units/EditUnitImagesModal";
import ToggleUnitVisibilityModal from "@/components/ui/landlord/units/ToggleUnitVisibilityModal";
import { UnitItem } from "@/components/ui/landlord/units/UnitCard";
import UnitLeasesFilterModal, {
  DEFAULT_UNIT_LEASE_FILTERS,
  UnitLeaseFilters,
} from "@/components/ui/landlord/units/UnitLeasesFilterModal";
import UnitLeasesList, {
  UnitLeaseItem,
} from "@/components/ui/landlord/units/UnitLeasesList";
import UnitLeasesSortModal, {
  LeaseSortOrder,
} from "@/components/ui/landlord/units/UnitLeasesSortModal";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { LandlordLeaseDetailsScreen } from "./LandlordLeaseDetailsScreen";
import { LandlordLeaseManagementScreen } from "./LandlordLeaseManagementScreen";

export interface DetailedUnitItem extends UnitItem {
  availableDate?: string;
  bathrooms?: number;
  amenities?: string[];
  images?: string[];
  isHidden?: boolean;
}

interface LandlordUnitDetailsScreenProps {
  unit: DetailedUnitItem;
  onBack: () => void;
  onEditUnit: (unit: DetailedUnitItem) => void;
  onDeleteUnit: (unit: DetailedUnitItem) => void;
  onShareUnit: (unit: DetailedUnitItem) => void;
  onApplyLease: (unit: DetailedUnitItem) => void;
  onToggleHidden: (unitId: string) => void;
  onUpdateRent: (unitId: string, newRentNumeric: string) => void;
  onUpdateImages: (unitId: string, updatedImages: string[]) => void;
}

type LeaseSubScreen =
  | { view: "management"; lease: UnitLeaseItem }
  | { view: "details"; lease: UnitLeaseItem }
  | null;

export function LandlordUnitDetailsScreen({
  unit,
  onBack,
  onEditUnit,
  onDeleteUnit,
  onShareUnit,
  onApplyLease,
  onToggleHidden,
  onUpdateRent,
  onUpdateImages,
}: LandlordUnitDetailsScreenProps) {
  const [activeSegment, setActiveSegment] = useState<"leases" | "info">(
    "leases",
  );
  const [isVisibilityModalOpen, setIsVisibilityModalOpen] = useState(false);
  const [isRentModalOpen, setIsRentModalOpen] = useState(false);
  const [isImagesModalOpen, setIsImagesModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isLeasesFilterOpen, setIsLeasesFilterOpen] = useState(false);
  const [isLeasesSortOpen, setIsLeasesSortOpen] = useState(false);
  const [leaseFilters, setLeaseFilters] = useState<UnitLeaseFilters>(
    DEFAULT_UNIT_LEASE_FILTERS,
  );
  const [leaseSortOrder, setLeaseSortOrder] =
    useState<LeaseSortOrder>("newest");

  const isHidden = Boolean(unit.isHidden);
  const numericRent = unit.rent.replace(/[^0-9]/g, "") || "5000";
  const availableDate = unit.availableDate || "Jul-06-2026";
  const bathrooms = unit.bathrooms ?? 1;
  const amenities = unit.amenities ?? ["Hot Shower"];
  const images = unit.images ?? [];

  const [leases, setLeases] = useState<UnitLeaseItem[]>([
    {
      id: "l1",
      status: "Rejected",
      balance: "KES 0",
      endDate: "Jul-31-2025",
      unitName: unit.name,
      tenantName: "Engeener Student",
      email: "com253221@students.mu.ac.ke",
      phone: "+254746 941498",
      rejectionReason: "Does not meet landlord's tenant criteria",
      buildingName: "Demo Building",
      monthlyRent: "KES 15,000.00",
      role: "Resident Lease Holder",
      movedInDate: "Apr-17-2025",
      leaseStartDate: "Apr-17-2025",
      dueDate: "May-01-2025",
    },
    {
      id: "l2",
      status: "Terminated",
      balance: "KES 211,300",
      endDate: "Apr-16-2026",
      unitName: unit.name,
      tenantName: "Wanjiku Mwangi + 2 other",
    },
  ]);

  const [leaseToDelete, setLeaseToDelete] = useState<UnitLeaseItem | null>(
    null,
  );

  const [leaseSubScreen, setLeaseSubScreen] = useState<LeaseSubScreen>(null);

  if (leaseSubScreen?.view === "details") {
    return (
      <LandlordLeaseDetailsScreen
        lease={leaseSubScreen.lease}
        onBack={() => setLeaseSubScreen(null)}
      />
    );
  }

  if (leaseSubScreen?.view === "management") {
    return (
      <LandlordLeaseManagementScreen
        lease={leaseSubScreen.lease}
        onBack={() => setLeaseSubScreen(null)}
        onDeleteLeaseConfirmed={(leaseId) => {
          setLeases((prev) => prev.filter((item) => item.id !== leaseId));
          setLeaseSubScreen(null);
        }}
        onActionPress={(actionKey, targetLease) => {
          console.log("Lease action pressed:", actionKey, targetLease.id);
        }}
        onViewTenantDetails={(tenant, targetLease) => {
          setLeaseSubScreen({
            view: "details",
            lease: {
              ...targetLease,
              tenantName: tenant.name,
              status: tenant.status,
              leaseStartDate: tenant.startDate,
              endDate: tenant.endDate,
              role: tenant.role,
            },
          });
        }}
        onAddTenantsPress={(targetLease) => {
          console.log("Add tenants to lease:", targetLease.id);
        }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryTopRow}>
            <Text style={styles.unitName}>{unit.name}</Text>

            <View style={styles.quickActionGroup}>
              <Pressable
                onPress={() => onShareUnit(unit)}
                style={styles.quickActionBtn}
              >
                <Ionicons name="share-social" size={16} color="#38BDF8" />
              </Pressable>

              <Pressable
                onPress={() => onEditUnit(unit)}
                style={styles.quickActionBtn}
              >
                <MaterialCommunityIcons
                  name="home-edit"
                  size={17}
                  color="#38BDF8"
                />
              </Pressable>

              <Pressable
                onPress={() => setIsDeleteModalOpen(true)}
                style={[styles.quickActionBtn, styles.deleteActionBtn]}
              >
                <Ionicons name="trash" size={16} color="#F87171" />
              </Pressable>
            </View>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.metaLabelGroup}>
              <MaterialCommunityIcons
                name="wallet-outline"
                size={18}
                color="#94A3B8"
              />
              <Text style={styles.metaLabel}>Rent</Text>
            </View>
            <Text style={styles.metaValueBlue}>{unit.rent}</Text>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.metaLabelGroup}>
              <MaterialCommunityIcons
                name="calendar-check-outline"
                size={18}
                color="#94A3B8"
              />
              <Text style={styles.metaLabel}>Available</Text>
            </View>
            <Text style={styles.metaValueBlue}>{availableDate}</Text>
          </View>

          {isHidden && (
            <View style={styles.hiddenBadgeRow}>
              <View style={styles.hiddenBadge}>
                <Text style={styles.hiddenBadgeText}>hidden</Text>
              </View>
            </View>
          )}
        </View>

        {/* Leases / Info Segmented Tabs */}
        <View style={styles.segmentContainer}>
          <Pressable
            onPress={() => setActiveSegment("leases")}
            style={[
              styles.segmentTab,
              activeSegment === "leases" && styles.segmentTabActive,
            ]}
          >
            <Ionicons
              name="home"
              size={17}
              color={activeSegment === "leases" ? "#FFFFFF" : "#CBD5E1"}
            />
            <Text
              style={[
                styles.segmentText,
                activeSegment === "leases" && styles.segmentTextActive,
              ]}
            >
              Leases
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveSegment("info")}
            style={[
              styles.segmentTab,
              activeSegment === "info" && styles.segmentTabActive,
            ]}
          >
            <MaterialCommunityIcons
              name="text-box-check-outline"
              size={18}
              color={activeSegment === "info" ? "#FFFFFF" : "#CBD5E1"}
            />
            <Text
              style={[
                styles.segmentText,
                activeSegment === "info" && styles.segmentTextActive,
              ]}
            >
              Info
            </Text>
          </Pressable>
        </View>

        {/* Tab Body */}
        {activeSegment === "leases" ? (
          <UnitLeasesList
            leases={leases}
            emptyMessage='No leases found. Tap the "+ lease" at the bottom right to apply a lease on behalf of a tenant.'
            onViewDetails={(lease) => {
              if (lease.status.toLowerCase() === "rejected") {
                setLeaseSubScreen({ view: "details", lease });
              } else {
                setLeaseSubScreen({ view: "management", lease });
              }
            }}
            onDeleteLease={(lease) => setLeaseToDelete(lease)}
          />
        ) : (
          <View style={styles.infoSection}>
            <Text style={styles.sectionHeading}>Unit Actions</Text>

            <View style={styles.cardGroup}>
              <Pressable
                onPress={() => setIsRentModalOpen(true)}
                style={styles.actionRow}
              >
                <View style={styles.actionLeft}>
                  <MaterialCommunityIcons
                    name="swap-horizontal"
                    size={22}
                    color="#38BDF8"
                  />
                  <Text style={styles.actionTitle}>Change unit rent</Text>
                </View>
                <View style={styles.chevronCircle}>
                  <Feather name="chevron-right" size={16} color="#0F172A" />
                </View>
              </Pressable>

              <Pressable
                onPress={() => setIsImagesModalOpen(true)}
                style={styles.actionRow}
              >
                <View style={styles.actionLeft}>
                  <MaterialCommunityIcons
                    name="image-plus"
                    size={22}
                    color="#38BDF8"
                  />
                  <Text style={styles.actionTitle}>Update unit images</Text>
                </View>
                <View style={styles.chevronCircle}>
                  <Feather name="chevron-right" size={16} color="#0F172A" />
                </View>
              </Pressable>

              <Pressable
                onPress={() => setIsVisibilityModalOpen(true)}
                style={[styles.actionRow, styles.actionRowLast]}
              >
                <View style={styles.actionLeft}>
                  <Ionicons
                    name={isHidden ? "eye-outline" : "eye-off-outline"}
                    size={22}
                    color="#38BDF8"
                  />
                  <View style={styles.actionTextCol}>
                    <Text style={styles.actionTitle}>
                      {isHidden
                        ? "Show unit to public"
                        : "Hide unit from public"}
                    </Text>
                    <Text style={styles.actionSubtext}>
                      {isHidden
                        ? "Making this unit public will allow tenants to see it when searching within this building."
                        : "Hiding this unit will prevent tenants from seeing it in search results for this building."}
                    </Text>
                  </View>
                </View>
                <View style={styles.chevronCircle}>
                  <Feather name="chevron-right" size={16} color="#0F172A" />
                </View>
              </Pressable>
            </View>

            <Text style={styles.sectionHeading}>Unit Details</Text>
            <View style={styles.cardGroup}>
              <View style={styles.detailRow}>
                <View style={styles.detailLeft}>
                  <MaterialCommunityIcons
                    name="wallet-outline"
                    size={20}
                    color="#38BDF8"
                  />
                  <Text style={styles.detailLabel}>Rent</Text>
                </View>
                <Text style={styles.detailValue}>{unit.rent}</Text>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailLeft}>
                  <MaterialCommunityIcons
                    name="calendar-check-outline"
                    size={20}
                    color="#38BDF8"
                  />
                  <Text style={styles.detailLabel}>Available</Text>
                </View>
                <Text style={styles.detailValue}>{availableDate}</Text>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailLeft}>
                  <Ionicons name="home-outline" size={20} color="#38BDF8" />
                  <Text style={styles.detailLabel}>Type</Text>
                </View>
                <Text style={styles.detailValue}>{unit.type}</Text>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailLeft}>
                  <Ionicons name="bed-outline" size={20} color="#38BDF8" />
                  <Text style={styles.detailLabel}>Bedrooms</Text>
                </View>
                <Text style={styles.detailValue}>{unit.bedrooms}</Text>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailLeft}>
                  <MaterialCommunityIcons
                    name="bathtub-outline"
                    size={20}
                    color="#38BDF8"
                  />
                  <Text style={styles.detailLabel}>Bathrooms</Text>
                </View>
                <Text style={styles.detailValue}>{bathrooms}</Text>
              </View>

              <View style={[styles.detailRow, styles.actionRowLast]}>
                <View style={styles.detailLeft}>
                  <MaterialCommunityIcons
                    name="home-alert-outline"
                    size={20}
                    color="#38BDF8"
                  />
                  <Text style={styles.detailLabel}>Unit status</Text>
                </View>
                <Text style={styles.detailValue}>{unit.status}</Text>
              </View>
            </View>

            <Text style={styles.sectionHeading}>Unit Amenities</Text>
            <View style={styles.amenitiesCard}>
              <View style={styles.amenityChipsRow}>
                {amenities.map((amenity) => (
                  <View key={amenity} style={styles.amenityChip}>
                    <MaterialCommunityIcons
                      name="shower-head"
                      size={16}
                      color="#38BDF8"
                    />
                    <Text style={styles.amenityChipText}>{amenity}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Floating Controls */}
      {activeSegment === "leases" ? (
        <View style={styles.bottomLeasesBar}>
          <View style={styles.filterSortGroup}>
            <Pressable
              onPress={() => setIsLeasesFilterOpen(true)}
              style={styles.filterSortBtn}
            >
              <Ionicons name="options-outline" size={18} color="#E2E8F0" />
              <Text style={styles.filterSortText}>Filter</Text>
            </Pressable>
            <View style={styles.dividerVertical} />
            <Pressable
              onPress={() => setIsLeasesSortOpen(true)}
              style={styles.filterSortBtn}
            >
              <MaterialCommunityIcons
                name="sort-variant"
                size={18}
                color="#E2E8F0"
              />
              <Text style={styles.filterSortText}>Sort</Text>
            </Pressable>
          </View>

          <Pressable
            onPress={() => onApplyLease(unit)}
            style={styles.plusLeaseBtn}
          >
            <Ionicons name="add" size={20} color="#F8FAFC" />
            <Text style={styles.plusLeaseText}>Lease</Text>
          </Pressable>
        </View>
      ) : (
        <Pressable
          onPress={() => onApplyLease(unit)}
          style={styles.floatingPlusLeaseBtn}
        >
          <Ionicons name="add" size={20} color="#F8FAFC" />
          <Text style={styles.plusLeaseText}>Lease</Text>
        </Pressable>
      )}

      {/* Modals */}
      <ToggleUnitVisibilityModal
        visible={isVisibilityModalOpen}
        unitName={unit.name}
        isCurrentlyHidden={isHidden}
        onCancel={() => setIsVisibilityModalOpen(false)}
        onConfirm={() => {
          onToggleHidden(unit.id);
          setIsVisibilityModalOpen(false);
        }}
      />

      <ChangeUnitRentModal
        visible={isRentModalOpen}
        unitName={unit.name}
        currentRentNumeric={numericRent}
        onCancel={() => setIsRentModalOpen(false)}
        onSubmit={(newRentAmount) => {
          onUpdateRent(unit.id, newRentAmount);
          setIsRentModalOpen(false);
        }}
      />

      <EditUnitImagesModal
        visible={isImagesModalOpen}
        initialImages={images}
        onCancel={() => setIsImagesModalOpen(false)}
        onSave={(updatedImages) => {
          onUpdateImages(unit.id, updatedImages);
          setIsImagesModalOpen(false);
        }}
      />

      <DeleteUnitModal
        visible={isDeleteModalOpen}
        unitName={unit.name}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={(e) => {
          setIsDeleteModalOpen(false);
          e?.stopPropagation?.();
          onDeleteUnit(unit);
        }}
      />

      <UnitLeasesFilterModal
        visible={isLeasesFilterOpen}
        initialFilters={leaseFilters}
        onClose={() => setIsLeasesFilterOpen(false)}
        onApplyFilters={(filters) => {
          setLeaseFilters(filters);
        }}
      />

      <UnitLeasesSortModal
        visible={isLeasesSortOpen}
        selectedSort={leaseSortOrder}
        onSelectSort={(order) => setLeaseSortOrder(order)}
        onClose={() => setIsLeasesSortOpen(false)}
      />

      <ConfirmLeaseDeletionModal
        visible={Boolean(leaseToDelete)}
        leaseStatus={leaseToDelete?.status}
        onCancel={() => setLeaseToDelete(null)}
        onConfirm={() => {
          if (leaseToDelete) {
            setLeases((prev) =>
              prev.filter((item) => item.id !== leaseToDelete.id),
            );
          }
          setLeaseToDelete(null);
        }}
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
  topBar: {
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
    fontSize: 19,
    fontWeight: "600",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  summaryCard: {
    backgroundColor: "#1A2332",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#283548",
    padding: 14,
    marginBottom: 14,
  },
  summaryTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  unitName: {
    color: "#38BDF8",
    fontSize: 18,
    fontWeight: "600",
  },
  quickActionGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  quickActionBtn: {
    width: 30,
    height: 30,
    borderRadius: 6,
    backgroundColor: "#243447",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteActionBtn: {
    backgroundColor: "rgba(248, 113, 113, 0.16)",
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#243142",
  },
  metaLabelGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  metaLabel: {
    color: "#CBD5E1",
    fontSize: 14,
  },
  metaValueBlue: {
    color: "#38BDF8",
    fontSize: 14,
    fontWeight: "500",
  },
  hiddenBadgeRow: {
    alignItems: "flex-end",
    marginTop: 6,
  },
  hiddenBadge: {
    backgroundColor: "#FDBA74",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 3,
  },
  hiddenBadgeText: {
    color: "#1E293B",
    fontSize: 12,
    fontWeight: "600",
  },
  segmentContainer: {
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#334155",
    marginBottom: 20,
  },
  segmentTab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 11,
    backgroundColor: "#17202E",
  },
  segmentTabActive: {
    backgroundColor: "#33485B",
  },
  segmentText: {
    color: "#CBD5E1",
    fontSize: 14,
    fontWeight: "600",
  },
  segmentTextActive: {
    color: "#FFFFFF",
  },
  emptyLeasesBox: {
    paddingVertical: 24,
    paddingHorizontal: 12,
  },
  emptyLeasesText: {
    color: "#CBD5E1",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
  infoSection: {
    gap: 12,
  },
  sectionHeading: {
    color: "#F1F5F9",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
  },
  cardGroup: {
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
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#243142",
    gap: 12,
  },
  actionRowLast: {
    borderBottomWidth: 0,
  },
  actionLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  actionTextCol: {
    flex: 1,
    gap: 3,
  },
  actionTitle: {
    color: "#F1F5F9",
    fontSize: 15,
    fontWeight: "500",
  },
  actionSubtext: {
    color: "#94A3B8",
    fontSize: 13,
    lineHeight: 18,
  },
  chevronCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#38BDF8",
    alignItems: "center",
    justifyContent: "center",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#243142",
  },
  detailLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  detailLabel: {
    color: "#E2E8F0",
    fontSize: 14,
  },
  detailValue: {
    color: "#E2E8F0",
    fontSize: 14,
    fontWeight: "500",
  },
  amenitiesCard: {
    backgroundColor: "#1A2332",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#283548",
    padding: 14,
  },
  amenityChipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  amenityChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#2A394A",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
  },
  amenityChipText: {
    color: "#E2E8F0",
    fontSize: 14,
    fontWeight: "500",
  },
  bottomLeasesBar: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  filterSortGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#243242",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#36475A",
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  filterSortBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 6,
  },
  filterSortText: {
    color: "#E2E8F0",
    fontSize: 14,
    fontWeight: "500",
  },
  dividerVertical: {
    width: 1,
    height: 18,
    backgroundColor: "#475569",
    marginHorizontal: 8,
  },
  plusLeaseBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#065F73",
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 14,
    elevation: 4,
  },
  floatingPlusLeaseBtn: {
    position: "absolute",
    right: 16,
    bottom: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#065F73",
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 14,
    elevation: 4,
  },
  plusLeaseText: {
    color: "#F8FAFC",
    fontSize: 15,
    fontWeight: "600",
  },
});
