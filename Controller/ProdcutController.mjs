import Product from "../Model/Product.mjs";
import { CloudinaryStorage } from "multer-storage-cloudinary";


export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const addimgToProduct = async (req, res) => {
  try{
    console.log(req.file);
    console.log(req.file.path);
    const newProduct =new Product({
      ...req.body , images: req.file.path,
      thumbnail: req.file.path
    });
    const addedimg = await newProduct.save();
    if (!addedimg) {
      return res.status(404).json({ message: "Product not found" });
    }else{
      res.status(200).json({
        message: "Image added successfully",
        data: addedimg,
      });
    }
  }catch(error){
    console.error("Upload error:", error);
    res.status(400).json({ message: error.message });

  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


