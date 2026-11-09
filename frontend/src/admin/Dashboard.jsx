import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get("/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("ต้องการลบบทความนี้ใช่หรือไม่?")) {
      try {
        await api.delete(`/posts/${id}`);
        fetchPosts();
      } catch (error) {
        alert("เกิดข้อผิดพลาดในการลบ");
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-theme-text-main">Dashboard</h1>
          <p className="text-xs text-theme-text-muted mt-1">
            จัดการบทความและไดอารี่ทั้งหมด ({posts.length} รายการ)
          </p>
        </div>

        {/* ปรับแก้สีปุ่มที่นี่: ชัดเจน โดดเด่น ไม่กลืนกับพื้นหลัง */}
        <div className="flex items-center gap-2">
        <Link
          to="/admin/profile"
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-xs px-3.5 py-2.5 rounded-full transition-all border border-gray-200"
        >
          แก้ไขโปรไฟล์
        </Link>
        <Link
          to="/admin/write"
          className="bg-amber-400 hover:bg-amber-500 text-amber-950 font-semibold text-xs px-4 py-2.5 rounded-full transition-all shadow-sm hover:shadow-md hover:shadow-amber-500/20 border border-amber-300"
        >
          + เขียนบทความใหม่
        </Link>
        </div>
      </div>

      <div className="bg-theme-paper rounded-2xl border border-theme-border overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-theme-border text-xs text-theme-text-muted font-medium">
              <th className="p-4 pl-6">หัวข้อ</th>
              <th className="p-4">หมวดหมู่</th>
              <th className="p-4">วันที่เขียน</th>
              <th className="p-4 pr-6 text-right">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm">
            {posts.map((post) => (
              <tr
                key={post._id}
                className="hover:bg-amber-50/30 transition-colors"
              >
                <td className="p-4 pl-6 font-medium text-theme-text-main">
                  {post.title}
                </td>
                <td className="p-4">
                  <span className="text-[11px] font-medium bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full">
                    {post.category}
                  </span>
                </td>
                <td className="p-4 text-xs text-theme-text-muted">
                  {new Date(post.createdAt).toLocaleDateString("th-TH")}
                </td>
                <td className="p-4 pr-6 text-right space-x-3 text-xs">
                  <Link
                    to={`/admin/edit/${post._id}`}
                    className="text-amber-600 font-medium hover:underline"
                  >
                    แก้ไข
                  </Link>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="text-rose-500 font-medium hover:underline"
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
