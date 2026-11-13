import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal, Portal } from "react-native-paper";

const BATHROOM_OPTIONS = ["1", "2", "3", "4"];

interface BathroomsModalProps {
  visible: boolean;
  selected: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}

export function BathroomsModal({
  visible,
  selected,
  onSelect,
  onClose,
}: BathroomsModalProps) {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.modalContainer}
      >
        <View style={styles.dragHandle} />
        <View style={styles.modalHeader}>
          <Text style={styles.modalHeaderText}>Bath rooms</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={22} color="#F1F5F9" />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.listContent}>
          {BATHROOM_OPTIONS.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.optionRow}
              onPress={() => onSelect(item)}
            >
              <Text style={styles.optionText}>{item}</Text>
              <View
                style={[
                  styles.checkbox,
                  selected === item && styles.checkboxSelected,
                ]}
              >
                {selected === item && (
                  <MaterialCommunityIcons
                    name="check"
                    size={16}
                    color="#F8FAFC"
                  />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#0F2735",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "75%",
    position: "absolute",
    bottom: 0,
    left: Platform.OS === "web" ? "auto" : 0, // Prevent stretching full-width on wide screens if desired
    right: Platform.OS === "web" ? "auto" : 0,
    width: Platform.OS === "web" ? "100%" : undefined,
    maxWidth: 600, // Matches your LandlordHome max-width constraint!
    alignSelf: "center",
    paddingBottom: 30,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#64748B",
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 8,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#113548",
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  modalHeaderText: { color: "#F8FAFC", fontSize: 16, fontWeight: "600" },
  listContent: { paddingHorizontal: 20, paddingVertical: 6 },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#1E3A4C",
  },
  optionText: { color: "#F8FAFC", fontSize: 16 },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1.5,
    borderColor: "#94A3B8",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: { backgroundColor: "#0284C7", borderColor: "#0284C7" },
});
