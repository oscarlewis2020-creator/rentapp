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
import { SafeAreaView } from "react-native-safe-area-context";

import DescriptionPreviewScreen from "@/components/ui/landlord/units/DescriptionPreviewScreen";
import DescriptionSampleScreen from "@/components/ui/landlord/units/DescriptionSampleScreen";
import { UnsavedChangesModal } from "@/components/ui/landlord/units/UnsavedChangesModal";

interface UnitDescriptionEditorScreenProps {
  initialDescription?: string;
  onBack: () => void;
  onApply: (newDescription: string) => void;
}

export function LandlordUnitDescriptionEditorScreen({
  initialDescription = "",
  onBack,
  onApply,
}: UnitDescriptionEditorScreenProps) {
  const [activeTab, setActiveTab] = useState<"guided" | "custom">("guided");

  // Guided section text states
  const [basicInfo, setBasicInfo] = useState(
    "Unit Name:\nLocation:\nSize:\nRent:",
  );
  const [interiorFeatures, setInteriorFeatures] = useState(
    "• Interior feature 1\n• Interior feature 2\n• Interior feature 3",
  );
  const [exteriorFeatures, setExteriorFeatures] = useState(
    "• Exterior feature 1\n• Exterior feature 2\n• Exterior feature 3",
  );
  const [additionalSection, setAdditionalSection] = useState("");

  // Custom section text state
  const [customText, setCustomText] = useState(initialDescription);

  // Accordion section collapse/expand states
  const [sections, setSections] = useState({
    basic: true,
    interior: true,
    exterior: true,
    additional: true,
  });

  const [isUnsavedModalVisible, setIsUnsavedModalVisible] = useState(false);

  const [currentView, setCurrentView] = useState<
    "editor" | "preview" | "sample"
  >("editor");

  if (currentView === "preview") {
    return (
      <DescriptionPreviewScreen
        onBack={() => setCurrentView("editor")}
        basicInfo={basicInfo}
        interiorFeatures={interiorFeatures}
        exteriorFeatures={exteriorFeatures}
        additionalSection={additionalSection}
      />
    );
  }

  if (currentView === "sample") {
    return <DescriptionSampleScreen onBack={() => setCurrentView("editor")} />;
  }

  const toggleSection = (key: keyof typeof sections) => {
    setSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleApplyPress = () => {
    if (activeTab === "custom") {
      setIsUnsavedModalVisible(true);
    } else {
      const compiledText =
        `${basicInfo}\n\n${interiorFeatures}\n\n${exteriorFeatures}\n\n${additionalSection}`.trim();
      onApply(compiledText);
    }
  };

  const renderToolbar = () => (
    <View style={styles.toolbar}>
      <MaterialCommunityIcons
        name="keyboard-outline"
        size={18}
        color="#94A3B8"
      />
      <Text style={styles.toolbarDivider}>|</Text>
      <Text style={styles.toolbarIconText}>B</Text>
      <Text style={styles.toolbarDivider}>|</Text>
      <Text style={[styles.toolbarIconText, styles.italicText]}>I</Text>
      <Text style={styles.toolbarDivider}>|</Text>
      <Text style={[styles.toolbarIconText, styles.underlineText]}>U</Text>
      <Text style={styles.toolbarDivider}>|</Text>
      <MaterialCommunityIcons
        name="format-list-bulleted"
        size={18}
        color="#94A3B8"
      />
      <MaterialCommunityIcons
        name="format-list-numbered"
        size={18}
        color="#94A3B8"
      />
      <MaterialCommunityIcons
        name="format-align-left"
        size={18}
        color="#94A3B8"
      />
      <MaterialCommunityIcons
        name="format-align-right"
        size={18}
        color="#94A3B8"
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#F1F5F9" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Unit Description</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Segment Tabs */}
        <View style={styles.segmentContainer}>
          <TouchableOpacity
            style={[
              styles.segmentBtn,
              activeTab === "guided" && styles.segmentBtnActive,
            ]}
            onPress={() => setActiveTab("guided")}
          >
            <Text
              style={[
                styles.segmentText,
                activeTab === "guided" && styles.segmentTextActive,
              ]}
            >
              Guided
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.segmentBtn,
              activeTab === "custom" && styles.segmentBtnActive,
            ]}
            onPress={() => setActiveTab("custom")}
          >
            <Text
              style={[
                styles.segmentText,
                activeTab === "custom" && styles.segmentTextActive,
              ]}
            >
              Custom
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === "guided" ? (
          <>
            {/* Top Preview/Sample Action Row */}
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.secondaryActionBtn}
                onPress={() => setCurrentView("preview")}
              >
                <Ionicons name="eye-outline" size={16} color="#F8FAFC" />
                <Text style={styles.secondaryActionText}>Preview</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryActionBtn}
                onPress={() => setCurrentView("sample")}
              >
                <Ionicons name="bulb-outline" size={16} color="#F8FAFC" />
                <Text style={styles.secondaryActionText}>Sample</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.instructionText}>
              Please fill in these information and we'll generate a description
              structurally similar to that in the sample after applying your
              changes.
            </Text>

            {/* Guided Sections */}
            <GuidedSection
              title="1 . Basic info"
              icon="home-outline"
              expanded={sections.basic}
              onToggle={() => toggleSection("basic")}
              value={basicInfo}
              onChangeText={setBasicInfo}
              helper="Describe the type, size, location, and rent etc."
              renderToolbar={renderToolbar}
            />

            <GuidedSection
              title="2 . Interior features"
              icon="floor-plan"
              expanded={sections.interior}
              onToggle={() => toggleSection("interior")}
              value={interiorFeatures}
              onChangeText={setInteriorFeatures}
              helper="Highlight appealing interior features like flooring, kitchen, and storage."
              renderToolbar={renderToolbar}
            />

            <GuidedSection
              title="3 . Exterior features"
              icon="tree-outline"
              expanded={sections.exterior}
              onToggle={() => toggleSection("exterior")}
              value={exteriorFeatures}
              onChangeText={setExteriorFeatures}
              helper="List amenities outside the unit, such as a pool and parking."
              renderToolbar={renderToolbar}
            />

            <GuidedSection
              title="4. Additional Section: Utilities a..."
              icon="add"
              isIonicons={true}
              expanded={sections.additional}
              onToggle={() => toggleSection("additional")}
              value={additionalSection}
              onChangeText={setAdditionalSection}
              placeholder="Provide extra details..."
              helper="Provide extra details like availability date and contact information."
              renderToolbar={renderToolbar}
            />
          </>
        ) : (
          /* Custom Tab Content */
          <View style={styles.sectionCard}>
            <Text style={styles.customLabel}>Unit Description</Text>
            <View style={styles.editorBoxCustom}>
              <TextInput
                style={styles.textAreaLarge}
                multiline
                value={customText}
                onChangeText={setCustomText}
                placeholder="Type custom description..."
                placeholderTextColor="#64748B"
              />
              {renderToolbar()}
            </View>
          </View>
        )}

        {/* Footer Action Buttons */}
        <View style={styles.footerButtonsRow}>
          <TouchableOpacity style={styles.discardBtn} onPress={onBack}>
            <Text style={styles.discardBtnText}>Discard changes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyBtn} onPress={handleApplyPress}>
            <Text style={styles.applyBtnText}>Apply changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Unsaved Changes Confirmation Modal */}
      <UnsavedChangesModal
        visible={isUnsavedModalVisible}
        onDiscard={() => {
          setIsUnsavedModalVisible(false);
          onBack(); // 💡 Discard routes back to the main add unit screen
        }}
        onApply={() => {
          setIsUnsavedModalVisible(false);
          onApply(customText); // 💡 Saves changes and returns to main add unit screen
        }}
        onContinueEditing={() => {
          setIsUnsavedModalVisible(false); // 💡 Closes modal and stays right back on the custom edit page
        }}
      />
    </SafeAreaView>
  );
}

