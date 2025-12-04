"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCart = getCart;
exports.addToCart = addToCart;
exports.updateCartItem = updateCartItem;
exports.removeFromCart = removeFromCart;
exports.clearCart = clearCart;
const cart_model_1 = require("../models/cart.model");
const product_model_1 = require("../models/product.model");
async function getCart(req, res) {
    try {
        let cart = await cart_model_1.Cart.findOne({ clerkId: req.user?.clerkId }).populate("items.product");
        if (!cart) {
            const user = req?.user;
            cart = await cart_model_1.Cart.create({
                user: user?._id,
                clerkId: user?.clerkId,
                items: [],
            });
        }
        res.status(200).json({ cart });
    }
    catch (error) {
        console.error("Error in getCart controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
async function addToCart(req, res) {
    try {
        const { productId, quantity = 1 } = req.body;
        const user = req.user;
        if (!user) {
            return res.status(400).json({ error: "Unauthorized user" });
        }
        // validate product exist and has stock
        const product = await product_model_1.Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        if (product.stock < quantity) {
            return res.status(400).json({ error: "Insufficient stock" });
        }
        let cart = await cart_model_1.Cart.findOne({ clerkId: user?.clerkId });
        if (!cart) {
            cart = await cart_model_1.Cart.create({
                user: user._id,
                clerkId: user.clerkId,
                items: [],
            });
        }
        // check if item already in the cart
        const existingItem = cart.items.find((item) => item.product.toString() === productId);
        if (existingItem) {
            const newQuantity = existingItem.quantity + 1;
            if (product.stock < newQuantity) {
                return res.status(400).json({ error: "Insufficient stock" });
            }
            existingItem.quantity = newQuantity;
        }
        else {
            // add new item
            cart.items.push({ product: productId, quantity });
        }
        await cart.save();
        res.status(201).json({ message: "Item added in the cart" });
    }
    catch (error) {
        console.error("Error in addToCart controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
async function updateCartItem(req, res) {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;
        if (quantity < 1) {
            return res
                .status(400)
                .json({ error: "Quantity must be at least 1 " });
        }
        const cart = await cart_model_1.Cart.findOne({ clerkId: req.user?.clerkId });
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }
        const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
        if (itemIndex === -1) {
            return res.status(400).json({ error: "Item not found in cart" });
        }
        // check if product exist & validate stock
        const product = await product_model_1.Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        if (product.stock < quantity) {
            return res.status(400).json({ error: "Insufficient stock" });
        }
        cart.items[itemIndex].quantity = quantity;
        await cart.save();
        res.status(200).json({ message: "Cart updated successfully", cart });
    }
    catch (error) {
        console.error("Error in updateCartItem controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
async function removeFromCart(req, res) {
    try {
        const { productId } = req.params;
        const cart = await cart_model_1.Cart.findOne({ clerkId: req.user?.clerkId });
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }
        // todo:check if not working
        cart.items.pull({ productId });
        await cart.save();
        res.status(200).json({ message: "Item removed from cart", cart });
    }
    catch (error) {
        console.error("Error in removeFromCart controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
async function clearCart(req, res) {
    try {
        const cart = await cart_model_1.Cart.findOne({ clerkId: req.user?.clerkId });
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }
        // also set items to empty array
        // cart.set("items", []);
        // clear Document Array
        cart.items.splice(0);
        await cart.save();
        res.status(200).json({ message: "Clear cleared", cart });
    }
    catch (error) {
        console.error("Error in clearCart controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
