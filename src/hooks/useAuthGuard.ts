import { useRouter } from "expo-router";
import { setRole } from "../store";
import { logOutUser } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "./hooks"; // Adjust path to store typed hooks

export function useAuthGuard() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Read state parameters from your central slices
  const { currentRole } = useAppSelector((state) => state.role);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  /**
   * Wraps interactive actions.
   * Executes callback if authenticated; completely boots guests to login.
   */
  const executeProtectedAction = (action: () => void) => {
    if (!isAuthenticated || currentRole === "guest") {
      // 💡 1. Clear out runtime flags so the firewall engine resets cleanly
      dispatch(logOutUser());
      dispatch(setRole("tenant")); // Prep default role selection target on sign-in

      // 💡 2. Boot the anonymous client straight out to the authentication stack
      router.replace("/(auth)/signin" as any);
    } else {
      // Fully authenticated profile (tenant, landlord, sales) -> process event safely
      action();
    }
  };

  return {
    executeProtectedAction,
    isGuest: !isAuthenticated || currentRole === "guest",
  };
}
