// src/app/screens/tenant/components/PaymentsView.tsx
import { StyleSheet, Text, View } from "react-native";

export default function PaymentsView() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Payment History</Text>
      <Text style={styles.subtext}>No payments found.</Text>
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
