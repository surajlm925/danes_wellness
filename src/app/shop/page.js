'use client';

import React, { useState, useMemo, useEffect } from 'react';
import products from '@/lib/products.json';
import ProductCard from '@/components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

const PRODUCTS_PER_PAGE = 24;

const BRANDS = [...new Set(
  products.map((p) => p.brand).filter(Boolean)
)].sort();

const CATEGORIES = [...new Set(
  products.map((p) => p.category).filter(Boolean)
)].sort();

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (product.category || '').toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);

      return matchesSearch && matchesCategory && matchesBrand;
    });
  }, [searchQuery, selectedCategory, selectedBrands]);

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedBrands([]);
    setVisibleCount(PRODUCTS_PER_PAGE);
  };

  useEffect(() => {
    setVisibleCount(PRODUCTS_PER_PAGE);
  }, [selectedCategory, selectedBrands, searchQuery]);

  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  return (
    <div className="min-h-screen bg-[var(--bg)] pt-24 pb-20">
      <div className="container-danes">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* LEFT SIDEBAR */}
          <aside className="lg:w-64 flex-shrink-0">
            <div 
              className="sticky top-32 space-y-10 scrollbar-thin scrollbar-thumb-[var(--bg-dark)] scrollbar-track-transparent"
              style={{ maxHeight: 'calc(100vh - 140px)', overflowY: 'auto' }}
            >
              
              {/* Category Filter */}
              <div>
                <h3 className="font-[var(--font-heading)] text-xs uppercase tracking-widest text-[var(--bg-dark)] mb-6 pb-2 border-b border-[var(--border)]">
                  Shop by Category
                </h3>
                <ul className="space-y-3">
                  {['All', ...CATEGORIES].map((category) => (
                    <li key={category}>
                      <button
                        onClick={() => setSelectedCategory(category)}
                        className={`text-sm tracking-wide transition-all duration-300 ${
                          selectedCategory === category 
                            ? 'text-[var(--accent)] font-bold pl-2 border-l-2 border-[var(--accent)]' 
                            : 'text-[var(--text-muted)] hover:text-[var(--bg-dark)] pl-0'
                        }`}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Brands Filter */}
              <div>
                <h3 className="font-[var(--font-heading)] text-xs uppercase tracking-widest text-[var(--bg-dark)] mb-6 pb-2 border-b border-[var(--border)]">
                  Filter by Brand
                </h3>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                  {BRANDS.map((brand) => (
                    <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative w-4 h-4 border border-[var(--bg-dark)] flex-shrink-0 transition-colors group-hover:border-[var(--accent)]">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                        />
                        {selectedBrands.includes(brand) && (
                          <div className="absolute inset-0.5 bg-[var(--bg-dark)]" />
                        )}
                      </div>
                      <span className={`text-sm transition-colors ${
                        selectedBrands.includes(brand) ? 'text-[var(--bg-dark)] font-medium' : 'text-[var(--text-muted)] group-hover:text-[var(--bg-dark)]'
                      }`}>
                        {brand}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Reset */}
              <button
                onClick={resetFilters}
                className="w-full py-3 border border-[var(--bg-dark)] text-[var(--bg-dark)] text-[10px] uppercase tracking-widest font-bold hover:bg-[var(--bg-dark)] hover:text-white transition-all duration-300"
              >
                Reset All Filters
              </button>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-grow">
            
            {/* Top Bar: Search & Title */}
            <div className="mb-12 space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--border)] pb-8">
                <div>
                  <h1 className="font-[var(--font-heading)] text-4xl lg:text-5xl text-[var(--bg-dark)] uppercase tracking-tight">
                    Wellness <span className="text-[var(--accent)]">Shop</span>
                  </h1>
                  <p className="text-[var(--text-muted)] mt-2 text-sm tracking-wide">
                    {selectedCategory === 'All' 
                      ? 'Browse our complete collection of natural curatives.' 
                      : `Exploring our ${selectedCategory} solutions.`}
                  </p>
                </div>

                <div className="relative md:w-80">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-[var(--border)] py-3 px-4 text-sm focus:outline-none focus:border-[var(--bg-dark)] transition-colors"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Active Filters Display */}
              {(selectedCategory !== 'All' || selectedBrands.length > 0 || searchQuery) && (
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold mr-2">Filtering by:</span>
                  {selectedCategory !== 'All' && (
                    <span className="bg-[var(--bg-dark)] text-white text-[10px] py-1 px-3 rounded-full flex items-center gap-2">
                      {selectedCategory}
                      <button onClick={() => setSelectedCategory('All')}>×</button>
                    </span>
                  )}
                  {selectedBrands.map((brand) => (
                    <span key={brand} className="bg-[var(--bg-alt)] text-[var(--bg-dark)] text-[10px] py-1 px-3 rounded-full flex items-center gap-2">
                      {brand}
                      <button onClick={() => toggleBrand(brand)}>×</button>
                    </span>
                  ))}

                  {searchQuery && (
                    <span className="border border-[var(--bg-dark)] text-[var(--bg-dark)] text-[10px] py-1 px-3 rounded-full flex items-center gap-2">
                      "{searchQuery}"
                      <button onClick={() => setSearchQuery('')}>×</button>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </AnimatePresence>
            </div>

            {/* Load More Button */}
            {visibleCount < filteredProducts.length && (
              <div className="mt-20 flex justify-center">
                <button
                  onClick={() => setVisibleCount(prev => prev + PRODUCTS_PER_PAGE)}
                  className="px-10 py-3 border border-[var(--bg-dark)] text-[var(--bg-dark)] font-[var(--font-body)] font-medium uppercase tracking-[0.2em] text-xs hover:bg-[var(--bg-dark)] hover:text-[var(--bg)] transition-all duration-500"
                >
                  Load More Products
                </button>
              </div>
            )}

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="py-20 text-center">
                <h3 className="font-[var(--font-heading)] text-2xl text-[var(--text-muted)] mb-4">No products found</h3>
                <p className="text-[var(--text-muted)] opacity-60">Try adjusting your search or filters.</p>
                <button 
                  onClick={resetFilters}
                  className="mt-8 text-[var(--bg-dark)] underline underline-offset-4 font-bold tracking-widest text-xs uppercase"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>

        </div>
      </div>

      <style jsx global>{`
        /* Local custom scrollbar for sidebar if needed */
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--bg-dark);
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}
