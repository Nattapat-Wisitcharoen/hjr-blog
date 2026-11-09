import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

// แก้ไขเส้นทาง Import 2 บรรทัดนี้
import Dashboard from './admin/Dashboard';
import WritePost from './admin/WritePost';
import EditProfile from './admin/EditProfile';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-theme-bg text-theme-text-main font-sans">
        <Navbar />
        <main className="max-w-4xl mx-auto p-4 md:p-6">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Admin Routes (URL บนเว็บยังคงเป็น /admin เหมือนเดิม) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/write" element={<WritePost />} />
              <Route path="/admin/edit/:id" element={<WritePost />} />
              <Route path="/admin/profile" element={<EditProfile />} />
            </Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;