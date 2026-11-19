// components/roles/landlord/LeaseApplicationDetailsScreen.tsx
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import ApproveLeaseConfirmationModal from "../../ui/landlord/units/ApproveLeaseConfirmationModal";
import RejectLeaseConfirmationModal, {
  AnyRejectionReason,
} from "../../ui/landlord/units/RejectLeaseConfirmationModal";

export interface LeaseRequestApplicantData {
  id: string;
  entityType?: "lease" | "tenancy";
  applicantName: string;
  email: string;
  phone: string;
  secondaryPhone?: string;
  buildingName: string;
  unitName: string;
  monthlyRent: string;
  leaseStatus: string;
  role: string;
  movedInDate: string;
  leaseStartDate: string;
  leaseEndDate: string;
  dueDate: string;
  photoIdLabel?: string;
  photoIdUrl?: string;
}

interface LeaseApplicationDetailsScreenProps {
  application: LeaseRequestApplicantData;
  onBack?: () => void;
  onApproveSuccess?: (applicationId: string) => void;
  onRejectSuccess?: (
    applicationId: string,
    reasons: AnyRejectionReason[],
  ) => void;
  onViewAgreementPress?: (application: LeaseRequestApplicantData) => void;
}

export function LandlordLeaseApplicationDetailsScreen({
  application,
  onApproveSuccess,
  onRejectSuccess,
  onViewAgreementPress,
}: LeaseApplicationDetailsScreenProps) {
  const [status, setStatus] = useState(application.leaseStatus || "Requested");
  const [isPhotoIdVisible, setIsPhotoIdVisible] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);

  // const isRequested = status.toLowerCase() === "requested";

  const resolvedEntityType: "lease" | "tenancy" =
    application.entityType ||
    (application.leaseStatus?.toLowerCase() === "terminated"
      ? "tenancy"
      : "lease");

  const isTenancy = resolvedEntityType === "tenancy";

  const handleConfirmReject = (reasons: AnyRejectionReason[]) => {
    setStatus("Rejected");
    setIsRejectModalOpen(false);
    onRejectSuccess?.(application.id, reasons);
  };

  const handleConfirmApprove = () => {
    setStatus("Active");
    setIsApproveModalOpen(false);
    onApproveSuccess?.(application.id);
  };

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Photo / ID & Decision Box */}
        <View style={styles.photoDecisionCard}>
          {isPhotoIdVisible && application.photoIdUrl ? (
            <Image
              source={{ uri: application.photoIdUrl }}
              style={styles.idImagePreview}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.noImagePlaceholder}>
              <Text style={styles.noImageText}>No image available</Text>
            </View>
          )}

          <View style={styles.photoIdRow}>
            <Text style={styles.photoIdLabel}>
              {isPhotoIdVisible && application.photoIdUrl
                ? "Photo ID"
                : application.photoIdLabel || "No photo Id"}
            </Text>

            <Pressable
              onPress={() => setIsPhotoIdVisible((prev) => !prev)}
              style={styles.eyeCircleBtn}
            >
              <Ionicons
                name={isPhotoIdVisible ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#94A3B8"
              />
            </Pressable>
          </View>

          <View style={styles.decisionButtonsRow}>
            <Pressable
              onPress={() => setIsRejectModalOpen(true)}
              style={[styles.rejectBtn]}
            >
              <Text style={styles.decisionBtnText}>
                {isTenancy ? "Reject Tenant" : "Reject Lease"}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setIsApproveModalOpen(true)}
              style={[styles.approveBtn]}
            >
              <Text style={styles.decisionBtnText}>
                {isTenancy ? "Approve Tenant" : "Approve Lease"}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Details Metadata List */}
        <View style={styles.detailsList}>
          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <Ionicons name="person" size={18} color="#E2E8F0" />
              <Text style={styles.detailLabel}>Name</Text>
            </View>
            <Text style={styles.detailValueBlue}>
              {application.applicantName}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <MaterialCommunityIcons
                name="email-outline"
                size={18}
                color="#E2E8F0"
              />
              <Text style={styles.detailLabel}>Email</Text>
            </View>
            <Text style={styles.detailLinkBlue}>{application.email}</Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <Ionicons name="call" size={18} color="#E2E8F0" />
              <Text style={styles.detailLabel}>Phone</Text>
            </View>
            <Text style={styles.detailLinkBlue}>{application.phone}</Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <Ionicons name="call" size={18} color="#E2E8F0" />
              <Text style={styles.detailLabel}>Secondary Phone</Text>
            </View>
            <Text style={styles.detailLinkBlue}>
              {application.secondaryPhone || application.phone}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <Ionicons name="home" size={18} color="#E2E8F0" />
              <Text style={styles.detailLabel}>Building Name</Text>
            </View>
            <Text style={styles.detailValueBlue}>
              {application.buildingName}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <MaterialCommunityIcons
                name="bed-outline"
                size={18}
                color="#E2E8F0"
              />
              <Text style={styles.detailLabel}>Unit Name</Text>
            </View>
            <Text style={styles.detailValueBlue}>{application.unitName}</Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <MaterialCommunityIcons
                name="cash-multiple"
                size={18}
                color="#E2E8F0"
              />
              <Text style={styles.detailLabel}>Monthly Rent</Text>
            </View>
            <Text style={styles.detailValueBlue}>
              {application.monthlyRent}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <MaterialCommunityIcons
                name="playlist-check"
                size={18}
                color="#E2E8F0"
              />
              <Text style={styles.detailLabel}>Lease Status</Text>
            </View>
            <Text
              style={[
                styles.statusValue,
                status.toLowerCase() === "rejected" && styles.rejectedStatus,
                status.toLowerCase() === "terminated" && styles.rejectedStatus,
                status.toLowerCase() === "active" && styles.approvedStatus,
              ]}
            >
              {status}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <MaterialCommunityIcons
                name="account-group-outline"
                size={18}
                color="#E2E8F0"
              />
              <Text style={styles.detailLabel}>Role</Text>
            </View>
            <Text style={styles.detailValueBlue}>{application.role}</Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <MaterialCommunityIcons
                name="calendar-arrow-right"
                size={18}
                color="#E2E8F0"
              />
              <Text style={styles.detailLabel}>Moved in on</Text>
            </View>
            <Text style={styles.detailValueBlue}>
              {application.movedInDate}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <MaterialCommunityIcons
                name="calendar-arrow-right"
                size={18}
                color="#E2E8F0"
              />
              <Text style={styles.detailLabel}>Lease Start Date</Text>
            </View>
            <Text style={styles.detailValueBlue}>
              {application.leaseStartDate}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <MaterialCommunityIcons
                name="calendar-arrow-right"
                size={18}
                color="#E2E8F0"
              />
              <Text style={styles.detailLabel}>Lease End Date</Text>
            </View>
            <Text style={styles.detailValueBlue}>
              {application.leaseEndDate}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <MaterialCommunityIcons
                name="playlist-check"
                size={18}
                color="#E2E8F0"
              />
              <Text style={styles.detailLabel}>Due Date</Text>
            </View>
            <Text style={styles.detailValueBlue}>{application.dueDate}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom-Right Floating Document Action Button */}
      <Pressable
        onPress={() => onViewAgreementPress?.(application)}
        style={styles.floatingDocBtn}
      >
        <Ionicons name="document-text-outline" size={24} color="#F8FAFC" />
      </Pressable>

      {/* Reject Lease Modal + Reason Selector */}
      <RejectLeaseConfirmationModal
        visible={isRejectModalOpen}
        applicantName={application.applicantName}
        entityType={resolvedEntityType}
        onCancel={() => setIsRejectModalOpen(false)}
        onConfirmReject={handleConfirmReject}
      />

      {/* Approve Lease Modal */}
      <ApproveLeaseConfirmationModal
        visible={isApproveModalOpen}
        entityType={resolvedEntityType}
        onCancel={() => setIsApproveModalOpen(false)}
        onConfirmApprove={handleConfirmApprove}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141619",
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%",
    alignSelf: "center",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  photoDecisionCard: {
    borderWidth: 1,
    borderColor: "#3B4048",
    borderRadius: 16,
    margin: 12,
    paddingTop: 42,
    paddingHorizontal: 14,
    paddingBottom: 16,
    backgroundColor: "#141619",
  },
  noImagePlaceholder: {
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  noImageText: {
    color: "#E2E8F0",
    fontSize: 16,
  },
  idImagePreview: {
    height: 190,
    width: "100%",
    borderRadius: 10,
    marginBottom: 8,
  },
  photoIdRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#3B4048",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 18,
  },
  photoIdLabel: {
    color: "#F1F5F9",
    fontSize: 22,
    fontWeight: "400",
  },
  eyeCircleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#26292E",
    alignItems: "center",
    justifyContent: "center",
  },
  decisionButtonsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14,
  },
  rejectBtn: {
    flex: 1,
    backgroundColor: "#9E0B1A",
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  approveBtn: {
    flex: 1,
    backgroundColor: "#044A67",
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledDecisionBtn: {
    opacity: 0.45,
  },
  decisionBtnText: {
    color: "#F8FAFC",
    fontSize: 16,
    fontWeight: "600",
  },
  detailsList: {
    paddingHorizontal: 16,
    marginTop: 6,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#252930",
    gap: 14,
  },
  detailLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  detailLabel: {
    color: "#E2E8F0",
    fontSize: 16,
    fontWeight: "400",
  },
  detailValueBlue: {
    color: "#7BC4FA",
    fontSize: 16,
    textAlign: "right",
    flexShrink: 1,
  },
  detailLinkBlue: {
    color: "#7BC4FA",
    fontSize: 16,
    textDecorationLine: "underline",
    textAlign: "right",
    flexShrink: 1,
  },
  statusValue: {
    color: "#F59E0B",
    fontSize: 16,
    fontWeight: "500",
  },
  rejectedStatus: {
    color: "#F87171",
  },
  approvedStatus: {
    color: "#4ADE80",
  },
  floatingDocBtn: {
    position: "absolute",
    right: 18,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: "#065F73",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },
});
