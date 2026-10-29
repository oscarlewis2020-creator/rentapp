// app/(auth)/sign-in.tsx
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";
import { LoadingOverlay } from "../../components/global/LoadingOverlay";
import { useAppDispatch } from "../../hooks/hooks";
import { setRole } from "../../store";
import { logInUser } from "../../store/authSlice";
import { UserRole } from "../../types/navigation";

export default function SignInScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Formal Login Submission Handler
  const handleLogin = async () => {
    if (!email || !password) return;

    setIsLoading(true);
    try {
      // Mocked successful login payload API return structure
      const mockPayload = {
        token: "mock_jwt_session_token_xyz123",
        user: { id: "u1", email: email.toLowerCase().trim() },
      };

      // 1. Persist auth session credentials to disk and update slice state
      await dispatch(logInUser(mockPayload));

      // 2. Default to tenant if logging in manually, layout route engine handles the rest
      dispatch(setRole("tenant"));
    } catch (error) {
      console.error("Login submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 💡 DEVELOPER SHORTCUT BYPASS: Fast-track role session configurations for quick testing
  const handleDevBypass = async (role: UserRole) => {
    setIsLoading(true);
    try {
      const mockPayload = {
        token: `mock_token_${role}`,
        user: { id: `dev_${role}`, email: `${role}@renthub.com` },
      };

      await dispatch(logInUser(mockPayload));
      dispatch(setRole(role));
    } catch (error) {
      console.error("Dev bypass failure:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <LoadingOverlay
        message="Authenticating session..."
        isLoading={isLoading}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardWrapper}>
          <Card style={styles.card} elevation={4}>
            <Card.Content style={styles.cardContent}>
              {/* Header Title Section */}
              <View style={styles.header}>
                <Text variant="headlineMedium" style={styles.title}>
                  Rent Hub
                </Text>
                <Text variant="bodyMedium" style={styles.subtitle}>
                  Sign in to manage your rentals
                </Text>
              </View>

              {/* Input Form Fields */}
              <View style={styles.form}>
                <TextInput
                  label="Email Address"
                  value={email}
                  onChangeText={setEmail}
                  mode="outlined"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  textColor="#FFF"
                  theme={{
                    colors: { primary: "#007AFF", placeholder: "#9EA5B1" },
                  }}
                  style={styles.input}
                />

                <TextInput
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  mode="outlined"
                  secureTextEntry={secureTextEntry}
                  autoCapitalize="none"
                  textColor="#FFF"
                  theme={{
                    colors: { primary: "#007AFF", placeholder: "#9EA5B1" },
                  }}
                  right={
                    <TextInput.Icon
                      icon={secureTextEntry ? "eye" : "eye-off"}
                      color="#9EA5B1"
                      onPress={() => setSecureTextEntry(!secureTextEntry)}
                    />
                  }
                  style={styles.input}
                />

                <Button
                  mode="contained"
                  onPress={handleLogin}
                  style={styles.loginBtn}
                  disabled={!email || !password}
                  buttonColor="#007AFF"
                >
                  SIGN IN
                </Button>
              </View>

              {/* 🧪 TESTING UTILITY DASHBOARD SECTION */}
              <View style={styles.devSection}>
                <Text variant="labelLarge" style={styles.devTitle}>
                  🛠️ Developer Test Shortcuts
                </Text>
                <Text variant="bodySmall" style={styles.devSubtitle}>
                  Click a role to bypass security and launch directly into that
                  tab configuration:
                </Text>

                <View style={styles.devBtnRow}>
                  <Button
                    mode="outlined"
                    compact
                    textColor="#85C1E9"
                    style={styles.devBtn}
                    onPress={() => handleDevBypass("landlord")}
                  >
                    Landlord
                  </Button>
                  <Button
                    mode="outlined"
                    compact
                    textColor="#4CD964"
                    style={styles.devBtn}
                    onPress={() => handleDevBypass("tenant")}
                  >
                    Tenant
                  </Button>
                  <Button
                    mode="outlined"
                    compact
                    textColor="#FFCC00"
                    style={styles.devBtn}
                    onPress={() => handleDevBypass("sales")}
                  >
                    Sales
                  </Button>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121824", // Shared premium dark backdrop context
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  cardWrapper: {
    width: "100%",
    maxWidth: Platform.OS === "web" ? 440 : "100%", // Focused modern web form envelope block card dimensions
    alignSelf: "center",
  },
  card: {
    backgroundColor: "#1A2232",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#242F42",
  },
  cardContent: {
    paddingVertical: 10,
  },
  header: {
    alignItems: "center",
    marginBottom: 28,
  },
  title: {
    fontWeight: "800",
    color: "#FFF",
    letterSpacing: 0.5,
  },
  subtitle: {
    color: "#9EA5B1",
    marginTop: 4,
  },
  form: {
    gap: 16,
  },
  input: {
    backgroundColor: "#121824",
  },
  loginBtn: {
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 8,
  },
  devSection: {
    marginTop: 32,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#242F42",
  },
  devTitle: {
    color: "#FFF",
    fontWeight: "700",
    textAlign: "center",
  },
  devSubtitle: {
    color: "#9EA5B1",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 14,
    lineHeight: 16,
  },
  devBtnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  devBtn: {
    flex: 1,
    borderColor: "#242F42",
    borderRadius: 6,
    backgroundColor: "#121824",
  },
});
