import { api } from "../api/api";
import { User } from "../models/User";

interface AuthResponse {
  user: User;
  token: string;
}

export const register = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/register", {
    email,
    password,
  });
  return response.data;
};

export const updatePassword = async (
  oldPassword: string,
  newPassword: string
): Promise<AuthResponse> => {
  const response = await api.put<AuthResponse>(`/auth/user/password`, {
    oldPassword,
    newPassword,
  });
  return response.data;
};

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", {
    email,
    password,
  });
  return response.data;
};
