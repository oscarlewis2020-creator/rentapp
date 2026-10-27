// app/(auth)/init-screen.tsx
import { useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { LoadingOverlay } from "../../components/global/LoadingOverlay";
import { completeInitWorkflow } from "../../store/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

// Replace mock components with your cross-platform components
import { ErrorComponent } from "../../components/global/ErrorComponent";
import {
  InitDialogue,
  Prompts,
  PromptType,
} from "../../components/global/InitDialogue";

const OPTIONS: Prompts[] = [
  {
    leftIcon: "bell",
    subtitle:
      'To make sure you never miss important updates, tap "Enable" to stay connected.',
    title: "Enable notifications",
    proceedLabel: "Enable",
    type: "notification",
    header: "Almost there",
  },
  {
    leftIcon: "chat",
    subtitle:
      "If you previously backed up your chat messages to Google Drive, you can restore them now.",
    title: "Restore chat messages",
    proceedLabel: "Restore",
    type: "restore-chat",
    header: "Finish",
  },
  {
    leftIcon: "home",
    subtitle: "You're all set! Continue as a Landlord or Tenant?",
    title: "Continue as?",
    proceedLabel: "Proceed",
    type: "continue-as",
    header: "Welcome",
  },
];

export default function AppInitScreen() {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  const [appInitError, setAppInitError] = useState("");
  const [showUserPrompt, setShowUserPrompt] = useState(false);
  const [isPullingChatBackup, setIsPullingChatBackup] = useState(false);

  // Platform safe loading tracker fallback
  const [isInitializing, setIsInitializing] = useState(true);
  const [currentOptionIndex, setCurrentOptionIndex] = useState(0);

  // Filter out options based on platform or conditions
  const availableOptions = OPTIONS.filter((op) => {
    // 💡 Push notifications are usually omitted or handled differently on web layers
    if (Platform.OS === "web" && op.type === "notification") return false;
    return true;
  });

  useEffect(() => {
    // Run core client registration tools (e.g., syncing PowerSync DB states)
    const runSystemBootstrap = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1200)); // Latency mock
        setShowUserPrompt(true);
      } catch (err) {
        setAppInitError("Critical system sync failure.");
      } finally {
        setIsInitializing(false);
      }
    };
    runSystemBootstrap();
  }, []);

  const handleNextStep = () => {
    if (currentOptionIndex < availableOptions.length - 1) {
      setCurrentOptionIndex((prev) => prev + 1);
    } else {
      // 💡 Final initialization phase complete -> trigger global router transition
      setShowUserPrompt(false);
      dispatch(completeInitWorkflow());
    }
  };

  const onProceedHandler = async (type: PromptType) => {
    try {
      if (type === "notification" && Platform.OS !== "web") {
        // Run mobile native Push Token registration rules
      } else if (type === "restore-chat") {
        setIsPullingChatBackup(true);
        // Execute PowerSync / Google Drive restore thunks
      }
      handleNextStep();
    } catch (error) {
      setAppInitError(`Error handling action: ${type}`);
    } finally {
      setIsPullingChatBackup(false);
    }
  };

  const onCancelHandler = () => {
    handleNextStep();
  };

  if (appInitError) {
    return (
      <View style={styles.center}>
        <ErrorComponent message={appInitError} />
      </View>
    );
  }

  // Slice the current prompt card item out safely
  const activePrompt = availableOptions[currentOptionIndex];

  return (
    <View style={styles.container}>
      {showUserPrompt && activePrompt && (
        <InitDialogue
          isLoading={isPullingChatBackup}
          okHandler={() => onProceedHandler(activePrompt.type)}
          onDismiss={onCancelHandler}
          visible={showUserPrompt}
          options={[activePrompt]}
        />
      )}

      {!showUserPrompt && (
        <LoadingOverlay
          message="Finalizing App Initialization..."
          isLoading={isInitializing}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
