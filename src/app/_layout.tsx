// app/_layout.tsx
// import { PowerSyncContext } from "@powersync/react";
import { Stack, useRouter, useSegments } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
// import { db } from "../db/client";
import { setRole } from "../store";
import { bootstrapAuthSession } from "../store/authSlice"; // Corrected thunk name match
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RoleContextType, UserRole } from "../types/navigation";

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const useUserRole = () => {
  const context = useContext(RoleContext);
  if (!context)
    throw new Error("useUserRole must be used inside a RoleProvider");
  return context;
};

function RootLayoutContent() {
  // 💡 Destructure matches 'isInitializing' from the Redux state exactly
  const { isAuthenticated, hasOnboarded, isInitializing } = useAppSelector(
    (state) => state.auth,
  );

  // Destructure currentRole from your role slice
  const { currentRole } = useAppSelector((state) => state.role);

  // Keep UI-only layout state local
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const segments = useSegments();
  const router = useRouter();

  // 1. Trigger storage validation session on app launch
  useEffect(() => {
    dispatch(bootstrapAuthSession());
  }, [dispatch]);

  // 2. Continuous Route Protection Engine
  useEffect(() => {
    // Prevent any redirection evaluations during data loading
    if (isInitializing) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inOnboardingGroup = segments[0] === "(public)";

    if (!hasOnboarded) {
      if (!inOnboardingGroup) {
        router.replace("/(public)");
      }
    } else if (!isAuthenticated) {
      if (!inAuthGroup) {
        router.replace("/(auth)/signin");
      }
    } else if (inAuthGroup || inOnboardingGroup) {
      router.replace("/(tabs)");
    }
  }, [isAuthenticated, hasOnboarded, isInitializing, segments, router]);

  // 3. Prevent rendering anything until initialization states resolve
  if (isInitializing) {
    return null;
  }

  // Context mapping placeholder to update Redux role state
  const roleContextValue: RoleContextType = {
    currentRole,
    setCurrentRole: (role: UserRole) => dispatch(setRole(role)), // Clean and type-safe!
    isDrawerOpen,
    setIsDrawerOpen,
  };

  return (
    <RoleContext.Provider value={roleContextValue}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(public)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </RoleContext.Provider>
  );
}

import { StyleSheet, Text, View } from "react-native";

export default function PlaceholderScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Placeholder Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a",
  },
  text: {
    color: "#f8fafc",
    fontSize: 16,
  },
});
// Absolute App Entry Point
// export default function RootLayout() {
//   return (
//     <Provider store={store}>
//       {/* 📦 Connects the PowerSync context globally alongside Redux */}
//       <PowerSyncContext.Provider value={db}>
//         <RootLayoutContent />
//       </PowerSyncContext.Provider>
//     </Provider>
//   );
// }
