import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional interceptors for logging or token injection
api.interceptors.request.use(
  (config) => {
    console.log(`[API Request]: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(`[API Error]: ${error.message}`);
    return Promise.reject(error);
  }
);

export default api;
