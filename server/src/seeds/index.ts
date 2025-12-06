import mongoose from "mongoose";
import { ENV } from "../config/env";
import { Product } from "../models/product.model";


const products = [
  {
    name: "Rolex the rose",
    description:
      "Premium and luxury brand for people who loves luxury ness with premium look with brand.",
    price: 256000.49,
    stock: 250,
    brand: "Rolex",
    category: "Men's Watches",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500",
    ],
    averageRating: 4.5,
    totalReviews: 128,
  },
  {
    name: "Boat crest 1100",
    description:
      "Advanced fitness tracking, heart rate monitor, GPS, and water-resistant design. Stay connected with notifications and apps on your wrist.",
    price: 2299.99,
    stock: 3000,
    brand: "Boat",
    category: "Sports",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500",
    ],
    averageRating: 4.7,
    totalReviews: 256,
  },
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(ENV.DB_URL);
    console.log("Connected to MongoDB");

    // Clear existing products
    await Product.deleteMany({});
    console.log("Cleared existing products");

    // Insert seed products
    await Product.insertMany(products);
    console.log(`Successfully seeded ${products.length} products`);

    // Display summary
    const categories = [...new Set(products.map((p) => p.category))];
    console.log("\nSeeded Products Summary:");
    console.log(`Total Products: ${products.length}`);
    console.log(`Categories: ${categories.join(", ")}`);

    // Close connection
    await mongoose.connection.close();
    console.log("\nDatabase seeding completed and connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();