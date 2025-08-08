// // routes/authRoutes.js
// import express from "express";
// import { registerUser, loginUser } from "../controller/Auth.js";

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);

// export default router;


// ////////////////////////////new////

import express from 'express';
import { registerUser, loginUser, dashboard } from "../controller/UserController.js";
import { verifyToken } from '../middleware/Auth.js';




const router = express.Router();

// route setup for user
router.post('/register', registerUser);
router.post('/login', loginUser);

// route setup for authentic user that can access dashbord path
router.get('/dashboard', verifyToken, dashboard);
// router.post('/login', loginUser);
// router.get('/profile', Auth, (req, res) => {
//   res.json({ message: "This is Profile Page", userId: req.user });
// });

export default router;