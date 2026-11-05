// components/ui/landlord/buildings/LeaseTermsTemplateModal.tsx
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal, Portal } from "react-native-paper";
import { AddTermDialog } from "./AddTermDialog";
import { LeaseTermRow, TermItem } from "./LeaseTermRow"; // 💡 Import refactored component blocks

interface LeaseTermsTemplateModalProps {
  visible: boolean;
  onClose: () => void;
}

const INITIAL_TERMS: TermItem[] = [
  {
    id: "t1",
    title: "RENT",
    body: "The tenant shall pay rent on the date specified in the lease agreement. Rent shall be considered late if not received by the landlord on the due date or before.",
  },
  {
    id: "t2",
    title: "UTILITIES",
    body: "The tenant shall be responsible for paying for all utilities, including but not limited to electricity, gas, water, trash, and internet/cable.",
  },
];

const INITIAL_SUGGESTIONS: TermItem[] = [
  {
    id: "s1",
    title: "LATE PAYMENT FEE",
    body: "The tenant shall pay a late payment fee of 10% of rent if rent is not received before the 4th day after the due date.",
  },
  {
    id: "s2",
    title: "SECURITY DEPOSIT",
    body: "The tenant shall pay a security deposit of 100% of rent upon signing this lease agreement. It will be returned before the 15th day after the lease ends, less any deductions for unpaid rent, damages, or cleaning. An itemized list of deductions will be provided when the deposit is retur...",
  },
  {
    id: "s3",
    title: "RENT REFUND POLICY",
    body: "Rent payments are non-refundable under all circumstances. However, any applicable security deposit will be refunded in accordance with the terms of the lease agreement.",
  },
  {
    id: "s4",
    title: "NOTICE TO VACATE",
    body: "In the event that you vacate the premises without providing the required one-month notice, you will be liable to pay the full rent for the month during which the premises are vacated.",
  },
  {
    id: "s5",
    title: "FAILURE TO PAY RENT",
    body: "If the tenant fails to pay rent by the 10th day of the month, the landlord reserves the right to lock the premises, denying tenant access until all outstanding dues are cleared. Continued non-payment may result in eviction and legal action.",
  },
  {
    id: "s6",
    title: "NO SMOKING WEED",
    body: "The use of marijuana or other illicit substances is strictly prohibited inside the unit and within the building compound. Violation of this policy will result in immediate termination of the lease, a fine equivalent to 1 month's rent, and potential reporting to local authorities.",
  },
  {
    id: "s7",
    title: "GATE CLOSURE",
    body: "The building gate will be closed from 11:00 PM to 6:00 AM. Tenants should plan their movements accordingly.",
  },
  {
    id: "s8",
    title: "PARKING LIABILITY",
    body: "The landlord and management are not liable for any damage, theft, or loss of vehicles parked on the premises. Tenants park at their own risk.",
  },
];

