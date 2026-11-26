// components/roles/landlord/UploadReceiptPaymentScreen.tsx
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export interface ReceiptSubmitPayload {
  amount: string;
  payerName: string;
  phone: string;
  accountNumber: string;
  bankName: string;
  receiptNumber: string;
  paymentDate: string;
  receiptSource: "gallery" | "camera" | null;
  receiptUri: string | null;
  receiptFileName: string | null;
}

interface UploadReceiptPaymentScreenProps {
  unitName?: string;
  buildingName?: string;
  defaultPhone?: string;
  defaultAccountNumber?: string;
  onBack?: () => void;
  onPickImage?: (uri: string) => void;
  onOpenCamera?: (uri: string) => void;
  onSubmitPayment?: (payload: ReceiptSubmitPayload) => void;
}

const BANK_OPTIONS = ["M-PESA", "KCB Bank", "Equity Bank", "Co-op Bank"];

export function LandlordUploadReceiptPaymentScreen({
  unitName = "Room 7",
  buildingName = "Demo Building",
  defaultPhone = "796 758 021",
  defaultAccountNumber = "0111446845",
  onBack,
  onPickImage,
  onOpenCamera,
  onSubmitPayment,
}: UploadReceiptPaymentScreenProps) {
  const [amount, setAmount] = useState("");
  const [payerName, setPayerName] = useState("");
  const [phone, setPhone] = useState(defaultPhone);
  const [accountNumber, setAccountNumber] = useState(defaultAccountNumber);
  const [bankIndex, setBankIndex] = useState(0);
  const [receiptNumber, setReceiptNumber] = useState("");
  const [paymentDate, setPaymentDate] = useState("Nov-23-2026");
  const [receiptSource, setReceiptSource] = useState<
    "gallery" | "camera" | null
  >(null);
  const [receiptUri, setReceiptUri] = useState<string | null>(null);
  const [receiptFileName, setReceiptFileName] = useState<string | null>(null);
  const [isPickingMedia, setIsPickingMedia] = useState(false);

  const bankName = BANK_OPTIONS[bankIndex];

  const notifyUser = (title: string, message: string) => {
    if (Platform.OS === "web") {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleGalleryPress = async () => {
    if (isPickingMedia) return;
    setIsPickingMedia(true);

    try {
      if (Platform.OS !== "web") {
        const permission =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
          notifyUser(
            "Permission Required",
            "Please allow photo library access to pick a receipt image.",
          );
          return;
        }
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 0.85,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        setReceiptSource("gallery");
        setReceiptUri(asset.uri);
        setReceiptFileName(asset.fileName ?? "receipt-image.jpg");
        onPickImage?.(asset.uri);
      }
    } catch (error) {
      console.error("Failed to pick image:", error);
      notifyUser("Gallery Error", "Unable to open image library.");
    } finally {
      setIsPickingMedia(false);
    }
  };

  const handleCameraPress = async () => {
    if (isPickingMedia) return;
    setIsPickingMedia(true);

    try {
      if (Platform.OS !== "web") {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
          notifyUser(
            "Permission Required",
            "Please allow camera access to capture a payment receipt.",
          );
          return;
        }
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 0.85,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        setReceiptSource("camera");
        setReceiptUri(asset.uri);
        setReceiptFileName(asset.fileName ?? "receipt-photo.jpg");
        onOpenCamera?.(asset.uri);
      }
    } catch (error) {
      console.error("Failed to open camera:", error);
      notifyUser("Camera Error", "Unable to launch camera.");
    } finally {
      setIsPickingMedia(false);
    }
  };

  const handleClearReceipt = () => {
    setReceiptUri(null);
    setReceiptFileName(null);
    setReceiptSource(null);
  };

  const handleSubmit = () => {
    onSubmitPayment?.({
      amount: amount.trim(),
      payerName: payerName.trim(),
      phone: phone.trim(),
      accountNumber: accountNumber.trim(),
      bankName,
      receiptNumber: receiptNumber.trim(),
      paymentDate: paymentDate.trim(),
      receiptSource,
      receiptUri,
      receiptFileName,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formCard}>
          {/* Unit Header Box */}
          <View style={styles.unitBannerBox}>
            <MaterialCommunityIcons name="label" size={20} color="#38BDF8" />
            <View>
              <Text style={styles.unitLabel}>Unit</Text>
              <Text style={styles.unitValue}>
                {unitName}{" "}
                <Text style={styles.buildingItalic}>
                  • Building {buildingName}
                </Text>
              </Text>
            </View>
          </View>

          {/* Amount */}
          <View style={styles.outlinedInputRow}>
            <MaterialCommunityIcons name="cash-100" size={22} color="#38BDF8" />
            <TextInput
              value={amount}
              onChangeText={setAmount}
              placeholder="Amount"
              placeholderTextColor="#94A3B8"
              keyboardType="numeric"
              style={styles.textInput}
            />
          </View>

          {/* Payer Name */}
          <View style={styles.outlinedInputRow}>
            <MaterialCommunityIcons name="label" size={22} color="#38BDF8" />
            <TextInput
              value={payerName}
              onChangeText={setPayerName}
              placeholder="Payer Name"
              placeholderTextColor="#94A3B8"
              style={styles.textInput}
            />
          </View>

          {/* +254 Phone Row */}
          <View style={styles.phoneRow}>
            <View style={styles.countryBox}>
              <Text style={styles.flag}>🇰🇪</Text>
              <Text style={styles.codeText}>+254</Text>
            </View>
            <View style={styles.phoneInputBox}>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="796 758 021"
                placeholderTextColor="#94A3B8"
                keyboardType="phone-pad"
                style={styles.textInput}
              />
            </View>
          </View>

          {/* Account Number */}
          <View style={styles.floatingBox}>
            <Text style={styles.floatingLabel}>Account Number</Text>
            <View style={styles.innerRow}>
              <MaterialCommunityIcons
                name="card-account-details-outline"
                size={22}
                color="#E2E8F0"
              />
              <TextInput
                value={accountNumber}
                onChangeText={setAccountNumber}
                placeholder="Account Number"
                placeholderTextColor="#94A3B8"
                style={styles.textInput}
              />
            </View>
          </View>

          {/* Bank Name Selector */}
          <View style={styles.floatingBox}>
            <Text style={styles.floatingLabel}>Bank name</Text>
            <Pressable
              onPress={() =>
                setBankIndex((prev) => (prev + 1) % BANK_OPTIONS.length)
              }
              style={styles.dropdownRow}
            >
              <View style={styles.dropdownLeft}>
                <FontAwesome5 name="university" size={18} color="#CBD5E1" />
                <Text style={styles.dropdownValue}>{bankName}</Text>
              </View>
              <Ionicons name="caret-down" size={16} color="#CBD5E1" />
            </Pressable>
          </View>

          {/* Receipt Number */}
          <View style={styles.outlinedInputRow}>
            <MaterialCommunityIcons name="label" size={22} color="#38BDF8" />
            <TextInput
              value={receiptNumber}
              onChangeText={setReceiptNumber}
              placeholder="Receipt Number"
              placeholderTextColor="#94A3B8"
              style={styles.textInput}
            />
          </View>

          {/* Payment Date */}
          <View style={styles.floatingBox}>
            <Text style={styles.floatingLabel}>Payment Date</Text>
            <View style={styles.innerRow}>
              <MaterialCommunityIcons
                name="calendar-month-outline"
                size={22}
                color="#38BDF8"
              />
              <TextInput
                value={paymentDate}
                onChangeText={setPaymentDate}
                placeholder="Nov-23-2026"
                placeholderTextColor="#94A3B8"
                style={styles.textInput}
              />
            </View>
          </View>

          {/* Upload Receipt Image or Payment Screenshot */}
          <View style={styles.uploadSectionBox}>
            <Text style={styles.uploadTitle}>
              Upload receipt Image or Payment Screenshot
            </Text>

            <View style={styles.uploadActionsRow}>
              <Pressable
                onPress={handleGalleryPress}
                disabled={isPickingMedia}
                style={styles.uploadBtn}
              >
                <Ionicons
                  name="image"
                  size={20}
                  color={receiptSource === "gallery" ? "#CBD5E1" : "#79D2FA"}
                />
                <Text
                  style={[
                    styles.uploadBtnText,
                    receiptSource === "gallery" && styles.uploadBtnActive,
                  ]}
                >
                  Pick one image
                </Text>
              </Pressable>

              {Platform.OS !== "web" && (
                <Pressable
                  onPress={handleCameraPress}
                  disabled={isPickingMedia}
                  style={styles.uploadBtn}
                >
                  <Ionicons
                    name="camera"
                    size={20}
                    color={receiptSource === "camera" ? "#CBD5E1" : "#79D2FA"}
                  />
                  <Text
                    style={[
                      styles.uploadBtnText,
                      styles.uploadBtnDefault,
                      receiptSource === "camera" && styles.uploadBtnActive,
                    ]}
                  >
                    Open camera
                  </Text>
                </Pressable>
              )}
            </View>

            {receiptUri && (
              <View style={styles.attachedPillRow}>
                <Image
                  source={{ uri: receiptUri }}
                  style={styles.thumbnailImage}
                  resizeMode="cover"
                />
                <Pressable
                  onPress={handleClearReceipt}
                  hitSlop={8}
                  style={styles.trashIconBtn}
                  accessibilityLabel="Remove receipt image"
                >
                  <Ionicons name="trash" size={18} color="#1B1F24" />
                </Pressable>
              </View>
            )}
          </View>

          {/* Submit Button */}
          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.submitBtn}
            labelStyle={styles.submitLabel}
            buttonColor="#79D2FA"
            textColor="#0F172A"
          >
            Submit
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141619",
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%",
    alignSelf: "center",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  menuBtn: {
    padding: 2,
  },
  headerTitle: {
    color: "#F8FAFC",
    fontSize: 20,
    fontWeight: "500",
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 48,
  },
  formCard: {
    backgroundColor: "#1B1F24",
    borderRadius: 16,
    padding: 14,
    gap: 16,
  },
  unitBannerBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#262B31",
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  unitLabel: {
    color: "#CBD5E1",
    fontSize: 13,
  },
  unitValue: {
    color: "#F8FAFC",
    fontSize: 18,
    fontWeight: "500",
    marginTop: 2,
  },
  buildingItalic: {
    color: "#CBD5E1",
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: "400",
  },
  outlinedInputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderWidth: 1,
    borderColor: "#424852",
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  countryBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "#424852",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 15,
  },
  flag: {
    fontSize: 16,
  },
  codeText: {
    color: "#E2E8F0",
    fontSize: 16,
  },
  phoneInputBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#424852",
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  floatingBox: {
    position: "relative",
    borderWidth: 1,
    borderColor: "#424852",
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginTop: 4,
  },
  floatingLabel: {
    position: "absolute",
    top: -10,
    left: 12,
    backgroundColor: "#1B1F24",
    paddingHorizontal: 4,
    color: "#CBD5E1",
    fontSize: 13,
  },
  innerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  dropdownRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  dropdownLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  dropdownValue: {
    color: "#E2E8F0",
    fontSize: 16,
    fontWeight: "500",
  },
  textInput: {
    flex: 1,
    color: "#F8FAFC",
    fontSize: 17,
    paddingVertical: 4,
  },
  uploadSectionBox: {
    borderWidth: 1,
    borderColor: "#424852",
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 16,
  },
  uploadTitle: {
    color: "#E2E8F0",
    fontSize: 16,
    textAlign: "center",
  },
  uploadActionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  uploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  uploadBtnText: {
    color: "#E2E8F0",
    fontSize: 16,
    fontWeight: "500",
  },
  uploadBtnDefault: {
    color: "#79D2FA",
  },
  uploadBtnActive: {
    color: "#64748B",
  },
  attachedPillRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#424852",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#1B1F24",
  },
  thumbnailImage: {
    width: 68,
    height: 52,
    borderRadius: 8,
    backgroundColor: "#262B31",
  },
  trashIconBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: "#D9827B",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({ web: { cursor: "pointer" } }),
  },
  submitBtn: {
    alignSelf: "center",
    borderRadius: 12,
    paddingHorizontal: 22,
    paddingVertical: 4,
    marginTop: 6,
  },
  submitLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
});
