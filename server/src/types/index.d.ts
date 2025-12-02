import { UserDocument } from "../models/user.model";

declare global {
    namespace Express {
        interface Request {
            user?: UserDocument;
            auth: () => { userId: string | null }; // Clerk's requireAuth injects this
        }
    }
}
