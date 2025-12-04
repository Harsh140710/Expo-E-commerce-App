import { ENV } from "./config/env";
import { connectDB } from "./config/db";
import { app } from "./app";
import { clerkMiddleware } from "@clerk/express";
import cors from 'cors';

app.use(clerkMiddleware());
app.use(cors({
  origin: [ENV.ADMIN_FRONTEND_URL, ENV.CLIENT_LOCAL_URL],
  credentials: true
}));


const serverStart = async () => {
    await connectDB();
    app.listen(ENV.PORT, () => {
        console.log(`Server is running on port ${ENV.PORT}`);
    });
};

serverStart();
