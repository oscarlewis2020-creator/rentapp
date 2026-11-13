import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Portal } from "react-native-paper";

interface LandlordFabOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBuildingPress: () => void;
  onAddUnitPress: () => void;
  onApplyForLeasePress: () => void;
}

export default function LandlordFabOverlay({
  isOpen,
  onClose,
  onAddBuildingPress,
  onAddUnitPress,
  onApplyForLeasePress,
}: LandlordFabOverlayProps) {
  if (!isOpen) return null;

  const handleAction = (callback: () => void) => {
    onClose();
    callback();
  };

  return (
    <Portal>
      <View style={styles.portalRoot} pointerEvents="box-none">
        <Pressable style={styles.backdropDim} onPress={onClose} />

        <View style={styles.centeredBounds} pointerEvents="box-none">
          <View style={styles.menuStack}>
            {/* Action 1: Add Building */}
            <TouchableOpacity
              style={styles.actionRow}
              onPress={() => handleAction(onAddBuildingPress)}
              activeOpacity={0.8}
            >
              <Text style={styles.actionLabel}>Add Building</Text>
              <View style={styles.miniFabButton}>
                <Ionicons name="business" size={20} color="#86d3ff" />
              </View>
            </TouchableOpacity>

            {/* Action 2: Add Unit */}
            <TouchableOpacity
              style={styles.actionRow}
              onPress={() => handleAction(onAddUnitPress)}
              activeOpacity={0.8}
            >
              <Text style={styles.actionLabel}>Add Unit</Text>
              <View style={styles.miniFabButton}>
                <Ionicons name="bed" size={20} color="#86d3ff" />
              </View>
            </TouchableOpacity>

            {/* Action 3: Apply For Lease */}
            <TouchableOpacity
              style={styles.actionRow}
              onPress={() => handleAction(onApplyForLeasePress)}
              activeOpacity={0.8}
            >
              <Text style={styles.actionLabel}>Apply For Lease</Text>
              <View style={styles.miniFabButton}>
                <MaterialCommunityIcons
                  name="file-document"
                  size={20}
                  color="#86d3ff"
                />
              </View>
            </TouchableOpacity>

            {/* Close ('X') Primary FAB */}
            <TouchableOpacity
              style={styles.primaryFabButton}
              onPress={onClose}
              activeOpacity={0.85}
            >
              <Ionicons name="close" size={26} color="#86d3ff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Portal>
  );
}

const styles = StyleSheet.create({
  portalRoot: {
    ...StyleSheet.absoluteFill,
    zIndex: 999,
  },
  backdropDim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(10, 14, 20, 0.84)",
  },
  centeredBounds: {
    flex: 1,
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingRight: 16,
    paddingBottom: 76, // Aligns directly over your ControlActionBar FAB position
  },
  menuStack: {
    alignItems: "flex-end",
    gap: 18,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    paddingRight: 6,
    ...Platform.select({ web: { cursor: "pointer" } }),
  },
  actionLabel: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  miniFabButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#1f2b3a",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    ...Platform.select({
      web: { boxShadow: "0px 4px 10px rgba(0,0,0,0.4)" },
    }),
  },
  primaryFabButton: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#02435e",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    elevation: 6,
    ...Platform.select({
      web: {
        cursor: "pointer",
        boxShadow: "0px 6px 14px rgba(0,0,0,0.45)",
      },
    }),
  },
});
