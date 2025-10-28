import express from "express";
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    addimgToProduct

} from '../Controller/ProdcutController.mjs';
import { upload } from "../config/cloudinary.config.mjs";

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/:id', getProductById);
router.post('/addproducts', createProduct);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);
router.post("/addimg", upload.single("image"), addimgToProduct);



export default router;
