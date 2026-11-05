import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal as PaperModal, Portal } from "react-native-paper";
import CurrencySearchModal from "./CurrencySearchModal"; // 💡 Wired to deep selection modal

interface BuildingCurrencyModalProps {
  isVisible: boolean;
  currentCurrency: string;
  onCancel: () => void;
  onUpdate: (newCurrency: string) => void;
}

export default function BuildingCurrencyModal({
  isVisible,
  currentCurrency,
  onCancel,
  onUpdate,
}: BuildingCurrencyModalProps) {
  const [selectedCurrency, setSelectedCurrency] = useState(currentCurrency);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleApplySelection = () => {
    onUpdate(selectedCurrency);
  };

  return (
    <>
      <Portal>
        <PaperModal
          visible={isVisible && !isSearchOpen} // Hides base modal when sub-layer displays
          onDismiss={onCancel}
          contentContainerStyle={styles.paperModalContentOverride}
        >
          <View style={styles.modalBackdropScrim}>
            <View style={styles.modalContainerCard}>
              <View style={styles.modalHeaderRow}>
                <View style={styles.currencyIconWrapper}>
                  <Ionicons name="cash" size={20} color="#161c24" />
                </View>
                <Text style={styles.modalTitleText}>Building currency</Text>
              </View>

              {/* Tapping field now safely routes into sub-selection flow */}
              <View style={styles.dropdownMasterWrapper}>
                <TouchableOpacity
                  style={styles.outlinedFormCard}
                  onPress={() => setIsSearchOpen(true)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.fieldsetFloatingLabel}>
                    Building Currency
                  </Text>
                  <View style={styles.dropdownInnerContent}>
                    <View style={styles.innerValueContainer}>
                      <Ionicons
                        name="cash"
                        size={18}
                        color="#4fa3f7"
                        style={styles.innerFieldIcon}
                      />
                      <Text style={styles.dropdownTextValue}>
                        {selectedCurrency}
                      </Text>
                    </View>
                    <Ionicons name="caret-down" size={16} color="#8a94a6" />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.modalActionRow}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={onCancel}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.updateButton}
                  onPress={handleApplySelection}
                >
                  <Text style={styles.updateButtonText}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </PaperModal>
      </Portal>

      {/* 💡 Sub-Modal Flow Component Layer */}
      <CurrencySearchModal
        isVisible={isSearchOpen}
        selectedCurrency={selectedCurrency}
        onClose={() => setIsSearchOpen(false)}
        onSelect={(currency) => {
          setSelectedCurrency(currency);
          setIsSearchOpen(false); // Cascades return tracking view down automatically
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  paperModalContentOverride: {
    margin: 0,
    padding: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackdropScrim: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  modalContainerCard: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#1c2431",
    borderRadius: 24,
    padding: 24,
  },
  modalHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  currencyIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#4fa3f7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  modalTitleText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "500",
  },
  dropdownMasterWrapper: {
    marginBottom: 32,
  },
  outlinedFormCard: {
    borderWidth: 1,
    borderColor: "#343e50",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    position: "relative",
    backgroundColor: "#161c24",
    ...Platform.select({
      web: { cursor: "pointer" },
    }),
  },
  fieldsetFloatingLabel: {
    position: "absolute",
    top: -10,
    left: 12,
    backgroundColor: "#1c2431",
    paddingHorizontal: 6,
    color: "#8a94a6",
    fontSize: 12,
  },
  dropdownInnerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  innerValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  innerFieldIcon: {
    marginRight: 10,
  },
  dropdownTextValue: {
    color: "#ffffff",
    fontSize: 15.5,
  },
  modalActionRow: {
    flexDirection: "row",
    gap: 16,
  },
  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#343e50",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    color: "#4fa3f7",
    fontSize: 16,
    fontWeight: "500",
  },
  updateButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#86d3ff",
    alignItems: "center",
    justifyContent: "center",
  },
  updateButtonText: {
    color: "#161c24",
    fontSize: 16,
    fontWeight: "600",
  },
});
