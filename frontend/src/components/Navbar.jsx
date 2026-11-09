import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  return (
    <nav className="bg-theme-paper/80 backdrop-blur-md border-b border-theme-border sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand Logo พร้อมรูป Mini Avatar */}
        <Link to="/" className="flex items-center gap-2.5 text-xl font-bold text-theme-text-main tracking-tight hover:opacity-80 transition-opacity">
          <span>hjr<span className="text-amber-500">.</span>blog</span>
        </Link>
        
        <div className="flex items-center gap-4">
          {token ? (
            <>
              <Link to="/admin" className="text-sm font-medium text-theme-text-muted hover:text-theme-text-main transition-colors">
                Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-xs font-medium bg-theme-yellow-soft text-theme-yellow-text px-3.5 py-1.5 rounded-full hover:bg-yellow-200 transition-colors">
              Admin Area
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;