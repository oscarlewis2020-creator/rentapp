// components/ui/landlord/lease/IssueVacateNoticeModal.tsx
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import VacateReasonModal, { VacateReasonOption } from "./VacateReasonModal";

interface IssueVacateNoticeModalProps {
  visible: boolean;
  tenantName: string;
  unitName: string;
  buildingName: string;
  currentEndDate?: string;
  defaultNewEndDate?: string;
  onCancel: () => void;
  onConfirmNotice: (payload: {
    newEndDate: string;
    reasons: VacateReasonOption[];
  }) => void;
}

export default function IssueVacateNoticeModal({
  visible,
  tenantName,
  unitName,
  buildingName,
  currentEndDate = "Nov-16-2027",
  defaultNewEndDate = "Dec-20-2026",
  onCancel,
  onConfirmNotice,
}: IssueVacateNoticeModalProps) {
  const [selectedReasons, setSelectedReasons] = useState<VacateReasonOption[]>(
    [],
  );
  const [isReasonSheetOpen, setIsReasonSheetOpen] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (visible) {
      setSelectedReasons([]);
      setIsReasonSheetOpen(false);
      setShowError(false);
    }
  }, [visible]);

  const handleToggleReason = (reason: VacateReasonOption) => {
    setSelectedReasons((prev) => {
      const next = prev.includes(reason)
        ? prev.filter((item) => item !== reason)
        : [...prev, reason];
      if (next.length > 0) setShowError(false);
      return next;
    });
  };

  const handleConfirmYes = () => {
    if (selectedReasons.length === 0) {
      setShowError(true);
      return;
    }
    onConfirmNotice({
      newEndDate: defaultNewEndDate,
      reasons: selectedReasons,
    });
  };

  const dropdownLabel =
    selectedReasons.length > 0
      ? selectedReasons.join(", ")
      : "Reason to vacate";

  return (
    <>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={onCancel}
          style={styles.dialogContainer}
        >
          <Dialog.Title style={styles.title}>Confirm notice</Dialog.Title>

          <Dialog.Content style={styles.content}>
            <Text style={styles.promptText}>
              Are you certain the tenant ({tenantName}) is required to vacate{" "}
              {unitName} at {buildingName} one month from now?
            </Text>

            {/* Current Lease End Date */}
            <View style={styles.fieldWrapper}>
              <Text style={styles.floatingLabelMuted}>
                Current lease end date
              </Text>
              <View style={styles.readOnlyBox}>
                <MaterialCommunityIcons
                  name="calendar-check"
                  size={22}
                  color="#64748B"
                />
                <Text style={styles.readOnlyText}>{currentEndDate}</Text>
              </View>
            </View>

            {/* New End Date */}
            <View style={styles.fieldWrapper}>
              <Text style={styles.floatingLabelMuted}>new end date</Text>
              <View style={styles.readOnlyBox}>
                <MaterialCommunityIcons
                  name="calendar-check"
                  size={22}
                  color="#64748B"
                />
                <Text style={styles.readOnlyText}>{defaultNewEndDate}</Text>
              </View>
            </View>

            <Text style={styles.screeningNote}>
              Please let us know the reason for vacating.{" "}
              <Text style={styles.screeningHighlight}>
                This information will be used for future tenant screening
              </Text>
            </Text>

            {/* Reason to Vacate Dropdown */}
            <Pressable
              onPress={() => setIsReasonSheetOpen(true)}
              style={[
                styles.dropdownBox,
                showError ? styles.dropdownError : null,
              ]}
            >
              <View style={styles.dropdownLeft}>
                <View style={styles.questionBadge}>
                  <Text style={styles.questionMark}>?</Text>
                </View>
                <Text
                  numberOfLines={1}
                  style={[
                    styles.dropdownText,
                    selectedReasons.length > 0 && styles.dropdownSelected,
                  ]}
                >
                  {dropdownLabel}
                </Text>
              </View>
              <MaterialCommunityIcons
                name="menu-down"
                size={22}
                color="#E2E8F0"
              />
            </Pressable>

            {showError && (
              <Text style={styles.errorText}>
                Please select at least one reason to vacate.
              </Text>
            )}
          </Dialog.Content>

          <Dialog.Actions style={styles.actions}>
            <Button
              onPress={onCancel}
              labelStyle={styles.btnLabel}
              textColor="#7BC4FA"
              rippleColor="rgba(123, 196, 250, 0.15)"
            >
              No
            </Button>
            <Button
              onPress={handleConfirmYes}
              labelStyle={styles.btnLabel}
              textColor="#7BC4FA"
              rippleColor="rgba(123, 196, 250, 0.15)"
            >
              Yes
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <VacateReasonModal
        visible={isReasonSheetOpen}
        selectedReasons={selectedReasons}
        onToggleReason={handleToggleReason}
        onClose={() => setIsReasonSheetOpen(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  dialogContainer: {
    backgroundColor: "#202429",
    borderRadius: 22,
    width: Platform.OS === "web" ? "90%" : "88%",
    maxWidth: 420,
    alignSelf: "center",
  },
  title: {
    color: "#F8FAFC",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 8,
  },
  content: {
    paddingHorizontal: 18,
    gap: 14,
  },
  promptText: {
    color: "#F1F5F9",
    fontSize: 16,
    lineHeight: 23,
    textAlign: "center",
  },
  fieldWrapper: {
    position: "relative",
    marginTop: 2,
  },
  floatingLabelMuted: {
    position: "absolute",
    top: -9,
    left: 12,
    zIndex: 2,
    backgroundColor: "#202429",
    paddingHorizontal: 4,
    color: "#94A3B8",
    fontSize: 12,
  },
  readOnlyBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#3A3F47",
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  readOnlyText: {
    color: "#64748B",
    fontSize: 16,
  },
  screeningNote: {
    color: "#E2E8F0",
    fontSize: 15,
    lineHeight: 22,
  },
  screeningHighlight: {
    color: "#60A5FA",
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
  },
  dropdownError: {
    borderColor: "#F87171",
  },
  dropdownLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
    marginRight: 8,
  },
  questionBadge: {
    backgroundColor: "#60A5FA",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  questionMark: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  dropdownText: {
    color: "#CBD5E1",
    fontSize: 15,
    flexShrink: 1,
  },
  dropdownSelected: {
    color: "#F8FAFC",
    fontWeight: "500",
  },
  errorText: {
    color: "#F87171",
    fontSize: 13,
    marginTop: -6,
  },
  actions: {
    paddingHorizontal: 16,
    paddingBottom: 14,
    justifyContent: "flex-end",
    gap: 12,
  },
  btnLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
});
