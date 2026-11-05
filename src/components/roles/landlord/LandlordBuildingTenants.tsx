import { Ionicons } from "@expo/vector-icons";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface BuildingTenantsScreenProps {
  buildingName: string;
  onBackPress: () => void;
}

export function LandlordBuildingTenants({
  buildingName,
  onBackPress,
}: BuildingTenantsScreenProps) {
  return (
    <SafeAreaView style={styles.outerContainer}>
      {/* Responsive Core Layout Container (Max 600px on Web) */}
      <View style={styles.responsiveWrapper}>
        {/* Top App Bar with back navigation callback */}
        <View style={styles.appBar}>
          <View style={styles.leftHeader}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onBackPress}
              accessible={true}
              accessibilityLabel="Go back"
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{buildingName} Tenants</Text>
          </View>
          <View style={styles.rightHeader}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={24} color="#fff" />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileAvatar}>
              <Text style={styles.avatarText}>L</Text>
              <View style={styles.onlineDot} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Input Container Matrix */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#8a94a6"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search tenants names..."
            placeholderTextColor="#8a94a6"
            style={styles.searchInput}
          />
        </View>

        {/* Core Empty State Component Content */}
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>
            No tenants found for the provided building.
          </Text>
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
    position: "relative",
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
  notificationDot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ff4d4f",
  },
  profileAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#23783c",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
    position: "relative",
    ...Platform.select({
      web: { cursor: "pointer" },
    }),
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e2736",
    borderRadius: 24,
    marginHorizontal: 16,
    marginTop: 16,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: "#ffffff",
    fontSize: 15,
    ...Platform.select({
      web: { outlineStyle: "none" } as any,
    }),
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 32,
  },
  emptyStateText: {
    color: "#ffffff",
    fontSize: 15,
    textAlign: "center",
    fontWeight: "500",
    lineHeight: 22,
  },
});
