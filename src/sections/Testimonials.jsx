'use client'
import React, { useEffect, useRef } from 'react';

const testimonials = [
  {
    author: "Arjun, Bengaluru",
    quote: "I had tried everything for two years. The consultation was the first time someone mapped my specific biology before recommending anything. Three months in, I sleep through the night.",
    tags: "CHRONIC STRESS, SLEEP"
  },
  {
    author: "Priya, Mumbai",
    quote: "The approach here is different. They listened first. The protocol they recommended has genuinely changed how I experience my body.",
    tags: "PERIMENOPAUSE, HORMONAL BALANCE"
  },
  {
    author: "Vikram, Hyderabad",
    quote: "I was sceptical. I am not anymore. The lion's mane stack has done more for my focus than anything I tried before.",
    tags: "COGNITIVE FATIGUE, FOCUS"
  }
];

export default function Testimonials() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const timer = setTimeout(() => {
      section.querySelectorAll('.test-reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('test-visible'), i * 150);
      });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#105232',
        padding: '120px 0',
        color: '#F8F3DF'
      }}
    >
      <style>{`
        .test-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.85s ease, transform 0.85s ease;
        }
        .test-reveal.test-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .test-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 3.5rem 2.5rem;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          transition: transform 0.3s ease, background 0.3s ease;
        }
        .test-card:hover {
          transform: translateY(-8px);
          background: rgba(255, 255, 255, 0.06);
        }
        @media (max-width: 1100px) {
          .test-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>

      <div className="container-danes">
        <div className="test-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: '2.5rem'
        }}>
          {testimonials.map((t, i) => (
            <div key={i} className="test-card test-reveal">
              {/* Star rating using the reference SVG */}
              <img
                src="/assets/rating.svg"
                alt="5 Stars"
                style={{
                  width: '90px', height: 'auto',
                  marginBottom: '2rem',
                  filter: 'brightness(0) invert(1)'
                }}
              />
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px', opacity: 0.6,
                marginBottom: '1.5rem', letterSpacing: '0.05px',
                fontWeight: 600,
                textTransform: 'uppercase'
              }}>
                {t.author}
              </p>
              <blockquote style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px', lineHeight: 1.8,
                fontStyle: 'italic',
                opacity: 0.95, fontWeight: 400,
                margin: '0 0 2rem', padding: 0, border: 'none',
                flexGrow: 1
              }}>
                "{t.quote}"
              </blockquote>
              <div style={{
                height: '1px', width: '100%', 
                background: 'rgba(255,255,255,0.1)', 
                marginBottom: '1.5rem'
              }}></div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '10px', letterSpacing: '0.18em',
                textTransform: 'uppercase', fontWeight: 600,
                opacity: 0.8,
                color: '#D8E0D1'
              }}>
                {t.tags}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
