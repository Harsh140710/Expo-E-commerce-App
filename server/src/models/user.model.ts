import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema({
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
        required: true
    },

    city: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },
    
    zipCode: {
        type: String,
        required: true
    },
    
    phoneNumber: {
        type: String,
        required: true
    },
    
    isDefault: {
        type: Boolean,
        default: false
    }
})

const userSchema = new Schema(
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

        address: [addressSchema],

        // array of product who stores product details
        wishlist: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
            },
        ],
    },
    {
        timestamps: true,
    },
);

export const User = mongoose.model("User", userSchema);
