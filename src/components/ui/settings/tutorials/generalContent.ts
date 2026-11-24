import type { TutorialContent } from "./tutorialContent";

export const GENERAL_CONTENT: Record<string, TutorialContent> = {
  "g-profile-1": {
    pageTitle: "Editing your user profile.",
    videoId: "https://youtu.be/zb6kG39pe1g?si=yhqP7xtwT9_JZROk",
    groups: [
      {
        steps: [
          "Click the Settings button at the bottom tab of the screen.",
          "Click the Pencil icon at the top-left of the screen.",
          "Update the required fields and submit the form.",
        ],
      },
    ],
  },

  "g-settings-1": {
    pageTitle: "Accessing Settings.",
    videoId: "https://youtu.be/zb6kG39pe1g?si=VuD9ITW65_JSENib",
    groups: [
      {
        steps: [
          "All users have access to the same settings page, which has 3 sections.",
          "Check the 'General section' to toggle user roles, switch themes, or manage notifications.",
          "Check the 'Info section' for options like Share Feedback, Tutorials, Help Center, Privacy Policy, Website, and Social Media.",
          "Check the 'Other section' to Back Up Chats, Restore Chats, Sign Out, or Change Country.",
        ],
      },
    ],
  },

  "g-notif-1": {
    pageTitle: "Viewing Notifications.",
    videoId: "https://youtu.be/zb6kG39pe1g?si=orla3-pl3Ima50zs",
    groups: [
      {
        steps: [
          "Click the Bell icon at the top-right of the screen.",
          "Click on a notification to view its details.",
        ],
      },
    ],
  },

  "g-notif-2": {
    pageTitle: "Managing Notifications.",
    videoId: "https://youtu.be/OwBcUGtsgWc?si=5vIJorpbJShKRNe6",
    groups: [
      {
        steps: [
          "Click the Bell icon at the top-right of the screen to navigate to the notifications screen.",
          "Notifications with a green dot indicate unread notifications. Click on a notification item to navigate to its detail page, which will mark the notification as read.",
          "Swiping a notification item reveals a button to delete that specific notification. You can also use the trash icon at the top-left to clear all notifications.",
          "Long press a notification item to select it. In selection mode, you can choose multiple notification items to delete them or click on the cancel button on the top left to exit selection mode.",
        ],
      },
    ],
  },
};
