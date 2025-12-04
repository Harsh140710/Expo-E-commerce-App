import { UpdateOrderStatusPayload } from "../types";
import axiosInstance from "./axios";

export const productApi = {
    getAll: async () => {
        const { data } = await axiosInstance.get("/admin/products");
        return data;
    },

    create: async (formData: any) => {
        const { data } = await axiosInstance.post("/admin/products", formData);
        return data;
    },

    update: async ({ id, formData }: any) => {
        const { data } = await axiosInstance.put(
            `/admin/products/${id}`,
            formData,
        );
        return data;
    },
};

export const orderApi = {
    getAll: async () => {
        const { data } = await axiosInstance.get("/admin/orders");
        return data;
    },

    updateStatus: async ({ orderId, status }: UpdateOrderStatusPayload) => {
        const { data } = await axiosInstance.patch(
            `/admin/products${orderId}/status`,
            { status },
        );
        return data;
    },
};

export const statsApi = {
    getDashboard: async () => {
        const { data } = await axiosInstance.get("/admin/stats");
        return data;
    },
};
