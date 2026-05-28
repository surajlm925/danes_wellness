'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import products from '@/lib/products.json';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import Testimonials from '@/sections/Testimonials';
import Consultation from '@/sections/Consultation';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Extracts the numeric portion from either a plain ID string ("42")
 * or a Shopify GraphQL GID ("gid://shopify/ProductVariant/9876543210").
 */
function parseProductRef(id) {
  if (!id) return null;
  const str = String(id);
  // Shopify GID pattern — extract everything after the last '/'
  if (str.startsWith('gid://')) {
    const numeric = str.split('/').pop();
    return { display: numeric, full: str };
  }
  // Plain numeric id
  return { display: str, full: str };
}

/** Inline Ref badge with copy-to-clipboard */
function ProductRef({ id }) {
  const [copied, setCopied] = useState(false);
  const ref = parseProductRef(id);

  const handleCopy = useCallback(() => {
    if (!ref) return;
    navigator.clipboard.writeText(ref.full).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      // Fallback for non-HTTPS / older browsers
      const el = document.createElement('textarea');
      el.value = ref.full;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [ref]);

  if (!ref) return null;

  return (
    <button
      onClick={handleCopy}
      title="Click to copy product reference ID"
      className="group flex items-center gap-1.5 mb-4 cursor-pointer select-none"
      aria-label={`Copy product reference ID: ${ref.full}`}
    >
      <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--text)] opacity-40 font-bold transition-opacity group-hover:opacity-70">
        Ref:
      </span>
      <span className="text-[10px] tracking-wider font-mono text-[var(--text)] opacity-40 group-hover:opacity-70 transition-opacity">
        {ref.display}
      </span>
      <span
        className={`ml-1 text-[9px] uppercase tracking-wider font-bold transition-all duration-300 ${
          copied
            ? 'text-[#2d7a4f] dark:text-[#8fcea8] opacity-100'
            : 'text-[var(--accent)] opacity-0 group-hover:opacity-60'
        }`}
      >
        {copied ? '✓ Copied' : 'Copy'}
      </span>
    </button>
  );
}

