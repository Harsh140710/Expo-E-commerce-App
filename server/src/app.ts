import express from "express";
import { ENV } from "./config/env";
import dotenv from "dotenv";
import { serve } from "inngest/express";
import { functions, inggest } from "./config/inggest";
import cors from "cors";

dotenv.config({ quiet: true });
export const app = express();

app.use(
    cors({
        origin: [ENV.CLIENT_LOCAL_URL , ENV.ADMIN_FRONTEND_URL],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
    }),
);

app.use(express.json());


// inggest connection for user creation or deletion
app.use("/api/inngest", serve({ client: inggest, functions }));

import adminRoute from "./routes/admin.route";
import userRoute from "./routes/user.route";
import orderRoute from "./routes/order.route";
import reviewRoute from "./routes/review.route";
import productRoute from "./routes/product.route";
import cartRoute from "./routes/cart.route";
import path from "path";

app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello World" });
});
// admin route
app.use("/api/admin", adminRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);