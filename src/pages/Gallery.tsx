import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { useDesigns } from '../hooks/useData';

export default function Gallery() {
  const { designs, loading } = useDesigns();
  // Collect all images from designs for the gallery
  const allImages = designs.flatMap((d) =>
    d.images.map((img) => ({ ...img, designName: d.name, designSlug: d.slug }))
  );

  return (
    <div>
      {/* Header */}
      <section className="py-16 lg:py-24 bg-cream/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.3em] text-light-gold font-sans font-medium mb-4">
              Gallery
            </p>
            <h1 className="heading-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-espresso mb-4">
              Our Creations
            </h1>
            <p className="text-taupe max-w-xl mx-auto">
              A visual journey through our handcrafted jewellery, ornaments, and embroidery work.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-taupe">Loading gallery...</p>
            </div>
          ) : allImages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-taupe mb-2">No images available yet.</p>
              <p className="text-sm text-taupe/70">Gallery images will appear here once designs are added by the admin.</p>
            </div>
          ) : (
            <div className="masonry-grid">
              {allImages.map((img, idx) => (
              <ScrollReveal key={img.id} delay={idx * 0.03}>
                <Link
                  to={`/designs/${img.designSlug}`}
                  className="group block relative overflow-hidden bg-cream"
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    style={{ aspectRatio: idx % 3 === 0 ? '3/4' : idx % 3 === 1 ? '4/3' : '1/1' }}
                  />
                  <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/30 transition-colors flex items-end">
                    <div className="p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-ivory text-sm font-sans">{img.designName}</p>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
            </div>
          )}
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="py-16 lg:py-20 bg-cream/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Instagram size={24} className="text-muted-gold" />
              <h2 className="heading-serif text-2xl font-semibold text-espresso">
                Follow Mimiko Studio
              </h2>
            </div>
            <p className="text-taupe mb-6">
              See our latest creations, behind-the-scenes moments, and styling inspiration.
            </p>
            <a
              href="https://instagram.com/mimikostudio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-espresso text-espresso px-6 py-3 text-sm font-sans font-medium hover:bg-espresso hover:text-ivory transition-colors"
            >
              <Instagram size={16} />
              @mimikostudio
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
