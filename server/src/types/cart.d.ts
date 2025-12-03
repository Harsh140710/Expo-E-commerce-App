import { Document, Types } from "mongoose";

export interface CartItems extends Document {
    product: Types.ObjectId;
    quantity: number;
}

export interface CartDocument extends Document {
    user: Types.ObjectId;
    clerkId: string;
    items: Types.DocumentArray<CartItems>;
}
