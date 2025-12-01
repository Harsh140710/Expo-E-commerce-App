"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functions = exports.inggest = void 0;
const inngest_1 = require("inngest");
const db_1 = require("./db");
const user_model_1 = require("../models/user.model");
exports.inggest = new inngest_1.Inngest({ id: "ecommerce-app" });
const syncUser = exports.inggest.createFunction({ id: "sync-user" }, { event: "clerk/user.created" }, async ({ event }) => {
    await (0, db_1.connectDB)();
    const { id, email_address, first_name, last_name, image_url } = event.data;
    const newUser = {
        clerkId: id,
        email: email_address[0]?.email_address,
        name: `${first_name || ""} ${last_name || ""}` || "User",
        imageUrl: image_url,
        address: [],
        wishlist: [],
    };
    await user_model_1.User.create(newUser);
});
const deleteUserFromDB = exports.inggest.createFunction({ id: "delete-user-from-db" }, { event: "clerk/user.deleted" }, async ({ event }) => {
    await (0, db_1.connectDB)();
    const { id } = event.data;
    await user_model_1.User.deleteOne({ clerkId: id });
});
exports.functions = [syncUser, deleteUserFromDB];
