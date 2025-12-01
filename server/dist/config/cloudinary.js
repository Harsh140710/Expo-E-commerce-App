"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const env_1 = require("./env");
cloudinary_1.v2.config({
    cloud_name: env_1.ENV.CLOUDINARY_CLOUD_NAME,
    cloud_api: env_1.ENV.CLOUDINARY_API_KEY,
    cloud_secret: env_1.ENV.CLERK_SECRET_KEY,
});
exports.default = cloudinary_1.v2;
