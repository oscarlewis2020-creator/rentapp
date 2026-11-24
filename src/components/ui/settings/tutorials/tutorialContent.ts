import { LANDLORD_CONTENT } from "./landlordContent";
import { GENERAL_CONTENT } from "./generalContent";

export function extractYouTubeId(input?: string): string | undefined {
  if (!input) return undefined;
  const value = input.trim();
  if (/^[\w-]{11}$/.test(value)) return value; // already a bare id
  const match = value.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
  return match?.[1];
}

export interface StepGroup {
  title?: string;
  steps: string[];
}

export interface TutorialContent {
  pageTitle?: string;
  videoId?: string;
  groups: StepGroup[];
}

const TENANT_CONTENT: Record<string, TutorialContent> = {
  "t-property-1": {
    pageTitle: "Search for properties to rent.",
    videoId: "https://youtu.be/X_fphRrAGlc?si=TeFcZf8-66-nS6ix",
    groups: [
      {
        steps: [
          "Go to the 'Tenant' home page.",
          "Click on 'Search For Properties'.",
          "Either click the search bar or the 'Start Searching' button.",
          "Enter your search criteria to proceed, such as your location, the building name, or use the filter button to refine the details further.",
          "Click searched property to view the property details.",
          "Click on 'Select a unit' to explore the available units",
        ],
      },
    ],
  },

  "t-lease-1": {
    pageTitle: "Apply for a lease on a selected unit",
    videoId: "https://youtu.be/CgqbS0NtICA?si=mKMomDCdOWO0GxCO",
    groups: [
      {
        steps: [
          "Search for a property.",
          "Click on a property card from the search results to navigate to the property details page.",
          'On the property details page, click the "Select a Unit" button to view the available units.',
          "Click on your preferred unit from the list.",
          "Click the 'Apply For A Lease' button.",
          "Fill out the required fields and submit your application.",
        ],
      },
    ],
  },

  "t-lease-2": {
    pageTitle: "Access lease details actions",
    videoId: "https://youtu.be/gddpVSu_etU?si=ZbEv5vh0jVtsZfoG",
    groups: [
      {
        steps: [
          "Navigate to the Tenant Lease Details screen.",
          "Access the 'Actions' tab to modify lease settings or view the agreement. For example, you can pay rent, adjust the lease end date, or issue a vacation notice.",
          'Review payment history in the "Payments" tab. Each payment history card navigates to a payment details page, where you can view the details of individual payments.',
          'View and manage tenant information in the "Tenants" tab. Click on any tenant card to view their details.',
        ],
      },
    ],
  },

  "t-payment-1": {
    pageTitle: "Make lease payments using the Actions tab",
    groups: [
      {
        steps: [
          "On the home page, click on a lease card.",
          "Switch to the 'Actions' tab and click 'Pay Rent'.",
          "Choose between automated payments (Mpesa STK push) or manual payments.",
          "Fill out the payment form and submit.",
          "Alternatively, use the 'Payments' tab and click the 'Pay Rent' button.",
        ],
      },
    ],
  },

  "t-mgmt-1": {
    pageTitle: "Add an additional tenant to your lease",
    videoId: "https://youtu.be/zsU6AlSDQAc?si=yFp-mfVUzQ_LkXev",
    groups: [
      {
        steps: [
          "On the home page, click on a lease card.",
          "Navigate to the 'Tenants' tab.",
          "Click the 'Add Tenants' button at the bottom-right of the screen.",
          "Fill out the 'Add Tenant' form and submit.",
        ],
      },
    ],
  },

  "t-chat-1": {
    pageTitle: "Chat with property management",
    videoId: "https://youtu.be/Lc3sQPYM25w?si=wFA9mU9Ik0Wf0ol6",
    groups: [
      {
        title: "Option 1",
        steps: [
          "On the tenant home page, click on a lease card.",
          "Click the 'Actions' tab.",
          "Select 'Chat' from the management contacts section.",
          "Alternatively, use the bottom tab's 'Chat' button and select a property.",
        ],
      },
      {
        title: "Option 2",
        steps: [
          "Search for a property and click a search result.",
          "Click the 'Chat' button to start chatting with property management.",
          "Alternatively, on the tenant's home page, use the bottom tab's \"Chat\" button. Then, click the floating action button on that page to navigate to the contacts screen and search for a building to chat with.",
        ],
      },
    ],
  },

  "t-chat-2": {
    pageTitle: "Managing chat",
    videoId: "https://youtu.be/Lc3sQPYM25w?si=7YiDrprqlbZqqgMJ",
    groups: [
      {
        steps: [
          "On the home page, click the 'Chat' bottom tab to access the list of landlord chats.",
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

export const TUTORIAL_CONTENT: Record<string, TutorialContent> = {
  ...TENANT_CONTENT,
  ...LANDLORD_CONTENT,
  ...GENERAL_CONTENT,
};
