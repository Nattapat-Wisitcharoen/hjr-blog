import express from 'express';
import Post from '../models/Post.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// [PUBLIC] ดึงบทความทั้งหมด (User อ่านได้)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// [PUBLIC] ดึงบทความตาม ID (User อ่านได้)
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'ไม่พบบทความ' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// [PROTECTED] สร้างบทความใหม่
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const { title, content, category, images } = req.body;
    const newPost = new Post({ title, content, category, images: images || [] });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// [PROTECTED] แก้ไขบทความ
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const { title, content, category, images } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, category, images: images || [] },
      { new: true }
    );
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// [PROTECTED] ลบบทความ (Admin เท่านั้น)
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'ลบบทความเรียบร้อย' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;