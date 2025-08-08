
// routes/cart.routes.js
import express from 'express';
import { addToCart, getCartItems, updateCartItem, deleteCartItem } from '../controller/CartController.js';

const router = express.Router();

// setup route for cart
router.post('/', addToCart);
router.get('/', getCartItems);
router.put('/:id', updateCartItem);
router.delete('/:id', deleteCartItem);

export default router;
