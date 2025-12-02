"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functions = exports.inggest = void 0;
const inngest_1 = require("inngest");
const db_1 = require("./db");
const user_model_1 = require("../models/user.model");
exports.inggest = new inngest_1.Inngest({ id: "ecommerce-app" });
const syncUser = exports.inggest.createFunction({ id: "sync-user" }, { event: "clerk/user.created" }, async ({ event }) => {
    console.log("🔥 SYNC USER EVENT RECEIVED:", event);
    try {
        await (0, db_1.connectDB)();
        const user = event.data;
        console.log("📥 Clerk User Data:", user);
        const email = user.email_addresses?.[0]?.email_address ||
            user.primary_email_address?.email_address ||
            null;
        if (!email) {
            console.error("❌ No email found in Clerk event.");
            return { error: "Missing email" };
        }
        await user_model_1.User.create({
            clerkId: user.id,
            email,
            name: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
            imageUrl: user.image_url,
            address: [],
            wishlist: [],
        });
        console.log("✅ User created in DB");
        return { message: "User synced" };
    }
    catch (err) {
        console.error("❌ DB ERROR:", err);
        return { error: err.message };
    }
});
const deleteUserFromDB = exports.inggest.createFunction({ id: "delete-user-from-db" }, { event: "clerk/user.deleted" }, async ({ event }) => {
    await (0, db_1.connectDB)();
    const { id } = event.data;
    await user_model_1.User.deleteOne({ clerkId: id });
    return { message: "User deleted from DB" };
});
exports.functions = [syncUser, deleteUserFromDB];
