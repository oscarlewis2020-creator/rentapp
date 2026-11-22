// components/ui/landlord/lease/LeaseNotesSortModal.tsx
import { Ionicons } from "@expo/vector-icons";
import { Modal, Platform, Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export type LeaseNoteSortOrder = "newest" | "oldest";

interface LeaseNotesSortModalProps {
  visible: boolean;
  sortOrder: LeaseNoteSortOrder;
  onSelectSortOrder: (order: LeaseNoteSortOrder) => void;
  onClose: () => void;
}

export default function LeaseNotesSortModal({
  visible,
  sortOrder,
  onSelectSortOrder,
  onClose,
}: LeaseNotesSortModalProps) {
  const options: { label: string; value: LeaseNoteSortOrder }[] = [
    { label: "Newest first", value: "newest" },
    { label: "Oldest first", value: "oldest" },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <Pressable style={styles.backdropDismiss} onPress={onClose} />

        <View style={styles.sheetContainer}>
          <View style={styles.topBar}>
            <View style={styles.dragHandle} />
            <Pressable onPress={onClose} hitSlop={10} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color="#E2E8F0" />
            </Pressable>
          </View>

          <View style={styles.divider} />

          <View style={styles.optionsList}>
            {options.map((opt) => {
              const selected = sortOrder === opt.value;
              return (
                <Pressable
                  key={opt.value}
                  onPress={() => {
                    onSelectSortOrder(opt.value);
                    onClose();
                  }}
                  style={styles.optionRow}
                >
                  <Text style={styles.optionLabel}>{opt.label}</Text>
                  <View
                    style={[
                      styles.radioOuter,
                      selected && styles.radioOuterActive,
                    ]}
                  >
                    {selected && <View style={styles.radioInner} />}
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.52)",
    justifyContent: "flex-end",
  },
  backdropDismiss: {
    flex: 1,
  },
  sheetContainer: {
    backgroundColor: "#04506E",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%",
    alignSelf: "center",
    paddingBottom: 28,
  },
  topBar: {
    paddingTop: 10,
    paddingHorizontal: 18,
    paddingBottom: 10,
    alignItems: "center",
  },
  dragHandle: {
    width: 34,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#071E29",
    marginBottom: 4,
  },
  closeBtn: {
    alignSelf: "flex-end",
    padding: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#1D6B89",
    marginHorizontal: 14,
    marginBottom: 8,
  },
  optionsList: {
    paddingHorizontal: 22,
    gap: 6,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  optionLabel: {
    color: "#F8FAFC",
    fontSize: 16,
    fontWeight: "400",
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterActive: {
    borderColor: "#7BC4FA",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#7BC4FA",
  },
});
