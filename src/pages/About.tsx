import ScrollReveal from '../components/ScrollReveal';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Headphones, Truck, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="text-4xl lg:text-5xl font-bold text-text mb-4">About Shivam Electronics</h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Your trusted partner for quality electronics and home appliances
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal direction="left">
              <div>
                <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-4">Our Story</p>
                <h2 className="text-3xl lg:text-4xl font-bold text-text mb-6">
                  Serving Customers with Quality & Trust
                </h2>
                <div className="space-y-4 text-text-secondary leading-relaxed">
                  <p>
                    Shivam Electronics has been a trusted name in electronics and home appliances, serving customers with quality products and exceptional service.
                  </p>
                  <p>
                    We believe in providing the best products from leading brands at competitive prices, backed by expert advice and reliable after-sales support.
                  </p>
                  <p>
                    Our showroom showcases the latest in technology and home appliances, helping you make informed decisions for your home and lifestyle needs.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="aspect-square bg-surface rounded-2xl overflow-hidden border border-border">
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"
                  alt="Shivam Electronics Showroom"
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text mb-4">Why Choose Us?</h2>
              <p className="text-text-secondary text-lg">What makes us your preferred electronics destination</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Genuine Products', desc: '100% authentic branded products with valid warranty' },
              { icon: Headphones, title: 'Expert Support', desc: 'Knowledgeable staff to guide your purchase' },
              { icon: Truck, title: 'Quick Delivery', desc: 'Fast and reliable delivery to your doorstep' },
              { icon: Award, title: 'Best Prices', desc: 'Competitive pricing with exclusive offers' },
            ].map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className="bg-background rounded-xl p-6 text-center border border-border hover:shadow-lg transition-all">
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

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Visit Our Showroom</h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Experience our products firsthand. Our expert staff is ready to help you find the perfect solution.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-background transition-colors"
              >
                Browse Products <ArrowRight size={20} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/30"
              >
                Contact Us
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
