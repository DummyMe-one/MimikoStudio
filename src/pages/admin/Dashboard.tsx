import { useState, useEffect } from 'react';
import { Package, FolderOpen, ClipboardList, MessageSquare, TrendingUp } from 'lucide-react';
import { designsApi, collectionsApi, bookingsApi, contactApi } from '../../services/api';
import { designs as localDesigns, collections as localCollections } from '../../data';

export default function Dashboard() {
  const [stats, setStats] = useState({
    designs: 0,
    collections: 0,
    bookings: 0,
    messages: 0,
    newBookings: 0,
  });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    try {
      // Try API first, fall back to local data
      const [designsRes, collectionsRes, bookingsRes, messagesRes] = await Promise.all([
        designsApi.getAll(),
        collectionsApi.getAll(),
        bookingsApi.getAll(token),
        contactApi.getAll(token),
      ]);

      const designsData = designsRes.success ? designsRes.data! : localDesigns;
      const collectionsData = collectionsRes.success ? collectionsRes.data! : localCollections;
      const bookingsData = bookingsRes.success ? bookingsRes.data! : [];
      const messagesData = messagesRes.success ? messagesRes.data! : [];

      setStats({
        designs: designsData.length,
        collections: collectionsData.length,
        bookings: bookingsData.length,
        messages: messagesData.length,
        newBookings: bookingsData.filter((b: any) => b.status === 'NEW').length,
      });
      setRecentBookings(bookingsData.slice(0, 5));
    } catch (err) {
      // Use local data as fallback
      setStats({
        designs: localDesigns.length,
        collections: localCollections.length,
        bookings: 0,
        messages: 0,
        newBookings: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Total Designs', value: stats.designs, icon: Package, color: 'text-muted-gold' },
    { label: 'Collections', value: stats.collections, icon: FolderOpen, color: 'text-light-gold' },
    { label: 'Bookings', value: stats.bookings, icon: ClipboardList, color: 'text-espresso' },
    { label: 'Messages', value: stats.messages, icon: MessageSquare, color: 'text-taupe' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-taupe">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="heading-serif text-3xl font-semibold text-espresso mb-1">Dashboard</h1>
        <p className="text-taupe text-sm">Welcome back to Mimiko Studio admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 border border-champagne/30">
            <div className="flex items-center justify-between mb-3">
              <stat.icon size={20} className={stat.color} />
              <TrendingUp size={14} className="text-taupe/40" />
            </div>
            <p className="heading-serif text-3xl font-semibold text-espresso">{stat.value}</p>
            <p className="text-xs text-taupe mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* New Bookings Alert */}
      {stats.newBookings > 0 && (
        <div className="bg-light-gold/10 border border-light-gold/30 p-4 mb-8 flex items-center gap-3">
          <ClipboardList size={20} className="text-muted-gold" />
          <div>
            <p className="text-sm font-medium text-espresso">
              {stats.newBookings} new booking{stats.newBookings > 1 ? 's' : ''} awaiting response
            </p>
            <a href="/admin/bookings" className="text-xs text-muted-gold underline">
              View bookings →
            </a>
          </div>
        </div>
      )}

      {/* Recent Bookings */}
      <div className="bg-white border border-champagne/30">
        <div className="p-5 border-b border-champagne/30 flex items-center justify-between">
          <h2 className="heading-serif text-xl font-semibold text-espresso">Recent Bookings</h2>
          <a href="/admin/bookings" className="text-xs text-muted-gold hover:underline">
            View all
          </a>
        </div>
        {recentBookings.length === 0 ? (
          <div className="p-8 text-center text-taupe text-sm">
            No bookings yet. Bookings will appear here when customers submit requests.
          </div>
        ) : (
          <div className="divide-y divide-champagne/20">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-espresso">{booking.customerName}</p>
                  <p className="text-xs text-taupe">{booking.designName || 'Custom request'}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  booking.status === 'NEW' ? 'bg-light-gold/20 text-muted-gold' :
                  booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                  booking.status === 'COMPLETED' ? 'bg-cream text-taupe' :
                  'bg-red-50 text-red-600'
                }`}>
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
