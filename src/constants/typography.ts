export const colors = {
  accent: "#85C1E9",
  textPrimary: "#E5E9F0",
  textMuted: "#7B889B",
  textSection: "#9EA5B1",
  card: "#1A2232",
  border: "#242F42",
  background: "#121824",
  dialogCard: "#223138",
  dialogTitle: "#EAECEE",
  dialogText: "#E1E5E7",
  radioBorder: "#B5C2C8",
  switchOn: "#00A884",
  danger: "#FF6B6B",
  warning: "#F5B14C",
  warningBg: "#3A2F1A",
  dangerBg: "#3A1F1F",
  dangerText: "#FF9A9A",
};

export const fontSize = {
  caption: 13,
  small: 12,
  label: 16,
  body: 17,
  title: 26,
  dialogTitle: 30,
} as const;

// Custom font: once you tell me the family names, add fontFamily here
export const type = {
  caption: {
    fontSize: fontSize.caption,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  sublabel: { fontSize: fontSize.small },
  label: { fontSize: fontSize.label, fontWeight: "500" },
  body: { fontSize: fontSize.body },
  title: { fontSize: fontSize.title },
  dialogTitle: { fontSize: fontSize.dialogTitle },
} as const;
