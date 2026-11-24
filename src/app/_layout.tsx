// app/_layout.tsx
import { NavigationProvider } from "@/context/NavigationContext";
import { Stack, usePathname, useRouter } from "expo-router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setRole, store } from "../store";
import { bootstrapAuthSession } from "../store/authSlice";
import { RoleContextType, UserRole } from "../types/navigation";

import LockScreen from "../components/ui/settings/LockScreen";
import { useBiometricLock } from "../components/ui/settings/UseBiometricLock";

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const useUserRole = () => {
  const context = useContext(RoleContext);
  if (!context)
    throw new Error("useUserRole must be used inside a RoleProvider");
  return context;
};

function RootLayoutContent() {
  const {
    isAuthenticated,
    hasOnboarded,
    isInitializing,
    isInitWorkflowComplete,
  } = useAppSelector((state) => state.auth);
  const { currentRole } = useAppSelector((state) => state.role);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    void dispatch(bootstrapAuthSession());
  }, [dispatch]);

  // Handles high-level redirection boundaries safely
  useEffect(() => {
    if (isInitializing) return;

    // --- CASE A: ONBOARDING CAROUSEL ENFORCEMENT ---
    if (!hasOnboarded) {
      if (pathname !== "/") {
        router.replace("/");
      }
      return;
    }
    // --- CASE B: UNAUTHENTICATED USER GATEKEEPING ---
    if (!isAuthenticated) {
      // Rule 1: If the users explicitly chose Guest Mode, we let them browse the public search catalog
      if (currentRole === "guest") {
        if (pathname !== "/search-property") {
          router.replace("/search-property" as any);
        }
        return;
      }

      // Rule 2: Standard unauthenticated returning users are locked to Welcome or Signin paths
      const isPublicAuthArea =
        pathname === "/welcome-screen" ||
        pathname.startsWith("/signin") ||
        pathname === "/debug-screen";
      if (!isPublicAuthArea) {
        router.replace("/welcome-screen" as any);
      }
      return;
    }

    // --- CASE C: AUTHENTICATED BUT POST-AUTH SETUP INCOMPLETE ---
    if (!isInitWorkflowComplete) {
      if (pathname !== "/init-screen") {
        router.replace("/(auth)/init-screen" as any);
      }
      return;
    }

    // --- CASE D: FULLY AUTHENTICATED CORE EXPERIENCE GATEWAY ---

    if (
      pathname === "/welcome-screen" ||
      pathname.startsWith("/signin") ||
      pathname === "/init-screen"
    ) {
      router.replace("/(tabs)");
    }
  }, [
    isAuthenticated,
    hasOnboarded,
    isInitializing,
    isInitWorkflowComplete,
    currentRole,
    pathname,
    router,
  ]);

  const { locked, unlock } = useBiometricLock({
    ready: !isInitializing,
    active: isAuthenticated,
  });

  const roleContextValue = useMemo<RoleContextType>(
    () => ({
      currentRole,
      setCurrentRole: (role: UserRole | "guest") => dispatch(setRole(role)),
      isDrawerOpen,
      setIsDrawerOpen,
    }),
    [currentRole, dispatch, isDrawerOpen],
  );

  if (isInitializing) return null;

  return (
    <RoleContext.Provider value={roleContextValue}>
      <View style={{ flex: 1, backgroundColor: "#121824" }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(public)" />
          <Stack.Screen name="(auth)/signin" />
          <Stack.Screen name="(auth)/init-screen" />
          <Stack.Screen name="(tabs)" />

          <Stack.Screen
            name="tutorials"
            options={{
              headerShown: true,
              title: "Tutorials",
              headerStyle: { backgroundColor: "#1c2431" },
              headerTintColor: "#ffffff",
              headerShadowVisible: false,
            }}
          />

          <Stack.Screen
            name="tutorial/[id]"
            options={{
              headerShown: true,
              title: "Tutorial",
              headerStyle: { backgroundColor: "#1c2431" },
              headerTintColor: "#ffffff",
              headerShadowVisible: false,
            }}
          />

          <Stack.Screen
            name="privacy-policy"
            options={{
              headerShown: true,
              title: "Privacy policy",
              headerStyle: { backgroundColor: "#1c2431" },
              headerTintColor: "#ffffff",
              headerShadowVisible: false,
            }}
          />

          <Stack.Screen
            name="feedback"
            options={{
              headerShown: true,
              title: "Feedback",
              headerStyle: { backgroundColor: "#1c2431" },
              headerTintColor: "#ffffff",
              headerShadowVisible: false,
            }}
          />
        </Stack>
        {locked && <LockScreen onUnlock={unlock} />}
      </View>
    </RoleContext.Provider>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationProvider>
          <RootLayoutContent />
        </NavigationProvider>
      </PaperProvider>
    </Provider>
  );
}
