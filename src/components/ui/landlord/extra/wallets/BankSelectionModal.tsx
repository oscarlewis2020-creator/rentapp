// components/ui/landlord/wallets/BankSelectionModal.tsx
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal, Portal } from "react-native-paper";

interface BankSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  selectedBank: string;
  onSelectBank: (bankName: string) => void;
}

const KENYAN_BANKS = [
  "African Banking Corp. Bank Ltd",
  "Bank of Africa Kenya Limited",
  "Bank of Baroda (Kenya Limited)",
  "Bank of India",
  "Barclays Bank of Kenya Limited",
  "Central Bank of Kenya",
  "Chase Bank Limited",
  "Citibank N A",
  "Co-operative Bank of Kenya Limited",
  "Commercial Bank of Africa Limited",
  "Consolidated Bank of Kenya Limited",
];

export function BankSelectionModal({
  visible,
  onClose,
  selectedBank,
  onSelectBank,
}: BankSelectionModalProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter banks dynamically based on user search query
  const filteredBanks = KENYAN_BANKS.filter((bank) =>
    bank.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        dismissable={true}
        style={styles.modalOverlay}
        contentContainerStyle={styles.sheetContainer}
      >
        {/* Top Handle Decorative Drag Bar Accent */}
        <View style={styles.topHandleBar} />

        {/* Modal Window Upper Close Button Header Row */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={onClose}
            style={styles.closeIconButton}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Search Input Container Box Bar */}
        <View style={styles.searchBarWrapper}>
          <Ionicons
            name="search-outline"
            size={20}
            color="#9EA5B1"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInputField}
            placeholder="Search a Bank"
            placeholderTextColor="#9EA5B1"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            {...Platform.select({ web: { outlineStyle: "none" } })}
          />
        </View>

        {/* Scrollable Checkbox Bank Items Grid Feed */}
        <ScrollView
          style={styles.listScroll}
          showsVerticalScrollIndicator={false}
        >
          {filteredBanks.map((bankName) => {
            const isCurrent = bankName === selectedBank;
            return (
              <TouchableOpacity
                key={bankName}
                style={styles.itemRow}
                onPress={() => {
                  onSelectBank(bankName);
                  onClose(); // Automatically closes the sheet upon item selection selection criteria
                }}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.itemText,
                    isCurrent && styles.selectedItemText,
                  ]}
                  numberOfLines={1}
                >
                  {bankName}
                </Text>

                {/* Dynamic Checkbox Toggle Selection Status Graphic */}
                <Ionicons
                  name={isCurrent ? "checkbox" : "square-outline"}
                  size={24}
                  color={isCurrent ? "#85C1E9" : "#FFF"} // Highlight blue matching design guidelines when checked
                  style={styles.checkboxIcon}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    justifyContent: "flex-end", // Snaps bottom sheet modal flush onto lower screen borders viewports
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  sheetContainer: {
    backgroundColor: "#034863", // Premium corporate dark teal sheet color extracted directly from your image
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 34 : 16,
    maxHeight: "85%",
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
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  closeIconButton: {
    padding: 4,
  },
  searchBarWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1F2E3B", // Inset matte text box track frame backdrop color fill
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 20,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 12 : 10,
    borderWidth: 1,
    borderColor: "#2B3F4E",
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInputField: {
    flex: 1,
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
  },
  listScroll: {
    paddingHorizontal: 20,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Pushes checkbox targets symmetrically to the right bounds edge
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.04)",
  },
  checkboxIcon: {
    marginRight: 4,
  },
  itemText: {
    fontSize: 16,
    color: "#E5E9F0",
    fontWeight: "400",
    flex: 1,
    paddingRight: 12,
  },
  selectedItemText: {
    color: "#FFF",
    fontWeight: "600",
  },
});
