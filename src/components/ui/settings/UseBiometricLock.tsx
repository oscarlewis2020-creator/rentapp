import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import { useCallback, useEffect, useRef, useState } from "react";
import { AppState } from "react-native";

export function useBiometricLock() {
  // Start locked so app content never flashes before we've checked the setting
  const [locked, setLocked] = useState(true);

  const lockedRef = useRef(true);
  const authenticating = useRef(false);
  const backgroundedAt = useRef<number | null>(null);

  useEffect(() => {
    lockedRef.current = locked;
  }, [locked]);

  const unlock = useCallback(async () => {
    if (authenticating.current) return;
    authenticating.current = true;
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Unlock RentHub",
        cancelLabel: "Cancel",
      });

      if (result.success) {
        setLocked(false);
        return;
      }

      // The device has no biometrics or passcode anymore, so the user could
      // never pass the prompt. Disable the lock instead of trapping them.
      if (
        result.error === "not_enrolled" ||
        result.error === "passcode_not_set"
      ) {
        await SecureStore.deleteItemAsync("biometrics_enabled");
        await SecureStore.deleteItemAsync("biometrics_timeout");
        setLocked(false);
      }
      // Any other failure (cancel, lockout): stay locked, user can retry
    } catch (error) {
      console.log("Biometric unlock error:", error);
    } finally {
      authenticating.current = false;
    }
  }, []);

  // Cold start: lock if biometrics are enabled
  useEffect(() => {
    (async () => {
      try {
        const enabled = await SecureStore.getItemAsync("biometrics_enabled");
        if (enabled === "true") {
          unlock();
        } else {
          setLocked(false);
        }
      } catch (error) {
        console.log("Error reading biometric setting:", error);
        setLocked(false);
      }
    })();
  }, [unlock]);

  // Returning from the background after longer than the chosen timeout
  useEffect(() => {
    const sub = AppState.addEventListener("change", async (state) => {
      // The biometric prompt itself triggers AppState changes on Android
      if (authenticating.current) return;

      if (state === "background") {
        if (!lockedRef.current) backgroundedAt.current = Date.now();
        return;
      }

      if (state === "active" && backgroundedAt.current !== null) {
        const elapsed = Date.now() - backgroundedAt.current;
        backgroundedAt.current = null;

        try {
          const enabled = await SecureStore.getItemAsync("biometrics_enabled");
          const timeout = Number(
            (await SecureStore.getItemAsync("biometrics_timeout")) ?? 5,
          );

          if (enabled === "true" && elapsed >= timeout * 1000) {
            setLocked(true);
            unlock();
          }
        } catch (error) {
          console.log("Error checking auto-lock:", error);
        }
      }
    });

    return () => sub.remove();
  }, [unlock]);

  return { locked, unlock };
}
