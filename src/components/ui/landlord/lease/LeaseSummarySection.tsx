// components/ui/landlord/lease/LeaseSummarySection.tsx
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { UnitLeaseItem } from "../units/UnitLeasesList";

interface LeaseSummarySectionProps {
  lease: UnitLeaseItem;
  totalPaid?: string;
  historyStartDate?: string;
  historyAmount?: string;
}

export default function LeaseSummarySection({
  lease,
  totalPaid = "KES 10,200",
  historyStartDate = "Apr-17-2025",
  historyAmount = "KES 15,000",
}: LeaseSummarySectionProps) {
  return (
    <>
      <Text style={styles.sectionTitle}>Lease Summary</Text>

      <View style={styles.cardBox}>
        <View style={styles.summaryMetaRow}>
          <View style={styles.rowLeft}>
            <MaterialCommunityIcons
              name="cash-multiple"
              size={19}
              color="#38BDF8"
            />
            <Text style={styles.rowLabel}>Current Rent</Text>
          </View>
          <Text style={styles.blueMetaValue}>
            {lease.monthlyRent || "KES 15,000"}
          </Text>
        </View>

        <View style={styles.summaryMetaRow}>
          <View style={styles.rowLeft}>
            <MaterialCommunityIcons
              name="cash-multiple"
              size={19}
              color="#38BDF8"
            />
            <Text style={styles.rowLabel}>Total Paid</Text>
          </View>
          <Text style={styles.blueMetaValue}>{totalPaid}</Text>
        </View>

        <View style={styles.summaryMetaRow}>
          <View style={styles.rowLeft}>
            <Ionicons name="time-outline" size={19} color="#38BDF8" />
            <Text style={styles.rowLabel}>Due Date</Text>
          </View>
          <Text style={styles.blueMetaValue}>
            {lease.dueDate || "Apr-17-2025"}
          </Text>
        </View>

        <View style={styles.summaryMetaRow}>
          <View style={styles.rowLeft}>
            <MaterialCommunityIcons
              name="calendar-check-outline"
              size={19}
              color="#38BDF8"
            />
            <Text style={styles.rowLabel}>Start Date</Text>
          </View>
          <Text style={styles.blueMetaValue}>
            {lease.leaseStartDate || "Apr-17-2025"}
          </Text>
        </View>

        <View style={styles.summaryMetaRow}>
          <View style={styles.rowLeft}>
            <MaterialCommunityIcons
              name="calendar-arrow-right"
              size={19}
              color="#38BDF8"
            />
            <Text style={styles.rowLabel}>End Date</Text>
          </View>
          <Text style={styles.blueMetaValue}>{lease.endDate}</Text>
        </View>

        <View style={[styles.rentHistoryBox, styles.lastRow]}>
          <Text style={styles.rentHistoryTitle}>Rent History</Text>
          <View style={styles.historyHeaderRow}>
            <View style={styles.rowLeft}>
              <MaterialCommunityIcons
                name="wallet-outline"
                size={18}
                color="#38BDF8"
              />
              <Text style={styles.historyHeaderText}>Starting On</Text>
            </View>
            <Text style={styles.historyHeaderText}>Amount</Text>
          </View>

          <View style={styles.historyItemRow}>
            <View style={styles.rowLeft}>
              <Feather name="minus" size={16} color="#94A3B8" />
              <Text style={styles.blueMetaValue}>{historyStartDate}</Text>
            </View>
            <Text style={styles.blueMetaValue}>{historyAmount}</Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  rowLabel: {
    color: "#E2E8F0",
    fontSize: 14,
  },
  summaryMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#243142",
  },
  blueMetaValue: {
    color: "#38BDF8",
    fontSize: 14,
    fontWeight: "500",
  },
  rentHistoryBox: {
    paddingVertical: 14,
    gap: 10,
  },
  rentHistoryTitle: {
    color: "#E2E8F0",
    fontSize: 15,
    fontWeight: "600",
  },
  historyHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  historyHeaderText: {
    color: "#CBD5E1",
    fontSize: 14,
    fontWeight: "500",
  },
  historyItemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
});
