import { Inngest } from "inngest";
import { connectDB } from "./db";
import { User } from "../models/user.model";

export const inggest = new Inngest({ id: "ecommerce-app" });

const syncUser = inggest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    console.log("🔥 SYNC USER EVENT RECEIVED:", event);

    try {
      await connectDB();
      const user = event.data;
      console.log("📥 Clerk User Data:", user);

      const email =
        user.email_addresses?.[0]?.email_address ||
        user.primary_email_address?.email_address ||
        user.external_accounts?.[0]?.email_address ||
        null;

      if (!email) {
        console.error("❌ No email found in Clerk event.");
        return { error: "Missing email" };
      }

      const imageUrl = user.image_url || user.external_accounts?.[0]?.avatar_url || "";

      await User.create({
        clerkId: user.id,
        email,
        name: `${user.first_name || ""} ${user.last_name || ""}`.trim() || "User",
        imageUrl,
        address: [],
        wishlist: [],
      });

      console.log("✅ User created in DB");
      return { message: "User synced" };
    } catch (err) {
      console.error("❌ DB ERROR:", err);
      return { error: err.message };
    }
  }
);

const deleteUserFromDB = inggest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();

    const { id } = event.data;

    await User.deleteOne({ clerkId: id });
    return { message: "User deleted from DB" };
  }
);

export const functions = [syncUser, deleteUserFromDB];
