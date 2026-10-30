// app/(public)/welcome.tsx
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import { BreathingButton } from "../../components/global/BreathingButton";
import { LoadingOverlay } from "../../components/global/LoadingOverlay";
import { useAppDispatch } from "../../hooks";
import { setRole } from "../../store";

const cfg = { values: { env: "dev" } };

export default function WelcomeScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGetStarted = async () => {
    router.replace("/signin");
  };

  const handleContinueAsGuest = async () => {
    setIsLoading(true);
    dispatch(setRole("guest"));
    setIsLoading(false);
    router.replace("/search-property");
  };

  return (
    <View style={styles.container}>
      <LoadingOverlay
        message="Please wait while redirecting..."
        isLoading={isLoading}
      />

      <ScrollView
        style={styles.scrollViewShell}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Image
          resizeMode="contain"
          source={require("../../../assets/start-page.png")}
          style={styles.img}
        />

        <View style={styles.introTxt}>
          <Text style={styles.title} variant="headlineLarge">
            Welcome to Rent Hub
          </Text>
          <Text variant="headlineSmall" style={styles.subtitle}>
            Excellence in renting.
          </Text>
        </View>

        {/* 💡 Explicit stretching row container layer */}
        <View style={styles.btnViews}>
          <View style={styles.buttonWrapperRow}>
            <BreathingButton onPress={handleGetStarted} label="Get Started" />
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.customBtn,
              styles.guestBtn,
              pressed && styles.pressed,
            ]}
            onPress={handleContinueAsGuest}
            accessibilityRole="button"
          >
            <Text style={styles.guestBtnLabel}>CONTINUE AS GUEST</Text>
          </Pressable>

          {cfg.values.env !== "pro" && (
            <Pressable
              style={({ pressed }) => [
                styles.customBtn,
                styles.debugBtn,
                pressed && styles.pressed,
              ]}
              onPress={() => router.push("/debug-screen" as any)}
              accessibilityRole="button"
            >
              <Text style={styles.debugBtnLabel}>DEBUGS</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    width: "100%",
  },
  scrollViewShell: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
    paddingHorizontal: 24,
    width: "100%",
    maxWidth: Platform.OS === "web" ? 500 : "100%",
    alignSelf: "center", // Anchors content frame centered on wide browser monitors
  },
  img: {
    width: "100%",
    height: undefined,
    aspectRatio: 1.33,
    maxHeight: 260,
    marginBottom: 24,
  },
  introTxt: {
    alignItems: "center",
    marginBottom: 32,
    width: "100%",
  },
  title: {
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 8,
    color: "#1C1C1E",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
  },
  btnViews: {
    width: "100%",
    gap: 12,
    alignItems: "stretch", // Forces children blocks to expand edge-to-edge
  },
  buttonWrapperRow: {
    width: "100%",
    alignItems: "stretch",
  },
  customBtn: {
    width: "100%",
    height: 52,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      web: { cursor: "pointer", userSelect: "none" },
    }),
  },
  guestBtn: {
    backgroundColor: "#E5E5EA",
  },
  guestBtnLabel: {
    color: "#1C1C1E",
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 0.5,
  },
  debugBtn: {
    backgroundColor: "#FF3B30",
  },
  debugBtnLabel: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 0.5,
  },
  pressed: {
    opacity: 0.85,
  },
});
