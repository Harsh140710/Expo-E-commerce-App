import { ENV } from "./config/env.ts";
import { connectDB } from "./config/db.ts";
import { app } from "./app.ts";
import { clerkMiddleware } from "@clerk/express";

app.use(clerkMiddleware());
app.listen(ENV.PORT, () => {
    console.log(`Server is running on port ${ENV.PORT}`);
    connectDB();
});
