'use client'
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import products from '@/lib/products.json';

// Pick 4 featured products with images
const FEATURED = products.filter(p => p.images && p.images.catalogue).slice(0, 4);

export default function Products() {
  const sectionRef = useRef(null);

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

  const displayProducts = FEATURED.length >= 4 ? FEATURED : products.slice(0, 4);

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
        .chosen-product-card {
          border: 1px solid rgba(16,82,50,0.2);
          padding: 2.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 480px;
          background-color: #D8E0D1;
          transition: border-color 0.4s ease;
          text-decoration: none;
          color: #105232;
        }
        .chosen-product-card:hover {
          border-color: #105232;
        }
        .chosen-product-img {
          flex-grow: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
          position: relative;
        }
        .chosen-product-info .cat {
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 1.5px;
          margin-bottom: 8px;
          font-weight: 500;
          opacity: 0.8;
          text-transform: uppercase;
        }
        .chosen-product-info .pname {
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 400;
          line-height: 1.4;
          letter-spacing: 0.5px;
          text-transform: none;
        }
        @media (max-width: 1100px) {
          .chosen-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 600px) {
          .chosen-grid { grid-template-columns: 1fr !important; }
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

      <div className="container-danes" style={{ position: 'relative', zIndex: 2 }}>
        <p className="prod-reveal" style={{
          textAlign: 'center',
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: '11px', letterSpacing: '0.22em',
          textTransform: 'uppercase', color: '#105232',
          marginBottom: '80px'
        }}>
          CHOSEN FOR A REASON
        </p>

        <div className="chosen-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: '1.5rem'
        }}>
          {displayProducts.map((p, i) => (
            <Link
              key={i}
              href={`/shop/${p.slug}`}
              className={`chosen-product-card prod-reveal`}
            >
              <div className="chosen-product-img" style={{ minHeight: '250px' }}>
                {p.images && p.images.catalogue ? (
                  <Image
                    src={p.images.catalogue}
                    alt={p.name}
                    fill
                    style={{ objectFit: 'contain', mixBlendMode: 'multiply' }}
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                ) : (
                  <div style={{
                    width: '120px', height: '200px',
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
          ))}
        </div>

        <div className="prod-reveal" style={{ textAlign: 'center', marginTop: '60px' }}>
          <Link href="/shop" style={{
            color: '#105232', fontFamily: 'var(--font-body)',
            fontWeight: 500, fontSize: '11px', letterSpacing: '0.18em',
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
