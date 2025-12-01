import { ENV } from "./config/env";
import { connectDB } from "./config/db";
import { app } from "./app";
import { clerkMiddleware } from "@clerk/express";


app.use(clerkMiddleware());



const serverStart = async () => {
    await connectDB();
    app.listen(ENV.PORT, () => {
        console.log(`Server is running on port ${ENV.PORT}`);
    });
};

serverStart();
