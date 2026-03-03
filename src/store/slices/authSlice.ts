
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type Role = 'superadmin' | 'admin'; // align with API
interface User {
  id: number;
  email: string;
  role: Role;
  password?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;            // ✅ store bearer
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  isRehydrated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  isRehydrated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // ✅ accept both user & token
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user ?? null;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      state.isRehydrated = true;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.isRehydrated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.isRehydrated = true;
    },
    clearError: (state) => {
      state.error = null;
    },
    rehydrate: (state) => {
      state.isRehydrated = true;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError, rehydrate } = authSlice.actions;
export default authSlice.reducer;
