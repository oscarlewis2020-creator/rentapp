// components/ui/landlord/units/GenerateLeaseStatementModal.tsx
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

interface GenerateLeaseStatementModalProps {
  visible: boolean;
  initialStartDate?: string;
  initialEndDate?: string;
  onCancel: () => void;
  onGeneratePdf: (startDate: string, endDate: string) => void;
}

export default function GenerateLeaseStatementModal({
  visible,
  initialStartDate = "Apr-17-2025",
  initialEndDate = "Apr-17-2026",
  onCancel,
  onGeneratePdf,
}: GenerateLeaseStatementModalProps) {
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  useEffect(() => {
    if (visible) {
      setStartDate(initialStartDate);
      setEndDate(initialEndDate);
    }
  }, [visible, initialStartDate, initialEndDate]);

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onCancel}
        style={styles.dialogContainer}
      >
        <View style={styles.headerRow}>
          <View style={styles.iconCircle}>
            <Ionicons name="document-text-outline" size={24} color="#F8FAFC" />
          </View>
          <View style={styles.headerTextCol}>
            <Text numberOfLines={1} style={styles.title}>
              Generate Lease Statement
            </Text>
            <Text style={styles.subtitle}>Select statement period</Text>
          </View>
        </View>

        <Dialog.Content style={styles.content}>
          <Text style={styles.description}>
            Select the date range for the lease statement period
          </Text>

          {/* Statement Start Date */}
          <View style={styles.fieldGroup}>
            <Text style={styles.floatingLabel}>Statement Start Date</Text>
            <Pressable
              onPress={() => {
                // Hook a date picker here if desired
              }}
              style={styles.dateBox}
            >
              <Ionicons name="calendar-outline" size={18} color="#93C5FD" />
              <Text style={styles.dateText}>{startDate}</Text>
            </Pressable>
          </View>

          {/* Statement End Date */}
          <View style={styles.fieldGroup}>
            <Text style={styles.floatingLabel}>Statement End Date</Text>
            <Pressable
              onPress={() => {
                // Hook a date picker here if desired
              }}
              style={styles.dateBox}
            >
              <Ionicons name="calendar-outline" size={18} color="#93C5FD" />
              <Text style={styles.dateText}>{endDate}</Text>
            </Pressable>
          </View>
        </Dialog.Content>

        <Dialog.Actions style={styles.actions}>
          <Button
            mode="outlined"
            onPress={onCancel}
            style={styles.cancelBtn}
            textColor="#93C5FD"
            labelStyle={styles.cancelLabel}
          >
            Cancel
          </Button>

          <Button
            mode="contained"
            onPress={() => onGeneratePdf(startDate, endDate)}
            style={styles.generateBtn}
            buttonColor="#89CEFF"
            textColor="#0A2538"
            labelStyle={styles.generateLabel}
          >
            Generate PDF
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialogContainer: {
    backgroundColor: "#23303C",
    borderRadius: 20,
    width: Platform.OS === "web" ? "92%" : "88%",
    maxWidth: 420,
    alignSelf: "center",
    paddingTop: 18,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 14,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#3898EC",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTextCol: {
    flex: 1,
    gap: 2,
  },
  title: {
    color: "#F8FAFC",
    fontSize: 20,
    fontWeight: "600",
  },
  subtitle: {
    color: "#CBD5E1",
    fontSize: 15,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 14,
    gap: 16,
  },
  description: {
    color: "#E2E8F0",
    fontSize: 15,
    lineHeight: 22,
  },
  fieldGroup: {
    position: "relative",
    marginTop: 4,
  },
  floatingLabel: {
    position: "absolute",
    top: -9,
    left: 12,
    zIndex: 2,
    backgroundColor: "#23303C",
    paddingHorizontal: 6,
    color: "#CBD5E1",
    fontSize: 12,
  },
  dateBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#64748B",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  dateText: {
    color: "#F8FAFC",
    fontSize: 15,
    fontWeight: "500",
  },
  actions: {
    paddingHorizontal: 20,
    paddingBottom: 18,
    paddingTop: 6,
    justifyContent: "space-between",
    gap: 12,
  },
  cancelBtn: {
    borderColor: "#64748B",
    borderRadius: 999,
    paddingHorizontal: 10,
  },
  cancelLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  generateBtn: {
    borderRadius: 999,
    paddingHorizontal: 14,
  },
  generateLabel: {
    fontSize: 14,
    fontWeight: "700",
  },
});
