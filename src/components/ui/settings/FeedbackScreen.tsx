import { toastBus } from "@/constants/toastBus";
import { colors, type } from "@/constants/typography";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { HelperText, Menu, TextInput } from "react-native-paper";
import { useAppSelector } from "../../../hooks";
import ConfirmDialog from "./ConfirmDialog";
import { useBackNavigation } from "./useBackNavigation";

const SUBJECTS = [
  "Bug Report",
  "Feature Request",
  "Usability",
  "Security",
  "Performance",
  "Complaint",
  "Commend app",
  "Other",
];

interface FeedbackPayload {
  subject: string;
  comments: string;
  role: string;
  platform: string;
  appVersion: string;
}

// TODO: replace with your API call once the endpoint exists
async function submitFeedback(payload: FeedbackPayload): Promise<void> {
  console.log("Feedback payload:", payload);
  await new Promise((resolve) => setTimeout(resolve, 800));
}

const inputTheme = {
  colors: {
    onSurfaceVariant: colors.textMuted,
    error: "#F4A6A6",
  },
};

export default function FeedbackScreen() {
  useBackNavigation("/(tabs)/settings");
  const router = useRouter();
  const { currentRole } = useAppSelector((s) => s.role);

  const [subject, setSubject] = useState("");
  const [comments, setComments] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuWidth, setMenuWidth] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const subjectError = submitted && !subject;
  const commentError = submitted && comments.trim().length === 0;

  const handleSubmit = async () => {
    setSubmitted(true);
    if (!subject || comments.trim().length === 0 || sending) return;

    setSending(true);
    try {
      await submitFeedback({
        subject,
        comments: comments.trim(),
        role: currentRole,
        platform: Platform.OS,
        appVersion: Constants.expoConfig?.version ?? "unknown",
      });
      toastBus.show("Submitted");
      if (router.canGoBack()) router.back();
      else router.replace("/(tabs)/settings" as any);
    } catch (e) {
      console.log("Error sending feedback:", e);
      setError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View onLayout={(e) => setMenuWidth(e.nativeEvent.layout.width)}>
            <Menu
              visible={menuOpen}
              onDismiss={() => setMenuOpen(false)}
              anchorPosition="bottom"
              contentStyle={[styles.menu, { width: menuWidth }]}
              anchor={
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setMenuOpen(true)}
                >
                  <View pointerEvents="none">
                    <TextInput
                      mode="outlined"
                      label="Subject"
                      value={subject}
                      editable={false}
                      error={subjectError}
                      style={styles.input}
                      outlineColor={colors.textSection}
                      textColor={colors.textPrimary}
                      theme={inputTheme}
                      right={<TextInput.Icon icon="menu-down" />}
                    />
                  </View>
                </TouchableOpacity>
              }
            >
              {SUBJECTS.map((s) => (
                <Menu.Item
                  key={s}
                  title={s}
                  titleStyle={[
                    styles.menuText,
                    s === subject && { color: colors.accent },
                  ]}
                  style={styles.menuItem}
                  onPress={() => {
                    setSubject(s);
                    setMenuOpen(false);
                  }}
                />
              ))}
            </Menu>
          </View>
          <HelperText
            type={subjectError ? "error" : "info"}
            style={styles.helper}
          >
            {subjectError
              ? "Please select a subject"
              : "Select a subject from the dropdown"}
          </HelperText>

          <TextInput
            mode="outlined"
            label="Comments"
            value={comments}
            onChangeText={setComments}
            multiline
            numberOfLines={4}
            error={commentError}
            style={[styles.input, styles.comments]}
            outlineColor={colors.textSection}
            activeOutlineColor={colors.accent}
            textColor={colors.textPrimary}
            theme={inputTheme}
            left={<TextInput.Icon icon="comment-quote" color={colors.accent} />}
          />
          {commentError && (
            <HelperText type="error" style={styles.helper}>
              Please provide a comment
            </HelperText>
          )}

          <TouchableOpacity
            style={styles.submit}
            onPress={handleSubmit}
            disabled={sending}
            activeOpacity={0.8}
          >
            {sending ? (
              <ActivityIndicator color={colors.background} />
            ) : (
              <Text style={styles.submitText}>Submit</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      <ConfirmDialog
        visible={error}
        title="Couldn't send"
        message="Check your connection and try again. Your message is still here."
        confirmLabel="OK"
        onConfirm={() => setError(false)}
        onCancel={() => setError(false)}
      />
    </KeyboardAvoidingView>
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
  scroll: { flexGrow: 1, justifyContent: "center", padding: 16 },
  card: {
    backgroundColor: colors.card,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
  },
  input: { backgroundColor: colors.background },
  comments: { minHeight: 96 },
  helper: { ...type.sublabel, color: colors.textSection, marginBottom: 6 },
  menu: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.textSection,
    borderRadius: 4,
    paddingVertical: 0,
  },
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    maxWidth: "100%",
  },
  menuText: { ...type.body, color: colors.textPrimary },
  submit: {
    alignSelf: "center",
    minWidth: 160,
    backgroundColor: colors.accent,
    borderRadius: 28,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: "center",
    marginTop: 16,
  },
  submitText: { ...type.label, color: colors.background },
});
