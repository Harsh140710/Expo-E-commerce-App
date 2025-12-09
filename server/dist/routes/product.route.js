"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const admin_controller_1 = require("../controllers/admin.controller");
const product_controller_1 = require("../controllers/product.controller");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.protectRoute);
// products routes
router.get("/", admin_controller_1.getAllProducts);
router.get("/:id", product_controller_1.getProductById);
exports.default = router;
