import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Blog', 'Diary'], 
    default: 'Blog' 
  },
  images: [{ type: String }] // <-- เพิ่มฟิลด์เก็บ URL รูปภาพเป็น Array
}, { timestamps: true });

export default mongoose.model('Post', postSchema);