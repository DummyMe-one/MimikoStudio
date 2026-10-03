import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useElectronicsData';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Phone, MessageCircle } from 'lucide-react';
import EnquiryModal from '../components/EnquiryModal';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { products, loading } = useProducts();
  const [activeImage, setActiveImage] = useState(0);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const product = products.find(p => p.slug === slug);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
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

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="aspect-square bg-surface rounded-xl overflow-hidden mb-4">
              <img src={images[activeImage]?.imageUrl} alt={images[activeImage]?.altText || product.name} className="w-full h-full object-cover" />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, idx) => (
                  <button key={idx} onClick={() => setActiveImage(idx)} className={`aspect-square rounded-lg overflow-hidden border-2 ${idx === activeImage ? 'border-primary' : 'border-border'}`}>
                    <img src={img.imageUrl} alt={img.altText || ''} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <p className="text-sm text-text-secondary font-medium mb-2">{product.brand?.name}</p>
            <h1 className="text-3xl lg:text-4xl font-bold text-text mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} size={18} className={i <= (product.rating || 4) ? 'fill-accent text-accent' : 'text-border'} />
                ))}
              </div>
              <span className="text-text-secondary text-sm">({product.rating || 4.0})</span>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-primary">₹{(product.sellingPrice || 0).toLocaleString()}</span>
                {product.mrp && product.mrp > (product.sellingPrice || 0) && (
                  <>
                    <span className="text-xl text-text-secondary line-through">₹{product.mrp.toLocaleString()}</span>
                    <span className="bg-success/10 text-success px-3 py-1 rounded-full text-sm font-semibold">
                      {Math.round(((product.mrp - (product.sellingPrice || 0)) / product.mrp) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {product.shortDescription && (
              <p className="text-text-secondary mb-6">{product.shortDescription}</p>
            )}

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-sm">
                <span className={`w-2 h-2 rounded-full ${product.availability === 'IN_STOCK' ? 'bg-success' : 'bg-danger'}`} />
                <span className="text-text">{product.availability === 'IN_STOCK' ? 'In Stock' : product.availability}</span>
              </div>
              {product.warranty && (
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-text-secondary">Warranty:</span>
                  <span className="text-text font-medium">{product.warranty}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => setIsEnquiryOpen(true)} className="flex-1 bg-primary text-white py-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2">
                <MessageCircle size={20} />
                Enquire Now
              </button>
              <a href="tel:+919876543210" className="flex-1 bg-surface border-2 border-primary text-primary py-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2">
                <Phone size={20} />
                Call Us
              </a>
            </div>
          </div>
        </div>

        {/* Specifications */}
        {product.specifications && product.specifications.length > 0 && (
          <div className="mt-12 bg-surface rounded-xl p-6 border border-border">
            <h2 className="text-2xl font-bold text-text mb-6">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.specifications.map((spec, idx) => (
                <div key={idx} className="flex justify-between py-3 border-b border-border">
                  <span className="text-text-secondary">{spec.attribute?.name}</span>
                  <span className="text-text font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
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
