import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, FolderOpen } from 'lucide-react';
import { categoriesApi } from '../../services/electronicsApi';
import type { Category } from '../../types/electronics';

export default function CategoriesManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const res = await categoriesApi.getAll();
    if (res.success && res.data) {
      setCategories(res.data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    const res = await categoriesApi.delete(id);
    if (res.success) {
      await loadCategories();
    } else {
      alert('Failed to delete category: ' + res.error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-text-secondary mt-4">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text mb-2">Categories Manager</h1>
          <p className="text-text-secondary">Organize your product categories</p>
        </div>
        <Link to="/admin/categories/new" className="btn btn-primary">
          <Plus size={18} />
          Add Category
        </Link>
      </div>

      {categories.length === 0 ? (
        <div className="bg-white rounded-xl p-12 border border-border text-center">
          <FolderOpen size={48} className="mx-auto text-text-muted mb-4" />
          <h3 className="text-xl font-bold text-text mb-2">No Categories Yet</h3>
          <p className="text-text-secondary mb-6">Create your first category to organize products</p>
          <Link to="/admin/categories/new" className="btn btn-primary">
            <Plus size={18} />
            Create First Category
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-medium transition-shadow">
              {category.imageUrl && (
                <div className="aspect-video bg-bg-soft overflow-hidden">
                  <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-text mb-1">{category.name}</h3>
                    <p className="text-sm text-text-muted">/{category.slug}</p>
                  </div>
                  {category.featured && (
                    <span className="badge badge-accent">Featured</span>
                  )}
                </div>
                {category.description && (
                  <p className="text-sm text-text-secondary mb-4 line-clamp-2">{category.description}</p>
                )}
                <div className="flex items-center gap-2">
                  <Link
                    to={`/admin/categories/${category.id}/edit`}
                    className="flex-1 btn btn-outline btn-sm"
                  >
                    <Edit2 size={16} />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="btn btn-sm"
                    style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
