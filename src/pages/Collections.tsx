import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { useCollections } from '../hooks/useData';

export default function Collections() {
  const { collections } = useCollections();
  return (
    <div>
      {/* Header */}
      <section className="py-16 lg:py-24 bg-cream/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.3em] text-light-gold font-sans font-medium mb-4">
              Our Collections
            </p>
            <h1 className="heading-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-espresso mb-4">
              Explore Our World
            </h1>
            <p className="text-taupe max-w-2xl mx-auto leading-relaxed">
              Each collection is a curated expression of Indian craftsmanship — from timeless jewellery to festive Navratri ornaments and intricate embroidery.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 lg:space-y-20">
            {collections.map((col, idx) => (
              <ScrollReveal key={col.id} delay={idx * 0.05}>
                <Link
                  to={`/collections/${col.slug}`}
                  className={`group grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center ${
                    idx % 2 === 1 ? 'lg:direction-rtl' : ''
                  }`}
                >
                  <div className={`relative overflow-hidden aspect-[16/10] ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <img
                      src={col.coverImage}
                      alt={col.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className={`${idx % 2 === 1 ? 'lg:order-1 lg:text-right' : ''}`}>
                    <p className="text-xs uppercase tracking-[0.3em] text-light-gold font-sans font-medium mb-3">
                      Collection
                    </p>
                    <h2 className="heading-serif text-3xl lg:text-4xl font-semibold text-espresso mb-4 group-hover:text-muted-gold transition-colors">
                      {col.name}
                    </h2>
                    <p className="text-taupe leading-relaxed mb-6">{col.description}</p>
                    <span className="inline-flex items-center gap-2 text-sm text-espresso font-sans font-medium gold-underline">
                      Explore Collection <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
