import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, ShoppingCart, User, Phone, MapPin, Clock, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

export default function ElectronicsLayout({ children }: LayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Shop' },
    { to: '/categories', label: 'Categories' },
    { to: '/brands', label: 'Brands' },
    { to: '/offers', label: 'Offers' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-bg">
      {/* Top Info Bar */}
      <div className="bg-brand text-white text-sm py-2.5 hidden md:block">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-white/80 transition-colors">
                <Phone size={14} />
                <span>+91 98765 43210</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span>Main Market, Your City</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>Mon-Sat: 10AM - 9PM</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/contact" className="hover:text-white/80 transition-colors">
                Store Locator
              </Link>
              <span className="text-white/30">|</span>
              <Link to="/contact" className="hover:text-white/80 transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Announcement Bar */}
      <div className="gradient-warm text-white text-center py-2.5 px-4 text-sm font-semibold">
        <span className="inline-flex items-center gap-2">
          <span>🎉</span>
          <span>Festival Sale - Up to 40% OFF on Electronics, Furniture & Home Appliances!</span>
          <span>🎉</span>
        </span>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass shadow-soft' : 'bg-white border-b border-border-soft'
      }`}>
        <div className="container">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 lg:w-12 lg:h-12 gradient-brand rounded-xl flex items-center justify-center shadow-brand">
                <span className="text-white font-bold text-xl lg:text-2xl">S</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg lg:text-xl font-bold text-text leading-none tracking-tight">SHIVAM</h1>
                <p className="text-xs text-text-muted font-medium tracking-wider">ELECTRONICS</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-4 py-2 text-sm font-semibold text-text hover:text-brand transition-colors rounded-full hover:bg-brand-light"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2.5 hover:bg-bg-soft rounded-full transition-colors"
                aria-label="Search"
              >
                <Search size={20} className="text-text" />
              </button>

              {/* Cart */}
              <Link to="/products" className="p-2.5 hover:bg-bg-soft rounded-full transition-colors relative">
                <ShoppingCart size={20} className="text-text" />
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>

              {/* Account */}
              <Link to="/contact" className="hidden sm:flex p-2.5 hover:bg-bg-soft rounded-full transition-colors">
                <User size={20} className="text-text" />
              </Link>

              {/* CTA Button */}
              <Link
                to="/contact"
                className="hidden md:inline-flex btn btn-primary btn-sm ml-2"
              >
                <Phone size={16} />
                <span>Enquire</span>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 hover:bg-bg-soft rounded-full transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-border-soft bg-white"
            >
              <div className="container py-4">
                <div className="relative max-w-2xl mx-auto">
                  <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input
                    type="text"
                    placeholder="Search for products, brands, categories..."
                    className="input pl-12"
                    autoFocus
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-border-soft"
            >
              <nav className="container py-6 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="block px-4 py-3 text-text hover:bg-brand-light hover:text-brand rounded-xl transition-colors font-semibold"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 mt-4 border-t border-border-soft space-y-2">
                  <Link
                    to="/contact"
                    className="block w-full text-center btn btn-primary"
                  >
                    <Phone size={16} />
                    Enquire Now
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="min-h-[60vh]">{children}</main>

      {/* Footer */}
      <footer className="bg-text text-white mt-20">
        <div className="container py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 gradient-brand rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">S</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold leading-none">SHIVAM</h3>
                  <p className="text-xs text-white/60 font-medium tracking-wider">ELECTRONICS</p>
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Your trusted destination for electronics, furniture, and home appliances. Quality products, expert guidance, and exceptional service.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand transition-colors">
                  <span className="text-sm font-semibold">FB</span>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand transition-colors">
                  <span className="text-sm font-semibold">IG</span>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand transition-colors">
                  <span className="text-sm font-semibold">YT</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-white/70 hover:text-white transition-colors text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-6">Categories</h4>
              <ul className="space-y-3">
                <li><Link to="/categories" className="text-white/70 hover:text-white transition-colors text-sm">Televisions</Link></li>
                <li><Link to="/categories" className="text-white/70 hover:text-white transition-colors text-sm">Smartphones</Link></li>
                <li><Link to="/categories" className="text-white/70 hover:text-white transition-colors text-sm">Refrigerators</Link></li>
                <li><Link to="/categories" className="text-white/70 hover:text-white transition-colors text-sm">Furniture</Link></li>
                <li><Link to="/categories" className="text-white/70 hover:text-white transition-colors text-sm">Washing Machines</Link></li>
                <li><Link to="/categories" className="text-white/70 hover:text-white transition-colors text-sm">Home Appliances</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-6">Visit Us</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-brand flex-shrink-0 mt-0.5" />
                  <span className="text-white/70">Main Market, Your City, State - 123456</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-brand flex-shrink-0" />
                  <a href="tel:+919876543210" className="text-white/70 hover:text-white transition-colors">
                    +91 98765 43210
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Clock size={18} className="text-brand flex-shrink-0" />
                  <span className="text-white/70">Mon-Sat: 10AM - 9PM</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link
                  to="/contact"
                  className="inline-flex btn btn-primary btn-sm"
                >
                  Get Directions
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-white/60 text-sm">
                © {new Date().getFullYear()} Shivam Electronics. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm">
                <Link to="/privacy" className="text-white/60 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-white/60 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
