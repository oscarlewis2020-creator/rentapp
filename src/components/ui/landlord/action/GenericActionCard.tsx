// components/ui/GenericActionCard.tsx
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface ActionField {
  label: string;
  value: string;
  icon:
    | React.ComponentProps<typeof Ionicons>["name"]
    | React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  isMaterialIcon?: boolean;
  valueColor?: string;
}

interface GenericActionCardProps {
  title: string;
  fields: ActionField[];
  processLabel: string;
  onReject: () => void;
  onApprove: () => void;
  onDetails: () => void;
}

export function GenericActionCard({
  title,
  fields,
  processLabel,
  onReject,
  onApprove,
  onDetails,
}: GenericActionCardProps) {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.card}>
        {fields.map((field, idx) => (
          <View key={idx} style={styles.cardRow}>
            <View style={styles.leftLabelGroup}>
              <View style={styles.iconContainer}>
                {field.isMaterialIcon ? (
                  <MaterialCommunityIcons
                    name={field.icon as any}
                    size={18}
                    color="#9EA5B1"
                  />
                ) : (
                  <Ionicons
                    name={field.icon as any}
                    size={18}
                    color="#9EA5B1"
                  />
                )}
              </View>
              <Text style={styles.labelText}>{field.label}</Text>
            </View>
            <Text
              style={[
                styles.valueText,
                { color: field.valueColor || "#85C1E9" },
              ]}
            >
              {field.value}
            </Text>
          </View>
        ))}

        {/* Lower Control Buttons Panel Strip */}
        <View style={styles.actionSectionRow}>
          <View style={styles.leftLabelGroup}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="file-sign"
                size={20}
                color="#9EA5B1"
              />
            </View>
            <Text style={styles.labelText}>{processLabel}</Text>
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.circleBtn, styles.rejectBtn]}
              onPress={onReject}
            >
              <Ionicons name="close" size={18} color="#FF4D4D" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.circleBtn, styles.approveBtn]}
              onPress={onApprove}
            >
              <Ionicons name="checkmark" size={18} color="#4CD964" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.circleBtn, styles.detailsBtn]}
              onPress={onDetails}
            >
              <Ionicons name="play-forward" size={14} color="#85C1E9" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: { marginBottom: 4 },
  sectionTitle: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 14,
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: "#1A2232",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#242F42",
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(36, 47, 66, 0.6)",
  },
  actionSectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },
  leftLabelGroup: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconContainer: { width: 24, alignItems: "center", justifyContent: "center" },
  labelText: { color: "#E5E9F0", fontSize: 15, fontWeight: "500" },
  valueText: { fontSize: 15, fontWeight: "600" },
  buttonGroup: { flexDirection: "row", gap: 10 },
  circleBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#242F42",
    borderWidth: 1,
  },
  rejectBtn: { borderColor: "rgba(255, 77, 77, 0.3)" },
  approveBtn: { borderColor: "rgba(76, 217, 100, 0.3)" },
  detailsBtn: { borderColor: "rgba(133, 193, 233, 0.3)" },
});
