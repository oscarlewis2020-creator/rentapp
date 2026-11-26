// components/ui/landlord/lease/ServiceCostTariffsModal.tsx
import { Ionicons } from "@expo/vector-icons";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "react-native-paper";

export interface TariffBracket {
  min: number;
  max: number;
  cost: number;
}

export const MPESA_SERVICE_TARIFFS: TariffBracket[] = [
  { min: 10, max: 999, cost: 25 },
  { min: 1000, max: 1499, cost: 35 },
  { min: 2001, max: 5000, cost: 45 },
  { min: 5001, max: 10000, cost: 50 },
  { min: 10001, max: 20000, cost: 80 },
  { min: 20001, max: 50000, cost: 100 },
  { min: 50001, max: 100000, cost: 140 },
  { min: 100001, max: 200000, cost: 170 },
  { min: 200001, max: 240000, cost: 220 },
];

export function calculateServiceCost(amount: number): number {
  if (!amount || amount <= 0) return 0;
  const matched = MPESA_SERVICE_TARIFFS.find(
    (b) => amount >= b.min && amount <= b.max,
  );
  if (matched) return matched.cost;
  if (amount > 240000) return 220;
  return 25;
}

interface ServiceCostTariffsModalProps {
  visible: boolean;
  tariffs?: TariffBracket[];
  onClose: () => void;
}

export default function ServiceCostTariffsModal({
  visible,
  tariffs = MPESA_SERVICE_TARIFFS,
  onClose,
}: ServiceCostTariffsModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <Pressable style={styles.backdropDismiss} onPress={onClose} />

        <View style={styles.sheetContainer}>
          {/* Top Drag Handle & Close Icon */}
          <View style={styles.topHeader}>
            <View style={styles.dragHandle} />
            <Pressable onPress={onClose} hitSlop={10} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color="#E2E8F0" />
            </Pressable>
          </View>

          <Text style={styles.modalTitle}>Service Cost</Text>

          {/* Sticky / Persistent Header */}
          <View style={styles.tariffsBanner}>
            <Text style={styles.tariffsHeading}>Tariffs</Text>
            <View style={styles.columnsHeaderRow}>
              <Text style={[styles.colHeaderText, styles.colLeft]}>Min</Text>
              <Text style={[styles.colHeaderText, styles.colCenter]}>Max</Text>
              <Text style={[styles.colHeaderText, styles.colRight]}>
                Service Cost
              </Text>
            </View>
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Tariff Brackets Table */}
            <View style={styles.tableBox}>
              {tariffs.map((row, index) => (
                <View
                  key={`${row.min}-${row.max}`}
                  style={[
                    styles.tableRow,
                    index < tariffs.length - 1 && styles.tableRowDivider,
                  ]}
                >
                  <Text style={[styles.cellMinMax, styles.colLeft]}>
                    {row.min}
                  </Text>
                  <Text style={[styles.cellMinMax, styles.colCenter]}>
                    {row.max}
                  </Text>
                  <Text style={[styles.cellCost, styles.colRight]}>
                    {row.cost}
                  </Text>
                </View>
              ))}
            </View>

            {/* Explanation Copy */}
            <Text style={styles.explanationText}>
              The service fee covers the cost of processing your payment. Since
              the management has opted for the tenant to cover this fee, it will
              be added to your total payment. For example, if your rent is
              10,000 and the service fee is 100, you&apos;ll pay a total of
              10,100, ensuring the landlord receives the full rent amount.
            </Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    justifyContent: "flex-end",
  },
  backdropDismiss: {
    flex: 1,
  },
  sheetContainer: {
    backgroundColor: "#04506E",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%",
    alignSelf: "center",
    maxHeight: "90%",
  },
  topHeader: {
    paddingTop: 10,
    paddingHorizontal: 18,
    alignItems: "center",
  },
  dragHandle: {
    width: 34,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#08222E",
    marginBottom: 4,
  },
  closeBtn: {
    alignSelf: "flex-end",
    padding: 4,
  },
  modalTitle: {
    color: "#F8FAFC",
    fontSize: 22,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 14,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  tariffsBanner: {
    backgroundColor: "#21262B",
    paddingTop: 14,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  tariffsHeading: {
    color: "#F8FAFC",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 14,
  },
  columnsHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  colHeaderText: {
    color: "#CBD5E1",
    fontSize: 15,
    fontWeight: "500",
  },
  colLeft: {
    flex: 1,
    textAlign: "left",
  },
  colCenter: {
    flex: 1,
    textAlign: "center",
  },
  colRight: {
    flex: 1.2,
    textAlign: "right",
  },
  tableBox: {
    backgroundColor: "#252A30",
    marginHorizontal: 8,
    borderRadius: 6,
    overflow: "hidden",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 15,
  },
  tableRowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "#333942",
  },
  cellMinMax: {
    color: "#F1F5F9",
    fontSize: 16,
    fontWeight: "500",
  },
  cellCost: {
    color: "#38BDF8",
    fontSize: 16,
    fontWeight: "600",
  },
  explanationText: {
    color: "#F1F5F9",
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: 16,
    paddingTop: 18,
  },
});
