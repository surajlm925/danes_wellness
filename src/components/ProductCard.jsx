'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';
import { getImageByHandle } from '@/lib/imageMap';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const isRx = product.prescription === 'Rx' || product.requiresConsultation;
  const imgSrc = getImageByHandle(product.handle);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{ willChange: 'transform' }}
      className="group relative flex flex-col bg-white overflow-hidden border border-[var(--border)] hover:shadow-xl transition-all duration-500"
    >
      {/* Rx Badge */}
      {isRx && (
        <div className="absolute top-4 left-4 z-10 bg-[var(--accent)] text-white text-[10px] uppercase tracking-widest font-bold py-1 px-2">
          Consultation Required
        </div>
      )}

      {/* Image Section */}
      <Link href={`/shop/${product.handle}`} className="relative block aspect-[4/5] bg-[var(--bg-dark)] overflow-hidden">
        {imgSrc ? (
          <img 
            src={imgSrc || '/images/placeholder.jpg'} 
            alt={product.name} 
            loading="lazy"
            onError={(e) => { e.target.style.display = 'none'; }}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div style={{background: '#105232', display:'flex', alignItems:'center', justifyContent:'center', width:'100%', height:'100%'}}>
            <span style={{color:'#D8E0D1', fontSize:'12px', fontFamily:'Jost', textAlign:'center', padding:'16px'}}>
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
            {product.pillar}
          </span>
        </div>

        <Link href={`/shop/${product.handle}`}>
          <h3 className="font-[var(--font-heading)] text-xl text-[var(--bg-dark)] mb-2 group-hover:text-[var(--accent)] transition-colors line-clamp-2 uppercase">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <p className="text-lg font-medium text-[var(--text)]">
            {product.price ? `₹${product.price}` : <span className="text-sm opacity-60 italic">Price on Consultation</span>}
          </p>
          
          <button
            onClick={() => addItem({ ...product, image: imgSrc })}
            className="bg-[var(--bg-dark)] text-white text-[10px] uppercase tracking-widest font-bold py-3 px-6 hover:bg-[var(--accent)] transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}
