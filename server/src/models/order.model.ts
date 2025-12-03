import mongoose, { Schema, Document } from "mongoose";
import { OrderItems, ShippingAddress } from "../types/order";
export interface Order extends Document {
    clerkId: string,
    user: object,
    orderItems: any[],
    shippingAddress: object,
    paymentResult: string,
    totalPrice: number,
    status: string,
    deliveredAt: Date,
    shippedAt: Date
}

const orderItemSchema = new Schema<OrderItems>({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
        min: 0,
    },

    quantity: {
        type: Number,
        required: true,
        min: 1,
    },

    image: {
        type: String,
        required: true,
    },
});

const shippingAddressSchema = new Schema<ShippingAddress>({
    fullName: {
        type: String,
        required: true,
    },

    streetAddress: {
        type: String,
        required: true,
    },

    city: {
        type: String,
        required: true,
    },

    state: {
        type: String,
        required: true,
    },

    zipCode: {
        type: String,
        required: true,
    },

    phoneNumber: {
        type: String,
        required: true,
    },
});

const orderSchema = new Schema<Order>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        clerkId: {
            type: String,
            required: true,
            unique: true,
        },

        orderItems: [orderItemSchema],

        shippingAddress: {
            type: shippingAddressSchema,
            required: true,
        },

        paymentResult: {
            id: String,
            status: String,
        },

        totalPrice: {
            type: Number,
            required: true,
            min: 0,
        },

        status: {
            type: String,
            enum: ["pending", "shipped", "delivered"],
            default: "pending",
        },

        deliveredAt: {
            type: Date,
        },

        shippedAt: {
            type: Date,
        },
    },
    { timestamps: true },
);

export const Order = mongoose.model<Order>("Order", orderSchema);
