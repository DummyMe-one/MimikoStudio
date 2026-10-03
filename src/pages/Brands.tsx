import { Link } from 'react-router-dom';
import { useBrands } from '../hooks/useElectronicsData';
import ScrollReveal from '../components/ScrollReveal';

export default function Brands() {
  const { brands, loading } = useBrands();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-text-secondary mt-4">Loading brands...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-text mb-2">Our Brands</h1>
          <p className="text-text-secondary text-lg">Shop from trusted brands</p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {brands.map((brand, idx) => (
            <ScrollReveal key={brand.id} delay={idx * 0.05}>
              <Link 
                to={`/brands/${brand.slug}`} 
                className="group card p-6 text-center hover:border-primary"
              >
                <div className="w-24 h-24 mx-auto mb-4 bg-background rounded-full flex items-center justify-center overflow-hidden border-2 border-border group-hover:border-primary transition-colors">
                  {brand.logoUrl ? (
                    <img src={brand.logoUrl} alt={brand.name} className="w-full h-full object-contain p-2" />
                  ) : (
                    <span className="text-3xl font-bold text-primary">{brand.name[0]}</span>
                  )}
                </div>
                <h3 className="font-bold text-text group-hover:text-primary transition-colors">
                  {brand.name}
                </h3>
                {brand.description && (
                  <p className="text-text-secondary text-sm mt-2 line-clamp-2">
                    {brand.description}
                  </p>
                )}
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {brands.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-border">
            <p className="text-text-secondary">No brands available</p>
          </div>
        )}
      </div>
    </div>
  );
}
