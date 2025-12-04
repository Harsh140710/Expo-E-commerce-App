"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.protectRoute);
// address routes
router.post("/addresses", user_controller_1.addAddress);
router.get("/addresses", user_controller_1.getAddress);
router.put("/addresses/:addressId", user_controller_1.updateAddress);
router.delete("/addresses/:addressId", user_controller_1.deleteAddress);
// wishlist routes
router.post("/wishlist", user_controller_1.addToWishlist);
router.delete("/wishlist/:productId", user_controller_1.removeFromWishlist);
router.get("/wishlist", user_controller_1.getWishlist);
exports.default = router;
