// components/ui/landlord/wallets/TransactionSortModal.tsx
import { Ionicons } from "@expo/vector-icons";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal, Portal } from "react-native-paper";

interface TransactionSortModalProps {
  visible: boolean;
  onClose: () => void;
  selectedSortKey: string;
  onSortKeyChange: (key: string) => void;
}

interface SortRowItemProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

// Reusable Radio Sort Row Component
function SortRowItem({ label, isActive, onPress }: SortRowItemProps) {
  return (
    <TouchableOpacity
      style={styles.itemRow}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons
        name={isActive ? "radio-button-on" : "radio-button-off"}
        size={24}
        color={isActive ? "#85C1E9" : "#FFF"} // Accent blue highlight when active
        style={styles.radioIcon}
      />
      <Text style={[styles.itemText, isActive && styles.activeItemText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export function TransactionSortModal({
  visible,
  onClose,
  selectedSortKey,
  onSortKeyChange,
}: TransactionSortModalProps) {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        dismissable={true}
        style={styles.modalOverlay}
        contentContainerStyle={styles.sheetContainer}
      >
        {/* Top Handle Decorative Line Accent */}
        <View style={styles.topHandleBar} />

        {/* Close Button Header Strip */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={onClose}
            style={styles.closeIconButton}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollList}
          showsVerticalScrollIndicator={false}
        >
          {/* Main Card Backdrop Core Box */}
          <View style={styles.sortCard}>
            <Text style={styles.cardHeaderTitle}>Sort By</Text>

            {/* --- DURATION GROUP --- */}
            <Text style={styles.subGroupLabel}>Duration</Text>
            <SortRowItem
              label="Newest First"
              isActive={selectedSortKey === "newest"}
              onPress={() => {
                onSortKeyChange("newest");
                onClose();
              }}
            />
            <SortRowItem
              label="Oldest First"
              isActive={selectedSortKey === "oldest"}
              onPress={() => {
                onSortKeyChange("oldest");
                onClose();
              }}
            />

            {/* --- AMOUNT GROUP --- */}
            <Text style={[styles.subGroupLabel, styles.amountGroupSpacing]}>
              Amount
            </Text>
            <SortRowItem
              label="Highest First"
              isActive={selectedSortKey === "highest"}
              onPress={() => {
                onSortKeyChange("highest");
                onClose();
              }}
            />
            <SortRowItem
              label="Lowest First"
              isActive={selectedSortKey === "lowest"}
              onPress={() => {
                onSortKeyChange("lowest");
                onClose();
              }}
            />
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    justifyContent: "flex-end", // Snaps bottom sheet flush onto lower screen borders
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  sheetContainer: {
    backgroundColor: "#004B6E", // True deep blue sheet base color matching image perfectly
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 34 : 20,
    maxHeight: "85%",
  },
  topHandleBar: {
    width: 44,
    height: 5,
    backgroundColor: "#1C2D37",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 8,
    opacity: 0.6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  closeIconButton: {
    padding: 4,
  },
  scrollList: {
    paddingHorizontal: 16,
    marginTop: 4,
  },
  sortCard: {
    backgroundColor: "#16222A", // Inset card face matching background image layout
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.03)",
  },
  cardHeaderTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFF",
    marginBottom: 24,
  },
  subGroupLabel: {
    fontSize: 15,
    color: "#6C7A8C", // Legible tracking group labels matching image style text
    fontWeight: "600",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  amountGroupSpacing: {
    marginTop: 24,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 4,
  },
  radioIcon: {
    marginRight: 16,
  },
  itemText: {
    fontSize: 17,
    color: "#FFF",
    fontWeight: "400",
  },
  activeItemText: {
    fontWeight: "500",
  },
});
