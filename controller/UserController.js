// controllers/authController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

// user Registration
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // input validation
    if(!username || !email || ! password){
      return res.status(400).json({message: "All Fields required"})
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    // password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

  // create new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // create token
    // const SECRET_KEY = 'secretKey'
      const token = jwt.sign({ id: newUser._id, email: newUser.email }, SECRET_KEY, {
    expiresIn: '1h',
  });

    res.status(201).json({ message: "User registered successfully",
      user:{
        id: newUser._id,
        email: newUser.email,
        token: token
        // password: newUser.password
      }
     });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// dashboard
export const dashboard = (req, res) => {
  res.json({ message: `Welcome ${req.user.email}, this is your dashboard.` });
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

     // Manual validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Simple email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    // Password length check (minimum 6 characters, optional)
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long." });
    }

    // find and check if user exist
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Email does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "password does not match" });

    // const SECRET_KEY = 'secretKey'
    const token = jwt.sign({ userId: user._id,  email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

     res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
