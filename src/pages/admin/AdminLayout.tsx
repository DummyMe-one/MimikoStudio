import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { LayoutDashboard, Package, FolderOpen, ClipboardList, MessageSquare, LogOut, Menu, X, ExternalLink } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, signOut, loading, isConfigured } = useAuth();

  useEffect(() => {
    if (!loading && !user && isConfigured) {
      navigate('/admin/login');
    }
  }, [navigate, user, loading, isConfigured]);

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const navItems = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/designs', icon: Package, label: 'Designs' },
    { to: '/admin/collections', icon: FolderOpen, label: 'Collections' },
    { to: '/admin/bookings', icon: ClipboardList, label: 'Bookings' },
    { to: '/admin/messages', icon: MessageSquare, label: 'Messages' },
  ];

  return (
    <div className="min-h-screen bg-cream/30 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-espresso text-ivory fixed h-full">
        <div className="p-6 border-b border-ivory/10">
          <h1 className="heading-serif text-xl font-semibold">
            MIMIKO <span className="text-light-gold">STUDIO</span>
          </h1>
          <p className="text-xs text-ivory/50 mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 py-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                  isActive
                    ? 'bg-ivory/10 text-light-gold border-r-2 border-light-gold'
                    : 'text-ivory/70 hover:text-ivory hover:bg-ivory/5'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-ivory/10 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 text-xs text-ivory/60 hover:text-ivory transition-colors"
          >
            <ExternalLink size={14} />
            View Website
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-xs text-ivory/60 hover:text-red-300 transition-colors w-full text-left"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-espresso/50" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-64 h-full bg-espresso text-ivory">
            <div className="p-6 border-b border-ivory/10 flex items-center justify-between">
              <h1 className="heading-serif text-lg font-semibold">
                MIMIKO <span className="text-light-gold">STUDIO</span>
              </h1>
              <button onClick={() => setSidebarOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <nav className="py-4">
              {navItems.map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                      isActive ? 'bg-ivory/10 text-light-gold' : 'text-ivory/70 hover:text-ivory'
                    }`}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-ivory/10">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-xs text-ivory/60 hover:text-red-300 transition-colors"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-champagne/30 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
          <button onClick={() => setSidebarOpen(true)} className="text-espresso">
            <Menu size={22} />
          </button>
          <h1 className="heading-serif text-lg font-semibold text-espresso">Admin</h1>
          <div className="w-6" />
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
