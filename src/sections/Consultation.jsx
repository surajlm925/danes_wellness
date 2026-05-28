'use client'
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const doctorsPhotos = [
  "/doctors/Health_and_wellness_store_display_202605280812.jpeg",
  "/doctors/Health_and_wellness_store_display_202605280816.jpeg",
  "/doctors/Health_store_with_plants_202605280817.jpeg",
  "/doctors/Recreate_image_use_reference_202605280805.jpeg"
];

export default function Consultation() {
  const sectionRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const timer = setTimeout(() => {
      section.querySelectorAll('.consult-reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('consult-visible'), i * 150);
      });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Slide deck interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % doctorsPhotos.length);
    }, 4000);
    return () => clearInterval(interval);
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
        
        /* Material UI inspired Button */
        .consult-book-link {
          display: inline-flex;
          align-items: center;
          background: #F8F3DF;
          color: #105232;
          text-decoration: none;
          font-family: var(--font-body);
          font-size: 12px;
          letter-spacing: 0.12em;
          font-weight: 600;
          text-transform: uppercase;
          padding: 14px 28px;
          border-radius: 4px;
          box-shadow: 0 3px 1px -2px rgba(0,0,0,0.2), 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12);
          transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s ease;
        }
        .consult-book-link:hover {
          background: #ffffff;
          box-shadow: 0 2px 4px -1px rgba(0,0,0,0.2), 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12);
          transform: translateY(-1px);
        }

        /* Slide Deck */
        .consult-visual-stack {
          position: relative;
          width: 100%;
          height: 550px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 24px 48px rgba(0,0,0,0.4);
        }
        .slide-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 1s ease-in-out, transform 4s ease-in-out;
          transform: scale(1.05);
        }
        .slide-img.active {
          opacity: 1;
          transform: scale(1);
        }
        .slide-dots {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 10;
        }
        .slide-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.4);
          transition: all 0.3s ease;
        }
        .slide-dot.active {
          background: #fff;
          transform: scale(1.3);
        }
        
        @media (max-width: 1100px) {
          .consult-grid { grid-template-columns: 1fr !important; }
          .consult-visual-stack { height: 450px; max-width: 700px; margin: 40px auto 0; }
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
            <Link href="/consultation" className="consult-reveal consult-book-link">
              BOOK A CONSULTATION
            </Link>
          </div>

          {/* Slide Deck */}
          <div className="consult-reveal" style={{ transitionDelay: '0.4s' }}>
            <div className="consult-visual-stack">
              {doctorsPhotos.map((photo, i) => (
                <img 
                  key={i}
                  src={photo}
                  alt={`Doctor consultation ${i+1}`}
                  className={`slide-img ${currentSlide === i ? 'active' : ''}`}
                />
              ))}
              
              {/* Overlay Gradient for contrast */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)',
                zIndex: 5
              }} />
              
              {/* Dots */}
              <div className="slide-dots">
                {doctorsPhotos.map((_, i) => (
                  <div 
                    key={i} 
                    className={`slide-dot ${currentSlide === i ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
