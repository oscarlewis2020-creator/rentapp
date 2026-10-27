import { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Dialog,
  Modal,
  Portal,
  ProgressBar,
  RadioButton,
  Text,
} from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

export type PromptType = "notification" | "restore-chat" | "continue-as";

export interface Prompts {
  title: string;
  subtitle: string;
  leftIcon: IconSource;
  proceedLabel: string;
  type: PromptType;
  header: string;
}

interface InitDialogueProps {
  visible: boolean;
  isLoading: boolean;
  onDismiss: (
    type: PromptType,
    hasNextOption: boolean,
    selectedRole?: "tenant" | "landlord",
  ) => void;
  okHandler: (
    type: PromptType,
    hasNextOption: boolean,
    selectedRole?: "tenant" | "landlord",
  ) => Promise<void> | void;
  options: Prompts[];
  btnLabel?: string;
}

export function InitDialogue(props: InitDialogueProps) {
  const { visible, isLoading, onDismiss, okHandler, options, btnLabel } = props;
  const [index, setIndex] = useState(0);
  const [selectedRole, setSelectedRole] = useState<"tenant" | "landlord">(
    "tenant",
  );

  // Safeguard array index overflows gracefully
  if (index >= options.length || options.length === 0) {
    return null;
  }

  const currentOption = options[index];
  const oneRequest = options.length === 1;
  const progress = (index + 1) / options.length;
  const hasNextOption = index < options.length - 1;

  const onProceedHandler = async () => {
    // Pass everything up to the parent engine, including role selection if applicable
    await okHandler(
      currentOption.type,
      hasNextOption,
      currentOption.type === "continue-as" ? selectedRole : undefined,
    );
    if (hasNextOption) {
      setIndex((prev) => prev + 1);
    }
  };

  const onDismissHandler = () => {
    onDismiss(
      currentOption.type,
      hasNextOption,
      currentOption.type === "continue-as" ? selectedRole : undefined,
    );
    if (hasNextOption) {
      setIndex((prev) => prev + 1);
    }
  };

  const LeftContent = (avatarProps: { size: number }) => (
    <Avatar.Icon
      icon={currentOption.leftIcon}
      size={avatarProps.size} // 💡 Pass the numeric size directly
      style={styles.avatarBackground} // 💡 Keep the style property clean and type-safe
    />
  );

  return (
    <Portal>
      <Modal
        visible={visible}
        dismissable={false}
        style={styles.modalOverlay}
        contentContainerStyle={styles.cardContainer}
      >
        <Card style={styles.card} elevation={0}>
          <Dialog.Content style={styles.dialogContent}>
            {/* Progress indicator bar shown only for multi-step prompts */}
            {!oneRequest && (
              <View style={styles.progressContainer}>
                <Text variant="labelLarge" style={styles.progressText}>
                  {index + 1} of {options.length}
                </Text>
                <ProgressBar
                  progress={progress}
                  color="#007AFF"
                  style={styles.progressBar}
                />
              </View>
            )}

            <Card.Title
              title={currentOption.title || ""}
              left={LeftContent}
              titleVariant="titleMedium"
            />

            <Dialog.Content style={styles.bodyContent}>
              <Text variant="bodyMedium" style={styles.subtitle}>
                {currentOption.subtitle || ""}
              </Text>

              {/* Conditional rendering for Role Selection */}
              {currentOption.type === "continue-as" && (
                <RadioButton.Group
                  onValueChange={(newValue) =>
                    setSelectedRole(newValue as "tenant" | "landlord")
                  }
                  value={selectedRole}
                >
                  <View style={styles.row}>
                    <RadioButton.Item
                      position="leading"
                      label="Tenant"
                      value="tenant"
                    />
                    <RadioButton.Item
                      position="leading"
                      label="Landlord"
                      value="landlord"
                    />
                  </View>
                </RadioButton.Group>
              )}
            </Dialog.Content>

            <Card.Actions style={styles.actions}>
              <Button
                disabled={isLoading}
                onPress={onDismissHandler}
                mode="text"
              >
                Cancel
              </Button>

              <Button
                loading={isLoading}
                disabled={isLoading}
                onPress={onProceedHandler}
                mode="contained"
                buttonColor="#007AFF"
              >
                {oneRequest
                  ? btnLabel
                    ? btnLabel
                    : "Enable"
                  : currentOption.proceedLabel}
              </Button>
            </Card.Actions>
          </Dialog.Content>
        </Card>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  cardContainer: {
    width: "90%",
    maxWidth: 480,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)",
      },
    }),
  },
  card: {
    backgroundColor: "transparent",
  },
  dialogContent: {
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  progressContainer: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  progressText: {
    textAlign: "center",
    color: "#666",
    marginBottom: 6,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  bodyContent: {
    paddingVertical: 12,
  },
  subtitle: {
    color: "#4A4A4A",
    lineHeight: 22,
  },
  // 💡 ADD THIS TARGET RULE HERE TO RESOLVE THE MISSING PROPERTY ERROR
  avatarBackground: {
    backgroundColor: "#007AFF",
  },
  row: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#F2F2F7",
    borderRadius: 8,
    paddingVertical: 4,
  },
  actions: {
    marginTop: 16,
    gap: 8,
  },
});
