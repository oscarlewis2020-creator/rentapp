import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface StatementVerificationScreenProps {
  buildingName: string;
  onBackPress: () => void;
  onUploadStatementPress?: () => void;
}

export function LandlordStatementVerification({
  buildingName,
  onBackPress,
  onUploadStatementPress = () =>
    console.log("Launch statement document file picker stream..."),
}: StatementVerificationScreenProps) {
  return (
    <SafeAreaView style={styles.outerContainer}>
      {/* Responsive Layout Framework Container (Max 600px on Web viewports) */}
      <View style={styles.responsiveWrapper}>
        {/* Top App Header Navigation Bar */}
        <View style={styles.appBar}>
          <View style={styles.leftHeader}>
            <TouchableOpacity style={styles.iconButton} onPress={onBackPress}>
              <Ionicons name="menu" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Statement verification</Text>
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

        {/* High-Fidelity Main Centered Empty State Container */}
        <View style={styles.emptyStateContainer}>
          <View style={styles.illustrationWrapper}>
            {/* Custom line list search design vector icon match */}
            <View style={styles.lineVectorShort} />
            <View style={styles.lineVectorLong} />
            <View style={styles.lineVectorMedium} />
            <Ionicons
              name="search"
              size={32}
              color="#4fa3f7"
              style={styles.searchOverlayIcon}
            />
          </View>

          <Text style={styles.emptyTitleText}>No Statement Verifications</Text>
          <Text style={styles.emptyTitleText}>Found</Text>

          <Text style={styles.emptySubtext}>
            Upload a bank statement to start verification process
          </Text>
        </View>

        {/* Bottom Right Floating Action Button (FAB) Area */}
        <TouchableOpacity
          style={styles.floatingActionButton}
          onPress={onUploadStatementPress}
          activeOpacity={0.85}
        >
          <MaterialCommunityIcons
            name="upload"
            size={22}
            color="#ffffff"
            style={styles.fabIconStyle}
          />
          <Text style={styles.fabButtonText}>Statement</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#121820", // Main background matching deep canvas palette
  },
  responsiveWrapper: {
    flex: 1,
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
    backgroundColor: "#161c24", // Card body dark background tone mix
    position: "relative", // Absolutely anchors floating action components safely
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
    padding: 6,
    ...Platform.select({
      web: { cursor: "pointer" },
    }),
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
  /* Empty State Graphic Composition Design Styles */
  emptyStateContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingBottom: 80, // Generates layout space clear of the bottom right floating buttons
  },
  illustrationWrapper: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    position: "relative",
  },
  lineVectorShort: {
    width: 24,
    height: 3,
    backgroundColor: "#8a94a6",
    borderRadius: 2,
    alignSelf: "flex-start",
    marginBottom: 5,
    marginLeft: 14,
  },
  lineVectorLong: {
    width: 38,
    height: 3,
    backgroundColor: "#8a94a6",
    borderRadius: 2,
    alignSelf: "flex-start",
    marginBottom: 5,
    marginLeft: 14,
  },
  lineVectorMedium: {
    width: 28,
    height: 3,
    backgroundColor: "#8a94a6",
    borderRadius: 2,
    alignSelf: "flex-start",
    marginLeft: 14,
  },
  searchOverlayIcon: {
    position: "absolute",
    right: 12,
    bottom: 12,
    transform: [{ rotate: "0deg" }],
  },
  emptyTitleText: {
    color: "#ffffff",
    fontSize: 19,
    fontWeight: "700",
    lineHeight: 26,
    textAlign: "center",
  },
  emptySubtext: {
    color: "#8a94a6",
    fontSize: 14.5,
    lineHeight: 22,
    textAlign: "center",
    marginTop: 12,
    maxWidth: 280,
  },
  /* Floating Action Button (FAB) Section Styles Setup */
  floatingActionButton: {
    position: "absolute",
    bottom: 24,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#035375", // Beautiful deep teal blue accent hue from screenshot
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 16,
    boxShadow: "0px 4px 12px rgba(0,0,0,0.4)",
    ...Platform.select({
      web: { cursor: "pointer" },
    }),
  },
  fabIconStyle: {
    marginRight: 8,
  },
  fabButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
});
