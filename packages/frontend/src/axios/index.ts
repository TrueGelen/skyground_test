import axios from "axios";
import { config } from "../config";

export const apiClient = axios.create({
  withCredentials: true,
  baseURL: config.apiUrl,
});
