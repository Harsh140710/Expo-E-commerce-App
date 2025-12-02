"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functions = exports.inggest = void 0;
const inngest_1 = require("inngest");
const db_1 = require("./db");
const user_model_1 = require("../models/user.model");
exports.inggest = new inngest_1.Inngest({ id: "ecommerce-app" });
const syncUser = exports.inggest.createFunction({ id: "sync-user" }, { event: "clerk/user.created" }, async ({ event }) => {
    await (0, db_1.connectDB)();
    const user = event.data;
    const email = user.email_addresses?.[0]?.email_address || // normal case
        user.primary_email_address?.email_address || // some Clerk plans
        null; // fallback
    const newUser = {
        clerkId: user.id,
        email,
        name: `${user.first_name || ""} ${user.last_name || ""}`.trim() || "User",
        imageUrl: user.image_url,
        address: [],
        wishlist: [],
    };
    await user_model_1.User.create(newUser);
    return { message: "User synced to DB" };
});
const deleteUserFromDB = exports.inggest.createFunction({ id: "delete-user-from-db" }, { event: "clerk/user.deleted" }, async ({ event }) => {
    await (0, db_1.connectDB)();
    const { id } = event.data;
    await user_model_1.User.deleteOne({ clerkId: id });
    return { message: "User deleted from DB" };
});
exports.functions = [syncUser, deleteUserFromDB];
