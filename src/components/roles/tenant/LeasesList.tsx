import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export interface LeaseItem {
  id: string;
  building: string;
  unit: string;
  status: "Requested" | "Past Due" | "Canceled" | "Approved" | "Rejected";
  startDate: string;
  endDate: string;
}

const CANCELLATION_REASONS = [
  "Change of plans",
  "Found a better option",
  "Schedule conflict",
  "Financial constraints",
  "Incorrect booking details",
  "Decided not to proceed",
  "Booking made by mistake",
  "Unable to meet requirements",
  "Family emergency",
  "Health issues",
  "Other",
];

interface LeasesListProps {
  leases: LeaseItem[];
  onUpdateLeases: (updatedLeases: LeaseItem[]) => void;
  onSelectLeaseDetails?: (lease: LeaseItem) => void; // Triggered when tapping the info panel/arrow
}

export default function LeasesList({
  leases,
  onUpdateLeases,
  onSelectLeaseDetails,
}: LeasesListProps) {
  // Modal states
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [reasonsModalVisible, setReasonsModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const [selectedLeaseId, setSelectedLeaseId] = useState<string | null>(null);
  const [selectedReason, setSelectedReason] = useState<string>(
    "Cancellation reas...",
  );

  const handleOpenCancelModal = (id: string) => {
    setSelectedLeaseId(id);
    setSelectedReason("Cancellation reas...");
    setCancelModalVisible(true);
  };

  const handleOpenDeleteModal = (id: string) => {
    setSelectedLeaseId(id);
    setDeleteModalVisible(true);
  };

  const confirmCancelRequest = () => {
    if (!selectedLeaseId) return;
    const updated = leases.map((lease) =>
      lease.id === selectedLeaseId
        ? { ...lease, status: "Canceled" as const }
        : lease,
    );
    onUpdateLeases(updated);
    setCancelModalVisible(false);
    setSelectedLeaseId(null);
  };

  const confirmDeleteLease = () => {
    if (!selectedLeaseId) return;
    const updated = leases.filter((lease) => lease.id !== selectedLeaseId);
    onUpdateLeases(updated);
    setDeleteModalVisible(false);
    setSelectedLeaseId(null);
  };

  const getStatusColor = (status: LeaseItem["status"]) => {
    switch (status) {
      case "Requested":
        return "#f59e0b"; // Yellow/Orange
      case "Past Due":
      case "Rejected":
        return "#ef4444"; // Red
      case "Canceled":
        return "#9ca3af"; // Gray
      case "Approved":
        return "#10b981"; // Green
      default:
        return "#ffffff";
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {leases.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={48} color="#4b5563" />
            <Text style={styles.emptyText}>No lease requests found.</Text>
            <Text style={styles.emptySubText}>
              Search for properties and submit a lease request to see them here.
            </Text>
          </View>
        ) : (
          leases.map((lease) => (
            <TouchableOpacity
              key={lease.id}
              style={styles.card}
              activeOpacity={onSelectLeaseDetails ? 0.8 : 1}
              onPress={() =>
                onSelectLeaseDetails && onSelectLeaseDetails(lease)
              }
            >
              {/* Building Row */}
              <View style={styles.row}>
                <View style={styles.labelContainer}>
                  <Ionicons
                    name="home-outline"
                    size={16}
                    color="#9ca3af"
                    style={styles.rowIcon}
                  />
                  <Text style={styles.label}>Building</Text>
                </View>
                <Text style={styles.valueLink}>{lease.building}</Text>
              </View>

              {/* Unit Row */}
              <View style={styles.row}>
                <View style={styles.labelContainer}>
                  <MaterialCommunityIcons
                    name="bed-outline"
                    size={16}
                    color="#9ca3af"
                    style={styles.rowIcon}
                  />
                  <Text style={styles.label}>Unit</Text>
                </View>
                <Text style={styles.valueLink}>{lease.unit}</Text>
              </View>

              {/* Status Row */}
              <View style={styles.row}>
                <View style={styles.labelContainer}>
                  <MaterialCommunityIcons
                    name="swap-horizontal"
                    size={16}
                    color="#9ca3af"
                    style={styles.rowIcon}
                  />
                  <Text style={styles.label}>Status</Text>
                </View>
                <View style={styles.statusRightContainer}>
                  <Text
                    style={[
                      styles.statusValue,
                      { color: getStatusColor(lease.status) },
                    ]}
                  >
                    {lease.status}
                  </Text>
                  <View style={styles.arrowButton}>
                    <Ionicons
                      name="chevron-forward"
                      size={14}
                      color="#ffffff"
                    />
                    <Ionicons
                      name="chevron-forward"
                      size={14}
                      color="#ffffff"
                      style={{ marginLeft: -8 }}
                    />
                  </View>
                </View>
              </View>

              {/* Start Date Row */}
              <View style={styles.row}>
                <View style={styles.labelContainer}>
                  <Ionicons
                    name="calendar-outline"
                    size={16}
                    color="#9ca3af"
                    style={styles.rowIcon}
                  />
                  <Text style={styles.label}>Start Date</Text>
                </View>
                <Text style={styles.dateValue}>{lease.startDate}</Text>
              </View>

              {/* End Date Row */}
              <View style={styles.row}>
                <View style={styles.labelContainer}>
                  <Ionicons
                    name="calendar-outline"
                    size={16}
                    color="#9ca3af"
                    style={styles.rowIcon}
                  />
                  <Text style={styles.label}>End Date</Text>
                </View>
                <Text style={styles.dateValue}>{lease.endDate}</Text>
              </View>

              {/* Action Buttons based on Status */}
              {lease.status === "Requested" && (
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={(e) => {
                    e.stopPropagation();
                    handleOpenCancelModal(lease.id);
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.actionButtonText}>Cancel request</Text>
                </TouchableOpacity>
              )}

              {lease.status === "Canceled" && (
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={(e) => {
                    e.stopPropagation();
                    handleOpenDeleteModal(lease.id);
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.actionButtonText}>Delete lease</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* --- MODAL 1: Cancel Request Confirmation --- */}
      <Modal visible={cancelModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cancel request</Text>
            <Text style={styles.modalDescription}>
              Are you sure you want to cancel your lease application request?
            </Text>
            <Text style={styles.modalSubDescription}>
              Please let us know the reason for canceling your lease request.
            </Text>

            <TouchableOpacity
              style={styles.dropdownSelector}
              onPress={() => setReasonsModalVisible(true)}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="help-circle"
                  size={16}
                  color="#38bdf8"
                  style={{ marginRight: 8 }}
                />
                <Text
                  style={[
                    styles.dropdownText,
                    selectedReason !== "Cancellation reas..." && {
                      color: "#ffffff",
                    },
                  ]}
                >
                  {selectedReason}
                </Text>
              </View>
              <Ionicons name="chevron-down" size={18} color="#9ca3af" />
            </TouchableOpacity>

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                onPress={() => setCancelModalVisible(false)}
                style={styles.modalButtonClose}
              >
                <Text style={styles.modalButtonCloseText}>CLOSE</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={confirmCancelRequest}
                style={styles.modalButtonProceed}
              >
                <Text style={styles.modalButtonProceedText}>
                  PROCEED TO CANCEL
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* --- MODAL 2: Cancellation Reason Options Sheet --- */}
      <Modal visible={reasonsModalVisible} transparent animationType="slide">
        <View style={styles.sheetOverlay}>
          <View style={styles.sheetContent}>
            <View style={styles.sheetIndicator} />
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Cancellation reason</Text>
              <TouchableOpacity onPress={() => setReasonsModalVisible(false)}>
                <Ionicons name="close" size={22} color="#ffffff" />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {CANCELLATION_REASONS.map((reason, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.reasonRow}
                  onPress={() => {
                    setSelectedReason(reason);
                    setReasonsModalVisible(false);
                  }}
                >
                  <Text style={styles.reasonText}>{reason}</Text>
                  <View style={styles.checkboxOuter}>
                    {selectedReason === reason && (
                      <View style={styles.checkboxInner} />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* --- MODAL 3: Delete Lease Confirmation --- */}
      <Modal visible={deleteModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Delete lease</Text>
            <Text style={styles.modalDescription}>
              Are you sure you want to delete this lease? Please note, this
              action is irreversible.
            </Text>
            <Text
              style={[
                styles.modalSubDescription,
                { color: "#f87171", marginTop: 8 },
              ]}
            >
              Payments and tenants associated with this lease will also be
              deleted.
            </Text>

            <View style={[styles.modalButtonsRow, { marginTop: 24 }]}>
              <TouchableOpacity
                onPress={() => setDeleteModalVisible(false)}
                style={styles.modalButtonClose}
              >
                <Text style={styles.modalButtonCloseText}>CLOSE</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={confirmDeleteLease}
                style={styles.modalButtonClose}
              >
                <Text
                  style={[styles.modalButtonCloseText, { color: "#f87171" }]}
                >
                  DELETE
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
    paddingHorizontal: 20,
  },
  emptyText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
  },
  emptySubText: {
    color: "#9ca3af",
    fontSize: 13,
    textAlign: "center",
    marginTop: 6,
  },
  card: {
    backgroundColor: "#1f2937",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#374151",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#2d3748",
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowIcon: {
    marginRight: 8,
  },
  label: {
    color: "#9ca3af",
    fontSize: 14,
  },
  valueLink: {
    color: "#38bdf8",
    fontSize: 14,
    fontWeight: "500",
  },
  statusRightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusValue: {
    fontSize: 14,
    fontWeight: "600",
    marginRight: 6,
  },
  arrowButton: {
    backgroundColor: "#374151",
    borderRadius: 12,
    padding: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  dateValue: {
    color: "#38bdf8",
    fontSize: 14,
  },
  actionButton: {
    alignSelf: "flex-end",
    backgroundColor: "#1f2937",
    borderWidth: 1,
    borderColor: "#374151",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 12,
  },
  actionButtonText: {
    color: "#f87171",
    fontSize: 13,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#1f2937",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    maxWidth: 340,
    borderWidth: 1,
    borderColor: "#374151",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 10,
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 13,
    color: "#9ca3af",
    textAlign: "center",
    lineHeight: 18,
  },
  modalSubDescription: {
    fontSize: 13,
    color: "#9ca3af",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 18,
  },
  dropdownSelector: {
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#374151",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginTop: 16,
    marginBottom: 20,
  },
  dropdownText: {
    color: "#9ca3af",
    fontSize: 13,
  },
  modalButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButtonClose: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  modalButtonCloseText: {
    color: "#38bdf8",
    fontWeight: "700",
    fontSize: 13,
  },
  modalButtonProceed: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  modalButtonProceedText: {
    color: "#38bdf8",
    fontWeight: "700",
    fontSize: 13,
  },
  sheetOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "flex-end",
  },
  sheetContent: {
    backgroundColor: "#111827",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "75%",
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderWidth: 1,
    borderColor: "#374151",
  },
  sheetIndicator: {
    width: 36,
    height: 4,
    backgroundColor: "#4b5563",
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 8,
    marginBottom: 12,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1f2937",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  sheetTitle: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
  reasonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#1f2937",
  },
  reasonText: {
    color: "#ffffff",
    fontSize: 14,
  },
  checkboxOuter: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: "#38bdf8",
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxInner: {
    width: 10,
    height: 10,
    backgroundColor: "#38bdf8",
    borderRadius: 2,
  },
});
