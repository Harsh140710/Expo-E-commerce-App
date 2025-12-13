import { useState } from "react";
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    XIcon,
    ImageIcon,
    IndianRupeeIcon,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productApi } from "../lib/api";
import { getStockStatusBadge } from "../lib/utils";
import { Product } from "../types";

type formData = {
    name: string;
    category: string;
    price: string;
    stock: string;
    brand: string;
    description: string;
};

const ProductPage = () => {
    const [showModel, setShowModel] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState<formData | null>({
        name: "",
        category: "",
        price: "",
        stock: "",
        brand: "",
        description: "",
    });

    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const queryClient = useQueryClient();

    // get products array from backend api
    const { data: products = [] } = useQuery({
        queryKey: ["products"],
        queryFn: productApi.getAll,
    });

    // when you creating, update or deleting something that time use mutation in tanstack-query
    const createProductMutation = useMutation({
        mutationFn: productApi.create,
        onSuccess: () => {
            closeModel();
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });

    const updateProductMutation = useMutation({
        mutationFn: productApi.update,
        onSuccess: () => {
            closeModel();
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });

    const deleteProductMutation = useMutation({
        mutationFn: productApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] })
        }
    })

    const closeModel = () => {
        // reset the state
        setShowModel(false);
        setEditingProduct(null);
        setFormData({
            name: "",
            category: "",
            price: "",
            stock: "",
            brand: "",
            description: "",
        });
        setImages([]);
        setImagePreviews([]);
    };

    // edit the product
    const handleEdit = (product: any) => {
        // edit the product
        setEditingProduct(product);
        setFormData({
            name: product.name,
            category: product.category,
            price: product.price.toString(),
            stock: product.stock.toString(),
            brand: product.brand,
            description: product.description,
        });
        setImagePreviews(product.images);
        setShowModel(true);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []) as File[];

        if (files.length > 3) {
            alert("Maximum 3 images allowed");
            return;
        }

        setImages(files);
        setImagePreviews(files.map((file) => URL.createObjectURL(file)));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        // for new products, require images
        if (!editingProduct && imagePreviews.length === 0) {
            return alert("Please upload at least 1 image");
        }

        if (!formData) {
            return alert("Form data is missing");
        }

        const formDateToSend = new FormData();
        formDateToSend.append("name", formData.name);
        formDateToSend.append("description", formData.description);
        formDateToSend.append("price", formData.price);
        formDateToSend.append("stock", formData.stock);
        formDateToSend.append("brand", formData.brand);
        formDateToSend.append("category", formData.category);

        // only append new images if they were selected
        if (images.length > 0)
            images.forEach((image) => formDateToSend.append("images", image));

        if (editingProduct) {
            updateProductMutation.mutate({
                id: editingProduct._id,
                formData: formDateToSend,
            });
        } else {
            createProductMutation.mutate(formDateToSend);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Products</h1>
                    <p className="text-base-content/70 mt-1">
                        Manage your product inventory
                    </p>
                </div>
                <button
                    onClick={() => setShowModel(true)}
                    className="btn btn-primary gap-2"
                >
                    <PlusIcon className="w-5 h-5" />
                    Add Product
                </button>
            </div>

            {/* Products grid */}

            <div className="gird grid-cols-1 gap-4">
                {products?.map((product: Product) => {
                    const status = getStockStatusBadge(product.stock);

                    return (
                        <div
                            key={product._id}
                            className="card bg-base-100 shadow-xl mb-1"
                        >
                            <div className="card-body">
                                <div className="flex items-center gap-6">
                                    {/* AVATAR */}
                                    <div className="avatar">
                                        <div className="w-20 rounded-xl">
                                            <img
                                                src={product.images[0]}
                                                alt={product.name}
                                            />
                                        </div>
                                    </div>

                                    {/* DETAILS */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between">
                                            {/* PRODUCT TITLE */}
                                            <div>
                                                <h3 className="card-title">
                                                    {product.name}
                                                </h3>
                                                <p className="text-base-content/70 text-sm">
                                                    {product.category}
                                                </p>
                                            </div>
                                            {/* PRODUCT BRAND */}
                                            <div>
                                                <h3 className="card-title">
                                                    {product.brand}
                                                </h3>
                                            </div>

                                            {/* BADGE */}
                                            <div
                                                className={`badge ${status.class}`}
                                            >
                                                {status.text}
                                            </div>

                                            {/* PRICE & STOCK */}
                                            <div className="flex items-center gap-6 mt-4">
                                                <div>
                                                    <p className="text-sm text-base-content/70">
                                                        Price
                                                    </p>
                                                    <p className="font-bold text-lg flex items-center justify-center">
                                                        <IndianRupeeIcon className="size-4" />
                                                        {product.price.toFixed(2)}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-base-content/70">
                                                        Stock
                                                    </p>
                                                    <p className="font-bold text-lg">
                                                        {product.stock} units
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CARD ACTIONS */}
                                    <div className="card-actions">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="btn btn-circle btn-ghost"
                                        >
                                            <PencilIcon className="size-5" />
                                        </button>
                                        <button
                                            onClick={() => deleteProductMutation.mutate(product._id)}
                                            className="btn btn-circle btn-ghost text-error">
                                            {deleteProductMutation.isPending ? (
                                                <span className="loading loading-spinner"></span>
                                            ) : <TrashIcon className="size-5" />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ADD & EDIT PRODUCT MODEL */}
            <input
                type="checkbox"
                className="modal-toggle"
                checked={showModel}
            />
            <div className="modal">
                <div className="modal-box max-h-96 max-w-1.5xl">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-2xl">
                            {editingProduct
                                ? "Edit Product"
                                : "Add New Product"}
                        </h3>

                        <button
                            onClick={closeModel}
                            className="btn btn-sm btn-circle btn-ghost"
                        >
                            <XIcon />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-x-4">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Product Name */}
                            <div className="form-control">
                                <label className="label">
                                    <span>Product Name</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered"
                                    placeholder="Enter product name"
                                    value={formData?.name}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>,
                                    ) =>
                                        setFormData((prev) =>
                                            prev
                                                ? {
                                                      ...prev,
                                                      name: e.target.value,
                                                  }
                                                : null,
                                        )
                                    }
                                    required
                                />
                            </div>

                            {/* Product Brand Name */}
                            <div className="form-control">
                                <label className="label">
                                    <span>Brand Name</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered"
                                    placeholder="Enter product name"
                                    value={formData?.brand}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>,
                                    ) =>
                                        setFormData((prev) =>
                                            prev
                                                ? {
                                                      ...prev,
                                                      brand: e.target.value,
                                                  }
                                                : null,
                                        )
                                    }
                                    required
                                />
                            </div>

                            {/* Product Category */}
                            <div className="form-control">
                                <label className="label">
                                    <span>Category</span>
                                </label>

                                <select
                                    className="select select-bordered"
                                    value={formData?.category}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLSelectElement>,
                                    ) => {
                                        setFormData((prev) =>
                                            prev
                                                ? {
                                                      ...prev,
                                                      category: e.target.value,
                                                  }
                                                : null,
                                        );
                                    }}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="Man's Watches">
                                        Men's Watches
                                    </option>
                                    <option value="Woman's Watches">
                                        Woman's Watches
                                    </option>
                                    <option value="Kids Watches">
                                        Kids Watches
                                    </option>
                                    <option value="Fashion">Smart Watch</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Sports">Digital</option>
                                    <option value="Digital">Others</option>
                                </select>
                            </div>

                            {/* Product Price */}
                            <div className="form-control">
                                <label className="label flex items-center">
                                    <span className="flex items-center justify-center">
                                        Price{" "}
                                        <IndianRupeeIcon className="size-4" />
                                    </span>
                                </label>
                                <input
                                    step="0.01"
                                    type="number"
                                    className="input input-bordered"
                                    placeholder="Enter Price"
                                    value={formData?.price}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>,
                                    ) =>
                                        setFormData((prev) =>
                                            prev
                                                ? {
                                                      ...prev,
                                                      price: e.target.value,
                                                  }
                                                : null,
                                        )
                                    }
                                    required
                                />
                            </div>

                            {/* Product stock */}
                            <div className="form-control">
                                <label className="label">
                                    <span>Stock</span>
                                </label>
                                <input
                                    step="1"
                                    type="number"
                                    className="input input-bordered"
                                    placeholder="Enter Stock"
                                    value={formData?.stock}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>,
                                    ) =>
                                        setFormData((prev) =>
                                            prev
                                                ? {
                                                      ...prev,
                                                      stock: e.target.value,
                                                  }
                                                : null,
                                        )
                                    }
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-control flex flex-col gap-2 mt-4 mb-4">
                            <label className="label">
                                <span>Description</span>
                            </label>
                            <textarea
                                className="textarea textarea-bordered h-24 w-full"
                                placeholder="Enter product description"
                                value={formData?.description}
                                onChange={(
                                    e: React.ChangeEvent<HTMLTextAreaElement>,
                                ) =>
                                    setFormData((prev) =>
                                        prev
                                            ? {
                                                  ...prev,
                                                  description: e.target.value,
                                              }
                                            : null,
                                    )
                                }
                                required
                            />
                        </div>

                        <div className="form-control flex flex-col gap-2">
                            <label className="label">
                                <span className="label-text font-semibold text-base flex items-center gap-2">
                                    <ImageIcon className="size-5" />
                                    Product Images
                                </span>
                                <span className="label-text-alt text-xs opacity-60">
                                    Max 3 images
                                </span>
                            </label>
                            <div className="bg-base-200 rounded-xl p-4 border-2 border-dashed border-base-300 hover:border-primary transition-colors">
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    className="file-input file-input-bordered file-input-primary w-full"
                                    required={!editingProduct}
                                />

                                {editingProduct && (
                                    <p className="text-xs text-base-content/60 mt-2 text-center">
                                        Leave empty to keep current image
                                    </p>
                                )}

                                {imagePreviews.length > 0 && (
                                    <div className="flex gap-2 mt-2">
                                        {imagePreviews.map((preview, index) => (
                                            <div key={index} className="avatar">
                                                <div className="w-20 rounded-lg">
                                                    <img
                                                        src={preview}
                                                        alt={`Preview ${
                                                            index + 1
                                                        }`}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="modal-action">
                                {/* CANCEL BUTTON */}
                                <button
                                    className="btn btn-ghost"
                                    type="button"
                                    onClick={closeModel}
                                    disabled={
                                        createProductMutation.isPending ||
                                        updateProductMutation.isPending
                                    }
                                >
                                    Cancel
                                </button>

                                {/* SUBMIT BUTTON */}
                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                    disabled={
                                        createProductMutation.isPending ||
                                        updateProductMutation.isPending
                                    }
                                >
                                    {createProductMutation.isPending ||
                                    updateProductMutation.isPending ? (
                                        <span className="loading loading-spinner"></span>
                                    ) : editingProduct ? (
                                        "Update Product"
                                    ) : (
                                        "Add Product"
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
