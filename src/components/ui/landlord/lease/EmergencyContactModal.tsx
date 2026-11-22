// components/ui/landlord/lease/EmergencyContactModal.tsx
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import AddContactModal, { EmergencyContactItem } from "./AddContactModal";

interface EmergencyContactModalProps {
  visible: boolean;
  defaultContactName?: string;
  onCancel: () => void;
  onSaveContacts: (selectedContacts: EmergencyContactItem[]) => void;
}

export default function EmergencyContactModal({
  visible,
  defaultContactName = "Outis",
  onCancel,
  onSaveContacts,
}: EmergencyContactModalProps) {
  const [contacts, setContacts] = useState<EmergencyContactItem[]>([
    { id: "default-1", name: defaultContactName, phone: "+254723568974" },
  ]);
  const [selectedIds, setSelectedIds] = useState<string[]>(["default-1"]);
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);

  useEffect(() => {
    if (visible) {
      const initial: EmergencyContactItem = {
        id: "default-1",
        name: defaultContactName,
        phone: "+254723568974",
      };
      setContacts([initial]);
      setSelectedIds(["default-1"]);
      setIsAddContactOpen(false);
    }
  }, [visible, defaultContactName]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleAddContact = (newContact: EmergencyContactItem) => {
    setContacts((prev) => [...prev, newContact]);
    setSelectedIds((prev) => [...prev, newContact.id]);
    setIsAddContactOpen(false);
  };

  const handleSave = () => {
    const chosen = contacts.filter((c) => selectedIds.includes(c.id));
    onSaveContacts(chosen);
  };

  return (
    <>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={onCancel}
          style={styles.dialogContainer}
        >
          <Dialog.Title style={styles.title}>Emergency Contact</Dialog.Title>

          <Dialog.Content style={styles.content}>
            {/* Selected Contact Chips */}
            <View style={styles.chipsRow}>
              {contacts.map((contact) => {
                const isSelected = selectedIds.includes(contact.id);
                return (
                  <Pressable
                    key={contact.id}
                    onPress={() => toggleSelect(contact.id)}
                    style={[
                      styles.chip,
                      isSelected ? styles.chipSelected : styles.chipUnselected,
                    ]}
                  >
                    {isSelected && (
                      <Ionicons name="checkmark" size={16} color="#7BC4FA" />
                    )}
                    <Text
                      style={[
                        styles.chipText,
                        isSelected && styles.chipTextSelected,
                      ]}
                    >
                      {contact.name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* + Add new contact button */}
            <Pressable
              onPress={() => setIsAddContactOpen(true)}
              style={styles.addContactBtn}
            >
              <Ionicons name="add" size={20} color="#E2E8F0" />
              <Text style={styles.addContactText}>Add new contact</Text>
            </Pressable>
          </Dialog.Content>

          <Dialog.Actions style={styles.actions}>
            <Button
              onPress={onCancel}
              labelStyle={styles.btnLabel}
              textColor="#7BC4FA"
              rippleColor="rgba(123, 196, 250, 0.15)"
            >
              Cancel
            </Button>
            <Button
              onPress={handleSave}
              labelStyle={styles.btnLabel}
              textColor="#7BC4FA"
              rippleColor="rgba(123, 196, 250, 0.15)"
            >
              Save contacts
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <AddContactModal
        visible={isAddContactOpen}
        onCancel={() => setIsAddContactOpen(false)}
        onAddContact={handleAddContact}
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
    marginTop: 8,
  },
  content: {
    paddingHorizontal: 18,
    gap: 20,
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
  },
  chipSelected: {
    backgroundColor: "#143547",
    borderColor: "#5DA9E9",
  },
  chipUnselected: {
    backgroundColor: "#2A2E33",
    borderColor: "#475569",
  },
  chipText: {
    color: "#CBD5E1",
    fontSize: 15,
    fontWeight: "500",
  },
  chipTextSelected: {
    color: "#7BC4FA",
  },
  addContactBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#3A3E45",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  addContactText: {
    color: "#F1F5F9",
    fontSize: 16,
    fontWeight: "500",
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
