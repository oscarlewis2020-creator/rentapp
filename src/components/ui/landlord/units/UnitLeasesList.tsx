// components/ui/landlord/units/UnitLeasesList.tsx
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export interface UnitLeaseItem {
  id: string;
  status: string;
  balance: string;
  endDate: string;
  unitName: string;
  tenantName: string;
  email?: string;
  phone?: string;
  rejectionReason?: string;
  buildingName?: string;
  monthlyRent?: string;
  role?: string;
  movedInDate?: string;
  leaseStartDate?: string;
  dueDate?: string;
  photoIdUri?: string | null;
  unitImageUri?: string | null;
}

interface UnitLeasesListProps {
  leases: UnitLeaseItem[];
  emptyMessage: string;
  onViewDetails: (lease: UnitLeaseItem) => void;
  onDeleteLease: (lease: UnitLeaseItem) => void;
}

export default function UnitLeasesList({
  leases,
  emptyMessage,
  onViewDetails,
  onDeleteLease,
}: UnitLeasesListProps) {
  if (leases.length === 0) {
    return (
      <View style={styles.emptyBox}>
        <Text style={styles.emptyText}>{emptyMessage}</Text>
      </View>
    );
  }

  const getStatusColor = (status: string) => {
    const normalized = status.toLowerCase();
    if (normalized === "rejected" || normalized === "past due")
      return "#F87171";
    if (normalized === "terminated" || normalized === "canceled")
      return "#FDBA74";
    if (normalized === "up to date" || normalized === "approved")
      return "#4ADE80";
    return "#38BDF8";
  };

  return (
    <View style={styles.listContainer}>
      {leases.map((lease) => {
        const statusColor = getStatusColor(lease.status);
        const balanceIsZero =
          lease.balance.trim() === "KES 0" || lease.balance.trim() === "0";

        return (
          <View key={lease.id} style={styles.leaseCard}>
            <View style={styles.cardBody}>
              {/* Status */}
              <View style={styles.fieldRow}>
                <View style={styles.fieldLeft}>
                  <MaterialCommunityIcons
                    name="playlist-check"
                    size={18}
                    color="#94A3B8"
                  />
                  <Text style={styles.fieldLabel}>Status</Text>
                </View>
                <Text style={[styles.fieldValue, { color: statusColor }]}>
                  {lease.status}
                </Text>
              </View>

              {/* Balance */}
              <View style={styles.fieldRow}>
                <View style={styles.fieldLeft}>
                  <MaterialCommunityIcons
                    name="cash-100"
                    size={18}
                    color="#94A3B8"
                  />
                  <Text style={styles.fieldLabel}>Balance</Text>
                </View>
                <Text
                  style={[
                    styles.fieldValue,
                    { color: balanceIsZero ? "#4ADE80" : "#F87171" },
                  ]}
                >
                  {lease.balance}
                </Text>
              </View>

              {/* End Date */}
              <View style={styles.fieldRow}>
                <View style={styles.fieldLeft}>
                  <MaterialCommunityIcons
                    name="calendar-arrow-right"
                    size={18}
                    color="#94A3B8"
                  />
                  <Text style={styles.fieldLabel}>End Date</Text>
                </View>
                <Text style={styles.fieldValueBlue}>{lease.endDate}</Text>
              </View>

              {/* Unit */}
              <View style={styles.fieldRow}>
                <View style={styles.fieldLeft}>
                  <MaterialCommunityIcons
                    name="bed-outline"
                    size={18}
                    color="#94A3B8"
                  />
                  <Text style={styles.fieldLabel}>Unit</Text>
                </View>
                <Text style={styles.fieldValueBlue}>{lease.unitName}</Text>
              </View>

              {/* Tenant Name */}
              <View style={styles.fieldRow}>
                <View style={styles.fieldLeft}>
                  <Ionicons name="home-outline" size={18} color="#94A3B8" />
                  <Text style={styles.fieldLabel}>Tenant Name</Text>
                </View>
                <Text style={styles.fieldValueBlue}>{lease.tenantName}</Text>
              </View>

              {/* Delete Action Pill */}
              <View style={styles.deleteRow}>
                <Pressable
                  onPress={() => onDeleteLease(lease)}
                  style={styles.deletePillBtn}
                >
                  <Text style={styles.deletePillText}>Delete</Text>
                </Pressable>
              </View>
            </View>

            {/* Right View Details Chevrons */}
            <Pressable
              onPress={() => onViewDetails(lease)}
              style={styles.detailsArrowBtn}
              hitSlop={8}
            >
              <Feather name="chevrons-right" size={18} color="#E2E8F0" />
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  emptyBox: {
    paddingVertical: 24,
    paddingHorizontal: 12,
  },
  emptyText: {
    color: "#CBD5E1",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
  listContainer: {
    gap: 14,
  },
  leaseCard: {
    backgroundColor: "#1A2332",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#283548",
    paddingVertical: 14,
    paddingLeft: 14,
    paddingRight: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  cardBody: {
    flex: 1,
    gap: 10,
  },
  fieldRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  fieldLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minWidth: 115,
  },
  fieldLabel: {
    color: "#E2E8F0",
    fontSize: 14,
  },
  fieldValue: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "right",
    flex: 1,
  },
  fieldValueBlue: {
    color: "#38BDF8",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "right",
    flex: 1,
  },
  deleteRow: {
    alignItems: "flex-end",
    marginTop: 4,
  },
  deletePillBtn: {
    backgroundColor: "#243040",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 8,
    paddingHorizontal: 22,
    paddingVertical: 7,
  },
  deletePillText: {
    color: "#F87171",
    fontSize: 14,
    fontWeight: "500",
  },
  detailsArrowBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#243242",
    borderWidth: 1,
    borderColor: "#36475A",
    alignItems: "center",
    justifyContent: "center",
  },
});
