import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  clearToken,
  clearUser,
  getToken,
  getUser,
  isExpired,
  setToken,
  setUser,
} from "../lib/auth";
import type { User } from "../types/auth.types";
import { authService } from "../services/authService";
import { AuthContext } from "./auth-context";
// import { setUnauthorizedHandler } from "../lib/api";

function readStoredToken(): string | null {
  const token = getToken();
  if (!token) return null;
  if (isExpired(token)) {
    clearToken();
    clearUser();
    return null;
  }
  return token;
}

function readStoredUser(): User | null {
  const token = getToken();
  if (!token || isExpired(token)) return null;
  return getUser();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(readStoredToken);
  const [user, setUserState] = useState<User | null>(readStoredUser);

  const logout = useCallback(() => {
    clearToken();
    clearUser();
    setTokenState(null);
    setUserState(null);
  }, []);

  //   useEffect(() => {
  //     setUnauthorizedHandler(logout);
  //   }, [logout]);

  const login = useCallback(async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    setToken(response.token);
    setUser(response.user);
    setTokenState(response.token);
    setUserState(response.user);
  }, []);

  const register = useCallback(async (nome: string, email: string, password: string) => {
    const response = await authService.register({ nome, email, password });
    setToken(response.token);
    setUser(response.user);
    setTokenState(response.token);
    setUserState(response.user);
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: token !== null,
      login,
      register,
      logout,
    }),
    [token, user, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
