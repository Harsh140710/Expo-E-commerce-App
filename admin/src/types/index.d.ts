declare global {
    namespace Express {
        interface Request {
            user?: UserDocument;
            auth: () => { userId: string | null }; // Clerk's requireAuth injects this
        }
    }
}

export interface Review {
    productId: object;
    userId: object;
    orderId: object;
    rating: number;
}

export interface Addresses {
    label: string;
    fullName: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
    isDefault: boolean;
}
export interface UserDocument {
    email: string;
    name: string;
    imageUrl: string;
    clerkId: string;
    addresses: object;
    wishlist:  string | object;
}

export interface OrderItemDocument {
    product: object;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface ShippingAddressDocument {
    fullName: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
}

export interface OrderDocument {
    user: object;
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

export interface CartItems {
    product: object,
    quantity: number;
}

export interface CartDocument {
    user: object,
    clerkId: string;
    items: Array<CartItems>;
}

export interface Product {
    name: string,
    description: string,
    price: number,
    stock: number,
    category: string,
    images: string[],
    averageRating: number,
    totalReviews: number,
    createdAt?: Date;
    updatedAt?: Date;
}