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

interface TenantRecipient {
  id: string;
  name: string;
  phone: string;
  unit: string;
}

interface SearchTenantScreenProps {
  onBackPress: () => void;
  onSelectDone: (selectedCount: number, selectedTenantIds: string[]) => void;
  initialSelectedIds?: string[];
}

const MOCK_TENANTS: TenantRecipient[] = [
  { id: "t1", name: "Alex Kiprop", phone: "+254712345678", unit: "Unit A4" },
  {
    id: "t2",
    name: "Mercy Chepkorir",
    phone: "+254722345678",
    unit: "Unit B1",
  },
  { id: "t3", name: "David Ochieng", phone: "+254733345678", unit: "Unit C2" },
  { id: "t4", name: "Jane Wanjiku", phone: "+254744345678", unit: "Unit A2" },
  {
    id: "t5",
    name: "Emmanuel Mwangi",
    phone: "+254755345678",
    unit: "Unit B3",
  },
];

export function LandlordSearchTenantScreen({
  onBackPress,
  onSelectDone,
  initialSelectedIds = [],
}: SearchTenantScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTenantIds, setSelectedTenantIds] =
    useState<string[]>(initialSelectedIds);

  // Toggle checklist selection parameters matrix
  const handleToggleSelect = (id: string) => {
    setSelectedTenantIds((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  const filteredTenants = MOCK_TENANTS.filter(
    (tenant) =>
      tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.unit.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.outerContainer}>
      {/* Responsive Core Layout Container Framework (Max 600px width on Web targets) */}
      <View style={styles.responsiveWrapper}>
        {/* Top Header App Bar */}
        {/* <View style={styles.appBar}>
          <View style={styles.leftHeader}>
            <TouchableOpacity style={styles.iconButton} onPress={onBackPress}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Select Recipients</Text>
          </View>
          <View style={styles.rightHeader}>
            <View style={styles.profileAvatar}>
              <Text style={styles.avatarText}>L</Text>
              <View style={styles.onlineDot} />
            </View>
          </View>
        </View> */}

        {/* Floating Search Row Input Box Field */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#8a94a6"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search tenant by name or unit..."
            placeholderTextColor="#8a94a6"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={18} color="#8a94a6" />
            </TouchableOpacity>
          )}
        </View>

        {/* Scrollable Recipients Checkbox Selector Matrix */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={Platform.OS === "web"}
        >
          <Text style={styles.sectionTitleLabel}>Available Tenants List</Text>

          {filteredTenants.length === 0 ? (
            <View style={styles.emptyView}>
              <Text style={styles.emptyText}>No matching tenants found.</Text>
            </View>
          ) : (
            filteredTenants.map((tenant) => {
              const isChecked = selectedTenantIds.includes(tenant.id);
              return (
                <TouchableOpacity
                  key={tenant.id}
                  style={[
                    styles.tenantItemRow,
                    isChecked && styles.tenantItemRowActive,
                  ]}
                  onPress={() => handleToggleSelect(tenant.id)}
                  activeOpacity={0.8}
                >
                  <View style={styles.leftMetaBlock}>
                    <View style={styles.initialCircleBadge}>
                      <Text style={styles.initialCircleText}>
                        {tenant.name.charAt(0)}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.tenantNameText}>{tenant.name}</Text>
                      <Text style={styles.tenantSubDetailsText}>
                        {tenant.unit} • {tenant.phone}
                      </Text>
                    </View>
                  </View>

                  <Ionicons
                    name={isChecked ? "checkbox" : "square-outline"}
                    size={24}
                    color={isChecked ? "#4fa3f7" : "#343e50"}
                  />
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>

        {/* Persistent Bottom Action Confirmation Bar Segment */}
        <View style={styles.bottomActionBar}>
          <Text style={styles.selectedCountLabelText}>
            Selected Recipients:{" "}
            <Text style={styles.highlightCountText}>
              {selectedTenantIds.length}
            </Text>
          </Text>
          <TouchableOpacity
            style={[
              styles.doneButton,
              selectedTenantIds.length === 0 && styles.doneButtonDisabled,
            ]}
            disabled={selectedTenantIds.length === 0}
            onPress={() =>
              onSelectDone(selectedTenantIds.length, selectedTenantIds)
            }
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
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
      web: { boxShadow: "0px 0px 20px rgba(0,0,0,0.3)" },
    }),
  },
  appBar: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#1c2431",
  },
  leftHeader: { flexDirection: "row", alignItems: "center" },
  rightHeader: { marginLeft: "auto" },
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

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e2736",
    borderRadius: 24,
    marginHorizontal: 16,
    marginTop: 16,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 8,
  },
  searchIcon: { marginRight: 12 },
  searchInput: {
    flex: 1,
    color: "#ffffff",
    fontSize: 15,
    ...Platform.select({ web: { outlineStyle: "none" } as any }),
  },

  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 24 },
  sectionTitleLabel: {
    color: "#8a94a6",
    fontSize: 13,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: 16,
    marginBottom: 12,
  },

  tenantItemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1c2431",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#252f41",
    ...Platform.select({ web: { cursor: "pointer" } }),
  },
  tenantItemRowActive: {
    borderColor: "#4fa3f7",
    backgroundColor: "#20293d",
  },
  leftMetaBlock: { flexDirection: "row", alignItems: "center", flex: 1 },
  initialCircleBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#2d384a",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  initialCircleText: { color: "#4fa3f7", fontWeight: "700", fontSize: 15 },
  tenantNameText: { color: "#ffffff", fontSize: 15, fontWeight: "600" },
  tenantSubDetailsText: { color: "#8a94a6", fontSize: 12.5, marginTop: 2 },

  emptyView: { padding: 40, alignItems: "center" },
  emptyText: { color: "#8a94a6", fontSize: 14.5 },

  bottomActionBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1c2431",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#252f41",
  },
  selectedCountLabelText: { color: "#ffffff", fontSize: 15, fontWeight: "500" },
  highlightCountText: { color: "#4fa3f7", fontWeight: "700" },
  doneButton: {
    backgroundColor: "#86d3ff",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    ...Platform.select({ web: { cursor: "pointer" } }),
  },
  doneButtonDisabled: { opacity: 0.4 },
  doneButtonText: { color: "#161c24", fontSize: 15, fontWeight: "700" },
});
