import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AnalyticsUnitsViewProps {
  monthsList: string[];
  onViewDetailedPerformancePress: () => void;
}

export default function AnalyticsUnitsView({
  monthsList,
  onViewDetailedPerformancePress,
}: AnalyticsUnitsViewProps) {
  return (
    <View style={styles.container}>
      <View style={styles.unitsSectionCard}>
        <Text style={styles.unitsCardMainTitle}>
          Current unit occupancy distribution
        </Text>
        <View style={styles.pieChartPlaceholderShape} />
        <View style={styles.unitsGridDistributionRow}>
          <View style={styles.distributionDetailBox}>
            <View style={styles.legendDotRow}>
              <View
                style={[styles.indicatorDot, { backgroundColor: "#ff9999" }]}
              />
              <Text style={styles.distributionTitleText}>Vacant (100%)</Text>
            </View>
            <Text style={styles.distributionValueText}>20 units</Text>
          </View>
          <View style={styles.distributionDetailBox}>
            <View style={styles.legendDotRow}>
              <View
                style={[styles.indicatorDot, { backgroundColor: "#00a878" }]}
              />
              <Text style={styles.distributionTitleText}>Occupied (0%)</Text>
            </View>
            <Text style={styles.distributionValueText}>0 units</Text>
          </View>
        </View>
      </View>

      <Text style={styles.chartBlockTitleText}>
        Monthly unit occupancy distribution
      </Text>
      <View style={styles.chartWrapperContainer}>
        <View style={styles.chartCanvasContainer}>
          {[
            "10.0",
            "9.0",
            "8.0",
            "7.0",
            "6.0",
            "5.0",
            "4.0",
            "3.0",
            "2.0",
            "1.0",
            "0.0",
          ].map((label, i) => (
            <View key={i} style={styles.chartGridLineRow}>
              <Text style={styles.chartYAxisLabel}>{label}</Text>
              <View style={styles.dashedLineMeshVector} />
            </View>
          ))}
          <View
            style={[
              styles.chartHorizontalZeroLineIndicator,
              { backgroundColor: "#86d3ff" },
            ]}
          />
        </View>
        <View style={styles.chartXAxisMonthsRow}>
          {monthsList.slice(0, 6).map((month) => (
            <Text key={month} style={styles.chartXAxisLabelText}>
              {month}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.unitsGridDistributionRow}>
        <View
          style={[
            styles.distributionDetailBox,
            { backgroundColor: "#1c2431", height: 110, padding: 16 },
          ]}
        >
          <View
            style={[
              styles.indicatorDot,
              { backgroundColor: "#86d3ff", marginBottom: 12 },
            ]}
          />
          <Text style={[styles.distributionTitleText, { color: "#ffffff" }]}>
            Actual occupancy
          </Text>
        </View>
        <View
          style={[
            styles.distributionDetailBox,
            { backgroundColor: "#1c2431", height: 110, padding: 16 },
          ]}
        >
          <View
            style={[
              styles.indicatorDot,
              { backgroundColor: "#ff9999", marginBottom: 12 },
            ]}
          />
          <Text
            style={[
              styles.distributionTitleText,
              { color: "#ffffff", textAlign: "center" },
            ]}
          >
            Expected occupancy when full (20)
          </Text>
        </View>
      </View>

      <View style={styles.performanceActionContainerCard}>
        <Text style={styles.performanceCardHeaderTitle}>Unit performance</Text>
        <Text style={styles.performanceCardBodyParagraphText}>
          View detailed performance metrics for individual units including
          revenue and occupancy status. Search units to identify top performers
          and units requiring attention.
        </Text>
        <TouchableOpacity
          style={styles.performancePrimaryActionButton}
          onPress={onViewDetailedPerformancePress}
        >
          <Text style={styles.performancePrimaryActionButtonText}>
            View detailed unit performance
          </Text>
        </TouchableOpacity>
      </View>
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
  },
  chartXAxisMonthsRow: {
    flexDirection: "row",
    marginLeft: 32,
    justifyContent: "space-around",
    marginTop: 8,
  },
  chartXAxisLabelText: { color: "#8a94a6", fontSize: 12.5, fontWeight: "500" },
  unitsSectionCard: {
    backgroundColor: "#1c2431",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#252f41",
    alignItems: "center",
  },
  unitsCardMainTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "500",
    alignSelf: "flex-start",
    marginBottom: 32,
    lineHeight: 26,
  },
  pieChartPlaceholderShape: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "#ff9999",
    marginBottom: 40,
  },
  unitsGridDistributionRow: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
    marginBottom: 12,
  },
  distributionDetailBox: {
    flex: 1,
    backgroundColor: "#161c24",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#252f41",
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  legendDotRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    gap: 8,
  },
  indicatorDot: { width: 12, height: 12, borderRadius: 6 },
  distributionTitleText: { color: "#8a94a6", fontSize: 13, fontWeight: "500" },
  distributionValueText: { color: "#ffffff", fontSize: 16, fontWeight: "700" },
  performanceActionContainerCard: {
    backgroundColor: "#1c2431",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#252f41",
    marginTop: 24,
  },
  performanceCardHeaderTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 12,
  },
  performanceCardBodyParagraphText: {
    color: "#8a94a6",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 24,
  },
  performancePrimaryActionButton: {
    backgroundColor: "#2d384a",
    borderWidth: 1,
    borderColor: "#343e50",
    height: 46,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  performancePrimaryActionButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
});
