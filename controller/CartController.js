// controllers/cart.controller.js
import CartItem from '../models/CartModel.js';
import Product from '../models/ProductModel.js';
import mongoose from 'mongoose';

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Add to Cart
export const addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  if (!isValidObjectId(productId)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }
  if (quantity < 1) {
    return res.status(400).json({ error: 'Quantity must be at least 1' });
  }

  try {
    // check product exist in dataBase
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const existingItem = await CartItem.findOne({ productId });
    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.json(existingItem);
    }
    // create new cart and save to data base
    const newItem = new CartItem({ productId, quantity });
    // console.log(newItem);
    
    await newItem.save();
    res.status(201).json({message: "cart item added successFully", newItem});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};

// Get All Cart Items
export const getCartItems = async (req, res) => {
  try {
    const items = await CartItem.find().populate('productId');
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
};

// Update Cart Item
export const updateCartItem = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid cart item ID' });
  }
  if (typeof quantity !== 'number' || quantity < 1) {
    return res.status(400).json({ error: 'Quantity must be a positive number' });
  }

  try {
    const item = await CartItem.findById(id);
    if (!item) return res.status(404).json({ error: 'Cart item not found' });

    // if cart already exist increase the quantity only
    item.quantity = quantity;
    await item.save();
    res.json({message: `SucessFully Updated cart item with id ${id}`, item});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update cart item' });
  }
};

// Delete Cart Item
export const deleteCartItem = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid cart item ID' });
  }

  try {
    // find the cart by id and delete
    const deleted = await CartItem.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Cart item not found' });

    res.json({ message: 'Item removed from cart', deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
};
