// components/roles/landlord/LeaseNotesScreen.tsx
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import AddLeaseNoteModal from "../../ui/landlord/lease/AddLeaseNoteModal";
import LeaseNotesSortModal, {
  LeaseNoteSortOrder,
} from "../../ui/landlord/lease/LeaseNotesSortModal";
import SampleLeaseNotesModal, {
  LeaseNoteItem,
  SAMPLE_LEASE_NOTES,
} from "../../ui/landlord/lease/SampleLeaseNotesModal";

export type LeaseNoteFilter = "All" | "Mine";

interface LeaseNotesScreenProps {
  unitName?: string;
  onBack?: () => void;
}

export function LandlordLeaseNotesScreen({
  unitName = "Room 7",
  onBack,
}: LeaseNotesScreenProps) {
  const [notes, setNotes] = useState<LeaseNoteItem[]>([]);
  const [sortOrder, setSortOrder] = useState<LeaseNoteSortOrder>("newest");
  const [filterMode, setFilterMode] = useState<LeaseNoteFilter>("All");
  const [pendingFilterMode, setPendingFilterMode] =
    useState<LeaseNoteFilter>("All");

  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [isFilterInsetOpen, setIsFilterInsetOpen] = useState(false);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<LeaseNoteItem | null>(null);

  const visibleNotes = useMemo(() => {
    const filtered =
      filterMode === "Mine" ? notes.filter((n) => n.isMine !== false) : notes;
    return sortOrder === "newest" ? [...filtered] : [...filtered].reverse();
  }, [notes, filterMode, sortOrder]);

  const handleOpenFilterInset = () => {
    setPendingFilterMode(filterMode);
    setIsFilterInsetOpen(true);
  };

  const handleApplyFilterInset = () => {
    setFilterMode(pendingFilterMode);
    setIsFilterInsetOpen(false);
  };

  const handleResetFilterInset = () => {
    setPendingFilterMode("All");
    setFilterMode("All");
    setIsFilterInsetOpen(false);
  };

  const handleSaveNote = (text: string) => {
    if (editingNote) {
      setNotes((prev) =>
        prev.map((item) =>
          item.id === editingNote.id ? { ...item, content: text } : item,
        ),
      );
      setEditingNote(null);
    } else {
      const todayLabel = "Nov-20-2026";
      const created: LeaseNoteItem = {
        id: `note-${Date.now()}`,
        date: todayLabel,
        content: text,
        authorEmail: "landlord@example.com",
        isMine: true,
      };
      setNotes((prev) => [created, ...prev]);
    }
    setIsAddNoteOpen(false);
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "left", "right", "bottom"]}
    >
      {/* Top App Bar */}
      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          <Pressable onPress={onBack} hitSlop={10} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color="#E2E8F0" />
          </Pressable>
          <Text numberOfLines={1} style={styles.headerTitle}>
            Lease Notes - {unitName}...
          </Text>
        </View>

        <Pressable style={styles.menuBtn}>
          <Ionicons name="list" size={20} color="#CBD5E1" />
        </Pressable>
      </View>

      {/* Sort & Show Filter Toolbar */}
      <View style={styles.toolbar}>
        <Pressable
          onPress={() => setIsSortModalOpen(true)}
          style={styles.sortButton}
        >
          <MaterialCommunityIcons
            name="sort-variant"
            size={20}
            color="#CBD5E1"
          />
          <Text style={styles.sortText}>Sort</Text>
        </Pressable>

        <View style={styles.showContainer}>
          <Text style={styles.showLabel}>Show :</Text>
          <Pressable
            onPress={handleOpenFilterInset}
            style={styles.showDropdownBox}
          >
            <Text style={styles.showValue}>{filterMode}</Text>
            <Ionicons name="caret-down" size={16} color="#CBD5E1" />
          </Pressable>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.tipText}>
          <Text style={styles.tipHighlight}>Tip :</Text> You can use this to
          keep personal agreements between you and the tenant that are not
          covered in the building&apos;s lease agreement document.
        </Text>

        {visibleNotes.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No lease note found.</Text>
            <Pressable
              onPress={() => setIsSampleModalOpen(true)}
              style={styles.sampleButton}
            >
              <Text style={styles.sampleButtonText}>
                View Sample lease notes
              </Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.notesStack}>
            {visibleNotes.map((item) => (
              <View key={item.id} style={styles.noteCard}>
                <View style={styles.noteTop}>
                  <Text style={styles.noteDate}>{item.date}</Text>
                  <View style={styles.noteActions}>
                    <Pressable
                      onPress={() => {
                        setEditingNote(item);
                        setIsAddNoteOpen(true);
                      }}
                      style={styles.actionIconBox}
                    >
                      <MaterialCommunityIcons
                        name="pencil"
                        size={18}
                        color="#F8FAFC"
                      />
                    </Pressable>
                    <Pressable
                      onPress={() => handleDeleteNote(item.id)}
                      style={styles.actionIconBox}
                    >
                      <Ionicons name="trash" size={18} color="#F87171" />
                    </Pressable>
                  </View>
                </View>
                <Text style={styles.noteBody}>{item.content}</Text>
                <Text style={styles.noteAuthor}>{item.authorEmail}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Floating + Add note Button */}
      <Pressable
        onPress={() => {
          setEditingNote(null);
          setIsAddNoteOpen(true);
        }}
        style={styles.addNoteFab}
      >
        <Ionicons name="add" size={24} color="#F8FAFC" />
        <Text style={styles.addNoteText}>Add note</Text>
      </Pressable>

      {/* Top-Right Inset Filter Menu (All / Mine) */}
      <Modal
        visible={isFilterInsetOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsFilterInsetOpen(false)}
      >
        <Pressable
          style={styles.insetBackdrop}
          onPress={() => setIsFilterInsetOpen(false)}
        >
          <Pressable
            onPress={(e) => e.stopPropagation()}
            style={styles.insetMenuCard}
          >
            <View style={styles.insetTopBar}>
              <Pressable onPress={handleResetFilterInset} hitSlop={8}>
                <Ionicons name="refresh" size={22} color="#E2E8F0" />
              </Pressable>
              <Pressable onPress={handleApplyFilterInset} hitSlop={8}>
                <Ionicons name="checkmark" size={24} color="#E2E8F0" />
              </Pressable>
            </View>

            {(["All", "Mine"] as LeaseNoteFilter[]).map((mode) => {
              const active = pendingFilterMode === mode;
              return (
                <Pressable
                  key={mode}
                  onPress={() => setPendingFilterMode(mode)}
                  style={[
                    styles.insetOption,
                    active && styles.insetOptionActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.insetOptionText,
                      active && styles.insetOptionTextActive,
                    ]}
                  >
                    {mode}
                  </Text>
                </Pressable>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>

      {/* Sort Bottom Sheet */}
      <LeaseNotesSortModal
        visible={isSortModalOpen}
        sortOrder={sortOrder}
        onSelectSortOrder={setSortOrder}
        onClose={() => setIsSortModalOpen(false)}
      />

      {/* Sample Lease Notes Modal */}
      <SampleLeaseNotesModal
        visible={isSampleModalOpen}
        notes={SAMPLE_LEASE_NOTES}
        onClose={() => setIsSampleModalOpen(false)}
      />

      {/* Add / Edit Lease Note Modal */}
      <AddLeaseNoteModal
        visible={isAddNoteOpen}
        modalTitle={editingNote ? "Edit lease note" : "Add lease note"}
        initialValue={editingNote?.content || ""}
        onCancel={() => {
          setIsAddNoteOpen(false);
          setEditingNote(null);
        }}
        onSubmit={handleSaveNote}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141619",
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%",
    alignSelf: "center",
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
    marginRight: 10,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    color: "#F8FAFC",
    fontSize: 20,
    fontWeight: "500",
    flexShrink: 1,
  },
  menuBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#23272D",
    alignItems: "center",
    justifyContent: "center",
  },
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#252930",
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 12,
  },
  sortText: {
    color: "#CBD5E1",
    fontSize: 16,
    fontWeight: "500",
  },
  showContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  showLabel: {
    color: "#E2E8F0",
    fontSize: 17,
    fontWeight: "500",
  },
  showDropdownBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#3B4048",
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minWidth: 115,
    gap: 10,
  },
  showValue: {
    color: "#CBD5E1",
    fontSize: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 110,
  },
  tipText: {
    color: "#CBD5E1",
    fontSize: 16,
    lineHeight: 24,
  },
  tipHighlight: {
    color: "#38BDF8",
    fontWeight: "600",
  },
  emptyState: {
    marginTop: 130,
    alignItems: "center",
    gap: 20,
  },
  emptyTitle: {
    color: "#E2E8F0",
    fontSize: 17,
    fontWeight: "500",
  },
  sampleButton: {
    borderWidth: 1,
    borderColor: "#3B4048",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 13,
    backgroundColor: "#191C21",
  },
  sampleButtonText: {
    color: "#60A5FA",
    fontSize: 16,
    fontWeight: "500",
  },
  notesStack: {
    marginTop: 18,
    gap: 12,
  },
  noteCard: {
    backgroundColor: "#1E2228",
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
  noteTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  noteDate: {
    color: "#F8FAFC",
    fontSize: 15,
    fontWeight: "600",
  },
  noteActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#2E333B",
    alignItems: "center",
    justifyContent: "center",
  },
  noteBody: {
    color: "#E2E8F0",
    fontSize: 15,
    lineHeight: 22,
  },
  noteAuthor: {
    color: "#94A3B8",
    fontSize: 13,
  },
  addNoteFab: {
    position: "absolute",
    right: 16,
    bottom: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#04506E",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 18,
    elevation: 6,
  },
  addNoteText: {
    color: "#F8FAFC",
    fontSize: 16,
    fontWeight: "500",
  },
  insetBackdrop: {
    flex: 1,
    backgroundColor: "transparent",
  },
  insetMenuCard: {
    position: "absolute",
    top: 108,
    right: 12,
    width: 175,
    backgroundColor: "#202429",
    borderRadius: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#32373F",
    elevation: 10,
  },
  insetTopBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#32373F",
  },
  insetOption: {
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  insetOptionActive: {
    backgroundColor: "#2C313A",
  },
  insetOptionText: {
    color: "#E2E8F0",
    fontSize: 16,
  },
  insetOptionTextActive: {
    color: "#7BC4FA",
    fontWeight: "600",
  },
});
