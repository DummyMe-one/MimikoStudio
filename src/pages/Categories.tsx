import { Link } from 'react-router-dom';
import { useCategories } from '../hooks/useElectronicsData';
import ScrollReveal from '../components/ScrollReveal';
import { ArrowRight } from 'lucide-react';

export default function Categories() {
  const { categories, loading } = useCategories();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-text-secondary mt-4">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-text mb-2">All Categories</h1>
          <p className="text-text-secondary text-lg">Browse products by category</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, idx) => (
            <ScrollReveal key={category.id} delay={idx * 0.1}>
              <Link 
                to={`/categories/${category.slug}`} 
                className="group card overflow-hidden"
              >
                <div className="aspect-video bg-background relative overflow-hidden">
                  <img 
                    src={category.imageUrl || 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&q=80'} 
                    alt={category.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                      {category.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                    <span>Browse Products</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-border">
            <p className="text-text-secondary">No categories available</p>
          </div>
        )}
      </div>
    </div>
  );
}
