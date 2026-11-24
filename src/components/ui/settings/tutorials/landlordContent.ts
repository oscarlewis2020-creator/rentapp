import type { TutorialContent } from "./tutorialContent";

export const LANDLORD_CONTENT: Record<string, TutorialContent> = {
  // ---------------- Property ----------------
  "l-property-1": {
    pageTitle: "Creating a Building",
    videoId: "https://youtu.be/RSRJ-YXYeiI?si=MG6xcJvUCKwEcbId",
    groups: [
      {
        steps: [
          "On the landlord home page, click 'Manage Properties.'",
          "Click the + (plus) button located at the bottom-right corner of the screen.",
          "Select the 'Add Building' option.",
          "Fill the form with the required details and submit",
        ],
      },
    ],
  },

  "l-property-2": {
    videoId: "https://youtu.be/LJQIAm9lCSI?si=ychM2TYBxA0x8G6L",
    groups: [
      {
        steps: [
          "On the landlord home page, click 'Manage Properties'.",
          "Click the 'Select a Building' input field to open the building selection bottom sheet, then choose the property you want to edit.",
          "Click the edit icon (the middle icon) on the selected building details card to navigate to the edit building form.",
          "Update the desired fields. Once done, click Submit.",
        ],
      },
    ],
  },

  "l-property-3": {
    groups: [
      {
        steps: [
          "On the landlord home page, click 'Manage Properties'.",
          "Click the 'Select a Building' input field to open the building selection bottom sheet, then choose the property you want to view.",
          "On 'Details' tab, click the property card to navigate to the property details screen, where you can view the property details, including its units and ratings.",
        ],
      },
    ],
  },

  "l-property-4": {
    videoId: "https://youtu.be/Y-SY4v6q1_Y?si=Pw9zJJo_t9WWWpHW",
    groups: [
      {
        steps: [
          "On the landlord home page, click the 'Manage Properties' button to navigate to the 'Manage Properties' screen.",
          "Open the 'Select a Property' bottom sheet by tapping the input field at the top of the screen, and then choose the desired property.",
          "Switch to the 'Actions' tab and select the 'Building Settings' option to navigate to the building settings page.",
          "Here, you can modify the payment configuration or lease default settings.",
        ],
      },
    ],
  },

  "l-property-5": {
    pageTitle: "Sharing a property",
    videoId: "https://youtu.be/DDkzBpOggjM?si=AsBU6EfhZt_xKnDb",
    groups: [
      {
        title: "Option 1",
        steps: [
          "On the landlord home page, click 'Manage Properties.'",
          "Click the 'Select a Building' input field to open the building selection bottom sheet, then choose the property you want to share.",
          "Click the share icon (first icon) on the property card to share.",
        ],
      },
      {
        title: "Option 2",
        steps: [
          "Navigate to the property details screen.",
          "Click the share icon (first icon) on the property card to share.",
        ],
      },
    ],
  },

  "l-property-6": {
    pageTitle: "Deleting property",
    videoId: "https://youtu.be/heIxsFQ4UTg?si=liFIq-J5QguLWzIf",
    groups: [
      {
        title: "Option 1",
        steps: [
          "On the landlord home page, click Manage Properties.",
          "Click the 'Select a Building' input field to open the building selection bottom sheet, then choose the property that you want to delete.",
          "Click the delete icon (third icon) on the property card to delete.",
        ],
      },
      {
        title: "Option 2",
        steps: [
          "Navigate to the property details screen.",
          "Click the delete icon (third icon) on the property card to delete.",
        ],
      },
    ],
  },

  // ---------------- Unit ----------------
  "l-unit-1": {
    pageTitle: "Creating a Unit",
    videoId: "https://youtu.be/rHBkRwOHf3A?si=9lzpgyiQ8gCKzEGx",
    groups: [
      {
        steps: [
          "On the landlord home page, click Manage Properties.",
          "Click the + (plus) button at the bottom-right corner of the screen.",
          "Select the Add Unit option.",
          "Complete the required fields in the form.",
          "Once done, click Submit.",
        ],
      },
    ],
  },

  "l-unit-2": {
    pageTitle: "Editing a unit",
    videoId: "https://youtu.be/BI05Zu9bc7Q?si=1kCucXCQMDr_bNEs",
    groups: [
      {
        steps: [
          "On the landlord home page, click 'Manage Properties'.",
          "Click the 'Select a Building' input field to open the building selection bottom sheet, then choose the property you want to edit.",
          "If the unit you want to edit is not displayed, click the 'Select a Unit' input field to open the unit selection bottom sheet, then select the unit you want to edit.",
          "Click the edit icon (the middle icon) on the displayed unit card.",
          "Update the desired fields. Once done, click Submit.",
        ],
      },
    ],
  },

  "l-unit-3": {
    videoId: "https://youtu.be/87coqlqz6zA?si=E5tfXpLzlLEdYH93",
    groups: [
      {
        title: "Option 1",
        steps: [
          "On the landlord home page, click 'Manage Properties'.",
          "Click the 'Select a Building' input field to open the building selection bottom sheet, then choose the property to view the unit details.",
          "Navigate to the property details screen.",
          "Under the 'Units' tab, click the unit card to navigate to the unit details screen.",
        ],
      },
      {
        title: "Option 2",
        steps: [
          "On the landlord home page, click 'Manage Properties'.",
          "Click the 'Select a Building' input field to open the building selection bottom sheet, then choose the property to view the unit details.",
          "If the unit you want to edit is not displayed, click the 'Select a Unit' input field to open the unit selection bottom sheet, then select the unit.",
          "Click the unit card to navigate to the unit details screen.",
        ],
      },
    ],
  },

  "l-unit-4": {
    pageTitle: "Sharing a unit",
    videoId: "https://youtu.be/Zybkr7lV5OE?si=LbaNX2bnnsW7_qtA",
    groups: [
      {
        title: "Option 1",
        steps: [
          "On the landlord home page, click 'Manage Properties'.",
          "Click the 'Select a Building' input field to open the building selection bottom sheet, then choose the property of the unit you want to share.",
          "If the unit is not displayed, click the 'Select a Unit' input field to open the unit selection bottom sheet, then select the unit you want to share",
          "Click the share icon (first icon) on the card to share.",
        ],
      },
      {
        title: "Option 2",
        steps: [
          "Navigate to the property details screen.",
          "Click the share icon (first icon) on any unit card to share the unit.",
        ],
      },
      {
        title: "Option 3",
        steps: [
          "Navigate to the unit details screen.",
          "Click the share icon (first icon) on the unit card to share the unit.",
        ],
      },
    ],
  },

  "l-unit-5": {
    pageTitle: "Deleting a unit",
    videoId: "https://youtu.be/e2zIYac8ZWo?si=jGms2bc7DOIDTkl_",
    groups: [
      {
        title: "Option 1",
        steps: [
          "On the landlord home page, click Manage Properties.",
          "Click the 'Select a Building' input field to open the building selection bottom sheet, then choose the property that has the unit you want to delete.",
          "If the unit you want to edit is not displayed, click the 'Select a Unit' input field to open the unit selection bottom sheet, then select the unit .",
          "Click the delete icon (third icon) on the card to delete.",
        ],
      },
      {
        title: "Option 2",
        steps: [
          "Navigate to the property details screen.",
          "Click the delete icon (third icon) on any unit card to delete the unit.",
        ],
      },
      {
        title: "Option 3",
        steps: [
          "Navigate to the unit details screen.",
          "Click the delete icon on the unit card to delete it.",
        ],
      },
    ],
  },

  // ---------------- Inventory ----------------
  "l-inventory-1": {
    pageTitle: "Creating inventory items",
    videoId: "https://youtu.be/VHdf6jaf5iA?si=B_hwHEkevUCUeUE0",
    groups: [
      {
        steps: [
          "On the landlord home page click 'Manage Properties'.",
          "Select a property from the 'Select a Building' input field at the top of the page.",
          "Switch to the 'Actions' tab and Select the inventory option",
          "Click the + button at the bottom-right corner of the inventory screen.",
          "Click the 'Add inventory item' button.",
          "Complete the required fields in the form.",
          "Once done, click Submit.",
        ],
      },
    ],
  },

  "l-inventory-2": {
    pageTitle: "Managing inventory items",
    videoId: "https://youtu.be/MQb61WbwTUA?si=PvVnx5e4jkvTNZMz",
    groups: [
      {
        steps: [
          "On the landlord home page click 'Manage Properties' button.",
          "Select a property from the 'Select a Building' input field at the top of the page.",
          "Under the 'Actions' tab click the 'Inventory' option to navigate you to the inventory details page.",
          "Choose the inventory item category you wish to manage. This will display a list of items within that specific category (If nothing is displayed proceed to add an inventory first.)",
          "Click the delete icon to delete the inventory item.",
          "Click on the 'More Options' menu to access options like 'View Details,' 'Change Quantity,' or 'View Updates.' Selecting an inventory item will open a bottom sheet with a detailed description of the item. Selecting 'View Updates' will display all pending and approved updates related to the inventory.",
        ],
      },
    ],
  },

  "l-inventory-3": {
    videoId: "https://youtu.be/IX0yjFLJuKY?si=3-29Y4y0YQIWMPfK",
    groups: [
      {
        title: "Option 1",
        steps: [
          "On the landlord home page, switch to the 'Action Requested' tab.",
          "Click on a Inventory items application card. On the inventory section.",
          "Click either the blue 'Approve' button to approve the application, the red 'Reject' button to reject, or click the tick icon to approve and the X icon to reject.",
        ],
      },
      {
        title: "Option 2",
        steps: [
          "(This feature is only accessible to property admins.)",
          "On the inventory items screen, select the category of inventory items where new items have been added.",
          "Click on 'View Updates'",
          "Navigate to the 'Pending Updates' tab to view all pending updates for the specific inventory. Click the check mark icon to approve an update, or the 'X' icon to reject it.",
        ],
      },
    ],
  },

  // ---------------- Wallet ----------------
  "l-wallet-1": {
    pageTitle: "Creating a wallet",
    videoId: "https://youtu.be/zvbegLgNdUo?si=Euwq6MGaYUvGJmzT",
    groups: [
      {
        steps: [
          "On the landlord home page, click 'Manage properties' button.",
          "From the 'Select a Building' input field at the top of the page, choose the property for which you want to create a wallet.",
          "Under 'Actions' tab, click the 'Wallets' option. This will navigate you to the wallet details screen.",
          "Click the 'Create Wallet' button at the bottom-right corner of the screen.",
          "Complete the required fields in the form.",
          "Once done, click Submit.",
        ],
      },
    ],
  },

  "l-wallet-2": {
    pageTitle: "Managing wallet account",
    videoId: "https://youtu.be/MyNu6Fwl5QY?si=XEDuWuIGc4gZkWBl",
    groups: [
      {
        steps: [
          "On the landlord home page click 'Manage Properties' button to navigate to the manage properties screen.",
          "Select a property from the Select a Property input field at the top of the page.",
          "Under 'Actions' tab click the 'Wallets' option. Here you navigate to a page where you can view a list of the property wallets.",
          "Click on the 'activate' switch icon to activate a wallet. (You must be a property admin to activate a wallet).",
          "Click the delete icon to delete the wallet. (You can only delete an inactive wallet).",
        ],
      },
    ],
  },

  // ---------------- Permissions ----------------
  "l-perm-1": {
    videoId: "https://youtu.be/ud7FKxWpXgI?si=w5WsENp7cINxqngQ",
    pageTitle: "Creating permission",
    groups: [
      {
        steps: [
          "On the landlord home page, click 'Manage Properties'.",
          "Click the 'Select a Property' text input to open the property selection bottom sheet, then choose a property",
          "Under the 'Actions' tab, select the 'Permissions' option to navigate you to the permissions screen",
          "Click the + button at the bottom-right corner of the screen to navigate you to 'Add permissions' form.",
          "Complete the required fields in the form.",
          "Once done, click Submit.",
        ],
      },
    ],
  },

  "l-perm-2": {
    pageTitle: "Managing permissions",
    videoId: "https://youtu.be/clrJ_46Uxac?si=MsJCO01lOVt8ZrI_",
    groups: [
      {
        steps: [
          "On the landlord home page click 'Manage Properties' button to navigate to the manage properties screen.",
          "Click the 'Select a Building' text input to open the property selection bottom sheet, then choose a property",
          "Under the 'Actions' tab, select the 'Permissions' option to navigate to the permission details screen.",
          "Click the 'Delete' icon button to revoke the user's managerial access to the associated property by removing their permission.",
          "Click the 'Edit' icon button to modify the user's managerial role associated with the property.",
        ],
      },
    ],
  },

  // ---------------- Lease ----------------
  "l-lease-1": {
    videoId: "https://youtu.be/CgqbS0NtICA?si=GwfDYx_FAKw_5-Eu",
    groups: [
      {
        steps: [
          "On the landlord home page, click Manage Properties.",
          "Click the + (plus) button at the bottom-right corner of the screen.",
          "Click the 'Apply For Lease' button.",
          "Complete the required fields in the form.",
          "Once done, click Submit.",
        ],
      },
    ],
  },

  "l-lease-2": {
    pageTitle: "Viewing lease details",
    videoId: "https://youtu.be/ugmEn_sriTU?si=AuUXjQr8zJX7vfWD",
    groups: [
      {
        title: "Option 1",
        steps: [
          "On the landlord home page, under the 'Leases' tab, click the lease card you want to view. This will navigate you to the lease details screen.",
        ],
      },
      {
        title: "Option 2",
        steps: [
          "On the landlord home page, click 'Manage Properties'.",
          "Click the 'Select a Building' input field to open the building selection bottom sheet, then choose the property you want to view its lease.",
          "If the unit you want to edit is not displayed, click the 'Select a Unit' input field to open the unit selection bottom sheet, then select the unit.",
          "If the lease you wish to view is not displayed, click on the 'Leases' tab and find the lease in the 'Upcoming', 'Terminated', or 'Rejected' sections.",
          "Click the lease card.",
        ],
      },
      {
        title: "Option 3",
        steps: [
          "On the landlord home page, click Manage Properties.",
          'Click the "Select a Building" input field to open the building selection bottom sheet, then choose the property you want to view its lease.',
          "Click the property card to navigate to the property details screen.",
          "On the 'Units' tab, click the unit card associated with the lease you want to view.",
          "Tap on the lease card to navigate to the Lease Details screen, where you can view and manage lease information.",
        ],
      },
    ],
  },
  "l-lease-3": {
    pageTitle: "Approving and Rejecting a lease",
    videoId: "https://youtu.be/0Hw28OUe4tc?si=90xEajNkwCs58-xB",
    groups: [
      {
        title: "Option 1",
        steps: [
          "On the landlord home page, switch to the 'Action Requested' tab (This tab is only visible when there are available pending requests), where you can view any pending lease applications",
          "Click on a lease application card under the lease section to navigate to the applied lease details screen.",
          "Click the blue 'Approve Lease' button to approve, or the red 'Reject Lease' button to reject the application.",
        ],
      },
      {
        title: "Option 2",
        steps: [
          "On the landlord home page, click the 'Action Requested' button.",
          "Click the tick icon on a lease application card to approve the lease application, or the X (cancel) icon to reject the lease.",
        ],
      },
    ],
  },

  "l-lease-4": {
    pageTitle: "Deleting inactive leases",
    videoId: "https://youtu.be/n1KXommUARw?si=nagSoxBDONjwxB1b",
    groups: [
      {
        steps: [
          "Navigate to the unit details screen.",
          'Click the "Inactive Leases" tab to view inactive leases.',
          "Click the delete icon on the inactive lease to delete it.",
        ],
      },
    ],
  },

  "l-lease-5": {
    pageTitle: "Managing leases",
    videoId: "https://youtu.be/ugmEn_sriTU?si=Z33a42PEtZ_jHHJl",
    groups: [
      {
        steps: [
          "On the 'Action' tab within the lease details screen, you can explore and perform various actions related to the lease.",
          "Use the 'Adjust Lease End Date' button to extend or shorten the tenant's stay period as needed.",
          "Use the 'Terminate lease' button to end the stay of a particular tenant.",
          "Use the 'Change rent' button to adjust the rent amount of a specific lease.",
          "Use the 'Issue Notice to Vacate' button to formally notify a tenant to vacate their unit one month from the date the notice is issued.",
          "Use the 'Pay Rent (on Tenant's Behalf)' button to make a rent payment for the tenant associated with the lease. A bottom sheet will appear, prompting you to select a payment method.",
        ],
      },
    ],
  },

  // // ---------------- Payment ----------------
  "l-payment-1": {
    pageTitle: "Approving and rejecting payments",
    videoId: "https://youtu.be/ywLhWoVtXzY?si=7-smL_EiHgGwjBOQ",
    groups: [
      {
        title: "Option 1",
        steps: [
          "On the landlord home page, click the 'Action Requested' tab.",
          "Click on a payment card under the Payments section.",
          "Click either the blue 'Approve button' to approve the payment, the red 'Reject button' to reject the payment, or the tick icon on the payment card to approve and the X icon to reject.",
        ],
      },
      {
        title: "Option 2",
        steps: [
          "Navigate to the lease details page.",
          "On the payments tab click on the pending payment application.",
          "Click either the blue Approve button to approve the payment, the red Reject button to reject the payment, or click the tick icon on the payment card to approve and the X icon to reject.",
        ],
      },
    ],
  },
  // ---------------- Tenant ----------------
  "l-tenant-1": {
    pageTitle: "Approving and rejecting tenancy",
    videoId: "https://youtu.be/DxVpRXMsBGs?si=XfIhYnKOahr-SJuV",
    groups: [
      {
        title: "Option 1",
        steps: [
          "On the landlord home page, switch to the 'Action Requested' tab.",
          "Click on a tenancy application card.",
          "Click either the blue 'Approve' button to approve the application, the red 'Reject' button to reject, or click the tick icon to approve and the X icon to reject.",
        ],
      },
      {
        title: "Option 2",
        steps: [
          "Navigate to the lease details screen.",
          "Switch to the tenant tab.",
          "Click the tenant application card. This will navigate you to the tenant details screen.",
          "Click the blue 'Approve' button to approve, the red 'Reject' button to reject, or click the tick icon on the card to approve and the X icon to reject.",
        ],
      },
    ],
  },

  // ---------------- Chat ----------------
  "l-chat-1": {
    pageTitle: "Chatting with tenants",
    videoId: "https://youtu.be/cyRP9WVAWs8?si=2eRBUOoZ09t21Aex",
    groups: [
      {
        steps: [
          "Click the chat icon button at the bottom tab of the screen to navigate to the chat screen.",
          "Click the chat icon floating action button at the bottom-right of the screen to navigate to the contact screen",
          'Click the "Select a Building" input field to open the building selection bottom sheet, then choose the property you want to chat with.',
          'Click the "Select a Unit" input field to open the unit selection bottom sheet, then select the unit you want to chat with',
          "Select the tenant card for the tenant you want to chat with.",
        ],
      },
    ],
  },

  "l-chat-2": {
    pageTitle: "Chatting with all tenants",
    videoId: "https://youtu.be/cyRP9WVAWs8?si=mEdiscEM12iEvKBV",
    groups: [
      {
        steps: [
          "Click the chat icon button at the bottom tab of the screen.",
          "Click the chat icon floating action button at the bottom-right of the screen.",
          'Click the "Select a Building" input field to open the building selection bottom sheet, then choose the property you want to chat with.',
          "Click the 'All Tenants' floating action button at the bottom-right of the screen to open a chat modal. You can now chat with all tenants of the associated property.",
        ],
      },
    ],
  },

  "l-chat-3": {
    pageTitle: "Managing chat",
    videoId: "https://youtu.be/Lc3sQPYM25w?si=8EkNuVb5r9OiUPua",
    groups: [
      {
        steps: [
          "On the landlord home page, click the 'Chat' bottom tab to access the list of tenant chats.",
          "Long-press on a specific chat to enter selection mode. In this mode, you can select multiple chats to delete or delete a single selected chat.",
          "Tap on a chat to open the chat details screen and view the conversation details.",
          "Tap the icon at the bottom left of a chat message to open a bottom sheet displaying detailed information about the message.",
          "Tap the trash icon located at the top-right corner to clear all chat messages within the conversation.",
          "Long-press an individual chat message to either delete it or view its details in an information panel.",
        ],
      },
    ],
  },
};
