// components/ui/landlord/permissions/UnderstandPermissionsModal.tsx
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal, Portal } from "react-native-paper";

interface UnderstandPermissionsModalProps {
  visible: boolean;
  onClose: () => void;
}

interface RoleDescriptionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Reusable Inner Role Description Card Component
function RoleDescriptionCard({
  title,
  description,
  icon,
}: RoleDescriptionCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardIconWrapper}>{icon}</View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
    </View>
  );
}

export function UnderstandPermissionsModal({
  visible,
  onClose,
}: UnderstandPermissionsModalProps) {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        dismissable={true}
        style={styles.modalOverlay}
        contentContainerStyle={styles.sheetContainer}
      >
        {/* Top Handle Decorative Accent Line */}
        <View style={styles.topHandleBar} />

        {/* Header Section with Close Window Cross Action Key */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={onClose}
            style={styles.closeIconButton}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={26} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Scrollable Role Cards Main Feed Track */}
        <ScrollView
          style={styles.scrollList}
          showsVerticalScrollIndicator={false}
        >
          <RoleDescriptionCard
            title="Admin"
            description="A landlord or someone who has been given full responsibility to manage a building and make final decisions. They can delete a property or unit, change the lease status, and make any changes to the property."
            icon={
              <MaterialCommunityIcons
                name="shield-account-outline"
                size={24}
                color="#85C1E9"
              />
            }
          />

          <RoleDescriptionCard
            title="Property Manager"
            description="A person who is responsible for the day-to-day operations of a building. They only interact with leases and keeping inventory items up-to-date. They can't make critical decisions like deleting a property or unit."
            icon={
              <MaterialCommunityIcons
                name="account-group-outline"
                size={24}
                color="#85C1E9"
              />
            }
          />

          <RoleDescriptionCard
            title="Admin (Read Only)"
            description="A person who can only read data but can't make any changes. This can be someone you have partnered with to build the property but they don't run the day-to-day operations. e.g. A bank who granted you a loan to build the property."
            icon={
              <MaterialCommunityIcons
                name="account-eye-outline"
                size={24}
                color="#85C1E9"
              />
            }
          />

          <RoleDescriptionCard
            title="Manager (Read Only)"
            description="A person who can only read data but can't make any changes. This can be someone you have partnered with to run the day-to-day operations."
            icon={
              <MaterialCommunityIcons
                name="account-eye-outline"
                size={24}
                color="#85C1E9"
              />
            }
          />
        </ScrollView>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    justifyContent: "flex-end", // Snaps bottom sheet modal flush onto lower screen borders
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  sheetContainer: {
    backgroundColor: "#004B6E", // True deep blue corporate sheet background matching your image assets
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%", // Responsive desktop monitor capping constraints
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 34 : 16, // Accounts safely for lower system safe rows
    maxHeight: "90%", // Prevent text blocks from escaping view margins on shorter viewports
  },
  topHandleBar: {
    width: 44,
    height: 5,
    backgroundColor: "#1C2D37",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 4,
    opacity: 0.6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  closeIconButton: {
    padding: 4,
  },
  scrollList: {
    paddingHorizontal: 20,
    marginTop: 4,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#1A222A", // Dark deep gray card surface fill block
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.03)",
    alignItems: "flex-start",
    gap: 16,
  },
  cardIconWrapper: {
    width: 32,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 2,
  },
  cardContent: {
    flex: 1,
    gap: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFF",
    letterSpacing: 0.2,
  },
  cardDescription: {
    fontSize: 14,
    color: "#9EA5B1", // Muted legible gray description body font color match
    lineHeight: 22,
    fontWeight: "400",
  },
});
