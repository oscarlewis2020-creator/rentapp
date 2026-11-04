// components/roles/landlord/LandlordWallets.tsx
import { CreateBankWalletModal } from "@/components/ui/landlord/extra/wallets/CreateBankWalletModal";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserRole } from "../../../app/_layout";
import { ChooseSettlementModeModal } from "../../ui/landlord/extra/wallets/ChooseSettlementModeModal";

interface LandlordWalletsProps {
  onManualWalletPress?: () => void;
  onCreateWalletPress?: () => void;
}

export function LandlordWallets({
  onManualWalletPress,
  onCreateWalletPress,
}: LandlordWalletsProps) {
  const { setIsDrawerOpen } = useUserRole();

  //💡 Add modal open tracking trigger visibility state hook
  const [settlementModalVisible, setSettlementModalVisible] = useState(false);
  const [bankModalVisible, setBankModalVisible] = useState(false);

  // 1. Add visibility state hooks for the newly created phone modal template layout:
  const [phoneModalVisible, setPhoneModalVisible] = useState(false);
  const [selectedCarrier, setSelectedCarrier] = useState<"MPESA" | "AIRTEL">(
    "MPESA",
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* ================= 1. UPPER APPBAR NAVIGATION ROW ================= */}
      <View style={styles.appBar}>
        <View style={styles.appBarLeft}>
          <TouchableOpacity
            onPress={() => setIsDrawerOpen(true)}
            style={styles.menuButton}
          >
            <Ionicons name="menu" size={28} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.appBarTitle}>Test 1 Wallets</Text>
        </View>
        <View style={styles.appBarRight}>
          <TouchableOpacity style={styles.appBarIconButton}>
            <Ionicons name="notifications" size={24} color="#FFF" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>L</Text>
          </View>
        </View>
      </View>
      {/* ================= 2. CORE WORKSPACE SCROLL CONTENT ================= */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Section Headline */}
        <Text style={styles.sectionHeadline}>Manual Receipt wallet</Text>

        {/* Manual Receipt Wallet Link Card */}
        <TouchableOpacity
          style={styles.walletCard}
          activeOpacity={0.8}
          onPress={
            onManualWalletPress ||
            (() => console.log("Navigate to manual receipts dashboard"))
          }
        >
          <View style={styles.cardLeftGroup}>
            <MaterialCommunityIcons
              name="wallet-outline"
              size={24}
              color="#85C1E9"
            />
            <View style={styles.cardTextGroup}>
              <Text style={styles.cardTitle}>
                View building revenue summary for all
              </Text>
              <Text style={styles.cardTitle}>manually uploaded receipts.</Text>
            </View>
          </View>
          <Ionicons
            name="chevron-forward-circle-outline"
            size={22}
            color="#9EA5B1"
          />
        </TouchableOpacity>

        {/* Empty Automated Wallets Informational Callout */}
        <View style={styles.emptyPlaceholderContainer}>
          <Text style={styles.emptyPlaceholderText}>
            No automated wallets found for this property. Click the "Create
            wallet" below to add a wallet.
          </Text>
        </View>
      </ScrollView>
      {/* ================= 3. FLOATING ACTION PILL BUTTON (FAB) ================= */}
      <View style={styles.fabOverlayContainer}>
        <TouchableOpacity
          style={styles.createWalletButton}
          activeOpacity={0.85}
          onPress={() => setSettlementModalVisible(true)}
        >
          <MaterialCommunityIcons
            name="wallet-plus-outline"
            size={20}
            color="#FFF"
            style={styles.fabIcon}
          />
          <Text style={styles.fabButtonText}>Create Wallet</Text>
        </TouchableOpacity>
      </View>
      {/* 💡 INJECT THE LIVE SETTLEMENT MODAL OVERLAY PORTAL LAYER HERE */}
      <ChooseSettlementModeModal
        visible={settlementModalVisible}
        onClose={() => setSettlementModalVisible(false)}
        onProceed={(chosenMode, carrier) => {
          if (chosenMode === "Phone" && carrier) {
            setSelectedCarrier(carrier);
            setPhoneModalVisible(true); // 💡 Launch our new matching Phone modal overlay instantly
          } else if (chosenMode === "Bank") {
            setBankModalVisible(true);
          }
        }}
      />
      {/*3. Inject the new CreateBankWalletModal portal layout row: */}
      <CreateBankWalletModal
        visible={bankModalVisible}
        onClose={() => setBankModalVisible(false)}
        onSubmit={(formData) => {
          console.log(
            "Pushing new bank authorization coordinates data to server pipeline:",
            formData,
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161D26", // Matched with deep slate shade context from screenshot
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%",
    alignSelf: "center",
    position: "relative",
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#242F42",
  },
  appBarLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  menuButton: {
    padding: 2,
  },
  appBarTitle: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "600",
  },
  appBarRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  appBarIconButton: {
    position: "relative",
    padding: 2,
  },
  notificationDot: {
    position: "absolute",
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4CD964",
  },
  avatarCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#85C1E9",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#121824",
    fontSize: 15,
    fontWeight: "700",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 120,
  },
  sectionHeadline: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: 0.3,
  },
  walletCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1C2534", // Embedded card frame fill block matching layout image
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: "#242F42",
    marginBottom: 36,
  },
  cardLeftGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    flex: 1,
  },
  cardTextGroup: {
    flex: 1,
  },
  cardTitle: {
    color: "#E5E9F0",
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 22,
  },
  emptyPlaceholderContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  emptyPlaceholderText: {
    color: "#85C1E9", // Inset cyan color matching text callout
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    fontWeight: "400",
  },
  fabOverlayContainer: {
    position: "absolute",
    bottom: 30,
    right: 16,
    left: 16,
    alignItems: "flex-end",
    pointerEvents: "box-none",
  },
  createWalletButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#035273", // Brand theme dark turquoise color match
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 16, // Matching rounded button geometry perfectly
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    ...Platform.select({
      web: { cursor: "pointer", userSelect: "none" },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: { elevation: 6 },
    }),
  },
  fabIcon: {
    marginRight: 8,
  },
  fabButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
