import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Modal as PaperModal, Portal } from "react-native-paper";

interface EditImagesModalProps {
  isVisible: boolean;
  onCancel: () => void;
  onSave: () => void;
}

export default function EditImagesModal({
  isVisible,
  onCancel,
  onSave,
}: EditImagesModalProps) {
  return (
    <Portal>
      <PaperModal
        visible={isVisible}
        onDismiss={onCancel}
        contentContainerStyle={styles.paperOverride}
      >
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Edit image(s)</Text>

          <View style={styles.fieldsetCard}>
            <Text style={styles.fieldLabel}>Attach Pictures</Text>
            <View style={styles.uploadActionsRow}>
              <TouchableOpacity style={styles.mediaButton}>
                <Ionicons
                  name="images-outline"
                  size={18}
                  color="#4fa3f7"
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.mediaButtonText}>Pick image(s)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.mediaButton}>
                <Ionicons
                  name="camera-outline"
                  size={18}
                  color="#4fa3f7"
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.mediaButtonText}>Open camera</Text>
              </TouchableOpacity>
            </View>

            {/* Thumbnail Preview Stack */}
            <View style={styles.thumbnailWrapperCard}>
              <View style={styles.circleThumbnailPlaceholder}>
                <Ionicons name="document-text" size={18} color="#4fa3f7" />
              </View>
              <TouchableOpacity style={styles.deleteIconButton}>
                <Ionicons name="trash-outline" size={20} color="#ff6b6b" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.textButton} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.textButton} onPress={onSave}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </PaperModal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  paperOverride: { flex: 1, justifyContent: "center", alignItems: "center" },
  modalCard: {
    width: "100%",
    maxWidth: 350,
    backgroundColor: "#1c2431",
    borderRadius: 24,
    padding: 24,
  },
  modalTitle: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 20,
    textAlign: "center",
  },
  fieldsetCard: {
    borderWidth: 1,
    borderColor: "#343e50",
    borderRadius: 8,
    padding: 16,
    position: "relative",
    backgroundColor: "#161c24",
    marginBottom: 32,
  },
  fieldLabel: {
    position: "absolute",
    top: -10,
    left: 12,
    backgroundColor: "#1c2431",
    paddingHorizontal: 6,
    color: "#cbd5e1",
    fontSize: 12,
  },
  uploadActionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  mediaButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  mediaButtonText: { color: "#ffffff", fontSize: 14, fontWeight: "500" },
  thumbnailWrapperCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#252f41",
    borderRadius: 24,
    padding: 8,
    backgroundColor: "#1c2431",
  },
  circleThumbnailPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#134e6a",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteIconButton: { padding: 6, marginRight: 4 },
  actionRow: { flexDirection: "row", justifyContent: "flex-end", gap: 24 },
  textButton: { paddingVertical: 6, paddingHorizontal: 4 },
  cancelText: { color: "#4fa3f7", fontSize: 16, fontWeight: "600" },
  saveText: { color: "#4fa3f7", fontSize: 16, fontWeight: "600" },
});
