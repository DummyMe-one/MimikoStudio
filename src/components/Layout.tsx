import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  onBookClick?: () => void;
}

export default function Layout({ children, onBookClick }: LayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/collections', label: 'Collections' },
    { to: '/navratri', label: 'Navratri' },
    { to: '/embroidery', label: 'Embroidery' },
    { to: '/custom-design', label: 'Custom Designs' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-ivory">
      {/* Announcement Bar */}
      <div className="bg-espresso text-ivory text-center py-2 px-4 text-xs tracking-widest uppercase font-sans">
        Handcrafted with love • Free consultation for custom designs
      </div>

      {/* Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-ivory/95 backdrop-blur-md shadow-sm border-b border-champagne/30'
            : 'bg-ivory'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="heading-serif text-2xl lg:text-3xl font-semibold text-espresso tracking-wide">
                MIMIKO
              </span>
              <span className="heading-serif text-2xl lg:text-3xl font-light text-muted-gold ml-1">
                STUDIO
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="gold-underline text-sm font-sans font-medium text-espresso/80 hover:text-espresso transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA + Mobile Menu */}
            <div className="flex items-center gap-4">
              <button
                onClick={onBookClick}
                className="hidden lg:inline-flex items-center gap-2 bg-espresso text-ivory px-5 py-2.5 text-sm font-sans font-medium rounded-sm hover:bg-espresso/90 transition-colors"
              >
                <ShoppingBag size={14} />
                Book a Design
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-espresso"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-ivory border-t border-champagne/30"
            >
              <nav className="px-6 py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="block text-base font-sans text-espresso/80 hover:text-espresso py-2"
                  >
                    {link.label}
                  </Link>
                ))}
                <button
                  onClick={onBookClick}
                  className="w-full mt-4 flex items-center justify-center gap-2 bg-espresso text-ivory px-5 py-3 text-sm font-sans font-medium rounded-sm"
                >
                  <ShoppingBag size={14} />
                  Book a Design
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-espresso text-ivory/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <h3 className="heading-serif text-2xl font-semibold text-ivory mb-2">
                MIMIKO <span className="text-light-gold">STUDIO</span>
              </h3>
              <p className="text-sm mt-4 leading-relaxed text-ivory/60">
                Jewellery • Ornaments • Embroidery • Custom Designs
              </p>
              <p className="text-sm mt-4 leading-relaxed text-ivory/60">
                Crafted to Adorn. Designed to Remember.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-light-gold mb-4 font-sans font-medium">
                Explore
              </h4>
              <ul className="space-y-3">
                {[
                  { to: '/collections', label: 'Collections' },
                  { to: '/navratri', label: 'Navratri' },
                  { to: '/embroidery', label: 'Embroidery' },
                  { to: '/custom-design', label: 'Custom Designs' },
                  { to: '/gallery', label: 'Gallery' },
                ].map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-ivory/60 hover:text-light-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-light-gold mb-4 font-sans font-medium">
                Information
              </h4>
              <ul className="space-y-3">
                {[
                  { to: '/about', label: 'About' },
                  { to: '/contact', label: 'Contact' },
                  { to: '/faq', label: 'FAQ' },
                  { to: '/privacy', label: 'Privacy Policy' },
                  { to: '/terms', label: 'Terms & Booking Policy' },
                ].map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-ivory/60 hover:text-light-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-light-gold mb-4 font-sans font-medium">
                Get in Touch
              </h4>
              <ul className="space-y-3 text-sm text-ivory/60">
                <li>
                  <a href="mailto:hello@mimikostudio.com" className="hover:text-light-gold transition-colors">
                    hello@mimikostudio.com
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/mimikostudio" target="_blank" rel="noopener noreferrer" className="hover:text-light-gold transition-colors">
                    @mimikostudio
                  </a>
                </li>
              </ul>
              <div className="mt-6">
                <Link
                  to="/booking"
                  className="inline-block border border-light-gold text-light-gold px-5 py-2 text-sm font-sans hover:bg-light-gold hover:text-espresso transition-colors"
                >
                  Book a Design
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-16 pt-8 border-t border-ivory/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-ivory/40">
              © {new Date().getFullYear()} Mimiko Studio. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="text-xs text-ivory/40 hover:text-light-gold transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="text-xs text-ivory/40 hover:text-light-gold transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
