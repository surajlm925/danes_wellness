'use client'
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Hero() {
  const heroBgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroBgRef.current && window.scrollY < window.innerHeight) {
        heroBgRef.current.style.transform = `translateY(${window.scrollY * 0.28}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="hero" style={{
      position: 'relative',
      height: '100vh',
      minHeight: '640px',
      width: '100%',
      overflow: 'hidden',
      background: '#0d1f12'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');

        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes pulseRing {
          0%   { box-shadow: 0 0 0 0 rgba(255,255,255,0.25); }
          70%  { box-shadow: 0 0 0 12px rgba(255,255,255,0); }
          100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); }
        }

        .hero-tag {
          font-family: 'Poppins', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(248,243,223,0.7);
          margin-bottom: 22px;
          opacity: 0;
          animation: heroFadeUp 0.9s ease 0.4s forwards;
        }
        .hero-h1 {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(38px, 5.5vw, 78px);
          font-weight: 300;
          color: #F8F3DF;
          letter-spacing: -0.01em;
          line-height: 1.08;
          margin: 0 0 28px;
          max-width: 820px;
          opacity: 0;
          animation: heroFadeUp 0.9s ease 0.65s forwards;
        }
        .hero-h1 strong {
          font-weight: 600;
          color: #C8D9C0;
        }
        .hero-sub {
          font-family: 'Poppins', sans-serif;
          font-size: 15px;
          font-weight: 300;
          color: rgba(248,243,223,0.72);
          line-height: 1.65;
          max-width: 520px;
          margin-bottom: 44px;
          opacity: 0;
          animation: heroFadeUp 0.9s ease 0.85s forwards;
        }

        /* CTA Buttons */
        .hero-cta-row {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          opacity: 0;
          animation: heroFadeIn 0.9s ease 1.05s forwards;
        }

        .btn-quiz {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #F8F3DF;
          color: #105232;
          font-family: 'Poppins', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 16px 36px;
          border-radius: 4px; /* Material UI style */
          text-decoration: none;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 3px 1px -2px rgba(0,0,0,0.2), 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12);
          transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s ease;
        }
        .btn-quiz:hover {
          background: #ffffff;
          box-shadow: 0 2px 4px -1px rgba(0,0,0,0.2), 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12);
          transform: translateY(-1px);
        }
        .btn-quiz .arrow {
          font-size: 16px;
          display: inline-block;
          transition: transform 0.3s ease;
        }
        .btn-quiz:hover .arrow { transform: translateX(4px); }

        /* WhatsApp floating button */
        .wa-fab {
          position: fixed;
          bottom: 28px;
          right: 28px;
          width: 58px;
          height: 58px;
          background: #25D366;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          box-shadow: 0 4px 20px rgba(37,211,102,0.45);
          z-index: 9999;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          animation: pulseRing 2.5s ease-out infinite;
        }
        .wa-fab:hover {
          transform: scale(1.12);
          box-shadow: 0 8px 30px rgba(37,211,102,0.6);
          animation: none;
        }
        .wa-fab svg {
          width: 30px;
          height: 30px;
          fill: #fff;
        }

        /* Scroll indicator */
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50%       { transform: translateY(8px); opacity: 1; }
        }
        .hero-scroll-hint {
          position: absolute;
          bottom: 32px;
          right: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          animation: heroFadeIn 1s ease 1.6s forwards;
          opacity: 0;
        }
        .hero-scroll-hint span {
          font-family: 'Poppins', sans-serif;
          font-size: 9px;
          letter-spacing: 0.22em;
          color: rgba(248,243,223,0.45);
          text-transform: uppercase;
        }
        .scroll-arrow {
          width: 1px;
          height: 36px;
          background: linear-gradient(to bottom, rgba(248,243,223,0.5), transparent);
          animation: scrollBounce 2s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .hero-h1 { font-size: clamp(30px, 8vw, 50px); }
          .hero-cta-row { gap: 12px; }
          .btn-quiz, .btn-consult { padding: 13px 22px; font-size: 11px; }
          #hero > div { padding: 0 24px !important; }
          .hero-scroll-hint { right: 24px; }
        }
      `}</style>

      {/* WhatsApp FAB — replaces "Speak to a Doctor" */}
      <a
        href="https://wa.me/917899423033"
        target="_blank"
        rel="noopener noreferrer"
        className="wa-fab"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Background Video */}
      <video
        ref={heroBgRef}
        autoPlay muted playsInline loop
        style={{
          position: 'absolute', top: 0, left: 0,
          width: '100%', height: '110%',
          objectFit: 'cover', zIndex: 1,
          opacity: 0.6
        }}
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlays */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'linear-gradient(to right, rgba(13,31,18,0.92) 0%, rgba(13,31,18,0.55) 55%, rgba(13,31,18,0.15) 100%)'
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 30%, transparent 65%, rgba(0,0,0,0.5) 100%)'
      }} />

      {/* Hero Content */}
      <div style={{
        position: 'relative', zIndex: 10,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 80px',
        maxWidth: '1440px'
      }}>
        <p className="hero-tag">India's First Hemp Wellness Clinic</p>

        <h1 className="hero-h1">
          Your Body Already<br />
          Knows How to <strong>Heal.</strong>
        </h1>

        <p className="hero-sub">
          Science-backed hemp and mushroom protocols, personalised to your biology by in-house doctors.
        </p>

        <div className="hero-cta-row">
          <Link href="/quiz" className="btn-quiz">
            Take the Quiz <span className="arrow">→</span>
          </Link>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll-hint" style={{ zIndex: 10 }}>
        <span>Scroll</span>
        <div className="scroll-arrow" />
      </div>
    </section>
  );
}
