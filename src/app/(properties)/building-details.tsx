import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MOCK_BUILDINGS } from "../../data/mockBuildings";

export default function BuildingDetailsScreen() {
  const { id } = useLocalSearchParams();
  const building = MOCK_BUILDINGS.find((b) => b.id === id) || MOCK_BUILDINGS[0];

  return (
    <View style={styles.container}>
      {/* Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginRight: 12 }}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{building.name} Details</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Image Banner with Overlay Card */}
        <ImageBackground
          source={{
            uri:
              building.images[0] ||
              "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7",
          }}
          style={styles.heroImage}
        >
          {/* Star Rating */}
          <View style={styles.ratingBadge}>
            {[...Array(5)].map((_, i) => (
              <Ionicons
                key={i}
                name="star"
                size={14}
                color="#facc15"
                style={{ marginHorizontal: 1 }}
              />
            ))}
          </View>

          {/* Floating Info Box on Image */}
          <View style={styles.overlayCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.overlayTitle}>{building.name}</Text>
            </View>
            <View style={styles.reviewsButton}>
              <Ionicons
                name="ribbon"
                size={14}
                color="#facc15"
                style={{ marginRight: 4 }}
              />
              <Text style={styles.reviewsText}>
                Reviews({building.reviewsCount})
              </Text>
            </View>
          </View>

          {/* Quick Action Icons bar */}
          <View style={styles.quickActionBar}>
            <TouchableOpacity style={styles.actionIconBtn}>
              <Ionicons name="eye-outline" size={18} color="#9ca3af" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionIconBtnPrimary}
              onPress={() => router.push("/(tabs)/chat")}
            >
              <Ionicons
                name="chatbubble-outline"
                size={16}
                color="#ffffff"
                style={{ marginRight: 6 }}
              />
              <Text
                style={{ color: "#ffffff", fontWeight: "600", fontSize: 13 }}
              >
                Chat
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionIconBtnCall}
              onPress={() => Linking.openURL(`tel:${building.phone}`)}
            >
              <Ionicons
                name="call-outline"
                size={16}
                color="#0f172a"
                style={{ marginRight: 6 }}
              />
              <Text
                style={{ color: "#0f172a", fontWeight: "600", fontSize: 13 }}
              >
                Call
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* Action Row: Select Unit & Image Counter */}
        <View style={styles.middleActionRow}>
          <TouchableOpacity style={styles.selectUnitButton} activeOpacity={0.8}>
            <Text style={styles.selectUnitText}>SELECT A UNIT</Text>
          </TouchableOpacity>
          <View style={styles.imageCounterBadge}>
            <Ionicons
              name="image-outline"
              size={14}
              color="#ffffff"
              style={{ marginRight: 6 }}
            />
            <Text style={{ color: "#ffffff", fontSize: 13 }}>
              1 / {building.images.length || 1}
            </Text>
          </View>
        </View>

        {/* Contact Info List */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Ionicons
              name="call-outline"
              size={18}
              color="#38bdf8"
              style={styles.infoIcon}
            />
            <Text style={styles.infoText}>{building.phone}</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons
              name="email-outline"
              size={18}
              color="#38bdf8"
              style={styles.infoIcon}
            />
            <Text style={styles.infoText}>{building.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons
              name="location-outline"
              size={18}
              color="#38bdf8"
              style={styles.infoIcon}
            />
            <Text style={styles.infoText}>{building.location}</Text>
          </View>
        </View>

        {/* Building Amenities Card */}
        <View style={styles.amenitiesCard}>
          <View style={styles.amenitiesHeader}>
            <MaterialCommunityIcons
              name="office-building"
              size={18}
              color="#38bdf8"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.amenitiesTitle}>Building Amenities</Text>
          </View>
          {building.amenities.map((amenity, idx) => (
            <View key={idx} style={styles.amenityRow}>
              <MaterialCommunityIcons
                name="wifi"
                size={16}
                color="#38bdf8"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.amenityText}>{amenity}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111827", paddingTop: 40 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1f2937",
  },
  headerTitle: { color: "#ffffff", fontSize: 18, fontWeight: "600" },
  scrollContent: { paddingBottom: 40 },
  heroImage: { width: "100%", height: 320, justifyContent: "flex-end" },
  ratingBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  overlayCard: {
    backgroundColor: "rgba(17, 24, 39, 0.85)",
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#374151",
  },
  overlayTitle: { color: "#ffffff", fontSize: 18, fontWeight: "700" },
  reviewsButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#facc15",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  reviewsText: { color: "#facc15", fontSize: 12, fontWeight: "600" },
  quickActionBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "rgba(17, 24, 39, 0.9)",
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: "#374151",
  },
  actionIconBtn: { padding: 8, justifyContent: "center", alignItems: "center" },
  actionIconBtnPrimary: {
    flexDirection: "row",
    backgroundColor: "#1f2937",
    borderWidth: 1,
    borderColor: "#374151",
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 16,
    alignItems: "center",
  },
  actionIconBtnCall: {
    flexDirection: "row",
    backgroundColor: "#38bdf8",
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 16,
    alignItems: "center",
  },
  middleActionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  selectUnitButton: {
    backgroundColor: "#38bdf8",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 28,
  },
  selectUnitText: { color: "#0f172a", fontWeight: "700", fontSize: 14 },
  imageCounterBadge: {
    backgroundColor: "#1f2937",
    borderWidth: 1,
    borderColor: "#374151",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  infoSection: {
    backgroundColor: "#1f2937",
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#374151",
    marginBottom: 16,
  },
  infoRow: { flexDirection: "row", alignItems: "center", marginVertical: 8 },
  infoIcon: { marginRight: 12 },
  infoText: { color: "#38bdf8", fontSize: 14 },
  amenitiesCard: {
    backgroundColor: "#1f2937",
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#374151",
  },
  amenitiesHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  amenitiesTitle: { color: "#ffffff", fontSize: 15, fontWeight: "600" },
  amenityRow: { flexDirection: "row", alignItems: "center", marginVertical: 6 },
  amenityText: { color: "#9ca3af", fontSize: 13 },
});
