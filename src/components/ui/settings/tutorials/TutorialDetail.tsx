import { colors, fontSize } from "@/constants/typography";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import VideoPlayer from "./VideoPlayer";

import { useBackNavigation } from "../useBackNavigation";
import LeaseStatusGuide from "./LeaseStatusGuide";
import { extractYouTubeId, TUTORIAL_CONTENT } from "./tutorialContent";
import { findTutorial } from "./tutorialsData";

function VideoBox({ videoId }: { videoId?: string }) {
  const { width } = useWindowDimensions();
  const [failed, setFailed] = useState(false);

  const boxWidth = Math.min(width, Platform.OS === "web" ? 600 : width) - 32;
  const boxHeight = Math.round((boxWidth * 9) / 16);

  if (!videoId || failed) {
    return (
      <View style={[styles.videoFallback, { height: boxHeight }]}>
        <Text style={styles.videoFallbackText}>Video unavailable</Text>
      </View>
    );
  }

  return (
    <View style={[styles.videoWrap, { height: boxHeight }]}>
      <VideoPlayer
        videoId={videoId}
        width={boxWidth}
        height={boxHeight}
        onError={() => setFailed(true)}
      />
    </View>
  );
}

export default function TutorialDetail() {
  useBackNavigation("/tutorials");
  const { id } = useLocalSearchParams<{ id: string }>();
  const tutorial = findTutorial(String(id));
  const content = TUTORIAL_CONTENT[String(id)];

  if (String(id) === "g-status-1") {
    return (
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <Stack.Screen options={{ title: "Understanding Lease Statuses" }} />
        <LeaseStatusGuide />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <Stack.Screen
        options={{ title: content?.pageTitle ?? tutorial?.label ?? "Tutorial" }}
      />
      <ScrollView contentContainerStyle={styles.scroll}>
        {!content ? (
          <View style={styles.card}>
            <Text style={styles.heading}>Tutorial content coming soon.</Text>
          </View>
        ) : (
          <>
            {/* <VideoBox videoId={content.videoId} /> */}
            <VideoBox videoId={extractYouTubeId(content.videoId)} />

            <View style={[styles.card, styles.headingCard]}>
              <Text style={styles.heading}>
                Here are the steps you need to follow:
              </Text>
            </View>

            {content.groups.map((group, gi) => (
              <View key={gi} style={[styles.card, styles.stepsCard]}>
                {group.title ? (
                  <Text style={styles.groupTitle}>{group.title}</Text>
                ) : null}
                {group.steps.map((step, i) => (
                  <Text key={i} style={styles.step}>
                    {i + 1}. {step}
                  </Text>
                ))}
              </View>
            ))}
          </>
        )}
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

  videoWrap: { borderRadius: 10, overflow: "hidden", backgroundColor: "#000" },
  videoFallback: {
    borderRadius: 10,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  videoFallbackText: { fontSize: fontSize.label, color: colors.textMuted },

  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
  },
  headingCard: { paddingVertical: 18, paddingHorizontal: 16 },
  heading: {
    fontSize: fontSize.body,
    color: colors.textPrimary,
    textAlign: "center",
  },
  stepsCard: { padding: 16, gap: 14 },
  groupTitle: {
    fontSize: fontSize.body,
    color: colors.textPrimary,
    textAlign: "center",
  },
  step: {
    fontSize: fontSize.label,
    lineHeight: 24,
    color: colors.textPrimary,
  },
});
