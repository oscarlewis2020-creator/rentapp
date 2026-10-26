import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { universalStorage } from "./storage";

interface AuthState {
  isAuthenticated: boolean;
  hasOnboarded: boolean;
  isInitializing: boolean;
  token: string | null;
  user: any | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  hasOnboarded: false,
  isInitializing: true, // App blocks navigation layout parsing until true -> false
  token: null,
  user: null,
};

// Async thunk used on app launch to load persistent tokens/onboarding states
export const bootstrapAuthSession = createAsyncThunk(
  "auth/bootstrapAuthSession",
  async () => {
    const token = await universalStorage.getItem("auth_token");
    const onboardedString = await universalStorage.getItem("has_onboarded");

    return {
      token,
      hasOnboarded: onboardedString === "true",
    };
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignIn: (state, action: PayloadAction<{ token: string; user: any }>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      universalStorage.setItem("auth_token", action.payload.token);
    },
    setSignOut: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      universalStorage.removeItem("auth_token");
    },
    completeOnboarding: (state) => {
      state.hasOnboarded = true;
      universalStorage.setItem("has_onboarded", "true");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bootstrapAuthSession.pending, (state) => {
        state.isInitializing = true;
      })
      .addCase(bootstrapAuthSession.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.hasOnboarded = action.payload.hasOnboarded;
        state.isAuthenticated = !!action.payload.token;
        state.isInitializing = false; // Layout routing engines can now run safely
      })
      .addCase(bootstrapAuthSession.rejected, (state) => {
        state.isInitializing = false;
      });
  },
});

export const { setSignIn, setSignOut, completeOnboarding } = authSlice.actions;
export default authSlice.reducer;
