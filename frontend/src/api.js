import axios from 'axios';

const api = axios.create({
  // ถ้ามีค่า VITE_API_BASE_URL ให้ใช้ค่านั้น ถ้าไม่มีให้ใช้ localhost:5000
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;