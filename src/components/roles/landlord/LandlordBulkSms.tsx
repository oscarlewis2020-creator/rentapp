import CreateCustomMessageModal from "@/components/ui/landlord/extra/bulk-sms/CreateCustomMessageModal";
import PredefinedSmsCard, {
  PredefinedSmsItem,
} from "@/components/ui/landlord/extra/bulk-sms/PredefinedSmsCard";
import SendSmsConfirmationModal from "@/components/ui/landlord/extra/bulk-sms/SendSmsConfirmationModal";
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

interface BulkSmsScreenProps {
  buildingName: string;
  onBackPress: () => void;
  onViewDetailsPress: (item: PredefinedSmsItem) => void;
}

export function LandlordBulkSms({
  buildingName,
  onBackPress,
  onViewDetailsPress,
}: BulkSmsScreenProps) {
  const [activeTab, setActiveTab] = useState<"predefined" | "custom">(
    "predefined",
  );
  const [isSendConfirmationOpen, setIsSendConfirmationOpen] = useState(false);
  const [notificationToggle, setNotificationToggle] = useState<
    "enabled" | "all"
  >("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [smsItems, setSmsItems] = useState<PredefinedSmsItem[]>([
    {
      id: "lease_expiry",
      title: "Lease expiry reminder (1...",
      collapsedText:
        "Dear Tenant, This is a reminder that your lease agreement is set to expire i...",
      expandedText:
        "Dear Tenant, This is a reminder that your lease agreement is set to expire in 30 days, on [LEASE END DATE]. If you wish to extend your stay, you may request a lease extension directly through the mobile app or contact the property management team for assistance...",
      isEnabled: false,
    },
    {
      id: "rent_due",
      title: "Rent due reminder",
      collapsedText:
        "Dear Tenant, this is a friendly reminder that your monthly rent is due on [D...",
      expandedText:
        "Dear Tenant, this is a friendly reminder that your monthly rent is due on [DUE DATE]. To avoid any penalties or late fees, kindly ensure the payment is completed by the due date...",
      isEnabled: false,
    },
    {
      id: "overdue_rent",
      title: "Overdue rent alert",
      collapsedText:
        "Attention: Your rent has been overdue since [DUE DATE]. We kindly urge you t...",
      expandedText:
        "Attention: Your rent has been overdue since [DUE DATE]. We kindly urge you to settle the outstanding balance immediately to avoid additional late fees or possible lease termination...",
      isEnabled: false,
    },
  ]);

  const handleToggleSwitch = (id: string) => {
    setSmsItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isEnabled: !item.isEnabled } : item,
      ),
    );
  };

  const displayedItems = smsItems.filter(
    (item) => notificationToggle === "all" || item.isEnabled,
  );

  return (
    <SafeAreaView style={styles.outerContainer}>
      <View style={styles.responsiveWrapper} pointerEvents="box-none">
        {/* Top Header */}
        <View style={styles.appBar}>
          <TouchableOpacity style={styles.iconButton} onPress={onBackPress}>
            <Ionicons name="menu" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Bulk SMS</Text>
          <View style={styles.rightHeader}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color="#fff"
              style={{ marginRight: 14 }}
            />
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>L</Text>
            </View>
          </View>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={Platform.OS === "web"}
        >
          {/* Tokens Balance Card */}
          <View style={styles.tokenCard}>
            <View>
              <Text style={styles.tokenLabel}>
                Available Token{" "}
                <Ionicons
                  name="information-circle-outline"
                  size={14}
                  color="#8a94a6"
                />
              </Text>
              <Text style={styles.tokenValue}>
                <MaterialCommunityIcons name="gold" size={20} color="#ffb900" />{" "}
                0
              </Text>
            </View>
            <TouchableOpacity style={styles.purchaseBtn}>
              <Text style={styles.purchaseBtnText}>+ Purchase Tokens</Text>
            </TouchableOpacity>
          </View>

          {/* Tab Controls Navigation */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === "predefined" && styles.activeTab,
              ]}
              onPress={() => setActiveTab("predefined")}
            >
              <Text style={styles.tabText}>Predefined SMS</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === "custom" && styles.activeTab]}
              onPress={() => setActiveTab("custom")}
            >
              <Text style={styles.tabText}>Custom SMS</Text>
            </TouchableOpacity>
          </View>

          {/* Centered Radio Filters Action Control Bar */}
          {activeTab === "predefined" && (
            <View style={styles.radioBar}>
              <Ionicons
                name="information-circle-outline"
                size={20}
                color="#4fa3f7"
              />
              <View style={styles.radioGroup}>
                <TouchableOpacity
                  style={styles.radioItem}
                  onPress={() => setNotificationToggle("enabled")}
                >
                  <Ionicons
                    name={
                      notificationToggle === "enabled"
                        ? "radio-button-on"
                        : "radio-button-off"
                    }
                    size={18}
                    color="#4fa3f7"
                  />
                  <Text style={styles.radioLabel}>Enabled</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.radioItem}
                  onPress={() => setNotificationToggle("all")}
                >
                  <Ionicons
                    name={
                      notificationToggle === "all"
                        ? "radio-button-on"
                        : "radio-button-off"
                    }
                    size={18}
                    color="#4fa3f7"
                  />
                  <Text style={styles.radioLabel}>All notifications</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Dynamic Content Panel View Router Switch List */}
          {activeTab === "custom" ? (
            <View style={styles.emptyView}>
              <Text style={styles.emptyText}>
                No custom SMS found for this property.
              </Text>
            </View>
          ) : (
            displayedItems.map((item) => (
              <PredefinedSmsCard
                key={item.id}
                item={item}
                onToggleSwitch={handleToggleSwitch}
                onSendNowPress={() => setIsSendConfirmationOpen(true)}
                onViewDetailsPress={() => onViewDetailsPress(item)}
              />
            ))
          )}
        </ScrollView>

        {/* Conditional FAB Action Overlay */}
        {activeTab === "custom" && (
          <TouchableOpacity
            style={styles.fab}
            onPress={() => setIsCreateModalOpen(true)}
          >
            <Text style={styles.fabText}>+ New SMS</Text>
          </TouchableOpacity>
        )}

        <CreateCustomMessageModal
          isVisible={isCreateModalOpen}
          buildingName={buildingName}
          onClose={() => setIsCreateModalOpen(false)}
          onSendMessage={() => setIsCreateModalOpen(false)}
        />

        <SendSmsConfirmationModal
          isVisible={isSendConfirmationOpen}
          onCancel={() => setIsSendConfirmationOpen(false)}
          onSend={() => {
            console.log("SMS submission workflow authorized.");
            setIsSendConfirmationOpen(false);
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outerContainer: { flex: 1, backgroundColor: "#121820" },
  responsiveWrapper: {
    flex: 1,
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
    backgroundColor: "#161c24",
    position: "relative",
    ...Platform.select({ web: { boxShadow: "0px 0px 20px rgba(0,0,0,0.3)" } }),
  },
  appBar: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#1c2431",
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 16,
  },
  rightHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  iconButton: { padding: 4 },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#23783c",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#ffffff", fontWeight: "bold", fontSize: 14 },
  tokenCard: {
    backgroundColor: "#1c2431",
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#252f41",
  },
  tokenLabel: { color: "#ffffff", fontSize: 14, fontWeight: "500" },
  tokenValue: {
    color: "#4fa3f7",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 4,
  },
  purchaseBtn: {
    backgroundColor: "#b499ff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 24,
  },
  purchaseBtnText: { color: "#121820", fontSize: 13, fontWeight: "600" },
  tabsContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#343e50",
    borderRadius: 24,
    marginHorizontal: 16,
    marginTop: 20,
    height: 44,
    backgroundColor: "#161c24",
    overflow: "hidden",
  },
  tab: { flex: 1, alignItems: "center", justifyContent: "center" },
  activeTab: { backgroundColor: "#2a3547" },
  tabText: { color: "#ffffff", fontSize: 14, fontWeight: "500" },
  radioBar: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
  },
  radioGroup: { flex: 1, flexDirection: "row", alignItems: "center" },
  radioItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 4,
  },
  radioLabel: { color: "#cbd5e1", fontSize: 14 },
  emptyView: { paddingVertical: 60, alignItems: "center" },
  emptyText: { color: "#8a94a6", fontSize: 14.5 },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 20,
    backgroundColor: "#025070",
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 16,
    zIndex: 99,
  },
  fabText: { color: "#ffffff", fontSize: 15, fontWeight: "600" },
});
