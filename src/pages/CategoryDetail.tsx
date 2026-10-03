import { useParams, Link } from 'react-router-dom';
import { useCategories, useProducts } from '../hooks/useElectronicsData';
import ProductCard from '../components/ProductCard';
import ScrollReveal from '../components/ScrollReveal';
import { ChevronRight } from 'lucide-react';

export default function CategoryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { categories } = useCategories();
  const { products } = useProducts();

  const category = categories.find(c => c.slug === slug);
  const categoryProducts = products.filter(p => p.categoryId === category?.id);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text mb-4">Category Not Found</h1>
          <Link to="/categories" className="text-primary hover:underline">Back to Categories</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-secondary mb-8">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={16} />
          <Link to="/categories" className="hover:text-primary transition-colors">Categories</Link>
          <ChevronRight size={16} />
          <span className="text-text font-semibold">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="bg-white rounded-xl p-6 lg:p-8 mb-8 border border-border">
          <div className="flex items-start gap-6">
            {category.imageUrl && (
              <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover" />
              </div>
            )}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-text mb-2">{category.name}</h1>
              {category.description && (
                <p className="text-text-secondary text-lg">{category.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Products Count */}
        <div className="mb-6">
          <p className="text-text-secondary">
            Showing <span className="font-semibold text-text">{categoryProducts.length}</span> products
          </p>
        </div>

        {/* Products Grid */}
        {categoryProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-border">
            <p className="text-text-secondary text-lg">No products in this category yet</p>
            <Link to="/products" className="text-primary hover:underline mt-2 inline-block">
              Browse all products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryProducts.map((product, idx) => (
              <ScrollReveal key={product.id} delay={idx * 0.05}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
