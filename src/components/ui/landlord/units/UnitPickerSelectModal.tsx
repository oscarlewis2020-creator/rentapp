import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal as PaperModal, Portal } from "react-native-paper";

interface UnitPickerSelectModalProps {
  visible: boolean;
  onClose: () => void;
  units: { id: string; name: string }[];
  selectedUnitId: string;
  onSelectUnit: (unitId: string) => void;
}

export function UnitPickerSelectModal({
  visible,
  onClose,
  units,
  selectedUnitId,
  onSelectUnit,
}: UnitPickerSelectModalProps) {
  return (
    <Portal>
      <PaperModal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.paperModalOverride}
      >
        <View style={styles.backdropScrim}>
          <View style={styles.sheetContainer}>
            <View style={styles.grabber} />
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#ffffff" />
            </TouchableOpacity>
            <View style={styles.headerDivider} />

            <ScrollView
              style={styles.scrollArea}
              contentContainerStyle={styles.scrollContent}
            >
              <Text style={styles.dialogTitle}>Select a Unit</Text>
              {units.length > 0 ? (
                units.map((u) => {
                  const isSelected = u.id === selectedUnitId;
                  return (
                    <TouchableOpacity
                      key={u.id}
                      style={styles.optionRow}
                      onPress={() => {
                        onSelectUnit(u.id);
                        onClose();
                      }}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          isSelected && styles.selectedText,
                        ]}
                      >
                        {u.name}
                      </Text>
                      {isSelected && (
                        <Ionicons name="checkmark" size={18} color="#86d3ff" />
                      )}
                    </TouchableOpacity>
                  );
                })
              ) : (
                <View style={{ padding: 20, alignItems: "center" }}>
                  <Text style={{ color: "#8a94a6" }}>No units available</Text>
                </View>
              )}
            </ScrollView>
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
  backdropScrim: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  sheetContainer: {
    width: "100%",
    maxWidth: 600,
    maxHeight: "70%",
    backgroundColor: "#02435e",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    alignSelf: "center",
    paddingTop: 12,
  },
  grabber: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#122c38",
    alignSelf: "center",
    marginBottom: 8,
  },
  closeButton: { alignSelf: "flex-end", marginRight: 18, padding: 4 },
  headerDivider: {
    height: 1,
    backgroundColor: "#195a76",
    marginTop: 8,
    marginHorizontal: 14,
  },
  scrollArea: { flex: 1 },
  scrollContent: { padding: 16, gap: 10 },
  dialogTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#161c24",
    borderRadius: 8,
    marginBottom: 8,
  },
  optionText: { color: "#ffffff", fontSize: 15 },
  selectedText: { color: "#86d3ff", fontWeight: "600" },
});
