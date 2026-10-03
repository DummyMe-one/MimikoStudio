import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 lg:py-36 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1200&q=80"
            alt="Mimiko Studio craftsmanship"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-espresso/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.3em] text-light-gold font-sans font-medium mb-4">
              Our Story
            </p>
            <h1 className="heading-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-ivory mb-4">
              The Story Behind<br />Mimiko Studio
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal direction="left">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-light-gold font-sans font-medium mb-4">
                  Our Story
                </p>
                <h2 className="heading-serif text-3xl lg:text-4xl font-semibold text-espresso mb-6">
                  Born from a Love of Craft
                </h2>
                <div className="space-y-4 text-taupe leading-relaxed">
                  <p>
                    Mimiko Studio was born from a deep appreciation for the art of handcrafted jewellery and ornaments. What began as a personal passion for creating beautiful, meaningful pieces has grown into a studio dedicated to preserving and celebrating Indian craftsmanship.
                  </p>
                  <p>
                    Every design that leaves our studio carries with it hours of careful work — from the initial sketch to the final polish. We believe that jewellery and ornaments should be more than accessories; they should be treasures that carry meaning and memory.
                  </p>
                  <p>
                    Our name, Mimiko, reflects our philosophy: attention to the smallest details, the subtle nuances that make a piece truly special.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80"
                  alt="Mimiko Studio artisan at work"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Our Craft */}
      <section className="py-16 lg:py-24 bg-cream/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal direction="left" className="lg:order-2">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-light-gold font-sans font-medium mb-4">
                  Our Craft
                </p>
                <h2 className="heading-serif text-3xl lg:text-4xl font-semibold text-espresso mb-6">
                  Patience in Every Piece
                </h2>
                <div className="space-y-4 text-taupe leading-relaxed">
                  <p>
                    We don't rush our process. Each piece is created with the time and attention it deserves. From selecting materials to the final quality check, every step is guided by care and intention.
                  </p>
                  <p>
                    Our artisans bring together traditional techniques — Kundan setting, zari embroidery, mirror work, bead stringing — with contemporary design sensibility. The result is jewellery and ornaments that feel both timeless and fresh.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" className="lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=500&q=80"
                    alt="Craftsmanship detail"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="aspect-square overflow-hidden mt-8">
                  <img
                    src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&q=80"
                    alt="Handcrafted detail"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.3em] text-light-gold font-sans font-medium mb-4">
              Our Philosophy
            </p>
            <h2 className="heading-serif text-3xl lg:text-5xl font-semibold text-espresso mb-8">
              "Every piece should feel personal."
            </h2>
            <p className="text-taupe max-w-2xl mx-auto leading-relaxed text-lg">
              We create for real people with real occasions — weddings, festivals, celebrations, and everyday moments of beauty. Our goal is for each piece to feel like it was made just for you, even when it's part of our collection.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Made With Intention */}
      <section className="py-16 lg:py-24 bg-espresso text-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: 'Made With Intention',
                text: 'Every design decision — from stone selection to color palette — is made with purpose. Nothing is arbitrary.',
              },
              {
                title: 'Celebrating Tradition',
                text: 'We honor the rich traditions of Indian jewellery and ornament-making, bringing them to life for contemporary wearers.',
              },
              {
                title: 'Personal Connection',
                text: 'We believe in knowing our clients, understanding their occasions, and creating pieces that truly resonate.',
              },
            ].map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className="text-center">
                  <div className="w-12 h-px bg-light-gold mx-auto mb-6" />
                  <h3 className="heading-serif text-xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-ivory/60 text-sm leading-relaxed">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="heading-serif text-3xl font-semibold text-espresso mb-4">
              Let's Create Something Beautiful
            </h2>
            <p className="text-taupe mb-8 max-w-lg mx-auto">
              Whether you're looking for the perfect piece from our collection or want to design something custom, we'd love to hear from you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/collections"
                className="inline-flex items-center gap-2 bg-espresso text-ivory px-7 py-3.5 text-sm font-sans font-medium hover:bg-espresso/90 transition-colors"
              >
                Explore Collections <ArrowRight size={14} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-espresso text-espresso px-7 py-3.5 text-sm font-sans font-medium hover:bg-espresso hover:text-ivory transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
