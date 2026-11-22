// components/ui/landlord/lease/LeasePaymentActionsSection.tsx
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Switch, View } from "react-native";
import { Text } from "react-native-paper";

interface LeasePaymentActionsSectionProps {
  billingCycle: string;
  securityDepositLabel?: string;
  lateFeeLabel?: string;
  monthlyDiscountLabel?: string;
  prorateFirstMonth: boolean;
  prorateFinalMonth: boolean;
  onCycleBillingCycle: () => void;
  onPressInfo: () => void;
  onEditSecurityDeposit: () => void;
  onEditLateFee: () => void;
  onEditMonthlyDiscount: () => void;
  onToggleProrateFirstMonth: () => void;
  onToggleProrateFinalMonth: () => void;
}

export default function LeasePaymentActionsSection({
  billingCycle,
  securityDepositLabel = "Security Deposit KES 15,000",
  lateFeeLabel = "Late Payment Fee 10%",
  monthlyDiscountLabel = "Monthly discount KES 0",
  prorateFirstMonth,
  prorateFinalMonth,
  onCycleBillingCycle,
  onPressInfo,
  onEditSecurityDeposit,
  onEditLateFee,
  onEditMonthlyDiscount,
  onToggleProrateFirstMonth,
  onToggleProrateFinalMonth,
}: LeasePaymentActionsSectionProps) {
  return (
    <>
      <View style={styles.paymentActionsHeader}>
        <Text style={styles.sectionTitle}>Payment Actions</Text>
        <Pressable onPress={onPressInfo} hitSlop={8}>
          <Ionicons name="alert-circle-outline" size={20} color="#E2E8F0" />
        </Pressable>
      </View>

      <View style={styles.cardBox}>
        <View style={styles.billingCycleBlock}>
          <Text style={styles.floatingFieldLabel}>Billing Cycle</Text>
          <Pressable
            onPress={onCycleBillingCycle}
            style={styles.billingDropdown}
          >
            <Text style={styles.billingValue}>{billingCycle}</Text>
            <Ionicons name="caret-down" size={14} color="#E2E8F0" />
          </Pressable>
        </View>

        <View style={styles.configRow}>
          <MaterialCommunityIcons name="cash-lock" size={20} color="#38BDF8" />
          <View style={styles.configTextCol}>
            <Text style={styles.configTitle}>{securityDepositLabel}</Text>
            <Text style={styles.configSubtitle}>
              Require a security deposit for new lease applications.
            </Text>
          </View>
          <Pressable onPress={onEditSecurityDeposit} hitSlop={8}>
            <Feather name="edit-2" size={18} color="#94A3B8" />
          </Pressable>
        </View>

        <View style={styles.configRow}>
          <MaterialCommunityIcons name="cash-clock" size={20} color="#38BDF8" />
          <View style={styles.configTextCol}>
            <Text style={styles.configTitle}>{lateFeeLabel}</Text>
            <Text style={styles.configSubtitle}>
              Impose a fee for late payment of rent.
            </Text>
          </View>
          <Pressable onPress={onEditLateFee} hitSlop={8}>
            <Feather name="edit-2" size={18} color="#94A3B8" />
          </Pressable>
        </View>

        <View style={styles.simpleConfigRow}>
          <MaterialCommunityIcons
            name="percent-outline"
            size={20}
            color="#38BDF8"
          />
          <Text style={styles.configTitleFlex}>{monthlyDiscountLabel}</Text>
          <Pressable onPress={onEditMonthlyDiscount} hitSlop={8}>
            <Feather name="edit-2" size={18} color="#38BDF8" />
          </Pressable>
        </View>

        <View style={styles.simpleConfigRow}>
          <MaterialCommunityIcons name="key-change" size={20} color="#38BDF8" />
          <Text style={styles.configTitleFlex}>Prorate First Month</Text>
          <Switch
            value={prorateFirstMonth}
            onValueChange={onToggleProrateFirstMonth}
            trackColor={{ false: "#475569", true: "#0D9488" }}
            thumbColor="#F8FAFC"
          />
        </View>

        <View style={[styles.simpleConfigRow, styles.lastRow]}>
          <MaterialCommunityIcons name="key-change" size={20} color="#38BDF8" />
          <Text style={styles.configTitleFlex}>Prorate Final Month</Text>
          <Switch
            value={prorateFinalMonth}
            onValueChange={onToggleProrateFinalMonth}
            trackColor={{ false: "#475569", true: "#0D9488" }}
            thumbColor="#F8FAFC"
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  paymentActionsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
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
  billingCycleBlock: {
    position: "relative",
    marginTop: 16,
    marginBottom: 8,
  },
  floatingFieldLabel: {
    position: "absolute",
    top: -9,
    left: 12,
    zIndex: 2,
    backgroundColor: "#1A2332",
    paddingHorizontal: 6,
    color: "#CBD5E1",
    fontSize: 12,
  },
  billingDropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#64748B",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  billingValue: {
    color: "#F8FAFC",
    fontSize: 15,
  },
  configRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#243142",
  },
  configTextCol: {
    flex: 1,
    gap: 2,
  },
  configTitle: {
    color: "#F1F5F9",
    fontSize: 15,
    fontWeight: "500",
  },
  configSubtitle: {
    color: "#94A3B8",
    fontSize: 13,
    lineHeight: 18,
  },
  simpleConfigRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#243142",
    gap: 12,
  },
  configTitleFlex: {
    flex: 1,
    color: "#F1F5F9",
    fontSize: 15,
    fontWeight: "500",
  },
  lastRow: {
    borderBottomWidth: 0,
  },
});
