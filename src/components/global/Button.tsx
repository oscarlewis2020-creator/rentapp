import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

// 1. Define flexible component props
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  // Determine if interaction should be blocked
  const isDisabled = disabled || isLoading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      style={[
        styles.base,
        styles[variant],
        styles[size],
        isDisabled && styles.disabled,
        style, // Allows custom style overrides
      ]}
    >
      {isLoading ? (
        <ActivityIndicator
          color={variant === "outline" ? "#007AFF" : "#FFFFFF"}
        />
      ) : (
        <Text
          style={[
            styles.textBase,
            styles[`${variant}Text`],
            styles[`${size}Text`],
            isDisabled && styles.disabledText,
            textStyle, // Allows custom text overrides
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

// 2. Define structured, scannable styles
const styles = StyleSheet.create({
  // Base Button Layout
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  textBase: {
    fontWeight: "600",
    textAlign: "center",
  },

  // Color Variants
  primary: { backgroundColor: "#007AFF" },
  primaryText: { color: "#FFFFFF" },

  secondary: { backgroundColor: "#E5E5EA" },
  secondaryText: { color: "#1C1C1E" },

  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  outlineText: { color: "#007AFF" },

  // Size Configurations
  sm: { paddingVertical: 6, paddingHorizontal: 12 },
  smText: { fontSize: 14 },

  md: { paddingVertical: 12, paddingHorizontal: 24 },
  mdText: { fontSize: 16 },

  lg: { paddingVertical: 16, paddingHorizontal: 32 },
  lgText: { fontSize: 18 },

  // Disabled States
  disabled: {
    backgroundColor: "#D1D1D6",
    borderColor: "#D1D1D6",
  },
  disabledText: { color: "#8E8E93" },
});
