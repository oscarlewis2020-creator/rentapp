// components/roles/landlord/LeaseDetailsScreen.tsx
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { UnitLeaseItem } from "../../ui/landlord/units/UnitLeasesList";

interface LeaseDetailsScreenProps {
  lease: UnitLeaseItem;
  onBack: () => void;
  onDocumentPress?: (lease: UnitLeaseItem) => void;
}

export function LandlordLeaseDetailsScreen({
  lease,
  onBack,
  onDocumentPress,
}: LeaseDetailsScreenProps) {
  const [showPhotoId, setShowPhotoId] = useState(false);

  const isRejected = lease.status.toLowerCase() === "rejected";

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* Top Header Bar */}
      <View style={styles.headerBar}>
        <Pressable onPress={onBack} hitSlop={10} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#F1F5F9" />
        </Pressable>
        <Text numberOfLines={1} style={styles.headerTitle}>
          {lease.tenantName} Details
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Image Box */}
        <View style={styles.imagePlaceholderBox}>
          {lease.unitImageUri ? (
            <Image
              source={{ uri: lease.unitImageUri }}
              style={styles.unitImage}
              resizeMode="cover"
            />
          ) : (
            <Text style={styles.noImageText}>No image available</Text>
          )}
        </View>

        {/* Photo ID Card */}
        <View style={styles.photoIdCard}>
          <Text style={styles.photoIdTitle}>
            {showPhotoId && lease.photoIdUri
              ? "Photo ID attached"
              : "No photo Id"}
          </Text>
          <Pressable
            onPress={() => setShowPhotoId((prev) => !prev)}
            style={styles.eyeCircle}
          >
            <Ionicons
              name={showPhotoId ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#94A3B8"
            />
          </Pressable>
        </View>

        {/* Metadata Table / Rows */}
        <View style={styles.rowsContainer}>
          {/* Name */}
          <View style={styles.row}>
            <View style={styles.rowLabelCol}>
              <Ionicons name="person-outline" size={18} color="#CBD5E1" />
              <Text style={styles.rowLabel}>Name</Text>
            </View>
            <Text style={styles.rowValueBlue}>{lease.tenantName}</Text>
          </View>

          {/* Email */}
          {lease.email && (
            <View style={styles.row}>
              <View style={styles.rowLabelCol}>
                <MaterialCommunityIcons
                  name="email-outline"
                  size={18}
                  color="#CBD5E1"
                />
                <Text style={styles.rowLabel}>Email</Text>
              </View>
              <Text style={styles.rowValueBlue}>{lease.email}</Text>
            </View>
          )}

          {/* Phone */}
          {lease.phone && (
            <View style={styles.row}>
              <View style={styles.rowLabelCol}>
                <Ionicons name="call-outline" size={18} color="#CBD5E1" />
                <Text style={styles.rowLabel}>Phone</Text>
              </View>
              <Text style={styles.rowValueBlue}>{lease.phone}</Text>
            </View>
          )}

          {/* Rejection Reason (when status is Rejected) */}
          {isRejected && lease.rejectionReason && (
            <View style={styles.row}>
              <View style={styles.rowLabelCol}>
                <MaterialCommunityIcons
                  name="message-alert-outline"
                  size={18}
                  color="#CBD5E1"
                />
                <Text style={styles.rowLabel}>Rejection Reason</Text>
              </View>
              <Text style={styles.rowValueBlue}>{lease.rejectionReason}</Text>
            </View>
          )}

          {/* Building Name */}
          {lease.buildingName && (
            <View style={styles.row}>
              <View style={styles.rowLabelCol}>
                <Ionicons name="home-outline" size={18} color="#CBD5E1" />
                <Text style={styles.rowLabel}>Building Name</Text>
              </View>
              <Text style={styles.rowValueBlue}>{lease.buildingName}</Text>
            </View>
          )}

          {/* Unit Name */}
          <View style={styles.row}>
            <View style={styles.rowLabelCol}>
              <MaterialCommunityIcons
                name="bed-outline"
                size={18}
                color="#CBD5E1"
              />
              <Text style={styles.rowLabel}>Unit Name</Text>
            </View>
            <Text style={styles.rowValueBlue}>{lease.unitName}</Text>
          </View>

          {/* Monthly Rent */}
          {lease.monthlyRent && (
            <View style={styles.row}>
              <View style={styles.rowLabelCol}>
                <MaterialCommunityIcons
                  name="cash-100"
                  size={18}
                  color="#CBD5E1"
                />
                <Text style={styles.rowLabel}>Monthly Rent</Text>
              </View>
              <Text style={styles.rowValueBlue}>{lease.monthlyRent}</Text>
            </View>
          )}

          {/* Lease Status */}
          <View style={styles.row}>
            <View style={styles.rowLabelCol}>
              <MaterialCommunityIcons
                name="playlist-check"
                size={18}
                color="#CBD5E1"
              />
              <Text style={styles.rowLabel}>Lease Status</Text>
            </View>
            <Text
              style={[
                styles.rowValueMuted,
                isRejected && styles.rejectedStatusText,
              ]}
            >
              {lease.status}
            </Text>
          </View>

          {/* Role */}
          {lease.role && (
            <View style={styles.row}>
              <View style={styles.rowLabelCol}>
                <MaterialCommunityIcons
                  name="account-group-outline"
                  size={18}
                  color="#CBD5E1"
                />
                <Text style={styles.rowLabel}>Role</Text>
              </View>
              <Text style={styles.rowValueBlue}>{lease.role}</Text>
            </View>
          )}

          {/* Moved in on */}
          {lease.movedInDate && (
            <View style={styles.row}>
              <View style={styles.rowLabelCol}>
                <MaterialCommunityIcons
                  name="calendar-check-outline"
                  size={18}
                  color="#CBD5E1"
                />
                <Text style={styles.rowLabel}>Moved in on</Text>
              </View>
              <Text style={styles.rowValueBlue}>{lease.movedInDate}</Text>
            </View>
          )}

          {/* Lease Start Date */}
          {lease.leaseStartDate && (
            <View style={styles.row}>
              <View style={styles.rowLabelCol}>
                <MaterialCommunityIcons
                  name="calendar-check-outline"
                  size={18}
                  color="#CBD5E1"
                />
                <Text style={styles.rowLabel}>Lease Start Date</Text>
              </View>
              <Text style={styles.rowValueBlue}>{lease.leaseStartDate}</Text>
            </View>
          )}

          {/* Lease End Date */}
          <View style={styles.row}>
            <View style={styles.rowLabelCol}>
              <MaterialCommunityIcons
                name="calendar-arrow-right"
                size={18}
                color="#CBD5E1"
              />
              <Text style={styles.rowLabel}>Lease End Date</Text>
            </View>
            <Text style={styles.rowValueBlue}>{lease.endDate}</Text>
          </View>

          {/* Due Date */}
          {lease.dueDate && (
            <View style={[styles.row, styles.lastRow]}>
              <View style={styles.rowLabelCol}>
                <MaterialCommunityIcons
                  name="playlist-check"
                  size={18}
                  color="#CBD5E1"
                />
                <Text style={styles.rowLabel}>Due Date</Text>
              </View>
              <Text style={styles.rowValueBlue}>{lease.dueDate}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Right Floating Document FAB */}
      <Pressable
        onPress={() => onDocumentPress?.(lease)}
        style={styles.floatingDocBtn}
      >
        <Ionicons name="document-text-outline" size={24} color="#E2E8F0" />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121824",
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%",
    alignSelf: "center",
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#243142",
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    color: "#F1F5F9",
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imagePlaceholderBox: {
    height: 210,
    backgroundColor: "#161B22",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#243142",
  },
  unitImage: {
    width: "100%",
    height: "100%",
  },
  noImageText: {
    color: "#CBD5E1",
    fontSize: 16,
  },
  photoIdCard: {
    margin: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#121824",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#475569",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  photoIdTitle: {
    color: "#F8FAFC",
    fontSize: 18,
    fontWeight: "600",
  },
  eyeCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#242B35",
    alignItems: "center",
    justifyContent: "center",
  },
  rowsContainer: {
    paddingHorizontal: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#243142",
    gap: 12,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  rowLabelCol: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minWidth: 145,
  },
  rowLabel: {
    color: "#E2E8F0",
    fontSize: 15,
  },
  rowValueBlue: {
    color: "#38BDF8",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "right",
    flex: 1,
  },
  rowValueMuted: {
    color: "#94A3B8",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "right",
    flex: 1,
  },
  rejectedStatusText: {
    color: "#94A3B8",
  },
  floatingDocBtn: {
    position: "absolute",
    right: 18,
    bottom: 22,
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: "#065F73",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },
});
