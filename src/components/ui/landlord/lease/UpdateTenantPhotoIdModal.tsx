// components/ui/landlord/lease/UpdateTenantPhotoIdModal.tsx
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

interface UpdateTenantPhotoIdModalProps {
  visible: boolean;
  tenantName: string;
  idNumberLabel?: string;
  onClose: () => void;
  onPickImage?: () => void;
  onOpenCamera?: () => void;
  onSubmit?: (selectedSource: "gallery" | "camera" | null) => void;
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

  useEffect(() => {
    if (visible) {
      setSelectedSource(null);
    }
  }, [visible]);

  const handleGallery = () => {
    setSelectedSource("gallery");
    onPickImage?.();
  };

  const handleCamera = () => {
    setSelectedSource("camera");
    onOpenCamera?.();
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
              <Pressable onPress={handleGallery} style={styles.sourceOption}>
                <Ionicons
                  name="image"
                  size={20}
                  color={selectedSource === "gallery" ? "#79D2FA" : "#CBD5E1"}
                />
                <Text
                  style={[
                    styles.sourceLabel,
                    selectedSource === "gallery" && styles.sourceLabelActive,
                  ]}
                >
                  Pick one image
                </Text>
              </Pressable>

              <Pressable onPress={handleCamera} style={styles.sourceOption}>
                <Ionicons
                  name="camera"
                  size={20}
                  color={selectedSource === "camera" ? "#79D2FA" : "#CBD5E1"}
                />
                <Text
                  style={[
                    styles.sourceLabel,
                    selectedSource === "camera" && styles.sourceLabelActive,
                  ]}
                >
                  Open camera
                </Text>
              </Pressable>
            </View>
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
            onPress={() => onSubmit?.(selectedSource)}
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
    color: "#E2E8F0",
    fontSize: 15,
    fontWeight: "500",
  },
  sourceLabelActive: {
    color: "#79D2FA",
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
