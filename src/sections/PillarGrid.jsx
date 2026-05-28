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
    { name: "CALM",     href: "/shop?category=Calm",     desc: "Nervous system, stress, anxiety", icon: "meditation.png" },
    { name: "SLEEP",    href: "/shop?category=Sleep",    desc: "Sleep, circadian rhythm, insomnia", icon: "sleep-face.png" },
    { name: "CLARITY",  href: "/shop?category=Clarity",   desc: "Focus, cognitive function, brain fog", icon: "moon-cloud.png" },
    { name: "PAIN",     href: "/shop?category=Pain",      desc: "Inflammation, joint pain, recovery", icon: "head-massage.png" },
    { name: "VITALITY", href: "/shop?category=Vitality",  desc: "Energy, performance, recovery", icon: "lotus.png" },
    { name: "HORMONES", href: "/shop?category=Hormones",  desc: "PMS, PCOS, perimenopause", icon: "heart-hands.png" },
    { name: "IMMUNITY", href: "/shop?category=Immunity",  desc: "Immune resilience, post-viral recovery", icon: "bottle-mat.png" },
    { name: "DIGESTION", href: "/shop?category=Digestion", desc: "Gut health, IBS, absorption", icon: "towel.png" },
    { name: "LONGEVITY", href: "/shop?category=Longevity", desc: "Cellular ageing, metabolic health", icon: "candle.png" },
    { name: "VIEW ALL", href: "/shop",                    desc: "10+ categories", icon: "diffuser.png" }
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
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          text-decoration: none;
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        /* Shine effect */
        .danes-concern-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%);
          transform: skewX(-25deg);
          transition: all 0.6s ease;
        }
        .danes-concern-card:hover::after {
          animation: shine 1s;
        }
        @keyframes shine {
          100% { left: 200%; }
        }

        /* Hover Color Change */
        .danes-concern-card:hover {
          transform: translateY(-8px);
          background: #186f44;
          box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        }

        .danes-concern-card h3 {
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1px;
          margin-bottom: 1rem;
          text-transform: uppercase;
          color: #D8E0D1;
          position: relative;
          z-index: 2;
        }
        .danes-concern-card p {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 400;
          line-height: 1.6;
          opacity: 0.8;
          color: #D8E0D1;
          position: relative;
          z-index: 2;
        }
        .danes-concern-card .icon-wrapper {
          margin-bottom: 1.5rem;
          width: 40px;
          height: 40px;
          position: relative;
          z-index: 2;
          transition: transform 0.3s ease;
          filter: brightness(0) invert(1) opacity(0.8);
        }
        .danes-concern-card:hover .icon-wrapper {
          transform: scale(1.1);
          filter: brightness(0) invert(1) opacity(1);
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
          position: relative;
          z-index: 2;
          font-weight: 500;
        }
        .danes-concern-card:hover .view-link { opacity: 1; }

        @media (max-width: 900px) {
          .pillar-cards-container {
            flex-direction: row !important;
            flex-wrap: nowrap !important;
            overflow-x: auto;
            justify-content: flex-start !important;
            gap: 16px !important;
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
            fontFamily: 'var(--font-body)', fontWeight: 600,
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
              <div className="icon-wrapper">
                <Image src={`/assets/icons-img/${p.icon}`} alt={p.name} fill style={{objectFit: 'contain'}} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
              </div>
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
