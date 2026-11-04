// components/roles/landlord/LandlordChat.tsx
import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface LandlordChatProps {
  onNewChatPress?: () => void;
}

export function LandlordChat({ onNewChatPress }: LandlordChatProps) {
  const handleNewChat = () => {
    if (onNewChatPress) {
      onNewChatPress();
    } else {
      console.log("Trigger new conversation initialization flow...");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Core Body Container Workspace */}
      <View style={styles.content}>
        {/* 1. Immersive Vector Illustration Graphic */}
        <View style={styles.imageContainer}>
          <Image
            source={require("../../../../assets/chat.png")} // Make sure this matches your image path asset
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        {/* 2. Central Prompt Helper Text Callout Labels */}
        <View style={styles.textContainer}>
          <Text style={styles.primaryText}>Tap the button below to</Text>
          <Text style={styles.primaryText}>start chatting</Text>
        </View>
      </View>

      {/* 3. Lower Right Sticky Floating "New Chat" Action Pill Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handleNewChat}
        activeOpacity={0.85}
      >
        <Ionicons
          name="chatbubble"
          size={20}
          color="#FFF"
          style={styles.buttonIcon}
        />
        <Text style={styles.buttonText}>New Chat</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C2026", // Deep slate dark tone matching your screen example
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%", // 💡 Responsive desk capping constraint
    alignSelf: "center",
    position: "relative", // Core prerequisite for safe overlay child tracking elements
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingBottom: 60, // Clear floating action button threshold space limits
  },
  imageContainer: {
    width: "100%",
    height: 320,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 36,
  },
  illustration: {
    width: "85%",
    height: "100%",
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  primaryText: {
    fontSize: 22,
    fontWeight: "400",
    color: "#E5E9F0", // Clear light contrast white font tone match
    textAlign: "center",
    lineHeight: 32,
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 24,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#035273", // Matching the dark teal hue of your active action button panel
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 16, // Clean modern pill block curves layout choice
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
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
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)",
        cursor: "pointer",
        userSelect: "none",
      },
    }),
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});
