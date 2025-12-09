"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = createOrder;
exports.getUserOrder = getUserOrder;
const product_model_1 = require("../models/product.model");
const order_model_1 = require("../models/order.model");
const review_model_1 = require("../models/review.model");
async function createOrder(req, res) {
    try {
        const { orderItems, shippingAddress, paymentResult, totalPrice } = req.body;
        const user = req.user;
        if (!user) {
            return res.status(401).json({ error: "User not authenticated" });
        }
        if (!orderItems || !shippingAddress || !paymentResult || !totalPrice) {
            return res.status(400).json({ error: "All fields are required" });
        }
        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ error: "no order items" });
        }
        // validate product and stock
        // todo: check later in the video if this is actually not working
        for (const item of orderItems) {
            const product = await product_model_1.Product.findById(item.product._id);
            if (!product) {
                return res
                    .status(400)
                    .json({ error: `Product ${item.name} not found` });
            }
            if (product.stock < item.quantity) {
                return res
                    .status(400)
                    .json({ error: `Insufficient stock for ${product.name}` });
            }
        }
        const order = await order_model_1.Order.create({
            user: user._id,
            clerkId: user.clerkId,
            orderItems: orderItems,
            shippingAddress: shippingAddress,
            paymentResult: paymentResult,
            totalPrice: totalPrice,
        });
        // update product stock
        for (const item of orderItems) {
            // todo: check later in the video if this is actually not working
            await product_model_1.Product.findByIdAndUpdate(item.product._id, {
                $inc: { stock: -item.quantity },
            });
        }
        res.status(201).json({ message: "Order created successfully", order });
    }
    catch (error) {
        console.error("Error in createOrder controller", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
async function getUserOrder(req, res) {
    try {
        const orders = await order_model_1.Order.find({ clerkId: req.user?.clerkId })
            .populate("orderItems.product")
            .sort({ createdAt: -1 });
        // check if each order has been reviewed
        const orderIds = orders.map((order) => order._id);
        const review = await review_model_1.Review.find({ orderId: { $in: orderIds } });
        const reviewedOrderIds = new Set(review.map((review) => review.orderId.toString()));
        const ordersWithReviewStatus = await Promise.all(orders.map(async (order) => {
            const review = await review_model_1.Review.findOne({ orderId: order._id });
            return {
                ...order.toObject(),
                hasReviewed: reviewedOrderIds.has(order._id.toString())
            };
        }));
        res.status(200).json({
            message: "Orders fetched successfully",
            orders: ordersWithReviewStatus,
        });
    }
    catch (error) {
        console.error("Error in createOrder controller", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
