import axios from "axios";

// export const API_BASE = "https://expo-ecommerce-backend.onrender.com/api";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_ADMIN_URL,
    withCredentials: true,
});

export default axiosInstance;
