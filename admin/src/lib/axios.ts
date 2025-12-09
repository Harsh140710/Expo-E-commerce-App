import axios from "axios";

// export const API_BASE = "https://expo-ecommerce-backend.onrender.com/api";

const isProduction = import.meta.env.MODE === 'production';
const BASE_URL = isProduction
    ? import.meta.env.VITE_ADMIN_URL // The deployed backend URL
    : import.meta.env.VITE_API_BASE_URL; // The local backend URL

const axiosInstance = axios.create({
<<<<<<< HEAD
    baseURL: BASE_URL,
=======
    baseURL: "https://expo-e-commerce-app-1.onrender.com/api",
>>>>>>> 499721f74a79e3b58f511c2a00a86aa2dead6f1c
    withCredentials: true,
});

export default axiosInstance;
