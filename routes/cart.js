import {Router} from "express";
import {
    getAll,
    updateCart
} from "../controllers/cart.js";

const router = Router();

router.post('/api/cart', updateCart);

router.get('/api/carts', getAll);

export default router;