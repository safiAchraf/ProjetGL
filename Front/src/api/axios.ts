import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = document.cookie.split("authorized=")[1]?.split(";")[0];
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
