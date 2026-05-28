'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [hovered, setHovered] = useState(false);
  const isRx = product.prescription === 'Rx' || product.requiresConsultation;

  const getProductPrices = (p) => {
    if (p.price && p.price !== "") {
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

  const catalogueSrc = product.images?.catalogue;
  const hoverSrc = product.images?.hover;
  const displaySrc = hovered && hoverSrc ? hoverSrc : catalogueSrc;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{ willChange: 'transform' }}
      className="group relative flex flex-col overflow-hidden transition-all duration-500 bg-transparent"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Section */}
      <Link href={`/shop/${product.slug}`} className="relative block aspect-square bg-[#E8EAE6] dark:bg-[var(--bg-alt)] overflow-hidden transition-colors duration-300">
        {/* Rx Badge */}
        {isRx && (
          <div className="absolute top-3 left-3 z-10 w-8 h-8 flex items-center justify-center">
            {/* SVG Starburst Background */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-[#B81F25] fill-current drop-shadow-md">
              <polygon points="50,0 60,15 78,12 82,28 98,35 90,50 98,65 82,72 78,88 60,85 50,100 40,85 22,88 18,72 2,65 10,50 2,35 18,28 22,12 40,15" />
            </svg>
            <span className="relative z-10 text-white text-[10px] font-bold font-[var(--font-heading)]">Rx</span>
          </div>
        )}
        {displaySrc ? (
          <img
            src={displaySrc}
            alt={product.name}
            loading="lazy"
            onError={(e) => { e.target.style.display = 'none'; }}
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-[var(--text)] opacity-50 font-[var(--font-heading)] text-xs uppercase tracking-widest">
            {product.brand}
          </div>
        )}
      </Link>

      {/* Info Section */}
      <div className="pt-4 flex flex-col flex-grow">
        <div className="mb-1">
          <span className="text-[10px] text-[var(--text-muted)] tracking-wider">
            {product.category || product.pillar}
          </span>
        </div>

        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-[var(--font-heading)] text-lg text-[var(--heading)] mb-1 group-hover:text-[var(--accent)] transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-base font-bold text-[var(--text)]">₹{displayPrice}</span>
          {originalPrice && (
            <span className="text-xs text-gray-500 line-through">₹{originalPrice}</span>
          )}
        </div>

        <button
          onClick={() => addItem({ ...product, image: displaySrc })}
          className="w-full bg-[var(--bg-dark)] dark:bg-[var(--heading)] text-white dark:text-[#0d1f14] text-xs tracking-wider py-3 px-4 hover:bg-[var(--accent)] dark:hover:bg-[#c9d4c2] transition-colors duration-300 mt-auto"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
