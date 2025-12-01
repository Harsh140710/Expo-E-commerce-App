import mongoose from "mongoose";
import { ENV } from "./env";

interface ENV {
    NODE_ENV: string;
    PORT: string | number;
    DB_URL: string;
    CLERK_PUBLISHABLE_KEY: string;
    CLERK_SECRET_KEY: string;
}

export const connectDB = async() => {
    try {
        const connect = await mongoose.connect(ENV.DB_URL)
        console.log(`MongoDB connected Successfully...!${(connect).connection.host}`);
        
    } catch (error) {
        console.log("Database is not connected", error);
    }
}