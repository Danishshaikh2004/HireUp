import axios from "axios";

// Ensure the API URL is correctly set
const API_BASE_URL = process.env.VITE_API_URL || "http://localhost:5000/api";

// Debugging: Log API Base URL
console.log("🔗 API BASE URL:", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000, // Set timeout (10 seconds)
});

// Automatically attach token if available
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("❌ API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
