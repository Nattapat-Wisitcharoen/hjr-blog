import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const EditProfile = () => {
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile');
        setName(response.data.name || '');
        setHandle(response.data.handle || '');
        setBio(response.data.bio || '');
        setAvatarUrl(response.data.avatarUrl || '');
        setCoverUrl(response.data.coverUrl || '');
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  // ฟังก์ชันอัปโหลดรูป Avatar
  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploadingAvatar(true);
    try {
      const res = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setAvatarUrl(res.data.url);
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการอัปโหลดรูปโปรไฟล์');
    } finally {
      setUploadingAvatar(false);
    }
  };

  // ฟังก์ชันอัปโหลดรูป Cover
  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploadingCover(true);
    try {
      const res = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setCoverUrl(res.data.url);
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการอัปโหลดรูปภาพปก');
    } finally {
      setUploadingCover(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put('/profile', { name, handle, bio, avatarUrl, coverUrl });
      alert('บันทึกการแก้ไขโปรไฟล์เรียบร้อย');
      navigate('/admin');
    } catch (error) {
      alert(error.response?.data?.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-theme-paper p-6 md:p-8 rounded-2xl border border-theme-border shadow-sm max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
        <h1 className="text-xl font-bold text-theme-text-main">แก้ไขโปรไฟล์แอดมิน</h1>
        <button onClick={() => navigate('/admin')} className="text-xs text-gray-500 hover:text-gray-800">
          ยกเลิก
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold text-theme-text-main mb-1">ชื่อที่แสดง (Name)</label>
          <input 
            type="text" 
            className="w-full p-2.5 text-sm border border-theme-border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-theme-text-main mb-1">Handle (@username)</label>
          <input 
            type="text" 
            className="w-full p-2.5 text-sm border border-theme-border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            required
          />
        </div>

        {/* ส่วนเลือกอัปโหลดรูป Avatar */}
        <div>
          <label className="block text-xs font-semibold text-theme-text-main mb-1">รูปโปรไฟล์ (Avatar)</label>
          <div className="flex items-center gap-4">
            {avatarUrl && (
              <img src={avatarUrl} alt="Avatar Preview" className="w-14 h-14 rounded-full object-cover border border-amber-200" />
            )}
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleAvatarUpload}
              className="text-xs text-theme-text-muted file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-50 file:text-amber-800 hover:file:bg-amber-100 cursor-pointer"
            />
          </div>
          {uploadingAvatar && <p className="text-xs text-amber-600 mt-1">กำลังอัปโหลดรูปโปรไฟล์...</p>}
        </div>

        {/* ส่วนเลือกอัปโหลดรูป Cover */}
        <div>
          <label className="block text-xs font-semibold text-theme-text-main mb-1">รูปภาพปก (Cover Image)</label>
          <div className="flex flex-col gap-2">
            {coverUrl && (
              <img src={coverUrl} alt="Cover Preview" className="w-full h-24 rounded-xl object-cover border border-theme-border" />
            )}
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleCoverUpload}
              className="text-xs text-theme-text-muted file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-50 file:text-amber-800 hover:file:bg-amber-100 cursor-pointer"
            />
          </div>
          {uploadingCover && <p className="text-xs text-amber-600 mt-1">กำลังอัปโหลดรูปปก...</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-theme-text-main mb-1">คำอธิบายตัวตน (Bio)</label>
          <textarea 
            rows="3"
            className="w-full p-2.5 text-sm border border-theme-border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white resize-y"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={loading || uploadingAvatar || uploadingCover}
          className="w-full bg-amber-400 hover:bg-amber-500 text-amber-950 font-semibold text-sm py-2.5 rounded-xl transition-all shadow-sm border border-amber-300 disabled:opacity-50"
        >
          {loading ? 'กำลังบันทึก...' : 'บันทึกการเปลี่ยนแปลง'}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;