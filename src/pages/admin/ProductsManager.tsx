import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Eye, Package } from 'lucide-react';
import { productsApi } from '../../services/electronicsApi';
import type { Product } from '../../types/electronics';

export default function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await productsApi.getAll();
    if (res.success && res.data) {
      setProducts(res.data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    const res = await productsApi.delete(id);
    if (res.success) {
      await loadProducts();
    } else {
      alert('Failed to delete product: ' + res.error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-text-secondary mt-4">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text mb-2">Products Manager</h1>
          <p className="text-text-secondary">Manage your product catalog</p>
        </div>
        <Link to="/admin/products/new" className="btn btn-primary">
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-xl p-12 border border-border text-center">
          <Package size={48} className="mx-auto text-text-muted mb-4" />
          <h3 className="text-xl font-bold text-text mb-2">No Products Yet</h3>
          <p className="text-text-secondary mb-6">Start by adding your first product to the catalog</p>
          <Link to="/admin/products/new" className="btn btn-primary">
            <Plus size={18} />
            Add First Product
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-bg-soft border-b border-border">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Product</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Category</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Brand</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Price</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-bg-soft transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-bg-soft rounded-lg overflow-hidden flex-shrink-0">
                          {product.images?.[0]?.imageUrl && (
                            <img src={product.images[0].imageUrl} alt={product.name} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-text">{product.name}</p>
                          <p className="text-xs text-text-muted">{product.sku || 'No SKU'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      {product.category?.name || '—'}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      {product.brand?.name || '—'}
                    </td>
                    <td className="px-6 py-4">
                      {product.sellingPrice ? (
                        <span className="font-semibold text-text">₹{product.sellingPrice.toLocaleString()}</span>
                      ) : (
                        <span className="text-text-muted">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`badge ${
                        product.status === 'ACTIVE' ? 'badge-success' :
                        product.status === 'DRAFT' ? 'badge-soft' :
                        'badge-sale'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/products/${product.slug}`}
                          className="p-2 hover:bg-bg-soft rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye size={16} className="text-text-secondary" />
                        </Link>
                        <Link
                          to={`/admin/products/${product.id}/edit`}
                          className="p-2 hover:bg-bg-soft rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} className="text-text-secondary" />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 hover:bg-danger/10 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} className="text-danger" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
