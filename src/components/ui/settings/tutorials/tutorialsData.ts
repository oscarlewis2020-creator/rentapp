import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

export type TutorialTab = "tenant" | "landlord" | "general";
type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

export interface TutorialItem {
  id: string;
  label: string;
}
export interface TutorialSection {
  title: string;
  icon: IconName;
  items: TutorialItem[];
}

const items = (prefix: string, labels: string[]): TutorialItem[] =>
  labels.map((label, i) => ({ id: `${prefix}-${i + 1}`, label }));

export const TAB_LABELS: { key: TutorialTab; label: string }[] = [
  { key: "tenant", label: "Tenant" },
  { key: "landlord", label: "Landlord" },
  { key: "general", label: "General" },
];

export const TUTORIALS: Record<TutorialTab, TutorialSection[]> = {
  tenant: [
    {
      title: "Property",
      icon: "home-search",
      items: items("t-property", ["Searching for a Property or Unit"]),
    },
    {
      title: "Lease",
      icon: "file-document",
      items: items("t-lease", [
        "Applying for a Lease",
        "Viewing Lease Details",
      ]),
    },
    {
      title: "Payment",
      icon: "credit-card",
      items: items("t-payment", ["Making Lease Payments"]),
    },
    {
      title: "Tenant Management",
      icon: "account-group",
      items: items("t-mgmt", ["Adding a Secondary Tenant"]),
    },
    {
      title: "Chat",
      icon: "chat",
      items: items("t-chat", [
        "Chatting as Tenant",
        "Managing chat as a Tenant",
      ]),
    },
  ],
  landlord: [
    {
      title: "Property",
      icon: "office-building",
      items: items("l-property", [
        "Creating a Building",
        "Editing a building",
        "Viewing Building Details",
        "Change building settings",
        "Share a property",
        "Deleting a property",
      ]),
    },
    {
      title: "Unit",
      icon: "home",
      items: items("l-unit", [
        "Creating a unit",
        "Editing a unit",
        "Viewing unit details",
        "Share a unit",
        "Deleting a unit",
      ]),
    },
    {
      title: "Inventory Items",
      icon: "clipboard-list",
      items: items("l-inventory", [
        "Creating Inventory Items",
        "Managing Inventory Items",
        "Approve and Reject Inventory Items",
      ]),
    },
    {
      title: "Wallet",
      icon: "wallet",
      items: items("l-wallet", [
        "Creating a wallet account",
        "Managing wallet account",
      ]),
    },
    {
      title: "Permissions",
      icon: "lock",
      items: items("l-perm", ["Creating a permission", "Managing permissions"]),
    },
    {
      title: "Lease",
      icon: "file-document",
      items: items("l-lease", [
        "Applying for a lease",
        "Viewing lease Details",
        "Approving and rejecting a lease",
        "Deleting inactive leases",
        "Managing leases",
      ]),
    },
    {
      title: "Payment",
      icon: "credit-card",
      items: items("l-payment", ["Approving and rejecting payments"]),
    },
    {
      title: "Tenant",
      icon: "account-group",
      items: items("l-tenant", ["Approving and rejecting tenancy"]),
    },
    {
      title: "Chat",
      icon: "chat",
      items: items("l-chat", [
        "Chatting with tenant",
        "Chatting with all tenants",
        "Manage chat",
      ]),
    },
  ],
  general: [
    {
      title: "User Profile",
      icon: "account-circle",
      items: items("g-profile", ["Editing Your User Profile"]),
    },
    {
      title: "Settings",
      icon: "cog",
      items: items("g-settings", ["Accessing Settings"]),
    },
    {
      title: "Notifications",
      icon: "bell",
      items: items("g-notif", [
        "Viewing Notifications",
        "Managing Notifications",
      ]),
    },
    {
      title: "Lease status",
      icon: "format-list-checks",
      items: items("g-status", ["Understanding lease status"]),
    },
  ],
};

export function findTutorial(id: string) {
  for (const tab of Object.keys(TUTORIALS) as TutorialTab[]) {
    for (const section of TUTORIALS[tab]) {
      const item = section.items.find((i) => i.id === id);
      if (item) return { ...item, section: section.title, tab };
    }
  }
  return null;
}
