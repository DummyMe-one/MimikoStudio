import { useState, useEffect } from 'react';
import { MessageSquare, Mail, Phone, Calendar, CheckCircle } from 'lucide-react';
import { enquiriesApi } from '../../services/electronicsApi';
import type { Enquiry } from '../../types/electronics';

export default function EnquiriesManager() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    loadEnquiries();
  }, []);

  const loadEnquiries = async () => {
    const res = await enquiriesApi.getAll();
    if (res.success && res.data) {
      setEnquiries(res.data);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const res = await enquiriesApi.updateStatus(id, status);
    if (res.success) {
      await loadEnquiries();
    } else {
      alert('Failed to update status: ' + res.error);
    }
  };

  const filteredEnquiries = filter === 'all' 
    ? enquiries 
    : enquiries.filter(e => e.status === filter);

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'NEW': 'badge-brand',
      'CONTACTED': 'badge-accent',
      'FOLLOW_UP': 'badge-soft',
      'CONVERTED': 'badge-success',
      'CLOSED': 'badge-sale',
    };
    return styles[status] || 'badge-soft';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-text-secondary mt-4">Loading enquiries...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text mb-2">Enquiries Manager</h1>
          <p className="text-text-secondary">Manage customer enquiries and leads</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {['all', 'NEW', 'CONTACTED', 'FOLLOW_UP', 'CONVERTED', 'CLOSED'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
              filter === status
                ? 'bg-brand text-white'
                : 'bg-white text-text-secondary hover:bg-bg-soft border border-border'
            }`}
          >
            {status === 'all' ? 'All' : status.replace('_', ' ')}
            {status !== 'all' && (
              <span className="ml-2 text-xs opacity-75">
                ({enquiries.filter(e => e.status === status).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {filteredEnquiries.length === 0 ? (
        <div className="bg-white rounded-xl p-12 border border-border text-center">
          <MessageSquare size={48} className="mx-auto text-text-muted mb-4" />
          <h3 className="text-xl font-bold text-text mb-2">No Enquiries Found</h3>
          <p className="text-text-secondary">
            {filter === 'all' 
              ? 'Customer enquiries will appear here'
              : `No enquiries with status "${filter}"`
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEnquiries.map((enquiry) => (
            <div key={enquiry.id} className="bg-white rounded-xl border border-border p-6 hover:shadow-medium transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-brand font-bold text-lg">
                      {enquiry.customerName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text mb-1">{enquiry.customerName}</h3>
                    <div className="flex items-center gap-4 text-sm text-text-secondary">
                      <span className="flex items-center gap-1">
                        <Mail size={14} />
                        {enquiry.customerEmail || 'No email'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone size={14} />
                        {enquiry.customerPhone}
                      </span>
                    </div>
                  </div>
                </div>
                <span className={`badge ${getStatusBadge(enquiry.status)}`}>
                  {enquiry.status.replace('_', ' ')}
                </span>
              </div>

              {enquiry.product && (
                <div className="mb-4 p-3 bg-bg-soft rounded-lg">
                  <p className="text-xs text-text-muted mb-1">Product Enquiry</p>
                  <p className="font-semibold text-text">{enquiry.product.name}</p>
                </div>
              )}

              {enquiry.message && (
                <div className="mb-4">
                  <p className="text-xs text-text-muted mb-1">Message</p>
                  <p className="text-text-secondary text-sm">{enquiry.message}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <Calendar size={14} />
                  {new Date(enquiry.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={enquiry.status}
                    onChange={(e) => updateStatus(enquiry.id, e.target.value)}
                    className="input py-2 px-3 text-sm"
                  >
                    <option value="NEW">New</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="FOLLOW_UP">Follow Up</option>
                    <option value="CONVERTED">Converted</option>
                    <option value="CLOSED">Closed</option>
                  </select>
                  {enquiry.customerEmail && (
                    <a
                      href={`mailto:${enquiry.customerEmail}`}
                      className="btn btn-outline btn-sm"
                    >
                      <Mail size={16} />
                      Email
                    </a>
                  )}
                  <a
                    href={`tel:${enquiry.customerPhone}`}
                    className="btn btn-primary btn-sm"
                  >
                    <Phone size={16} />
                    Call
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
