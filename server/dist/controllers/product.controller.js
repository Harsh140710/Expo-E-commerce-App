"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = getProductById;
const product_model_1 = require("../models/product.model");
async function getProductById(req, res) {
    try {
        const { id } = req.params;
        const product = await product_model_1.Product.findById(id);
        if (!product)
            return res.status(404).json({ error: "Product not found" });
        res.status(200).json({
            message: "Products fetched successfully",
            product,
        });
    }
    catch (error) {
        console.error("Error fetching products", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
