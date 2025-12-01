import express from "express";
import { ENV } from "./config/env";
import dotenv from "dotenv";
import { serve } from "inngest/express";
import { functions, inggest } from "./config/inggest";

dotenv.config();
export const app = express();

app.use(express.json());

app.use("/api/inngest", serve({ client: inggest, functions }));

// Start the server and listen on the specified port
app.listen(ENV.PORT, () => {
    console.log(`Example app listening at http://localhost:${ENV.PORT}`);
});
