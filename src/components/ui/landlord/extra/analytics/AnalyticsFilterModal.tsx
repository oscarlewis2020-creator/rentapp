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

interface AnalyticsFilterModalProps {
  isVisible: boolean;
  onClose: () => void;
  onApplyFilters: (selectedUnits: string[], paymentBehaviors: string[]) => void;
}

export default function AnalyticsFilterModal({
  isVisible,
  onClose,
  onApplyFilters,
}: AnalyticsFilterModalProps) {
  // Option check states
  const [occupiedUnits, setOccupiedUnits] = useState(true);
  const [vacantUnits, setVacantUnits] = useState(false);

  const [paidOnTime, setPaidOnTime] = useState(false);
  const [paidLate, setPaidLate] = useState(false);
  const [paidPartial, setPaidPartial] = useState(false);
  const [paidNothing, setPaidNothing] = useState(false);

  const handleReset = () => {
    setOccupiedUnits(false);
    setVacantUnits(false);
    setPaidOnTime(false);
    setPaidLate(false);
    setPaidPartial(false);
    setPaidNothing(false);
  };

  const handleApply = () => {
    const units: string[] = [];
    if (occupiedUnits) units.push("occupied units");
    if (vacantUnits) units.push("vacant units");

    const behaviors: string[] = [];
    if (paidOnTime) behaviors.push("on time");
    if (paidLate) behaviors.push("late");

    onApplyFilters(units, behaviors);
  };

  return (
    <Portal>
      <PaperModal
        visible={isVisible}
        onDismiss={onClose}
        contentContainerStyle={styles.paperModalOverride}
      >
        <View style={styles.modalBackdropScrim}>
          <View style={styles.modalCardContainer}>
            <View style={styles.sheetGrabberLine} />

            <TouchableOpacity
              style={styles.closeAbsoluteButton}
              onPress={onClose}
            >
              <Ionicons name="close" size={24} color="#ffffff" />
            </TouchableOpacity>

            {/* Units Display Section Group */}
            <View style={styles.fieldsetSectionBox}>
              <Text style={styles.sectionHeadingTitle}>
                Units to be displayed :
              </Text>
              <TouchableOpacity
                style={styles.checkboxRowOption}
                onPress={() => setOccupiedUnits(!occupiedUnits)}
              >
                <Ionicons
                  name={occupiedUnits ? "checkbox" : "square-outline"}
                  size={22}
                  color="#4fa3f7"
                />
                <Text style={styles.checkboxLabelText}>
                  Only occupied units
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.checkboxRowOption}
                onPress={() => setVacantUnits(!vacantUnits)}
              >
                <Ionicons
                  name={vacantUnits ? "checkbox" : "square-outline"}
                  size={22}
                  color="#4fa3f7"
                />
                <Text style={styles.checkboxLabelText}>Only vacant units</Text>
              </TouchableOpacity>
            </View>

            {/* Payment Behaviors Section Group */}
            <View style={styles.fieldsetSectionBox}>
              <Text style={styles.sectionHeadingTitle}>
                Tenant payment behaviour :
              </Text>
              <TouchableOpacity
                style={styles.checkboxRowOption}
                onPress={() => setPaidOnTime(!paidOnTime)}
              >
                <Ionicons
                  name={paidOnTime ? "checkbox" : "square-outline"}
                  size={22}
                  color="#4fa3f7"
                />
                <Text style={styles.checkboxLabelText}>Paid fully on time</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.checkboxRowOption}
                onPress={() => setPaidLate(!paidLate)}
              >
                <Ionicons
                  name={paidLate ? "checkbox" : "square-outline"}
                  size={22}
                  color="#4fa3f7"
                />
                <Text style={styles.checkboxLabelText}>
                  Paid fully but late
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.checkboxRowOption}
                onPress={() => setPaidPartial(!paidPartial)}
              >
                <Ionicons
                  name={paidPartial ? "checkbox" : "square-outline"}
                  size={22}
                  color="#4fa3f7"
                />
                <Text style={styles.checkboxLabelText}>
                  Paid partially but incomplete
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.checkboxRowOption}
                onPress={() => setPaidNothing(!paidNothing)}
              >
                <Ionicons
                  name={paidNothing ? "checkbox" : "square-outline"}
                  size={22}
                  color="#4fa3f7"
                />
                <Text style={styles.checkboxLabelText}>Paid nothing</Text>
              </TouchableOpacity>
            </View>

            {/* Bottom Actions Control Row Element */}
            <View style={styles.modalActionsFooterRow}>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={handleReset}
              >
                <Ionicons
                  name="close"
                  size={16}
                  color="#ffffff"
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.resetButtonText}>Reset filters</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.applyButton}
                onPress={handleApply}
              >
                <Text style={styles.applyButtonText}>Apply filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </PaperModal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  paperModalOverride: {
    margin: 0,
    padding: 0,
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBackdropScrim: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },
  modalCardContainer: {
    width: "100%",
    maxWidth: 600,
    backgroundColor: "#02415d",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    alignSelf: "center",
    position: "relative",
  },
  sheetGrabberLine: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#135473",
    alignSelf: "center",
    marginBottom: 12,
  },
  closeAbsoluteButton: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 4,
    zIndex: 10,
  },
  fieldsetSectionBox: {
    backgroundColor: "#1c2431",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#252f41",
    padding: 16,
    marginBottom: 16,
  },
  sectionHeadingTitle: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 16,
  },
  checkboxRowOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 12,
  },
  checkboxLabelText: { color: "#cbd5e1", fontSize: 15, fontWeight: "400" },
  modalActionsFooterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    gap: 16,
    paddingBottom: Platform.OS === "ios" ? 16 : 4,
  },
  resetButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#52656d",
    borderRadius: 24,
    height: 48,
  },
  resetButtonText: { color: "#ffffff", fontSize: 15, fontWeight: "500" },
  applyButton: {
    flex: 1,
    backgroundColor: "#86d3ff",
    borderRadius: 24,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  applyButtonText: { color: "#161c24", fontSize: 15, fontWeight: "700" },
});
