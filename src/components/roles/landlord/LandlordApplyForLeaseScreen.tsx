import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ApplyForLeaseScreenProps {
  selectedBuilding?: string;
  selectedUnit?: string;
  onBack: () => void;
  onSubmitLease?: (data: any) => void;
}

export function LandlordApplyForLeaseScreen({
  selectedBuilding = "Test 1",
  selectedUnit = "Room1",
  onBack,
  onSubmitLease,
}: ApplyForLeaseScreenProps) {
  const [tenantName, setTenantName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState("Nov-11-2026");
  const [endDate, setEndDate] = useState("Nov-10-2027");
  const [idImage, setIdImage] = useState<string | null>(null);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      setIdImage(result.assets[0].uri);
    }
  };

  const handleOpenCamera = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("Permission required", "Camera access is needed.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ quality: 0.8 });
    if (!result.canceled && result.assets[0]) {
      setIdImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    const payload = {
      building: selectedBuilding,
      unit: selectedUnit,
      tenantName,
      phoneNumber: `+254 ${phoneNumber}`,
      email,
      startDate,
      endDate,
      idImage,
    };
    if (onSubmitLease) {
      onSubmitLease(payload);
    } else {
      Alert.alert(
        "Lease Application Submitted",
        JSON.stringify(payload, null, 2),
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Unit Read-Only Card */}
        <View style={styles.unitCard}>
          <MaterialCommunityIcons name="label" size={20} color="#7DD3FC" />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.cardLabel}>Unit</Text>
            <Text style={styles.cardValue}>{selectedUnit}</Text>
          </View>
        </View>

        {/* Tenant Name */}
        <View style={styles.inputBox}>
          <Text style={styles.floatingLabel}>Tenant Name</Text>
          <MaterialCommunityIcons
            name="label"
            size={20}
            color="#7DD3FC"
            style={{ marginRight: 12 }}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Tenant Name"
            placeholderTextColor="#64748B"
            value={tenantName}
            onChangeText={setTenantName}
          />
        </View>

        {/* Phone Number Box (Flag + Prefix + Input) */}
        <View style={styles.phoneBox}>
          <Text style={styles.floatingLabel}>Tenant Phone Number</Text>
          <View style={styles.phonePrefix}>
            <Text style={{ fontSize: 16 }}>🇰🇪</Text>
            <Text style={styles.prefixText}>+254</Text>
          </View>
          <View style={styles.verticalDivider} />
          <TextInput
            style={[styles.textInput, { paddingLeft: 12 }]}
            placeholder="Tenant Phone Number"
            placeholderTextColor="#64748B"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        {/* Tenant Email */}
        <View style={styles.inputBox}>
          <Text style={styles.floatingLabel}>Tenant Email</Text>
          <MaterialCommunityIcons
            name="email-outline"
            size={20}
            color="#7DD3FC"
            style={{ marginRight: 12 }}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Tenant Email"
            placeholderTextColor="#64748B"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Start Date */}
        <View style={styles.inputBox}>
          <Text style={styles.floatingLabel}>Change Start Date</Text>
          <MaterialCommunityIcons
            name="calendar"
            size={20}
            color="#7DD3FC"
            style={{ marginRight: 12 }}
          />
          <TextInput
            style={styles.textInput}
            value={startDate}
            onChangeText={setStartDate}
            placeholderTextColor="#64748B"
          />
        </View>

        {/* End Date */}
        <View style={styles.inputBox}>
          <Text style={styles.floatingLabel}>Change End Date</Text>
          <MaterialCommunityIcons
            name="calendar"
            size={20}
            color="#7DD3FC"
            style={{ marginRight: 12 }}
          />
          <TextInput
            style={styles.textInput}
            value={endDate}
            onChangeText={setEndDate}
            placeholderTextColor="#64748B"
          />
        </View>

        {/* Government Issued Photo ID Section */}
        <View style={styles.pictureContainerBox}>
          <Text style={styles.floatingLabel}>GOVERNMENT ISSUED PHOTO ID</Text>
          <View style={styles.mediaActionsRow}>
            <TouchableOpacity style={styles.mediaBtn} onPress={handlePickImage}>
              <MaterialCommunityIcons name="image" size={18} color="#7DD3FC" />
              <Text style={styles.mediaBtnText}>Pick one image</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.mediaBtn}
              onPress={handleOpenCamera}
            >
              <MaterialCommunityIcons name="camera" size={18} color="#7DD3FC" />
              <Text style={styles.mediaBtnText}>Open camera</Text>
            </TouchableOpacity>
          </View>

          {idImage && (
            <View style={styles.previewBox}>
              <Image source={{ uri: idImage }} style={styles.previewThumb} />
              <TouchableOpacity
                onPress={() => setIdImage(null)}
                style={styles.deleteBtn}
              >
                <MaterialCommunityIcons
                  name="delete-outline"
                  size={22}
                  color="#EF4444"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
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

  scrollContent: { padding: 16, paddingBottom: 60 },
  unitCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E252D",
    borderRadius: 8,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#334155",
  },
  cardLabel: { color: "#94A3B8", fontSize: 12 },
  cardValue: { color: "#F8FAFC", fontSize: 16, marginTop: 2 },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#64748B",
    borderRadius: 6,
    paddingHorizontal: 14,
    height: 54,
    marginBottom: 20,
    position: "relative",
    backgroundColor: "#121824",
  },
  phoneBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#64748B",
    borderRadius: 6,
    paddingHorizontal: 14,
    height: 54,
    marginBottom: 20,
    position: "relative",
    backgroundColor: "#121824",
  },
  floatingLabel: {
    position: "absolute",
    top: -9,
    left: 12,
    backgroundColor: "#121824",
    paddingHorizontal: 6,
    color: "#CBD5E1",
    fontSize: 11,
    fontWeight: "500",
  },
  phonePrefix: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingRight: 10,
  },
  prefixText: {
    color: "#F8FAFC",
    fontSize: 15,
    fontWeight: "500",
  },
  verticalDivider: {
    width: 1,
    height: 24,
    backgroundColor: "#475569",
    marginHorizontal: 4,
  },
  textInput: {
    flex: 1,
    color: "#F8FAFC",
    fontSize: 15,
  },
  pictureContainerBox: {
    borderWidth: 1,
    borderColor: "#64748B",
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 12,
    marginBottom: 20,
    position: "relative",
    backgroundColor: "#121824",
  },
  mediaActionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  mediaBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  mediaBtnText: { color: "#7DD3FC", fontSize: 14, fontWeight: "600" },
  previewBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#475569",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#1E252D",
    marginTop: 6,
  },
  previewThumb: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#334155",
  },
  deleteBtn: { padding: 8 },
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
  submitBtnText: { color: "#0F172A", fontSize: 16, fontWeight: "600" },
});
