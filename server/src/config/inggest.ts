import { Inngest } from "inngest";
import { connectDB } from "./db";
import { User } from "../models/user.model";

export const inggest = new Inngest({ id: "ecommerce-app" });

const syncUser = inggest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB();

    const user = event.data;

    const email =
      user.email_addresses?.[0]?.email_address ||   // normal case
      user.primary_email_address?.email_address ||  // some Clerk plans
      null;                                         // fallback

    const newUser = {
      clerkId: user.id,
      email,
      name: `${user.first_name || ""} ${user.last_name || ""}`.trim() || "User",
      imageUrl: user.image_url,
      address: [],
      wishlist: [],
    };

    await User.create(newUser);
    return { message: "User synced to DB" };
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
