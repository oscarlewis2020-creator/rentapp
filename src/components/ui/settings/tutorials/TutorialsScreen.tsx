import { colors, type } from "@/constants/typography";
import { useAppSelector } from "../../../../hooks";
import { TAB_LABELS, TUTORIALS, TutorialTab } from "./tutorialsData";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBackNavigation } from "../useBackNavigation";

export default function TutorialsScreen() {
  const router = useRouter();
  const { currentRole } = useAppSelector((s) => s.role);
  const pathname = usePathname();

  useBackNavigation("/settings");

  const [tab, setTab] = useState<TutorialTab>(
    currentRole === "landlord" ? "landlord" : "tenant",
  );

  useEffect(() => {
    console.log("Tutorials mounted at:", pathname);
    return () => console.log("Tutorials unmounted");
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.segmentWrap}>
        <View style={styles.segment}>
          {TAB_LABELS.map(({ key, label }, i) => {
            const active = tab === key;
            return (
              <TouchableOpacity
                key={key}
                style={[
                  styles.segmentBtn,
                  i > 0 && styles.segmentDivider,
                  active && styles.segmentActive,
                ]}
                onPress={() => setTab(key)}
                activeOpacity={0.8}
              >
                <Text style={styles.segmentText}>{label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <ScrollView
        key={tab} // resets scroll position when switching tabs
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {TUTORIALS[tab].map((section) => (
          <View key={section.title} style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.iconCircle}>
                <MaterialCommunityIcons
                  name={section.icon}
                  size={16}
                  color="#121824"
                />
              </View>
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>

            {section.items.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.row}
                activeOpacity={0.7}
                onPress={() =>
                  router.push({
                    pathname: "/tutorial/[id]",
                    params: { id: item.id },
                  } as any)
                }
              >
                <Text style={styles.rowText}>{item.label}</Text>
                <View style={styles.chevron}>
                  <Ionicons name="chevron-forward" size={12} color="#121824" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
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
  segmentWrap: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: colors.background,
    zIndex: 10,
  },
  segment: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    overflow: "hidden",
  },
  segmentBtn: { flex: 1, paddingVertical: 14, alignItems: "center" },
  segmentDivider: { borderLeftWidth: 1, borderLeftColor: colors.border },
  segmentActive: { backgroundColor: "#2F4352" },
  segmentText: { ...type.label, color: colors.textPrimary },

  content: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 40 },
  section: { marginBottom: 20 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    marginLeft: 4,
    gap: 10,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },

  sectionTitle: {
    ...type.caption,
    color: colors.textSection,
    textTransform: "uppercase",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  rowText: {
    ...type.label,
    color: colors.textPrimary,
    flex: 1,
    paddingRight: 12,
  },
  chevron: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
});
