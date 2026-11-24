import { colors, type } from "@/constants/typography";
import {
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  POLICY_FOOTER,
  POLICY_TITLE,
  POLICY_UPDATED,
  PRIVACY_SECTIONS,
} from "./privacyContent";
import { useBackNavigation } from "./useBackNavigation";

export default function PrivacyPolicyScreen() {
  useBackNavigation("/(tabs)/settings");
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{POLICY_TITLE}</Text>
        <Text style={styles.updated}>{POLICY_UPDATED}</Text>

        {PRIVACY_SECTIONS.map((section) => (
          <View key={section.title} style={styles.card}>
            <Text style={styles.heading}>{section.title}</Text>

            {section.body?.map((p, i) => (
              <Text key={i} style={styles.body}>
                {p}
              </Text>
            ))}

            {section.definitions?.map((d) => (
              <Text key={d.term} style={styles.body}>
                <Text style={styles.term}>{d.term} </Text>
                {d.text}
              </Text>
            ))}

            {section.links?.map((l) => (
              <TouchableOpacity
                key={l.url}
                onPress={() => void Linking.openURL(l.url)}
              >
                <Text style={[styles.body, styles.link]}>{l.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <Text style={styles.footer}>{POLICY_FOOTER}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%",
    alignSelf: "center",
  },
  scroll: { padding: 16, paddingBottom: 40, gap: 12 },
  title: { ...type.title, color: colors.textPrimary },
  updated: { ...type.sublabel, color: colors.textMuted, marginLeft: 2 },
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 16,
    gap: 10,
  },
  heading: { ...type.body, color: colors.accent },
  body: {
    ...type.label,
    fontWeight: "400",
    lineHeight: 24,
    color: colors.textPrimary,
  },
  term: { fontWeight: "700", color: colors.textPrimary },
  link: { color: colors.accent, textDecorationLine: "underline" },
  footer: {
    ...type.sublabel,
    color: colors.textMuted,
    textAlign: "center",
    marginTop: 8,
  },
});
