import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is Required"]
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: [true, "Price is Required"]
    },
    discountPercentage: {
        type: Number,
        min: [0, "Minimum discount of product must be 0"],
        max: [50, "Maximum discount of product must be under 50"],
        required: [true, "Discount is Required"]
    },
    rating: {
        type: Number,
        min: [0, "Minimum rating of product must be 0"],
        max: [5, "Maximum rating of product must be under 5"],
        default: 0
    },
    stock: {
        type: Number,
        min: [0, "Minimum stock of product must be 0"]
    },
    brand: {
        type: String,
        required: [true, "Brand is Required"]
    },
    category: {
        type: String,
        required: [true, "Category is Required"]
    },
    thumbnail: {
        type: String,
        required: [true, "Thumbnail is Required"]
    },
    images: {
        type: String,
        required: [true, "Images is Required"]
    }
});

const Product = mongoose.model("Product", productSchema);

export default Product;
