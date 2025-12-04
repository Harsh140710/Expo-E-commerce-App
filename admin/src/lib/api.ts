import axios from "axios";

// export const API_BASE = "https://expo-ecommerce-backend.onrender.com/api";

const axiosInstance = axios.create({
    baseURL: import.meta.env.BASE_URL,
    withCredentials: true,
});

export default axiosInstance;
