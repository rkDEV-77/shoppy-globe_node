
import express from 'express';
import {
  createProduct,
  fetchAllProducts,
  fetchProductById,
  updateProduct,
  deleteProduct
} from '../controller/ProductController.js';

const router = express.Router();

// Route setup for product
router.post('/', createProduct);              // POST /api/products
router.get('/', fetchAllProducts);            // GET /api/products
router.get('/:id', fetchProductById);         // GET /api/products/:id
router.put('/:id', updateProduct);            // PUT /api/products/:id
router.delete('/:id', deleteProduct);         // DELETE /api/products/:id

export default router;

