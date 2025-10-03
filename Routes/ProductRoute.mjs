import express from "express";
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct

} from '../Controller/ProdcutController.mjs';

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/:id', getProductById);
router.post('/add/products', createProduct);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);



export default router;
