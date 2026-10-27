// app/(public)/welcome.tsx
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Platform, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper"; // Assuming React Native Paper based on variants
import { setRole } from "../../store";
import { completeOnboarding } from "../../store/authSlice";
import { useAppDispatch } from "../../store/hooks";
// Placeholder component imports - swap with your actual file paths
import { BreathingButton } from "../../components/global/BreathingButton";
import { LoadingOverlay } from "../../components/global/LoadingOverlay";

// Mock font sizing utility if you have one, otherwise fallback to static standard sizes
const getFontSize = (size: number) => size;

// Mock configuration check
const cfg = { values: { env: "dev" } };

export default function WelcomeScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGetStarted = async () => {
    setIsLoading(true);
    // Mark onboarding as completed in Redux + Disk storage
    await dispatch(completeOnboarding());
    setIsLoading(false);

    // The Layout Protection engine will now evaluate hasOnboarded=true,
    // and since isAuthenticated=false, it will auto-redirect them seamlessly to /(auth)/sign-in
  };

  const handleContinueAsGuest = async () => {
    setIsLoading(true);
    // Even as a guest, we mark onboarding as done so they don't see the carousel again
    await dispatch(completeOnboarding());
    // 💡 Explicitly tag the state container role context as guest
    dispatch(setRole("guest"));
    setIsLoading(false);

    // Deep link directly to your public property search platform screen
    // Make sure your app/_layout.tsx protection bypasses or allows guests to hit this route!
    router.replace("/(public)/search-property");
  };

  return (
    <>
      <LoadingOverlay
        message="Please wait while redirecting..."
        isLoading={isLoading}
      />
      <View style={styles.page}>
        <Image
          resizeMode="contain"
          source={require("../../../assets/start-page.png")}
          style={styles.img}
        />

        <View style={styles.introTxt}>
          <Text style={styles.title} variant="headlineLarge">
            Welcome to Rent Hub
          </Text>
          <Text
            variant="headlineSmall"
            style={{ textAlign: "center", fontSize: getFontSize(16) }}
          >
            Excellence in renting.
          </Text>
        </View>

        <View style={styles.btnViews}>
          {/* Main Action: Onboarding flow flag sets, then targets auth entry stacks */}
          <BreathingButton onPress={handleGetStarted} label="Get Started" />

          <Button
            style={styles.guestBtn}
            mode="contained"
            uppercase
            onPress={handleContinueAsGuest}
          >
            Continue as guest
          </Button>

          {cfg.values.env !== "pro" && (
            <Button
              mode="contained"
              uppercase
              style={styles.debugBtn}
              onPress={() => router.push("/(public)/debug-screen")}
            >
              debugs
            </Button>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 40,
    paddingHorizontal: 24,
    maxWidth: Platform.OS === "web" ? 600 : "100%",
    alignSelf: "center",
    width: "100%",
  },
  img: {
    width: "80%",
    height: 300,
    marginTop: 20,
  },
  introTxt: {
    alignItems: "center",
    marginVertical: 20,
  },
  title: {
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
    color: "#1C1C1E",
  },
  btnViews: {
    width: "100%",
    gap: 14,
    paddingBottom: 20,
  },
  guestBtn: {
    backgroundColor: "#E5E5EA",
    paddingVertical: 4,
    borderRadius: 8,
  },
  debugBtn: {
    backgroundColor: "#FF3B30",
    paddingVertical: 4,
    borderRadius: 8,
  },
});
