import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal as PaperModal, Portal } from "react-native-paper";

interface CutoffDateModalProps {
  isVisible: boolean;
  currentDay: string;
  onClose: () => void;
  onSubmit: (newDay: string) => void;
}

export default function CutoffDateModal({
  isVisible,
  currentDay,
  onClose,
  onSubmit,
}: CutoffDateModalProps) {
  const [dayValue, setDayValue] = useState(currentDay || "10");

  return (
    <Portal>
      <PaperModal
        visible={isVisible}
        onDismiss={onClose}
        contentContainerStyle={styles.paperModalOverride}
      >
        <View style={styles.modalBackdropScrim}>
          <View style={styles.modalCardCard}>
            <Text style={styles.modalMainTitleText}>Change cutoff date</Text>

            {/* Outlined Custom Floating Fieldset Box */}
            <View style={styles.outlinedFormCardField}>
              <Text style={styles.fieldsetFloatingLabel}>
                Payment cutoff date
              </Text>
              <View style={styles.fieldInnerRowLayout}>
                <Ionicons
                  name="calendar"
                  size={20}
                  color="#4fa3f7"
                  style={{ marginRight: 12 }}
                />
                <TextInput
                  style={styles.textInputFieldComponent}
                  value={dayValue}
                  onChangeText={setDayValue}
                  keyboardType="numeric"
                  maxLength={2}
                />
              </View>
            </View>
            <Text style={styles.fieldLabelHintText}>
              Enter a date value from 1 to 28
            </Text>

            {/* Bottom Actions Control Row Element */}
            <View style={styles.modalActionsRow}>
              <TouchableOpacity
                style={styles.textActionButton}
                onPress={onClose}
              >
                <Text style={styles.actionButtonLabelText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.textActionButton}
                onPress={() => onSubmit(dayValue)}
              >
                <Text style={styles.actionButtonLabelText}>Submit</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackdropScrim: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  modalCardCard: {
    width: "100%",
    maxWidth: 350,
    backgroundColor: "#1c2431",
    borderRadius: 16,
    padding: 24,
  },
  modalMainTitleText: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 24,
    textAlign: "center",
  },
  outlinedFormCardField: {
    borderWidth: 1,
    borderColor: "#4fa3f7",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    position: "relative",
    backgroundColor: "#161c24",
    height: 56,
    justifyContent: "center",
  },
  fieldsetFloatingLabel: {
    position: "absolute",
    top: -10,
    left: 14,
    backgroundColor: "#1c2431",
    paddingHorizontal: 6,
    color: "#8a94a6",
    fontSize: 12,
  },
  fieldInnerRowLayout: { flexDirection: "row", alignItems: "center" },
  textInputFieldComponent: {
    flex: 1,
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
    ...Platform.select({ web: { outlineStyle: "none" } as any }),
  },
  fieldLabelHintText: {
    color: "#8a94a6",
    fontSize: 12.5,
    marginTop: 6,
    paddingHorizontal: 4,
    marginBottom: 32,
  },
  modalActionsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 24,
  },
  textActionButton: { paddingVertical: 4, paddingHorizontal: 4 },
  actionButtonLabelText: { color: "#4fa3f7", fontSize: 15, fontWeight: "600" },
});
