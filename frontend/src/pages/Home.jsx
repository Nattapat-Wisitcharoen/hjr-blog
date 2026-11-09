import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import ProfileBanner from '../components/ProfileBanner';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return (
    <div className="text-center py-20 text-theme-text-muted text-sm tracking-wide animate-pulse">
      กำลังโหลดบทความ...
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto py-6">
      {/* Profile Banner */}
      <ProfileBanner />

      {/* Header บทความล่าสุด */}
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-theme-border">
        <h3 className="text-lg font-bold text-theme-text-main">บทความล่าสุด</h3>
        <span className="text-xs text-theme-text-muted">{posts.length} บทความ</span>
      </div>

      {/* Feed List */}
      {posts.length === 0 ? (
        <div className="text-center py-12 bg-theme-paper rounded-2xl border border-theme-border">
          <p className="text-theme-text-muted text-sm">ยังไม่มีบทความในขณะนี้</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map(post => (
            <article 
              key={post._id} 
              className="group bg-theme-paper p-6 md:p-7 rounded-2xl border border-theme-border hover:border-yellow-200 hover:shadow-xl hover:shadow-yellow-500/5 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
                {/* ฝั่งซ้าย: หมวดหมู่, วันที่, หัวข้อ, และเนื้อหาย่อ */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${
                      post.category === 'Diary' 
                        ? 'bg-rose-50 text-rose-600 border-rose-100' 
                        : 'bg-amber-50 text-amber-700 border-amber-200/60'
                    }`}>
                      {post.category}
                    </span>
                    <span className="text-xs text-theme-text-muted">
                      {new Date(post.createdAt).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                  </div>

                  <Link to={`/post/${post._id}`}>
                    <h2 className="text-xl font-semibold text-theme-text-main mb-2 group-hover:text-amber-600 transition-colors leading-snug">
                      {post.title}
                    </h2>
                  </Link>
                  
                  <p className="text-sm text-theme-text-muted leading-relaxed line-clamp-2">
                    {post.content}
                  </p>
                </div>

                {/* ฝั่งขวา: แสดงรูปภาพพรีวิวขนาดเล็ก (สูงสุด 2 รูป) */}
                {post.images && post.images.length > 0 && (
                  <div className="flex gap-2 shrink-0 self-start mt-1 sm:mt-0">
                    {post.images.slice(0, 2).map((imgUrl, idx) => (
                      <div key={idx} className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-theme-border bg-gray-50">
                        <img 
                          src={imgUrl} 
                          alt={`thumb-${idx}`} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                        {/* หากบทความนั้นมีรูปมากกว่า 2 รูป จะแสดงตัวเลขบอกจำนวนรูปที่เหลือในรูปที่ 2 */}
                        {idx === 1 && post.images.length > 2 && (
                          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center text-white text-xs font-semibold">
                            +{post.images.length - 2}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;