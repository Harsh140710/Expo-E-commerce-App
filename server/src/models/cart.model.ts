import mongoose, { Document, Schema } from "mongoose";
import { CartItems } from "../types/cart";

const cartItemSchema = new Schema<CartItems>({
    product: {
        type: mongoose.Schema.Types.ObjectId,
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

export interface Cart extends Document {
    user: () => object,
    clerkId: string,
    items: Array<CartItems>
}

const cartSchema = new Schema<Cart>(
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

        items: [cartItemSchema],
    },
    { timestamps: true },
);

export const Cart = mongoose.model<Cart>("Cart", cartSchema);
