// components/ui/landlord/lease/SampleLeaseNotesModal.tsx
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

export interface LeaseNoteItem {
  id: string;
  date: string;
  content: string;
  authorEmail: string;
  isMine?: boolean;
}

export const SAMPLE_LEASE_NOTES: LeaseNoteItem[] = [
  {
    id: "sample-1",
    date: "Jun-16-2025",
    content:
      "Tenant agreed to keep pets indoors only — this personal agreement is not part of the building's lease document.",
    authorEmail: "manager1@example.com",
    isMine: true,
  },
  {
    id: "sample-2",
    date: "Jun-17-2025",
    content:
      "Tenant agreed to pay rent on the 15th of each month instead of the 5th, as outlined in the original lease.",
    authorEmail: "manager1@example.com",
    isMine: true,
  },
  {
    id: "sample-3",
    date: "Jun-15-2025",
    content: "Tenant requested a plumbing inspection for the kitchen sink.",
    authorEmail: "manager1@example.com",
    isMine: true,
  },
  {
    id: "sample-4",
    date: "Jun-14-2025",
    content: "Lease renewal discussed, tenant asked for a 6-month extension.",
    authorEmail: "manager2@example.com.com",
    isMine: false,
  },
  {
    id: "sample-5",
    date: "Jun-12-2025",
    content: "Noise complaint received from neighbor, tenant notified.",
    authorEmail: "manager2@example.com",
    isMine: false,
  },
  {
    id: "sample-6",
    date: "Jun-11-2025",
    content: "Final inspection scheduled for June 30th.",
    authorEmail: "manager3@example.com",
    isMine: false,
  },
];

interface SampleLeaseNotesModalProps {
  visible: boolean;
  notes?: LeaseNoteItem[];
  onClose: () => void;
  onEditNote?: (note: LeaseNoteItem) => void;
  onDeleteNote?: (noteId: string) => void;
}

export default function SampleLeaseNotesModal({
  visible,
  notes = SAMPLE_LEASE_NOTES,
  onClose,
  onEditNote,
  onDeleteNote,
}: SampleLeaseNotesModalProps) {
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onClose}
        style={styles.dialogContainer}
      >
        <Dialog.Title style={styles.title}>Sample lease notes</Dialog.Title>

        <Dialog.ScrollArea style={styles.scrollArea}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={true}
          >
            {notes.map((note) => {
              const avatarLetter = (note.authorEmail?.[0] || "M").toUpperCase();

              return (
                <View key={note.id} style={styles.noteCard}>
                  <View style={styles.noteTopRow}>
                    <Text style={styles.noteDate}>{note.date}</Text>

                    <View style={styles.noteActions}>
                      <Pressable
                        onPress={() => onEditNote?.(note)}
                        style={styles.iconActionBtn}
                      >
                        <MaterialCommunityIcons
                          name="pencil"
                          size={18}
                          color="#F8FAFC"
                        />
                      </Pressable>

                      <Pressable
                        onPress={() => onDeleteNote?.(note.id)}
                        style={styles.iconActionBtn}
                      >
                        <Ionicons name="trash" size={18} color="#F87171" />
                      </Pressable>
                    </View>
                  </View>

                  <Text style={styles.noteBody}>{note.content}</Text>

                  <View style={styles.authorPill}>
                    <View style={styles.authorAvatar}>
                      <Text style={styles.authorAvatarText}>
                        {avatarLetter}
                      </Text>
                    </View>
                    <Text style={styles.authorEmail}>{note.authorEmail}</Text>
                  </View>
                </View>
              );
            })}

            <Text style={styles.permissionNote}>
              <Text style={styles.permissionUnderline}>NOTE</Text> : Only you
              and property admins can edit or delete notes that you created.
            </Text>
          </ScrollView>
        </Dialog.ScrollArea>

        <Dialog.Actions style={styles.actions}>
          <Button
            mode="outlined"
            onPress={onClose}
            style={styles.closeOutlinedBtn}
            labelStyle={styles.closeBtnLabel}
            textColor="#7BC4FA"
          >
            Close
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialogContainer: {
    backgroundColor: "#202429",
    borderRadius: 22,
    width: Platform.OS === "web" ? "92%" : "90%",
    maxWidth: 440,
    maxHeight: "86%",
    alignSelf: "center",
  },
  title: {
    color: "#F8FAFC",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10,
  },
  scrollArea: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 0,
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    gap: 14,
  },
  noteCard: {
    backgroundColor: "#2A2E33",
    borderRadius: 12,
    padding: 16,
    gap: 14,
  },
  noteTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  noteDate: {
    color: "#F8FAFC",
    fontSize: 16,
    fontWeight: "500",
  },
  noteActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconActionBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: "#3A3F47",
    alignItems: "center",
    justifyContent: "center",
  },
  noteBody: {
    color: "#F1F5F9",
    fontSize: 16,
    lineHeight: 23,
  },
  authorPill: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#3A3F47",
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
    gap: 8,
  },
  authorAvatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#60A5FA",
    alignItems: "center",
    justifyContent: "center",
  },
  authorAvatarText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  authorEmail: {
    color: "#E2E8F0",
    fontSize: 14,
  },
  permissionNote: {
    color: "#E2E8F0",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 2,
    marginBottom: 4,
  },
  permissionUnderline: {
    textDecorationLine: "underline",
  },
  actions: {
    paddingHorizontal: 18,
    paddingBottom: 16,
    justifyContent: "flex-end",
  },
  closeOutlinedBtn: {
    borderColor: "#64748B",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  closeBtnLabel: {
    fontSize: 15,
    fontWeight: "600",
  },
});
