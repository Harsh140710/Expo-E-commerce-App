"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOnly = exports.protectRoute = void 0;
const express_1 = require("@clerk/express");
const user_model_1 = require("../models/user.model");
const env_1 = require("../config/env");
exports.protectRoute = [
    (0, express_1.requireAuth)(),
    async (req, res, next) => {
        try {
            const clerkId = req.auth().userId;
            if (!clerkId)
                return res
                    .status(401)
                    .json({ message: "Unauthorized - invalid token" });
            const user = await user_model_1.User.findOne({ clerkId });
            if (!user)
                return res.status(404).json({ message: "User not found" });
            req.user = user;
            next();
        }
        catch (error) {
            console.log("Error in protect route middleware", error.message);
            res.status(500).json({ message: "Internal Server error" });
        }
    },
];
const adminOnly = (req, res, next) => {
    if (!req.user) {
        return res
            .status(404)
            .json({ message: "unauthorized - User not found" });
    }
    if (req.user?.email !== env_1.ENV.ADMIN_EMAIL) {
        return res.status(403).json({
            message: "Not have admin access...!",
        });
    }
    next();
};
exports.adminOnly = adminOnly;
