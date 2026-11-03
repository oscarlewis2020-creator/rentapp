// components/roles/landlord/LandlordSampleInventoryView.tsx
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SampleSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: string[];
}

const SAMPLE_DATA: SampleSection[] = [
  {
    id: "furniture",
    title: "Furniture",
    icon: <FontAwesome5 name="couch" size={12} color="#85C1E9" />,
    items: ["Sofa", "Dining Table", "Wardrobe", "Coffee Table", "Bed Frame"],
  },
  {
    id: "appliances",
    title: "Appliances",
    icon: (
      <MaterialCommunityIcons
        name="washing-machine"
        size={16}
        color="#85C1E9"
      />
    ),
    items: [
      "Refrigerator",
      "Washing Machine",
      "Microwave Oven",
      "Dishwasher",
      "Electric Kettle",
    ],
  },
  {
    id: "utilities",
    title: "Utilities & fixtures",
    icon: <MaterialCommunityIcons name="tools" size={16} color="#85C1E9" />,
    items: ["Water Heater", "Air Conditioner", "Plumbing Fixture", "Curtains"],
  },
  {
    id: "safety",
    title: "Safety & security",
    icon: (
      <MaterialCommunityIcons
        name="shield-lock-outline"
        size={16}
        color="#85C1E9"
      />
    ),
    items: [
      "Smoke Detector",
      "Fire Alarm",
      "Fire Extinguisher",
      "Security Locks",
    ],
  },
  {
    id: "amenities",
    title: "Common area amenities",
    icon: (
      <MaterialCommunityIcons
        name="google-circles-communities"
        size={16}
        color="#85C1E9"
      />
    ),
    items: ["Gym Equipment", "Elevator"],
  },
  {
    id: "parking",
    title: "Parking & storage",
    icon: <MaterialCommunityIcons name="parking" size={16} color="#85C1E9" />,
    items: ["Parking Space", "Storage Locker", "Bicycle Rack"],
  },
  {
    id: "maintenance",
    title: "Building & maintenance",
    icon: (
      <MaterialCommunityIcons
        name="hammer-screwdriver"
        size={16}
        color="#85C1E9"
      />
    ),
    items: ["Security Camera", "Maintenance Tools", "Cleaning Equipment"],
  },
  {
    id: "misc",
    title: "Miscellaneous",
    icon: (
      <MaterialCommunityIcons
        name="dots-horizontal-circle-outline"
        size={16}
        color="#85C1E9"
      />
    ),
    items: [
      "Keys/Access Cards",
      "Decorative Plants",
      "Stationery",
      "Emergency Kit",
    ],
  },
];

export function LandlordSampleInventoryView({
  onBackPress,
}: {
  onBackPress: () => void;
}) {
  return (
    <SafeAreaView style={styles.container}>
      {/* ================= UPPER HEADER NAVIGATION ROW ================= */}
      <View style={styles.appBar}>
        <TouchableOpacity
          onPress={onBackPress}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>Sample inventory items</Text>
      </View>

      {/* ================= MAIN SCROLLABLE LIST CONTAINER ================= */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {SAMPLE_DATA.map((section) => (
          <View key={section.id} style={styles.sectionBlock}>
            {/* Category Header Badge */}
            <View style={styles.categoryHeader}>
              <View style={styles.iconCircle}>{section.icon}</View>
              <Text style={styles.categoryTitleText}>{section.title}</Text>
            </View>

            {/* Vertically Stacked Sample Cards */}
            <View style={styles.itemsStack}>
              {section.items.map((item, index) => (
                <View key={index} style={styles.itemCardRow}>
                  <Text style={styles.itemText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161D26", // Matching deep carbon canvas background
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%",
    alignSelf: "center",
  },
  appBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#242F42",
    backgroundColor: "#161D26",
    gap: 16,
  },
  backButton: {
    padding: 4,
  },
  appBarTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  sectionBlock: {
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
    paddingHorizontal: 4,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#202E3A",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.03)",
  },
  categoryTitleText: {
    color: "#85C1E9", // Sky blue text label color matching images exactly
    fontSize: 15,
    fontWeight: "600",
  },
  itemsStack: {
    gap: 10,
  },
  itemCardRow: {
    backgroundColor: "#1C2534", // Dark inset card container rows matches design
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#242F42",
  },
  itemText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "400",
  },
});
