// productModel.js
import mongoose from 'mongoose';

// create schema for product input and validate (require, type, min-length, default)
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    minlength: [2, 'Product name must be at least 2 characters long'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  // imageUrl: {
  //   type: String,
  //   validate: {
  //     validator: function (url) {
  //       return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(url);
  //     },
  //     message: 'Invalid image URL',
  //   },
  //   default: '',
  // },
  stock: {
    type: Boolean,
    required: [true, 'Stock is required'],
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt
});

// create product model based on schema
const Product = mongoose.model('Product', productSchema);

export default Product;
