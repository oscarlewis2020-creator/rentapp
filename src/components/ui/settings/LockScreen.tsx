import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  onUnlock: () => void;
}

export default function LockScreen({ onUnlock }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name="lock-closed" size={64} color="#75CCF5" />
      <Text style={styles.title}>RentHub is locked</Text>
      <Text style={styles.subtitle}>
        Use your fingerprint, face or device passcode to continue.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={onUnlock}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Unlock</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    elevation: 999,
    backgroundColor: "#121824",
    alignItems: "center",
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  title: {
    color: "#EAECEE",
    fontSize: 26,
    marginTop: 24,
    marginBottom: 10,
  },
  subtitle: {
    color: "#9EA5B1",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 36,
  },
  button: {
    borderWidth: 1,
    borderColor: "#75CCF5",
    borderRadius: 30,
    paddingHorizontal: 40,
    paddingVertical: 12,
  },
  buttonText: {
    color: "#75CCF5",
    fontSize: 17,
  },
});
