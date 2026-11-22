// components/roles/landlord/UnderstandingLeaseStatusesScreen.tsx
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

interface UnderstandingLeaseStatusesScreenProps {
  onBack?: () => void;
}

interface LeaseStatusGuideItem {
  key: string;
  title: string;
  titleColor: string;
  description: string;
  renderIcon: () => React.ReactNode;
}

const LEASE_STATUS_ITEMS: LeaseStatusGuideItem[] = [
  {
    key: "rejected",
    title: "Rejected",
    titleColor: "#94A3B8",
    description:
      "The tenant requested to lease a unit, but the property management denied the application.",
    renderIcon: () => <Ionicons name="ban-outline" size={24} color="#94A3B8" />,
  },
  {
    key: "approved",
    title: "Approved",
    titleColor: "#22C55E",
    description:
      "The tenant's lease application was approved by the property management.",
    renderIcon: () => (
      <Ionicons name="checkmark-circle" size={24} color="#22C55E" />
    ),
  },
  {
    key: "requested",
    title: "Requested",
    titleColor: "#F59E0B",
    description:
      "The tenant submitted a lease application that is awaiting approval from the property management.",
    renderIcon: () => (
      <MaterialCommunityIcons name="clock-check" size={24} color="#F59E0B" />
    ),
  },
  {
    key: "terminated",
    title: "Terminated",
    titleColor: "#94A3B8",
    description:
      "The lease was ended, either by property management or through the agreed-upon end date.",
    renderIcon: () => (
      <MaterialCommunityIcons name="account-off" size={24} color="#94A3B8" />
    ),
  },
  {
    key: "canceled",
    title: "Canceled",
    titleColor: "#94A3B8",
    description:
      "The tenant canceled their lease application before approval or commencement.",
    renderIcon: () => (
      <Ionicons name="close-circle" size={24} color="#94A3B8" />
    ),
  },
  {
    key: "past_due",
    title: "Past Due",
    titleColor: "#F87171",
    description:
      "The lease payment is overdue (past due date) and needs immediate attention.",
    renderIcon: () => (
      <MaterialCommunityIcons name="alert-circle" size={24} color="#F87171" />
    ),
  },
  {
    key: "up_to_date",
    title: "Up To Date",
    titleColor: "#22C55E",
    description:
      "The tenant has no outstanding payments; all dues for the current period are settled.",
    renderIcon: () => (
      <Ionicons name="checkmark-circle-outline" size={24} color="#22C55E" />
    ),
  },
  {
    key: "upcoming",
    title: "Upcoming",
    titleColor: "#60A5FA",
    description:
      "The lease agreement is scheduled to start in the future and is not yet active.",
    renderIcon: () => (
      <MaterialCommunityIcons name="calendar-check" size={24} color="#60A5FA" />
    ),
  },
  {
    key: "due_soon",
    title: "Due Soon",
    titleColor: "#FACC15",
    description:
      "The lease payment is due within 5 days and urges prompt payment to avoid penalties.",
    renderIcon: () => (
      <MaterialCommunityIcons name="clock-alert" size={24} color="#FACC15" />
    ),
  },
  {
    key: "grace_period",
    title: "Grace Period",
    titleColor: "#F97316",
    description:
      "An additional period provided by the landlord, extending the original due date for the tenant to pay.",
    renderIcon: () => (
      <MaterialCommunityIcons name="calendar-clock" size={24} color="#F97316" />
    ),
  },
];

export function LandlordUnderstandingLeaseStatusesScreen({
  onBack,
}: UnderstandingLeaseStatusesScreenProps) {
  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "left", "right", "bottom"]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={onBack} hitSlop={10} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#E2E8F0" />
        </Pressable>
        <Text style={styles.headerTitle}>Understanding Lease Statuses</Text>
      </View>

      {/* Scrollable Status Guide */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {LEASE_STATUS_ITEMS.map((item) => (
          <View key={item.key} style={styles.statusRow}>
            <View style={styles.iconColumn}>{item.renderIcon()}</View>
            <View style={styles.textColumn}>
              <Text style={[styles.statusTitle, { color: item.titleColor }]}>
                {item.title}
              </Text>
              <Text style={styles.statusDescription}>{item.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    color: "#F8FAFC",
    fontSize: 20,
    fontWeight: "500",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 40,
    gap: 26,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 18,
  },
  iconColumn: {
    width: 28,
    paddingTop: 2,
    alignItems: "center",
  },
  textColumn: {
    flex: 1,
    gap: 4,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  statusDescription: {
    color: "#E2E8F0",
    fontSize: 15,
    lineHeight: 22,
  },
});
