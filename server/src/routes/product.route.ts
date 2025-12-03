import { Router } from "express";
import { adminOnly, protectRoute } from "../middlewares/auth.middleware";
import { getAllProducts } from "../controllers/admin.controller";
import { getProductById } from "../controllers/product.controller";

const router = Router();

router.use(protectRoute)

// products routes
router.get("/", getAllProducts)
router.get("/:id", getProductById)

export default router;
