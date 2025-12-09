// In a component that runs early, like the component wrapping your routes
// or within a dedicated utility hook/file.
import { useAuth } from "@clerk/clerk-react";
import axiosInstance from "../lib/axios"; // Your configured axios instance
import { useEffect } from "react";

// You can't use useAuth() outside of a component, so you need to set up the interceptor 
// where you can access the hook, like in your App component or DashboardLayout.

export const useAxiosInterceptor = () => {
    const { getToken } = useAuth();

    useEffect(() => {
        const interceptor = axiosInstance.interceptors.request.use(async (config) => {
            const token = await getToken(); // Assuming you have an 'admin' template

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        // Clean up the interceptor on unmount
        return () => {
            axiosInstance.interceptors.request.eject(interceptor);
        };
    }, [getToken]);
};