import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Modal as PaperModal, Portal } from "react-native-paper";
import { BuildingItem, BuildingPickerModal } from "./BuildingPickerModal"; // 💡 Reusing your existing component
import { UnitPickerSelectModal } from "./UnitPickerSelectModal";

export interface BuildingOption extends BuildingItem {
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

  // Modal open states for sub-pickers
  const [isBuildingModalOpen, setIsBuildingModalOpen] = useState(false);
  const [isUnitModalOpen, setIsUnitModalOpen] = useState(false);

  useEffect(() => {
    if (activeBuilding && activeBuilding.units.length > 0) {
      const unitExists = activeBuilding.units.some(
        (u) => u.id === selectedUnitId,
      );
      if (!unitExists) {
        setSelectedUnitId(activeBuilding.units[0].id);
      }
    } else {
      setSelectedUnitId("");
    }
  }, [selectedBuildingId]);

  const activeUnit =
    activeBuilding?.units.find((u) => u.id === selectedUnitId) ||
    activeBuilding?.units[0];

  return (
    <>
      <Portal>
        <PaperModal
          visible={visible}
          onDismiss={onCancel}
          contentContainerStyle={styles.paperModalOverride}
        >
          <View style={styles.backdropScrim}>
            <View style={styles.sheetContainer}>
              <View style={styles.grabber} />
              <View style={styles.headerDivider} />

              <View style={styles.contentPadding}>
                <Text style={styles.dialogTitle}>
                  Select unit for lease application
                </Text>

                {/* Building Trigger */}
                <View style={styles.sectionCard}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionHeaderText}>
                      Select a Building
                    </Text>
                  </View>
                  <View style={styles.sectionBody}>
                    <TouchableOpacity
                      style={styles.dropdownTrigger}
                      onPress={() => setIsBuildingModalOpen(true)}
                    >
                      <View style={styles.dropdownLeft}>
                        <MaterialCommunityIcons
                          name="home"
                          size={20}
                          color="#86d3ff"
                          style={{ marginRight: 12 }}
                        />
                        <Text style={styles.dropdownText}>
                          {activeBuilding?.name || "Select a Building"}
                        </Text>
                      </View>
                      <Ionicons name="chevron-down" size={20} color="#cbd5e1" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Unit Trigger */}
                <View style={styles.sectionCard}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionHeaderText}>Select a Unit</Text>
                  </View>
                  <View style={styles.sectionBody}>
                    <TouchableOpacity
                      style={styles.dropdownTrigger}
                      onPress={() => setIsUnitModalOpen(true)}
                    >
                      <View style={styles.dropdownLeft}>
                        <MaterialCommunityIcons
                          name="bed"
                          size={20}
                          color="#86d3ff"
                          style={{ marginRight: 12 }}
                        />
                        <Text style={styles.dropdownText}>
                          {activeUnit?.name || "No Vacant Units"}
                        </Text>
                      </View>
                      <Ionicons name="chevron-down" size={20} color="#cbd5e1" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={styles.footerBar}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={onCancel}
                >
                  <Text style={styles.cancelButtonText}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.proceedButton}
                  onPress={() =>
                    activeBuilding &&
                    activeUnit &&
                    onProceed(activeBuilding.id, activeUnit.id)
                  }
                >
                  <Text style={styles.proceedButtonText}>PROCEED</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </PaperModal>
      </Portal>

      {/* --- REUSING YOUR EXISTING BUILDING PICKER MODAL --- */}
      <BuildingPickerModal
        visible={isBuildingModalOpen}
        onClose={() => setIsBuildingModalOpen(false)}
        buildings={buildings}
        selectedBuildingId={selectedBuildingId}
        onSelectBuilding={(building) => setSelectedBuildingId(building.id)}
      />

      {/* --- UNIT PICKER MODAL --- */}
      <UnitPickerSelectModal
        visible={isUnitModalOpen}
        onClose={() => setIsUnitModalOpen(false)}
        units={activeBuilding?.units || []}
        selectedUnitId={selectedUnitId}
        onSelectUnit={(id) => setSelectedUnitId(id)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  paperModalOverride: {
    margin: 0,
    padding: 0,
    flex: 1,
    justifyContent: "flex-end",
  },
  backdropScrim: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  sheetContainer: {
    width: "100%",
    maxWidth: 600,
    backgroundColor: "#02435e",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    alignSelf: "center",
    paddingTop: 12,
  },
  grabber: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#122c38",
    alignSelf: "center",
    marginBottom: 8,
  },
  headerDivider: {
    height: 1,
    backgroundColor: "#195a76",
    marginTop: 8,
    marginHorizontal: 14,
  },
  contentPadding: { padding: 16, gap: 16 },
  dialogTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 4,
  },
  sectionCard: {
    backgroundColor: "#161c24",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#252f41",
    overflow: "hidden",
  },
  sectionHeader: {
    backgroundColor: "#1e2736",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#252f41",
  },
  sectionHeaderText: { color: "#ffffff", fontSize: 14, fontWeight: "600" },
  sectionBody: { padding: 14 },
  dropdownTrigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#42526e",
    borderRadius: 8,
    paddingHorizontal: 14,
    height: 50,
    backgroundColor: "#161c24",
  },
  dropdownLeft: { flexDirection: "row", alignItems: "center" },
  dropdownText: { color: "#e2e8f0", fontSize: 15 },
  footerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 18,
    paddingVertical: 16,
    backgroundColor: "#02435e",
    borderTopWidth: 1,
    borderTopColor: "#195a76",
    gap: 16,
  },
  cancelButton: { paddingVertical: 10, paddingHorizontal: 16 },
  cancelButtonText: { color: "#86d3ff", fontSize: 14, fontWeight: "600" },
  proceedButton: { paddingVertical: 10, paddingHorizontal: 16 },
  proceedButtonText: { color: "#86d3ff", fontSize: 14, fontWeight: "600" },
});
