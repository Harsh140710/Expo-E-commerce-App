import express from "express";
import { ENV } from "./config/env.ts";

const app = express();

app.get("/", (req: any, res: any) => {
    res.status(200).json({ message: "Server Setup" });
});

app.listen(ENV.PORT, console.log(`Server is running on port ${ENV.PORT}`));
