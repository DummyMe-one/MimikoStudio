import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag } from 'lucide-react';
import type { Product } from '../types/electronics';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.mrp && product.sellingPrice 
    ? Math.round(((product.mrp - product.sellingPrice) / product.mrp) * 100)
    : 0;

  const primaryImage = product.images?.find(img => img.isPrimary)?.imageUrl 
    || product.images?.[0]?.imageUrl 
    || 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&q=80';

  return (
    <Link
      to={`/products/${product.slug}`}
      className="product-card group block"
    >
      {/* Image Container */}
      <div className="product-card-image">
        <img src={primaryImage} alt={product.name} />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {product.newArrival && (
            <span className="badge badge-success">NEW</span>
          )}
          {product.popular && (
            <span className="badge badge-accent">POPULAR</span>
          )}
          {discount > 0 && (
            <span className="badge badge-sale">{discount}% OFF</span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <button 
            onClick={(e) => { e.preventDefault(); }}
            className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-soft hover:bg-brand hover:text-white transition-colors"
            aria-label="Add to wishlist"
          >
            <Heart size={16} />
          </button>
          <button 
            onClick={(e) => { e.preventDefault(); }}
            className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-soft hover:bg-brand hover:text-white transition-colors"
            aria-label="Quick view"
          >
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Brand */}
        {product.brand?.name && (
          <p className="text-xs text-text-muted font-semibold mb-1.5 uppercase tracking-wider">
            {product.brand.name}
          </p>
        )}

        {/* Product Name */}
        <h3 className="font-semibold text-text mb-2 line-clamp-2 group-hover:text-brand transition-colors text-sm leading-snug min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating > 0 && (
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map(i => (
                <Star 
                  key={i} 
                  size={12} 
                  className={i <= Math.round(product.rating) ? 'fill-accent text-accent' : 'text-border'} 
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-text">{product.rating.toFixed(1)}</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 flex-wrap mb-3">
          {product.priceDisplayMode === 'SHOW_PRICE' && product.sellingPrice ? (
            <>
              <span className="price">
                ₹{product.sellingPrice.toLocaleString()}
              </span>
              {product.mrp && product.mrp > product.sellingPrice && (
                <span className="price-original">
                  ₹{product.mrp.toLocaleString()}
                </span>
              )}
            </>
          ) : (
            <span className="text-sm font-semibold text-brand">Contact for Price</span>
          )}
        </div>

        {/* Availability */}
        <div className="pt-3 border-t border-border-soft">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${
              product.availability === 'IN_STOCK' ? 'bg-success' : 
              product.availability === 'COMING_SOON' ? 'bg-accent' : 'bg-sale'
            }`} />
            <span className="text-xs font-semibold text-text-muted">
              {product.availability === 'IN_STOCK' ? 'In Stock' : 
               product.availability === 'COMING_SOON' ? 'Coming Soon' :
               product.availability === 'ON_REQUEST' ? 'On Request' : 
               'Out of Stock'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
