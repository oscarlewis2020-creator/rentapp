import { colors, type } from "@/constants/typography";
import { StyleSheet } from "react-native";

export const DIALOG_ACCENT = colors.accent;
export const DIALOG_HIT_SLOP = { top: 10, bottom: 10, left: 10, right: 10 };

export const dialogStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  container: {
    width: "100%",
    maxWidth: 450,

    backgroundColor: colors.dialogCard,
    borderRadius: 45,
    paddingHorizontal: 30,
    paddingVertical: 45,
  },
  title: {
    ...type.dialogTitle,

    color: colors.dialogTitle,
    textAlign: "center",
    marginBottom: 40,
  },
  message: {
    ...type.body,

    color: colors.dialogText,
    lineHeight: 27,
    marginBottom: 25,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 45,
    marginTop: 35,
  },
  actionText: {
    ...type.body,
    color: DIALOG_ACCENT,
    textTransform: "uppercase",
  },

  destructiveText: { color: colors.danger },
});
