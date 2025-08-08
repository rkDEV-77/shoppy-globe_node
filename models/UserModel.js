// models/User.js
import mongoose from "mongoose";

// create schema for product input and validate (require, type, unique)
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
},{timestamps:true});

// create user model based on schema
const User = mongoose.model("User", userSchema);
export default User;
