import { Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import { Product } from "../models/product.model";
import { Order } from "../models/order.model";
import { User } from "../models/user.model";

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
        if (price !== undefined) product.price = parseFloat(price);
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

    if(!product) return res.status(404).json({error: "Product not found"});

    if(product?.images && product.images.length > 0) {
        const deletePromises = product.images.map((imageUrl) => {
            const publicId = "/products" + imageUrl.split("/products")[1]?.split(".")[0];
            if(publicId) return cloudinary.uploader.destroy(publicId);
        });
        await Promise.all(deletePromises.filter(Boolean));
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
}

export async function getAllOrders(_: Request, res: Response) {
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

export async function updateOrderStatus(req: Request, res: Response) {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        if (!["pending", "shipped", "delivered"].includes(status)) {
            return res.status(400).json({ error: "Invalid status" });
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        order.status = status;
        if (status === "shipped" && !order.shippedAt) {
            order.shippedAt = new Date();
        }

        if (status === "delivered" && !order.deliveredAt) {
            order.deliveredAt = new Date();
        }

        await order.save();

        res.status(200).json({ message: "Order updated successfully", order });
    } catch (error) {
        console.error("Error in updating order status", error);
        res.status(500).json({ error: "Error while updating order status" });
    }
}

export async function getAllCustomers(_: Request, res: Response) {
    try {
        // -1 means latest users comes first
        const customers = await User.find().sort({ createdAt: -1 });
        res.status(200).json({
            message: "User fetched successfully",
            customers,
        });
    } catch (error) {
        console.error("Error while fetching customers");
        res.status(500).json({ message: "Error while fetching the user" });
    }
}

export async function getDashboardStats(_: Request, res: Response) {
    try {
        const totalOrders = await Order.countDocuments();
        const revenueResult = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$totalPrice" },
                },
            },
        ]);

        const totalRevenue = revenueResult[0]?.total || 0;

        const totalCustomers = await User.countDocuments();

        const totalProducts = await Product.countDocuments();

        res.status(200).json({
            message: "Data fetched successfully",
            totalOrders,
            totalRevenue,
            totalCustomers,
            totalProducts,
        });
    } catch (error) {
        console.error("Error while fetching the stats");
        res.status(500).json({ error: "Error while fetching the stats" });
    }
}
