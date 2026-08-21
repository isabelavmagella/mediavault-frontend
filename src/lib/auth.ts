import type { User } from "../types/auth.types";

const TOKEN_KEY = "mediavault.token";
const USER_KEY = "mediavault.user";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export function getUser(): User | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function setUser(user: User): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearUser(): void {
  localStorage.removeItem(USER_KEY);
}

type TokenPayload = {
  exp?: number;
  sub?: string;
};

export function decodeToken(token: string): TokenPayload | null {
  try {
    const [, payload] = token.split(".");
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(base64);
    return JSON.parse(json) as TokenPayload;
  } catch {
    return null;
  }
}

export function isExpired(token: string, skewSeconds = 30): boolean {
  const payload = decodeToken(token);
  if (payload === null) return true;
  if (!payload.exp) return false;
  const expiresAtMs = payload.exp * 1000;
  return Date.now() >= expiresAtMs - skewSeconds * 1000;
}
