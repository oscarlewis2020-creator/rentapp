// components/roles/landlord/BuildingFormScreen.tsx
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AmenitiesSelectionModal } from "../../ui/landlord/extra/building-details/AmenitiesSelectionModal";
import { LeaseTermsTemplateModal } from "../../ui/landlord/extra/building-details/LeaseTermsTemplateModal";
import { LocationPickerModal } from "../../ui/landlord/extra/building-details/LocationPickerModal";

export type BuildingFormMode = "create" | "edit";

export interface BuildingFormValues {
  buildingName: string;
  buildingType: string;
  email: string;
  phoneNumber: string;
  address: string;
  localArea: string;
  referralCode: string;
  currency: string;
  selectedAmenities: string[];
  mandatoryPhotoId: boolean;
  imageUris: string[];
}

export interface BuildingFormScreenProps {
  mode: BuildingFormMode;
  onBackPress: () => void;
  onSubmit: (values: BuildingFormValues) => void | Promise<void>;
  initialValues?: Partial<BuildingFormValues>;
  isSubmitting?: boolean;
}

const EMPTY_VALUES: BuildingFormValues = {
  buildingName: "",
  buildingType: "residential",
  email: "",
  phoneNumber: "",
  address: "",
  localArea: "",
  referralCode: "",
  currency: "KES, Kenya",
  selectedAmenities: [],
  mandatoryPhotoId: false,
  imageUris: [],
};

const BUILDING_TYPES = ["residential", "commercial", "mixed-use"];

