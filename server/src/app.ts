import express from "express";
import { ENV } from "./config/env.ts";
import dotenv from "dotenv";

dotenv.config();


export const app = express();


// Start the server and listen on the specified port
app.listen(ENV.PORT, () => {
    console.log(`Example app listening at http://localhost:${ENV.PORT}`);
});
