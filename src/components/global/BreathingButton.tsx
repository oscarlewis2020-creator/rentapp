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
          toValue: 1.03,
          duration: 1200,
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
    // 💡 FIX: Pressable is now the absolute outer wrapper.
    // This locks the touch hitbox securely at 100% width and 52px height on mobile.
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.wrapper, pressed && styles.pressed]}
      accessibilityRole="button"
    >
      {/* 💡 The animation scale is applied internally so it only alters the visual layers */}
      <Animated.View
        style={[
          styles.animatedContainer,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <Text variant="labelLarge" style={styles.text}>
          {label.toUpperCase()}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: 52, // Explicit uniform height matching your other welcome buttons
    backgroundColor: "#007AFF",
    borderRadius: 8,
    overflow: "hidden", // Keeps scaled internal layers from spilling out of borders
    ...Platform.select({
      web: {
        cursor: "pointer",
        userSelect: "none",
      },
    }),
    alignSelf: "stretch",
  },
  animatedContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    backgroundColor: "#007AFF", // Reinforce color fill on the animated layout matrix
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