export function BuildingFormScreen({
  mode,
  onBackPress,
  onSubmit,
  initialValues,
  isSubmitting = false,
}: BuildingFormScreenProps) {
  const [form, setForm] = useState<BuildingFormValues>(() => ({
    ...EMPTY_VALUES,
    ...initialValues,
    selectedAmenities: initialValues?.selectedAmenities ?? [],
    imageUris: initialValues?.imageUris ?? [],
  }));

  const [leaseModalOpen, setLeaseModalOpen] = useState(false);
  const [amenitiesModalVisible, setAmenitiesModalVisible] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [buildingTypeDropdownOpen, setBuildingTypeDropdownOpen] =
    useState(false);
  const [showLocationWarning, setShowLocationWarning] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // Rehydrate the form when the selected building or mode changes.
  useEffect(() => {
    setForm({
      ...EMPTY_VALUES,
      ...initialValues,
      selectedAmenities: initialValues?.selectedAmenities ?? [],
      imageUris: initialValues?.imageUris ?? [],
    });
    setShowLocationWarning(false);
    setSubmitAttempted(false);
  }, [mode, initialValues]);

  const isEditMode = mode === "edit";

  const updateField = <K extends keyof BuildingFormValues>(
    key: K,
    value: BuildingFormValues[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const amenitiesValueText = useMemo(
    () =>
      form.selectedAmenities.length > 0
        ? form.selectedAmenities.join(", ")
        : "Building Amenities",
    [form.selectedAmenities],
  );

  const handleSubmit = async () => {
    setSubmitAttempted(true);

    if (!form.buildingName.trim()) {
      Alert.alert("Building name required", "Enter a name for this building.");
      return;
    }

    if (!form.address.trim()) {
      setShowLocationWarning(true);
      Alert.alert(
        "Building address required",
        "Enter or select the building address.",
      );
      return;
    }

    if (
      form.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      Alert.alert(
        "Invalid email",
        "Enter a valid customer service email address.",
      );
      return;
    }

    try {
      await onSubmit({
        ...form,
        buildingName: form.buildingName.trim(),
        email: form.email.trim(),
        address: form.address.trim(),
        localArea: form.localArea.trim(),
        referralCode: form.referralCode.trim(),
        phoneNumber: form.phoneNumber.trim(),
        selectedAmenities: [...form.selectedAmenities],
        imageUris: [...form.imageUris],
      });
      onBackPress();
    } catch (error) {
      console.error("Building form submission failed:", error);
      Alert.alert(
        isEditMode ? "Update failed" : "Creation failed",
        "The building could not be saved. Please try again.",
      );
    }
  };

  const chooseAddress = (value: string) => {
    updateField("address", value);
    setShowLocationWarning(false);
    setLocationModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Building name */}
          <View style={styles.inputCellContainer}>
            <View style={styles.inputInnerRow}>
              <Ionicons
                name="home"
                size={23}
                color={COLORS.accent}
                style={styles.fieldIcon}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Name of Building"
                placeholderTextColor={COLORS.placeholder}
                value={form.buildingName}
                onChangeText={(value) => updateField("buildingName", value)}
                returnKeyType="next"
              />
            </View>
          </View>

          {/* Building type */}
          <View style={[styles.inputCellContainer, styles.dropdownLayer]}>
            <Text style={styles.floatingInputLabel}>Type of Building</Text>

            <TouchableOpacity
              style={styles.dropdownTriggerRow}
              activeOpacity={0.8}
              onPress={() => setBuildingTypeDropdownOpen((open) => !open)}
            >
              <Text style={styles.dropdownValueText}>{form.buildingType}</Text>

              <Ionicons
                name={buildingTypeDropdownOpen ? "chevron-up" : "chevron-down"}
                size={18}
                color={COLORS.muted}
              />
            </TouchableOpacity>

            {buildingTypeDropdownOpen && (
              <View style={styles.typeDropdownMenu}>
                {BUILDING_TYPES.filter(
                  (type) => type !== form.buildingType,
                ).map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={styles.typeDropdownOption}
                    onPress={() => {
                      updateField("buildingType", type);
                      setBuildingTypeDropdownOpen(false);
                    }}
                  >
                    <Text style={styles.typeDropdownText}>{type}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Customer service email */}
          <View style={styles.inputCellContainer}>
            <Text style={styles.floatingInputLabel}>
              Customer Service Email
            </Text>
            <View style={styles.inputInnerRow}>
              <Ionicons
                name="mail"
                size={23}
                color={COLORS.accent}
                style={styles.fieldIcon}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Customer service email"
                placeholderTextColor={COLORS.placeholder}
                value={form.email}
                onChangeText={(value) => updateField("email", value)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Phone number */}
          <View style={styles.inputInnerRow}>
            <View style={styles.countryCodeBadge}>
              <Text style={styles.kenyaFlag}>🇰🇪</Text>
              <Text style={styles.prefixText}>+254</Text>
            </View>
            <View style={styles.verticalSplitLine} />
            <TextInput
              style={styles.textInput}
              placeholder="7XX XXX XXX"
              placeholderTextColor={COLORS.placeholder}
              value={form.phoneNumber}
              onChangeText={(value) => updateField("phoneNumber", value)}
              keyboardType="phone-pad"
            />
          </View>

          {/* Currency */}
          <View style={styles.inputCellContainer}>
            <Text style={styles.floatingInputLabel}>Building Currency</Text>
            <View style={styles.dropdownTriggerRow}>
              <View style={styles.addressLeftBlock}>
                <MaterialCommunityIcons
                  name="cash"
                  size={23}
                  color={COLORS.accent}
                  style={styles.fieldIcon}
                />
                <Text style={styles.dropdownValueText}>{form.currency}</Text>
              </View>
              <Ionicons name="chevron-down" size={18} color={COLORS.muted} />
            </View>
            <Text style={styles.infoText}>
              Currently only KENYA is supported. More countries will be added
              soon.
            </Text>
          </View>

          {/* Address */}
          <View style={styles.inputCellContainer}>
            <View style={styles.addressSectionWrapper}>
              <View style={styles.addressInputLayoutRow}>
                <Ionicons
                  name="location"
                  size={23}
                  color={COLORS.accent}
                  style={styles.fieldIcon}
                />
                <TextInput
                  style={styles.textInputAddress}
                  placeholder="address e.g Nairobi, Kenya"
                  placeholderTextColor={COLORS.placeholder}
                  value={form.address}
                  onChangeText={(value) => {
                    updateField("address", value);
                    setShowLocationWarning(false);
                  }}
                />
                {!!form.address && (
                  <TouchableOpacity
                    onPress={() => {
                      updateField("address", "");
                      setShowLocationWarning(true);
                    }}
                    style={styles.clearBtn}
                  >
                    <Ionicons
                      name="close-circle"
                      size={19}
                      color={COLORS.muted}
                    />
                  </TouchableOpacity>
                )}
              </View>
              <TouchableOpacity
                style={styles.mapIconBtn}
                activeOpacity={0.8}
                onPress={() => setLocationModalVisible(true)}
              >
                <Feather name="map" size={24} color={COLORS.accent} />
              </TouchableOpacity>
            </View>
            {showLocationWarning && (
              <Text style={styles.warningHelperText}>
                Enter the building address or select a location from the map.
              </Text>
            )}
          </View>

          {/* Local area */}
          <View style={styles.inputCellContainer}>
            <View style={styles.inputInnerRow}>
              <Ionicons
                name="location-outline"
                size={23}
                color={COLORS.accent}
                style={styles.fieldIcon}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Local area name (optional)"
                placeholderTextColor={COLORS.placeholder}
                value={form.localArea}
                onChangeText={(value) => updateField("localArea", value)}
              />
            </View>
            <Text style={styles.helperNoteLabel}>
              Area name known by locals e.g Railway area
            </Text>
          </View>

          {/* Referral code */}
          <View style={styles.inputCellContainer}>
            <View style={styles.inputInnerRow}>
              <MaterialCommunityIcons
                name="code-braces"
                size={23}
                color={COLORS.accent}
                style={styles.fieldIcon}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Referral Code (optional)"
                placeholderTextColor={COLORS.placeholder}
                value={form.referralCode}
                onChangeText={(value) => updateField("referralCode", value)}
                autoCapitalize="characters"
              />
            </View>
            <Text style={styles.helperNoteLabel}>
              This is a code that can be used to refer this building to others
            </Text>
          </View>

          {/* Amenities */}
          <View style={styles.inputCellContainer}>
            <TouchableOpacity
              style={styles.dropdownTriggerRow}
              activeOpacity={0.85}
              onPress={() => setAmenitiesModalVisible(true)}
            >
              <View style={styles.addressLeftBlock}>
                <MaterialCommunityIcons
                  name="home-city"
                  size={23}
                  color={COLORS.accent}
                  style={styles.fieldIcon}
                />
                <Text style={styles.dropdownValueText} numberOfLines={1}>
                  {amenitiesValueText}
                </Text>
              </View>
              <Ionicons name="chevron-down" size={18} color={COLORS.muted} />
            </TouchableOpacity>
          </View>

          {/* Images - picker wiring is intentionally left to the app's chosen image-picker flow */}
          <View style={styles.imageSection}>
            <Text style={styles.galleryHeadline}>Attach Pictures</Text>
            <View style={styles.mediaButtonsRow}>
              <TouchableOpacity
                style={styles.mediaPickerBtn}
                activeOpacity={0.75}
                onPress={() =>
                  Alert.alert(
                    "Image picker",
                    "Connect this button to your Expo ImagePicker flow to select building photos.",
                  )
                }
              >
                <Ionicons
                  name="image-outline"
                  size={19}
                  color={COLORS.accent}
                />
                <Text style={styles.mediaBtnText}>Pick image(s)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.mediaPickerBtn}
                activeOpacity={0.75}
                onPress={() =>
                  Alert.alert(
                    "Camera",
                    "Connect this button to your Expo ImagePicker camera flow to take building photos.",
                  )
                }
              >
                <Ionicons
                  name="camera-outline"
                  size={19}
                  color={COLORS.accent}
                />
                <Text style={styles.mediaBtnText}>Open camera</Text>
              </TouchableOpacity>
            </View>
            {form.imageUris.length > 0 && (
              <Text style={styles.helperNoteLabel}>
                {form.imageUris.length} building photo(s) attached
              </Text>
            )}
          </View>

          {/* Lease terms */}
          <TouchableOpacity
            style={styles.leaseTermsBtn}
            activeOpacity={0.8}
            onPress={() => setLeaseModalOpen(true)}
          >
            <Text style={styles.leaseBtnText}>
              {isEditMode
                ? "Edit Lease Agreement Terms"
                : "Set Lease Agreement Terms"}
            </Text>
          </TouchableOpacity>

          {/* Mandatory photo ID */}
          <TouchableOpacity
            style={styles.checkboxRow}
            activeOpacity={0.8}
            onPress={() =>
              updateField("mandatoryPhotoId", !form.mandatoryPhotoId)
            }
          >
            <Ionicons
              name={form.mandatoryPhotoId ? "checkbox" : "square-outline"}
              size={25}
              color={form.mandatoryPhotoId ? COLORS.accent : COLORS.muted}
            />
            <Text style={styles.checkboxLabelText}>
              Make it mandatory for lease applicants to attach a photo ID
            </Text>
          </TouchableOpacity>

          {/* Submit */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              isSubmitting && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            activeOpacity={0.85}
            disabled={isSubmitting}
          >
            <Text style={styles.submitBtnText}>
              {isSubmitting
                ? "Saving..."
                : isEditMode
                  ? "Save Changes"
                  : "Submit"}
            </Text>
          </TouchableOpacity>

          {submitAttempted && !form.buildingName.trim() && (
            <Text style={styles.validationText}>
              Building name is required.
            </Text>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      <AmenitiesSelectionModal
        visible={amenitiesModalVisible}
        onClose={() => setAmenitiesModalVisible(false)}
        selectedAmenities={form.selectedAmenities}
        onAmenitiesChange={(amenities: string[]) =>
          updateField("selectedAmenities", amenities)
        }
      />

      <LocationPickerModal
        visible={locationModalVisible}
        onClose={() => setLocationModalVisible(false)}
        onPickCurrentLocation={() => chooseAddress("Current device location")}
        onPickFromMap={() => chooseAddress("Selected map location")}
      />

      <LeaseTermsTemplateModal
        visible={leaseModalOpen}
        onClose={() => setLeaseModalOpen(false)}
      />
    </SafeAreaView>
  );
}

const COLORS = {
  background: "#1F2A2E",
  field: "#171D20",
  border: "#858D91",
  accent: "#75CDF4",
  text: "#E7EAEC",
  muted: "#A7B0B5",
  placeholder: "#A0A8AD",
  helper: "#B8C0C4",
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 48,
    gap: 22,
  },
  inputCellContainer: { position: "relative", width: "100%" },
  inputInnerRow: {
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.4,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: COLORS.field,
  },
  fieldIcon: { marginRight: 16 },
  textInput: {
    flex: 1,
    color: COLORS.text,
    fontSize: 18,
    paddingVertical: 14,
  },
  floatingInputLabel: {
    position: "absolute",
    left: 12,
    top: -10,
    zIndex: 2,
    backgroundColor: COLORS.background,
    paddingHorizontal: 6,
    fontSize: 14,
    color: COLORS.muted,
  },
  dropdownLayer: { zIndex: 10, elevation: 10 },
  dropdownTriggerRow: {
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1.4,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: COLORS.field,
  },
  dropdownValueText: {
    flex: 1,
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "500",
  },
  typeDropdownMenu: {
    position: "absolute",
    top: 72,
    left: 0,
    right: 0,
    backgroundColor: COLORS.field,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    zIndex: 20,
    elevation: 20,
    overflow: "hidden",
  },
  typeDropdownOption: {
    minHeight: 54,
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#30383C",
  },
  typeDropdownText: {
    color: COLORS.text,
    fontSize: 17,
    textTransform: "capitalize",
  },
  selectedDropdownText: { color: COLORS.accent },
  countryCodeBadge: { flexDirection: "row", alignItems: "center", gap: 10 },
  kenyaFlag: { fontSize: 25 },
  prefixText: { color: COLORS.text, fontSize: 18, fontWeight: "600" },
  verticalSplitLine: {
    width: 1,
    height: 34,
    backgroundColor: "#4A5358",
    marginHorizontal: 16,
  },
  addressSectionWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  addressInputLayoutRow: {
    flex: 1,
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.4,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 14,
    backgroundColor: COLORS.field,
  },
  textInputAddress: {
    flex: 1,
    color: COLORS.text,
    fontSize: 17,
    paddingVertical: 12,
  },
  clearBtn: { padding: 4 },
  mapIconBtn: {
    width: 68,
    height: 68,
    borderRadius: 8,
    backgroundColor: "#394449",
    alignItems: "center",
    justifyContent: "center",
  },
  warningHelperText: {
    color: "#FFA19B",
    fontSize: 13,
    marginTop: 7,
    paddingHorizontal: 4,
  },
  infoText: {
    color: COLORS.accent,
    fontSize: 15,
    lineHeight: 24,
    marginTop: 10,
    paddingHorizontal: 18,
  },
  addressLeftBlock: { flexDirection: "row", alignItems: "center", flex: 1 },
  helperNoteLabel: {
    color: COLORS.helper,
    fontSize: 14,
    fontWeight: "500",
    marginTop: 7,
    paddingHorizontal: 18,
    lineHeight: 21,
  },
  imageSection: { gap: 12 },
  galleryHeadline: {
    color: COLORS.text,
    fontSize: 15,
    textAlign: "center",
  },
  mediaButtonsRow: { flexDirection: "row", gap: 12 },
  mediaPickerBtn: {
    flex: 1,
    minHeight: 66,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    gap: 9,
    paddingHorizontal: 8,
  },
  mediaBtnText: { color: COLORS.accent, fontSize: 16, fontWeight: "600" },
  leaseTermsBtn: {
    width: "100%",
    minHeight: 62,
    borderWidth: 1.2,
    borderColor: COLORS.border,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  leaseBtnText: { color: COLORS.accent, fontSize: 17, fontWeight: "600" },
  checkboxRow: {
    flexDirection: "row",
    gap: 14,
    paddingHorizontal: 4,
    alignItems: "flex-start",
  },
  checkboxLabelText: {
    color: COLORS.text,
    fontSize: 16,
    flex: 1,
    lineHeight: 23,
  },
  submitButton: {
    backgroundColor: COLORS.accent,
    minWidth: 180,
    alignSelf: "center",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  submitButtonDisabled: { opacity: 0.6 },
  submitBtnText: { color: "#10212A", fontSize: 18, fontWeight: "700" },
  validationText: { color: "#FFA19B", textAlign: "center", fontSize: 13 },
});
