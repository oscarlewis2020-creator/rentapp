import { groupImagesIntoTwoColumnRows } from "@/utils/media/imagePickerHelpers";
import { Ionicons } from "@expo/vector-icons";
import {
  Platform,
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
interface ImagePreviewGridProps {
  uris: string[];
  onRemoveImage: (index: number) => void;
  containerStyle?: StyleProp<ViewStyle>;
  cardStyle?: StyleProp<ViewStyle>;
  deleteButtonColor?: string;
  deleteIconColor?: string;
  accessibilityLabel?: string;
}

export default function ImagePreviewGrid({
  uris,
  onRemoveImage,
  containerStyle,
  cardStyle,
  deleteButtonColor = "#D9827B",
  deleteIconColor = "#161C24",
  accessibilityLabel = "Remove image",
}: ImagePreviewGridProps) {
  if (!uris.length) return null;

  const rows = groupImagesIntoTwoColumnRows(uris);

  return (
    <View style={[styles.previewList, containerStyle]}>
      {rows.map((pair, rowIndex) => {
        const isSingleInRow = pair.length === 1;

        return (
          <View key={`row-${rowIndex}`} style={styles.previewRow}>
            {pair.map((item) => (
              <View
                key={item.key}
                style={[
                  styles.previewCard,
                  isSingleInRow ? styles.fullWidthCard : styles.halfWidthCard,
                  cardStyle,
                ]}
              >
                <Image
                  source={{ uri: item.uri }}
                  style={styles.previewThumb}
                  resizeMode="cover"
                />
                <TouchableOpacity
                  onPress={() => onRemoveImage(item.index)}
                  activeOpacity={0.8}
                  hitSlop={6}
                  style={[
                    styles.deleteBtn,
                    { backgroundColor: deleteButtonColor },
                  ]}
                  accessibilityLabel={accessibilityLabel}
                >
                  <Ionicons name="trash" size={15} color={deleteIconColor} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  previewList: {
    marginTop: 12,
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
  previewCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 7,
    backgroundColor: "#1E293B",
  },
  previewThumb: {
    width: 56,
    height: 44,
    borderRadius: 8,
    backgroundColor: "#0F172A",
  },
  deleteBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    opacity: 1,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({ web: { cursor: "pointer" } }),
  },
});
