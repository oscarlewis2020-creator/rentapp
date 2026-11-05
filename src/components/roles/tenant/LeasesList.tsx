// src/app/screens/tenant/components/LeasesView.tsx
import { StyleSheet, Text, View } from "react-native";

export default function LeasesView() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Leases Overview</Text>
      <Text style={styles.subtext}>
        Your active and past lease requests will appear here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "#f8fafc",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtext: {
    color: "#94a3b8",
    fontSize: 14,
    textAlign: "center",
  },
});
