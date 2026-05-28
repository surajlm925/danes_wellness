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
      style={{ background: '#D8E0D1', padding: '140px 0', color: '#105232' }}
    >
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
