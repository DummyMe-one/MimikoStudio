import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import type { Product } from '../types/electronics';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.mrp && product.sellingPrice 
    ? Math.round(((product.mrp - product.sellingPrice) / product.mrp) * 100)
    : 0;

  return (
    <Link
      to={`/products/${product.slug}`}
      className="product-card group block"
    >
      <div className="product-card-image">
        <img
          src={product.images?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&q=80'}
          alt={product.name}
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.newArrival && (
            <span className="badge badge-success">NEW</span>
          )}
          {product.popular && (
            <span className="badge badge-accent">POPULAR</span>
          )}
          {discount > 0 && (
            <span className="badge badge-danger">{discount}% OFF</span>
          )}
        </div>
      </div>

      <div className="p-4">
        {/* Brand */}
        <p className="text-xs text-text-secondary font-semibold mb-1 uppercase tracking-wide">
          {product.brand?.name || 'Brand'}
        </p>

        {/* Product Name */}
        <h3 className="font-semibold text-text mb-2 line-clamp-2 group-hover:text-primary transition-colors text-sm">
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating > 0 && (
          <div className="flex items-center gap-1 mb-3">
            <Star size={14} className="fill-accent text-accent" />
            <span className="text-sm font-semibold text-text">{product.rating}</span>
            <span className="text-xs text-text-secondary">(Reviews)</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="price text-lg">
            ₹{(product.sellingPrice || 0).toLocaleString()}
          </span>
          {product.mrp && product.mrp > (product.sellingPrice || 0) && (
            <span className="price-original text-sm">
              ₹{product.mrp.toLocaleString()}
            </span>
          )}
        </div>

        {/* Availability */}
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${
              product.availability === 'IN_STOCK' ? 'bg-success' : 'bg-danger'
            }`} />
            <span className="text-xs font-semibold text-text-secondary">
              {product.availability === 'IN_STOCK' ? 'In Stock' : product.availability}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
