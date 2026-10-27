import { useEffect, useRef } from "react";
import { Animated, Platform, Pressable, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export function BreathingButton({
  onPress,
  label,
}: {
  onPress: () => void;
  label: string;
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const breatheAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05, // 💡 Reduced from 1.1 to prevent layout clipping/overlap
          duration: 1200, // Slightly slower breathing rate looks more premium
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]),
    );

    breatheAnimation.start();

    return () => breatheAnimation.stop();
  }, [scaleAnim]);

  return (
    <Animated.View
      style={[styles.container, { transform: [{ scale: scaleAnim }] }]}
    >
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        // 💡 Fixes web cursor appearance
        accessibilityRole="button"
      >
        <Text variant="labelLarge" style={styles.text}>
          {label.toUpperCase()}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // 💡 Margin accounts for the scale animation breathing room
    marginVertical: 4,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007AFF", // Adjust to match your theme primary color
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      web: {
        cursor: "pointer",
        userSelect: "none",
      },
    }),
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    color: "#FFF",
    fontWeight: "700",
    letterSpacing: 1,
  },
});
