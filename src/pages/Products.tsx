import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { useProducts, useCategories, useBrands } from '../hooks/useElectronicsData';
import ProductCard from '../components/ProductCard';
import ScrollReveal from '../components/ScrollReveal';

export default function Products() {
  const { products, loading } = useProducts();
  const { categories } = useCategories();
  const { brands } = useBrands();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products.filter(p => {
    const matchesSearch = !searchQuery || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand?.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || p.categoryId === selectedCategory;
    const matchesBrand = !selectedBrand || p.brandId === selectedBrand;
    return matchesSearch && matchesCategory && matchesBrand;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedBrand('');
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedBrand;

  return (
    <div className="bg-background min-h-screen">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-text mb-2">All Products</h1>
          <p className="text-text-secondary">Browse our complete product catalog</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl p-4 lg:p-6 mb-8 border border-border shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                placeholder="Search products, brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-12"
              />
            </div>

            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden btn btn-secondary"
            >
              <Filter size={18} />
              Filters
            </button>

            {/* Filters (Desktop) */}
            <div className={`${showFilters ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row gap-4`}>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input lg:w-48"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>

              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="input lg:w-48"
              >
                <option value="">All Brands</option>
                {brands.map(brand => (
                  <option key={brand.id} value={brand.id}>{brand.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                {searchQuery && (
                  <span className="badge badge-primary flex items-center gap-2">
                    Search: {searchQuery}
                    <button onClick={() => setSearchQuery('')} className="hover:bg-white/20 rounded-full p-0.5">
                      <X size={12} />
                    </button>
                  </span>
                )}
                {selectedCategory && (
                  <span className="badge badge-primary flex items-center gap-2">
                    Category: {categories.find(c => c.id === selectedCategory)?.name}
                    <button onClick={() => setSelectedCategory('')} className="hover:bg-white/20 rounded-full p-0.5">
                      <X size={12} />
                    </button>
                  </span>
                )}
                {selectedBrand && (
                  <span className="badge badge-primary flex items-center gap-2">
                    Brand: {brands.find(b => b.id === selectedBrand)?.name}
                    <button onClick={() => setSelectedBrand('')} className="hover:bg-white/20 rounded-full p-0.5">
                      <X size={12} />
                    </button>
                  </span>
                )}
              </div>
              <button
                onClick={clearFilters}
                className="text-sm text-primary font-semibold hover:underline"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-text-secondary">
            Showing <span className="font-semibold text-text">{filteredProducts.length}</span> products
          </p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-text-secondary mt-4">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-border">
            <p className="text-text-secondary text-lg">No products found</p>
            <p className="text-text-secondary text-sm mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, idx) => (
              <ScrollReveal key={product.id} delay={idx * 0.05}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
