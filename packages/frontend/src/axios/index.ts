import axios from "axios";
import { config } from "../config";

export const apiClient = axios.create({
  withCredentials: true,
  baseURL: config.apiUrl,
});

apiClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});
