// utils/axios.ts or lib/axios.ts

import axios from "axios";

// Create instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api", // or your actual API base URL
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem("auth");
      if (raw) {
        const { accessToken } = JSON.parse(raw);
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
