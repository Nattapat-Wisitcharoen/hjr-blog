import express from 'express';
import Profile from '../models/Profile.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// [PUBLIC] ดึงข้อมูลโปรไฟล์มาแสดง
router.get('/', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      // ถ้ายังไม่มีข้อมูลใน DB ให้สร้างค่าเริ่มต้นขึ้นมาอัตโนมัติ
      profile = await Profile.create({});
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// [PROTECTED] แก้ไขข้อมูลโปรไฟล์ (Admin เท่านั้น)
router.put('/', verifyAdmin, async (req, res) => {
  try {
    const { name, handle, bio, avatarUrl, coverUrl } = req.body;
    let profile = await Profile.findOne();
    
    if (!profile) {
      profile = new Profile({ name, handle, bio, avatarUrl, coverUrl });
    } else {
      profile.name = name ?? profile.name;
      profile.handle = handle ?? profile.handle;
      profile.bio = bio ?? profile.bio;
      profile.avatarUrl = avatarUrl ?? profile.avatarUrl;
      profile.coverUrl = coverUrl ?? profile.coverUrl;
    }

    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;