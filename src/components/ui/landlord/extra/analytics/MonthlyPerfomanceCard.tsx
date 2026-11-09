import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface MonthlyPerformanceCardProps {
  month: string;
  onPress: (month: string) => void;
}

export default function MonthlyPerformanceCard({
  month,
  onPress,
}: MonthlyPerformanceCardProps) {
  return (
    <View style={styles.logCard}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.monthTitle}>{month}</Text>
          <Text style={styles.currencyValue}>KES 0 / 0</Text>
        </View>
        <View style={styles.zeroBadge}>
          <Text style={styles.zeroText}>0</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.actionButton}
        activeOpacity={0.7}
        onPress={() => onPress(month)}
      >
        <Text style={styles.actionButtonText}>View monthly performance</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logCard: {
    backgroundColor: "#1c2431",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#252f41",
    padding: 16,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  monthTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  currencyValue: { color: "#cbd5e1", fontSize: 14 },
  zeroBadge: {
    width: 22,
    height: 22,
    backgroundColor: "#00a878",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  zeroText: { color: "#ffffff", fontSize: 12, fontWeight: "700" },
  actionButton: {
    backgroundColor: "#2d384a",
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#343e50",
    ...Platform.select({ web: { cursor: "pointer" } }),
  },
  actionButtonText: { color: "#ffffff", fontSize: 14, fontWeight: "500" },
});
