// app/_layout.tsx
import { Stack, usePathname, useRouter } from "expo-router"; // 💡 Add usePathname to prevent layout loops
import { createContext, useContext, useEffect, useState } from "react";
import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setRole, store } from "../store";
import { bootstrapAuthSession } from "../store/authSlice";
import { RoleContextType, UserRole } from "../types/navigation";

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
  const pathname = usePathname(); // 💡 Track current position safely
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(bootstrapAuthSession());
  }, [dispatch]);

  // 💡 Root Firewall: Handles high-level redirection boundaries safely
  useEffect(() => {
    if (isInitializing) return;

    // --- CASE A: ONBOARDING CAROUSEL ENFORCEMENT ---
    if (!hasOnboarded) {
      if (pathname !== "/") {
        router.replace("/");
      }
      return;
    }

    // --- CASE B: 🔥 CORRECTED SECURITY FIREWALL FOR UN-AUTHENTICATED STRREAMS ---
    if (!isAuthenticated) {
      // Rule 1: If they explicitly chose Guest Mode, let them browse the public search catalog
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
        router.replace("/welcome-screen" as any); // 🛡️ Securely anchors them to the front door
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
    // If they are hanging around on the landing screens, push them straight into dashboard tabs
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

  if (isInitializing) return null;

  const roleContextValue: RoleContextType = {
    currentRole,
    setCurrentRole: (role: UserRole | "guest") => dispatch(setRole(role)),
    isDrawerOpen,
    setIsDrawerOpen,
  };

  return (
    <RoleContext.Provider value={roleContextValue}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(public)" />
        <Stack.Screen name="(auth)/signin" />
        <Stack.Screen name="(auth)/init-screen" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </RoleContext.Provider>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <RootLayoutContent />
      </PaperProvider>
    </Provider>
  );
}
