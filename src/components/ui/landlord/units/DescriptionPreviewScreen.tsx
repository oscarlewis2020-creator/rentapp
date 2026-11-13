import { Ionicons } from "@expo/vector-icons";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface DescriptionPreviewScreenProps {
  onBack: () => void;
  basicInfo: string;
  interiorFeatures: string;
  exteriorFeatures: string;
  additionalSection: string;
}

export default function DescriptionPreviewScreen({
  onBack,
  basicInfo,
  interiorFeatures,
  exteriorFeatures,
  additionalSection,
}: DescriptionPreviewScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#F1F5F9" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Unit description preview</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>1. Basic Info</Text>
          <View style={styles.divider} />
          <Text style={styles.bodyText}>{basicInfo}</Text>

          <Text style={[styles.sectionTitle, { marginTop: 16 }]}>
            2. Interior Features
          </Text>
          <View style={styles.divider} />
          <Text style={styles.bodyText}>{interiorFeatures}</Text>

          <Text style={[styles.sectionTitle, { marginTop: 16 }]}>
            3. Exterior Features
          </Text>
          <View style={styles.divider} />
          <Text style={styles.bodyText}>{exteriorFeatures}</Text>

          <Text style={[styles.sectionTitle, { marginTop: 16 }]}>
            4. Additional Notes
          </Text>
          <View style={styles.divider} />
          <Text style={styles.bodyText}>
            {additionalSection || "No additional notes provided."}
          </Text>
        </View>
      </ScrollView>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#1E252D",
    gap: 16,
  },
  backBtn: { padding: 4 },
  headerTitle: { color: "#F1F5F9", fontSize: 18, fontWeight: "500" },
  scrollContent: { padding: 16, paddingBottom: 40 },
  card: {
    backgroundColor: "#1E252D",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },
  sectionTitle: { color: "#F8FAFC", fontSize: 16, fontWeight: "600" },
  divider: { height: 1, backgroundColor: "#475569", marginVertical: 10 },
  bodyText: { color: "#CBD5E1", fontSize: 14, lineHeight: 20 },
});
