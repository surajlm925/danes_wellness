'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import products from '@/lib/products.json';
import ProductCard from '@/components/ProductCard';
import Testimonials from '@/sections/Testimonials';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const PRODUCTS_PER_PAGE = 24;

const BRANDS = [...new Set(
  products.map((p) => p.brand).filter(Boolean)
)].sort();

const CONCERNS = ['Calm', 'Sleep', 'Clarity', 'Pain', 'Vitality', 'Hormones', 'Immunity', 'Digestion', 'Longevity'];

function getProductConcerns(product) {
  const concerns = [];
  const text = `${product.name} ${product.category || ''} ${product.benefits || ''} ${product.shortDescription || ''} ${product.longDescription || ''}`.toLowerCase();
  
  if (text.includes('sleep') || text.includes('insomnia') || text.includes('restful') || text.includes('nighttime') || /\brest\b/i.test(text)) {
    concerns.push('Sleep');
  }
  if (text.includes('anxiety') || text.includes('calm') || text.includes('stress') || text.includes('panic') || text.includes('depression') || text.includes('psychiatric')) {
    concerns.push('Calm');
  }
  if (text.includes('pain') || text.includes('neurological') || text.includes('muscle') || text.includes('joint') || text.includes('arthritis') || text.includes('stiffness') || text.includes('sprain') || text.includes('ache') || text.includes('recovery')) {
    concerns.push('Pain');
  }
  if (text.includes('hormon') || text.includes('menstrual') || text.includes('pms') || text.includes('pcos') || text.includes('menopause') || text.includes('period') || text.includes('women')) {
    concerns.push('Hormones');
  }
  if (text.includes('digest') || text.includes('gut') || text.includes('bloating') || text.includes('ibs') || text.includes('constipation') || text.includes('stomach') || text.includes('gas')) {
    concerns.push('Digestion');
  }
  if (text.includes('immun') || text.includes('resilience') || text.includes('infection') || text.includes('flu') || text.includes('vitamin c') || text.includes('antioxidant')) {
    concerns.push('Immunity');
  }
  if (text.includes('vitality') || text.includes('desire') || text.includes('sexual') || text.includes('libido') || text.includes('stamina') || text.includes('energ') || text.includes('power')) {
    concerns.push('Vitality');
  }
  if (text.includes('longevity') || text.includes('ageing') || text.includes('aging') || text.includes('cellular') || text.includes('heart') || text.includes('cardio') || text.includes('pressure') || text.includes('liver') || text.includes('antioxidant')) {
    concerns.push('Longevity');
  }
  if (text.includes('brain') || text.includes('focus') || text.includes('clarity') || text.includes('memory') || text.includes('cognit') || text.includes('attention')) {
    concerns.push('Clarity');
  }
  
  return concerns;
}

function ShopContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);



  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      let concernVal = cat.trim();
      if (concernVal.toLowerCase().includes('hormon')) concernVal = 'Hormones';
      if (concernVal.toLowerCase().includes('digest')) concernVal = 'Digestion';
      if (concernVal.toLowerCase().includes('rest')) concernVal = 'Sleep';
      
      const capitalized = concernVal.charAt(0).toUpperCase() + concernVal.slice(1).toLowerCase();
      if (CONCERNS.includes(capitalized)) {
        setSelectedCategories([capitalized]);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const query = searchParams.get('q');
    setSearchQuery(query || '');
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (product.category || '').toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      
      const productConcerns = getProductConcerns(product);
      const matchesCategory = selectedCategories.length === 0 || 
                              selectedCategories.some(cat => productConcerns.includes(cat));

      return matchesSearch && matchesCategory && matchesBrand;
    });
  }, [searchQuery, selectedBrands, selectedCategories]);

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleCategory = (cat) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedBrands([]);
    setSelectedCategories([]);
    setVisibleCount(PRODUCTS_PER_PAGE);
  };

  useEffect(() => {
    setVisibleCount(PRODUCTS_PER_PAGE);
  }, [selectedBrands, selectedCategories, searchQuery]);

  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  return (
    <div className="min-h-screen bg-[#E8EAE6] dark:bg-[var(--bg)] pt-32 pb-0 transition-colors duration-300 relative overflow-hidden" style={{ scrollbarGutter: 'stable' }}>
      {/* Sun & Shivalingam Watermark Background Motif */}
      <div className="absolute right-[-5%] top-[15%] w-[450px] h-[450px] pointer-events-none select-none opacity-[0.035] text-evergreen dark:text-moss hidden lg:block z-0">
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.4" className="w-full h-full">
          {/* Minimalist Sun */}
          <circle cx="100" cy="50" r="18" />
          <line x1="100" y1="20" x2="100" y2="28" />
          <line x1="100" y1="72" x2="100" y2="80" />
          <line x1="70" y1="50" x2="78" y2="50" />
          <line x1="122" y1="50" x2="130" y2="50" />
          <line x1="79" y1="29" x2="85" y2="35" />
          <line x1="121" y1="71" x2="115" y2="65" />
          <line x1="121" y1="29" x2="115" y2="35" />
          <line x1="79" y1="71" x2="85" y2="65" />

          {/* Minimalist Shivalingam */}
          <path d="M92,130 C92,108 108,108 108,130" />
          <path d="M78,130 C78,137 122,137 122,130 L132,130 C137,130 137,135 132,137 L118,143 C113,145 105,145 100,145 L90,145 C80,145 72,138 78,130" />
          <path d="M86,143 L82,155 L118,155 L114,143" />
        </svg>
      </div>

      <div className="absolute left-[-5%] bottom-[10%] w-[350px] h-[350px] pointer-events-none select-none opacity-[0.03] text-evergreen dark:text-moss hidden lg:block z-0">
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.4" className="w-full h-full">
          {/* Minimalist Sun */}
          <circle cx="100" cy="50" r="18" />
          <line x1="100" y1="20" x2="100" y2="28" />
          <line x1="100" y1="72" x2="100" y2="80" />
          <line x1="70" y1="50" x2="78" y2="50" />
          <line x1="122" y1="50" x2="130" y2="50" />

          {/* Minimalist Shivalingam */}
          <path d="M92,130 C92,108 108,108 108,130" />
          <path d="M78,130 C78,137 122,137 122,130 L132,130 C137,130 137,135 132,137 L118,143 C113,145 105,145 100,145 L90,145 C80,145 72,138 78,130" />
          <path d="M86,143 L82,155 L118,155 L114,143" />
        </svg>
      </div>

      <div className="container-danes px-4 md:px-8 max-w-[1400px] mx-auto mb-20">
        
        {/* Page Header */}
        <div className="mb-12 border-b border-[var(--border)] pb-4">
          <h1 className="font-[var(--font-heading)] text-3xl md:text-4xl text-[var(--heading)] uppercase tracking-widest">
            ALL PRODUCTS
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* LEFT SIDEBAR (Filters) */}
          <aside className="lg:w-64 flex-shrink-0 lg:sticky lg:top-32 max-h-[calc(100vh-160px)] overflow-hidden hover:overflow-y-auto overscroll-y-contain pr-4 shop-sidebar select-none">
            <div className="space-y-8">
              <h3 className="font-[var(--font-heading)] font-bold text-lg text-[var(--heading)] mb-4">Filter by</h3>

              {/* Brands (Labeled 'Category' in design) */}
              <div className="bg-[#DDE2D8] dark:bg-[var(--bg-alt)] p-4 rounded-sm transition-colors duration-300">
                <div className="flex justify-between items-center mb-4 cursor-pointer text-[var(--heading)]">
                  <span className="font-[var(--font-heading)] text-sm uppercase tracking-wider">Category</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                </div>
                <div className="space-y-3">
                  {BRANDS.map((brand) => (
                    <label 
                      key={brand} 
                      onClick={() => toggleBrand(brand)}
                      className="flex items-center gap-3 cursor-pointer group select-none"
                    >
                      <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${selectedBrands.includes(brand) ? 'bg-[var(--bg-dark)] dark:bg-[var(--heading)] border-[var(--bg-dark)] dark:border-[var(--heading)]' : 'border-[var(--heading)] bg-transparent'}`}>
                        {selectedBrands.includes(brand) && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white dark:text-[#0d1f14]" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                        )}
                      </div>
                      <span className="text-sm text-[var(--text)]">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Concern */}
              <div className="bg-transparent border border-[#DDE2D8] dark:border-[var(--border)] p-4 rounded-sm transition-colors duration-300">
                <div className="flex justify-between items-center cursor-pointer text-[var(--heading)]">
                  <span className="font-[var(--font-heading)] text-sm uppercase tracking-wider">Concern</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                </div>
                {/* Simplified Concern Dropdown content */}
                <div className="mt-4 space-y-3 max-h-48 overflow-hidden hover:overflow-y-auto pr-1 concern-scroll">
                  {CONCERNS.map((cat) => (
                    <label 
                      key={cat} 
                      onClick={() => toggleCategory(cat)}
                      className="flex items-center gap-3 cursor-pointer group select-none"
                    >
                      <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${selectedCategories.includes(cat) ? 'bg-[var(--bg-dark)] dark:bg-[var(--heading)] border-[var(--bg-dark)] dark:border-[var(--heading)]' : 'border-[var(--heading)] bg-transparent'}`}>
                        {selectedCategories.includes(cat) && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white dark:text-[#0d1f14]" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                        )}
                      </div>
                      <span className="text-xs text-[var(--text)]">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>


              {/* Reset */}
              {(selectedBrands.length > 0 || selectedCategories.length > 0 || searchQuery) && (
                <button
                  onClick={resetFilters}
                  className="w-full py-2 text-[var(--heading)] text-xs uppercase underline tracking-widest font-bold"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-grow">
            {/* Grid Layout with Banner injection */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {visibleProducts.map((product, idx) => {
                  return (
                    <React.Fragment key={product.id}>
                      <ProductCard product={product} />
                      
                      {/* Inject promotional banner after 6 items (2 rows) if there are more products */}
                      {idx === 5 && visibleProducts.length > 6 && (
                        <div className="col-span-full my-8 bg-[#4A3B2C] text-[#E8EAE6] flex flex-col md:flex-row items-center justify-between p-8 md:p-12 overflow-hidden relative">
                          <div className="relative z-10 max-w-md">
                            <h2 className="text-4xl md:text-5xl font-[var(--font-heading)] uppercase mb-2">60% OFF</h2>
                            <h3 className="text-xl md:text-2xl font-[var(--font-heading)] uppercase mb-4 tracking-wider">Full Spectrum CBD Oil</h3>
                            <p className="text-sm tracking-widest uppercase opacity-80 mb-6">Oral | Nutrition / Fitness</p>
                            <Link href="/shop/vijaya-ambrosia-rx" className="inline-block border border-[#E8EAE6] py-2 px-6 uppercase text-sm tracking-widest hover:bg-[#E8EAE6] hover:text-[#4A3B2C] transition-colors">
                              Shop now →
                            </Link>
                          </div>
                          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-40 mix-blend-overlay hidden md:block">
                            <Image src="/images/products/cannazo/vijaya-ambrosia-rx/catalogue.webp" alt="CBD Oil" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Pagination / Load More */}
            {visibleCount < filteredProducts.length && (
              <div className="mt-16 flex justify-center items-center gap-2">
                <button className="px-3 py-1 text-sm text-[var(--text)] opacity-50 hover:opacity-100">Prev</button>
                <span className="w-8 h-8 flex items-center justify-center bg-[var(--bg-dark)] dark:bg-[var(--heading)] text-white dark:text-[#0d1f14] text-sm rounded-sm font-bold">1</span>
                <span className="w-8 h-8 flex items-center justify-center text-[var(--text)] text-sm">2</span>
                <span className="w-8 h-8 flex items-center justify-center text-[var(--text)] text-sm">3</span>
                <span className="text-[var(--text)]">...</span>
                <button
                  onClick={() => setVisibleCount(prev => prev + PRODUCTS_PER_PAGE)}
                  className="px-3 py-1 text-sm text-[var(--text)] font-bold hover:underline"
                >
                  Next
                </button>
              </div>
            )}

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="py-20 text-center">
                <h3 className="font-[var(--font-heading)] text-2xl text-[var(--text-muted)] mb-4">No products found</h3>
                <button onClick={resetFilters} className="mt-4 text-[var(--heading)] underline underline-offset-4 font-bold tracking-widest text-xs uppercase">
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Testimonials Block */}
      <div className="bg-[var(--bg-dark)] mt-20 py-20">
        <Testimonials />
      </div>

      {/* Related Products Mock */}
      <div className="bg-[#E8EAE6] dark:bg-[var(--bg)] py-20 transition-colors duration-300">
        <div className="container-danes px-4 md:px-8 max-w-[1400px] mx-auto">
          <h2 className="text-center font-[var(--font-heading)] text-xl tracking-[0.2em] uppercase text-[var(--heading)] mb-12">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map(product => (
              <ProductCard key={"rel-" + product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#E8EAE6] dark:bg-[var(--bg)] pt-40 text-center text-[var(--text)] font-body tracking-widest uppercase">
        Loading Curatives...
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
