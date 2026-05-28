'use client'
import React, { useEffect, useRef } from 'react';

export default function BrandStatement() {
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
          section.querySelectorAll('.bs-reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('bs-visible'), i * 150);
          });
          observer.unobserve(section);
        }
      });
    }, { threshold: 0.2 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      style={{
        background: '#105232',
        color: '#D8E0D1',
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden',
        height: '670px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <style>{`
        .bs-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .bs-reveal.bs-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .bs-learn-link {
          color: #D8E0D1;
          text-decoration: none;
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 500;
          text-transform: uppercase;
          border-bottom: 1px solid rgba(216,224,209,0.4);
          padding-bottom: 6px;
          transition: border-color 0.3s ease;
          display: inline-block;
          letter-spacing: 0.5px;
        }
        .bs-learn-link:hover { border-bottom-color: #D8E0D1; }

        /* Animations */
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0) translateX(-50%); }
          50% { transform: translateY(-10px) translateX(-50%); }
        }
        @keyframes pulseRotate {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(5deg) scale(1.05); }
          100% { transform: rotate(0deg) scale(1); }
        }
        
        .animated-sunburst {
          animation: pulseRotate 6s ease-in-out infinite;
          transform-origin: center;
        }
        .floating-arch {
          animation: floatSlow 8s ease-in-out infinite;
        }
        
        @media (max-width: 900px) {
          .bs-vectors { opacity: 0.6; }
        }
      `}</style>

      {/* Decorative Vectors — left, center, right */}
      <div className="bs-vectors" style={{
        position: 'absolute', bottom: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0
      }}>
        <img
          src="/assets/vector3_left.svg"
          className="vector-reveal-el"
          alt=""
          style={{
            position: 'absolute', left: 0, bottom: '-10px',
            width: '35%', maxWidth: '600px', height: 'auto', zIndex: 3,
            transition: 'clip-path 3s ease'
          }}
        />
        <img
          src="/assets/vector2.svg"
          className="vector-reveal-el floating-arch"
          alt=""
          style={{
            position: 'absolute', left: '50%', bottom: 0,
            transform: 'translateX(-50%)',
            width: '980px', height: 'auto', zIndex: 2,
            transition: 'clip-path 2.5s cubic-bezier(0.19,1,0.22,1) !important'
          }}
        />
        <img
          src="/assets/vector3_right.svg"
          className="vector-reveal-el"
          alt=""
          style={{
            position: 'absolute', right: 0, bottom: '-10px',
            width: '35%', maxWidth: '600px', height: 'auto', zIndex: 3,
            transition: 'clip-path 3s ease'
          }}
        />
      </div>

      {/* Content */}
      <div className="container-danes" style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '950px' }}>
        <div className="bs-reveal" style={{ marginBottom: '2.5rem' }}>
          <img
            src="/assets/brand_icon_3rd.svg"
            alt="Danes Brand Icon"
            className="animated-sunburst"
            style={{ width: '52px', height: 'auto', display: 'block', margin: '0 auto' }}
          />
        </div>
        <h2 className="bs-reveal" style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 400,
          letterSpacing: '0.07em',
          textTransform: 'uppercase',
          lineHeight: 1.3,
          marginBottom: '2rem',
          color: '#D8E0D1'
        }}>
          ANCIENT SYSTEMS, REFINED FOR MODERN LIFE.
        </h2>
        <p className="bs-reveal" style={{
          fontFamily: 'var(--font-body)',
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: 1.7,
          color: '#D8E0D1',
          opacity: 0.85,
          maxWidth: '750px',
          margin: '0 auto 4.5rem'
        }}>
          The endocannabinoid system governs sleep, mood, pain, digestion, and immunity. It is also the system most overlooked by conventional medicine. Every recommendation at Danes begins here.
        </p>
        <a href="#story" className="bs-reveal bs-learn-link">
          Learn how it works →
        </a>
      </div>
    </section>
  );
}
