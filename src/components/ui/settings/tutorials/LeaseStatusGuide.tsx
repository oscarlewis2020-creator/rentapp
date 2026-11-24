import { colors, fontSize } from "@/constants/typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

const STATUSES: {
  name: string;
  description: string;
  icon: IconName;
  color: string;
}[] = [
  {
    name: "Rejected",
    icon: "cancel",
    color: "#9EA5B1",
    description:
      "The tenant requested to lease a unit, but the property management denied the application.",
  },
  {
    name: "Approved",
    icon: "check-circle",
    color: "#3DDC4A",
    description:
      "The tenant's lease application was approved by the property management.",
  },
  {
    name: "Requested",
    icon: "clock-check",
    color: "#E8A838",
    description:
      "The tenant submitted a lease application that is awaiting approval from the property management.",
  },
  {
    name: "Terminated",
    icon: "account-cancel",
    color: "#9EA5B1",
    description:
      "The lease was ended, either by property management or through the agreed-upon end date.",
  },
  {
    name: "Canceled",
    icon: "close-circle",
    color: "#9EA5B1",
    description:
      "The tenant canceled their lease application before approval or commencement.",
  },
  {
    name: "Past Due",
    icon: "alert-circle",
    color: "#F4A6A6",
    description:
      "The lease payment is overdue (past due date) and needs immediate attention.",
  },
  {
    name: "Up To Date",
    icon: "check-circle-outline",
    color: "#3DDC4A",
    description:
      "The tenant has no outstanding payments; all dues for the current period are settled.",
  },
  {
    name: "Upcoming",
    icon: "calendar-check",
    color: "#75CCF5",
    description:
      "The lease agreement is scheduled to start in the future and is not yet active.",
  },
  {
    name: "Due Soon",
    icon: "clock-alert",
    color: "#F2C230",
    description:
      "The lease payment is due within 5 days and urges prompt payment to avoid penalties.",
  },
  {
    name: "Grace Period",
    icon: "calendar-clock",
    color: "#E0742A",
    description:
      "An additional period provided by the landlord, extending the original due date for the tenant to pay.",
  },
];

export default function LeaseStatusGuide() {
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      {STATUSES.map((s) => (
        <View key={s.name} style={styles.row}>
          <MaterialCommunityIcons name={s.icon} size={32} color={s.color} />
          <View style={styles.text}>
            <Text style={[styles.name, { color: s.color }]}>{s.name}</Text>
            <Text style={styles.description}>{s.description}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 16, paddingBottom: 40, gap: 22 },
  row: { flexDirection: "row", alignItems: "flex-start", gap: 14 },
  text: { flex: 1 },
  name: { fontSize: fontSize.body },
  description: {
    fontSize: fontSize.label,
    lineHeight: 22,
    color: colors.textPrimary,
    marginTop: 2,
  },
});
