import express from "express";
import { uploadImage } from "../Controller/imgController.mjs";
import { upload } from "../config/cloudinary.config.mjs";

const router = express.Router();

router.post("/upload", upload.array("image"), uploadImage);

export default router;                
                                                                                                                