// components/ui/landlord/lease/UpdateTenantPhotoIdModal.tsx
import ImagePreviewGrid from "@/components/media/ImagePreviewGrid";
import {
  capturePhotoWithCamera,
  notifyMediaMessage,
  pickImagesFromLibrary,
} from "@/utils/media/imagePickerHelpers";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Alert, Platform, Pressable, StyleSheet, View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

export interface TenantPhotoIdResult {
  selectedSource: "gallery" | "camera" | null;
  photoUri: string | null;
  fileName: string | null;
}

interface UpdateTenantPhotoIdModalProps {
  visible: boolean;
  tenantName: string;
  idNumberLabel?: string;
  onClose: () => void;
  onPickImage?: (uri: string) => void;
  onOpenCamera?: (uri: string) => void;
  onSubmit?: (payload: TenantPhotoIdResult) => void;
}

export default function UpdateTenantPhotoIdModal({
  visible,
  tenantName,
  idNumberLabel = "N/A",
  onClose,
  onPickImage,
  onOpenCamera,
  onSubmit,
}: UpdateTenantPhotoIdModalProps) {
  const [selectedSource, setSelectedSource] = useState<
    "gallery" | "camera" | null
  >(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isPickingMedia, setIsPickingMedia] = useState(false);

  useEffect(() => {
    if (visible) {
      setSelectedSource(null);
      setPhotoUri(null);
      setFileName(null);
      setIsPickingMedia(false);
    }
  }, [visible]);

  const notifyUser = (title: string, message: string) => {
    if (Platform.OS === "web") {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleGallery = async () => {
    if (isPickingMedia) return;
    setIsPickingMedia(true);

    try {
      const picked = await pickImagesFromLibrary({
        allowsMultipleSelection: false,
        allowsEditing: true,
        permissionMessage:
          "Please allow photo library access to select a Photo ID.",
      });
      if (picked.length > 0) {
        const uri = picked[0];
        const derivedName =
          uri.split("/").pop()?.split("?")[0] || "tenant-id.jpg";
        setSelectedSource("gallery");
        setPhotoUri(uri);
        setFileName(derivedName);
        onPickImage?.(uri);
      }
    } catch (error) {
      console.error("Error picking tenant Photo ID:", error);
      notifyMediaMessage("Gallery Error", "Unable to open the photo library.");
    } finally {
      setIsPickingMedia(false);
    }
  };

  const handleCamera = async () => {
    if (isPickingMedia) return;
    setIsPickingMedia(true);

    try {
      const captured = await capturePhotoWithCamera({
        allowsEditing: true,
        permissionMessage: "Please allow camera access to capture a Photo ID.",
      });
      if (captured) {
        const derivedName =
          captured.split("/").pop()?.split("?")[0] || "tenant-id-camera.jpg";
        setSelectedSource("camera");
        setPhotoUri(captured);
        setFileName(derivedName);
        onOpenCamera?.(captured);
      }
    } catch (error) {
      console.error("Error opening camera for tenant Photo ID:", error);
      notifyMediaMessage("Camera Error", "Unable to launch the camera.");
    } finally {
      setIsPickingMedia(false);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoUri(null);
    setFileName(null);
    setSelectedSource(null);
  };

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onClose}
        style={styles.dialogContainer}
      >
        <Dialog.Title style={styles.title}>Photo Id upload</Dialog.Title>

        <Dialog.Content style={styles.content}>
          {/* Tenant Info Pill */}
          <View style={styles.tenantBox}>
            <Ionicons name="person" size={22} color="#94A3B8" />
            <View>
              <Text style={styles.tenantName}>{tenantName}</Text>
              <Text style={styles.tenantMeta}>{idNumberLabel}</Text>
            </View>
          </View>

          {/* Photo ID Selector Box */}
          <View style={styles.photoSelectorBox}>
            <Text style={styles.photoSelectorFloatingLabel}>Photo ID</Text>

            <View style={styles.sourcesRow}>
              <Pressable
                onPress={handleGallery}
                disabled={isPickingMedia}
                style={styles.sourceOption}
              >
                <Ionicons
                  name="image"
                  size={20}
                  color={selectedSource === "gallery" ? "#64748B" : "#79D2FA"}
                />
                <Text
                  style={[
                    styles.sourceLabel,
                    styles.sourceLabelDefault,
                    selectedSource === "gallery" && styles.sourceLabelBlurred,
                  ]}
                >
                  Pick one image
                </Text>
              </Pressable>

              {Platform.OS !== "web" && (
                <Pressable
                  onPress={handleCamera}
                  disabled={isPickingMedia}
                  style={styles.sourceOption}
                >
                  <Ionicons
                    name="camera"
                    size={20}
                    color={selectedSource === "camera" ? "#64748B" : "#79D2FA"}
                  />
                  <Text
                    style={[
                      styles.sourceLabel,
                      styles.sourceLabelDefault,
                      selectedSource === "camera" && styles.sourceLabelBlurred,
                    ]}
                  >
                    Open camera
                  </Text>
                </Pressable>
              )}
            </View>

            <ImagePreviewGrid
              uris={photoUri ? [photoUri] : []}
              onRemoveImage={handleRemovePhoto}
              containerStyle={styles.singlePreviewContainer}
              cardStyle={styles.singlePreviewCard}
              deleteIconColor="#202429"
              accessibilityLabel="Delete Photo ID"
            />
          </View>
        </Dialog.Content>

        <Dialog.Actions style={styles.actions}>
          <Button
            mode="outlined"
            onPress={onClose}
            style={styles.closeBtn}
            labelStyle={styles.closeLabel}
            textColor="#7BC4FA"
          >
            Close
          </Button>
          <Button
            mode="contained"
            onPress={() =>
              onSubmit?.({
                selectedSource,
                photoUri,
                fileName,
              })
            }
            style={styles.submitBtn}
            labelStyle={styles.submitLabel}
            buttonColor="#79D2FA"
            textColor="#0F172A"
          >
            Submit
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialogContainer: {
    backgroundColor: "#202429",
    borderRadius: 22,
    width: Platform.OS === "web" ? "90%" : "88%",
    maxWidth: 420,
    alignSelf: "center",
  },
  title: {
    color: "#F8FAFC",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 8,
  },
  content: {
    paddingHorizontal: 18,
    gap: 18,
  },
  tenantBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#2C3036",
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  tenantName: {
    color: "#E2E8F0",
    fontSize: 15,
    fontWeight: "500",
  },
  tenantMeta: {
    color: "#E2E8F0",
    fontSize: 16,
    marginTop: 2,
  },
  photoSelectorBox: {
    position: "relative",
    borderWidth: 1,
    borderColor: "#8A8F98",
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 18,
    marginTop: 4,
  },
  photoSelectorFloatingLabel: {
    position: "absolute",
    top: -10,
    alignSelf: "center",
    backgroundColor: "#202429",
    paddingHorizontal: 6,
    color: "#E2E8F0",
    fontSize: 13,
  },
  sourcesRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  sourceOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sourceLabel: {
    fontSize: 15,
    fontWeight: "500",
  },
  sourceLabelDefault: {
    color: "#79D2FA",
  },
  sourceLabelBlurred: {
    color: "#64748B",
  },
  sourceLabelActive: {
    color: "#79D2FA",
  },
  singlePreviewContainer: {
    marginTop: 14,
  },
  singlePreviewCard: {
    backgroundColor: "#202429",
    borderColor: "#8A8F98",
  },

  actions: {
    paddingHorizontal: 18,
    paddingBottom: 16,
    justifyContent: "flex-end",
    gap: 12,
  },
  closeBtn: {
    borderColor: "#64748B",
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  closeLabel: {
    fontSize: 15,
    fontWeight: "600",
  },
  submitBtn: {
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  submitLabel: {
    fontSize: 15,
    fontWeight: "600",
  },
});
