'use client';

import React, { useState, useMemo } from 'react';
import products from '@/lib/products.json';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

const renderPipedField = (text) => {
  if (!text) return null;
  const items = text.split('|').map(item => item.trim()).filter(Boolean);
  if (items.length <= 1) return <p className="text-lg leading-relaxed text-[var(--text)] opacity-80">{text}</p>;
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="mb-4 flex gap-4">
          <span className="text-[var(--accent)] flex-shrink-0 mt-1">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </span>
          <span className="text-lg leading-relaxed text-[var(--text)] opacity-80">{item}</span>
        </div>
      ))}
    </ul>
  );
};

export default function ProductDetailClient({ product, handle }) {
  const [activeTab, setActiveTab] = useState('longDescription');
  const { addItem } = useCart();

  const [activeImage, setActiveImage] = useState(
    product?.images?.catalogue || null
  );

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[var(--bg)] pt-40 text-center">
        <h1 className="font-[var(--font-heading)] text-3xl mb-8">Product Not Found</h1>
        <Link href="/shop" className="text-[var(--bg-dark)] underline font-bold uppercase tracking-widest text-xs">
          Back to Shop
        </Link>
      </div>
    );
  }

  const isRx = product.prescription === 'Rx' || product.requiresConsultation;

  const tabs = [
    { id: 'longDescription', label: 'How It Works', content: product.longDescription },
    { id: 'keyIngredients', label: 'Key Ingredients', content: product.keyIngredients },
    { id: 'howToUse', label: 'How to Use', content: product.howToUse },
    { id: 'benefits', label: 'Benefits', content: product.benefits },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] pt-24 pb-20">
      <div className="container-danes">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-4 mb-12">
          <Link href="/shop" className="group flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--bg-dark)] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span className="text-[10px] uppercase tracking-widest font-bold">Shop</span>
          </Link>
          <span className="text-[var(--text-muted)] opacity-30">/</span>
          <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--bg-dark)] opacity-40 truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-24">
          
          {/* LEFT: Image Section (55%) */}
          <div className="lg:w-[55%] space-y-4">
            <div className="aspect-[4/5] bg-[var(--bg-dark)] overflow-hidden relative border border-[var(--border)]">
              {activeImage ? (
                <img 
                  src={activeImage}
                  alt={product.name}
                  onError={(e) => { e.target.style.display = 'none'; }}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div style={{
                  background: '#105232',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%'
                }}>
                  <span style={{
                    color: '#D8E0D1',
                    fontSize: '24px',
                    fontFamily: 'Jost',
                    textAlign: 'center',
                    padding: '32px'
                  }}>
                    {product.brand}
                  </span>
                </div>
              )}
              {isRx && (
                <div className="absolute top-6 left-6 bg-[var(--accent)] text-white text-[10px] uppercase tracking-widest font-bold py-2 px-4 shadow-lg">
                  Consultation Required
                </div>
              )}
            </div>

            {/* Gallery Thumbnail Strip */}
            {product.images?.gallery?.length > 0 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {/* Catalogue thumbnail first */}
                {product.images?.catalogue && (
                  <button
                    onClick={() => setActiveImage(product.images.catalogue)}
                    className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-all ${
                      activeImage === product.images.catalogue
                        ? 'border-[#105232]'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={product.images.catalogue}
                      alt="Main"
                      className="w-full h-full object-cover"
                    />
                  </button>
                )}
                {/* Gallery thumbnails */}
                {product.images.gallery.map((src, index) => (
                  <button
                    key={src}
                    onClick={() => setActiveImage(src)}
                    className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-all ${
                      activeImage === src
                        ? 'border-[#105232]'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={src}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Detail Section (45%) */}
          <div className="lg:w-[45%] flex flex-col pt-4">
            <div className="space-y-2 mb-6">
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[var(--text-muted)]">
                {product.brand}
              </span>
              {product.category && (
                <div className="inline-block px-3 py-1 bg-[var(--bg-alt)] text-[var(--bg-dark)] text-[10px] uppercase tracking-widest font-bold rounded-full">
                  {product.category}
                </div>
              )}
            </div>

            <h1 className="font-[var(--font-heading)] text-4xl lg:text-5xl text-[var(--bg-dark)] uppercase leading-tight mb-4">
              {product.name}
            </h1>

            <p className="text-2xl text-[var(--bg-dark)] font-medium mb-4">
              {product.price ? `₹${product.price}` : <span className="text-xl opacity-60 italic">Price on request</span>}
            </p>

            <p className="text-[var(--text)] italic text-lg leading-relaxed mb-8 opacity-80 font-light border-l-2 border-[var(--accent)] pl-6 py-2">
              "{product.tagline}"
            </p>

            <div className="space-y-8 mb-12">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--text-muted)] block mb-2">Overview</span>
                <p className="text-[var(--text)] leading-relaxed opacity-70">
                  {product.shortDescription}
                </p>
              </div>
            </div>

            {isRx && (
              <div className="bg-[rgba(196,146,42,0.1)] border border-[var(--accent)] p-4 mb-8 flex gap-4 items-center">
                <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center flex-shrink-0 text-white">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
                <p className="text-xs text-[var(--accent)] font-bold uppercase tracking-wider leading-relaxed">
                  Requires doctor consultation before delivery. Our in-house doctors will call you post-purchase.
                </p>
              </div>
            )}

            <button
              onClick={() => addItem({ ...product, image: activeImage })}
              className="w-full bg-[var(--bg-dark)] text-white py-5 px-8 font-[var(--font-heading)] uppercase tracking-[0.2em] text-sm hover:bg-[var(--accent)] transition-all duration-500 transform hover:scale-[1.01] active:scale-[0.99] shadow-xl hover:shadow-[var(--accent)]/20"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* TABS SECTION */}
        <section className="border-t border-[var(--border)] pt-20 mb-32">
          <div className="flex flex-wrap gap-8 lg:gap-16 mb-12 justify-center lg:justify-start">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-[10px] uppercase tracking-[0.3em] font-bold pb-2 border-b-2 transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'text-[var(--bg-dark)] border-[var(--bg-dark)]' 
                    : 'text-[var(--text-muted)] border-transparent hover:text-[var(--bg-dark)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="max-w-4xl">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {renderPipedField(tabs.find(t => t.id === activeTab)?.content) || (
                <p className="text-lg leading-relaxed text-[var(--text)] opacity-80">Information coming soon.</p>
              )}
            </motion.div>
          </div>
        </section>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <section className="pt-20 border-t border-[var(--border)]">
            <div className="flex justify-between items-end mb-12">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[var(--text-muted)] block mb-2">Continue Exploring</span>
                <h2 className="font-[var(--font-heading)] text-3xl text-[var(--bg-dark)] uppercase">Related Curatives</h2>
              </div>
              <Link href="/shop" className="text-[10px] uppercase tracking-widest font-bold text-[var(--bg-dark)] underline underline-offset-8 hover:text-[var(--accent)] transition-colors">
                View All
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
