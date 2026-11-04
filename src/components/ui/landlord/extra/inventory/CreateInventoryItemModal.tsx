// components/ui/landlord/inventory/CreateInventoryItemModal.tsx
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal, Portal } from "react-native-paper";
import { CategorySelectionModal } from "./CategorySelectionModal";

interface CreateInventoryItemModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
}

export function CreateInventoryItemModal({
  visible,
  onClose,
  onSubmit,
}: CreateInventoryItemModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [unitOfMeasurement, setUnitOfMeasurement] = useState("");

  // Condition metrics state counts
  const [newCount, setNewCount] = useState("0");
  const [fairCount, setFairCount] = useState("0");
  const [oldCount, setOldCount] = useState("0");
  const [brokenCount, setBrokenCount] = useState("0");

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categoryPickerOpen, setCategoryPickerOpen] = useState(false);
  const [isConditionExpanded, setIsConditionExpanded] = useState(true);

  // 💡 Compute runtime reactive sums for the overall total dashboard metric field safely
  const totalQuantity =
    (parseInt(newCount) || 0) +
    (parseInt(fairCount) || 0) +
    (parseInt(oldCount) || 0) +
    (parseInt(brokenCount) || 0);

  const handleFormReset = () => {
    setName("");
    setDescription("");
    setUnitOfMeasurement("");
    setNewCount("0");
    setFairCount("0");
    setOldCount("0");
    setBrokenCount("0");
    setSelectedCategories([]);
  };

  const handleCancel = () => {
    handleFormReset();
    onClose();
  };

  const handleFormSubmit = () => {
    if (!name.trim()) return;
    onSubmit({
      name,
      description,
      unitOfMeasurement,
      conditions: {
        new: newCount,
        fair: fairCount,
        old: oldCount,
        broken: brokenCount,
      },
      totalQuantity,
      categories: selectedCategories,
    });
    handleFormReset();
    onClose();
  };

  const categoryDisplayValue =
    selectedCategories.length > 0 ? selectedCategories.join(", ") : "Category";

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={handleCancel}
        dismissable={true}
        style={styles.modalOverlay}
        contentContainerStyle={styles.dialogCard}
      >
        <Text style={styles.modalTitle}>Create inventory item</Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollForm}
        >
          <View style={styles.formContainerStack}>
            {/* 1. Name Input Box */}
            <View style={styles.inputBorderRow}>
              <MaterialCommunityIcons
                name="square-edit-outline"
                size={22}
                color="#85C1E9"
                style={styles.fieldIcon}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Name"
                placeholderTextColor="#6C7A8C"
                value={name}
                onChangeText={setName}
                {...Platform.select({ web: { outlineStyle: "none" } })}
              />
            </View>

            {/* 2. Description Input Box */}
            <View style={styles.inputBorderRow}>
              <MaterialCommunityIcons
                name="comment-text-outline"
                size={22}
                color="#85C1E9"
                style={styles.fieldIcon}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Description"
                placeholderTextColor="#6C7A8C"
                value={description}
                onChangeText={setDescription}
                {...Platform.select({ web: { outlineStyle: "none" } })}
              />
            </View>

            {/* 3. Unit of Measurement Input Box */}
            <View style={styles.inputBorderRow}>
              <MaterialCommunityIcons
                name="weight"
                size={22}
                color="#85C1E9"
                style={styles.fieldIcon}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Unit of measurement for quantity"
                placeholderTextColor="#6C7A8C"
                value={unitOfMeasurement}
                onChangeText={setUnitOfMeasurement}
                {...Platform.select({ web: { outlineStyle: "none" } })}
              />
            </View>

            {/* 4. CONDITION BREAKDOWN GRID SECTION */}
            <View style={styles.accordionContainer}>
              <TouchableOpacity
                style={styles.accordionHeader}
                activeOpacity={0.8}
                onPress={() => setIsConditionExpanded(!isConditionExpanded)}
              >
                <View style={styles.headerLeftRow}>
                  <MaterialCommunityIcons
                    name="playlist-check"
                    size={22}
                    color="#85C1E9"
                    style={styles.fieldIcon}
                  />
                  <Text style={styles.accordionTitle}>Condition breakdown</Text>
                </View>
                <Ionicons
                  name={isConditionExpanded ? "chevron-up" : "chevron-down"}
                  size={16}
                  color="#FFF"
                />
              </TouchableOpacity>

              {isConditionExpanded && (
                <View style={styles.accordionContentGrid}>
                  <View style={styles.gridRow}>
                    <View style={styles.gridCell}>
                      <Text style={styles.gridCellLabel}>New :</Text>
                      <TextInput
                        style={styles.numberInputBox}
                        keyboardType="numeric"
                        value={newCount}
                        onChangeText={(val) =>
                          setNewCount(val.replace(/[^0-9]/g, "") || "0")
                        }
                        {...Platform.select({ web: { outlineStyle: "none" } })}
                      />
                    </View>
                    <View style={styles.gridCell}>
                      <Text style={styles.gridCellLabel}>Fair :</Text>
                      <TextInput
                        style={styles.numberInputBox}
                        keyboardType="numeric"
                        value={fairCount}
                        onChangeText={(val) =>
                          setFairCount(val.replace(/[^0-9]/g, "") || "0")
                        }
                        {...Platform.select({ web: { outlineStyle: "none" } })}
                      />
                    </View>
                  </View>

                  <View style={styles.gridRow}>
                    <View style={styles.gridCell}>
                      <Text style={styles.gridCellLabel}>Old :</Text>
                      <TextInput
                        style={styles.numberInputBox}
                        keyboardType="numeric"
                        value={oldCount}
                        onChangeText={(val) =>
                          setOldCount(val.replace(/[^0-9]/g, "") || "0")
                        }
                        {...Platform.select({ web: { outlineStyle: "none" } })}
                      />
                    </View>
                    <View style={styles.gridCell}>
                      <Text style={styles.gridCellLabel}>Broken :</Text>
                      <TextInput
                        style={styles.numberInputBox}
                        keyboardType="numeric"
                        value={brokenCount}
                        onChangeText={(val) =>
                          setBrokenCount(val.replace(/[^0-9]/g, "") || "0")
                        }
                        {...Platform.select({ web: { outlineStyle: "none" } })}
                      />
                    </View>
                  </View>

                  <View style={styles.totalRowSummary}>
                    <Text style={styles.totalQuantityText}>
                      Overall total quantity : {totalQuantity}
                    </Text>
                  </View>
                </View>
              )}
            </View>

            <Text style={styles.subNoteText}>
              Specify quantity for each of the above conditions
            </Text>

            {/* 5. CATEGORY SELECTION FIELD TRIGGER */}
            <TouchableOpacity
              style={styles.dropdownTriggerField}
              activeOpacity={0.85}
              onPress={() => setCategoryPickerOpen(true)}
            >
              <View style={styles.headerLeftRow}>
                <MaterialCommunityIcons
                  name="grid"
                  size={22}
                  color="#85C1E9"
                  style={styles.fieldIcon}
                />
                <Text
                  style={[
                    styles.dropdownValueText,
                    selectedCategories.length === 0 && styles.placeholderColor,
                  ]}
                  numberOfLines={1}
                >
                  {categoryDisplayValue}
                </Text>
              </View>
              <Ionicons name="chevron-down" size={16} color="#6C7A8C" />
            </TouchableOpacity>

            {/* 6. BOTTOM ACTION BUTTONS TRAY */}
            <View style={styles.actionButtonsRow}>
              <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.submitBtn,
                  !name.trim() && styles.disabledButton,
                ]}
                onPress={handleFormSubmit}
                disabled={!name.trim()}
              >
                <Text style={styles.submitBtnText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* NESTED CATEGORY LIST SHEET PORTAL */}
        <CategorySelectionModal
          visible={categoryPickerOpen}
          onClose={() => setCategoryPickerOpen(false)}
          selectedCategories={selectedCategories}
          onCategoriesChange={setSelectedCategories}
        />
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  dialogCard: {
    backgroundColor: "#171F2A", // Deep carbon canvas tone matches your markup image exactly
    width: "92%",
    maxWidth: 450,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#242F42",
    maxHeight: "90%",
  },
  modalTitle: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
    paddingLeft: 4,
  },
  scrollForm: {
    width: "100%",
  },
  formContainerStack: {
    paddingVertical: 4,
    gap: 16,
  },
  inputBorderRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2C3545",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  fieldIcon: {
    marginRight: 14,
  },
  textInput: {
    flex: 1,
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
  },
  accordionContainer: {
    borderWidth: 1,
    borderColor: "#2C3545",
    borderRadius: 8,
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  accordionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerLeftRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 8,
  },
  accordionTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
  },
  accordionContentGrid: {
    backgroundColor: "#111720",
    padding: 12,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "#2C3545",
  },
  gridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  gridCell: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  gridCellLabel: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "400",
  },
  numberInputBox: {
    borderWidth: 1,
    borderColor: "#3E4C5E",
    borderRadius: 6,
    width: 64,
    height: 42,
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    backgroundColor: "#171F2A",
  },
  totalRowSummary: {
    alignItems: "flex-end",
    paddingTop: 4,
    paddingRight: 4,
  },
  totalQuantityText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "600",
  },
  subNoteText: {
    color: "#6C7A8C",
    fontSize: 13,
    textAlign: "center",
    marginTop: -4,
    fontWeight: "400",
  },
  dropdownTriggerField: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#2C3545",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  dropdownValueText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "400",
  },
  placeholderColor: {
    color: "#6C7A8C",
  },
  actionButtonsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 24,
    marginTop: 12,
    paddingRight: 4,
    marginBottom: 8,
  },
  cancelBtn: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  cancelBtnText: {
    color: "#85C1E9",
    fontSize: 16,
    fontWeight: "600",
  },
  submitBtn: {
    backgroundColor: "#85C1E9", // Accent capsule color matching button perfectly
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  disabledButton: {
    opacity: 0.5,
  },
  submitBtnText: {
    color: "#121824",
    fontSize: 16,
    fontWeight: "700",
  },
});
