import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Headphones, CreditCard, Star, ChevronRight, Zap, Award, Users, Play } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import ProductCard from '../components/ProductCard';
import { useProducts, useCategories, useBrands } from '../hooks/useElectronicsData';

export default function ElectronicsHome() {
  const { products } = useProducts();
  const { categories } = useCategories();
  const { brands } = useBrands();

  const featuredProducts = products.filter(p => p.featured).slice(0, 8);
  const newArrivals = products.filter(p => p.newArrival).slice(0, 6);

  return (
    <div className="bg-bg">
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-bg-soft via-brand-light to-bg">
        <div className="container relative py-12 md:py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <ScrollReveal direction="left">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-soft">
                  <Zap size={16} className="text-accent" />
                  <span className="text-text">Festival Sale Live Now</span>
                </div>
                
                <h1 className="display-1 text-text mb-6">
                  Upgrade Your
                  <br />
                  <span className="text-brand">Home Today</span>
                </h1>
                
                <p className="text-lg text-text-soft mb-8 leading-relaxed">
                  Discover premium electronics, stylish furniture, and smart home appliances — all under one roof. Transform every corner of your home with quality products.
                </p>
                
                <div className="flex flex-wrap gap-3">
                  <Link to="/products" className="btn btn-primary btn-lg">
                    Explore Products
                    <ArrowRight size={18} />
                  </Link>
                  <Link to="/categories" className="btn btn-outline btn-lg">
                    Shop by Category
                  </Link>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-8 mt-10 pt-8 border-t border-border">
                  <div>
                    <p className="text-2xl font-bold text-text">500+</p>
                    <p className="text-sm text-text-muted">Products</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-text">50+</p>
                    <p className="text-sm text-text-muted">Brands</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-text">15+</p>
                    <p className="text-sm text-text-muted">Categories</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Hero Image */}
            <ScrollReveal direction="right">
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-strong">
                  <img
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"
                    alt="Modern living room"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Floating Cards */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-strong hidden md:block">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center">
                      <Award size={24} className="text-brand" />
                    </div>
                    <div>
                      <p className="font-bold text-text">Up to 40% OFF</p>
                      <p className="text-xs text-text-muted">On selected items</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-strong hidden md:block">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                      <CreditCard size={24} className="text-accent" />
                    </div>
                    <div>
                      <p className="font-bold text-text">Easy EMI</p>
                      <p className="text-xs text-text-muted">Available</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============ SHOP BY CATEGORY ============ */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="eyebrow mb-2">Browse Collection</p>
                <h2 className="display-2 text-text">Shop by Category</h2>
              </div>
              <Link to="/categories" className="hidden md:flex items-center gap-2 text-brand font-semibold hover:gap-3 transition-all">
                View All <ArrowRight size={18} />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Televisions', emoji: '📺', color: 'from-blue-500 to-blue-600' },
              { name: 'Smartphones', emoji: '📱', color: 'from-purple-500 to-purple-600' },
              { name: 'Refrigerators', emoji: '🧊', color: 'from-cyan-500 to-cyan-600' },
              { name: 'Furniture', emoji: '🛋️', color: 'from-amber-500 to-amber-600' },
              { name: 'Washing Machines', emoji: '🫧', color: 'from-sky-500 to-sky-600' },
              { name: 'Speakers', emoji: '🔊', color: 'from-rose-500 to-rose-600' },
            ].map((cat, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.05}>
                <Link
                  to="/categories"
                  className="group block bg-white rounded-2xl p-6 text-center hover:shadow-medium transition-all border border-border-soft hover:-translate-y-1"
                >
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-soft`}>
                    <span className="text-4xl">{cat.emoji}</span>
                  </div>
                  <h3 className="font-semibold text-text text-sm group-hover:text-brand transition-colors">
                    {cat.name}
                  </h3>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURED PRODUCTS ============ */}
      <section className="section bg-white">
        <div className="container">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="eyebrow mb-2">Handpicked for You</p>
                <h2 className="display-2 text-text">Featured Products</h2>
                <p className="text-text-soft mt-2">Explore products selected from our showroom</p>
              </div>
              <Link to="/products" className="hidden md:flex items-center gap-2 text-brand font-semibold hover:gap-3 transition-all">
                View All <ArrowRight size={18} />
              </Link>
            </div>
          </ScrollReveal>

          {featuredProducts.length === 0 ? (
            <div className="text-center py-16 bg-bg-soft rounded-3xl">
              <p className="text-text-muted text-lg">Featured products will appear here</p>
              <p className="text-text-muted text-sm mt-2">Add products from the admin panel</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {featuredProducts.map((product, idx) => (
                <ScrollReveal key={product.id} delay={idx * 0.05}>
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============ MAJOR PROMOTION ============ */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="relative gradient-warm rounded-3xl overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                  backgroundSize: '40px 40px'
                }} />
              </div>
              
              <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-12 lg:p-16 items-center">
                <div>
                  <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-semibold mb-4">
                    🔥 Limited Time Offer
                  </span>
                  <h3 className="display-2 text-white mb-4">
                    Festival Mega Sale
                  </h3>
                  <p className="text-white/90 text-lg mb-8 leading-relaxed">
                    Get up to 40% off on selected electronics, furniture, and home appliances. Don't miss out on these exclusive deals!
                  </p>
                  <Link to="/offers" className="btn bg-white text-accent hover:bg-bg-soft">
                    Shop Now <ArrowRight size={18} />
                  </Link>
                </div>
                <div className="hidden lg:block">
                  <div className="aspect-video bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <img
                      src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80"
                      alt="Festival sale"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============ ELECTRONICS SHOWCASE (DARK) ============ */}
      <section className="showcase-dark section">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="eyebrow mb-2" style={{ color: 'var(--color-accent)' }}>Smart Living</p>
              <h2 className="display-2 text-white">
                Smarter Technology
                <br />
                <span className="text-accent">For Your Home</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Televisions', desc: 'Smart TVs & LED displays', img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&q=80' },
              { title: 'Smartphones', desc: 'Latest mobile devices', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80' },
              { title: 'Audio', desc: 'Speakers & sound systems', img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&q=80' },
              { title: 'Appliances', desc: 'Smart home devices', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80' },
            ].map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <Link to="/products" className="group block">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-4 relative">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-white/60 text-sm mb-3">{item.desc}</p>
                  <span className="inline-flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all">
                    Explore <ArrowRight size={16} />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FURNITURE SHOWCASE (EDITORIAL) ============ */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"
                    alt="Modern furniture"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-accent text-white rounded-2xl p-6 shadow-strong hidden md:block">
                  <p className="text-3xl font-bold mb-1">40%</p>
                  <p className="text-sm font-semibold">OFF</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div>
                <p className="eyebrow mb-4">Home & Living</p>
                <h2 className="display-2 text-text mb-6">
                  Create Your
                  <br />
                  <span className="text-brand">Dream Home</span>
                </h2>
                <p className="text-text-soft text-lg leading-relaxed mb-8">
                  Transform your living space with our curated collection of premium furniture. From comfortable sofas to elegant beds, find everything you need to create a home you'll love.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { name: 'Sofas', count: '50+' },
                    { name: 'Beds', count: '30+' },
                    { name: 'Almirahs', count: '40+' },
                    { name: 'Tables', count: '25+' },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-bg-soft rounded-xl p-4">
                      <p className="font-bold text-text">{item.name}</p>
                      <p className="text-sm text-text-muted">{item.count} products</p>
                    </div>
                  ))}
                </div>

                <Link to="/categories" className="btn btn-dark btn-lg">
                  Explore Furniture <ArrowRight size={18} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============ HOME APPLIANCES ============ */}
      <section className="section showcase-soft">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="eyebrow mb-2">Daily Essentials</p>
              <h2 className="display-2 text-text">
                Everyday Home
                <br />
                <span className="text-brand">Made Better</span>
              </h2>
              <p className="text-text-soft mt-4 max-w-2xl mx-auto">
                Quality appliances that make your daily life easier and more comfortable
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Refrigerators', emoji: '🧊', bg: 'bg-cyan-50' },
              { name: 'Washing Machines', emoji: '🫧', bg: 'bg-sky-50' },
              { name: 'RO Purifiers', emoji: '💧', bg: 'bg-blue-50' },
              { name: 'Fans', emoji: '🌀', bg: 'bg-teal-50' },
              { name: 'Coolers', emoji: '❄️', bg: 'bg-indigo-50' },
              { name: 'Kitchen', emoji: '🍳', bg: 'bg-orange-50' },
            ].map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.05}>
                <Link to="/products" className="group block bg-white rounded-2xl p-6 text-center hover:shadow-medium transition-all border border-border-soft">
                  <div className={`w-16 h-16 mx-auto mb-3 rounded-2xl ${item.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <span className="text-3xl">{item.emoji}</span>
                  </div>
                  <h3 className="font-semibold text-text text-sm">{item.name}</h3>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BRANDS ============ */}
      <section className="section bg-white">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="eyebrow mb-2">Trusted Partners</p>
              <h2 className="display-2 text-text">Shop by Brand</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['Samsung', 'LG', 'Sony', 'Whirlpool', 'Haier', 'IFB'].map((brand, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.05}>
                <div className="bg-bg-soft rounded-2xl p-6 text-center hover:shadow-soft transition-all cursor-pointer">
                  <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-soft">
                    <span className="text-2xl font-bold text-brand">{brand[0]}</span>
                  </div>
                  <p className="font-semibold text-text text-sm">{brand}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ NEW ARRIVALS ============ */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="eyebrow mb-2">Just Launched</p>
                <h2 className="display-2 text-text">New Arrivals</h2>
                <p className="text-text-soft mt-2">Latest products just arrived at our showroom</p>
              </div>
              <Link to="/products" className="hidden md:flex items-center gap-2 text-brand font-semibold hover:gap-3 transition-all">
                View All <ArrowRight size={18} />
              </Link>
            </div>
          </ScrollReveal>

          {newArrivals.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl">
              <p className="text-text-muted text-lg">New arrivals will appear here</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {newArrivals.map((product, idx) => (
                <ScrollReveal key={product.id} delay={idx * 0.05}>
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      <section className="section bg-white">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="eyebrow mb-2">Our Promise</p>
              <h2 className="display-2 text-text">Why Shop With Us?</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: 'Fast Delivery', desc: 'Quick delivery to your doorstep' },
              { icon: Shield, title: 'Genuine Products', desc: '100% authentic branded items' },
              { icon: Headphones, title: 'Expert Support', desc: 'Knowledgeable staff to help' },
              { icon: CreditCard, title: 'Easy EMI', desc: 'Flexible payment options' },
            ].map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className="card-soft p-6 text-center">
                  <div className="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <item.icon size={28} className="text-brand" />
                  </div>
                  <h3 className="font-bold text-text mb-2 text-lg">{item.title}</h3>
                  <p className="text-text-soft text-sm">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ VISIT SHOWROOM ============ */}
      <section className="section gradient-brand">
        <div className="container">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="eyebrow mb-4" style={{ color: 'var(--color-accent)' }}>Experience In Person</p>
                <h2 className="display-2 text-white mb-6">
                  Visit Our
                  <br />
                  Showroom
                </h2>
                <p className="text-white/90 text-lg mb-8 leading-relaxed">
                  Experience our products firsthand. Touch, feel, and compare. Our expert staff is ready to help you find the perfect solution for your home.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/contact" className="btn bg-white text-brand hover:bg-bg-soft">
                    Get Directions <ChevronRight size={18} />
                  </Link>
                  <a href="tel:+919876543210" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>
                    Call Now
                  </a>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="aspect-video bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20">
                  <img
                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"
                    alt="Showroom"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
