import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";
import { BackHandler } from "react-native";

// This enables the device hardware back button functionality
export function useBackNavigation(fallbackPath: string) {
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const sub = BackHandler.addEventListener("hardwareBackPress", () => {
        if (router.canGoBack()) router.back();
        else router.replace(fallbackPath as any);
        return true;
      });
      return () => sub.remove();
    }, [router, fallbackPath]),
  );
}
