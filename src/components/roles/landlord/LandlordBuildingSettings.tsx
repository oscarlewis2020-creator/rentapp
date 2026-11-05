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
import { LeaseTermsTemplateModal } from "../../../components/ui/landlord/extra/building-details/LeaseTermsTemplateModal";
import BuildingCurrencyModal from "../../../components/ui/landlord/extra/building-settings/BuildingCurrencyModal";
import ConfirmLateFeeModal from "../../../components/ui/landlord/extra/building-settings/ConfirmLateFeeModal";
import EditImagesModal from "../../../components/ui/landlord/extra/building-settings/EditImagesModal";
import HideBuildingModal from "../../../components/ui/landlord/extra/building-settings/HideBuildingModal";
import LandlordContactsModal from "../../../components/ui/landlord/extra/building-settings/LandlordContactsModal";
import LatePaymentFeeConfigModal from "../../../components/ui/landlord/extra/building-settings/LatePaymentFeeConfigModal";

interface BuildingSettingsScreenProps {
  buildingName: string;
  onBackPress: () => void;
}

type BillingCycleOption = "Monthly" | "Daily" | "Semester";

export function LandlordBuildingSettings({
  buildingName,
  onBackPress,
}: BuildingSettingsScreenProps) {
  const [allowManualPayments, setAllowManualPayments] = useState(true);
  const [isBuildingHidden, setIsBuildingHidden] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [requirePhotoId, setRequirePhotoId] = useState(false);
  const [prorateFirstMonth, setProrateFirstMonth] = useState(false);
  const [prorateFinalMonth, setProrateFinalMonth] = useState(false);
  const [isLeaseTermsModalVisible, setIsLeaseTermsModalVisible] =
    useState(false);
  const [billingCycle, setBillingCycle] =
    useState<BillingCycleOption>("Monthly");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCurrencyModalVisible, setIsCurrencyModalVisible] = useState(false);
  const [selectedBuildingCurrency, setSelectedBuildingCurrency] =
    useState("KES, Kenya");

  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [isImagesOpen, setIsImagesOpen] = useState(false);
  const [isConfirmLateFeeOpen, setIsConfirmLateFeeOpen] = useState(false);
  const [isLateFeeConfigOpen, setIsLateFeeConfigOpen] = useState(false);

  // Data states to hold updated fields
  const [contactsSummary, setContactsSummary] = useState("");
  const [lateFeeLabel, setLateFeeLabel] = useState("(Not set)");

  const handleVisibilityTogglePress = () => {
    if (!isBuildingHidden) {
      setIsModalVisible(true);
    } else {
      setIsBuildingHidden(false);
    }
  };

  const handleSelectBillingCycle = (value: BillingCycleOption) => {
    setBillingCycle(value);
    setIsDropdownOpen(false); // Auto-close drop panel following selection matrix mapping
  };

  return (
    <SafeAreaView style={styles.outerContainer}>
      <View style={styles.responsiveWrapper}>
        <View style={styles.appBar}>
          <View style={styles.leftHeader}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onBackPress}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{buildingName} Settings</Text>
          </View>

          <View style={styles.rightHeader}>
            <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
              <Ionicons name="notifications-outline" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.profileAvatar}>
              <Text style={styles.avatarText}>L</Text>
              <View style={styles.onlineDot} />
            </View>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={Platform.OS === "web"}
        >
          <Text style={styles.sectionHeaderTitle}>Building settings</Text>

          <View style={styles.outlinedFormCard}>
            <Text style={styles.fieldsetFloatingLabel}>
              Change building owner
            </Text>
            <View style={styles.dropdownInnerContent}>
              <Text style={styles.dropdownTextValue}>
                oscarlewis2020@gmail.com
              </Text>
              <Ionicons name="caret-down" size={16} color="#8a94a6" />
            </View>
          </View>

          <TouchableOpacity style={styles.settingActionRow} activeOpacity={0.7}>
            <View style={styles.iconWrapperCircle}>
              <Ionicons name="alert-circle" size={22} color="#ff6b6b" />
            </View>
            <View style={styles.settingTextContentBody}>
              <Text style={styles.settingMainLabelText}>Verify Building</Text>
              <Text style={styles.settingSubtextDesc}>
                Verification ensures authenticity, safety, compliance, and
                prevents fraud.
              </Text>
            </View>
            <View style={styles.blueSquareBadgeChevron}>
              <Ionicons name="chevron-forward" size={16} color="#161c24" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingActionRow}
            activeOpacity={0.7}
            onPress={() => setIsCurrencyModalVisible(true)}
          >
            <View style={styles.iconWrapperCircle}>
              <Ionicons name="cash-outline" size={20} color="#4fa3f7" />
            </View>
            <View style={styles.settingTextContentBody}>
              <Text style={styles.settingMainLabelText}>Building currency</Text>
              <Text style={styles.settingSubtextDesc}>
                {selectedBuildingCurrency}
              </Text>
            </View>
            <View style={styles.blueSquareBadgeChevron}>
              <Ionicons name="chevron-forward" size={16} color="#161c24" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingActionRow}
            activeOpacity={0.7}
            onPress={() => setIsContactsOpen(true)}
          >
            <View style={styles.iconWrapperCircle}>
              <Ionicons
                name="person-circle-outline"
                size={22}
                color="#4fa3f7"
              />
            </View>
            <View style={styles.settingTextContentBody}>
              <Text style={styles.settingMainLabelText}>
                Add landlord contacts
              </Text>
              {contactsSummary ? (
                <Text style={styles.settingSubtextDesc}>{contactsSummary}</Text>
              ) : null}
            </View>
            <View style={styles.blueSquareBadgeChevron}>
              <Ionicons name="chevron-forward" size={16} color="#161c24" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingActionRow}
            activeOpacity={0.7}
            onPress={() => setIsImagesOpen(true)}
          >
            <View style={styles.iconWrapperCircle}>
              <Ionicons name="images-outline" size={20} color="#4fa3f7" />
            </View>
            <View style={styles.settingTextContentBody}>
              <Text style={styles.settingMainLabelText}>
                Update building images
              </Text>
            </View>
            <View style={styles.blueSquareBadgeChevron}>
              <Ionicons name="chevron-forward" size={16} color="#161c24" />
            </View>
          </TouchableOpacity>

          <View style={styles.settingActionRow}>
            <View style={styles.iconWrapperCircle}>
              <MaterialCommunityIcons
                name="numeric-10-box-outline"
                size={22}
                color="#4fa3f7"
              />
            </View>
            <View style={styles.settingTextContentBody}>
              <Text style={styles.settingMainLabelText}>
                Allow manual payments
              </Text>
              <Text style={styles.settingSubtextDesc}>
                Enabling this will allow payments to be made by uploading a
                receipt image or M-PESA screenshots.
              </Text>
            </View>
            <Switch
              value={allowManualPayments}
              onValueChange={setAllowManualPayments}
              trackColor={{ false: "#252f41", true: "#00a878" }}
              thumbColor="#ffffff"
            />
          </View>

          <TouchableOpacity
            style={[
              styles.settingActionRow,
              {
                borderBottomWidth: 1,
                borderBottomColor: "#252f41",
                paddingBottom: 20,
              },
            ]}
            onPress={handleVisibilityTogglePress}
            activeOpacity={0.7}
          >
            <View style={styles.iconWrapperCircle}>
              <Ionicons
                name={isBuildingHidden ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#4fa3f7"
              />
            </View>
            <View style={styles.settingTextContentBody}>
              <Text style={styles.settingMainLabelText}>
                {isBuildingHidden
                  ? "Show building to public"
                  : "Hide building from public"}
              </Text>
              <Text style={styles.settingSubtextDesc}>
                {isBuildingHidden
                  ? "Making this building public will allow tenants to see it when searching for properties. All associated units will also become visible based on their individual visibility settings."
                  : "Hiding this building will remove it from tenant search results. All of its units will also become inaccessible to tenants, regardless of their individual visibility settings."}
              </Text>
            </View>
            {isBuildingHidden ? (
              <View style={styles.blueSquareBadgeChevron}>
                <Ionicons name="chevron-forward" size={16} color="#161c24" />
              </View>
            ) : (
              <Switch
                value={!isBuildingHidden}
                onValueChange={handleVisibilityTogglePress}
                trackColor={{ false: "#252f41", true: "#00a878" }}
                thumbColor="#ffffff"
              />
            )}
          </TouchableOpacity>

          <View style={styles.sectionHeaderInlineContainer}>
            <Text style={styles.sectionHeaderTitle}>
              Lease default settings
            </Text>
            <Ionicons
              name="information-circle-outline"
              size={18}
              color="#8a94a6"
              style={{ marginLeft: 6, marginTop: 18 }}
            />
          </View>

          {/* <View style={styles.outlinedFormCard}>
            <Text style={styles.fieldsetFloatingLabel}>Billing Cycle</Text>
            <View style={styles.dropdownInnerContent}>
              <Text style={styles.dropdownTextValue}>{billingCycle}</Text>
              <Ionicons name="caret-down" size={16} color="#8a94a6" />
            </View>
          </View> */}

          {/* Billing Cycle Card Block Container With Dropdown Support */}
          <View style={styles.dropdownMasterWrapper}>
            <TouchableOpacity
              style={[
                styles.outlinedFormCard,
                isDropdownOpen && styles.outlinedFormCardActive,
              ]}
              onPress={() => setIsDropdownOpen((open) => !open)}
              activeOpacity={0.9}
              accessibilityRole="button"
              accessibilityState={{ expanded: isDropdownOpen }}
            >
              <Text style={styles.fieldsetFloatingLabel}>Billing Cycle</Text>
              <View style={styles.dropdownInnerContent}>
                <Text style={styles.dropdownTextValue}>{billingCycle}</Text>
                <Ionicons
                  name={isDropdownOpen ? "caret-up" : "caret-down"}
                  size={16}
                  color="#8a94a6"
                />
              </View>
            </TouchableOpacity>

            {isDropdownOpen && (
              <View style={styles.expandedDropdownContainer}>
                {(["Monthly", "Daily", "Semester"] as BillingCycleOption[])
                  // Do not repeat the currently selected value in the open menu.
                  .filter((option) => option !== billingCycle)
                  .map((option, index, availableOptions) => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.dropdownItemRow,
                        billingCycle === option && styles.dropdownItemRowActive,
                        index === 2 && styles.dropdownItemRowLast,
                      ]}
                      onPress={() => handleSelectBillingCycle(option)}
                      activeOpacity={0.75}
                    >
                      <Text
                        style={[
                          styles.dropdownItemText,
                          billingCycle === option &&
                            styles.dropdownItemTextActive,
                        ]}
                      >
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </View>
            )}
          </View>

          <View style={styles.settingActionRow}>
            <View style={styles.iconWrapperCircle}>
              <Ionicons name="card-outline" size={20} color="#4fa3f7" />
            </View>
            <View style={styles.settingTextContentBody}>
              <Text style={styles.settingMainLabelText}>Photo ID</Text>
              <Text style={styles.settingSubtextDesc}>
                Make it mandatory for new lease applicants to provide a photo
                ID.
              </Text>
            </View>
            <Switch
              value={requirePhotoId}
              onValueChange={setRequirePhotoId}
              trackColor={{ false: "#252f41", true: "#00a878" }}
              thumbColor="#ffffff"
            />
          </View>

          <TouchableOpacity
            style={styles.settingActionRow}
            activeOpacity={0.7}
            onPress={() => setIsConfirmLateFeeOpen(true)}
          >
            <View style={styles.iconWrapperCircle}>
              <MaterialCommunityIcons
                name="cash-plus"
                size={22}
                color="#4fa3f7"
              />
            </View>
            <View style={styles.settingTextContentBody}>
              <Text style={styles.settingMainLabelText}>
                Late Payment Fee{" "}
                <Text style={{ color: "#8a94a6" }}>(Not set)</Text>
              </Text>
              <Text style={styles.settingSubtextDesc}>
                To set late payment fee, add it using the add button.
              </Text>
            </View>
            <View style={styles.blueCircleAddIconBadge}>
              <Ionicons name="add" size={20} color="#161c24" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingActionRow} activeOpacity={0.7}>
            <View style={styles.iconWrapperCircle}>
              <MaterialCommunityIcons
                name="shield-check-outline"
                size={22}
                color="#4fa3f7"
              />
            </View>
            <View style={styles.settingTextContentBody}>
              <Text style={styles.settingMainLabelText}>
                Security Deposit{" "}
                <Text style={{ color: "#8a94a6" }}>(Not set)</Text>
              </Text>
              <Text style={styles.settingSubtextDesc}>
                To set security deposit, add it using the add button.
              </Text>
            </View>
            <View style={styles.blueCircleAddIconBadge}>
              <Ionicons name="add" size={20} color="#161c24" />
            </View>
          </TouchableOpacity>

          <View style={styles.settingActionRow}>
            <View style={styles.iconWrapperCircle}>
              <Ionicons name="calendar-outline" size={20} color="#4fa3f7" />
            </View>
            <View style={styles.settingTextContentBody}>
              <Text style={styles.settingMainLabelText}>
                Prorate first month
              </Text>
              <Text style={styles.settingSubtextDesc}>
                Calculate the first month's rent based on the tenant's move-in
                date.
              </Text>
            </View>
            <Switch
              value={prorateFirstMonth}
              onValueChange={setProrateFirstMonth}
              trackColor={{ false: "#252f41", true: "#00a878" }}
              thumbColor="#ffffff"
            />
          </View>

          <View style={styles.settingActionRow}>
            <View style={styles.iconWrapperCircle}>
              <Ionicons name="calendar-outline" size={20} color="#4fa3f7" />
            </View>
            <View style={styles.settingTextContentBody}>
              <Text style={styles.settingMainLabelText}>
                Prorate final month
              </Text>
              <Text style={styles.settingSubtextDesc}>
                Calculate the final month's rent based on the tenant's move-out
                date.
              </Text>
            </View>
            <Switch
              value={prorateFinalMonth}
              onValueChange={setProrateFinalMonth}
              trackColor={{ false: "#252f41", true: "#00a878" }}
              thumbColor="#ffffff"
            />
          </View>

          <TouchableOpacity
            style={styles.editTermsButton}
            onPress={() => setIsLeaseTermsModalVisible(true)}
            activeOpacity={0.75}
          >
            <Text style={styles.editTermsButtonText}>
              Edit Lease Agreement Terms
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <HideBuildingModal
          isVisible={isModalVisible}
          buildingName={buildingName}
          onCancel={() => setIsModalVisible(false)}
          onProceed={() => {
            setIsBuildingHidden(true);
            setIsModalVisible(false);
          }}
        />

        <LeaseTermsTemplateModal
          visible={isLeaseTermsModalVisible}
          onClose={() => setIsLeaseTermsModalVisible(false)}
        />

        <BuildingCurrencyModal
          isVisible={isCurrencyModalVisible}
          currentCurrency={selectedBuildingCurrency}
          onCancel={() => setIsCurrencyModalVisible(false)}
          onUpdate={(newCurrency) => {
            setSelectedBuildingCurrency(newCurrency);
            setIsCurrencyModalVisible(false);
          }}
        />

        {/* 💡 3. Overlay Portal Modal Render Blocks Layer */}
        <LandlordContactsModal
          isVisible={isContactsOpen}
          onCancel={() => setIsContactsOpen(false)}
          onSave={(email, phone) => {
            setContactsSummary(`${email} / ${phone}`);
            setIsContactsOpen(false);
          }}
        />

        <EditImagesModal
          isVisible={isImagesOpen}
          onCancel={() => setIsImagesOpen(false)}
          onSave={() => setIsImagesOpen(false)}
        />

        {/* Cascading Dialog Sequence Logic Connection */}
        <ConfirmLateFeeModal
          isVisible={isConfirmLateFeeOpen}
          onCancel={() => setIsConfirmLateFeeOpen(false)}
          onYes={() => {
            setIsConfirmLateFeeOpen(false);
            setTimeout(
              () => setIsLateFeeConfigOpen(true),
              Platform.OS === "ios" ? 400 : 50,
            ); // Safe layout loop lifecycle timing buffer
          }}
        />

        <LatePaymentFeeConfigModal
          isVisible={isLateFeeConfigOpen}
          onClose={() => setIsLateFeeConfigOpen(false)}
          onUpdate={(type, value, days) => {
            setLateFeeLabel(
              type === "Waive" ? "(Waived)" : `(${value}% after ${days} days)`,
            );
            setIsLateFeeConfigOpen(false);
          }}
        />
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
    ...Platform.select({
      web: {
        boxShadow: "0px 0px 20px rgba(0,0,0,0.3)",
      },
    }),
  },
  appBar: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#1c2431",
  },
  leftHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  iconButton: {
    padding: 8,
    ...Platform.select({
      web: { cursor: "pointer" },
    }),
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 12,
  },
  profileAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#23783c",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
    position: "relative",
  },
  avatarText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 14,
  },
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 56,
  },
  sectionHeaderTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 16,
    textAlign: "center",
  },
  sectionHeaderInlineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dropdownMasterWrapper: {
    position: "relative",
    zIndex: 20,
    elevation: 20,
    marginBottom: 16,
  },
  outlinedFormCardActive: {
    borderColor: "#8a94a6",
  },
  expandedDropdownContainer: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    marginTop: -16,
    backgroundColor: "#161c24",
    borderWidth: 1,
    borderColor: "#8a94a6",
    borderRadius: 6,
    zIndex: 30,
    elevation: 30,
    overflow: "hidden",
  },
  dropdownItemRow: {
    minHeight: 48,
    justifyContent: "center",
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#343e50",
    backgroundColor: "#161c24",
  },
  dropdownItemRowActive: {
    backgroundColor: "#1d2731",
  },
  dropdownItemRowLast: {
    borderBottomWidth: 0,
  },
  dropdownItemText: {
    color: "#e5e7eb",
    fontSize: 15,
  },
  dropdownItemTextActive: {
    color: "#78c9f5",
  },
  outlinedFormCard: {
    borderWidth: 1,
    borderColor: "#343e50",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    position: "relative",
    marginTop: 12,
    marginBottom: 16,
    backgroundColor: "#161c24",
  },
  fieldsetFloatingLabel: {
    position: "absolute",
    top: -10,
    left: 12,
    backgroundColor: "#161c24",
    paddingHorizontal: 6,
    color: "#8a94a6",
    fontSize: 12,
  },
  dropdownInnerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownTextValue: {
    color: "#ffffff",
    fontSize: 15,
  },
  settingActionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#232b36",
  },
  iconWrapperCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  settingTextContentBody: {
    flex: 1,
    paddingRight: 8,
  },
  settingMainLabelText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "500",
  },
  settingSubtextDesc: {
    color: "#8a94a6",
    fontSize: 12.5,
    marginTop: 4,
    lineHeight: 18,
  },
  blueSquareBadgeChevron: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: "#4fa3f7",
    alignItems: "center",
    justifyContent: "center",
  },
  blueCircleAddIconBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#4fa3f7",
    alignItems: "center",
    justifyContent: "center",
  },
  editTermsButton: {
    borderWidth: 1,
    borderColor: "#4fa3f7",
    borderRadius: 24,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
    ...Platform.select({
      web: { cursor: "pointer" },
    }),
  },
  editTermsButtonText: {
    color: "#4fa3f7",
    fontSize: 15,
    fontWeight: "500",
  },
});
