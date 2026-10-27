// components/roles/landlord/LandlordActionView.tsx
import { ScrollView, StyleSheet } from "react-native";
import { ActionField, GenericActionCard } from "./GenericActionCard";

export function LandlordActionView() {
  const leaseFields: ActionField[] = [
    {
      label: "Lease Status",
      value: "Requested",
      icon: "home-outline",
      valueColor: "#F39C12",
    },
    { label: "Start Date", value: "Apr-18-2025", icon: "calendar-outline" },
    { label: "End Date", value: "Apr-17-2026", icon: "calendar-sharp" },
    { label: "Building", value: "Demo Building", icon: "business-outline" },
    { label: "Unit", value: "Room 4", icon: "cube-outline" },
    { label: "Tenant", value: "Jerome Jumah", icon: "person-add-outline" },
  ];

  const tenancyFields: ActionField[] = [
    {
      label: "Tenant Name",
      value: "Kamau's Dad",
      icon: "business",
      isMaterialIcon: true,
    },
    {
      label: "Tenant Role",
      value: "Resident Lease Holder",
      icon: "id-card-outline",
    },
    {
      label: "Building Name",
      value: "Demo Building",
      icon: "business-outline",
    },
    { label: "Unit Name", value: "Room 2", icon: "cube-outline" },
    { label: "Start Date", value: "Apr-17-2025", icon: "calendar-outline" },
    { label: "End Date", value: "Apr-16-2026", icon: "calendar-sharp" },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <GenericActionCard
        title="Leases"
        fields={leaseFields}
        processLabel="Process Lease"
        onReject={() => console.log("Lease Rejected")}
        onApprove={() => console.log("Lease Approved")}
        onDetails={() => console.log("Lease Details Opened")}
      />

      <GenericActionCard
        title="Tenancy"
        fields={tenancyFields}
        processLabel="Process Tenancy"
        onReject={() => console.log("Tenancy Rejected")}
        onApprove={() => console.log("Tenancy Approved")}
        onDetails={() => console.log("Tenancy Details Opened")}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, marginTop: 4 },
});
