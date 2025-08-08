// cartItemModel.js

import mongoose from 'mongoose';

// create schema for carts input and validate (require, type, min-length, default)
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product reference is required'],
  },
  quantity: {
    type: Number,
    default: 1,
    min: [1, 'Quantity must be at least 1'],
  },
}, {
  timestamps: true,
});

// create cart model based on schema
const CartItem = mongoose.model('Cart', cartItemSchema);

export default CartItem;
