import mongoose, { Schema, Types } from "mongoose";
import { CartItems, CartDocument } from "../types/cart";

const cartItemSchema = new Schema<CartItems>({
    product: {
        type: Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
    },
});

const cartSchema = new Schema<CartDocument>(
    {
        user: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
        },
        clerkId: {
            type: String,
            required: true,
            unique: true,
        },
        items: [cartItemSchema],
    },
    { timestamps: true },
);

export const Cart = mongoose.model<CartDocument>("Cart", cartSchema);
