import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface BuildingOption {
  id: string;
  name: string;
  units: { id: string; name: string }[];
}

export interface SelectLeaseUnitModalProps {
  visible: boolean;
  buildings: BuildingOption[];
  initialBuildingId?: string;
  onCancel: () => void;
  onProceed: (buildingId: string, unitId: string) => void;
}

export default function SelectLeaseUnitModal({
  visible,
  buildings,
  initialBuildingId,
  onCancel,
  onProceed,
}: SelectLeaseUnitModalProps) {
  const defaultBuilding =
    buildings.find((b) => b.id === initialBuildingId) || buildings[0];

  const [selectedBuildingId, setSelectedBuildingId] = useState<string>(
    defaultBuilding?.id || "",
  );

  const activeBuilding =
    buildings.find((b) => b.id === selectedBuildingId) || buildings[0];

  const [selectedUnitId, setSelectedUnitId] = useState<string>(
    activeBuilding?.units[0]?.id || "",
  );

  const activeUnit =
    activeBuilding?.units.find((u) => u.id === selectedUnitId) ||
    activeBuilding?.units[0];

  const handleCycleBuilding = () => {
    if (!buildings.length) return;
    const currentIndex = buildings.findIndex((b) => b.id === activeBuilding.id);
    const nextBuilding = buildings[(currentIndex + 1) % buildings.length];
    setSelectedBuildingId(nextBuilding.id);
    setSelectedUnitId(nextBuilding.units[0]?.id || "");
  };

  const handleCycleUnit = () => {
    if (!activeBuilding?.units.length) return;
    const currentIndex = activeBuilding.units.findIndex(
      (u) => u.id === activeUnit?.id,
    );
    const nextUnit =
      activeBuilding.units[(currentIndex + 1) % activeBuilding.units.length];
    setSelectedUnitId(nextUnit.id);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.backdrop}>
        <View style={styles.dialogCard}>
          <Text style={styles.dialogTitle}>
            Select unit for lease{"\n"}application
          </Text>

          {/* Select a Building Dropdown */}
          <TouchableOpacity
            style={styles.outlinedBox}
            onPress={handleCycleBuilding}
            activeOpacity={0.8}
          >
            <Text style={styles.floatingLabel}>Select a Building</Text>
            <MaterialCommunityIcons
              name="home"
              size={22}
              color="#7DD3FC"
              style={styles.leftIcon}
            />
            <Text style={styles.valueText}>
              {activeBuilding?.name || "No Building"}
            </Text>
            <MaterialCommunityIcons
              name="menu-down"
              size={24}
              color="#CBD5E1"
            />
          </TouchableOpacity>

          {/* Select a Unit Dropdown */}
          <TouchableOpacity
            style={styles.outlinedBox}
            onPress={handleCycleUnit}
            activeOpacity={0.8}
          >
            <Text style={styles.floatingLabel}>Select a Unit</Text>
            <MaterialCommunityIcons
              name="bed"
              size={22}
              color="#7DD3FC"
              style={styles.leftIcon}
            />
            <Text style={styles.valueText}>
              {activeUnit?.name || "No Vacant Units"}
            </Text>
            <MaterialCommunityIcons
              name="menu-down"
              size={24}
              color="#CBD5E1"
            />
          </TouchableOpacity>

          {/* Action Buttons */}
          <View style={styles.actionsRow}>
            <TouchableOpacity onPress={onCancel} style={styles.actionBtn}>
              <Text style={styles.actionBtnText}>CANCEL</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                if (activeBuilding && activeUnit) {
                  onProceed(activeBuilding.id, activeUnit.id);
                }
              }}
              style={styles.actionBtn}
            >
              <Text style={styles.actionBtnText}>PROCEED</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  dialogCard: {
    width: "100%",
    backgroundColor: "#252E38",
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 20,
    elevation: 8,
  },
  dialogTitle: {
    color: "#F1F5F9",
    fontSize: 22,
    fontWeight: "400",
    textAlign: "center",
    lineHeight: 30,
    marginBottom: 26,
  },
  outlinedBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#64748B",
    borderRadius: 6,
    paddingHorizontal: 14,
    height: 54,
    marginBottom: 20,
    position: "relative",
  },
  floatingLabel: {
    position: "absolute",
    top: -9,
    left: 12,
    backgroundColor: "#252E38",
    paddingHorizontal: 6,
    color: "#CBD5E1",
    fontSize: 12,
  },
  leftIcon: {
    marginRight: 14,
  },
  valueText: {
    flex: 1,
    color: "#F8FAFC",
    fontSize: 16,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 20,
    marginTop: 8,
  },
  actionBtn: {
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  actionBtnText: {
    color: "#7DD3FC",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
