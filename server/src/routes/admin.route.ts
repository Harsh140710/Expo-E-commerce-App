import { RequestHandler, Router } from "express";
import {
    createProducts,
    deleteProducts,
    getAllCustomers,
    getAllOrders,
    getAllProducts,
    getDashboardStats,
    updateOrderStatus,
    updateProducts,
} from "../controllers/admin.controller";
import { adminOnly, protectRoute } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";

const router = Router();

// optimization - DRY
router.use(protectRoute, adminOnly);

// product routes
router.post("/products",upload.array("images", 3),createProducts as RequestHandler);
router.get("/products", getAllProducts);
router.put("/products/:id",upload.array("images", 3),updateProducts as RequestHandler);
router.delete("/products/:id", deleteProducts);

// order routes
router.get("/orders", getAllOrders);
router.patch("/orders/:orderId/status", updateOrderStatus);
// PUT: Used for full resource replacement, updating the entire resource
// PATCH: Used for particular resource replacement, updating the specific parf of resource

// get all customer routes
router.get("/customers", getAllCustomers)

// stats
router.get("/stats", getDashboardStats)


export default router;
