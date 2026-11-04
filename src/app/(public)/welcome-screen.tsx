import { Button } from "@/components/Button";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();
  return (
    <View>
      <Button title="Get started" onPress={() => router.push("/signin")} />
      <Button
        title=" Continue as guest"
        onPress={() => router.push("/search-property")}
      />
    </View>
  );
}
