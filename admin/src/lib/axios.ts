import axios from "axios";

// export const API_BASE = "https://expo-ecommerce-backend.onrender.com/api";

const axiosInstance = axios.create({
    baseURL: "https://expo-e-commerce-app-1.onrender.com/api",
    withCredentials: true,
});

export default axiosInstance;
