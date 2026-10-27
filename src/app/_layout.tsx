// app/_layout.tsx

import { Stack, useRouter, useSegments } from "expo-router";
import { createContext, useContext, useEffect } from "react";
import { bootstrapAuthSession } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RoleContextType } from "../types/navigation";

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const useUserRole = () => {
  const context = useContext(RoleContext);
  if (!context)
    throw new Error("useUserRole must be used inside a RoleProvider");
  return context;
};

const PUBLIC_WHITELIST = ["welcome", "search-property", "debug-screen"];

function RootLayoutContent() {
  const {
    isAuthenticated,
    hasOnboarded,
    isInitializing,
    isInitWorkflowComplete,
  } = useAppSelector((state) => state.auth);

  const { currentRole } = useAppSelector((state) => state.role);
  const dispatch = useAppDispatch();
  const segments = useSegments() as string[];
  const router = useRouter();

  useEffect(() => {
    dispatch(bootstrapAuthSession());
  }, [dispatch]);

  useEffect(() => {
    if (isInitializing) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inPublicGroup = segments[0] === "(public)";
    const currentSubRoute = segments[1] || "";

    // Case A: Onboarding Carousel enforcement
    if (!hasOnboarded) {
      if (!inPublicGroup || currentSubRoute !== "") {
        router.replace("/");
      }
      return;
    }

    // Case B: Guest / Unauthenticated users
    if (!isAuthenticated) {
      if (inPublicGroup && PUBLIC_WHITELIST.includes(currentSubRoute)) {
        return;
      }
      if (!inAuthGroup) {
        router.replace("/(auth)/signin");
      }
      return;
    }

    // 🔥 Case C: Authenticated but Post-Auth Setup workflow is incomplete
    if (!isInitWorkflowComplete) {
      if (currentSubRoute !== "init-screen") {
        router.replace("/init-screen");
      }
      return;
    }

    // Case D: Fully authenticated, ready to use core dashboard tabs
    if (
      (inAuthGroup || inPublicGroup) &&
      currentSubRoute !== "search-property"
    ) {
      router.replace("/(tabs)");
    }
  }, [
    isAuthenticated,
    hasOnboarded,
    isInitializing,
    isInitWorkflowComplete,
    segments,
    router,
  ]);

  if (isInitializing) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(public)" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
