import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts, useCategories, useBrands } from '../hooks/useElectronicsData';
import ScrollReveal from '../components/ScrollReveal';

export default function Products() {
  const { products, loading } = useProducts();
  const { categories } = useCategories();
  const { brands } = useBrands();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  const filteredProducts = products.filter(p => {
    const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || p.categoryId === selectedCategory;
    const matchesBrand = !selectedBrand || p.brandId === selectedBrand;
    return matchesSearch && matchesCategory && matchesBrand;
  });

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-text mb-2">All Products</h1>
          <p className="text-text-secondary">Browse our complete product catalog</p>
        </div>

        {/* Filters */}
        <div className="bg-surface rounded-xl p-6 mb-8 border border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
            >
              <option value="">All Brands</option>
              {brands.map(brand => (
                <option key={brand.id} value={brand.id}>{brand.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-text-secondary">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-secondary">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, idx) => (
              <ScrollReveal key={product.id} delay={idx * 0.05}>
                <Link
                  to={`/products/${product.slug}`}
                  className="group block bg-surface rounded-xl overflow-hidden hover:shadow-xl transition-all border border-border"
                >
                  <div className="aspect-square bg-background relative overflow-hidden">
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
        )}
      </div>
    </div>
  );
}
