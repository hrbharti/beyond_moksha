import axios from "axios";

const BASE_URL =
  (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080") + "/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    throw error;
  },
);

export default api;
