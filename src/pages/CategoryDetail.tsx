import { useParams, Link } from 'react-router-dom';
import { useCategories, useProducts } from '../hooks/useElectronicsData';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-text mb-2">{category.name}</h1>
          {category.description && <p className="text-text-secondary">{category.description}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryProducts.map(product => (
            <Link key={product.id} to={`/products/${product.slug}`} className="group block bg-surface rounded-xl overflow-hidden hover:shadow-xl transition-all border border-border">
              <div className="aspect-square bg-background relative overflow-hidden">
                <img src={product.images?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&q=80'} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-text mb-2 line-clamp-2 group-hover:text-primary transition-colors">{product.name}</h3>
                <span className="text-xl font-bold text-primary">₹{(product.sellingPrice || 0).toLocaleString()}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
