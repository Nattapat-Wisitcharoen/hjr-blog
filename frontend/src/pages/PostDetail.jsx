import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import ImageGrid from '../components/ImageGrid'; // <-- Import

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <div className="text-center py-20 text-theme-text-muted text-sm animate-pulse">กำลังโหลดเนื้อหา...</div>;
  if (!post) return <div className="text-center py-20 text-theme-text-muted text-sm">ไม่พบบทความนี้</div>;

  return (
    <div className="max-w-2xl mx-auto py-6">
      <Link 
        to="/" 
        className="inline-flex items-center gap-1.5 text-xs text-theme-text-muted hover:text-theme-text-main mb-8 transition-colors bg-white px-3 py-1.5 rounded-full border border-theme-border"
      >
        <span>&larr;</span> กลับหน้าแรก
      </Link>
      
      <article className="bg-theme-paper p-8 md:p-12 rounded-3xl border border-theme-border shadow-sm">
        <header className="mb-6 border-b border-gray-100 pb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold bg-theme-yellow-soft text-theme-yellow-text px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-xs text-theme-text-muted">
              {new Date(post.createdAt).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-theme-text-main leading-tight">{post.title}</h1>
        </header>

        {/* แสดงผลรูปภาพสไตล์ Instagram Grid */}
        <ImageGrid images={post.images} />
        
        {/* แสดงข้อความเนื้อหาบทความ */}
        <div className="text-theme-text-main whitespace-pre-wrap leading-relaxed text-base font-light mt-6">
          {post.content}
        </div>
      </article>
    </div>
  );
};

export default PostDetail;