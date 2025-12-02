import { Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import { Product } from "../models/product.model";
import { Order } from "../models/order.model";

export interface MulterRequest extends Request {
    files?: Express.Multer.File[];
}

export async function createProducts(req: MulterRequest, res: Response) {
    try {
        const { name, description, price, stock, category } = req.body;

        if (!name || !description || !price || !stock || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!req.files || req.files.length === 0) {
            return res
                .status(400)
                .json({ message: "At least one image is required" });
        }

        if (req.files.length > 3) {
            return res.status(400).json({
                message: "Maximum 3 images are allowed",
            });
        }

        const uploadPromises = req.files.map((file) => {
            return cloudinary.uploader.upload(file.path, {
                folder: "products",
            });
        });

        const uploadResult = await Promise.all(uploadPromises);

        //secure url before upload
        const imageUrls = uploadResult.map((result) => result.secure_url);

        const newProduct = await Product.create({
            name: name,
            description: description,
            price: parseFloat(price),
            stock: parseInt(stock),
            category: category,
            images: imageUrls,
        });

        res.status(200).json(newProduct);
    } catch (error) {
        console.error("Error creating product", error);
        res.status(500).json({ message: "Failed to create product" });
    }
}

export async function getAllProducts(_: Request, res: Response) {
    try {
        // -1 means decs order: most recent product first
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching product", error);
        res.status(500).json({ message: "Error while fetching the products" });
    }
}

export async function updateProducts(req: MulterRequest, res: Response) {
    try {
        const { id } = req.params;
        const { name, description, price, stock, category } = req.body;

        const product = await Product.findById(id);

        if (!product)
            return res.status(404).json({ message: "Product not found" });

        if (name) product.name = name;
        if (description) product.description = description;
        if (price) product.price = parseFloat(price);
        if (stock !== undefined) product.stock = parseInt(stock);
        if (category) product.category = category;

        // handle image update if new images are uploaded
        if (req.files && req.files.length > 0) {
            if (req.files.length > 3) {
                return res
                    .status(400)
                    .json({ message: "Maximum 3 images are allowed" });
            }

            const uploadPromises = req.files.map((file) => {
                return cloudinary.uploader.upload(file.path, {
                    folder: "products",
                });
            });

            const uploadResult = await Promise.all(uploadPromises);
            product.images = uploadResult.map((result) => result.secure_url);
        }

        await product.save();
        res.status(200).json(product);
    } catch (error) {
        console.error("Error while updating the product", error);
        res.status(500).json({ message: "Error while updating the product" });
    }
}

export async function deleteProducts(req: Request, res: Response) {
    const { id } = req.params;
    const product = await Product.findById(id);
    product?.deleteOne();
    res.status(200).json({ message: "Product deleted successfully" });
}

export async function getAllOrders(req: Request, res: Response) {
    try {
        // -1 means decs order: most recent product first
        const orders = await Order.find()
            .populate("user", "name email")
            .populate("orderItems.product")
            .sort({ createdAt: -1 });
            
        res.status(200).json({ orders });
    } catch (error) {
        console.error("Error fetching product", error);
        res.status(500).json({ message: "Error while fetching the products" });
    }
}

export async function updateOrderStatus(req: Request, res: Response) {}
