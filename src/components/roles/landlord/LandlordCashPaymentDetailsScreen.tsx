// components/roles/landlord/CashPaymentDetailsScreen.tsx
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

interface CashPaymentDetailsScreenProps {
  defaultPhone?: string;
  onBack?: () => void;
  onSubmitCash?: (payload: {
    amount: string;
    paymentDate: string;
    payerName: string;
    phone: string;
    comment: string;
  }) => void;
}

export function LandlordCashPaymentDetailsScreen({
  defaultPhone = "796 758 021",
  onBack,
  onSubmitCash,
}: CashPaymentDetailsScreenProps) {
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState("Nov-23-2026");
  const [payerName, setPayerName] = useState("");
  const [phone, setPhone] = useState(defaultPhone);
  const [comment, setComment] = useState("Rent payment");

  const handleSubmit = () => {
    onSubmitCash?.({
      amount: amount.trim(),
      paymentDate: paymentDate.trim(),
      payerName: payerName.trim(),
      phone: phone.trim(),
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

          {/* Comment */}
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
