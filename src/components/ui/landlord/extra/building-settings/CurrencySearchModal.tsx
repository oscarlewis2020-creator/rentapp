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
import { Modal as PaperModal, Portal } from "react-native-paper";

interface CurrencySearchModalProps {
  isVisible: boolean;
  selectedCurrency: string;
  onClose: () => void;
  onSelect: (currency: string) => void;
}

const ALL_CURRENCIES = [
  "KES, Kenya",
  "USD, United States",
  "UGX, Uganda",
  "TZS, Tanzania",
  "AFN, Afghanistan",
  "ALL, Albania",
  "DZD, Algeria",
  "USD, American Samoa",
  "EUR, Andorra",
  "AOA, Angola",
  "XCD, Anguilla",
];

export default function CurrencySearchModal({
  isVisible,
  selectedCurrency,
  onClose,
  onSelect,
}: CurrencySearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCurrencies = ALL_CURRENCIES.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Portal>
      <PaperModal
        visible={isVisible}
        onDismiss={onClose}
        contentContainerStyle={styles.paperModalContentOverride}
      >
        <View style={styles.fullscreenModalContainer}>
          {/* Top Notch Bar and Dismiss Action Handle */}
          <View style={styles.modalGrabberBar} />

          <TouchableOpacity style={styles.closeIconHeader} onPress={onClose}>
            <Ionicons name="close" size={26} color="#fff" />
          </TouchableOpacity>

          {/* Search Inputs Input Field Row */}
          <View style={styles.searchBarWrapper}>
            <Ionicons
              name="search"
              size={20}
              color="#8a94a6"
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search a Building Currency"
              placeholderTextColor="#8a94a6"
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* List Scroll Matrix Frame */}
          <ScrollView
            style={styles.listContainer}
            showsVerticalScrollIndicator={Platform.OS === "web"}
          >
            {filteredCurrencies.map((currency) => {
              const isChecked = selectedCurrency === currency;
              return (
                <TouchableOpacity
                  key={currency}
                  style={styles.currencyListRow}
                  onPress={() => onSelect(currency)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.currencyRowText,
                      isChecked && styles.currencyRowTextActive,
                    ]}
                  >
                    {currency}
                  </Text>
                  <Ionicons
                    name={isChecked ? "checkbox" : "square-outline"}
                    size={22}
                    color={isChecked ? "#4fa3f7" : "#8a94a6"}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </PaperModal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  paperModalContentOverride: {
    margin: 0,
    padding: 0,
    flex: 1,
    justifyContent: "flex-end",
  },
  fullscreenModalContainer: {
    width: "100%",
    maxWidth: 600,
    height: "92%",
    alignSelf: "center",
    backgroundColor: "#0a3d54", // Beautiful Deep Slate Teal Background from screenshot
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 8,
  },
  modalGrabberBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#16526d",
    alignSelf: "center",
    marginBottom: 8,
  },
  closeIconHeader: {
    alignSelf: "flex-end",
    marginRight: 20,
    padding: 4,
    ...Platform.select({
      web: { cursor: "pointer" },
    }),
  },
  searchBarWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#134e6a",
    borderRadius: 24,
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 20,
    paddingHorizontal: 16,
    height: 52,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: "#ffffff",
    fontSize: 16,
    ...Platform.select({
      web: { outlineStyle: "none" } as any,
    }),
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  currencyListRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    borderBottomWidth: 0.5,
    borderBottomColor: "#125473",
  },
  currencyRowText: {
    color: "#cbd5e1",
    fontSize: 16,
    fontWeight: "400",
  },
  currencyRowTextActive: {
    color: "#ffffff",
    fontWeight: "500",
  },
});
