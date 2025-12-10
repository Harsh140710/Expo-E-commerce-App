import { getOrder, UpdateOrderStatusPayload } from "../types";
import axiosInstance from "./axios";

export const productApi = {
    getAll: async () => {
        const { data } = await axiosInstance.get("/admin/products");
        return data;
    },

    create: async (formData: any) => {
        const { data } = await axiosInstance.post("/admin/products", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return data;
    },

    update: async ({ id, formData }: any) => {
        const { data } = await axiosInstance.put(
            `/admin/products/${id}`,
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            },
        );
        return data;
    },

    delete: async (id: string) => {
        const { data } = await axiosInstance.delete(`/admin/products/${id}`);
        return data;
    },
};

export const orderApi = {
    getAll: async (): Promise<getOrder> => {
        const { data } = await axiosInstance.get("/admin/orders");
        return data;
    },

    updateStatus: async ({ orderId, status }: UpdateOrderStatusPayload) => {
        const { data } = await axiosInstance.patch(
            `/admin/orders/${orderId}/status`,
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

export const customerApi = {
    getAll: async () => {
        const { data } = await axiosInstance.get("/admin/customers");
        return data;
    },
};
