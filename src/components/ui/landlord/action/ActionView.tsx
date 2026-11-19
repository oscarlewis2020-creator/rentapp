// components/roles/landlord/LandlordActionView.tsx
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import ApproveLeaseConfirmationModal from "../units/ApproveLeaseConfirmationModal";
import RejectLeaseConfirmationModal, {
  AnyRejectionReason,
} from "../units/RejectLeaseConfirmationModal";
import { ActionField, GenericActionCard } from "./GenericActionCard";

export interface LeaseActionSummary {
  id: string;
  tenantName: string;
  status: string;
  startDate: string;
  endDate: string;
  buildingName: string;
  unitName: string;
}

export interface TenancyActionSummary {
  id: string;
  tenantName: string;
  role: string;
  buildingName: string;
  unitName: string;
  startDate: string;
  endDate: string;
}

interface LandlordActionViewProps {
  onOpenLeaseDetails?: (lease: LeaseActionSummary) => void;
  onOpenTenancyDetails?: (tenancy: TenancyActionSummary) => void;
  onRejectLease?: (
    lease: LeaseActionSummary,
    reasons: AnyRejectionReason[],
  ) => void;
  onApproveLease?: (lease: LeaseActionSummary) => void;
  onRejectTenancy?: (
    tenancy: TenancyActionSummary,
    reasons: AnyRejectionReason[],
  ) => void;
  onApproveTenancy?: (tenancy: TenancyActionSummary) => void;
}

interface ActiveActionTarget {
  applicantName: string;
  entityType: "lease" | "tenancy";
}

export function LandlordActionView({
  onOpenLeaseDetails,
  onOpenTenancyDetails,
  onRejectLease,
  onApproveLease,
  onRejectTenancy,
  onApproveTenancy,
}: LandlordActionViewProps) {
  const [leaseStatus, setLeaseStatus] = useState("Requested");
  const [rejectTarget, setRejectTarget] = useState<ActiveActionTarget | null>(
    null,
  );
  const [approveTarget, setApproveTarget] = useState<ActiveActionTarget | null>(
    null,
  );

  const leaseData: LeaseActionSummary = {
    id: "lease-req-1",
    tenantName: "Jerome Jumah",
    status: "Requested",
    startDate: "Apr-18-2025",
    endDate: "Apr-17-2026",
    buildingName: "Demo Building",
    unitName: "Room 4",
  };

  const tenancyData: TenancyActionSummary = {
    id: "tenancy-req-1",
    tenantName: "Kamau's Dad",
    role: "Resident Lease Holder",
    buildingName: "Demo Building",
    unitName: "Room 2",
    startDate: "Apr-17-2025",
    endDate: "Apr-16-2026",
  };

  const leaseFields: ActionField[] = [
    {
      label: "Lease Status",
      value: leaseData.status,
      icon: "home-outline",
      valueColor: "#F39C12",
    },
    {
      label: "Start Date",
      value: leaseData.startDate,
      icon: "calendar-outline",
    },
    { label: "End Date", value: leaseData.endDate, icon: "calendar-sharp" },
    {
      label: "Building",
      value: leaseData.buildingName,
      icon: "business-outline",
    },
    { label: "Unit", value: leaseData.unitName, icon: "cube-outline" },
    {
      label: "Tenant",
      value: leaseData.tenantName,
      icon: "person-add-outline",
    },
  ];

  const tenancyFields: ActionField[] = [
    {
      label: "Tenant Name",
      value: tenancyData.tenantName,
      icon: "business",
      isMaterialIcon: true,
    },
    {
      label: "Tenant Role",
      value: tenancyData.role,
      icon: "id-card-outline",
    },
    {
      label: "Building Name",
      value: tenancyData.buildingName,
      icon: "business-outline",
    },
    { label: "Unit Name", value: tenancyData.unitName, icon: "cube-outline" },
    {
      label: "Start Date",
      value: tenancyData.startDate,
      icon: "calendar-outline",
    },
    { label: "End Date", value: tenancyData.endDate, icon: "calendar-sharp" },
  ];

  const handleConfirmReject = (reasons: AnyRejectionReason[]) => {
    if (!rejectTarget) return;

    if (rejectTarget.entityType === "lease") {
      setLeaseStatus("Rejected");
      onRejectLease?.({ ...leaseData, status: "Rejected" }, reasons);
    } else {
      onRejectTenancy?.(tenancyData, reasons);
    }

    setRejectTarget(null);
  };

  const handleConfirmApprove = () => {
    if (!approveTarget) return;

    if (approveTarget.entityType === "lease") {
      setLeaseStatus("Active");
      onApproveLease?.({ ...leaseData, status: "Active" });
    } else {
      onApproveTenancy?.(tenancyData);
    }

    setApproveTarget(null);
  };

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <GenericActionCard
          title="Leases"
          fields={leaseFields}
          processLabel="Process Lease"
          onReject={() =>
            setRejectTarget({
              applicantName: leaseData.tenantName,
              entityType: "lease",
            })
          }
          onApprove={() =>
            setApproveTarget({
              applicantName: leaseData.tenantName,
              entityType: "lease",
            })
          }
          onDetails={() => onOpenLeaseDetails?.(leaseData)}
        />

        <GenericActionCard
          title="Tenancy"
          fields={tenancyFields}
          processLabel="Process Tenancy"
          onReject={() =>
            setRejectTarget({
              applicantName: tenancyData.tenantName,
              entityType: "tenancy",
            })
          }
          onApprove={() =>
            setApproveTarget({
              applicantName: tenancyData.tenantName,
              entityType: "tenancy",
            })
          }
          onDetails={() => onOpenTenancyDetails?.(tenancyData)}
        />
      </ScrollView>

      <RejectLeaseConfirmationModal
        visible={rejectTarget !== null}
        applicantName={rejectTarget?.applicantName || ""}
        entityType={rejectTarget?.entityType || "lease"}
        onCancel={() => setRejectTarget(null)}
        onConfirmReject={handleConfirmReject}
      />

      <ApproveLeaseConfirmationModal
        visible={approveTarget !== null}
        entityType={approveTarget?.entityType || "lease"}
        onCancel={() => setApproveTarget(null)}
        onConfirmApprove={handleConfirmApprove}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, marginTop: 4 },
});
