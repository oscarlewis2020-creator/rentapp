// src/app/screens/tenant/components/SearchCard.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function SearchCard() {
  const handlePress = () => {
    // Navigates to the independent Search screen
    router.push("/search");
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.iconPlaceholder}>
        <Text style={styles.iconText}>🔍</Text>
      </View>
      <Text style={styles.title}>Search for properties</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1e293b",
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconPlaceholder: {
    marginRight: 12,
  },
  iconText: {
    fontSize: 20,
  },
  title: {
    color: "#38bdf8",
    fontSize: 16,
    fontWeight: "600",
  },
});
