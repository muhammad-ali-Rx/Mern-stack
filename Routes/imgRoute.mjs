import express from "express";
import { uploadImage } from "../Controller/imgController.mjs";
import { upload } from "../config/cloudinary.config.mjs";
 // ✅ This line is missing in your code

const router = express.Router();

router.post("/upload", upload.single("image"), uploadImage);

export default router;
    