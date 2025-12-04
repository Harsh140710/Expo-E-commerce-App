"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReview = createReview;
exports.deleteReview = deleteReview;
const order_model_1 = require("../models/order.model");
const review_model_1 = require("../models/review.model");
const product_model_1 = require("../models/product.model");
async function createReview(req, res) {
    try {
        const { productId, orderId, rating } = req.body;
        if (!rating || rating < 1 || rating > 5) {
            return res
                .status(400)
                .json({ error: "Rating must be between 1 to 5" });
        }
        const user = req.user;
        // verify order exists and it is delivered
        const order = await order_model_1.Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        if (order.clerkId !== user?.clerkId) {
            return res
                .status(403)
                .json({ error: "Not authorized to review this order" });
        }
        if (order.status !== "delivered") {
            return res
                .status(400)
                .json({ error: "Can only review delivered orders" });
        }
        // verify product is in the order
        const productInOrder = order.orderItems.find((item) => item.product.toString() === productId.toString());
        if (!productInOrder) {
            return res
                .status(400)
                .json({ error: "Product not found in this order" });
        }
        // check if review already exist
        const existingReview = await review_model_1.Review.findOne({
            productId,
            userId: user._id,
        });
        if (existingReview) {
            return res
                .status(400)
                .json({ error: "You have already reviewed this product" });
        }
        const review = await review_model_1.Review.create({
            productId: productId,
            userId: user._id,
            orderId: orderId,
            rating: rating,
        });
        // update product rating
        const reviews = await review_model_1.Review.find({ productId });
        const totalRating = reviews.reduce((sum, rev) => sum + rev.rating, 0);
        const updateProduct = await product_model_1.Product.findByIdAndUpdate(productId, {
            averageRating: totalRating / reviews.length,
            totalReviews: reviews.length,
        }, { new: true, runValidators: true });
        if (!updateProduct) {
            await review_model_1.Review.findByIdAndDelete(review._id);
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(201).json({
            message: "Review submitted successfully",
            review,
        });
    }
    catch (error) {
        console.error("Error while submitting review", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
async function deleteReview(req, res) {
    try {
        const { reviewId } = req.params;
        const user = req.user;
        const review = await review_model_1.Review.findById(reviewId);
        if (!review) {
            res.status(404).json({ error: "Review not found" });
        }
        if (review?.userId.toString() !== user?._id.toString()) {
            return res
                .status(403)
                .json({ error: "Not authorized to delete the review" });
        }
        const productId = review?.productId;
        await review_model_1.Review.findByIdAndDelete(reviewId);
        const reviews = await review_model_1.Review.find({ productId });
        const totalRating = reviews.reduce((sum, rev) => sum + rev.rating, 0);
        await product_model_1.Product.findByIdAndUpdate(productId, {
            averageRating: reviews.length > 0 ? totalRating / reviews.length : 0,
            totalReviews: reviews.length,
        });
        res.status(201).json({ message: "Review deleted successfully    " });
    }
    catch (error) {
        console.error("Error while submitting review", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
