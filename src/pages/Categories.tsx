import { Link } from 'react-router-dom';
import { useCategories } from '../hooks/useElectronicsData';
import ScrollReveal from '../components/ScrollReveal';

export default function Categories() {
  const { categories, loading } = useCategories();

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-text mb-2">All Categories</h1>
          <p className="text-text-secondary">Browse products by category</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, idx) => (
            <ScrollReveal key={category.id} delay={idx * 0.1}>
              <Link to={`/categories/${category.slug}`} className="group block bg-surface rounded-xl overflow-hidden hover:shadow-xl transition-all border border-border">
                <div className="aspect-video bg-background relative overflow-hidden">
                  <img src={category.imageUrl || 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&q=80'} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors">{category.name}</h3>
                  {category.description && <p className="text-text-secondary text-sm">{category.description}</p>}
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
