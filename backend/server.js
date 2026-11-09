import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import profileRoutes from './routes/profile.js';
import uploadRoutes from './routes/upload.js'; // <-- Import เพิ่ม

dotenv.config();

const app = express();

// สร้างโฟลเดอร์ uploads อัตโนมัติหากยังไม่มีในเครื่อง
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// Middleware
app.use(cors());
app.use(express.json());

// อนุญาตให้เบราว์เซอร์เข้าถึงรูปภาพผ่าน URL เช่น http://localhost:5000/uploads/xxx.png
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/upload', uploadRoutes); // <-- เพิ่ม Route อัปโหลด

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB Connected successfully');
    app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));