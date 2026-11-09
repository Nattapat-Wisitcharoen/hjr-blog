import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const router = express.Router();

// 1. Route สำหรับ Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(400).json({ message: 'ไม่พบ Username นี้ในระบบ' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'รหัสผ่านไม่ถูกต้อง' });
    }

    // ออก JWT Token ให้แอดมิน
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, message: 'เข้าสู่ระบบสำเร็จ' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. Route พิเศษสำหรับสร้าง Admin บัญชีแรก (รันครั้งเดียว)
router.post('/register-first-admin', async (req, res) => {
  try {
    const count = await Admin.countDocuments();
    if (count > 0) {
      return res.status(400).json({ message: 'มีบัญชี Admin ในระบบอยู่แล้ว' });
    }

    const { username, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({ username, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: 'สร้างบัญชี Admin สำเร็จแล้ว!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;