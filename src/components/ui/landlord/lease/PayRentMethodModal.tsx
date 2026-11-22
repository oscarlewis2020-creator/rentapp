// components/ui/landlord/lease/PayRentMethodModal.tsx
import { Ionicons } from "@expo/vector-icons";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "react-native-paper";

export type RentPaymentMethod =
  | "mpesa"
  | "receipt"
  | "cash"
  | "equitel"
  | "airtel"
  | "visa"
  | "mastercard";

interface PayRentMethodModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectMethod: (method: RentPaymentMethod) => void;
}

export default function PayRentMethodModal({
  visible,
  onClose,
  onSelectMethod,
}: PayRentMethodModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <Pressable style={styles.backdropDismiss} onPress={onClose} />

        <View style={styles.sheetContainer}>
          <View style={styles.topBar}>
            <View style={styles.dragHandle} />
            <Pressable onPress={onClose} hitSlop={10} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color="#E2E8F0" />
            </Pressable>
          </View>

          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {/* LIPA NA M-PESA */}
            <Pressable
              onPress={() => onSelectMethod("mpesa")}
              style={styles.darkMethodBtn}
            >
              <View style={styles.inlineRow}>
                <Text style={styles.lipaNaText}>LIPA NA </Text>
                <Text style={styles.mText}>M</Text>
                <View style={styles.phoneBadge}>
                  <Ionicons name="phone-portrait" size={14} color="#FFFFFF" />
                </View>
                <Text style={styles.pesaText}>PESA</Text>
              </View>
            </Pressable>

            {/* UPLOAD RECEIPT */}
            <Pressable
              onPress={() => onSelectMethod("receipt")}
              style={styles.darkMethodBtn}
            >
              <Text style={styles.uploadTitle}>UPLOAD RECEIPT</Text>
              <Text style={styles.uploadSubtitle}>
                (e.g M-PESA SCREENSHOT , BANK SLIP)
              </Text>
            </Pressable>

            {/* CASH PAYMENT */}
            <Pressable
              onPress={() => onSelectMethod("cash")}
              style={styles.darkMethodBtn}
            >
              <Text style={styles.cashTitle}>CASH PAYMENT</Text>
            </Pressable>

            {/* PAY VIA EQUITEL */}
            <Pressable
              onPress={() => onSelectMethod("equitel")}
              style={styles.lightMethodBtn}
            >
              <View style={styles.inlineRow}>
                <Text style={styles.payViaText}>PAY VIA </Text>
                <Text style={styles.equitelText}>Equitel</Text>
                <View style={styles.equitelNodes}>
                  <View style={[styles.dot, { backgroundColor: "#E11D48" }]} />
                  <View style={[styles.dot, { backgroundColor: "#EA580C" }]} />
                  <View style={[styles.dot, { backgroundColor: "#D97706" }]} />
                </View>
              </View>
            </Pressable>

            {/* PAY VIA AIRTEL */}
            <Pressable
              onPress={() => onSelectMethod("airtel")}
              style={styles.lightMethodBtn}
            >
              <View style={styles.airtelColumn}>
                <View style={styles.inlineRow}>
                  <Text style={styles.payViaText}>PAY VIA </Text>
                  <Ionicons name="flame" size={20} color="#E11D48" />
                </View>
                <Text style={styles.airtelWord}>airtel</Text>
              </View>
            </Pressable>

            {/* PAY VIA VISA */}
            <Pressable
              onPress={() => onSelectMethod("visa")}
              style={styles.lightMethodBtn}
            >
              <View style={styles.inlineRow}>
                <Text style={styles.payViaText}>PAY VIA </Text>
                <View style={styles.visaBox}>
                  <Text style={styles.visaText}>VISA</Text>
                </View>
              </View>
            </Pressable>

            {/* PAY VIA MASTERCARD */}
            <Pressable
              onPress={() => onSelectMethod("mastercard")}
              style={styles.lightMethodBtn}
            >
              <View style={styles.inlineRow}>
                <Text style={styles.payViaText}>PAY VIA </Text>
                <View style={styles.mcContainer}>
                  <View style={styles.mcRedCircle} />
                  <View style={styles.mcYellowCircle} />
                  <Text style={styles.mcLabel}>MasterCard</Text>
                </View>
              </View>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    justifyContent: "flex-end",
  },
  backdropDismiss: {
    flex: 1,
  },
  sheetContainer: {
    backgroundColor: "#044A67",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%",
    alignSelf: "center",
    maxHeight: "88%",
    paddingBottom: 22,
  },
  topBar: {
    paddingTop: 10,
    paddingHorizontal: 18,
    paddingBottom: 8,
    alignItems: "center",
  },
  dragHandle: {
    width: 34,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#071E29",
    marginBottom: 4,
  },
  closeBtn: {
    alignSelf: "flex-end",
    padding: 4,
  },
  content: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    gap: 12,
  },
  darkMethodBtn: {
    backgroundColor: "#23262B",
    borderRadius: 10,
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  lightMethodBtn: {
    backgroundColor: "#A8AAAD",
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  inlineRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  lipaNaText: {
    color: "#F8FAFC",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.4,
  },
  mText: {
    color: "#22C55E",
    fontSize: 18,
    fontWeight: "800",
  },
  phoneBadge: {
    backgroundColor: "#EF4444",
    paddingHorizontal: 2,
    paddingVertical: 1,
    borderRadius: 3,
    marginHorizontal: 1,
  },
  pesaText: {
    color: "#22C55E",
    fontSize: 18,
    fontWeight: "800",
  },
  uploadTitle: {
    color: "#7BC4FA",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  uploadSubtitle: {
    color: "#E2E8F0",
    fontSize: 11,
    marginTop: 2,
  },
  cashTitle: {
    color: "#7BC4FA",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  payViaText: {
    color: "#F8FAFC",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  equitelText: {
    color: "#7C2D12",
    fontSize: 17,
    fontWeight: "700",
    fontStyle: "italic",
  },
  equitelNodes: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 4,
    gap: 2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  airtelColumn: {
    alignItems: "center",
    justifyContent: "center",
  },
  airtelWord: {
    color: "#E11D48",
    fontSize: 15,
    fontWeight: "700",
    marginTop: -2,
  },
  visaBox: {
    backgroundColor: "#1E3A8A",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 4,
  },
  visaText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    fontStyle: "italic",
    letterSpacing: 0.8,
  },
  mcContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 6,
  },
  mcRedCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#EB001B",
  },
  mcYellowCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#F79E1B",
    marginLeft: -8,
  },
  mcLabel: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
    marginLeft: -18,
  },
});
