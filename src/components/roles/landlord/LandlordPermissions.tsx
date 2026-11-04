import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React, { useState } from "react";
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
import { UnderstandPermissionsModal } from "../../ui/landlord/extra/permissions/UnderstandPermissionsModal";
import { LandlordGrantPermissionView } from "./LandlordGrantPermissionView";

interface AccordionSectionProps {
  title: string;
  icon: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

// Reusable animated section container component block
function AccordionSection({
  title,
  icon,
  isExpanded,
  onToggle,
  children,
}: AccordionSectionProps) {
  return (
    <View style={styles.sectionWrapper}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <View style={styles.sectionHeaderLeft}>
          {icon}
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        <Ionicons
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={18}
          color="#FFF"
        />
      </TouchableOpacity>
      {isExpanded && <View style={styles.sectionContent}>{children}</View>}
    </View>
  );
}

export function LandlordPermissions() {
  const { setIsDrawerOpen } = useUserRole();
  const [permissionSubRoute, setPermissionSubRoute] = useState<
    "list_view" | "grant_form"
  >("list_view");
  const [explainerModalVisible, setExplainerModalVisible] = useState(false);
  // Independent open expansion toggle state trackers
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    admins: true,
    managers: true,
    adminRead: true,
    managerRead: true,
  });

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // 🔥 INTERCEPT ROUTING LAYER: If user clicked the FAB button, show the Grant Form instead
  if (permissionSubRoute === "grant_form") {
    return (
      <LandlordGrantPermissionView
        onBackPress={() => setPermissionSubRoute("list_view")} // Direct back trace
        onSubmitPermission={(email, role) => {
          console.log(
            `Processing validation webhook payload: ${email} - ${role}`,
          );
          setPermissionSubRoute("list_view"); // Returns safely to grid logs feed
        }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* ================= UPPER NAVIGATION APPBAR ROW ================= */}
      <View style={styles.appBar}>
        <View style={styles.appBarLeft}>
          <TouchableOpacity
            onPress={() => setIsDrawerOpen(true)}
            style={styles.backButton}
          >
            <Ionicons name="menu" size={26} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.appBarTitle}>Permissions</Text>
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

      {/* ================= MAIN SCROLL VIEW WINDOW CONTROLLER ================= */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Top Explicit Tracking Hyperlink Anchor */}
        <TouchableOpacity
          style={styles.infoLinkButton}
          activeOpacity={0.7}
          onPress={() => setExplainerModalVisible(true)}
        >
          <Text style={styles.infoLinkText}>
            Understand Building Permissions
          </Text>
        </TouchableOpacity>

        {/* 1. ADMINS ACCORDION SELECTION CARD VIEW SECTION */}
        <AccordionSection
          title="Admins"
          icon={<FontAwesome5 name="user-shield" size={16} color="#85C1E9" />}
          isExpanded={expandedSections.admins}
          onToggle={() => toggleSection("admins")}
        >
          <View style={styles.userCardRow}>
            <View style={styles.cardUserLeft}>
              <MaterialCommunityIcons
                name="account-tie-outline"
                size={24}
                color="#85C1E9"
              />
              <Text style={styles.userEmailText} numberOfLines={1}>
                oscarlewis2020...
              </Text>
            </View>
            <View style={styles.cardActionsRight}>
              <TouchableOpacity style={styles.actionIconButton}>
                <Ionicons name="trash-outline" size={18} color="#6C7A8C" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionIconButton}>
                <MaterialCommunityIcons
                  name="pencil"
                  size={18}
                  color="#6C7A8C"
                />
              </TouchableOpacity>
            </View>
          </View>
        </AccordionSection>

        {/* 2. PROPERTY MANAGERS SELECTION SECTION */}
        <AccordionSection
          title="Property managers"
          icon={
            <MaterialCommunityIcons
              name="account-group-outline"
              size={20}
              color="#85C1E9"
            />
          }
          isExpanded={expandedSections.managers}
          onToggle={() => toggleSection("managers")}
        >
          <Text style={styles.emptySectionFallbackText}>
            No property manager roles for this building
          </Text>
        </AccordionSection>

        {/* 3. ADMIN READ ONLY EXPANSION SECTION */}
        <AccordionSection
          title="Admin Read only view"
          icon={
            <MaterialCommunityIcons
              name="account-eye-outline"
              size={20}
              color="#85C1E9"
            />
          }
          isExpanded={expandedSections.adminRead}
          onToggle={() => toggleSection("adminRead")}
        >
          <Text style={styles.emptySectionFallbackText}>
            No admin read only roles for this building
          </Text>
        </AccordionSection>

        {/* 4. MANAGER READ ONLY EXPANSION SECTION */}
        <AccordionSection
          title="Manager Read only view"
          icon={
            <MaterialCommunityIcons
              name="account-eye-outline"
              size={20}
              color="#85C1E9"
            />
          }
          isExpanded={expandedSections.managerRead}
          onToggle={() => toggleSection("managerRead")}
        >
          <Text style={styles.emptySectionFallbackText}>
            No manager read only roles for this building
          </Text>
        </AccordionSection>
      </ScrollView>

      {/* ================= FLOATING ACTION ACCENT BUTTON (FAB) ================= */}
      <View style={styles.fabOverlayContainer}>
        <TouchableOpacity
          style={styles.floatingActionButton}
          activeOpacity={0.85}
          onPress={() => setPermissionSubRoute("grant_form")}
        >
          <Ionicons name="add" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* 💡 INJECT THE EXPLAINER PORTAL MODAL SHEET OVERLAY LAYER HERE */}
      <UnderstandPermissionsModal
        visible={explainerModalVisible}
        onClose={() => setExplainerModalVisible(false)} // Clears visibility sheet layer on demand
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121824", // Shared premium dark backdrop context matching design image layout
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
    borderBottomColor: "#1C2534",
    backgroundColor: "#121824",
  },
  appBarLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  backButton: {
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
    backgroundColor: "#4CD964", // Green active dot marker choice matching layout aspect
  },
  avatarCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#85C1E9",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  avatarText: {
    color: "#121824",
    fontSize: 15,
    fontWeight: "700",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 120, // Cushion safe pad zone clear of FAB elements bounds layout choices
  },
  infoLinkButton: {
    alignSelf: "flex-end",
    marginBottom: 28,
    paddingHorizontal: 4,
  },
  infoLinkText: {
    color: "#85C1E9", // Light blue underlined link accent match
    fontSize: 16,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  sectionWrapper: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 4,
  },
  sectionHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  sectionTitle: {
    color: "#E5E9F0",
    fontSize: 17,
    fontWeight: "500",
  },
  sectionContent: {
    paddingTop: 8,
    paddingBottom: 4,
    paddingHorizontal: 4,
  },
  userCardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1C2534", // Embedded card frame fill block matching layout image
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "#242F42",
  },
  cardUserLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    flex: 1,
  },
  userEmailText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "400",
    flex: 1,
  },
  cardActionsRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  actionIconButton: {
    padding: 4,
  },
  emptySectionFallbackText: {
    color: "#9EA5B1", // Subtle descriptive grey sub-label text string matching empty categories
    fontSize: 14,
    textAlign: "center",
    paddingVertical: 14,
    fontWeight: "400",
  },
  fabOverlayContainer: {
    position: "absolute",
    bottom: 24,
    right: 16,
    left: 16,
    alignItems: "flex-end",
    pointerEvents: "box-none",
  },
  floatingActionButton: {
    backgroundColor: "#004D61", // Specialized deep teal blue tint backdrop match
    width: 56,
    height: 56,
    borderRadius: 14, // Consistent rounded square geometric card format choice
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
        cursor: "pointer",
        userSelect: "none",
      },
    }),
  },
});
