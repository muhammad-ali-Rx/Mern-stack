import express from "express";
import {
    getAllProducts,
    getProductById,
    createProduct

} from '../Controller/ProdcutController.mjs';

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/:id', getProductById);
router.post('/add/products', createProduct);



export default router;
