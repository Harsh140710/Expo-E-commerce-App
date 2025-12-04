"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const order_controller_1 = require("../controllers/order.controller");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.protectRoute);
// order routes
router.post("/", order_controller_1.createOrder);
router.get("/", order_controller_1.getUserOrder);
exports.default = router;
