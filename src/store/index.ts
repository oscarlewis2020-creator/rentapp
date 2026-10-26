import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { UserRole } from "../types/navigation";

// Define the shape of your role state
interface RoleState {
  currentRole: UserRole | "guest";
}

const initialRoleState: RoleState = {
  currentRole: "guest",
};

// Replace your mock reducer with a clean Redux Toolkit slice
const roleSlice = createSlice({
  name: "role",
  initialState: initialRoleState,
  reducers: {
    setRole: (state, action: PayloadAction<UserRole>) => {
      state.currentRole = action.payload; // Direct, safe mutation allowed by RTK
    },
  },
});

// Export the action creator to use in your context
export const { setRole } = roleSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    role: roleSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
