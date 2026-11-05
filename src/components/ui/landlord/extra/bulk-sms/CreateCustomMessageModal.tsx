import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal as PaperModal, Portal } from "react-native-paper";

interface CreateCustomMessageModalProps {
  isVisible: boolean;
  buildingName: string;
  onClose: () => void;
  onSendMessage: (title: string, body: string, group: string) => void;
}

type TenantGroup = "all" | "active leases" | "inactive leases" | "leases";

export default function CreateCustomMessageModal({
  isVisible,
  buildingName,
  onClose,
  onSendMessage,
}: CreateCustomMessageModalProps) {
  const [selectedGroup, setSelectedGroup] = useState<TenantGroup>("all");
  const [messageTitle, setMessageTitle] = useState("");
  const [messageBody, setMessageBody] = useState("");

  const tenantGroups: TenantGroup[] = [
    "all",
    "active leases",
    "inactive leases",
    "leases",
  ];
  const characterCount = messageBody.length;
  const tokenCost = Math.ceil(characterCount / 160); // standard structural token conversion estimation metric

  return (
    <Portal>
      <PaperModal
        visible={isVisible}
        onDismiss={onClose}
        contentContainerStyle={styles.paperModalOverride}
      >
        <View style={styles.modalBackdropScrim}>
          <View style={styles.modalBottomCardContainer}>
            {/* Grabber indicator matching design context accent */}
            <View style={styles.sheetGrabber} />

            <Text style={styles.modalMainTitle}>Create custom message</Text>

            <ScrollView showsVerticalScrollIndicator={Platform.OS === "web"}>
              {/* Group Category Chip Carousel Selection Array Section */}
              <Text style={styles.fieldSectionLabel}>
                Select a tenant group
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.chipCarouselContainer}
              >
                {tenantGroups.map((group) => {
                  const isActive = selectedGroup === group;
                  return (
                    <TouchableOpacity
                      key={group}
                      style={[
                        styles.groupChip,
                        isActive && styles.groupChipActive,
                      ]}
                      onPress={() => setSelectedGroup(group)}
                    >
                      {isActive && (
                        <Ionicons
                          name="checkmark"
                          size={14}
                          color="#ffffff"
                          style={{ marginRight: 4 }}
                        />
                      )}
                      <Text
                        style={[
                          styles.chipText,
                          isActive && styles.chipTextActive,
                        ]}
                      >
                        {group}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {/* Recipients Detail Line Metric Matrix Info Segment */}
              <View style={styles.recipientsMetaRow}>
                <Text style={styles.recipientsLabel}>
                  Recipients :{" "}
                  <Ionicons name="person" size={14} color="#8a94a6" /> 0 tenants
                </Text>
                <TouchableOpacity style={styles.searchTenantBadge}>
                  <Ionicons
                    name="person-add-outline"
                    size={14}
                    color="#161c24"
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.searchTenantBadgeText}>
                    Search tenant
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Property Origin Component Card Block */}
              <View style={styles.propertyStaticCard}>
                <MaterialCommunityIcons
                  name="home-city"
                  size={24}
                  color="#4fa3f7"
                  style={{ marginRight: 16 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.propertyLabelHint}>Building</Text>
                  <Text style={styles.propertyValueTitle}>{buildingName}</Text>
                </View>
              </View>

              {/* Title Form Field Box Input Layer Block */}
              <View style={styles.outlinedFormCard}>
                <MaterialCommunityIcons
                  name="card-text-outline"
                  size={20}
                  color="#4fa3f7"
                  style={styles.inputLeftIcon}
                />
                <TextInput
                  placeholder="Message title"
                  placeholderTextColor="#8a94a6"
                  style={styles.textInput}
                  value={messageTitle}
                  onChangeText={setMessageTitle}
                />
              </View>

              {/* Live Characters Calculation Matrix Data Counters Line Row */}
              <View style={styles.countersRowMetrics}>
                <Text style={styles.metricCounterText}>
                  {characterCount} / 740 Characters
                </Text>
                <Text style={styles.metricCounterText}>
                  Sms cost: {tokenCost} tokens
                </Text>
              </View>

              {/* Message Content Extended Multi-Line Body Input Box Frame */}
              <View
                style={[
                  styles.outlinedFormCard,
                  styles.multiLineInputCardOverride,
                ]}
              >
                <MaterialCommunityIcons
                  name="message-text-outline"
                  size={20}
                  color="#4fa3f7"
                  style={[styles.inputLeftIcon, { marginTop: 2 }]}
                />
                <TextInput
                  placeholder="Message body"
                  placeholderTextColor="#8a94a6"
                  style={[styles.textInput, styles.textAreaFieldStyle]}
                  value={messageBody}
                  onChangeText={setMessageBody}
                  multiline
                  numberOfLines={4}
                />
              </View>

              {/* Bottom Action Submissions Control Buttons Layout Element */}
              <View style={styles.modalActionButtonsRow}>
                <TouchableOpacity
                  style={styles.closeTextButton}
                  onPress={onClose}
                >
                  <Text style={styles.closeTextButtonText}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.sendActionButton}
                  onPress={() =>
                    onSendMessage(messageTitle, messageBody, selectedGroup)
                  }
                >
                  <Ionicons
                    name="send"
                    size={16}
                    color="#ffffff"
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.sendActionButtonText}>Send message</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </PaperModal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  paperModalOverride: { flex: 1, justifyContent: "flex-end" },
  modalBackdropScrim: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },
  modalBottomCardContainer: {
    width: "100%",
    maxWidth: 600,
    maxHeight: "88%",
    backgroundColor: "#1c2431",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    alignSelf: "center",
  },
  sheetGrabber: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#2d384a",
    alignSelf: "center",
    marginBottom: 16,
  },
  modalMainTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 20,
  },
  fieldSectionLabel: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 12,
  },
  chipCarouselContainer: { gap: 10, paddingBottom: 6 },
  groupChip: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#343e50",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#161c24",
  },
  groupChipActive: { backgroundColor: "#027a48", borderColor: "#027a48" },
  chipText: {
    color: "#8a94a6",
    fontSize: 14,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  chipTextActive: { color: "#ffffff" },
  recipientsMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 16,
  },
  recipientsLabel: { color: "#ffffff", fontSize: 15, fontWeight: "500" },
  searchTenantBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#86d3ff",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  searchTenantBadgeText: { color: "#161c24", fontSize: 13, fontWeight: "600" },
  propertyStaticCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#161c24",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#252f41",
    marginBottom: 16,
  },
  propertyLabelHint: { color: "#657285", fontSize: 12, marginBottom: 2 },
  propertyValueTitle: { color: "#ffffff", fontSize: 16, fontWeight: "600" },
  outlinedFormCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#343e50",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#161c24",
    marginBottom: 6,
  },
  multiLineInputCardOverride: {
    minHeight: 100,
    marginTop: 12,
    marginBottom: 32,
  },
  inputLeftIcon: { marginRight: 14, marginTop: 2 },
  textInput: {
    flex: 1,
    color: "#ffffff",
    fontSize: 16,
    padding: 0,
    ...Platform.select({ web: { outlineStyle: "none" } as any }),
  },
  textAreaFieldStyle: { textAlignVertical: "top" },
  countersRowMetrics: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  metricCounterText: { color: "#8a94a6", fontSize: 13 },
  modalActionButtonsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 24,
    marginTop: 8,
    paddingBottom: Platform.OS === "ios" ? 16 : 4,
  },
  closeTextButton: { paddingVertical: 8, paddingHorizontal: 4 },
  closeTextButtonText: { color: "#cbd5e1", fontSize: 16, fontWeight: "600" },
  sendActionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2d384a",
    borderWidth: 1,
    borderColor: "#4fa3f7",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  sendActionButtonText: { color: "#ffffff", fontSize: 15, fontWeight: "600" },
});
