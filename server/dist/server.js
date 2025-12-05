"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./config/env");
const db_1 = require("./config/db");
const app_1 = require("./app");
const express_1 = require("@clerk/express");
app_1.app.use((0, express_1.clerkMiddleware)());
const serverStart = async () => {
    await (0, db_1.connectDB)();
    app_1.app.listen(env_1.ENV.PORT, () => {
        console.log(`Server is running on port ${env_1.ENV.PORT}`);
    });
};
serverStart();
