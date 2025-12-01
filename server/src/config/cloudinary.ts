import { v2 as cloudinary } from "cloudinary";
import { ENV } from "./env";

cloudinary.config({
    cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
    cloud_api: ENV.CLOUDINARY_API_KEY,
    cloud_secret: ENV.CLERK_SECRET_KEY,
});

export default cloudinary;
