import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware";
import { createReview, deleteReview } from "../controllers/review.controller";

const router = Router();

// review routes
router.use(protectRoute)

router.post("/", createReview)
router.delete("/:id", deleteReview)

export default router;
