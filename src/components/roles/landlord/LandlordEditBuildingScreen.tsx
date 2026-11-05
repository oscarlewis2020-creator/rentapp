// components/roles/landlord/EditBuildingScreen.tsx
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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
import { useUserRole } from "../../../app/_layout";
import { AmenitiesSelectionModal } from "../../ui/landlord/extra/building-details/AmenitiesSelectionModal";
import { LeaseTermsTemplateModal } from "../../ui/landlord/extra/building-details/LeaseTermsTemplateModal";
import { LocationPickerModal } from "../../ui/landlord/extra/building-details/LocationPickerModal";

export function EditBuildingScreen({
  onBackPress,
}: {
  onBackPress: () => void;
}) {
  const { setIsDrawerOpen } = useUserRole();
  const [leaseModalOpen, setLeaseModalOpen] = useState(false);

  // Form State parameters
  const [buildingName, setBuildingName] = useState("Test 1");
  const [buildingType, setBuildingType] = useState("residential");
  const [email, setEmail] = useState("oscarlewis2020@gmail.com");
  const [phoneNumber, setPhoneNumber] = useState("796 758 021");
  const [address, setAddress] = useState("Moi uni (main), Eldoret");
  const [localArea, setLocalArea] = useState("Kesses");
  const [referralCode, setReferralCode] = useState("");
  const [mandatoryPhotoId, setMandatoryPhotoId] = useState(false);

  const [showLocationWarning, setShowLocationWarning] = useState(true);
  const [locationModalVisible, setLocationModalVisible] = useState(false);

  // Amenities and Modals trackers
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    "High-speed internet access",
  ]);
  const [amenitiesModalVisible, setAmenitiesModalVisible] = useState(false);

  const handleFormSubmit = () => {
    console.log("Submitting building edits payload package:", {
      buildingName,
      buildingType,
      email,
      phoneNumber,
      address,
      localArea,
      referralCode,
      selectedAmenities,
      mandatoryPhotoId,
    });
    onBackPress();
  };

  const amenitiesValueText =
    selectedAmenities.length > 0
      ? selectedAmenities.join(", ")
      : "Building Amenities";

  return (
    <SafeAreaView style={styles.container}>
      {/* ================= UPPER APPBAR HEADER ROW ================= */}
      <View style={styles.appBar}>
        <View style={styles.appBarLeft}>
          <TouchableOpacity
            onPress={() => setIsDrawerOpen(true)}
            style={styles.menuButton}
          >
            <Ionicons name="menu" size={28} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.appBarTitle}>Edit Building</Text>
        </View>
        <View style={styles.appBarRight}>
          <TouchableOpacity style={styles.appBarIconButton}>
            <Ionicons name="notifications" size={24} color="#FFF" />
          </TouchableOpacity>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>L</Text>
            <View style={styles.onlineStatusDot} />
          </View>
        </View>
      </View>

      {/* ================= FORM CONTROLLER LAYER ================= */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 1. Name of Building */}
        <View style={styles.inputCellContainer}>
          <Text style={styles.floatingInputLabel}>Name of Building</Text>
          <View style={styles.inputInnerRow}>
            <Ionicons
              name="home"
              size={22}
              color="#85C1E9"
              style={styles.fieldIcon}
            />
            <TextInput
              style={styles.textInput}
              value={buildingName}
              onChangeText={setBuildingName}
              {...Platform.select({ web: { outlineStyle: "none" } })}
            />
          </View>
        </View>

        {/* 2. Type of Building */}
        <View style={styles.inputCellContainer}>
          <Text style={styles.floatingInputLabel}>Type of Building</Text>
          <TouchableOpacity
            style={styles.dropdownTriggerRow}
            activeOpacity={0.8}
          >
            <Text style={styles.dropdownValueText}>{buildingType}</Text>
            <Ionicons name="chevron-down" size={16} color="#9EA5B1" />
          </TouchableOpacity>
        </View>

        {/* 3. Customer Service Email */}
        <View style={styles.inputCellContainer}>
          <Text style={styles.floatingInputLabel}>Customer Service Email</Text>
          <View style={styles.inputInnerRow}>
            <Ionicons
              name="mail"
              size={22}
              color="#85C1E9"
              style={styles.fieldIcon}
            />
            <TextInput
              style={styles.textInput}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              {...Platform.select({ web: { outlineStyle: "none" } })}
            />
          </View>
        </View>

        {/* 4. Phone Number Input with Prefix Block */}
        <View style={styles.inputInnerRow}>
          <View style={styles.countryCodeBadge}>
            <View style={styles.miniFlagContainer}>
              <View style={[styles.flagStrip, { backgroundColor: "#000" }]} />
              <View
                style={[styles.flagStrip, { backgroundColor: "#FF0000" }]}
              />
              <View
                style={[styles.flagStrip, { backgroundColor: "#00A884" }]}
              />
            </View>
            <Text style={styles.prefixText}>+254</Text>
          </View>
          <View style={styles.verticalSplitLine} />
          <TextInput
            style={styles.textInput}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            {...Platform.select({ web: { outlineStyle: "none" } })}
          />
        </View>

        {/* 🔥 ADDRESS FIELD WITH MAP INTERACTION BUTTON TRIGGER */}
        <View style={styles.inputCellContainer}>
          <Text style={styles.floatingInputLabel}>Address</Text>
          <View style={styles.addressSectionWrapper}>
            <View style={styles.addressInputLayoutRow}>
              <Ionicons
                name="location"
                size={22}
                color="#85C1E9"
                style={styles.fieldIcon}
              />
              <TextInput
                style={styles.textInputAddress}
                value={address}
                onChangeText={(val) => {
                  setAddress(val);
                  if (!showLocationWarning) setShowLocationWarning(true);
                }}
                {...Platform.select({ web: { outlineStyle: "none" } })}
              />
              {address !== "" && (
                <TouchableOpacity
                  onPress={() => {
                    setAddress("");
                    setShowLocationWarning(true);
                  }}
                  style={styles.clearBtn}
                >
                  <Ionicons name="close-circle" size={18} color="#6C7A8C" />
                </TouchableOpacity>
              )}
            </View>

            {/* Map selection link icon trigger */}
            <TouchableOpacity
              style={styles.mapIconBtn}
              activeOpacity={0.8}
              onPress={() => setLocationModalVisible(true)} // 💡 OPENS THE LOCATION SELECTION BOTTOM SHEET OVERLAY
            >
              <Feather name="map" size={22} color="#85C1E9" />
            </TouchableOpacity>
          </View>

          {/* 💡 REDDISH NOTIFICATION LABEL [image_he2LNA.png] */}
          {showLocationWarning && (
            <Text style={styles.warningHelperText}>
              Type and select a location from the dropdown or pick from the map
              to proceed.
            </Text>
          )}
        </View>

        {/* 6. Local Area Name */}
        <View style={styles.inputCellContainer}>
          <Text style={styles.floatingInputLabel}>
            Local area name (optional)
          </Text>
          <View style={styles.inputInnerRow}>
            <Ionicons
              name="location-outline"
              size={22}
              color="#85C1E9"
              style={styles.fieldIcon}
            />
            <TextInput
              style={styles.textInput}
              value={localArea}
              onChangeText={setLocalArea}
              {...Platform.select({ web: { outlineStyle: "none" } })}
            />
          </View>
          <Text style={styles.helperNoteLabel}>
            Area name known by locals e.g Railway area
          </Text>
        </View>

        {/* 7. Referral Code */}
        <View style={styles.inputCellContainer}>
          <View style={styles.inputInnerRow}>
            <MaterialCommunityIcons
              name="code-braces"
              size={22}
              color="#85C1E9"
              style={styles.fieldIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Referral Code (optional)"
              placeholderTextColor="#6C7A8C"
              value={referralCode}
              onChangeText={setReferralCode}
              {...Platform.select({ web: { outlineStyle: "none" } })}
            />
          </View>
          <Text style={styles.helperNoteLabel}>
            This is a code that can be used to refer this building to others
          </Text>
        </View>

        {/* 8. BUILDING AMENITIES DROPDOWN TRIGGER */}
        <View style={styles.inputCellContainer}>
          <Text style={styles.floatingInputLabel}>Building Amenities</Text>
          <TouchableOpacity
            style={styles.dropdownTriggerRow}
            activeOpacity={0.85}
            onPress={() => setAmenitiesModalVisible(true)}
          >
            <View style={styles.addressLeftBlock}>
              <MaterialCommunityIcons
                name="office-building-cog-outline"
                size={22}
                color="#85C1E9"
                style={styles.fieldIcon}
              />
              <Text style={styles.dropdownValueText} numberOfLines={1}>
                {amenitiesValueText}
              </Text>
            </View>
            <Ionicons name="chevron-down" size={16} color="#9EA5B1" />
          </TouchableOpacity>
        </View>

        {/* 9. ATTACH PICTURES GALLERY SLIDER PANELS */}
        <Text style={styles.galleryHeadline}>Attach Pictures</Text>
        <View style={styles.mediaButtonsRow}>
          <TouchableOpacity style={styles.mediaPickerBtn} activeOpacity={0.75}>
            <Ionicons
              name="images-outline"
              size={18}
              color="#85C1E9"
              style={styles.btnIcon}
            />
            <Text style={styles.mediaBtnText}>Pick image(s)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mediaPickerBtn} activeOpacity={0.75}>
            <Ionicons
              name="camera-outline"
              size={18}
              color="#85C1E9"
              style={styles.btnIcon}
            />
            <Text style={styles.mediaBtnText}>Open camera</Text>
          </TouchableOpacity>
        </View>

        {/* Selected Thumbnail Card Row Layout */}
        <View style={styles.thumbnailCard}>
          <View style={styles.thumbnailInnerMask}>
            <View style={styles.mockImgPlaceholder} />
            <TouchableOpacity style={styles.trashCircleIcon}>
              <Ionicons name="trash" size={18} color="#FF6B6B" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 10. LEASE TERMS TRIGGER LINK */}
        <TouchableOpacity
          style={styles.leaseTermsBtn}
          activeOpacity={0.8}
          onPress={() => setLeaseModalOpen(true)}
        >
          <Text style={styles.leaseBtnText}>Edit Lease Agreement Terms</Text>
        </TouchableOpacity>

        {/* 11. CHECKBOX REQUIRE PHOTO ID LAYER */}
        <TouchableOpacity
          style={styles.checkboxRow}
          activeOpacity={0.8}
          onPress={() => setMandatoryPhotoId(!mandatoryPhotoId)}
        >
          <Ionicons
            name={mandatoryPhotoId ? "checkbox" : "square-outline"}
            size={24}
            color={mandatoryPhotoId ? "#85C1E9" : "#6C7A8C"}
          />
          <Text style={styles.checkboxLabelText}>
            Make it mandatory for lease applicants to attach a photo ID
          </Text>
        </TouchableOpacity>

        {/* 12. MASTER SUBMIT PILL ACTION BUTTON */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleFormSubmit}
          activeOpacity={0.85}
        >
          <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* AMENITIES SELECTION POPUP PORTAL SHEET INJECTION */}
      <AmenitiesSelectionModal
        visible={amenitiesModalVisible}
        onClose={() => setAmenitiesModalVisible(false)}
        selectedAmenities={selectedAmenities}
        onAmenitiesChange={setSelectedAmenities}
      />

      {/* 💡 LOCATION PICKER SELECTION POPUP PORTAL SHEET */}
      <LocationPickerModal
        visible={locationModalVisible}
        onClose={() => setLocationModalVisible(false)}
        onPickCurrentLocation={() => {
          setAddress("Kesses, Eldoret (Current Location)");
          setShowLocationWarning(false); // Clear alert text on successful confirmation selection
          setLocationModalVisible(false);
        }}
        onPickFromMap={() => {
          setAddress("Selected Coordinates from Map Grid");
          setShowLocationWarning(false);
          setLocationModalVisible(false);
        }}
      />

      {/* 💡 INJECT THE LIVE PORTAL LEASE TERMS EDITOR MODAL LAYER HERE */}
      <LeaseTermsTemplateModal
        visible={leaseModalOpen}
        onClose={() => setLeaseModalOpen(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161D26",
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#242F42",
    backgroundColor: "#161D26",
  },
  appBarLeft: { flexDirection: "row", alignItems: "center", gap: 16 },
  menuButton: { padding: 2 },
  appBarTitle: { color: "#FFF", fontSize: 20, fontWeight: "500" },
  appBarRight: { flexDirection: "row", alignItems: "center", gap: 16 },
  appBarIconButton: { padding: 2 },
  avatarCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#85C1E9",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  avatarText: { color: "#121824", fontSize: 15, fontWeight: "700" },
  onlineStatusDot: {
    position: "absolute",
    bottom: -1,
    right: -1,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#4CD964",
    borderWidth: 1.5,
    borderColor: "#161D26",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 60,
    gap: 20,
  },
  inputCellContainer: { position: "relative", width: "100%" },
  floatingInputLabel: {
    position: "absolute",
    left: 12,
    top: -9,
    backgroundColor: "#161D26",
    paddingHorizontal: 6,
    fontSize: 12,
    color: "#9EA5B1",
    zIndex: 10,
  },
  inputInnerRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2C3545",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  fieldIcon: { marginRight: 14 },
  textInput: { flex: 1, color: "#FFF", fontSize: 16, fontWeight: "500" },
  dropdownTriggerRow: {
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
    fontWeight: "500",
    flex: 1,
  },
  countryCodeBadge: { flexDirection: "row", alignItems: "center", gap: 8 },
  miniFlagContainer: { gap: 1.5 },
  flagStrip: { width: 16, height: 3.5, borderRadius: 0.5 },
  prefixText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
  verticalSplitLine: {
    width: 1,
    height: 24,
    backgroundColor: "#2C3545",
    marginHorizontal: 14,
  },
  addressSectionWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 12,
  },
  addressInputLayoutRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2C3545",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  textInputAddress: {
    flex: 1,
    color: "#E5E9F0",
    fontSize: 16,
    fontWeight: "400",
    opacity: 0.8,
  },
  clearBtn: { padding: 2 },
  mapIconBtn: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#242F42",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#2D3E4E",
  },
  warningHelperText: {
    color: "#FFA19B",
    fontSize: 13,
    fontWeight: "400",
    marginTop: 8,
    paddingHorizontal: 4,
    lineHeight: 18,
  },
  // addressInputLayoutRow: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  //   borderWidth: 1,
  //   borderColor: "#2C3545",
  //   borderRadius: 8,
  //   paddingLeft: 16,
  //   paddingRight: 12,
  //   paddingVertical: 14,
  // },
  addressLeftBlock: { flexDirection: "row", alignItems: "center", flex: 1 },
  clearCircleBtn: { padding: 2 },
  helperNoteLabel: {
    color: "#6C7A8C",
    fontSize: 13,
    fontWeight: "400",
    marginTop: 6,
    paddingHorizontal: 4,
  },
  galleryHeadline: {
    color: "#9EA5B1",
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 0.3,
    marginBottom: -8,
  },
  mediaButtonsRow: { flexDirection: "row", gap: 14 },
  mediaPickerBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#2C3545",
    borderRadius: 8,
    paddingVertical: 14,
    gap: 8,
    backgroundColor: "rgba(255, 255, 255, 0.01)",
  },
  btnIcon: { marginTop: 1 },
  mediaBtnText: { color: "#FFF", fontSize: 15, fontWeight: "600" },
  thumbnailCard: {
    backgroundColor: "#1C2534",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#242F42",
    padding: 12,
  },
  thumbnailInnerMask: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mockImgPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 6,
    backgroundColor: "#2C3545",
  },
  trashCircleIcon: { padding: 4 },
  leaseTermsBtn: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#2C3545",
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  leaseBtnText: { color: "#85C1E9", fontSize: 16, fontWeight: "600" },
  checkboxRow: {
    flexDirection: "row",
    gap: 14,
    paddingHorizontal: 4,
    alignItems: "flex-start",
    marginTop: 4,
  },
  checkboxLabelText: {
    color: "#9EA5B1",
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
    lineHeight: 20,
  },
  submitButton: {
    backgroundColor: "#85C1E9",
    width: "50%",
    alignSelf: "center",
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  submitBtnText: { color: "#121824", fontSize: 16, fontWeight: "700" },
});
