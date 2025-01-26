import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const DEBUG_URL = "http://localhost:3000";
const RELEASE_URL = "https://gl-backend-32cy.onrender.com/";
const BASE_URL =
  process.env.NODE_ENV === "development" ? DEBUG_URL : RELEASE_URL;
export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
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
