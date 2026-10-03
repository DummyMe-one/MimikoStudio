import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Headphones, CreditCard, Star, ChevronRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { useProducts, useCategories } from '../hooks/useElectronicsData';

export default function ElectronicsHome() {
  const { products } = useProducts();
  const { categories } = useCategories();

  const featuredProducts = products.filter(p => p.featured).slice(0, 8);
  const newArrivals = products.filter(p => p.newArrival).slice(0, 4);
  const popularProducts = products.filter(p => p.popular).slice(0, 4);

  return (
    <div className="bg-background">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium mb-6">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  Festival Sale Live Now
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Upgrade Your Home<br />
                  <span className="text-accent">Today</span>
                </h1>
                
                <p className="text-lg text-white/90 mb-8 max-w-lg">
                  Great deals on TVs, refrigerators, washing machines, and more. Visit our showroom for exclusive offers.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-dark transition-all hover:scale-105 shadow-lg"
                  >
                    Explore Products
                    <ArrowRight size={20} />
                  </Link>
                  <Link
                    to="/offers"
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/30"
                  >
                    View Offers
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="relative">
                <div className="aspect-square bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                  <img
                    src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80"
                    alt="Electronics showcase"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                
                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-accent text-white px-6 py-3 rounded-full font-bold shadow-xl">
                  Up to 40% OFF
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white text-primary px-6 py-3 rounded-full font-bold shadow-xl">
                  EMI Available
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Category Showcase */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text mb-4">
                Shop by Category
              </h2>
              <p className="text-text-secondary text-lg">
                Find exactly what you're looking for
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.slice(0, 6).map((category, idx) => (
              <ScrollReveal key={category.id} delay={idx * 0.1}>
                <Link
                  to={`/categories/${category.slug}`}
                  className="group block bg-surface rounded-xl p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1 border border-border"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all">
                    <span className="text-3xl">📱</span>
                  </div>
                  <h3 className="font-semibold text-text group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-text mb-2">
                  Featured Products
                </h2>
                <p className="text-text-secondary">
                  Handpicked selections for you
                </p>
              </div>
              <Link
                to="/products"
                className="hidden md:inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                View All <ArrowRight size={20} />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, idx) => (
              <ScrollReveal key={product.id} delay={idx * 0.1}>
                <Link
                  to={`/products/${product.slug}`}
                  className="group block bg-background rounded-xl overflow-hidden hover:shadow-xl transition-all border border-border"
                >
                  <div className="aspect-square bg-surface relative overflow-hidden">
                    <img
                      src={product.images?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&q=80'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.newArrival && (
                      <span className="absolute top-3 left-3 bg-success text-white px-3 py-1 rounded-full text-xs font-bold">
                        NEW
                      </span>
                    )}
                    {product.popular && (
                      <span className="absolute top-3 right-3 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold">
                        POPULAR
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-text-secondary font-medium mb-1">
                      {product.brand?.name || 'Brand'}
                    </p>
                    <h3 className="font-semibold text-text mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star size={14} className="fill-accent text-accent" />
                        <span className="text-sm font-medium text-text">{product.rating || '4.5'}</span>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-primary">
                        ₹{(product.sellingPrice || 0).toLocaleString()}
                      </span>
                      {product.mrp && product.mrp > (product.sellingPrice || 0) && (
                        <span className="text-sm text-text-secondary line-through">
                          ₹{product.mrp.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
            >
              View All Products <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="relative bg-gradient-to-r from-accent to-accent-dark rounded-2xl overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                  backgroundSize: '30px 30px'
                }} />
              </div>
              
              <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12 items-center">
                <div>
                  <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium mb-4">
                    🔥 Limited Time Offer
                  </span>
                  <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                    Festival Mega Sale
                  </h3>
                  <p className="text-white/90 text-lg mb-6">
                    Get up to 40% off on selected appliances. Don't miss out on these exclusive deals!
                  </p>
                  <Link
                    to="/offers"
                    className="inline-flex items-center gap-2 bg-white text-accent px-8 py-4 rounded-lg font-semibold hover:bg-background transition-colors"
                  >
                    Shop Now <ArrowRight size={20} />
                  </Link>
                </div>
                <div className="hidden lg:block">
                  <div className="aspect-video bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <img
                      src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80"
                      alt="Festival sale"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 lg:py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-text mb-2">
                  New Arrivals
                </h2>
                <p className="text-text-secondary">
                  Latest products just arrived
                </p>
              </div>
              <Link
                to="/products?filter=new"
                className="hidden md:inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                View All <ArrowRight size={20} />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product, idx) => (
              <ScrollReveal key={product.id} delay={idx * 0.1}>
                <Link
                  to={`/products/${product.slug}`}
                  className="group block bg-background rounded-xl overflow-hidden hover:shadow-xl transition-all border border-border"
                >
                  <div className="aspect-square bg-surface relative overflow-hidden">
                    <img
                      src={product.images?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&q=80'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-success text-white px-3 py-1 rounded-full text-xs font-bold">
                      NEW
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-text-secondary font-medium mb-1">
                      {product.brand?.name || 'Brand'}
                    </p>
                    <h3 className="font-semibold text-text mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-primary">
                        ₹{product.sellingPrice?.toLocaleString() || '0'}
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text mb-4">
                Why Choose Shivam Electronics?
              </h2>
              <p className="text-text-secondary text-lg">
                Your trusted partner for all electronics needs
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: 'Fast Delivery', desc: 'Quick delivery to your doorstep' },
              { icon: Shield, title: 'Genuine Products', desc: '100% authentic branded products' },
              { icon: Headphones, title: 'Expert Support', desc: 'Knowledgeable staff to help you' },
              { icon: CreditCard, title: 'Easy EMI', desc: 'Flexible payment options available' },
            ].map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className="bg-surface rounded-xl p-6 text-center hover:shadow-lg transition-all border border-border">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon size={28} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-text mb-2">{item.title}</h3>
                  <p className="text-text-secondary text-sm">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Store Visit CTA */}
      <section className="py-16 lg:py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Visit Our Showroom
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Experience our products firsthand. Our expert staff is ready to help you find the perfect solution.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-background transition-colors"
                >
                  Get Directions
                  <ChevronRight size={20} />
                </Link>
                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/30"
                >
                  Call Now
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
