import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal as PaperModal, Portal } from "react-native-paper";

interface EditImagesModalProps {
  isVisible: boolean;
  initialImages?: string[];
  onCancel: () => void;
  onSave: (updatedImages: string[]) => void;
}

interface ImageEntry {
  key: string;
  uri: string;
  index: number;
}

const EMPTY_IMAGES: string[] = [];

export default function EditBuildingImagesModal({
  isVisible,
  initialImages = EMPTY_IMAGES,
  onCancel,
  onSave,
}: EditImagesModalProps) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [isPickingMedia, setIsPickingMedia] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setImages(initialImages);
      setIsPickingMedia(false);
    }
  }, [isVisible]);

  const notifyUser = (title: string, message: string) => {
    if (Platform.OS === "web") {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handlePickImages = async () => {
    if (isPickingMedia) return;
    setIsPickingMedia(true);

    try {
      if (Platform.OS !== "web") {
        const permission =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
          notifyUser(
            "Permission Required",
            "Please allow photo library access to select images.",
          );
          return;
        }
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsMultipleSelection: true,
        quality: 0.85,
      });

      if (!result.canceled && result.assets?.length) {
        const pickedUris = result.assets.map((asset) => asset.uri);
        setImages((prev) => Array.from(new Set([...prev, ...pickedUris])));
      }
    } catch (error) {
      console.error("Failed to pick images:", error);
      notifyUser("Gallery Error", "Unable to open the image library.");
    } finally {
      setIsPickingMedia(false);
    }
  };

  const handleOpenCamera = async () => {
    if (isPickingMedia) return;
    setIsPickingMedia(true);

    try {
      if (Platform.OS !== "web") {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
          notifyUser(
            "Permission Required",
            "Please allow camera access to capture a photo.",
          );
          return;
        }
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 0.85,
      });

      if (!result.canceled && result.assets?.length) {
        const capturedUri = result.assets[0].uri;
        setImages((prev) => Array.from(new Set([...prev, capturedUri])));
      }
    } catch (error) {
      console.error("Failed to open camera:", error);
      notifyUser("Camera Error", "Unable to launch the camera.");
    } finally {
      setIsPickingMedia(false);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const indexedEntries: ImageEntry[] = images.map((uri, index) => ({
    key: `${uri}-${index}`,
    uri,
    index,
  }));

  const rows: ImageEntry[][] = Array.from(
    { length: Math.ceil(indexedEntries.length / 2) },
    (_, rowIndex) => indexedEntries.slice(rowIndex * 2, rowIndex * 2 + 2),
  );

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
              <TouchableOpacity
                style={styles.mediaButton}
                activeOpacity={0.75}
                disabled={isPickingMedia}
                onPress={handlePickImages}
              >
                <Ionicons
                  name="images-outline"
                  size={18}
                  color="#4fa3f7"
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.mediaButtonText}>Pick image(s)</Text>
              </TouchableOpacity>

              {Platform.OS !== "web" && (
                <TouchableOpacity
                  style={styles.mediaButton}
                  activeOpacity={0.75}
                  disabled={isPickingMedia}
                  onPress={handleOpenCamera}
                >
                  <Ionicons
                    name="camera-outline"
                    size={18}
                    color="#4fa3f7"
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.mediaButtonText}>Open camera</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Dynamic 2-Column Thumbnail Preview Rows */}
            {rows.length > 0 && (
              <ScrollView
                style={styles.previewScroll}
                contentContainerStyle={styles.previewRowsContainer}
                nestedScrollEnabled
                showsVerticalScrollIndicator={false}
              >
                {rows.map((pair, rowIndex) => {
                  const isSingleInRow = pair.length === 1;

                  return (
                    <View key={`row-${rowIndex}`} style={styles.previewRow}>
                      {pair.map((entry) => (
                        <View
                          key={entry.key}
                          style={[
                            styles.thumbnailWrapperCard,
                            isSingleInRow
                              ? styles.fullWidthCard
                              : styles.halfWidthCard,
                          ]}
                        >
                          <Image
                            source={{ uri: entry.uri }}
                            style={styles.previewThumbnail}
                            resizeMode="cover"
                          />
                          <TouchableOpacity
                            style={styles.deleteIconButton}
                            activeOpacity={0.8}
                            hitSlop={6}
                            onPress={() => handleRemoveImage(entry.index)}
                            accessibilityLabel="Delete image"
                          >
                            <Ionicons name="trash" size={15} color="#161c24" />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  );
                })}
              </ScrollView>
            )}
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.textButton} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.textButton}
              onPress={() => onSave(images)}
            >
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </PaperModal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  paperOverride: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  modalCard: {
    width: "100%",
    maxWidth: 420,
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
    marginBottom: 28,
  },
  fieldLabel: {
    position: "absolute",
    top: -10,
    alignSelf: "center",
    backgroundColor: "#1c2431",
    paddingHorizontal: 6,
    color: "#cbd5e1",
    fontSize: 12,
  },
  uploadActionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  mediaButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    ...Platform.select({ web: { cursor: "pointer" } }),
  },
  mediaButtonText: {
    color: "#4fa3f7",
    fontSize: 14,
    fontWeight: "500",
  },
  previewScroll: {
    maxHeight: 220,
  },
  previewRowsContainer: {
    gap: 10,
  },
  previewRow: {
    flexDirection: "row",
    gap: 10,
  },
  halfWidthCard: {
    flex: 1,
  },
  fullWidthCard: {
    width: "100%",
  },
  thumbnailWrapperCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#343e50",
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 7,
    backgroundColor: "#1c2431",
  },
  previewThumbnail: {
    width: 54,
    height: 42,
    borderRadius: 8,
    backgroundColor: "#252f41",
  },
  deleteIconButton: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#D9827B",
    opacity: 1,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({ web: { cursor: "pointer" } }),
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 24,
  },
  textButton: {
    paddingVertical: 6,
    paddingHorizontal: 4,
    ...Platform.select({ web: { cursor: "pointer" } }),
  },
  cancelText: {
    color: "#4fa3f7",
    fontSize: 16,
    fontWeight: "600",
  },
  saveText: {
    color: "#4fa3f7",
    fontSize: 16,
    fontWeight: "600",
  },
});
