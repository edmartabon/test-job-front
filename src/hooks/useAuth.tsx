"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { apiFetch } from "@/lib/api";
import { ApiResponse, AuthPayload, LoginCredentials, User } from "@/lib/types";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "customer_portal_auth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as { token: string; user: User };
        setToken(parsed.token);
        setUser(parsed.user);
      } catch (error) {
        console.warn("Failed to parse stored auth payload", error);
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);


  const login = useCallback(async (credentials: LoginCredentials) => {
    // Build payload including either email or phone (whichever is present) and password.
    if (!credentials.password) {
      throw new Error("Password is required");
    }

    const payload: Record<string, unknown> = { password: credentials.password };
    if (credentials.email) payload.email = credentials.email;
    if (credentials.phone) payload.phone = credentials.phone;

    const response = await apiFetch<ApiResponse<AuthPayload>>("/api/auth/login", {
      method: "POST",
      body: payload,
    });

    if ("success" in response && response.success) {
      const authData = response.data;
      setToken(authData.accessToken);
      setUser(authData.user);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            token: authData.accessToken,
            user: authData.user,
          })
        );
      }
    } else {
      throw new Error(response.error?.message || "Unable to log in");
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      isLoading,
      login,
      logout,
    }),
    [user, token, isLoading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
