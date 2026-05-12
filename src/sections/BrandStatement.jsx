'use client'
import React from 'react';
import { motion } from 'framer-motion'
export default function BrandStatement() {
  return (
  <section id="story" className="rv" style={{ background: "var(--bg-alt)", padding: "96px 0", textAlign: "center" }}>
    <div className="container-danes">
    <svg width="40" height="40" viewBox="0 0 200 160" fill="none" style={{ opacity: 0.25, color: "var(--heading)", margin: "0 auto 32px" }}>
      <line x1="100" y1="95" x2="100" y2="18" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      <line x1="94" y1="89" x2="58" y2="33" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      <line x1="84" y1="92" x2="33" y2="55" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      <line x1="77" y1="97" x2="15" y2="94" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      <line x1="106" y1="89" x2="142" y2="33" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      <line x1="116" y1="92" x2="167" y2="55" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      <line x1="123" y1="97" x2="185" y2="94" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      <line x1="15" y1="113" x2="85" y2="113" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      <circle cx="100" cy="113" r="10" fill="currentColor"/>
      <line x1="115" y1="113" x2="185" y2="113" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
    </svg>
    <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(22px,3vw,42px)", color: "var(--heading)", letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 1.2, maxWidth: "820px", margin: "0 auto 24px" }}>
      WE MAP YOUR CONCERNS TO THE ENDOCANNABINOID SYSTEM AND DESIGN A NATURAL PLAN.
    </h2>
    <a href="#story" style={{ color: "var(--heading)", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", borderBottom: "1px solid var(--border)", paddingBottom: "2px", textDecoration: "none" }} className="hover-link">
      LEARN HOW IT WORKS &rarr;
    </a>
    <style>{`.hover-link:hover { border-color: var(--heading) !important; }`}</style>
    </div>
  </section>
  )
}
