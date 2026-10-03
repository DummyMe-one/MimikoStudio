import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Phone, MessageCircle, Share2, Heart } from 'lucide-react';
import { useProducts } from '../hooks/useElectronicsData';
import EnquiryModal from '../components/EnquiryModal';
import ScrollReveal from '../components/ScrollReveal';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { products, loading } = useProducts();
  const [activeImage, setActiveImage] = useState(0);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const product = products.find(p => p.slug === slug);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-text-secondary mt-4">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text mb-4">Product Not Found</h1>
          <Link to="/products" className="text-primary hover:underline">Back to Products</Link>
        </div>
      </div>
    );
  }

  const images = product.images?.length ? product.images : [{ imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80', altText: product.name }];
  const discount = product.mrp && product.sellingPrice 
    ? Math.round(((product.mrp - product.sellingPrice) / product.mrp) * 100)
    : 0;

  return (
    <div className="bg-background min-h-screen">
      <div className="container py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-secondary mb-8">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={16} />
          <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
          {product.category && (
            <>
              <ChevronRight size={16} />
              <Link to={`/categories/${product.category.slug}`} className="hover:text-primary transition-colors">
                {product.category.name}
              </Link>
            </>
          )}
          <ChevronRight size={16} />
          <span className="text-text font-semibold">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <ScrollReveal direction="left">
            <div>
              {/* Main Image */}
              <div className="aspect-square bg-white rounded-2xl overflow-hidden mb-4 border border-border">
                <img 
                  src={images[activeImage]?.imageUrl} 
                  alt={images[activeImage]?.altText || product.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        idx === activeImage ? 'border-primary' : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <img src={img.imageUrl} alt={img.altText || ''} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Product Info */}
          <ScrollReveal direction="right">
            <div>
              {/* Brand */}
              <p className="text-sm text-text-secondary font-semibold mb-2 uppercase tracking-wide">
                {product.brand?.name}
              </p>

              {/* Product Name */}
              <h1 className="text-3xl lg:text-4xl font-bold text-text mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} size={18} className={i <= (product.rating || 4) ? 'fill-accent text-accent' : 'text-border'} />
                  ))}
                </div>
                <span className="text-text-secondary text-sm">({product.rating || 4.0} rating)</span>
              </div>

              {/* Price */}
              <div className="bg-background rounded-xl p-6 mb-6 border border-border">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-bold text-primary">
                    ₹{(product.sellingPrice || 0).toLocaleString()}
                  </span>
                  {product.mrp && product.mrp > (product.sellingPrice || 0) && (
                    <>
                      <span className="text-xl text-text-secondary line-through">
                        ₹{product.mrp.toLocaleString()}
                      </span>
                      <span className="price-discount">
                        {discount}% OFF
                      </span>
                    </>
                  )}
                </div>
                <p className="text-sm text-text-secondary">Inclusive of all taxes</p>
              </div>

              {/* Short Description */}
              {product.shortDescription && (
                <p className="text-text-secondary mb-6 leading-relaxed">
                  {product.shortDescription}
                </p>
              )}

              {/* Key Features */}
              <div className="mb-6">
                <h3 className="font-bold text-text mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.specifications?.slice(0, 5).map((spec, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-primary font-bold">✓</span>
                      <span className="text-text-secondary">
                        <span className="font-semibold text-text">{spec.attribute?.name}:</span> {spec.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-3 mb-6">
                <span className={`w-3 h-3 rounded-full ${
                  product.availability === 'IN_STOCK' ? 'bg-success' : 'bg-danger'
                }`} />
                <span className="font-semibold text-text">
                  {product.availability === 'IN_STOCK' ? 'In Stock' : product.availability}
                </span>
              </div>

              {/* Warranty */}
              {product.warranty && (
                <div className="mb-6">
                  <p className="text-sm text-text-secondary">
                    <span className="font-semibold text-text">Warranty:</span> {product.warranty}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button 
                  onClick={() => setIsEnquiryOpen(true)}
                  className="btn btn-primary flex-1"
                >
                  <MessageCircle size={20} />
                  Enquire Now
                </button>
                <a 
                  href="tel:+919876543210"
                  className="btn btn-secondary flex-1"
                >
                  <Phone size={20} />
                  Call Us
                </a>
              </div>

              {/* Additional Actions */}
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <button className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors text-sm font-semibold">
                  <Heart size={18} />
                  Add to Wishlist
                </button>
                <button className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors text-sm font-semibold">
                  <Share2 size={18} />
                  Share
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Full Description */}
        {product.description && (
          <ScrollReveal>
            <div className="mt-12 bg-white rounded-xl p-6 lg:p-8 border border-border">
              <h2 className="text-2xl font-bold text-text mb-4">Product Description</h2>
              <div className="text-text-secondary leading-relaxed whitespace-pre-line">
                {product.description}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Specifications */}
        {product.specifications && product.specifications.length > 0 && (
          <ScrollReveal>
            <div className="mt-8 bg-white rounded-xl p-6 lg:p-8 border border-border">
              <h2 className="text-2xl font-bold text-text mb-6">Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specifications.map((spec, idx) => (
                  <div key={idx} className="flex justify-between py-3 border-b border-border last:border-0">
                    <span className="text-text-secondary font-semibold">{spec.attribute?.name}</span>
                    <span className="text-text font-medium text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>

      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        prefillProduct={product ? { id: product.id, name: product.name, sku: product.sku } : undefined}
      />
    </div>
  );
}
