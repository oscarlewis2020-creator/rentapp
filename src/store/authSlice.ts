// store/authSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { universalStorage } from "./storage";

interface AuthState {
  isAuthenticated: boolean;
  hasOnboarded: boolean;
  isInitializing: boolean;
  token: string | null;
  user: any | null;

  // 💡 New initialization gating flags
  isAppRegistered: boolean;
  isBackupRestored: boolean;
  isInitWorkflowComplete: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  hasOnboarded: false,
  isInitializing: true, // App blocks navigation layout parsing until true -> false
  token: null,
  user: null,

  // Default states for post-auth setup
  isAppRegistered: false,
  isBackupRestored: false,
  isInitWorkflowComplete: false,
};

// --- ASYNC ACTIONS (THUNKS) ---

// 1. App Boot/Initialization Thunk
export const bootstrapAuthSession = createAsyncThunk(
  "auth/bootstrapAuthSession",
  async () => {
    const token = await universalStorage.getItem("auth_token");
    const onboardedString = await universalStorage.getItem("has_onboarded");
    const initCompleteString =
      await universalStorage.getItem("is_init_complete");

    return {
      token,
      hasOnboarded: onboardedString === "true",
      isInitWorkflowComplete: initCompleteString === "true",
    };
  },
);

// 2. Persistent Onboarding Completion Thunk
export const completeOnboarding = createAsyncThunk(
  "auth/completeOnboarding",
  async () => {
    await universalStorage.setItem("has_onboarded", "true");
    return true;
  },
);

// 3. Persistent Post-Auth Setup Completion Thunk
export const completeInitWorkflow = createAsyncThunk(
  "auth/completeInitWorkflow",
  async () => {
    await universalStorage.setItem("is_init_complete", "true");
    return true;
  },
);

// 4. Persistent Login Thunk
export const logInUser = createAsyncThunk(
  "auth/logInUser",
  async (payload: { token: string; user: any }) => {
    await universalStorage.setItem("auth_token", payload.token);
    return payload;
  },
);

// 5. Persistent Logout Thunk
export const logOutUser = createAsyncThunk("auth/logOutUser", async () => {
  await universalStorage.removeItem("auth_token");
  // 💡 Optional: clear the init step on logout so returning users re-verify tokens
  await universalStorage.removeItem("is_init_complete");
  return true;
});

// --- THE SLICE ---
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Synchronous state modifications for runtime updates if needed
    setRegistrationStatus: (state, action: PayloadAction<boolean>) => {
      state.isAppRegistered = action.payload;
    },
    setBackupRestoreStatus: (state, action: PayloadAction<boolean>) => {
      state.isBackupRestored = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle App Bootup Checking
      .addCase(bootstrapAuthSession.pending, (state) => {
        state.isInitializing = true;
      })
      .addCase(bootstrapAuthSession.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.hasOnboarded = action.payload.hasOnboarded;
        state.isInitWorkflowComplete = action.payload.isInitWorkflowComplete;
        state.isAuthenticated = !!action.payload.token;
        state.isInitializing = false; // Layout routing engines can now run safely
      })
      .addCase(bootstrapAuthSession.rejected, (state) => {
        state.isInitializing = false;
      })

      // Handle Login
      .addCase(logInUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isInitWorkflowComplete = false; // Force checking initialization prompts post-login
      })

      // Handle Logout
      .addCase(logOutUser.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        state.isInitWorkflowComplete = false;
        state.isAppRegistered = false;
        state.isBackupRestored = false;
      })

      // Handle Onboarding Completion
      .addCase(completeOnboarding.fulfilled, (state) => {
        state.hasOnboarded = true;
      })

      // Handle Init Step Dialogues Completion
      .addCase(completeInitWorkflow.fulfilled, (state) => {
        state.isInitWorkflowComplete = true;
      });
  },
});

export const { setRegistrationStatus, setBackupRestoreStatus } =
  authSlice.actions;
export default authSlice.reducer;
