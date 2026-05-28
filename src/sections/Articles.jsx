'use client'
import React, { useEffect, useRef } from 'react';

const articles = [
  { tag: "INGREDIENT GUIDE",  title: "Lion's Mane: From Buddhist Monasteries to Modern Neuroscience" },
  { tag: "SYSTEM EXPLAINER",  title: "The Endocannabinoid System: What Your Doctor Didn't Tell You" },
  { tag: "WELLNESS JOURNEY",  title: "For Rest: Why Most Sleep Problems Aren't Sleep Problems" },
];

export default function Articles() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          section.querySelectorAll('.art-reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('art-visible'), i * 120);
          });
          observer.unobserve(section);
        }
      });
    }, { threshold: 0.15 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="articles"
      ref={sectionRef}
      style={{ 
        background: '#D8E0D1', 
        backgroundImage: 'radial-gradient(rgba(16,82,50,0.12) 1.5px, transparent 0)',
        backgroundSize: '24px 24px',
        padding: '140px 0', 
        color: '#105232',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative premium line art background */}
      <div 
        className="absolute right-[-10%] top-[-10%] w-[450px] h-[450px] pointer-events-none opacity-[0.08] text-evergreen select-none hidden md:block"
        style={{ zIndex: 0 }}
      >
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.5" className="w-full h-full">
          <circle cx="100" cy="100" r="90" />
          <circle cx="100" cy="100" r="70" />
          <circle cx="100" cy="100" r="50" />
          <circle cx="100" cy="100" r="30" />
          <line x1="10" y1="100" x2="190" y2="100" />
          <line x1="100" y1="10" x2="100" y2="190" />
          <line x1="36" y1="36" x2="164" y2="164" />
          <line x1="164" y1="36" x2="36" y2="164" />
        </svg>
      </div>
      
      <div 
        className="absolute left-[-5%] bottom-[-5%] w-[300px] h-[300px] pointer-events-none opacity-[0.08] text-evergreen select-none hidden md:block"
        style={{ zIndex: 0 }}
      >
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.5" className="w-full h-full">
          <circle cx="100" cy="100" r="80" />
          <circle cx="100" cy="100" r="40" />
          <line x1="20" y1="100" x2="180" y2="100" />
          <line x1="100" y1="20" x2="100" y2="180" />
        </svg>
      </div>

      <style>{`
        .art-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .art-reveal.art-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .art-system-card {
          background: rgba(16,82,50,0.05);
          padding: 4rem 3rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          min-height: 350px;
          transition: background 0.4s ease, transform 0.4s ease;
          cursor: pointer;
          text-decoration: none;
          color: #105232;
        }
        .art-system-card:hover {
          background: rgba(16,82,50,0.09);
          transform: translateY(-5px);
        }
        .art-card-cat {
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 2rem;
          font-weight: 500;
          opacity: 0.7;
        }
        .art-card-title {
          font-family: var(--font-body);
          font-size: 20px;
          line-height: 1.5;
          font-weight: 400;
          max-width: 280px;
        }
        @media (max-width: 1000px) {
          .art-grid { grid-template-columns: 1fr !important; }
          .art-system-card { min-height: 250px; padding: 3rem 2rem; }
        }
      `}</style>

      <div className="container-danes">
        {/* Title row */}
        <div className="art-reveal" style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontFamily: '"Copperplate", "Cinzel", serif',
            fontSize: 'clamp(18px, 2vw, 22px)',
            letterSpacing: '0.05em', lineHeight: 1.5,
            maxWidth: '450px', fontWeight: 400
          }}>
            ANCIENT SYSTEMS, REFINED FOR MODERN LIFE.
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="art-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: '2rem'
        }}>
          {articles.map((a, i) => (
            <a key={i} href="#" className={`art-system-card art-reveal`}>
              <p className="art-card-cat">{a.tag}</p>
              <h3 className="art-card-title">{a.title}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
