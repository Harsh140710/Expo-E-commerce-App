"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_2 = require("inngest/express");
const inggest_1 = require("./config/inggest");
dotenv_1.default.config({ quiet: true });
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
// inggest connection for user creation or deletion
exports.app.use("/api/inngest", (0, express_2.serve)({ client: inggest_1.inggest, functions: inggest_1.functions }));
const admin_route_1 = __importDefault(require("./routes/admin.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const order_route_1 = __importDefault(require("./routes/order.route"));
const review_route_1 = __importDefault(require("./routes/review.route"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const cart_route_1 = __importDefault(require("./routes/cart.route"));
// admin route
exports.app.use("/api/admin", admin_route_1.default);
exports.app.use("/api/users", user_route_1.default);
exports.app.use("/api/orders", order_route_1.default);
exports.app.use("/api/reviews", review_route_1.default);
exports.app.use("/api/products", product_route_1.default);
exports.app.use("/api/cart", cart_route_1.default);
