// components/ui/landlord/units/EditUnitImagesModal.tsx
import ImagePreviewGrid from "@/components/media/ImagePreviewGrid";
import {
  appendUniqueImageUris,
  capturePhotoWithCamera,
  notifyMediaMessage,
  pickImagesFromLibrary,
} from "@/utils/media/imagePickerHelpers";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

interface EditUnitImagesModalProps {
  visible: boolean;
  initialImages: string[];
  onCancel: () => void;
  onSave: (updatedImages: string[]) => void;
}

export default function EditUnitImagesModal({
  visible,
  initialImages,
  onCancel,
  onSave,
}: EditUnitImagesModalProps) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [isPickingMedia, setIsPickingMedia] = useState(false);

  useEffect(() => {
    if (visible) {
      setImages(initialImages);
      setIsPickingMedia(false);
    }
  }, [visible, initialImages]);

  const handlePickImages = async () => {
    if (isPickingMedia) return;
    setIsPickingMedia(true);
    try {
      const picked = await pickImagesFromLibrary({
        allowsMultipleSelection: true,
        permissionMessage:
          "Please allow photo library access to pick unit pictures.",
      });
      if (picked.length > 0) {
        setImages((prev) => appendUniqueImageUris(prev, picked));
      }
    } catch (error) {
      console.error("Failed to pick unit images:", error);
      notifyMediaMessage("Gallery Error", "Unable to open the image library.");
    } finally {
      setIsPickingMedia(false);
    }
  };

  const handleOpenCamera = async () => {
    if (isPickingMedia) return;
    setIsPickingMedia(true);
    try {
      const captured = await capturePhotoWithCamera({
        allowsEditing: true,
        permissionMessage:
          "Please allow camera access to capture a unit picture.",
      });
      if (captured) {
        setImages((prev) => appendUniqueImageUris(prev, [captured]));
      }
    } catch (error) {
      console.error("Failed to open camera for unit image:", error);
      notifyMediaMessage("Camera Error", "Unable to launch the camera.");
    } finally {
      setIsPickingMedia(false);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <Portal>
      <View pointerEvents={visible ? "auto" : "none"} style={styles.portalHost}>
        <View style={styles.webFrame}>
          <Dialog visible={visible} onDismiss={onCancel} style={styles.dialog}>
            <Dialog.Title style={styles.title}>Edit image(s)</Dialog.Title>

            <Dialog.Content style={styles.content}>
              <View style={styles.attachBox}>
                <Text style={styles.attachHeading}>Attach Pictures</Text>

                <View style={styles.pickerRow}>
                  <Pressable
                    onPress={handlePickImages}
                    disabled={isPickingMedia}
                    style={styles.pickerAction}
                  >
                    <Ionicons name="image" size={18} color="#38BDF8" />
                    <Text style={styles.pickerActionText}>Pick image(s)</Text>
                  </Pressable>

                  {Platform.OS !== "web" && (
                    <Pressable
                      onPress={handleOpenCamera}
                      disabled={isPickingMedia}
                      style={styles.pickerAction}
                    >
                      <Ionicons name="camera" size={18} color="#38BDF8" />
                      <Text style={styles.pickerActionText}>Open camera</Text>
                    </Pressable>
                  )}
                </View>

                <ScrollView
                  style={styles.imageList}
                  nestedScrollEnabled
                  showsVerticalScrollIndicator={false}
                >
                  <ImagePreviewGrid
                    uris={images}
                    onRemoveImage={handleRemoveImage}
                    containerStyle={styles.gridOverride}
                    cardStyle={styles.unitPreviewCard}
                    accessibilityLabel="Delete unit image"
                  />
                </ScrollView>
              </View>
            </Dialog.Content>

            <Dialog.Actions style={styles.actions}>
              <Button
                onPress={onCancel}
                textColor="#7BC4FA"
                labelStyle={styles.btnLabel}
              >
                Cancel
              </Button>
              <Button
                onPress={() => onSave(images)}
                textColor="#7BC4FA"
                labelStyle={styles.btnLabel}
              >
                Save
              </Button>
            </Dialog.Actions>
          </Dialog>
        </View>
      </View>
    </Portal>
  );
}

const styles = StyleSheet.create({
  portalHost: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
  },
  webFrame: {
    flex: 1,
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%",
    alignSelf: "center",
    justifyContent: "center",
  },
  dialog: {
    backgroundColor: "#24313D",
    borderRadius: 16,
    marginHorizontal: 24,
    elevation: 8,
  },
  title: {
    color: "#F1F5F9",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10,
  },
  content: {
    paddingTop: 4,
  },
  attachBox: {
    backgroundColor: "#1B252F",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#475569",
    padding: 12,
  },
  attachHeading: {
    color: "#E2E8F0",
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 12,
  },
  pickerRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 14,
  },
  pickerAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  pickerActionText: {
    color: "#F1F5F9",
    fontSize: 14,
    fontWeight: "500",
  },
  imageList: {
    maxHeight: 160,
  },

  gridOverride: {
    marginTop: 8,
  },
  unitPreviewCard: {
    backgroundColor: "#1B252F",
    borderColor: "#475569",
  },
  actions: {
    paddingHorizontal: 16,
    paddingBottom: 14,
    gap: 8,
  },
  btnLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
});
