"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const multer_middleware_1 = require("../middlewares/multer.middleware");
const router = (0, express_1.Router)();
// optimization - DRY
router.use(auth_middleware_1.protectRoute, auth_middleware_1.adminOnly);
// product routes
router.post("/products", multer_middleware_1.upload.array("images", 3), admin_controller_1.createProducts);
router.get("/products", admin_controller_1.getAllProducts);
router.put("/products/:id", multer_middleware_1.upload.array("images", 3), admin_controller_1.updateProducts);
router.delete("/products/:id", admin_controller_1.deleteProducts);
// order routes
router.get("/orders", admin_controller_1.getAllOrders);
router.patch("/orders/:orderId/status", admin_controller_1.updateOrderStatus);
// PUT: Used for full resource replacement, updating the entire resource
// PATCH: Used for particular resource replacement, updating the specific parf of resource
// get all customer routes
router.get("/customers", admin_controller_1.getAllCustomers);
// stats
router.get("/stats", admin_controller_1.getDashboardStats);
exports.default = router;
