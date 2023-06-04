import {Router} from "express";
import {
    getAll,
    getProductById
} from "../controllers/products.js";

const router = Router();

// GET http://localhost:3000/api/products
router.get('/api/products', getAll);

// GET http://localhost:3000/api/product/mc_donny/3
router.get('/api/product/:shopId/:productId', getProductById);


export default router;