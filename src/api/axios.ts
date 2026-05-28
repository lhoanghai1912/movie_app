import { ENV } from "@configs/env";
import axios from "axios";

export const http = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: ENV.API_TIMEOUT,
  headers: { "Content-Type": "application/json" },
});

http.interceptors.request.use((config) => {
  return config;
});

http.interceptors.response.use(
  (res) => {
    const paginate = (res.data as any)?.paginate;
    return res;
  },
  (err) => {
    console.error(
      "[API Error]",
      err?.response?.status,
      err?.config?.url,
      err?.message,
    );
    return Promise.reject(err);
  },
);
