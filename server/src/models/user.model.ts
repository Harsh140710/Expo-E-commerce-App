import mongoose, { Document, Schema, Types } from "mongoose";

export interface Addresses extends Document {
    label: string;
    fullName: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
    isDefault: boolean;
}
export interface UserDocument extends Document {
    email: string;
    name: string;
    imageUrl: string;
    clerkId: string;
    addresses: Types.DocumentArray<Addresses>;
    wishlist: Types.Array<Types.ObjectId | string>;
}

const addressSchema = new Schema<Addresses>({
    label: {
        type: String,
        required: true,
    },

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

    isDefault: {
        type: Boolean,
        default: false,
    },
});

const userSchema = new Schema<UserDocument>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },

        name: {
            type: String,
            required: true,
        },

        imageUrl: {
            type: String,
            default: "",
        },

        clerkId: {
            type: String,
            required: true,
            unique: true,
        },

        addresses: [addressSchema],

        // array of product who stores product details
        wishlist: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
    },
    {
        timestamps: true,
    },
);

export const User = mongoose.model<UserDocument>("User", userSchema);
