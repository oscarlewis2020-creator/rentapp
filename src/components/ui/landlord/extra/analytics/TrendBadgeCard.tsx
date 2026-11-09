import { StyleSheet, Text, View } from "react-native";

interface TrendBadgeCardProps {
  color: string;
  title: string;
  description: string;
}

export default function TrendBadgeCard({
  color,
  title,
  description,
}: TrendBadgeCardProps) {
  return (
    <View style={styles.cardRow}>
      <View style={[styles.colorDot, { backgroundColor: color }]} />
      <View style={styles.textContainer}>
        <Text style={styles.mainTitle}>{title}</Text>
        <Text style={styles.subtext}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardRow: {
    flexDirection: "row",
    padding: 14,
    backgroundColor: "#1c2431",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#252f41",
    alignItems: "flex-start",
  },
  colorDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 10,
    marginTop: 2,
  },
  textContainer: { flex: 1 },
  mainTitle: {
    color: "#4fa3f7",
    fontSize: 14.5,
    fontWeight: "600",
    marginBottom: 4,
  },
  subtext: { color: "#cbd5e1", fontSize: 12.5, lineHeight: 18 },
});
