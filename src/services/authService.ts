import { fetchData } from "../lib/api";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "../types/auth.types";

const USER_ROLE = 1;

async function login(request: LoginRequest): Promise<AuthResponse> {
  return fetchData<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: request,
  });
}

async function register(
  request: Omit<RegisterRequest, "role">,
): Promise<AuthResponse> {
  return fetchData<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: { ...request, role: USER_ROLE },
  });
}

export const authService = { login, register }