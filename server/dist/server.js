"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./config/env");
const db_1 = require("./config/db");
const app_1 = require("./app");
const express_1 = require("@clerk/express");
const cors_1 = __importDefault(require("cors"));
app_1.app.use((0, express_1.clerkMiddleware)());
app_1.app.use((0, cors_1.default)({
    origin: "https://expo-e-commerce-app.vercel.app",
    credentials: true
}));
const serverStart = async () => {
    await (0, db_1.connectDB)();
    app_1.app.listen(env_1.ENV.PORT, () => {
        console.log(`Server is running on port ${env_1.ENV.PORT}`);
    });
};
serverStart();
