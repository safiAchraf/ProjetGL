import axios from "axios";

// Create axios instance
export const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
