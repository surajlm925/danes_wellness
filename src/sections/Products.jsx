'use client'
import React, { useEffect, useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import products from '@/lib/products.json';

// Subcomponent to handle hover state for each product card
const ChosenProductCard = ({ p }) => {
  const [hovered, setHovered] = useState(false);
  const catalogueSrc = p.images?.catalogue;
  const hoverSrc = p.images?.hover;
  const displaySrc = hovered && hoverSrc ? hoverSrc : catalogueSrc;

  return (
    <Link
      href={`/shop/${p.slug}`}
      className="chosen-product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="chosen-product-img" style={{ minHeight: '200px' }}>
        {displaySrc ? (
          <Image
            src={displaySrc}
            alt={p.name}
            fill
            style={{ objectFit: 'contain', mixBlendMode: 'multiply' }}
            sizes="(max-width: 640px) 100vw, 20vw"
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: 'rgba(16,82,50,0.08)',
            borderRadius: '4px'
          }} />
        )}
      </div>
      <div className="chosen-product-info">
        <p className="cat">{p.category || p.pillar}</p>
        <h3 className="pname">{p.name}</h3>
      </div>
    </Link>
  );
};

export default function Products() {
  const sectionRef = useRef(null);
  const [profile, setProfile] = useState('Sleep & Stress');

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          section.querySelectorAll('.vector-reveal-el').forEach(el => el.classList.add('vector-revealed'));
          section.querySelectorAll('.prod-reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('prod-visible'), i * 120);
          });
          observer.unobserve(section);
        }
      });
    }, { threshold: 0.15 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Algorithm: Filter products based on profile keywords
  const displayProducts = useMemo(() => {
    let keywords = [];
    if (profile === 'Sleep & Stress') keywords = ['Sleep', 'Rest', 'Calm', 'Stress', 'Anxiety'];
    if (profile === 'Focus & Energy') keywords = ['Clarity', 'Focus', 'Cognitive', 'Vitality', 'Energy'];
    if (profile === 'Immunity & Gut') keywords = ['Immunity', 'Digestive', 'Gut', 'Recovery'];
    
    const matched = products
      .filter(p => p.images && p.images.catalogue)
      .filter(p => {
        const cat = p.category?.toLowerCase() || '';
        const name = p.name.toLowerCase();
        const pil = p.pillar?.toLowerCase() || '';
        return keywords.some(k => {
          const kl = k.toLowerCase();
          return cat.includes(kl) || name.includes(kl) || pil.includes(kl);
        });
      });
    
    // Fallback if not enough matches to fill up to 10
    if (matched.length < 10) {
      const more = products.filter(p => p.images && p.images.catalogue && !matched.includes(p));
      return [...matched, ...more].slice(0, 10);
    }
    return matched.slice(0, 10);
  }, [profile]);

  return (
    <section
      id="products"
      ref={sectionRef}
      style={{
        background: '#D8E0D1',
        color: '#105232',
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <style>{`
        .prod-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.75s ease, transform 0.75s ease;
        }
        .prod-reveal.prod-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .profile-btn {
          background: transparent;
          border: 1px solid rgba(16,82,50,0.3);
          color: #105232;
          padding: 10px 24px;
          border-radius: 30px;
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
        }
        .profile-btn.active, .profile-btn:hover {
          background: #105232;
          color: #D8E0D1;
          border-color: #105232;
        }
        
        .chosen-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .chosen-product-card {
          border: 1px solid rgba(16,82,50,0.2);
          padding: 1.5rem 1rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 380px;
          background-color: #D8E0D1;
          transition: all 0.4s ease;
          text-decoration: none;
          color: #105232;
          border-radius: 8px;
        }
        .chosen-product-card:hover {
          border-color: #105232;
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(16,82,50,0.1);
        }
        .chosen-product-img {
          flex-grow: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          position: relative;
        }
        .chosen-product-info .cat {
          font-family: var(--font-body);
          font-size: 9px;
          letter-spacing: 1.5px;
          margin-bottom: 8px;
          font-weight: 600;
          opacity: 0.8;
          text-transform: uppercase;
        }
        .chosen-product-info .pname {
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 500;
          line-height: 1.4;
          letter-spacing: 0.5px;
          text-transform: none;
        }
        @media (max-width: 1200px) {
          .chosen-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .chosen-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .chosen-grid { grid-template-columns: 1fr; }
          .profile-buttons { flex-direction: column; align-items: center; }
        }
      `}</style>

      {/* Background vector4 */}
      <img
        src="/assets/vector4.svg"
        className="vector-reveal-el"
        alt=""
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '980px', height: 'auto',
          zIndex: 1, pointerEvents: 'none', opacity: 0.4
        }}
      />

      <div className="container-danes px-4" style={{ position: 'relative', zIndex: 2 }}>
        <p className="prod-reveal" style={{
          textAlign: 'center',
          fontFamily: 'var(--font-body)', fontWeight: 600,
          fontSize: '11px', letterSpacing: '0.22em',
          textTransform: 'uppercase', color: '#105232',
          marginBottom: '30px'
        }}>
          TAILORED FOR YOUR PROFILE
        </p>
        
        <div className="prod-reveal profile-buttons" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          marginBottom: '60px'
        }}>
          {['Sleep & Stress', 'Focus & Energy', 'Immunity & Gut'].map(p => (
            <button 
              key={p} 
              className={`profile-btn ${profile === p ? 'active' : ''}`}
              onClick={() => setProfile(p)}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="chosen-grid">
          {displayProducts.map((p, i) => (
            <ChosenProductCard key={p.slug + i + profile} p={p} />
          ))}
        </div>

        <div className="prod-reveal" style={{ textAlign: 'center', marginTop: '60px' }}>
          <Link href="/shop" style={{
            color: '#105232', fontFamily: 'var(--font-body)',
            fontWeight: 600, fontSize: '11px', letterSpacing: '0.18em',
            textTransform: 'uppercase', borderBottom: '1px solid rgba(16,82,50,0.3)',
            paddingBottom: '4px', textDecoration: 'none',
            transition: 'border-color 0.3s ease'
          }}>
            VIEW ALL PRODUCTS →
          </Link>
        </div>
      </div>
    </section>
  );
}
