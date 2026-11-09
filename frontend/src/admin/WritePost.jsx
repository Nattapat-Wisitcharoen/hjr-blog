import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

const WritePost = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Blog');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]); // เก็บรายการ URL รูปภาพที่อัปโหลด
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const response = await api.get(`/posts/${id}`);
          setTitle(response.data.title);
          setCategory(response.data.category);
          setContent(response.data.content);
          setImages(response.data.images || []);
        } catch (error) {
          alert('ไม่พบข้อมูลบทความนี้');
          navigate('/admin');
        }
      };
      fetchPost();
    }
  }, [id, navigate]);

  // ฟังก์ชันอัปโหลดรูปภาพเข้า State images
  const handleMultipleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploadingImage(true);
    const uploadedUrls = [];

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('image', file);
        const res = await api.post('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        uploadedUrls.push(res.data.url);
      }
      setImages((prev) => [...prev, ...uploadedUrls]);
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ');
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  // ฟังก์ชันลบรูปภาพออกจากพรีวิว
  const handleRemoveImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const postData = { title, category, content, images };
      if (id) {
        await api.put(`/posts/${id}`, postData);
        alert('แก้ไขบทความเรียบร้อย');
      } else {
        await api.post('/posts', postData);
        alert('สร้างบทความใหม่เรียบร้อย');
      }
      navigate('/admin');
    } catch (error) {
      alert(error.response?.data?.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-theme-paper p-6 md:p-8 rounded-2xl border border-theme-border shadow-sm max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
        <h1 className="text-xl font-bold text-theme-text-main">{id ? 'แก้ไขบทความ' : 'เขียนบทความใหม่'}</h1>
        <button onClick={() => navigate('/admin')} className="text-xs text-gray-500 hover:text-gray-800">
          ยกเลิก
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold text-theme-text-main mb-1">หัวข้อบทความ</label>
          <input 
            type="text" 
            className="w-full p-2.5 text-sm border border-theme-border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white"
            placeholder="ใส่หัวข้อที่นี่..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-theme-text-main mb-1">หมวดหมู่</label>
          <select 
            className="w-full p-2.5 text-sm border border-theme-border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Blog">Blog</option>
            <option value="Diary">Diary</option>
          </select>
        </div>

        {/* ปุ่มเลือกรูปภาพ */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs font-semibold text-theme-text-main">รูปภาพประกอบ (เลือกหลายรูปได้)</label>
            <label className="cursor-pointer bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-medium px-3 py-1.5 rounded-lg border border-amber-200 transition-colors inline-flex items-center gap-1">
              {uploadingImage ? 'กำลังอัปโหลด...' : '+ เลือกรูปภาพ'}
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                onChange={handleMultipleImageUpload} 
                disabled={uploadingImage}
                className="hidden" 
              />
            </label>
          </div>

          {/* โซนแสดง Image Preview สไตล์ Instagram Grid ในหน้าแก้ไข */}
          {images.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 p-3 bg-gray-50 rounded-xl border border-theme-border mb-3">
              {images.map((url, index) => (
                <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 bg-white">
                  <img src={url} alt={`preview-${index}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-500/80 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs transition-colors shadow"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-theme-text-main mb-1">เนื้อหาบทความ (พิมพ์เฉพาะข้อความ)</label>
          <textarea 
            rows="8"
            className="w-full p-3 text-sm border border-theme-border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white resize-y font-sans"
            placeholder="เริ่มต้นเขียนเนื้อหา..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={loading || uploadingImage}
          className="w-full md:w-auto bg-amber-400 hover:bg-amber-500 text-amber-950 font-semibold text-sm px-8 py-2.5 rounded-xl transition-all shadow-sm border border-amber-300 disabled:opacity-50"
        >
          {loading ? 'กำลังบันทึก...' : id ? 'บันทึกการแก้ไข' : 'เผยแพร่บทความ'}
        </button>
      </form>
    </div>
  );
};

export default WritePost;