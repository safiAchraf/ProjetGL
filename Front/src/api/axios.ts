import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const URL = "http://localhost:3000";
// const URL = "https://gl-backend-32cy.onrender.com/";

export const api: AxiosInstance = axios.create({
  baseURL: URL,
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
