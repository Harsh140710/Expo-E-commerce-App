import express from "express";
import { ENV } from "./config/env";
import dotenv from "dotenv";
import { serve } from "inngest/express";
import { functions, inggest } from "./config/inggest";

dotenv.config({ quiet: true });
export const app = express();

app.use(express.json());

// inggest connection for user creation or deletion
app.use("/api/inngest", serve({ client: inggest, functions }));

import adminRoute from "./routes/admin.route";
import userRoute from "./routes/user.route";

// admin route
app.use("/api/admin", adminRoute);
app.use("/api/users", userRoute);

// Start the server and listen on the specified port
app.listen(ENV.PORT, () => {
    console.log(`Example app listening at http://localhost:${ENV.PORT}`);
});
