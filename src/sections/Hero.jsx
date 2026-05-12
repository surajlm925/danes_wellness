'use client'
import React from 'react';
import { motion } from 'framer-motion'
export default function Hero() {
  return (
  <section id="hero" style={{
    minHeight: "calc(100vh - 40px)", background: "#112519", position: "relative", overflow: "hidden", display: "flex",
    flexDirection: "column", justifyContent: "flex-end", padding: "108px 0 88px", boxSizing: "border-box"
  }}>
    <video
      autoPlay
      muted
      playsInline
      loop
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        opacity: 0.45,
        zIndex: 0
      }}
    >
      <source src="/video/hero.mp4" type="video/mp4" />
    </video>
    <div style={{
      position: "absolute",
      inset: 0,
      zIndex: 1,
      background: "linear-gradient(155deg, rgba(17,37,25,0.2) 0%, rgba(17,37,25,0.05) 40%, rgba(17,37,25,0.9) 100%)"
    }} />
    <style>{`
      @keyframes fadeUp { from {opacity:0; transform:translateY(20px)} to {opacity:1; transform:translateY(0)} }
    `}</style>

    <div className="container-danes" style={{ position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: "860px" }}>
      <div style={{
        fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "11px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#F8F3DF", opacity: 0.8,
        marginBottom: "20px", animation: "fadeUp 0.9s ease 0.5s both"
      }}>India's first hemp wellness clinic</div>
      <h1 style={{
        fontFamily: '"Copperplate", "Cinzel", serif', fontSize: "72px", color: "#F8F3DF",
        letterSpacing: "0.06em", textTransform: "uppercase", lineHeight: 1.05, margin: "0 0 24px",
        animation: "fadeUp 0.9s ease 0.75s both"
      }}>YOUR BODY ALREADY KNOWS HOW TO HEAL.</h1>
      <div style={{
        fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "15px", color: "rgba(248,243,223,0.7)",
        marginBottom: "44px", animation: "fadeUp 0.9s ease 1s both"
      }}>Natural Curatives. Indiranagar, Bengaluru.</div>
      <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", animation: "fadeUp 0.9s ease 1s both" }}>
        <a href="#concerns" className="btn-hero" style={{
          background: "var(--bg-dark)", color: "#F8F3DF", border: "1px solid var(--bg-dark)",
          fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase",
          padding: "14px 32px", borderRadius: "4px", textDecoration: "none", display: "inline-block", transition: "background 0.2s"
        }}>SHOP BY CONCERN</a>
        <a href="#" className="btn-hero-ghost" style={{
          background: "transparent", color: "#F8F3DF", border: "1px solid var(--border-inv)",
          fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase",
          padding: "14px 32px", borderRadius: "4px", textDecoration: "none", display: "inline-block", transition: "border-color 0.2s"
        }}>TAKE THE WELLNESS QUIZ</a>
      </div>
      <style>{`.btn-hero:hover { background: #19653F !important; } .btn-hero-ghost:hover { border-color: var(--text-inv) !important; }`}</style>

      </div>
    </div>
  </section>
  )
}
