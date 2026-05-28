'use client'
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function PillarGrid() {
  const [hovered, setHovered] = React.useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          section.querySelectorAll('.vector-reveal-el').forEach(el => {
            el.classList.add('vector-revealed');
          });
          section.querySelectorAll('.pillar-reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('pillar-visible'), i * 80);
          });
          observer.unobserve(section);
        }
      });
    }, { threshold: 0.15 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const pillars = [
    { name: "CALM",     href: "/shop?category=Calm",     desc: "Nervous system, stress, anxiety" },
    { name: "REST",     href: "/shop?category=Rest",      desc: "Sleep, circadian rhythm, insomnia" },
    { name: "CLARITY",  href: "/shop?category=Clarity",   desc: "Focus, cognitive function, brain fog" },
    { name: "PAIN",     href: "/shop?category=Pain",      desc: "Inflammation, joint pain, recovery" },
    { name: "VITALITY", href: "/shop?category=Vitality",  desc: "Energy, performance, recovery" },
    { name: "HORMONAL BALANCE", href: "/shop?category=Hormonal+Balance", desc: "PMS, PCOS, perimenopause" },
    { name: "IMMUNITY", href: "/shop?category=Immunity",  desc: "Immune resilience, post-viral recovery" },
    { name: "DIGESTION", href: "/shop?category=Digestive+Balance", desc: "Gut health, IBS, absorption" },
    { name: "LONGEVITY", href: "/shop?category=Longevity", desc: "Cellular ageing, metabolic health" },
    { name: "VIEW ALL", href: "/shop",                    desc: "10+ categories" }
  ];

  return (
    <section
      id="concerns"
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
        /* Vector reveal animation */
        .vector-reveal-el {
          clip-path: inset(0 0 100% 0);
          transition: clip-path 4s cubic-bezier(0.19, 1, 0.22, 1);
          will-change: clip-path;
        }
        .vector-reveal-el.vector-revealed {
          clip-path: inset(0 0 0% 0);
        }

        /* Pillar card reveal */
        .pillar-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .pillar-reveal.pillar-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Pillar card styles */
        .danes-concern-card {
          background: #105232;
          color: #D8E0D1;
          flex: 1;
          min-width: 180px;
          padding: 2.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          min-height: 250px;
          cursor: pointer;
          transition: transform 0.3s ease;
          text-decoration: none;
        }
        .danes-concern-card:hover {
          transform: translateY(-5px);
        }
        .danes-concern-card h3 {
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 1px;
          margin-bottom: 1rem;
          text-transform: uppercase;
          color: #D8E0D1;
        }
        .danes-concern-card p {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 400;
          line-height: 1.6;
          opacity: 0.7;
          color: #D8E0D1;
        }
        .danes-concern-card .view-link {
          margin-top: auto;
          color: #D8E0D1;
          text-decoration: none;
          font-size: 11px;
          font-family: var(--font-body);
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          opacity: 0.7;
          transition: opacity 0.3s ease;
          padding-top: 24px;
        }
        .danes-concern-card:hover .view-link { opacity: 1; }
        .danes-concern-card:hover h3, .danes-concern-card:hover p { opacity: 1; }

        @media (max-width: 900px) {
          .pillar-cards-container {
            flex-direction: row !important;
            flex-wrap: nowrap !important;
            overflow-x: auto;
            justify-content: flex-start !important;
            gap: 12px !important;
            padding: 1rem 0 2rem;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .pillar-cards-container::-webkit-scrollbar { display: none; }
          .danes-concern-card { min-width: 240px; flex: 0 0 auto; }
          .pillar-vector-bg { display: none !important; }
        }
      `}</style>

      {/* Vector Background — two layered SVGs like the reference */}
      <div className="pillar-vector-bg" style={{
        position: 'absolute', top: '-25px',
        left: '50%', transform: 'translateX(-50%)',
        width: '980px', maxWidth: '100vw',
        zIndex: 0, pointerEvents: 'none'
      }}>
        <img
          src="/assets/vector1_inverted.svg"
          className="vector-reveal-el"
          alt=""
          style={{ width: '100%', height: 'auto', display: 'block', position: 'relative', bottom: '212px' }}
        />
        <img
          src="/assets/vector1.svg"
          className="vector-reveal-el"
          alt=""
          style={{ width: '100%', height: 'auto', display: 'block', position: 'absolute', top: '389px', left: 0 }}
        />
      </div>

      {/* Section Header */}
      <div className="container-danes" style={{ position: 'relative', zIndex: 10 }}>
        <div className="pillar-reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <img
            src="/assets/brand_icon1_evergreen.svg"
            alt="Danes Icon"
            style={{ width: '40px', height: 'auto', marginBottom: '0.5rem', display: 'block', margin: '0 auto 0.5rem' }}
          />
          <p style={{
            fontFamily: 'var(--font-body)', fontWeight: 500,
            fontSize: '12px', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: '#105232'
          }}>
            SHOP BY CONCERN
          </p>
        </div>

        {/* Cards */}
        <div className="pillar-cards-container" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
          position: 'relative', zIndex: 10
        }}>
          {pillars.map((p, i) => (
            <Link
              key={i}
              href={p.href}
              className={`danes-concern-card pillar-reveal`}
            >
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <span className="view-link">
                View <span style={{ fontSize: '16px' }}>→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
