// components/ui/landlord/lease/leaseActionConfig.ts
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

export type LeaseActionKey =
  | "pay_rent"
  | "change_rent"
  | "refund_rent"
  | "waive_debt"
  | "adjust_grace_period"
  | "adjust_lease_end_date"
  | "terminate_lease"
  | "adjust_tenant_end_date"
  | "issue_notice_to_vacate"
  | "view_lease_agreement"
  | "lease_notes"
  | "update_tenant_photo_id"
  | "add_emergency_contact"
  | "edit_tenant_phone"
  | "understanding_lease_status";

export interface LeaseActionRowConfig {
  key: LeaseActionKey;
  title: string;
  iconName: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  iconColor?: string;
}

export const LEASE_ACTION_ITEMS: LeaseActionRowConfig[] = [
  {
    key: "pay_rent",
    title: "Pay rent (on tenant's behalf)",
    iconName: "cash-plus",
  },
  {
    key: "change_rent",
    title: "Change rent",
    iconName: "cash-multiple",
  },
  {
    key: "refund_rent",
    title: "Refund rent",
    iconName: "cash-refund",
  },
  {
    key: "waive_debt",
    title: "Waive debt",
    iconName: "cancel",
    iconColor: "#CBD5E1",
  },
  {
    key: "adjust_grace_period",
    title: "Adjust grace period",
    iconName: "clock-edit-outline",
  },
  {
    key: "adjust_lease_end_date",
    title: "Adjust lease end date",
    iconName: "calendar-plus",
  },
  {
    key: "terminate_lease",
    title: "Terminate lease",
    iconName: "calendar-remove",
  },
  {
    key: "adjust_tenant_end_date",
    title: "Adjust tenant end date",
    iconName: "calendar-plus",
  },
  {
    key: "issue_notice_to_vacate",
    title: "Issue notice to vacate",
    iconName: "calendar-minus",
  },
  {
    key: "view_lease_agreement",
    title: "View lease agreement",
    iconName: "file-document-edit-outline",
  },
  {
    key: "lease_notes",
    title: "Lease notes",
    iconName: "note-text-outline",
  },
  {
    key: "update_tenant_photo_id",
    title: "Update tenant photo ID",
    iconName: "card-account-details-outline",
  },
  {
    key: "add_emergency_contact",
    title: "Add Emergency Contact",
    iconName: "account-box-outline",
  },
  {
    key: "edit_tenant_phone",
    title: "Edit tenant(s) Phone Number",
    iconName: "account-edit-outline",
  },
  {
    key: "understanding_lease_status",
    title: "Understanding Lease Status",
    iconName: "playlist-check",
  },
];

export const LEASE_BANNERS = {
  noOverpaymentRefund: "You cannot refund when there is no overpayment",
  pendingRequestsTerminate:
    "There are pending requests in action tab for this lease. If you proceed the requests will be deleted.",
  dailyBillingInfo:
    "When billing cycle is daily, rent is calculated on a daily basis and only for the days actually lived in the unit, not the whole month.",
  monthlyDiscountOnly:
    "Setting discounts is only available for leases with a monthly billing cycle. Please switch to a monthly billing cycle to continue.",
  statementAndProrateInfo:
    "Changes made on this page will apply to the current lease only.\nProrate means to apportion the rent to cover the partial period in the month that the tenant actually lived in the unit.",
  noChangesMade: "No changes made on the lease.",
} as const;
