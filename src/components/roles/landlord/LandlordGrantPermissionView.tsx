// components/roles/landlord/LandlordGrantPermissionView.tsx
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserRole } from "../../../app/_layout";

interface LandlordGrantPermissionViewProps {
  onBackPress?: () => void;
  onSubmitPermission?: (email: string, role: string) => void;
}

const ALL_ROLES = [
  "Property Manager",
  "Property Admin",
  "Admin Read Only View",
  "Manager Read Only View",
];

export function LandlordGrantPermissionView({
  onBackPress,
  onSubmitPermission,
}: LandlordGrantPermissionViewProps) {
  const { setIsDrawerOpen } = useUserRole();
  const [email, setEmail] = useState("");

  // Manage the dropdown visibility and target active selection natively
  const [isDropdownExpanded, setIsDropdownExpanded] = useState(false); // Starts closed by default
  const [selectedRole, setSelectedRole] = useState("Property Manager");

  // 💡 FILTER LOGIC: Dynamically remove the active default role selection from the dropdown feed
  const dropdownMenuOptions = ALL_ROLES.filter((role) => role !== selectedRole);

  const handleSubmit = () => {
    if (!email.trim()) return;
    if (onSubmitPermission) {
      onSubmitPermission(email, selectedRole);
    } else {
      console.log(
        `Granting permissions natively -> Email: ${email}, Assigned Role: ${selectedRole}`,
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ================= 1. UPPER APPBAR ROW NAVIGATION ================= */}
      <View style={styles.appBar}>
        <View style={styles.appBarLeft}>
          <TouchableOpacity
            onPress={() => setIsDrawerOpen(true)}
            style={styles.appBarButton}
          >
            <Ionicons name="menu" size={28} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.appBarTitle}>GRANT PERMISSION</Text>
        </View>
        <View style={styles.appBarRight}>
          <TouchableOpacity style={styles.appBarIconButton}>
            <Ionicons name="notifications" size={24} color="#9EA5B1" />
          </TouchableOpacity>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>L</Text>
          </View>
        </View>
      </View>

      {/* ================= 2. CORE FORM CARD CONTENT PANEL ================= */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formCard}>
          {/* Building Informational Read-Only Container Frame */}
          <View style={styles.buildingDisplayBox}>
            <Text style={styles.floatingInputLabel}>Building</Text>
            <View style={styles.buildingInnerRow}>
              <Ionicons
                name="home"
                size={22}
                color="#85C1E9"
                style={styles.fieldIcon}
              />
              <Text style={styles.buildingValueText}>Test 1</Text>
            </View>
          </View>

          {/* Grantee Email Text Input Field Wrapper Box */}
          <View style={styles.inputContainer}>
            <View style={styles.inputBorderRow}>
              <Ionicons
                name="mail"
                size={22}
                color="#85C1E9"
                style={styles.fieldIcon}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Grantee email"
                placeholderTextColor="#6C7A8C"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                {...Platform.select({ web: { outlineStyle: "none" } })}
              />
            </View>
          </View>

          {/* 🔥 SELECT ROLE ACCORDION SELECTION PANEL */}
          <View style={styles.inputContainer}>
            <Text style={styles.floatingInputLabel}>Select Role</Text>

            {/* Main Trigger Tab bar Row */}
            <TouchableOpacity
              style={[
                styles.dropdownTrigger,
                isDropdownExpanded && styles.dropdownTriggerActive,
              ]}
              activeOpacity={0.85}
              onPress={() => setIsDropdownExpanded(!isDropdownExpanded)}
            >
              <Text style={styles.dropdownValueText}>{selectedRole}</Text>
              <Ionicons
                name={isDropdownExpanded ? "chevron-up" : "chevron-down"}
                size={16}
                color="#FFF"
              />
            </TouchableOpacity>

            {/* Inset Collapsible Dropdown Roles Stream List Menu */}
            {isDropdownExpanded && (
              <View style={styles.dropdownMenuBlock}>
                {dropdownMenuOptions.map((role, index) => {
                  return (
                    <TouchableOpacity
                      key={role}
                      style={[
                        styles.menuItemRow,
                        index === dropdownMenuOptions.length - 1 &&
                          styles.lastMenuItemRow,
                      ]}
                      activeOpacity={0.7}
                      onPress={() => {
                        setSelectedRole(role);
                        setIsDropdownExpanded(false); // Close dropdown upon item selection
                      }}
                    >
                      <Text style={styles.menuItemText}>{role}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>

          {/* Submission Execution Process Button Accent (Only show if dropdown menu snaps shut) */}
          {!isDropdownExpanded && (
            <TouchableOpacity
              style={[
                styles.submitPillButton,
                !email.trim() && styles.disabledButton,
              ]}
              onPress={handleSubmit}
              disabled={!email.trim()}
              activeOpacity={0.8}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161D26",
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%",
    alignSelf: "center",
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#161D26",
    borderBottomWidth: 1,
    borderBottomColor: "#242F42",
  },
  appBarLeft: { flexDirection: "row", alignItems: "center", gap: 16 },
  appBarButton: { padding: 2 },
  appBarTitle: {
    color: "#E5E9F0",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  appBarRight: { flexDirection: "row", alignItems: "center", gap: 16 },
  appBarIconButton: { padding: 4 },
  avatarCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#85C1E9",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#121824", fontSize: 15, fontWeight: "700" },
  scrollContent: { padding: 16, paddingTop: 40 },
  formCard: {
    backgroundColor: "#1A222A",
    borderRadius: 12,
    padding: 20,
    gap: 24,
    borderWidth: 1,
    borderColor: "#242F42",
  },
  inputContainer: { position: "relative", width: "100%" },
  floatingInputLabel: {
    position: "absolute",
    left: 12,
    top: -9,
    backgroundColor: "#1A222A",
    paddingHorizontal: 6,
    fontSize: 12,
    color: "#9EA5B1",
    zIndex: 10,
  },
  buildingDisplayBox: {
    position: "relative",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    borderWidth: 1,
    borderColor: "#2C3545",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  buildingInnerRow: { flexDirection: "row", alignItems: "center" },
  fieldIcon: { marginRight: 14 },
  buildingValueText: { color: "#FFF", fontSize: 18, fontWeight: "600" },
  inputBorderRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2C3545",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  textInput: { flex: 1, color: "#FFF", fontSize: 16, fontWeight: "500" },
  dropdownTrigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#2C3545",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "transparent",
  },
  dropdownTriggerActive: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
  },
  dropdownValueText: { color: "#85C1E9", fontSize: 16, fontWeight: "500" },
  dropdownMenuBlock: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#2C3545",
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  menuItemRow: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(44, 53, 69, 0.4)",
  },
  lastMenuItemRow: { borderBottomWidth: 0 },
  menuItemText: { color: "#FFF", fontSize: 16, fontWeight: "400" },
  submitPillButton: {
    backgroundColor: "#73C2FB",
    width: "60%",
    alignSelf: "center",
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    ...Platform.select({ web: { cursor: "pointer", userSelect: "none" } }),
  },
  disabledButton: { opacity: 0.5 },
  submitButtonText: { color: "#121824", fontSize: 16, fontWeight: "700" },
});
