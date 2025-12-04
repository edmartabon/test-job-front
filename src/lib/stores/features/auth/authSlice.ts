import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: string | null;
  refreshExpiresAt: string | null;
  tokenType: string | null;
  isAuthenticated: boolean;
}

// Default state
const defaultState: AuthState = {
  accessToken: null,
  refreshToken: null,
  expiresAt: null,
  refreshExpiresAt: null,
  tokenType: null,
  isAuthenticated: false,
};

// Load persisted state from localStorage
const loadFromStorage = (): AuthState => {
  if (typeof window === "undefined") return defaultState;

  try {
    const raw = localStorage.getItem("auth");
    if (!raw) return defaultState;

    const parsed = JSON.parse(raw);
    return {
      ...parsed,
      isAuthenticated: !!parsed.accessToken,
    };
  } catch {
    return defaultState;
  }
};

const initialState: AuthState = loadFromStorage();

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        access_token: string;
        refresh_token: string;
        expires_at: string;
        refresh_expires_at: string;
        token_type: string;
      }>
    ) => {
      const {
        access_token,
        refresh_token,
        expires_at,
        refresh_expires_at,
        token_type,
      } = action.payload;

      state.accessToken = access_token;
      state.refreshToken = refresh_token;
      state.expiresAt = expires_at;
      state.refreshExpiresAt = refresh_expires_at;
      state.tokenType = token_type;
      state.isAuthenticated = true;

      // Persist to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "auth",
          JSON.stringify({
            accessToken: access_token,
            refreshToken: refresh_token,
            expiresAt: expires_at,
            refreshExpiresAt: refresh_expires_at,
            tokenType: token_type,
          })
        );
      }
    },

    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.expiresAt = null;
      state.refreshExpiresAt = null;
      state.tokenType = null;
      state.isAuthenticated = false;

      if (typeof window !== "undefined") {
        localStorage.removeItem("auth");
      }
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
