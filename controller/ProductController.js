
import mongoose from 'mongoose';
import Product from '../models/ProductModel.js';


// // Helper to validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Create a new Product
export async function createProduct (req, res){
 
  try {
    // Validate required fields manually (if no validation middleware is used)
    const { name, price, description, stock } = req.body;

    if (!name || !price || !description || !stock) {
      return res.status(400).json({ error: 'All fields required.' });
    }

    const product = new Product({
      name,
      price,
      description,
      stock,
      // Add other fields as needed
    });

    const savedProduct = await product.save();

    return res.status(201).json({
      message: 'Product created successfully.',
      product: savedProduct,
    });
  }
  catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Read All Products
 export async function fetchAllProducts (req, res){
  try {
    const products = await Product.find();
    res.json({message: "List of All Products", products});
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};


// Read Product by ID
export async function fetchProductById (req, res){
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({message: `Get product item by id ${id}`, product});
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving product' });
  }
};



// Update Product
export async function updateProduct(req, res){
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  try {
    const updated = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.json({message: "Product Updated SuccessFully", updated});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



// Delete Product
export async function deleteProduct (req, res){
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  try {
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted', deleted });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};


