import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // ดึง Token จาก localStorage (ถ้าเคยล็อคอินไว้จะมีค่านี้)
  const token = localStorage.getItem('adminToken');
  
  // ถ้ามี Token ให้เปิดหน้า Outlet (หน้าลูกที่อยู่ข้างใน) ถ้าไม่มีให้เด้งไปหน้า /login
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;