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
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          section.querySelectorAll('.test-reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('test-visible'), i * 150);
          });
          observer.unobserve(section);
        }
      });
    }, { threshold: 0.1 });
    observer.observe(section);
    return () => observer.disconnect();
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
        @media (max-width: 1100px) {
          .test-grid { grid-template-columns: 1fr !important; gap: 4rem !important; }
        }
      `}</style>

      <div className="container-danes">
        <div className="test-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: '5rem'
        }}>
          {testimonials.map((t, i) => (
            <div key={i} className="test-reveal" style={{ display: 'flex', flexDirection: 'column' }}>
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
                fontSize: '11px', opacity: 0.6,
                marginBottom: '1.5rem', letterSpacing: '0.05px',
                fontWeight: 500
              }}>
                {t.author}
              </p>
              <blockquote style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px', lineHeight: 1.7,
                marginBottom: '3rem', fontStyle: 'italic',
                opacity: 0.9, fontWeight: 400,
                margin: '0 0 3rem', padding: 0, border: 'none'
              }}>
                "{t.quote}"
              </blockquote>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '10px', letterSpacing: '0.18em',
                textTransform: 'uppercase', fontWeight: 600,
                opacity: 0.8
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
