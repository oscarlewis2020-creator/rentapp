import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MonthlyPerformanceCard from "./MonthlyPerfomanceCard";
import TrendBadgeCard from "./TrendBadgeCard";

interface AnalyticsRevenueViewProps {
  monthsList: string[];
  onChangeCutoffPress: () => void;
  onMonthlyPerformancePress: (month: string) => void;
}

export default function AnalyticsRevenueView({
  monthsList,
  onChangeCutoffPress,
  onMonthlyPerformancePress,
}: AnalyticsRevenueViewProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.chartBlockTitleText}>
        Expected vs Actual revenues
      </Text>
      <View style={styles.chartWrapperContainer}>
        <View style={styles.chartCanvasContainer}>
          {["10", "8.8", "7.5", "6.3", "5", "3.8", "2.5", "1.3", "0"].map(
            (label, i) => (
              <View key={i} style={styles.chartGridLineRow}>
                <Text style={styles.chartYAxisLabel}>{label}</Text>
                <View style={styles.dashedLineMeshVector} />
              </View>
            ),
          )}
          <View style={styles.chartHorizontalZeroLineIndicator} />
        </View>
        <View style={styles.chartXAxisMonthsRow}>
          {monthsList.slice(0, 6).map((month) => (
            <Text key={month} style={styles.chartXAxisLabelText}>
              {month}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.legendCard}>
        <View style={styles.legendHeader}>
          <View style={[styles.indicatorDot, { backgroundColor: "#4fa3f7" }]} />
          <Text style={styles.legendTitle}>Actual revenue</Text>
        </View>
        <Text style={styles.legendDesc}>
          The total amount paid by leases that were active during each month.
        </Text>
      </View>
      <View style={styles.legendCard}>
        <View style={styles.legendHeader}>
          <View style={[styles.indicatorDot, { backgroundColor: "#ff9999" }]} />
          <Text style={styles.legendTitle}>Expected revenue</Text>
        </View>
        <Text style={styles.legendDesc}>
          The total amount that would have been paid if all active leases for
          each month made full (100%) payment.
        </Text>
      </View>

      <Text style={styles.chartBlockTitleText}>Monthly Payment trends</Text>
      <Text style={styles.cutoffDescriptionText}>
        Tenant payment trend data is based on a cutoff date of the{" "}
        <Text style={{ color: "#4fa3f7", fontWeight: "700" }}>10th</Text> of
        each month.
      </Text>
      <TouchableOpacity
        style={styles.actionLinkButton}
        onPress={onChangeCutoffPress}
      >
        <Text style={styles.actionLinkButtonText}>
          Change payment cutoff date
        </Text>
      </TouchableOpacity>

      <View style={styles.chartWrapperContainer}>
        <View style={styles.chartCanvasContainer}>
          {["40", "36", "32", "28", "0"].map((label, i) => (
            <View key={i} style={styles.chartGridLineRow}>
              <Text style={styles.chartYAxisLabel}>{label}</Text>
              <View style={styles.dashedLineMeshVector} />
            </View>
          ))}
        </View>
        <View style={styles.chartXAxisMonthsRow}>
          {["Jan", "Feb"].map((month) => (
            <Text key={month} style={styles.chartXAxisLabelText}>
              {month}
            </Text>
          ))}
        </View>
      </View>

      <View style={{ gap: 10, marginBottom: 28 }}>
        <TrendBadgeCard
          color="#00a878"
          title="Paid Fully On Time"
          description="Full rent paid on or before the cutoff date."
        />
        <TrendBadgeCard
          color="#4fa3f7"
          title="Paid Fully But Late"
          description="Full rent paid, but some or all was after the cutoff date."
        />
        <TrendBadgeCard
          color="#ff9f43"
          title="Paid Partially"
          description="Only part of the rent was paid for the month."
        />
        <TrendBadgeCard
          color="#ff9999"
          title="Paid Nothing"
          description="No rent was paid for the month."
        />
      </View>

      <Text style={styles.chartBlockTitleText}>
        Monthly Revenue Performance
      </Text>
      {monthsList.map((month) => (
        <MonthlyPerformanceCard
          key={month}
          month={month}
          onPress={onMonthlyPerformancePress}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%" },
  chartBlockTitleText: {
    color: "#ffffff",
    fontSize: 19,
    fontWeight: "500",
    marginTop: 24,
    marginBottom: 16,
  },
  chartWrapperContainer: {
    backgroundColor: "#1c2431",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#252f41",
    padding: 16,
    marginBottom: 24,
  },
  chartCanvasContainer: {
    width: "100%",
    height: 260,
    position: "relative",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  chartGridLineRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 20,
  },
  chartYAxisLabel: {
    color: "#cbd5e1",
    fontSize: 13,
    width: 32,
    textAlign: "right",
    paddingRight: 8,
  },
  dashedLineMeshVector: {
    flex: 1,
    height: 1,
    borderWidth: 0.5,
    borderColor: "#2d384a",
    borderStyle: "dashed",
  },
  chartHorizontalZeroLineIndicator: {
    position: "absolute",
    left: 32,
    right: 0,
    bottom: 10,
    height: 1.5,
    backgroundColor: "#ff9999",
  },
  chartXAxisMonthsRow: {
    flexDirection: "row",
    marginLeft: 32,
    justifyContent: "space-around",
    marginTop: 8,
  },
  chartXAxisLabelText: { color: "#8a94a6", fontSize: 12.5, fontWeight: "500" },
  legendCard: {
    backgroundColor: "#1c2431",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#252f41",
    marginBottom: 12,
  },
  legendHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  indicatorDot: { width: 14, height: 14, borderRadius: 7, marginRight: 10 },
  legendTitle: { color: "#4fa3f7", fontSize: 15, fontWeight: "600" },
  legendDesc: { color: "#cbd5e1", fontSize: 13.5, lineHeight: 20 },
  cutoffDescriptionText: {
    color: "#8a94a6",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  actionLinkButton: {
    alignSelf: "flex-end",
    paddingVertical: 4,
    marginBottom: 16,
  },
  actionLinkButtonText: {
    color: "#4fa3f7",
    fontSize: 14,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
