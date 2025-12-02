import { requireAuth } from "@clerk/express";
import { User } from "../models/user.model";
import { ENV } from "../config/env";
import { NextFunction, Request, Response } from "express";

export const protectRoute = [
    requireAuth(),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const clerkId = req.auth().userId;
            if (!clerkId)
                return res
                    .status(401)
                    .json({ message: "Unauthorized - invalid token" });

            const user: any = await User.findOne({ clerkId });

            if (!user)
                return res.status(404).json({ message: "User not found" });

            req.user = user;

            next();
        } catch (error: any) {
            console.log("Error in protect route middleware", error.message);
            res.status(500).json({ message: "Internal Server error" });
        }
    },
];

export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res
            .status(404)
            .json({ message: "unauthorized - User not found" });
    }

    if (req.user?.email !== ENV.ADMIN_EMAIL) {
        return res.status(403).json({
            message: "Not have admin access...!",
        });
    }

    next();
};
