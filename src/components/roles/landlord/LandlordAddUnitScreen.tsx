import { OutlinedInput } from "@/components/ui/landlord/units/OutlinedInput";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Import Independent Modals
import { BathroomsModal } from "@/components/ui/landlord/units/BathroomsModal";
import { BedroomsModal } from "@/components/ui/landlord/units/BedroomsModal";
import { AmenitiesModal } from "@/components/ui/landlord/units/UnitAmenitiesModal";
import { UnitTypeModal } from "@/components/ui/landlord/units/UnitTypeModal";

import { LandlordUnitDescriptionEditorScreen } from "./LandlordUnitDescriptionEditorScreen";

export interface UnitFormValues {
  id?: string;
  unitLabel: string;
  unitType: string;
  rentAmount: string;
  bedrooms: string;
  bathrooms?: string;
  amenities?: string[];
  description?: string;
  images?: string[];
}

export interface AddUnitScreenProps {
  buildingName?: string;
  onSubmitUnit?: (unitData: any, isEditing?: boolean) => void;
  onBack?: () => void;
  initialUnit?: UnitFormValues & { id?: string }; // 💡 Optional unit data for edit mode
}

export function LandlordAddUnitScreen({
  buildingName = "Test 1",
  initialUnit,
  onBack,
  onSubmitUnit,
}: AddUnitScreenProps) {
  const isEditing = !!initialUnit; // 💡 Determines mode dynamically

  // Form State
  const [unitName, setUnitName] = useState("Room21");
  const [unitType, setUnitType] = useState("Bedsitter");
  const [bedrooms, setBedrooms] = useState("0");
  const [bathrooms, setBathrooms] = useState("1");
  const [monthlyRent, setMonthlyRent] = useState("5000");
  const [amenities, setAmenities] = useState<string[]>(["Hot Shower"]);
  const [duplicateCount, setDuplicateCount] = useState("");
  const [showDuplicateInfo, setShowDuplicateInfo] = useState(false);
  const [description, setDescription] = useState("");
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  // Modal States
  const [isUnitTypeOpen, setIsUnitTypeOpen] = useState(false);
  const [isBedroomsOpen, setIsBedroomsOpen] = useState(false);
  const [isBathroomsOpen, setIsBathroomsOpen] = useState(false);
  const [isAmenitiesOpen, setIsAmenitiesOpen] = useState(false);
  const [tempAmenities, setTempAmenities] = useState<string[]>(["Hot Shower"]);

  const [isDescriptionEditorOpen, setIsDescriptionEditorOpen] = useState(false);

  if (isDescriptionEditorOpen) {
    return (
      <LandlordUnitDescriptionEditorScreen
        initialDescription={description}
        onBack={() => setIsDescriptionEditorOpen(false)}
        onApply={(newDesc) => {
          setDescription(newDesc);
          setIsDescriptionEditorOpen(false);
        }}
      />
    );
  }

  // Toggle logic for individual items inside the modal
  const handleToggleAmenity = (item: string) => {
    setTempAmenities((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      const uris = result.assets.map((asset) => asset.uri);
      setImages((prev) => [...prev, ...uris]);
    }
  };

  const handleOpenCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission required",
        "Camera permission is needed to take photos.",
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({ quality: 0.8 });

    if (!result.canceled && result.assets[0]) {
      setImages((prev) => [...prev, result.assets[0].uri]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const payload = {
      buildingName,
      unitName,
      unitType,
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      monthlyRent: Number(monthlyRent),
      amenities,
      duplicateCount: duplicateCount ? Number(duplicateCount) : 1,
      description,
      images,
    };

    if (onSubmitUnit) {
      onSubmitUnit(payload);
    } else {
      Alert.alert("Unit Submitted", JSON.stringify(payload, null, 2));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Building Read-Only Card */}
        <View style={styles.buildingCard}>
          <MaterialCommunityIcons name="label" size={22} color="#7DD3FC" />
          <View style={styles.buildingTextContainer}>
            <Text style={styles.buildingLabel}>Building</Text>
            <Text style={styles.buildingValue}>{buildingName}</Text>
          </View>
        </View>

        {/* Unit Name */}
        <OutlinedInput
          label="Unit Name"
          iconName="label"
          value={unitName}
          onChangeText={setUnitName}
          placeholder="e.g. Room 1"
        />

        {/* Unit Type & Modal */}
        <OutlinedInput
          label="Unit type"
          iconName="home-city-outline"
          value={unitType}
          onPress={() => setIsUnitTypeOpen(true)}
        />
        <UnitTypeModal
          visible={isUnitTypeOpen}
          selected={unitType}
          onSelect={(val) => {
            setUnitType(val);
            setIsUnitTypeOpen(false);
          }}
          onClose={() => setIsUnitTypeOpen(false)}
        />

        {/* Bedrooms & Modal */}
        <OutlinedInput
          label="Bed rooms"
          iconName="bed"
          value={bedrooms}
          onPress={() => setIsBedroomsOpen(true)}
        />
        <BedroomsModal
          visible={isBedroomsOpen}
          selected={bedrooms}
          onSelect={(val) => {
            setBedrooms(val);
            setIsBedroomsOpen(false);
          }}
          onClose={() => setIsBedroomsOpen(false)}
        />

        {/* Bathrooms & Modal */}
        <OutlinedInput
          label="Bath rooms"
          iconName="shower"
          value={bathrooms}
          onPress={() => setIsBathroomsOpen(true)}
        />
        <BathroomsModal
          visible={isBathroomsOpen}
          selected={bathrooms}
          onSelect={(val) => {
            setBathrooms(val);
            setIsBathroomsOpen(false);
          }}
          onClose={() => setIsBathroomsOpen(false)}
        />

        {/* Monthly Rent */}
        <OutlinedInput
          label="Monthly Rent (KES)"
          iconName="cash-100"
          value={monthlyRent}
          onChangeText={setMonthlyRent}
          keyboardType="numeric"
          placeholder="0"
        />

        {/* Unit Amenities & Modal */}
        <OutlinedInput
          label="Unit Amenities"
          iconName="home-roof"
          value={amenities.join(", ")}
          onPress={() => {
            setTempAmenities(amenities); // Sync current saved state when opening
            setIsAmenitiesOpen(true);
          }}
        />
        <AmenitiesModal
          visible={isAmenitiesOpen}
          selectedAmenities={tempAmenities}
          onToggleAmenity={handleToggleAmenity}
          onApply={() => {
            setAmenities(tempAmenities); // Save changes on apply
            setIsAmenitiesOpen(false);
          }}
          onClose={() => setIsAmenitiesOpen(false)}
        />

        {/* Number of units to duplicate */}
        {/* Hide duplicate field when editing an existing unit */}
        {!isEditing && (
          <>
            <OutlinedInput
              label="Number of units to duplicate"
              iconName="home-group"
              value={duplicateCount}
              onChangeText={setDuplicateCount}
              keyboardType="numeric" // 💡 Brings up the numbers-only keyboard
              placeholder="Number of units to duplicate..."
              rightElement={
                <TouchableOpacity
                  onPress={() => setShowDuplicateInfo((prev) => !prev)}
                >
                  <Ionicons
                    name="information-circle-outline"
                    size={22}
                    color="#CBD5E1"
                  />
                </TouchableOpacity>
              }
            />
            {/* Info Banner Dropdown Card*/}
            {showDuplicateInfo && (
              <View style={styles.infoBannerBox}>
                <Text style={styles.infoBannerText}>
                  Specify a unit count to bulk insert multiple units
                  simultaneously. For instance, if you enter "5," a total of 5
                  units will be created, each labeled with an incremented number
                  (e.g., Unit 1, Unit 2, Unit 3, and so on)
                </Text>
                <TouchableOpacity
                  onPress={() => setShowDuplicateInfo(false)}
                  style={styles.infoCloseBtn}
                >
                  <Ionicons name="close" size={18} color="#0F172A" />
                </TouchableOpacity>
              </View>
            )}
          </>
        )}

        {/* Unit Description Field */}
        <View style={styles.outlinedBox}>
          <Text style={styles.floatingLabel}>Unit Description</Text>
          <Text style={styles.italicInfoIcon}>i</Text>
          <Text style={styles.inputText} numberOfLines={1}>
            {description || "Add unit description..."}
          </Text>

          {/* 💡 TAP PENCIL ICON TO LAUNCH FULL EDITOR SCREEN */}
          <TouchableOpacity onPress={() => setIsDescriptionEditorOpen(true)}>
            <MaterialCommunityIcons name="pencil" size={20} color="#7DD3FC" />
          </TouchableOpacity>
        </View>

        <View style={styles.helperRow}>
          <Text style={styles.helperText}>Press the </Text>
          <MaterialCommunityIcons name="pencil" size={14} color="#7DD3FC" />
          <Text style={styles.helperText}>
            icon to add the unit description
          </Text>
        </View>

        {/* Picture Section Container with Outlined Border & Floating Label */}
        <View style={styles.pictureContainerBox}>
          <Text style={styles.floatingLabel}>Picture</Text>

          <View style={styles.mediaActionsRow}>
            <TouchableOpacity style={styles.mediaBtn} onPress={handlePickImage}>
              <MaterialCommunityIcons name="image" size={18} color="#7DD3FC" />
              <Text style={styles.mediaBtnText}>Pick image(s)</Text>
            </TouchableOpacity>

            {Platform.OS !== "web" && (
              <TouchableOpacity
                style={styles.mediaBtn}
                onPress={handleOpenCamera}
              >
                <MaterialCommunityIcons
                  name="camera"
                  size={18}
                  color="#7DD3FC"
                />
                <Text style={styles.mediaBtnText}>Open camera</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Image Previews in Dynamic 2-Column Rows */}
          {images.length > 0 && (
            <View style={styles.previewList}>
              {Array.from(
                { length: Math.ceil(images.length / 2) },
                (_, rowIndex) =>
                  images
                    .slice(rowIndex * 2, rowIndex * 2 + 2)
                    .map((uri, colIndex) => ({
                      uri,
                      index: rowIndex * 2 + colIndex,
                    })),
              ).map((pair, rowIndex) => {
                const isSingleInRow = pair.length === 1;

                return (
                  <View key={`row-${rowIndex}`} style={styles.previewRow}>
                    {pair.map((item) => (
                      <View
                        key={`${item.uri}-${item.index}`}
                        style={[
                          styles.previewBox,
                          isSingleInRow
                            ? styles.fullWidthCard
                            : styles.halfWidthCard,
                        ]}
                      >
                        <Image
                          source={{ uri: item.uri }}
                          style={styles.previewThumb}
                          resizeMode="cover"
                        />
                        <TouchableOpacity
                          onPress={() => handleRemoveImage(item.index)}
                          style={styles.deleteBtn}
                          activeOpacity={0.8}
                          accessibilityLabel="Remove image"
                        >
                          <MaterialCommunityIcons
                            name="delete-outline"
                            size={18}
                            color="#161C24"
                          />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                );
              })}
            </View>
          )}
        </View>

        {/* Dynamic Submit / Save Button */}
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitBtnText}>
            {isEditing ? "Save Changes" : "Submit"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161C22",
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 60,
  },
  buildingCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#242D37",
    borderRadius: 6,
    padding: 14,
    marginBottom: 18,
    gap: 14,
  },
  buildingTextContainer: {
    flex: 1,
  },
  buildingLabel: {
    color: "#94A3B8",
    fontSize: 12,
  },
  buildingValue: {
    color: "#F8FAFC",
    fontSize: 16,
    marginTop: 2,
  },
  infoBannerBox: {
    backgroundColor: "#7DD3FC", // Light blue alert banner background matching screenshot
    borderRadius: 8,
    padding: 14,
    marginTop: -10,
    marginBottom: 18,
    position: "relative",
  },
  infoBannerText: {
    color: "#0F172A", // Dark text color for readability on light blue
    fontSize: 13,
    lineHeight: 18,
    paddingRight: 20, // Leave room for close icon
  },
  infoCloseBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 4,
  },
  outlinedBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#64748B",
    borderRadius: 6,
    paddingHorizontal: 14,
    height: 54,
    marginBottom: 18,
    position: "relative",
  },
  floatingLabel: {
    position: "absolute",
    top: -9,
    left: 12,
    backgroundColor: "#161C22",
    paddingHorizontal: 6,
    color: "#CBD5E1",
    fontSize: 12,
  },
  italicInfoIcon: {
    color: "#CBD5E1",
    fontStyle: "italic",
    fontWeight: "700",
    fontSize: 16,
    marginRight: 16,
    marginLeft: 4,
  },
  input: {
    flex: 1,
    color: "#F8FAFC",
    fontSize: 16,
  },
  inputText: {
    flex: 1,
    color: "#F8FAFC",
    fontSize: 16,
  },
  helperRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -10,
    marginBottom: 18,
    paddingHorizontal: 4,
  },
  helperText: {
    color: "#CBD5E1",
    fontSize: 12,
  },
  sectionHeading: {
    color: "#F1F5F9",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 14,
  },
  pictureContainerBox: {
    borderWidth: 1,
    borderColor: "#64748B",
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 8,
    marginBottom: 18,
    position: "relative",
  },
  mediaActionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 18,
  },
  mediaBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  mediaBtnText: {
    color: "#7DD3FC",
    fontSize: 14,
    fontWeight: "600",
  },
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
  previewBox: {
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
    backgroundColor: "#D9827B",
    opacity: 1,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({ web: { cursor: "pointer" } }),
  },
  submitBtn: {
    backgroundColor: "#7DD3FC",
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingHorizontal: 48,
    marginTop: 10,
  },
  submitBtnText: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "600",
  },
});