// Sub-component for individual accordion sections to keep the code extremely lean
function GuidedSection({
  title,
  icon,
  isIonicons = false,
  expanded,
  onToggle,
  value,
  onChangeText,
  placeholder,
  helper,
  renderToolbar,
}: any) {
  return (
    <View style={styles.sectionCard}>
      <TouchableOpacity style={styles.sectionHeader} onPress={onToggle}>
        <View style={styles.sectionHeaderLeft}>
          {isIonicons ? (
            <Ionicons name={icon} size={18} color="#7DD3FC" />
          ) : (
            <MaterialCommunityIcons name={icon} size={18} color="#7DD3FC" />
          )}
          <Text style={styles.sectionTitle} numberOfLines={1}>
            {title}
          </Text>
        </View>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={18}
          color="#94A3B8"
        />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.sectionBody}>
          <View style={styles.editorBox}>
            <TextInput
              style={styles.textArea}
              multiline
              value={value}
              onChangeText={onChangeText}
              placeholder={placeholder}
              placeholderTextColor="#64748B"
            />
            {renderToolbar()}
          </View>
          <Text style={styles.helperSubText}>{helper}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121824",
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%",
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#1E252D",
    gap: 16,
  },
  backBtn: { padding: 4 },
  headerTitle: { color: "#F1F5F9", fontSize: 18, fontWeight: "500" },
  scrollContent: { padding: 16, paddingBottom: 40 },
  segmentContainer: {
    flexDirection: "row",
    backgroundColor: "#1E252D",
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 6,
  },
  segmentBtnActive: { backgroundColor: "#2D3748" },
  segmentText: { color: "#94A3B8", fontSize: 15, fontWeight: "500" },
  segmentTextActive: { color: "#F8FAFC", fontWeight: "600" },
  actionRow: { flexDirection: "row", gap: 12, marginBottom: 16 },
  secondaryActionBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E252D",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: "#334155",
  },
  secondaryActionText: { color: "#F8FAFC", fontSize: 14, fontWeight: "500" },
  instructionText: {
    color: "#CBD5E1",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
  },
  sectionCard: {
    backgroundColor: "#1E252D",
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#2D3748",
    overflow: "hidden",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    backgroundColor: "#1A222A",
  },
  sectionHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  sectionTitle: { color: "#7DD3FC", fontSize: 15, fontWeight: "600", flex: 1 },
  sectionBody: { padding: 12 },
  editorBox: {
    borderWidth: 1,
    borderColor: "#475569",
    borderRadius: 6,
    backgroundColor: "#111822",
  },
  editorBoxCustom: {
    borderWidth: 1,
    borderColor: "#475569",
    borderRadius: 6,
    backgroundColor: "#111822",
    margin: 12,
  },
  textArea: {
    color: "#F8FAFC",
    fontSize: 14,
    padding: 12,
    minHeight: 90,
    textAlignVertical: "top",
  },
  textAreaLarge: {
    color: "#F8FAFC",
    fontSize: 14,
    padding: 12,
    minHeight: 250,
    textAlignVertical: "top",
  },
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#334155",
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 14,
  },
  toolbarDivider: { color: "#475569", fontSize: 16 },
  toolbarIconText: { color: "#94A3B8", fontSize: 16, fontWeight: "bold" },
  italicText: { fontStyle: "italic" },
  underlineText: { textDecorationLine: "underline" },
  helperSubText: {
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 8,
    paddingHorizontal: 4,
  },
  customLabel: {
    color: "#94A3B8",
    fontSize: 12,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  footerButtonsRow: { flexDirection: "row", gap: 12, marginTop: 10 },
  discardBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#475569",
    borderRadius: 23,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
  },
  discardBtnText: { color: "#F8FAFC", fontSize: 15, fontWeight: "500" },
  applyBtn: {
    flex: 1,
    backgroundColor: "#7DD3FC",
    borderRadius: 23,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
  },
  applyBtnText: { color: "#0F172A", fontSize: 15, fontWeight: "600" },
});
