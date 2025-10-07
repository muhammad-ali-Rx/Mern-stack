import { CloudinaryStorage } from "multer-storage-cloudinary";
import img from "../Model/img.mjs";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      console.log("No file received");
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = {
      url: req.file.path,
      public_id: req.file.filename,
    };
    
    const newImage = new img(result);
    await newImage.save();
    console.log("File uploaded successfully", result);


    res.status(200).json({
      message: "Image uploaded successfully",
      data: result,
    });

  } catch (error) {
    console.error("Upload error:", error);
    
    res.status(500).json({
      message: "Image upload failed",
      error: error.message,
    });
  }
};
