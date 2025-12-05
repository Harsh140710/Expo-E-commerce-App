import axios from "axios";

// export const API_BASE = "https://expo-ecommerce-backend.onrender.com/api";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "https://expo-ecommerce-backend.onrender.com/api",
    withCredentials: true,
});

export default axiosInstance;
