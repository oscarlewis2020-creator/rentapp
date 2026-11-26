// components/roles/landlord/LipaNaMpesaPaymentScreen.tsx
import ServiceCostTariffsModal, {
  calculateServiceCost,
} from "@/components/ui/landlord/lease/ServiceCostTarrifsModal";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

interface LipaNaMpesaPaymentScreenProps {
  unitName?: string;
  defaultPhone?: string;
  onBack?: () => void;
  onSubmitMpesa?: (payload: {
    unitName: string;
    phone: string;
    payerName: string;
    amount: number;
    serviceCost: number;
    totalAmount: number;
    comment: string;
  }) => void;
}

export function LandlordLipaNaMpesaPaymentScreen({
  unitName = "Room 7",
  defaultPhone = "796 758 021",
  onBack,
  onSubmitMpesa,
}: LipaNaMpesaPaymentScreenProps) {
  const [phone, setPhone] = useState(defaultPhone);
  const [payerName, setPayerName] = useState("");
  const [amountText, setAmountText] = useState("");
  const [comment, setComment] = useState("Rent payment");
  const [isTariffsOpen, setIsTariffsOpen] = useState(false);

  const numericAmount = Number(amountText.replace(/[^0-9.]/g, "")) || 0;
  const serviceCost =
    numericAmount > 0 ? calculateServiceCost(numericAmount) : 0;
  const totalAmount = numericAmount > 0 ? numericAmount + serviceCost : 0;

  const handleSubmit = () => {
    onSubmitMpesa?.({
      unitName,
      phone: phone.trim(),
      payerName: payerName.trim(),
      amount: numericAmount,
      serviceCost,
      totalAmount,
      comment: comment.trim(),
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formCard}>
          {/* Unit Box */}
          <View style={styles.unitBannerBox}>
            <MaterialCommunityIcons name="label" size={20} color="#38BDF8" />
            <View>
              <Text style={styles.unitLabel}>Unit</Text>
              <Text style={styles.unitValue}>{unitName}</Text>
            </View>
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

          {/* M-Pesa Amount + Cost Box */}
          <View style={styles.amountCostRow}>
            <View style={styles.amountInputBox}>
              <MaterialCommunityIcons
                name="cash-100"
                size={22}
                color="#38BDF8"
              />
              <TextInput
                value={amountText}
                onChangeText={setAmountText}
                placeholder="M-Pesa Amount"
                placeholderTextColor="#94A3B8"
                keyboardType="numeric"
                style={styles.textInput}
              />
            </View>

            <View style={styles.costBox}>
              <Text style={styles.costLabel}>Cost</Text>
              <Text style={styles.costValue}>{serviceCost}</Text>
            </View>
          </View>

          {/* Total amount to be paid + Info Icon */}
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>
              Total amount to be paid : {totalAmount}
            </Text>
            <Pressable
              onPress={() => setIsTariffsOpen(true)}
              hitSlop={8}
              style={styles.infoIconBtn}
            >
              <Ionicons name="information" size={16} color="#38BDF8" />
            </Pressable>
          </View>

          {/* Comment Box */}
          <View style={styles.floatingBox}>
            <Text style={styles.floatingLabel}>Comment</Text>
            <View style={styles.innerRow}>
              <Ionicons name="information" size={20} color="#38BDF8" />
              <TextInput
                value={comment}
                onChangeText={setComment}
                placeholder="Rent payment"
                placeholderTextColor="#94A3B8"
                style={styles.textInput}
              />
            </View>
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

      <ServiceCostTariffsModal
        visible={isTariffsOpen}
        onClose={() => setIsTariffsOpen(false)}
      />
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
    paddingTop: 22,
    paddingBottom: 40,
  },
  formCard: {
    backgroundColor: "#1B1F24",
    borderRadius: 16,
    padding: 14,
    gap: 18,
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
  amountCostRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  amountInputBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#424852",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  costBox: {
    width: 96,
    backgroundColor: "#24282E",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  costLabel: {
    color: "#CBD5E1",
    fontSize: 12,
  },
  costValue: {
    color: "#64748B",
    fontSize: 18,
    fontWeight: "500",
    marginTop: 2,
  },
  totalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    marginTop: -6,
  },
  totalText: {
    color: "#CBD5E1",
    fontSize: 16,
  },
  infoIconBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#38BDF8",
    alignItems: "center",
    justifyContent: "center",
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
  textInput: {
    flex: 1,
    color: "#F8FAFC",
    fontSize: 17,
    paddingVertical: 4,
  },
  submitBtn: {
    alignSelf: "center",
    borderRadius: 12,
    paddingHorizontal: 22,
    paddingVertical: 4,
    marginTop: 8,
  },
  submitLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
});
