'use client'
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Consultation() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          section.querySelectorAll('.consult-reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('consult-visible'), i * 150);
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
      id="consultation"
      ref={sectionRef}
      style={{
        position: 'relative',
        padding: '160px 0',
        minHeight: '800px',
        background: '#105232',
        color: '#F8F3DF',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <style>{`
        .consult-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .consult-reveal.consult-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .consult-book-link {
          display: inline-block;
          color: #F8F3DF;
          text-decoration: none;
          font-family: var(--font-body);
          font-size: 12px;
          letter-spacing: 0.18em;
          font-weight: 500;
          text-transform: uppercase;
          border-bottom: 1px solid rgba(255,255,255,0.3);
          padding-bottom: 4px;
          transition: border-color 0.3s ease, padding-left 0.3s ease;
        }
        .consult-book-link:hover {
          border-bottom-color: #F8F3DF;
          padding-left: 5px;
        }
        /* Visual stack */
        .consult-visual-stack {
          position: relative;
          width: 100%;
          height: 550px;
        }
        .consult-main-img {
          position: absolute;
          top: 50px; left: 0;
          width: 370px; height: 480px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          z-index: 2;
        }
        .consult-overlay-img {
          position: absolute;
          top: 0; right: 0;
          width: 400px; height: 550px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          z-index: 1;
        }
        @media (max-width: 1100px) {
          .consult-grid { grid-template-columns: 1fr !important; }
          .consult-visual-stack { height: 500px; max-width: 600px; margin: 0 auto; }
          .consult-main-img { width: 300px; height: 380px; }
          .consult-overlay-img { width: 340px; height: 440px; }
        }
        @media (max-width: 640px) {
          .consult-visual-stack { height: 400px; }
          .consult-main-img { width: 220px; height: 300px; }
          .consult-overlay-img { width: 260px; height: 360px; }
        }
      `}</style>

      {/* Hemp Leaf Background */}
      <img
        src="/assets/hemp leaf.svg"
        alt=""
        style={{
          position: 'absolute', top: '50%', left: '-150px',
          transform: 'translateY(-50%) rotate(-15deg)',
          width: '800px', height: 'auto',
          zIndex: 1, opacity: 0.07,
          filter: 'brightness(0) invert(1)',
          pointerEvents: 'none'
        }}
      />

      {/* Overlay tint */}
      <div style={{
        position: 'absolute', inset: 0,
        background: '#105232', opacity: 0.85, zIndex: 2
      }} />

      <div className="container-danes" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <div
          className="consult-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '6rem',
            alignItems: 'center'
          }}
        >
          {/* Text Column */}
          <div>
            <div className="consult-reveal">
              <img
                src="/assets/brand_icon_3rd.svg"
                alt="Danes Icon"
                style={{ width: '40px', marginBottom: '2rem', filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <h2 className="consult-reveal" style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(26px, 3vw, 32px)',
              lineHeight: 1.3, letterSpacing: '0.05em',
              marginBottom: '2rem', fontWeight: 400,
              textTransform: 'uppercase', color: '#F8F3DF'
            }}>
              EVERY CONSULTATION IS DESIGNED TO HELP YOU FIND THE RIGHT ONE.
            </h2>
            <p className="consult-reveal" style={{
              fontFamily: 'var(--font-body)', fontSize: '16px',
              lineHeight: 1.6, marginBottom: '3rem',
              maxWidth: '450px', opacity: 0.9, color: '#F8F3DF', fontWeight: 400
            }}>
              Our in-house doctors map your specific concerns to your biology before recommending anything.
            </p>
            <a href="#" className="consult-reveal consult-book-link">
              BOOK A CONSULTATION →
            </a>
          </div>

          {/* Visual Stack */}
          <div className="consult-reveal" style={{ transitionDelay: '0.4s' }}>
            <div className="consult-visual-stack">
              {/* Main image — left, overlapping */}
              <div className="consult-main-img">
                <div style={{
                  width: '100%', height: '100%',
                  background: 'linear-gradient(145deg, rgba(216,224,209,0.15) 0%, rgba(16,82,50,0.3) 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <img
                    src="/assets/brand_icon_3rd.svg"
                    alt=""
                    style={{ width: '80px', opacity: 0.2, filter: 'brightness(0) invert(1)' }}
                  />
                </div>
              </div>
              {/* Overlay image — right, behind */}
              <div className="consult-overlay-img">
                <div style={{
                  width: '100%', height: '100%',
                  background: 'linear-gradient(145deg, rgba(16,82,50,0.5) 0%, rgba(17,37,25,0.8) 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <img
                    src="/assets/hemp leaf.svg"
                    alt=""
                    style={{ width: '160px', opacity: 0.15, filter: 'brightness(0) invert(1)' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
