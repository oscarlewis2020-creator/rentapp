import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function NotificationScreen() {
  return (
    <View style={styles.outerContainer}>
      {/* Scrollable container framing to preserve cross-platform responsiveness */}
      <ScrollView
        style={styles.mainScrollView}
        contentContainerStyle={styles.scrollContentLayout}
        showsVerticalScrollIndicator={Platform.OS === "web"}
      >
        {/* Top Operational Utility Action Controls Row */}
        <View style={styles.actionControlRowBar}>
          {/* Cleaning broom/mop utility action indicator badge icon */}
          <View style={styles.utilityActionCircularBadge}>
            <MaterialCommunityIcons name="broom" size={20} color="#8a94a6" />
          </View>

          {/* Mark all as read dark pill button option */}
          <TouchableOpacity
            style={styles.markAllAsReadButton}
            activeOpacity={0.7}
            onPress={() =>
              console.log(
                "Marking all active system logs notifications packet as read...",
              )
            }
          >
            <Text style={styles.markAllAsReadButtonText}>Mark all as read</Text>
          </TouchableOpacity>
        </View>

        {/* Core Centered Empty State Content Section Area */}
        <View style={styles.emptyStateMainContainer}>
          <Text style={styles.emptyStateMainContentMessageText}>
            No notifications present at the moment.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#161c24", // Deep dark backdrop palette matching image layout canvas
  },
  mainScrollView: {
    flex: 1,
  },
  scrollContentLayout: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  actionControlRowBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
    marginTop: 4,
  },
  utilityActionCircularBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#1c2431", // Dark card fill matching layout theme
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#252f41",
  },
  markAllAsReadButton: {
    backgroundColor: "#1c2431", // Pill button layout fill
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#252f41",
    ...Platform.select({
      web: { cursor: "pointer" },
    }),
  },
  markAllAsReadButtonText: {
    color: "#8a94a6", // Uniform dark grey accent text matching screenshot
    fontSize: 14,
    fontWeight: "500",
  },
  emptyStateMainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingBottom: 100, // Generates optimal alignment offset balancing standard bottom tab spaces
  },
  emptyStateMainContentMessageText: {
    color: "#cbd5e1", // High fidelity text notice token color matching capture
    fontSize: 17,
    fontWeight: "400",
    textAlign: "center",
    lineHeight: 24,
    opacity: 0.9,
  },
});
