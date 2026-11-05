import SendSmsConfirmationModal from "@/components/ui/landlord/extra/bulk-sms/SendSmsConfirmationModal";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SmsDetailsScreenProps {
  onBackPress: () => void;
  smsDetailData?: {
    title: string;
    bodyText: string;
    isEnabled: boolean;
  };
}

type ActiveSegmentTab = "actions" | "history";

export function LandlordSmsDetails({
  onBackPress,
  smsDetailData = {
    title: "Rent due reminder",
    bodyText:
      "Dear Tenant, this is a friendly reminder that your monthly rent is due on [DUE DATE]. To avoid any penalties or late fees, kindly ensure the payment is completed by the due date. You may conveniently make your payment through the mobile app.",
    isEnabled: false,
  },
}: SmsDetailsScreenProps) {
  const [activeSegment, setActiveSegment] =
    useState<ActiveSegmentTab>("actions"); // 💡 Setting default view to 'history' to display your target view state
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(
    smsDetailData.isEnabled,
  );
  const [isBodyTextCollapsed, setIsBodyTextCollapsed] = useState(false);
  const [isSendConfirmationOpen, setIsSendConfirmationOpen] = useState(false);

  return (
    <SafeAreaView style={styles.outerContainer}>
      <View style={styles.responsiveWrapper}>
        {/* Top App Header Navigation Bar */}
        <View style={styles.appBar}>
          <View style={styles.leftHeader}>
            <TouchableOpacity style={styles.iconButton} onPress={onBackPress}>
              <Ionicons name="menu" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>SMS details</Text>
          </View>
          <View style={styles.rightHeader}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.profileAvatar}>
              <Text style={styles.avatarText}>L</Text>
              <View style={styles.onlineDot} />
            </View>
          </View>
        </View>

        {/* Scrollable Dashboard Body Layout Container */}
        <ScrollView
          style={styles.scrollViewBody}
          contentContainerStyle={styles.scrollContentLayout}
          showsVerticalScrollIndicator={Platform.OS === "web"}
        >
          {/* 1. Performance Matrix Layout Elements Grid Component */}
          <View style={styles.metricsGridContainer}>
            <View style={styles.metricCardBox}>
              <MaterialCommunityIcons
                name="trending-up"
                size={20}
                color="#00a878"
                style={styles.metricIconSpacer}
              />
              <Text style={styles.metricBigNumberText}>0%</Text>
              <Text style={styles.metricSublabelText}>Success rate</Text>
            </View>
            <View style={styles.metricCardBox}>
              <MaterialCommunityIcons
                name="account-group"
                size={20}
                color="#7c4dff"
                style={styles.metricIconSpacer}
              />
              <Text style={styles.metricBigNumberText}>0</Text>
              <Text style={styles.metricSublabelText}>Sms Sent</Text>
            </View>
            <View style={styles.metricCardBox}>
              <MaterialCommunityIcons
                name="gold"
                size={20}
                color="#ffb900"
                style={styles.metricIconSpacer}
              />
              <Text style={styles.metricBigNumberText}>0</Text>
              <Text style={styles.metricSublabelText}>Token used</Text>
            </View>
          </View>

          {/* 2. Segmented Navigation Tab Selection Controls Bar Row */}
          <View style={styles.segmentedToggleBarContainer}>
            <TouchableOpacity
              style={[
                styles.segmentTabItem,
                activeSegment === "actions" && styles.segmentTabItemActive,
              ]}
              onPress={() => setActiveSegment("actions")}
            >
              <MaterialCommunityIcons
                name="card-text-outline"
                size={18}
                color={activeSegment === "actions" ? "#ffffff" : "#8a94a6"}
                style={{ marginRight: 8 }}
              />
              <Text
                style={[
                  styles.segmentTabText,
                  activeSegment === "actions" && styles.segmentTabTextActive,
                ]}
              >
                Actions
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.segmentTabItem,
                activeSegment === "history" && styles.segmentTabItemActive,
              ]}
              onPress={() => setActiveSegment("history")}
            >
              <MaterialCommunityIcons
                name="history"
                size={18}
                color={activeSegment === "history" ? "#ffffff" : "#8a94a6"}
                style={{ marginRight: 8 }}
              />
              <Text
                style={[
                  styles.segmentTabText,
                  activeSegment === "history" && styles.segmentTabTextActive,
                ]}
              >
                Send history
              </Text>
            </TouchableOpacity>
          </View>

          {/* 3. DYNAMIC BOTTOM VIEW PANELS CONTROLLER */}
          {activeSegment === "actions" ? (
            <View style={{ width: "100%" }}>
              {/* Actions Inline Component Panel */}
              <View style={styles.inlineActionsPanelContainer}>
                <TouchableOpacity style={styles.actionGridColumnButton}>
                  <MaterialCommunityIcons
                    name="calendar-clock"
                    size={24}
                    color="#4fa3f7"
                  />
                  <Text style={styles.actionColumnButtonLabelText}>
                    Re-schedule
                  </Text>
                </TouchableOpacity>

                <View style={styles.actionGridColumnButton}>
                  <Switch
                    value={isNotificationEnabled}
                    onValueChange={setIsNotificationEnabled}
                    trackColor={{ false: "#2d384a", true: "#00a878" }}
                    thumbColor="#ffffff"
                    style={styles.switchButtonScale}
                  />
                  <Text style={styles.actionColumnButtonLabelText}>
                    {isNotificationEnabled ? "Enabled" : "Disabled"}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.actionGridColumnButton}
                  onPress={() => setIsSendConfirmationOpen(true)} // Opens the Send SMS verification dialog modal
                >
                  <Ionicons name="send" size={20} color="#4fa3f7" />
                  <Text style={styles.actionColumnButtonLabelText}>Send</Text>
                </TouchableOpacity>
              </View>

              {/* SMS Content Body block */}
              <Text style={styles.sectionHeaderLabelText}>SMS body</Text>
              <View style={styles.smsBodyContainerCard}>
                <View style={styles.smsHeaderInlineRow}>
                  <Text style={styles.smsMainTitleHeaderValueText}>
                    {smsDetailData.title}
                  </Text>
                  <Ionicons
                    name="information-circle-outline"
                    size={16}
                    color="#4fa3f7"
                    style={{ marginLeft: 6 }}
                  />
                </View>
                <Text style={styles.smsMainContentParagraphBodyText}>
                  {isBodyTextCollapsed
                    ? `${smsDetailData.bodyText.substring(0, 75)}...`
                    : smsDetailData.bodyText}
                </Text>
                <TouchableOpacity
                  style={styles.viewLessToggleLinkWrapperButton}
                  onPress={() => setIsBodyTextCollapsed(!isBodyTextCollapsed)}
                >
                  <Text style={styles.viewLessToggleLinkText}>
                    {isBodyTextCollapsed ? "View More" : "View Less"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            /* 💡 FIXED: Real-world match container implementation logic for History tab segment active */
            <View style={styles.historyEmptyStateWrapper}>
              <Text style={styles.historyEmptyStateText}>
                No history found for the provided SMS
              </Text>
            </View>
          )}
        </ScrollView>

        {/* 💡 Reusable Custom Modal confirmation popover layer layout block */}
        <SendSmsConfirmationModal
          isVisible={isSendConfirmationOpen}
          onCancel={() => setIsSendConfirmationOpen(false)}
          onSend={() => {
            console.log("SMS submission workflow pipeline authorized.");
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
    ...Platform.select({ web: { boxShadow: "0px 0px 20px rgba(0,0,0,0.3)" } }),
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
  scrollViewBody: { flex: 1 },
  scrollContentLayout: { paddingHorizontal: 16, paddingBottom: 40 },
  metricsGridContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
    marginBottom: 20,
  },
  metricCardBox: {
    flex: 1,
    backgroundColor: "#1c2431",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#252f41",
  },
  metricIconSpacer: { marginBottom: 8 },
  metricBigNumberText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  metricSublabelText: {
    color: "#8a94a6",
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
  segmentedToggleBarContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#343e50",
    borderRadius: 24,
    height: 48,
    overflow: "hidden",
    backgroundColor: "#161c24",
    marginBottom: 20,
  },
  segmentTabItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    ...Platform.select({ web: { cursor: "pointer" } }),
  },
  segmentTabItemActive: {
    backgroundColor: "#2a3547",
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: "#343e50",
  },
  segmentTabText: { color: "#8a94a6", fontSize: 14, fontWeight: "500" },
  segmentTabTextActive: { color: "#ffffff", fontWeight: "600" },
  inlineActionsPanelContainer: {
    flexDirection: "row",
    backgroundColor: "#1c2431",
    borderRadius: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#252f41",
    marginBottom: 24,
    justifyContent: "space-around",
    alignItems: "center",
  },
  actionGridColumnButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    ...Platform.select({ web: { cursor: "pointer" } }),
  },
  switchButtonScale: { transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] },
  actionColumnButtonLabelText: {
    color: "#8a94a6",
    fontSize: 12.5,
    fontWeight: "500",
  },
  sectionHeaderLabelText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 14,
    letterSpacing: 0.2,
  },
  smsBodyContainerCard: {
    backgroundColor: "#1c2431",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#252f41",
  },
  smsHeaderInlineRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  smsMainTitleHeaderValueText: {
    color: "#ffffff",
    fontSize: 19,
    fontWeight: "600",
  },
  smsMainContentParagraphBodyText: {
    color: "#cbd5e1",
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "400",
    marginBottom: 12,
  },
  viewLessToggleLinkWrapperButton: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    ...Platform.select({ web: { cursor: "pointer" } }),
  },
  viewLessToggleLinkText: { color: "#4fa3f7", fontSize: 15, fontWeight: "600" },
  /* 💡 High fidelity Empty State Send History layout section styles */
  historyEmptyStateWrapper: {
    flex: 1,
    paddingVertical: 48,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  historyEmptyStateText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
    letterSpacing: 0.1,
    opacity: 0.9,
  },
});
