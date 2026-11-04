import { Ionicons } from "@expo/vector-icons";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ControlActionBarProps {
  onFilterPress: () => void;
  onSortPress: () => void;
  onAddPress: () => void;
}

export function ControlActionBar({
  onFilterPress,
  onSortPress,
  onAddPress,
}: ControlActionBarProps) {
  return (
    <View style={styles.bottomOverlayContainer}>
      <View style={styles.filterSortPill}>
        <TouchableOpacity style={styles.pillButton} onPress={onFilterPress}>
          <Ionicons name="funnel-outline" size={18} color="#FFF" />
          <Text style={styles.pillButtonText}>Filter</Text>
        </TouchableOpacity>
        <View style={styles.pillSeparator} />
        <TouchableOpacity style={styles.pillButton} onPress={onSortPress}>
          <Ionicons name="swap-vertical" size={18} color="#FFF" />
          <Text style={styles.pillButtonText}>Sort</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.floatingActionButton}
        onPress={onAddPress}
      >
        <Ionicons name="add" size={28} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomOverlayContainer: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    pointerEvents: "box-none",
  },
  filterSortPill: {
    flexDirection: "row",
    backgroundColor: "#243242",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#304257",
    overflow: "hidden",
  },
  pillButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 6,
  },
  pillButtonText: { color: "#FFF", fontWeight: "600", fontSize: 14 },
  pillSeparator: { width: 1, backgroundColor: "#304257", marginVertical: 8 },
  floatingActionButton: {
    backgroundColor: "#004D61",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: { elevation: 6 },
      web: { boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)" },
    }),
  },
});
