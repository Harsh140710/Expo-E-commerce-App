import { Request, Response } from "express";
import { Product } from "../models/product.model";

export async function getProductById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product)
            return res.status(404).json({ error: "Product not found" });

        res.status(200).json({
            message: "Products fetched successfully",
            product,
        });
    } catch (error) {
        console.error("Error fetching products", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
