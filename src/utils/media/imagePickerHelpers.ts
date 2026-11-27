import * as ImagePicker from "expo-image-picker";
import { Alert, Platform } from "react-native";

export interface IndexedImageItem {
  key: string;
  uri: string;
  index: number;
}

export function notifyMediaMessage(title: string, message: string): void {
  if (Platform.OS === "web") {
    window.alert(`${title}: ${message}`);
  } else {
    Alert.alert(title, message);
  }
}

export async function pickImagesFromLibrary(options?: {
  allowsMultipleSelection?: boolean;
  allowsEditing?: boolean;
  quality?: number;
  permissionMessage?: string;
}): Promise<string[]> {
  const {
    allowsMultipleSelection = true,
    allowsEditing = false,
    quality = 0.85,
    permissionMessage = "Please allow photo library access to select images.",
  } = options ?? {};

  if (Platform.OS !== "web") {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      notifyMediaMessage("Permission Required", permissionMessage);
      return [];
    }
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsMultipleSelection,
    allowsEditing: allowsMultipleSelection ? false : allowsEditing,
    quality,
  });

  if (result.canceled || !result.assets?.length) {
    return [];
  }

  return result.assets.map((asset) => asset.uri);
}

export async function capturePhotoWithCamera(options?: {
  allowsEditing?: boolean;
  quality?: number;
  permissionMessage?: string;
}): Promise<string | null> {
  const {
    allowsEditing = true,
    quality = 0.85,
    permissionMessage = "Please allow camera access to capture a photo.",
  } = options ?? {};

  if (Platform.OS !== "web") {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      notifyMediaMessage("Permission Required", permissionMessage);
      return null;
    }
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ["images"],
    allowsEditing,
    quality,
  });

  if (result.canceled || !result.assets?.length) {
    return null;
  }

  return result.assets[0].uri;
}

export function appendUniqueImageUris(
  existingUris: string[],
  incomingUris: string[],
): string[] {
  return Array.from(new Set([...existingUris, ...incomingUris]));
}

export function groupImagesIntoTwoColumnRows(
  uris: string[],
): IndexedImageItem[][] {
  const indexed: IndexedImageItem[] = uris.map((uri, index) => ({
    key: `${uri}-${index}`,
    uri,
    index,
  }));

  return Array.from({ length: Math.ceil(indexed.length / 2) }, (_, rowIndex) =>
    indexed.slice(rowIndex * 2, rowIndex * 2 + 2),
  );
}
