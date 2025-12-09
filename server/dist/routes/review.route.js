"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const review_controller_1 = require("../controllers/review.controller");
const router = (0, express_1.Router)();
// review routes
router.use(auth_middleware_1.protectRoute);
router.post("/", review_controller_1.createReview);
router.delete("/:id", review_controller_1.deleteReview);
exports.default = router;
