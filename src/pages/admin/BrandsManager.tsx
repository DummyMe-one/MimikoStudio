import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Award } from 'lucide-react';
import { brandsApi } from '../../services/electronicsApi';
import type { Brand } from '../../types/electronics';

export default function BrandsManager() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    const res = await brandsApi.getAll();
    if (res.success && res.data) {
      setBrands(res.data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this brand?')) return;
    const res = await brandsApi.delete(id);
    if (res.success) {
      await loadBrands();
    } else {
      alert('Failed to delete brand: ' + res.error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-text-secondary mt-4">Loading brands...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text mb-2">Brands Manager</h1>
          <p className="text-text-secondary">Manage product brands</p>
        </div>
        <Link to="/admin/brands/new" className="btn btn-primary">
          <Plus size={18} />
          Add Brand
        </Link>
      </div>

      {brands.length === 0 ? (
        <div className="bg-white rounded-xl p-12 border border-border text-center">
          <Award size={48} className="mx-auto text-text-muted mb-4" />
          <h3 className="text-xl font-bold text-text mb-2">No Brands Yet</h3>
          <p className="text-text-secondary mb-6">Add your first brand to the catalog</p>
          <Link to="/admin/brands/new" className="btn btn-primary">
            <Plus size={18} />
            Add First Brand
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <div key={brand.id} className="bg-white rounded-xl border border-border p-6 hover:shadow-medium transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 bg-bg-soft rounded-full flex items-center justify-center overflow-hidden">
                  {brand.logoUrl ? (
                    <img src={brand.logoUrl} alt={brand.name} className="w-full h-full object-contain p-2" />
                  ) : (
                    <span className="text-2xl font-bold text-brand">{brand.name[0]}</span>
                  )}
                </div>
                {brand.featured && (
                  <span className="badge badge-accent">Featured</span>
                )}
              </div>
              <h3 className="text-lg font-bold text-text mb-1">{brand.name}</h3>
              {brand.description && (
                <p className="text-sm text-text-secondary mb-4 line-clamp-2">{brand.description}</p>
              )}
              <div className="flex items-center gap-2">
                <Link
                  to={`/admin/brands/${brand.id}/edit`}
                  className="flex-1 btn btn-outline btn-sm"
                >
                  <Edit2 size={16} />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(brand.id)}
                  className="btn btn-sm"
                  style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
