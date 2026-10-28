// components/ErrorComponent.tsx
import { useRouter } from "expo-router";
import { Image, Platform, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { logOutUser } from "../../store/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

interface ErrorComponentProps {
  message?: string;
}

export function ErrorComponent({ message }: ErrorComponentProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const retryHandler = async () => {
    if (user) {
      // Clear out global authentication slices and reset session context
      await dispatch(logOutUser());
    }

    // Smoothly kick the client back to the entry gateway flow
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          source={require("../../../assets/error.png")}
          style={styles.image}
        />
      </View>

      <Text variant="titleMedium" style={styles.text}>
        {message ||
          "Sorry, something went wrong. Please press the retry button to try again."}
      </Text>

      <Button
        mode="contained"
        style={styles.button}
        buttonColor="#FF3B30" // Semantic red highlight color for errors
        onPress={retryHandler}
      >
        RETRY
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    width: "100%",
    // 💡 Keeps the error container centered and perfectly scaled on huge desktop screens
    maxWidth: Platform.OS === "web" ? 600 : "100%",
    alignSelf: "center",
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 24,
  },
  image: {
    width: "100%",
    height: 280,
    maxHeight: Platform.OS === "web" ? 320 : 280,
  },
  text: {
    textAlign: "center",
    paddingHorizontal: 16,
    marginBottom: 24,
    color: "#1C1C1E",
    lineHeight: 24,
  },
  button: {
    width: 140,
    borderRadius: 8,
  },
});
