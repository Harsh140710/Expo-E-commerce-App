import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware";
import { createOrder, getUserOrder } from "../controllers/order.controller";

const router = Router();

router.use(protectRoute)

// order routes
router.post("/", createOrder)
router.get("/", getUserOrder)

export default router;
