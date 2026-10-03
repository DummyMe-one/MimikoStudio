import { Link } from 'react-router-dom';
import { useBrands } from '../hooks/useElectronicsData';
import ScrollReveal from '../components/ScrollReveal';

export default function Brands() {
  const { brands, loading } = useBrands();

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-text mb-2">Our Brands</h1>
          <p className="text-text-secondary">Shop from trusted brands</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands.map((brand, idx) => (
            <ScrollReveal key={brand.id} delay={idx * 0.1}>
              <Link to={`/brands/${brand.slug}`} className="group block bg-surface rounded-xl p-6 text-center hover:shadow-xl transition-all border border-border">
                <div className="w-24 h-24 mx-auto mb-4 bg-background rounded-full flex items-center justify-center overflow-hidden">
                  {brand.logoUrl ? (
                    <img src={brand.logoUrl} alt={brand.name} className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-3xl font-bold text-primary">{brand.name[0]}</span>
                  )}
                </div>
                <h3 className="font-bold text-text group-hover:text-primary transition-colors">{brand.name}</h3>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
