'use client'
import React, { useEffect, useRef } from 'react';

const LOGO_PATH_1 = "M24.7217 1.08128C24.656 0.401193 25.3455 -0.161639 25.9975 0.0423868C26.5955 0.124466 26.8464 0.783446 26.8159 1.32048C26.8347 7.57259 26.8042 13.827 26.83 20.0815C26.7971 21.2212 28.094 21.6809 29.0414 21.6809C29.8458 21.6293 30.2093 20.8132 30.5962 20.2245C32.4465 17.2298 34.3086 14.2445 36.173 11.2568C36.4215 10.7995 36.9539 10.4266 37.4862 10.6611C38.2507 10.7901 38.3938 11.7985 38.0068 12.3566C35.99 15.6539 33.9029 18.9113 31.8954 22.2132C31.1028 23.3412 32.6975 24.9336 33.8325 24.1526C39.2076 21.2447 44.5685 18.3086 49.9412 15.3936C50.3961 15.1473 51.0528 15.0864 51.3999 15.5484C51.951 16.1018 51.5757 17.0281 50.9168 17.2978C45.6473 20.1776 40.3707 23.0434 35.0965 25.9138C34.7049 26.1366 34.2945 26.4274 34.1843 26.8917C33.9287 27.7665 34.6768 28.7866 35.6148 28.6975C39.5265 28.7022 43.4382 28.7045 47.3498 28.6928C47.7227 28.7022 48.1097 28.6881 48.4731 28.8077C49.1908 29.0493 49.3338 30.1632 48.7147 30.5924C48.3324 30.9089 47.7978 30.8433 47.3381 30.8714C42.3383 30.862 37.3385 30.8691 32.3387 30.8667C32.4161 29.2251 32.1675 27.5085 31.1825 26.1507C29.9068 24.2582 27.5617 23.1536 25.2916 23.3928C23.0801 23.5921 21.0469 25.0391 20.1065 27.0442C19.5179 28.2261 19.485 29.5746 19.4827 30.8667C14.4665 30.8714 9.45023 30.8597 4.43166 30.8738C3.97436 30.8503 3.44906 30.9043 3.07384 30.5924C2.59074 30.2171 2.56963 29.4057 3.02693 29.007C3.40684 28.667 3.95091 28.7162 4.42463 28.6951C8.3363 28.7045 12.2503 28.6998 16.1643 28.6998C16.9312 28.7678 17.6558 28.1159 17.6511 27.3397C17.7027 26.751 17.2454 26.289 16.7694 26.0287C11.4061 23.1044 6.03339 20.1941 0.674771 17.2626C-0.0686341 16.9812 -0.263281 15.8438 0.423841 15.3983C0.937424 14.9879 1.60813 15.3092 2.10061 15.5882C7.05351 18.3133 12.0322 20.9938 16.9922 23.7094C17.4799 23.9721 17.9607 24.2746 18.5048 24.42C19.5718 24.5114 20.4653 23.1841 19.7969 22.2765C17.7895 18.9769 15.7141 15.7196 13.6855 12.434C13.2259 11.8313 13.4088 10.7409 14.2577 10.633C14.8018 10.4477 15.2755 10.8769 15.5241 11.3178C17.5433 14.5517 19.5437 17.7973 21.5722 21.0242C22.3461 22.368 24.7991 21.5824 24.6983 20.044C24.7405 13.7239 24.6936 7.4014 24.7217 1.08128Z";
const LOGO_PATH_2 = "M24.4777 26.801C26.1357 26.0552 28.298 26.9933 28.8162 28.7521C29.3955 30.3538 28.4762 32.3026 26.844 32.8279C25.3454 33.4072 23.5069 32.6591 22.8432 31.1981C22.0247 29.6081 22.815 27.467 24.4777 26.801Z";

export default function Hero() {
  const heroBgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroBgRef.current && window.scrollY < window.innerHeight) {
        heroBgRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="hero" style={{
      position: 'relative',
      height: '100vh',
      minHeight: '600px',
      width: '100%',
      overflow: 'hidden',
      background: '#112519'
    }}>
      <style>{`
        @keyframes revealUp {
          0%   { transform: translateY(180px) scale(0.2); }
          40%  { transform: translateY(80px) scale(0.7); }
          100% { transform: translateY(0px) scale(1.6); }
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .hero-bottom-link {
          color: #F8F3DF;
          text-decoration: none;
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: color 0.3s ease;
          opacity: 0;
          animation: heroFadeIn 1s ease 1.2s forwards;
        }
        .hero-bottom-link:hover { color: #D8E0D1; }
        .hero-bottom-link .arrow { display: inline-block; transition: transform 0.3s ease; }
        .hero-bottom-link:hover .arrow { transform: translateX(5px); }
        .hero-nav-logo { display: flex; align-items: center; }
        .logo-reveal-circle {
          transform-origin: center;
          animation: revealUp 2.5s ease-out 1 forwards;
        }
      `}</style>

      {/* Background Video with Parallax */}
      <video
        ref={heroBgRef}
        autoPlay muted playsInline loop
        style={{
          position: 'absolute', top: 0, left: 0,
          width: '100%', height: '110%',
          objectFit: 'cover', zIndex: 1,
          opacity: 0.55
        }}
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.35) 100%)'
      }} />

      {/* Hero Content */}
      <div style={{
        position: 'relative', zIndex: 10,
        height: 'calc(100% - 120px)',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 80px', maxWidth: '1280px'
      }}>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: '11px', letterSpacing: '0.22em',
          textTransform: 'uppercase', color: '#F8F3DF',
          marginBottom: '20px',
          opacity: 0,
          animation: 'heroFadeUp 0.9s ease 0.5s forwards'
        }}>
          India's first hemp wellness clinic
        </p>

        <h1 style={{
          fontFamily: '"Copperplate", "Cinzel", serif',
          fontSize: 'clamp(42px, 6vw, 82px)',
          color: '#F8F3DF', letterSpacing: '0.06em',
          textTransform: 'uppercase',
          lineHeight: 1.05, margin: '0 0 24px', maxWidth: '860px',
          opacity: 0,
          animation: 'heroFadeUp 0.9s ease 0.75s forwards'
        }}>
          YOUR BODY ALREADY<br />KNOWS HOW TO HEAL.
        </h1>
      </div>

      {/* Bottom Links — positioned absolute like reference */}
      <div style={{
        position: 'absolute', zIndex: 10,
        bottom: '3rem', left: '80px',
        display: 'flex', gap: '2.5rem'
      }}>
        <a href="#concerns" className="hero-bottom-link" style={{ transitionDelay: '0s' }}>
          SHOP BY CONCERN <span className="arrow">→</span>
        </a>
        <a href="#consultation" className="hero-bottom-link" style={{ transitionDelay: '0.15s' }}>
          BOOK A CONSULTATION <span className="arrow">→</span>
        </a>
      </div>
    </section>
  );
}
