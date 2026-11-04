// src/app/screens/tenant/search.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TenantSearchScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Search Properties Screen</Text>
      <Text style={styles.subtext}>
        Search inputs and property filters go here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "#f8fafc",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtext: {
    color: "#94a3b8",
    fontSize: 14,
  },
});
