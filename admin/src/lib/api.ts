import { getOrder, UpdateOrderStatusPayload } from "../types";
import axiosInstance from "./axios";

export const productApi = {
    getAll: async () => {
        const { data } = await axiosInstance.get("/api/admin/products");
        return data;
    },

    create: async (formData: any) => {
        const { data } = await axiosInstance.post("/api/admin/products", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return data;
    },

    update: async ({ id, formData }: any) => {
        const { data } = await axiosInstance.put(
            `/api/admin/products/${id}`,
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            },
        );
        return data;
    },

    delete: async (id: string) => {
        const { data } = await axiosInstance.delete(`/api/admin/products/${id}`);
        return data;
    },
};

export const orderApi = {
    getAll: async (): Promise<getOrder> => {
        const { data } = await axiosInstance.get("/api/admin/orders");
        return data;
    },

    updateStatus: async ({ orderId, status }: UpdateOrderStatusPayload) => {
        const { data } = await axiosInstance.patch(
            `/api/admin/orders/${orderId}/status`,
            { status },
        );
        return data;
    },
};

export const statsApi = {
    getDashboard: async () => {
        const { data } = await axiosInstance.get("/api/admin/stats");
        return data;
    },
};

export const customerApi = {
    getAll: async () => {
        const { data } = await axiosInstance.get("/api/admin/customers");
        return data;
    },
};
