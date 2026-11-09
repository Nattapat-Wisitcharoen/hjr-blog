import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: { type: String, default: 'Phat Wisitcharoen' },
  handle: { type: String, default: '@phat_hjr' },
  bio: { type: String, default: 'ยินดีต้อนรับสู่บล็อกส่วนตัว ☕ บันทึกเรื่องราวเกี่ยวกับการพัฒนาเว็บ ไลฟ์สไตล์ และไดอารี่ประจำวัน' },
  avatarUrl: { type: String, default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80' },
  coverUrl: { type: String, default: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80' }
}, { timestamps: true });

export default mongoose.model('Profile', profileSchema);