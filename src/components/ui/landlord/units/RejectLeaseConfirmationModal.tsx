// components/ui/landlord/units/RejectLeaseConfirmationModal.tsx
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import RejectionReasonModal, {
  RejectionReasonOption,
} from "./RejectionReasonModal";
import TenancyRejectionReasonModal, {
  TenancyRejectionReasonOption,
} from "./TenancyRejectionReasonModal";

export type AnyRejectionReason =
  | RejectionReasonOption
  | TenancyRejectionReasonOption;

interface RejectLeaseConfirmationModalProps {
  visible: boolean;
  applicantName: string;
  entityType?: "lease" | "tenancy";
  onCancel: () => void;
  onConfirmReject: (reasons: AnyRejectionReason[]) => void;
}

export default function RejectLeaseConfirmationModal({
  visible,
  applicantName,
  entityType = "lease",
  onCancel,
  onConfirmReject,
}: RejectLeaseConfirmationModalProps) {
  const [selectedReasons, setSelectedReasons] = useState<AnyRejectionReason[]>(
    [],
  );
  const [isReasonSheetOpen, setIsReasonSheetOpen] = useState(false);

  const isTenancy = entityType === "tenancy";

  useEffect(() => {
    if (visible) {
      setSelectedReasons([]);
      setIsReasonSheetOpen(false);
    }
  }, [visible]);

  const handleToggleReason = (reason: AnyRejectionReason) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((item) => item !== reason)
        : [...prev, reason],
    );
  };

  const handleRejectPress = () => {
    onConfirmReject(selectedReasons);
  };

  const displayReasonText =
    selectedReasons.length > 0
      ? selectedReasons.join(", ")
      : "Rejection reason";

  return (
    <>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={onCancel}
          style={styles.dialogContainer}
        >
          <Dialog.Title style={styles.title}>
            {isTenancy ? "Confirm Tenancy Rejection)" : "Confirmation"}
          </Dialog.Title>

          <Dialog.Content style={styles.content}>
            <Text style={styles.bodyText}>
              Are you sure you want to permanently reject{" "}
              <Text style={styles.applicantNameHighlight}>
                {applicantName.toUpperCase()}
              </Text>
              &apos;s {isTenancy ? "tenancy" : "lease"} application? This action
              is irreversible.
            </Text>

            <Text style={styles.requiredText}>
              A reason is required for rejecting this request.
            </Text>

            <Pressable
              onPress={() => setIsReasonSheetOpen(true)}
              style={styles.dropdownBox}
            >
              <View style={styles.dropdownLeft}>
                <MaterialCommunityIcons
                  name="message-question-outline"
                  size={20}
                  color="#F8FAFC"
                />
                <Text
                  numberOfLines={1}
                  style={[
                    styles.dropdownLabel,
                    selectedReasons.length > 0 && styles.dropdownLabelSelected,
                  ]}
                >
                  {displayReasonText}
                </Text>
              </View>
              <MaterialCommunityIcons
                name="menu-down"
                size={20}
                color="#E2E8F0"
              />
            </Pressable>
          </Dialog.Content>

          <Dialog.Actions style={styles.actions}>
            <Button
              onPress={onCancel}
              labelStyle={styles.cancelLabel}
              textColor="#89CEFF"
              rippleColor="rgba(137, 206, 255, 0.15)"
            >
              CANCEL
            </Button>

            <Button
              onPress={() => onConfirmReject(selectedReasons)}
              disabled={selectedReasons.length === 0}
              labelStyle={styles.rejectLabel}
              textColor={selectedReasons.length > 0 ? "#89CEFF" : "#64748B"}
              rippleColor="rgba(137, 206, 255, 0.15)"
            >
              {isTenancy ? "Reject Tenancy" : "Reject Lease"}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {isTenancy ? (
        <TenancyRejectionReasonModal
          visible={isReasonSheetOpen}
          selectedReasons={selectedReasons as TenancyRejectionReasonOption[]}
          onToggleReason={handleToggleReason}
          onClose={() => setIsReasonSheetOpen(false)}
        />
      ) : (
        <RejectionReasonModal
          visible={isReasonSheetOpen}
          selectedReasons={selectedReasons as RejectionReasonOption[]}
          onToggleReason={handleToggleReason}
          onClose={() => setIsReasonSheetOpen(false)}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  dialogContainer: {
    backgroundColor: "#23303C",
    borderRadius: 20,
    width: Platform.OS === "web" ? "90%" : "86%",
    maxWidth: 420,
    alignSelf: "center",
  },
  title: {
    color: "#F8FAFC",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10,
  },
  content: {
    paddingHorizontal: 22,
    paddingBottom: 10,
    gap: 14,
  },
  bodyText: {
    color: "#E2E8F0",
    fontSize: 15,
    lineHeight: 22,
  },
  applicantNameHighlight: {
    color: "#F8FAFC",
    fontWeight: "500",
  },
  requiredText: {
    color: "#E2E8F0",
    fontSize: 15,
    lineHeight: 22,
  },
  dropdownBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#8A8F98",
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginTop: 2,
  },
  dropdownLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
    marginRight: 8,
  },
  dropdownLabel: {
    color: "#CBD5E1",
    fontSize: 15,
    flexShrink: 1,
  },
  dropdownLabelSelected: {
    color: "#F8FAFC",
    fontWeight: "500",
  },
  actions: {
    paddingHorizontal: 16,
    paddingBottom: 14,
    justifyContent: "flex-end",
    gap: 8,
  },
  cancelLabel: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.6,
  },
  rejectLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
});
