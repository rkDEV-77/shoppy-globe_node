
// server.js
import express from 'express';
import mongoose from 'mongoose';
import productsRoutes from './routes/ProductRoute.js';
import cartRoutes from './routes/CartRoute.js';
import userRoute from './routes/UserRoute.js'
import { verifyToken } from './middleware/Auth.js';
import dotenv from 'dotenv';

dotenv.config();


const app = express();
// const PORT = 5100;

//  Middleware to convert input/output in json formate
app.use(express.json());

// env vaeiable
const PORT = process.env.PORT;

// Routes
app.use('/products', productsRoutes);

app.use('/carts', verifyToken, cartRoutes);
// app.use('/carts', cartRoutes);


app.use("/api", userRoute)

app.get('/', (req, res)=>{
  res.send('API is Running')
})

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/shoppyGlobe')
.then(() => {
  console.log('🟢 Connected to MongoDB');
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}/`));
}).catch((err) => {
  console.error('🔴 MongoDB connection error:', err);
  process.exit(1);
});
