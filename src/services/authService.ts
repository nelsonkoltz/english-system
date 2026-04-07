import { api } from "./api";
import type { User, UserRole } from "@/types";

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", payload);
    localStorage.setItem("auth_token", response.token);
    return response;
  },

  async logout(): Promise<void> {
    await api.post<void>("/auth/logout");
    localStorage.removeItem("auth_token");
  },

  async me(): Promise<User> {
    return api.get<User>("/auth/me");
  },

  async refreshToken(): Promise<{ token: string }> {
    const response = await api.post<{ token: string }>("/auth/refresh");
    localStorage.setItem("auth_token", response.token);
    return response;
  },

  getStoredToken(): string | null {
    return localStorage.getItem("auth_token");
  },

  isTokenStored(): boolean {
    return !!localStorage.getItem("auth_token");
  },
};
