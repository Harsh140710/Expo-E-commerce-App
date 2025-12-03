import { Router } from "express";
import {
    addAddress,
    addToWishlist,
    deleteAddress,
    getAddress,
    getWishlist,
    removeFromWishlist,
    updateAddress,
} from "../controllers/user.controller";
import { protectRoute } from "../middlewares/auth.middleware";

const router = Router();

router.use(protectRoute);

// address routes
router.post("/addresses", addAddress);
router.get("/addresses", getAddress);
router.put("/addresses/:addressId", updateAddress);
router.delete("/addresses/:addressId", deleteAddress);

// wishlist routes
router.post("/wishlist", addToWishlist);
router.delete("/wishlist/:productId", removeFromWishlist);
router.get("/wishlist", getWishlist);


export default router;
