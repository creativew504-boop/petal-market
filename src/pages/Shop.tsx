import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';

const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest' },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const activeCategory = searchParams.get('category') || '';
  const [sort, setSort] = useState('default');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);

  const filtered = useMemo(() => {
    let result = [...products];
    if (activeCategory) result = result.filter((p) => p.category === activeCategory);
    if (searchParams.get('filter') === 'deals') result = result.filter((p) => p.discount);
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
    }
    return result;
  }, [activeCategory, sort, priceRange, searchParams]);

  const setCategory = (cat: string) => {
    const params = new URLSearchParams(searchParams);
    if (cat) params.set('category', cat); else params.delete('category');
    params.delete('filter');
    setSearchParams(params);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold">
          {activeCategory ? categories.find((c) => c.id === activeCategory)?.name || 'Shop' : 'All Products'}
        </h1>
        <p className="text-muted-foreground mt-1">{filtered.length} products found</p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters - Desktop */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-6">
          <div>
            <h3 className="font-display font-semibold mb-3">Categories</h3>
            <div className="space-y-1">
              <button
                onClick={() => setCategory('')}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  !activeCategory ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-secondary'
                }`}
              >
                All Products
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeCategory === cat.id ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-secondary'
                  }`}
                >
                  <span>{cat.icon}</span> {cat.name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display font-semibold mb-3">Price Range</h3>
            <input
              type="range"
              min={0}
              max={50}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>$0</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6 gap-3">
            {/* Category pills - mobile */}
            <div className="flex gap-2 overflow-x-auto scrollbar-none flex-1 lg:hidden">
              <button
                onClick={() => setCategory('')}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                  !activeCategory ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                    activeCategory === cat.id ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                  }`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="lg:hidden p-2.5 rounded-lg bg-secondary hover:bg-muted transition-colors"
              >
                <SlidersHorizontal className="h-4 w-4" />
              </button>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-secondary rounded-lg px-3 py-2.5 text-sm outline-none"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {activeCategory && (
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs text-muted-foreground">Filtered by:</span>
              <button
                onClick={() => setCategory('')}
                className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full"
              >
                {categories.find((c) => c.id === activeCategory)?.name}
                <X className="h-3 w-3" />
              </button>
            </div>
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="font-display text-lg font-medium">No products found</p>
              <p className="text-sm mt-1">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