const AccordionItem = ({ title, content, isOpen, onClick }) => {
  if (!content) return null;
  return (
    <div className="border-b border-[var(--border)]">
      <button 
        onClick={onClick} 
        className="w-full flex justify-between items-center py-4 text-left group"
      >
        <span className="font-semibold uppercase text-[10px] tracking-[0.2em] text-[var(--heading)] group-hover:opacity-80 transition-opacity">
          {title}
        </span>
        <svg 
          width="12" 
          height="12" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={`transition-transform duration-300 text-[var(--heading)] ${isOpen ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-xs text-[var(--text)] opacity-80 leading-relaxed max-w-[90%]">
              {content.split('|').map((p, i) => (
                <p key={i} className="mb-2 last:mb-0">{p.trim()}</p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ProductDetailClient({ product, handle }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState('details');

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  // Extract sizes from product description
  const sizes = useMemo(() => {
    if (!product) return null;
    const desc = product.shortDescription || '';
    const match = desc.match(/Available in ([^.]+)/i);
    if (match) {
      return match[1].split('&').map(s => s.trim().replace('and', '').trim());
    }
    if (desc.includes('6g/36g')) return ['6g', '36g'];
    if (desc.includes('10 ml & 30 ml') || product.longDescription?.includes('10 ml & 30 ml')) return ['10 ml', '30 ml'];
    if (desc.includes('5g')) return ['5g'];
    if (desc.includes('50g')) return ['50g'];
    if (desc.includes('100g')) return ['100g'];
    if (desc.includes('30ml') || desc.includes('30 ml')) return ['30 ml'];
    if (desc.includes('10ml') || desc.includes('10 ml')) return ['10 ml'];
    return null;
  }, [product]);

  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    if (sizes && sizes.length > 0) {
      setSelectedSize(sizes[0]);
    } else {
      setSelectedSize(null);
    }
    setQuantity(1);
    setOpenAccordion('details');
  }, [product, sizes]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F2F1E8] dark:bg-[var(--bg)] pt-40 text-center transition-colors duration-300">
        <h1 className="font-[var(--font-heading)] text-3xl mb-8">Product Not Found</h1>
        <Link href="/shop" className="text-[var(--heading)] underline font-bold uppercase tracking-widest text-xs">
          Back to Shop
        </Link>
      </div>
    );
  }

  const isRx = product.prescription === 'Rx' || product.requiresConsultation;

  // Mock pricing logic matching the design screenshot
  const getProductPrices = (p) => {
    if (p.price && p.price !== '') {
      return { price: p.price, originalPrice: p.originalPrice || null };
    }
    let price = 649;
    let originalPrice = 1200;
    if (p.slug?.includes('drops') || p.slug?.includes('oil') || p.slug?.includes('rx')) {
      price = 1499;
      originalPrice = 2499;
    } else if (p.slug?.includes('powder') || p.slug?.includes('protein')) {
      price = 999;
      originalPrice = 1799;
    } else if (p.slug?.includes('tea') || p.slug?.includes('blend')) {
      price = 649;
      originalPrice = 1200;
    } else if (p.slug?.includes('capsule')) {
      price = 899;
      originalPrice = 1499;
    } else if (p.slug?.includes('roll-on') || p.slug?.includes('balm')) {
      price = 499;
      originalPrice = 799;
    } else {
      price = 649;
      originalPrice = 1200;
    }
    return { price, originalPrice };
  };

  const { price: displayPrice, originalPrice } = getProductPrices(product);

  const accordions = [
    { id: 'details', label: 'Product Details', content: product.longDescription || product.shortDescription },
    { id: 'ingredients', label: 'Key Ingredients', content: product.keyIngredients },
    { id: 'howWorks', label: 'How it works', content: product.benefits },
    { id: 'howToUse', label: 'How to use', content: product.howToUse },
    { id: 'dosage', label: 'Dosage', content: isRx ? "To be consumed strictly under medical supervision. Fill dropper to prescribed dosage. Administer sublingually or as directed by your physician." : "Use 1-2 times daily or as needed. Follow directions on package." },
    { id: 'care', label: 'Care and precaution', content: "Keep out of reach of children. Store in a cool, dry place away from direct sunlight. Consult a physician before use if pregnant, lactating, or on medication." },
    { id: 'shelfLife', label: 'Shelf life', content: "Best before 24 months from the date of manufacture. Once opened, store securely." }
  ];

  // Dynamic Benefit Badges based on product tags/categories
  const getBenefitBadges = (p) => {
    const category = (p.category || p.pillar || '').toLowerCase();
    
    if (category.includes('calm') || category.includes('anxiety') || p.slug?.includes('calm') || p.slug?.includes('bliss')) {
      return [
        { name: 'Reduces stress & anxiety', icon: (
          <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/></>
        )},
        { name: 'Promotes mental calm', icon: (
          <><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></>
        )},
        { name: 'Supports restful sleep', icon: (
          <><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></>
        )},
        { name: 'Caffeine-free', icon: (
          <><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></>
        )},
        { name: 'Suitable for daily use', icon: (
          <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>
        )},
        { name: 'No side effects', icon: (
          <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v8M8 12h8"/></>
        )}
      ];
    }
  
    if (category.includes('sleep') || category.includes('rest') || p.slug?.includes('sleep')) {
      return [
        { name: 'Reduces sleep onset time', icon: (
          <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>
        )},
        { name: 'Supports restful sleep', icon: (
          <><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></>
        )},
        { name: 'Promotes mental calm', icon: (
          <><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></>
        )},
        { name: 'Non-habit-forming', icon: (
          <><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"/><path d="M8 12h8"/></>
        )},
        { name: 'Suitable for daily use', icon: (
          <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>
        )},
        { name: 'No side effects', icon: (
          <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v8M8 12h8"/></>
        )}
      ];
    }
  
    if (category.includes('pain') || p.slug?.includes('pain') || p.slug?.includes('combat') || p.slug?.includes('ease')) {
      return [
        { name: 'Relieves chronic pain', icon: (
          <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v8M8 12h8"/></>
        )},
        { name: 'Reduces muscle stiffness', icon: (
          <><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></>
        )},
        { name: 'Reduces inflammation', icon: (
          <><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 8v8M8 12h8"/></>
        )},
        { name: 'Fast acting relief', icon: (
          <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>
        )},
        { name: 'Suitable for daily use', icon: (
          <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>
        )},
        { name: 'No side effects', icon: (
          <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v8M8 12h8"/></>
        )}
      ];
    }
  
    // Default / Wellness / Tea
    return [
      { name: '100% Organic & Genuine', icon: (
        <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/></>
      )},
      { name: 'Ayush Licensed', icon: (
        <><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>
      )},
      { name: 'FSSAI Certified', icon: (
        <><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></>
      )},
      { name: 'Cruelty Free', icon: (
        <><path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9z"/></>
      )},
      { name: '100% Vegan', icon: (
        <><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></>
      )},
      { name: 'Gluten Free', icon: (
        <><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></>
      )}
    ];
  };

  const badges = getBenefitBadges(product);

  return (
    <div className="min-h-screen bg-[#F2F1E8] dark:bg-[var(--bg)] pt-32 pb-0 transition-colors duration-300 relative overflow-hidden">
      {/* Sun & Shivalingam Watermark Background Motif */}
      <div className="absolute right-[-5%] top-[10%] w-[450px] h-[450px] pointer-events-none select-none opacity-[0.03] text-evergreen dark:text-moss hidden lg:block z-0">
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

      <div className="absolute left-[-5%] bottom-[15%] w-[350px] h-[350px] pointer-events-none select-none opacity-[0.025] text-evergreen dark:text-moss hidden lg:block z-0">
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
      
      {/* Top Section */}
      <div className="container-danes px-4 md:px-8 max-w-[1400px] mx-auto mb-20">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-8 text-[9px] uppercase tracking-[0.2em] text-[var(--heading)] font-bold">
          <Link href="/" className="hover:opacity-70 transition-opacity">Home</Link>
          <span className="opacity-40">/</span>
          <Link href="/shop" className="hover:opacity-70 transition-opacity">Shop</Link>
          <span className="opacity-40">/</span>
          <span className="opacity-60 truncate">{product.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* LEFT COLUMN: Main Image & Gallery Grids (50%) */}
          <div className="lg:w-1/2 flex flex-col gap-6">
            
            {/* Main Product Image Container */}
            <div className="aspect-[4/5] bg-[#E8EAE6] dark:bg-[var(--bg-alt)] relative flex items-center justify-center p-8 border border-[var(--border)] overflow-hidden group transition-colors duration-300">
              {isRx && (
                <div className="absolute top-4 left-4 z-10 w-12 h-12 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-[#B81F25] fill-current drop-shadow-md">
                    <polygon points="50,0 60,15 78,12 82,28 98,35 90,50 98,65 82,72 78,88 60,85 50,100 40,85 22,88 18,72 2,65 10,50 2,35 18,28 22,12 40,15" />
                  </svg>
                  <span className="relative z-10 text-white text-[10px] font-bold font-[var(--font-heading)]">Rx</span>
                </div>
              )}
              {product.images?.catalogue ? (
                <img 
                  src={product.images.catalogue}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <span className="text-2xl font-[var(--font-heading)] text-[var(--heading)] opacity-50 uppercase tracking-widest">{product.brand}</span>
              )}
              
              {/* Expand Icon in bottom right */}
              <div className="absolute bottom-4 right-4 bg-white/80 dark:bg-black/50 p-2.5 rounded-full shadow-md backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[var(--heading)]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                </svg>
              </div>
            </div>
            
            {/* Infographics Gallery Grid (2 columns) - Fully visible, not thumbnails */}
            {product.images?.gallery && product.images.gallery.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {product.images.gallery.map((src, index) => (
                  <div
                    key={src + index}
                    className="aspect-square bg-[#E8EAE6] dark:bg-[var(--bg-alt)] relative overflow-hidden border border-[var(--border)] rounded-sm group/gallery transition-colors duration-300"
                  >
                    <img
                      src={src}
                      alt={`Infographic ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/gallery:scale-[1.03]"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Product Info details (50%) */}
          <div className="lg:w-1/2 flex flex-col pt-4">
            
            {/* Brand Title */}
            <div className="mb-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--heading)] opacity-70">
                {product.brand}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="font-[var(--font-heading)] text-3xl lg:text-4xl text-[var(--heading)] uppercase mb-2 leading-tight">
              {product.name}
            </h1>

            {/* Product Reference ID — for WhatsApp Bot lookups */}
            <ProductRef id={product.id} />

            {/* Consultation Banner for Rx products */}
            {isRx && (
              <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#C68B59] font-bold mb-4">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="16" x2="12" y2="12"/>
                  <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
                <span>Consultation required</span>
              </div>
            )}

            {/* Tagline / Subtext */}
            <p className="text-sm text-[var(--text)] font-medium leading-relaxed mb-4">
              {product.tagline}
            </p>

            {/* Short Description */}
            <p className="text-xs text-[var(--text)] leading-relaxed mb-6 opacity-80">
              {product.shortDescription}
            </p>

            {/* Pill Badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {product.category && (
                <span className="text-[9px] uppercase tracking-wider font-bold px-3.5 py-1.5 rounded-full bg-[#EAE8DD] dark:bg-[var(--bg-alt)] text-[#105232] dark:text-[var(--text)]">
                  {product.category}
                </span>
              )}
              {product.pillar && (
                <span className="text-[9px] uppercase tracking-wider font-bold px-3.5 py-1.5 rounded-full bg-[#FCE8E6] text-[#B81F25]">
                  For {product.pillar}
                </span>
              )}
            </div>

            {/* Size Selector */}
            {sizes && sizes.length > 0 && (
              <div className="mb-8">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--heading)] block mb-3">Select Size</span>
                <div className="flex flex-wrap gap-3">
                  {sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-4 py-2.5 text-[10px] uppercase tracking-widest font-semibold border transition-all ${
                        selectedSize === sz
                          ? 'bg-[#105232] dark:bg-[var(--heading)] border-[#105232] dark:border-[var(--heading)] text-white dark:text-[#0d1f14]'
                          : 'border-[#105232] dark:border-[var(--heading)] text-[#105232] dark:text-[var(--heading)] bg-transparent hover:bg-[#105232]/5 dark:hover:bg-[var(--heading)]/5'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                  {/* Out of Stock visual fallback badge */}
                  {sizes.length === 1 && (
                    <button
                      disabled
                      className="px-4 py-2.5 text-[10px] uppercase tracking-widest font-semibold border border-dashed border-gray-400 text-gray-400 bg-transparent cursor-not-allowed opacity-50"
                    >
                      Bulk Pack (Out of Stock)
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Price block */}
            <div className="mb-8 border-b border-[var(--border)] pb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-[var(--heading)]">₹{displayPrice}</span>
                {originalPrice && (
                  <span className="text-base text-gray-400 line-through">₹{originalPrice}</span>
                )}
              </div>
              <p className="text-[9px] text-[var(--text)] opacity-60 mt-1 uppercase tracking-wider font-bold">
                MRP incl. all taxes
              </p>
            </div>

            {/* Action buttons (Quantity, Add to Cart, Buy Now) */}
            <div className="flex flex-col sm:flex-row items-stretch gap-4 mb-12">
              <div className="flex border border-[#105232] dark:border-[var(--heading)] h-12 w-full sm:w-32 items-center justify-between px-4 bg-transparent select-none">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="text-[#105232] dark:text-[var(--heading)] text-lg font-light px-2 hover:opacity-70 transition-opacity"
                >
                  -
                </button>
                <span className="text-[#105232] dark:text-[var(--heading)] font-bold text-sm">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="text-[#105232] dark:text-[var(--heading)] text-lg font-light px-2 hover:opacity-70 transition-opacity"
                >
                  +
                </button>
              </div>
              
              <button
                onClick={() => addItem({ ...product, price: displayPrice, size: selectedSize, quantity, image: product.images?.catalogue })}
                className="flex-grow h-12 bg-[#105232] dark:bg-[var(--heading)] text-white dark:text-[#0d1f14] uppercase tracking-widest text-[10px] font-bold hover:bg-[#0a3822] dark:hover:bg-[#c9d4c2] transition-colors"
              >
                Add to Cart
              </button>
              
              <button
                onClick={() => {
                  addItem({ ...product, price: displayPrice, size: selectedSize, quantity, image: product.images?.catalogue });
                  window.location.href = '/cart';
                }}
                className="flex-grow h-12 border border-[#105232] dark:border-[var(--heading)] text-[#105232] dark:text-[var(--heading)] bg-transparent uppercase tracking-widest text-[10px] font-bold hover:bg-[#105232]/5 dark:hover:bg-[var(--heading)]/5 transition-colors"
              >
                Buy Now
              </button>
            </div>

            {/* Benefit Icons Grid (3 columns, 2 rows) */}
            <div className="grid grid-cols-3 gap-y-8 gap-x-4 mb-12 border-b border-[var(--border)] pb-12">
              {badges.map((badge, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[var(--heading)]" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {badge.icon}
                  </svg>
                  <span className="text-[9px] uppercase tracking-wider text-[var(--text)] font-bold leading-normal px-1">
                    {badge.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Accordions */}
            <div className="flex flex-col mb-12">
              {accordions.map(acc => (
                <AccordionItem 
                  key={acc.id} 
                  title={acc.label} 
                  content={acc.content}
                  isOpen={openAccordion === acc.id}
                  onClick={() => setOpenAccordion(openAccordion === acc.id ? null : acc.id)}
                />
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Testimonials Block */}
      <div className="bg-[#105232] py-20">
        <Testimonials />
      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <div className="bg-[#F2F1E8] dark:bg-[var(--bg)] py-20 border-b border-[var(--border)] transition-colors duration-300">
          <div className="container-danes px-4 md:px-8 max-w-[1400px] mx-auto">
            <h2 className="text-center font-[var(--font-heading)] text-sm tracking-[0.3em] uppercase text-[var(--heading)] mb-12 opacity-80 font-bold">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={"rel-" + p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Consultation Banner Block (featuring Doctor photo slide deck) */}
      <Consultation />

    </div>
  );
}
