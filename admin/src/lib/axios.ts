import axios from "axios";

// export const API_BASE = "https://expo-ecommerce-backend.onrender.com/api";

const isProduction = import.meta.env.MODE === 'production';
const BASE_URL = isProduction
    ? import.meta.env.VITE_ADMIN_URL // The deployed backend URL
    : import.meta.env.VITE_API_BASE_URL; // The local backend URL

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

export default axiosInstance;
