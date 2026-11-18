// components/ui/landlord/units/EditUnitImagesModal.tsx
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
  Image,
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

  useEffect(() => {
    if (visible) {
      setImages(initialImages);
    }
  }, [visible, initialImages]);

  const handlePickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.length) {
      const uris = result.assets.map((asset) => asset.uri);
      setImages((prev) => [...prev, ...uris]);
    }
  };

  const handleOpenCamera = async () => {
    if (Platform.OS !== "web") {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.length) {
      setImages((prev) => [...prev, result.assets[0].uri]);
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
                    style={styles.pickerAction}
                  >
                    <Ionicons name="image" size={18} color="#38BDF8" />
                    <Text style={styles.pickerActionText}>Pick image(s)</Text>
                  </Pressable>

                  <Pressable
                    onPress={handleOpenCamera}
                    style={styles.pickerAction}
                  >
                    <Ionicons name="camera" size={18} color="#38BDF8" />
                    <Text style={styles.pickerActionText}>Open camera</Text>
                  </Pressable>
                </View>

                <ScrollView
                  style={styles.imageList}
                  nestedScrollEnabled
                  showsVerticalScrollIndicator={false}
                >
                  {images.map((uri, index) => (
                    <View key={`${uri}-${index}`} style={styles.imageRow}>
                      <Image source={{ uri }} style={styles.thumbnail} />
                      <Pressable
                        onPress={() => handleRemoveImage(index)}
                        style={styles.deleteBtn}
                        hitSlop={8}
                      >
                        <MaterialCommunityIcons
                          name="trash-can"
                          size={18}
                          color="#F87171"
                        />
                      </Pressable>
                    </View>
                  ))}
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
  imageRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
  thumbnail: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: "#0F172A",
  },
  deleteBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(248, 113, 113, 0.16)",
    alignItems: "center",
    justifyContent: "center",
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
