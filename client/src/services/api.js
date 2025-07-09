// services/api.js
import axios from "axios";

// ✅ Use env var for dynamic backend URL (localhost or Render)
const API = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
  withCredentials: true, // optional but good for cookie-based auth
});

// ✅ Add JWT token from localStorage to all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
