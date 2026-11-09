import { useState, useEffect } from 'react';
import api from '../api';

const ProfileBanner = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile');
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return null;

  return (
    <div className="bg-theme-paper rounded-2xl border border-theme-border overflow-hidden shadow-xs mb-6">
      {/* 1. Cover Image - ปรับความสูงลงเหลือ h-24 (เดสก์ท็อป h-32) */}
      <div className="h-24 sm:h-32 w-full bg-gradient-to-r from-amber-100 via-amber-50 to-yellow-100 relative">
        <img 
          src={profile.coverUrl} 
          alt="Cover" 
          className="w-full h-full object-cover opacity-90"
        />
      </div>

      {/* 2. Profile Details - ปรับรูปโปรไฟล์ ขนาดฟอนต์ และ Spacing ให้ดูสมส่วนขึ้น */}
      <div className="px-5 pb-4 pt-0 relative flex flex-col items-center text-center">
        {/* รูปโปรไฟล์ย่อขนาดลงเหลือ 18x18 (sm: 20x20) */}
        <div className="-mt-9 sm:-mt-10 mb-2">
          <img 
            src={profile.avatarUrl} 
            alt="Profile" 
            className="w-18 h-18 sm:w-20 sm:h-20 rounded-full border-3 border-white shadow-xs object-cover bg-white"
          />
        </div>

        {/* ชื่อและ Bio ขนาดกะทัดรัด */}
        <h2 className="text-base sm:text-lg font-bold text-theme-text-main tracking-tight">
          {profile.name}
        </h2>
        <p className="text-[11px] text-amber-600 font-medium mt-0.5 mb-1.5">
          {profile.handle}
        </p>

        <p className="text-xs text-theme-text-muted max-w-sm leading-relaxed">
          {profile.bio}
        </p>
      </div>
    </div>
  );
};

export default ProfileBanner;