export function LeaseTermsTemplateModal({
  visible,
  onClose,
}: LeaseTermsTemplateModalProps) {
  const [activeSelection, setActiveSelection] = useState<
    "terms" | "suggestions"
  >("terms");
  const [addDialogVisible, setAddDialogVisible] = useState(false);

  const [terms, setTerms] = useState<TermItem[]>(INITIAL_TERMS);
  const [suggestions, setSuggestions] =
    useState<TermItem[]>(INITIAL_SUGGESTIONS);

  const [editingTitle, setEditingTitle] = useState("");
  const [editingDescription, setEditingDescription] = useState("");

  const activeList = activeSelection === "terms" ? terms : suggestions;

  const handleOpenDialog = (item?: TermItem) => {
    setEditingTitle(item ? item.title : "");
    setEditingDescription(item ? item.body : "");
    setAddDialogVisible(true);
  };

  const handleAddOrEditCommit = (
    inputTitle: string,
    inputDescription: string,
  ) => {
    const committedCard: TermItem = {
      id: `custom_${Date.now()}`,
      title: inputTitle.toUpperCase(),
      body: inputDescription,
    };
    setTerms((prev) => [committedCard, ...prev]);
  };

  const handleActionClick = (item: TermItem) => {
    if (activeSelection === "terms") {
      // Moving an item from Terms to Suggestions
      const itemToMove = { ...item };

      // Remove the item from the active Terms list
      setTerms((prev) => prev.filter((term) => term.id !== itemToMove.id));

      // Always preserve the item in Suggestions
      setSuggestions((prev) => {
        // Prevent duplicate entries
        const alreadyExists = prev.some(
          (suggestion) => suggestion.id === itemToMove.id,
        );

        if (alreadyExists) return prev;

        return [itemToMove, ...prev];
      });
    } else {
      // Moving an item from Suggestions to Terms
      const itemToMove = { ...item };

      // Add the selected item to Terms
      setTerms((prev) => {
        const alreadyExists = prev.some((term) => term.id === itemToMove.id);

        if (alreadyExists) return prev;

        return [itemToMove, ...prev];
      });

      // Remove it from Suggestions
      setSuggestions((prev) =>
        prev.filter((suggestion) => suggestion.id !== itemToMove.id),
      );
    }
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        dismissable={true}
        style={styles.modalOverlay}
        contentContainerStyle={styles.sheetContainer}
      >
        {/* ================= STICKY HEADER ================= */}
        <View style={styles.stickyHeaderWrapper}>
          <View style={styles.topHandleBar} />
          <View style={styles.closeRow}>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeBtn}
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.actionButtonsRow}>
            <TouchableOpacity
              style={styles.pillButton}
              activeOpacity={0.8}
              onPress={() => handleOpenDialog()}
            >
              <FontAwesome5
                name="file-signature"
                size={14}
                color="#121824"
                style={styles.btnIcon}
              />
              <Text style={styles.pillButtonText}>Add New Term</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.pillButton}
              activeOpacity={0.8}
              onPress={onClose}
            >
              <Ionicons
                name="save-outline"
                size={16}
                color="#121824"
                style={styles.btnIcon}
              />
              <Text style={styles.pillButtonText}>Save</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.noteText}>
            <Text style={styles.boldNote}>Note: </Text>
            This is a lease agreement template. It will be used by your
            prospective tenants when applying for a lease. Tap the buttons on
            the right of the term to edit or delete.
          </Text>

          <View style={styles.radioControlsRow}>
            {["terms", "suggestions"].map((mode) => (
              <TouchableOpacity
                key={mode}
                style={styles.radioButton}
                onPress={() => setActiveSelection(mode as any)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={
                    activeSelection === mode
                      ? "radio-button-on"
                      : "radio-button-off"
                  }
                  size={22}
                  color={activeSelection === mode ? "#85C1E9" : "#FFF"}
                />
                <Text style={styles.radioLabel}>
                  {mode === "terms" ? "Terms" : "Suggestions"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ================= SCROLLABLE LIST FEED ================= */}
        <ScrollView
          style={styles.scrollList}
          showsVerticalScrollIndicator={false}
        >
          {activeList.map((item) => (
            <LeaseTermRow
              key={item.id}
              item={item}
              viewMode={activeSelection}
              onEdit={() => handleOpenDialog(item)}
              onAction={() => handleActionClick(item)}
            />
          ))}
        </ScrollView>

        <AddTermDialog
          visible={addDialogVisible}
          onClose={() => setAddDialogVisible(false)}
          onAdd={handleAddOrEditCommit}
          initialTitle={editingTitle}
          initialDescription={editingDescription}
        />
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  sheetContainer: {
    backgroundColor: "#004B6E",
    width: "100%",
    maxWidth: 600,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "92%",
  },
  stickyHeaderWrapper: {
    backgroundColor: "#004B6E",
    paddingTop: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.08)",
    zIndex: 10,
  },
  topHandleBar: {
    width: 44,
    height: 5,
    backgroundColor: "#1C2D37",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 4,
    opacity: 0.6,
  },
  closeRow: { flexDirection: "row", justifyContent: "flex-end" },
  closeBtn: { padding: 4 },
  actionButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginTop: 8,
    marginBottom: 20,
  },
  pillButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#85C1E9",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 0.47,
  },
  btnIcon: { marginRight: 8, color: "#121824" },
  pillButtonText: { color: "#121824", fontSize: 15, fontWeight: "700" },
  noteText: {
    color: "#CFD8DC",
    fontSize: 14,
    lineHeight: 20,
    fontStyle: "italic",
    marginBottom: 20,
  },
  boldNote: { fontWeight: "700", fontStyle: "normal" },
  radioControlsRow: {
    flexDirection: "row",
    gap: 32,
    marginBottom: 16,
    paddingLeft: 4,
  },
  radioButton: { flexDirection: "row", alignItems: "center", gap: 10 },
  radioLabel: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  scrollList: { paddingHorizontal: 16, backgroundColor: "#003A56" },
});
