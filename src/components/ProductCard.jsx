'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [hovered, setHovered] = useState(false);
  const isRx = product.prescription === 'Rx' || product.requiresConsultation;

  const catalogueSrc = product.images?.catalogue;
  const hoverSrc = product.images?.hover;
  const displaySrc = hovered && hoverSrc ? hoverSrc : catalogueSrc;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{ willChange: 'transform' }}
      className="group relative flex flex-col bg-white overflow-hidden border border-[var(--border)] hover:shadow-xl transition-all duration-500"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Rx Badge */}
      {isRx && (
        <div className="absolute top-4 left-4 z-10 bg-[var(--accent)] text-white text-[10px] uppercase tracking-widest font-bold py-1 px-2">
          Consultation Required
        </div>
      )}

      {/* Image Section */}
      <Link href={`/shop/${product.slug}`} className="relative block aspect-[4/5] bg-[var(--bg-dark)] overflow-hidden">
        {displaySrc ? (
          <img
            src={displaySrc}
            alt={product.name}
            loading="lazy"
            onError={(e) => { e.target.style.display = 'none'; }}
            className="w-full h-full object-cover transition-all duration-500"
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
              fontSize: '12px',
              fontFamily: 'Jost',
              textAlign: 'center',
              padding: '16px'
            }}>
              {product.brand}
            </span>
          </div>
        )}
      </Link>

      {/* Info Section */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[var(--text-muted)]">
            {product.brand}
          </span>
          <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 bg-[var(--bg-alt)] text-[var(--bg-dark)] rounded-full">
            {product.category}
          </span>
        </div>

        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-[var(--font-heading)] text-xl text-[var(--bg-dark)] mb-2 group-hover:text-[var(--accent)] transition-colors line-clamp-2 uppercase">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <p className="text-lg font-medium text-[var(--text)]">
            {product.price ? `₹${product.price}` : <span className="text-sm opacity-60 italic">Price on request</span>}
          </p>
          
          <button
            onClick={() => addItem({ ...product, image: displaySrc })}
            className="bg-[var(--bg-dark)] text-white text-[10px] uppercase tracking-widest font-bold py-3 px-6 hover:bg-[var(--accent)] transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}
