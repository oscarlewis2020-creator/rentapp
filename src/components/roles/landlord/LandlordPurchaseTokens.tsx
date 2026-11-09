import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface PurchaseTokensScreenProps {
  onBackPress: () => void;
}

export function LandlordPurchaseTokensScreen({
  onBackPress,
}: PurchaseTokensScreenProps) {
  const [mpesaNumber, setMpesaNumber] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(true);

  // Dynamic Token Calculation Pricing metrics rule constraint formulation logic
  const numericAmount = parseFloat(amountPaid) || 0;
  const computedTokens = Math.floor(numericAmount / 2); // 1 token costs 2 KES

  return (
    <SafeAreaView style={styles.outerContainer}>
      {/* Responsive Core Layout Container Framework Box (Max 600px Width on Web) */}
      <View style={styles.responsiveWrapper}>
        {/* Top App Header bar alignment layout matching Image 2 */}
        <View style={styles.appBar}>
          <View style={styles.leftHeader}>
            <TouchableOpacity style={styles.iconButton} onPress={onBackPress}>
              <Ionicons name="menu" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Purchase Tokens</Text>
          </View>
          <View style={styles.rightHeader}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.profileAvatar}>
              <Text style={styles.avatarText}>L</Text>
              <View style={styles.onlineDot} />
            </View>
          </View>
        </View>

        {/* Core Multi-Field Inputs Form Container block */}
        <View style={styles.formContentCardContainer}>
          {/* Form Row 1: Phone input parameters matrix */}
          <View style={styles.formRowGroupField}>
            <View style={styles.countryCodeBadgeLeftColumn}>
              <Text style={styles.flagEmoji}>🇰🇪</Text>
              <Text style={styles.codeText}>+254</Text>
            </View>
            <View style={styles.fieldValueRightColumnInputWrapper}>
              <TextInput
                placeholder="M-pesa phone number"
                placeholderTextColor="#8a94a6"
                style={styles.textInputFieldComponent}
                value={mpesaNumber}
                onChangeText={setMpesaNumber}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Form Row 2: Financial pricing parameters inputs */}
          <View style={[styles.formRowGroupField, { marginBottom: 12 }]}>
            <View
              style={[
                styles.fieldValueRightColumnInputWrapper,
                styles.fullWidthFieldFix,
              ]}
            >
              <TextInput
                placeholder="Amount to pay"
                placeholderTextColor="#8a94a6"
                style={styles.textInputFieldComponent}
                value={amountPaid}
                onChangeText={setAmountPaid}
                keyboardType="numeric"
              />
              <Ionicons
                name="information-circle-outline"
                size={22}
                color="#4fa3f7"
                style={styles.fieldRightIconInfo}
              />
            </View>
          </View>

          {/* Dynamic computed tokens output calculation text tracker string line */}
          <Text style={styles.liveCalculationLabelText}>
            Total tokens to be purchased {computedTokens}
          </Text>

          {/* Core blue action submit operational context button */}
          <TouchableOpacity
            style={styles.submitActionButtonFormButton}
            onPress={() =>
              console.log(
                "Initiating STK Push request payload targeting: ",
                mpesaNumber,
              )
            }
          >
            <Text style={styles.submitActionButtonFormButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>

        {/* 💡 BOTTOM ALERT ACCENT BANNER (Conditionally switchable via click actions) */}
        {isAlertVisible && (
          <View style={styles.bottomInformationalAlertBannerContainer}>
            <Text style={styles.alertContentMessageText}>
              A token costs 2 KES. Each SMS costs 1 token (up to 160
              characters).
            </Text>
            <TouchableOpacity
              style={styles.alertDismissIconButton}
              onPress={() => setIsAlertVisible(false)}
            >
              <Ionicons name="close" size={20} color="#161c24" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#121820",
  },
  responsiveWrapper: {
    flex: 1,
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
    backgroundColor: "#161c24",
    position: "relative",
    ...Platform.select({
      web: { boxShadow: "0px 0px 20px rgba(0,0,0,0.3)" },
    }),
  },
  appBar: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#1c2431",
    zIndex: 10,
  },
  leftHeader: { flexDirection: "row", alignItems: "center" },
  rightHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  iconButton: {
    padding: 6,
    ...Platform.select({ web: { cursor: "pointer" } }),
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 16,
  },
  profileAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#23783c",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 14,
    position: "relative",
  },
  avatarText: { color: "#ffffff", fontWeight: "bold", fontSize: 14 },
  onlineDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#52c41a",
    borderWidth: 1.5,
    borderColor: "#1c2431",
  },

  /* Form Layout Fields Elements Content Styles Box */
  formContentCardContainer: {
    backgroundColor: "#1c2431", // Central form block dark box backdrop
    borderWidth: 1,
    borderColor: "#252f41",
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 180, // Generates the clean layout offset alignment from your dashboard snap capture 2
    padding: 24,
  },
  formRowGroupField: {
    flexDirection: "row",
    gap: 0,
    marginBottom: 20,
    height: 56,
  },
  countryCodeBadgeLeftColumn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#42526e",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderRightWidth: 0,
    paddingHorizontal: 16,
    backgroundColor: "#161c24",
    height: "100%",
  },
  flagEmoji: { fontSize: 20, marginRight: 8 },
  codeText: { color: "#ffffff", fontSize: 16, fontWeight: "600" },
  fieldValueRightColumnInputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#42526e",
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "#161c24",
    height: "100%",
  },
  fullWidthFieldFix: {
    borderRadius: 12,
  },
  textInputFieldComponent: {
    flex: 1,
    color: "#ffffff",
    fontSize: 16,
    height: "100%",
    ...Platform.select({ web: { outlineStyle: "none" } as any }),
  },
  fieldRightIconInfo: {
    marginLeft: 8,
  },
  liveCalculationLabelText: {
    color: "#a2b1c6",
    fontSize: 14,
    fontWeight: "400",
    paddingHorizontal: 4,
    marginBottom: 24,
  },
  submitActionButtonFormButton: {
    backgroundColor: "#86d3ff", // Custom sky blue accent action pill fill matching capture 2
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    width: "56%",
    alignSelf: "center",
    ...Platform.select({ web: { cursor: "pointer" } }),
  },
  submitActionButtonFormButtonText: {
    color: "#161c24",
    fontSize: 16,
    fontWeight: "700",
  },

  /* 💡 High-fidelity Bottom Alert Box Banner styling setup rules */
  bottomInformationalAlertBannerContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: "#86d3ff", // Informative light accent blue vector fill matching item banner capture 2
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  alertContentMessageText: {
    color: "#161c24",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    flex: 1,
    paddingRight: 12,
  },
  alertDismissIconButton: {
    padding: 4,
    ...Platform.select({ web: { cursor: "pointer" } }),
  },
});
