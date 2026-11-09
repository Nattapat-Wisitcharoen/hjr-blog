import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // import api ที่เราสร้างไว้

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // ยิงข้อมูลไปที่ POST /api/auth/login
      const response = await api.post('/auth/login', { username, password });
      
      // เก็บ Token ของจริงที่ Backend ส่งกลับมา
      localStorage.setItem('adminToken', response.data.token); 
      navigate('/admin');
    } catch (error) {
      alert(error.response?.data?.message || 'เกิดข้อผิดพลาดในการล็อคอิน');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-theme-paper p-8 rounded-xl border border-gray-100 shadow-sm">
      <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input 
            type="text" 
            className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-yellow"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input 
            type="password" 
            className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-yellow"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-theme-yellow hover:bg-yellow-400 text-yellow-900 font-semibold py-2 rounded-md transition-colors mt-4"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;