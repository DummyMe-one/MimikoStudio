import { useState, useEffect } from 'react';
import { bookingsApi } from '../../services/api';
import { Check, X, Eye, Trash2 } from 'lucide-react';

const STATUS_OPTIONS = ['NEW', 'CONTACTED', 'CONFIRMED', 'COMPLETED', 'CANCELLED'];

export default function BookingsManager() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);

  useEffect(() => { loadBookings(); }, []);

  const loadBookings = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;
    const res = await bookingsApi.getAll(token);
    if (res.success) setBookings(res.data!);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;
    const res = await bookingsApi.updateStatus(id, status, token);
    if (res.success) await loadBookings();
  };

  const deleteBooking = async (id: string) => {
    if (!confirm('Delete this booking?')) return;
    const token = localStorage.getItem('adminToken');
    if (!token) return;
    const res = await bookingsApi.delete(id, token);
    if (res.success) await loadBookings();
  };

  const filteredBookings = filter === 'ALL'
    ? bookings
    : bookings.filter((b) => b.status === filter);

  const statusColor = (status: string) => {
    switch (status) {
      case 'NEW': return 'bg-light-gold/20 text-muted-gold';
      case 'CONTACTED': return 'bg-blue-100 text-blue-700';
      case 'CONFIRMED': return 'bg-green-100 text-green-700';
      case 'COMPLETED': return 'bg-cream text-taupe';
      case 'CANCELLED': return 'bg-red-50 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-taupe">Loading bookings...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="heading-serif text-3xl font-semibold text-espresso">Bookings</h1>
        <p className="text-taupe text-sm">{bookings.length} total bookings</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {['ALL', ...STATUS_OPTIONS].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1.5 text-xs uppercase tracking-wider font-sans whitespace-nowrap transition-colors border ${
              filter === status
                ? 'border-light-gold bg-light-gold/10 text-espresso'
                : 'border-champagne text-taupe hover:border-light-gold'
            }`}
          >
            {status} {status !== 'ALL' && `(${bookings.filter(b => b.status === status).length})`}
          </button>
        ))}
      </div>

      {/* Bookings Table */}
      <div className="bg-white border border-champagne/30">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-champagne/30 bg-cream/30">
                <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-taupe font-sans">Customer</th>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-taupe font-sans hidden md:table-cell">Design</th>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-taupe font-sans hidden lg:table-cell">Date</th>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-taupe font-sans">Status</th>
                <th className="text-right px-4 py-3 text-xs uppercase tracking-wider text-taupe font-sans">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-champagne/20">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-cream/20 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-espresso">{booking.customerName}</p>
                    <p className="text-xs text-taupe">{booking.email}</p>
                  </td>
                  <td className="px-4 py-3 text-taupe hidden md:table-cell">
                    {booking.designName || 'Custom request'}
                  </td>
                  <td className="px-4 py-3 text-taupe text-xs hidden lg:table-cell">
                    {booking.requestedDate || '—'}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={booking.status}
                      onChange={(e) => updateStatus(booking.id, e.target.value)}
                      className={`text-xs px-2 py-1 rounded-full border-0 ${statusColor(booking.status)} cursor-pointer`}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="p-2 text-taupe hover:text-espresso transition-colors"
                      title="View details"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => deleteBooking(booking.id)}
                      className="p-2 text-taupe hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredBookings.length === 0 && (
          <div className="p-8 text-center text-taupe">
            No bookings found{filter !== 'ALL' ? ` with status "${filter}"` : ''}.
          </div>
        )}
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-espresso/50" onClick={() => setSelectedBooking(null)} />
          <div className="relative bg-ivory w-full max-w-lg max-h-[80vh] overflow-y-auto p-6 sm:p-8">
            <button onClick={() => setSelectedBooking(null)} className="absolute top-4 right-4 text-taupe hover:text-espresso">
              <X size={20} />
            </button>

            <h2 className="heading-serif text-2xl font-semibold text-espresso mb-6">Booking Details</h2>

            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-taupe font-sans mb-1">Customer</p>
                <p className="text-espresso font-medium">{selectedBooking.customerName}</p>
                <p className="text-sm text-taupe">{selectedBooking.email}</p>
                <p className="text-sm text-taupe">{selectedBooking.phone}</p>
              </div>

              <div className="border-t border-champagne/50 pt-4">
                <p className="text-xs uppercase tracking-wider text-taupe font-sans mb-1">Design</p>
                <p className="text-espresso font-medium">{selectedBooking.designName || 'Custom request'}</p>
                {selectedBooking.collection && (
                  <p className="text-sm text-taupe">Collection: {selectedBooking.collection}</p>
                )}
              </div>

              <div className="border-t border-champagne/50 pt-4">
                <p className="text-xs uppercase tracking-wider text-taupe font-sans mb-1">Details</p>
                <dl className="space-y-1 text-sm">
                  {selectedBooking.occasion && (
                    <div className="flex gap-2">
                      <dt className="text-taupe w-24">Occasion:</dt>
                      <dd className="text-espresso">{selectedBooking.occasion}</dd>
                    </div>
                  )}
                  {selectedBooking.requestedDate && (
                    <div className="flex gap-2">
                      <dt className="text-taupe w-24">Date:</dt>
                      <dd className="text-espresso">{selectedBooking.requestedDate}</dd>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <dt className="text-taupe w-24">Quantity:</dt>
                    <dd className="text-espresso">{selectedBooking.quantity || 1}</dd>
                  </div>
                  {selectedBooking.customization && selectedBooking.customization !== 'no' && (
                    <div className="flex gap-2">
                      <dt className="text-taupe w-24">Custom:</dt>
                      <dd className="text-espresso">{selectedBooking.customization}</dd>
                    </div>
                  )}
                  {selectedBooking.colorPreference && (
                    <div className="flex gap-2">
                      <dt className="text-taupe w-24">Color:</dt>
                      <dd className="text-espresso">{selectedBooking.colorPreference}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {selectedBooking.notes && (
                <div className="border-t border-champagne/50 pt-4">
                  <p className="text-xs uppercase tracking-wider text-taupe font-sans mb-1">Notes</p>
                  <p className="text-sm text-espresso">{selectedBooking.notes}</p>
                </div>
              )}

              <div className="border-t border-champagne/50 pt-4">
                <p className="text-xs uppercase tracking-wider text-taupe font-sans mb-1">Status</p>
                <select
                  value={selectedBooking.status}
                  onChange={async (e) => {
                    await updateStatus(selectedBooking.id, e.target.value);
                    setSelectedBooking({ ...selectedBooking, status: e.target.value });
                  }}
                  className={`text-sm px-3 py-1.5 rounded-full border-0 ${statusColor(selectedBooking.status)} cursor-pointer`}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="border-t border-champagne/50 pt-4">
                <p className="text-xs text-taupe">
                  Created: {new Date(selectedBooking.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
