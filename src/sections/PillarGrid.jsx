'use client'
import React from 'react';
import { motion } from 'framer-motion'
export default function () {
  const [hovered, setHovered] = React.useState(null);

  const pillars = [
    { name: "For Calm", desc: "Nervous system, stress, anxiety",
      icon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinecap="round" strokeLinejoin="round"/> },
    { name: "For Rest", desc: "Sleep, circadian rhythm, insomnia",
      icon: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" strokeLinecap="round" strokeLinejoin="round"/> },
    { name: "For Clarity", desc: "Focus, cognitive function, brain fog",
      icon: <><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round"/></> },
    { name: "For Pain", desc: "Inflammation, joint pain, recovery",
      icon: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round"/> },
    { name: "For Digestive Balance", desc: "Gut health, IBS, absorption",
      icon: <><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M12 8v4l3 3" strokeLinecap="round"/></> },
    { name: "For Hormonal Balance", desc: "PMS, PCOS, perimenopause",
      icon: <><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" strokeLinecap="round"/></> },
    { name: "For Vitality", desc: "Energy, performance, recovery",
      icon: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" strokeLinejoin="round"/> },
    { name: "For Longevity", desc: "Cellular ageing, collagen, metabolic health",
      icon: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinejoin="round"/> },
    { name: "For Immunity", desc: "Immune resilience, post-viral recovery",
      icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinejoin="round"/> },
    { name: "For Oral & Skin Care", desc: "Oral microbiome, barrier repair",
      icon: <><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></> }
  ];

  return (
    <section id="concerns" style={{ background: "var(--bg)", padding: "96px 0" }}>
      <style>{`
        @keyframes iconPulse {
          0%   { transform: scale(1) rotate(0deg); }
          50%  { transform: scale(1.15) rotate(3deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        @keyframes tileShimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .pillar-tile {
          background: #105232;
          color: #F8F3DF;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 36px 20px 32px;
          min-height: 210px;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
          transition: background 0.28s cubic-bezier(0.2,0.6,0.2,1),
                      transform 0.28s cubic-bezier(0.2,0.6,0.2,1),
                      box-shadow 0.28s ease;
        }
        .pillar-tile:hover {
          background: #19653F;
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(16,82,50,0.25);
        }
        .pillar-tile::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 40%,
            rgba(255,255,255,0.06) 50%,
            transparent 60%
          );
          background-size: 200% 100%;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .pillar-tile:hover::before {
          opacity: 1;
          animation: tileShimmer 0.7s ease forwards;
        }
        .pillar-icon {
          margin-bottom: 20px;
          opacity: 0.75;
          transition: transform 0.4s cubic-bezier(0.2,0.6,0.2,1),
                      opacity 0.3s ease;
        }
        .pillar-tile:hover .pillar-icon {
          opacity: 1;
          animation: iconPulse 0.55s cubic-bezier(0.2,0.6,0.2,1) forwards;
        }
        .pillar-name {
          font-family: "Copperplate", "Cinzel", serif;
          font-size: 11.5px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 8px;
          line-height: 1.3;
        }
        .pillar-desc {
          font-family: "Jost", sans-serif;
          font-weight: 300;
          font-size: 10.5px;
          opacity: 0.6;
          line-height: 1.55;
        }
        .pillar-tile:hover .pillar-name { opacity: 1; }
        .pillar-tile:hover .pillar-desc { opacity: 0.8; }
      `}</style>

      <div className="container-danes">
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "44px"
        }}>
          <p style={{
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: "11px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--heading)",
            margin: 0
          }}>Shop by Concern</p>
          <a href="#" style={{
            fontFamily: "var(--font-body)",
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            textDecoration: "none",
            borderBottom: "1px solid var(--border)"
          }}>View All →</a>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "10px"
        }}>
          {pillars.map((p, i) => (
            <div
              key={i}
              className="pillar-tile"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="pillar-icon">
                <svg
                  width="38" height="38"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {p.icon}
                </svg>
              </div>
              <div className="pillar-name">{p.name}</div>
              <div className="pillar-desc">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


