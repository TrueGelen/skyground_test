import axios from "axios";
import { config } from "../config";

export const axiosClient = axios.create({
  withCredentials: true,
  baseURL: config.apiUrl,
});
