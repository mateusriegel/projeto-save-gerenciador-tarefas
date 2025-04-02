import axios from "axios";

const API_URL = "http://localhost:3000/api";

export interface APIError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar o token automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token && !config.url?.includes("/auth/login") && !config.url?.includes("/auth/register")) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
