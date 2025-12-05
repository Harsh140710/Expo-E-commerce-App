export interface Review {
    productId: string;
    userId: string;
    orderId: string;
    rating: number;
}

export interface Address {
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
    addresses: Address[];
    wishlist: string[];
}

export interface ShippingAddress {
    fullName: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
}

export interface OrderItem {
    product: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface OrderDocument {
    user: string;
    clerkId: string;
    orderItems: OrderItem[];
    shippingAddress: ShippingAddress;
    paymentResult: {
        id: string;
        status: string;
    };
    totalPrice: number;
    status: "pending" | "shipped" | "delivered";
    deliveredAt?: string;
    shippedAt?: string;
}

export interface CartItem {
    product: string;
    quantity: number;
}

export interface CartDocument {
    user: string;
    clerkId: string;
    items: CartItem[];
}

export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    images: string[];
    averageRating: number;
    totalReviews: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface UpdateOrderStatusPayload {
    orderId: string;
    status: "pending" | "shipped" | "delivered";
}

export interface getOrder {
    orders: object[] | Array<OrderItem>;
}