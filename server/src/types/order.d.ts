import { Document, Types } from "mongoose"

export interface OrderItemDocument extends Document {
    product: Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface ShippingAddressDocument extends Document {
    fullName: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
}

export interface OrderDocument extends Document {
    user: Types.ObjectId;
    clerkId: string;
    orderItems: OrderItemDocument[];
    shippingAddress: ShippingAddressDocument;
    paymentResult: {
        id: string;
        status: string;
    };
    totalPrice: number;
    status: "pending" | "shipped" | "delivered";
    deliveredAt?: Date;
    shippedAt?: Date;
}
