import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://localhost:8081",
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: add interceptors (e.g., auth tokens, logging)
axiosClient.interceptors.request.use(
  (config) => {
    // Example: attach token if available
    // const token = localStorage.getItem("token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "Unknown error";
    return Promise.reject(new Error(message));
  }
);

export default axiosClient;
