'use client'
import React from 'react';
import { motion } from 'framer-motion'
export default function Discover() {
  return (
  <section className="rv" style={{ background: "var(--bg-alt)", minHeight: "600px", display: "flex" }}>
    <div className="container-danes" style={{ display: "flex", alignItems: "stretch", padding: 0 }}>
    <div style={{ flex: 1, padding: "96px 0", display: "flex", flexDirection: "column", justifyContent: "center", paddingRight: "48px" }}>
      <div style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--heading)", marginBottom: "20px" }}>CLINICAL EFFICACY</div>
      <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(32px, 4vw, 56px)", color: "var(--heading)", letterSpacing: "0.06em", textTransform: "uppercase", lineHeight: 1.1, marginBottom: "32px", maxWidth: "560px" }}>
        PRECISION DOSING.<br/>MAXIMUM ABSORPTION.
      </h2>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "16px", color: "var(--text-muted)", lineHeight: 1.6, maxWidth: "480px", marginBottom: "40px" }}>
        Our proprietary full-spectrum extracts preserve the complete profile of cannabinoids, terpenes, and flavonoids. This creates the entourage effect—where compounds work synergistically to enhance therapeutic benefits.
      </p>
      <div>
        <a href="#science" className="btn-solid" style={{
          background: "var(--bg-dark)", color: "var(--text-inv)", border: "1px solid var(--border)",
          fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase",
          padding: "14px 32px", borderRadius: "4px", textDecoration: "none", display: "inline-block", transition: "background 0.2s"
        }}>READ THE SCIENCE</a>
      </div>
      <style>{`.btn-solid:hover { background: var(--primary-mid) !important; }`}</style>
    </div>
    <div style={{ flex: 1, background: "var(--bg-dark)", position: "relative", overflow: "hidden" }}>
      <svg viewBox="0 0 500 600" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        {/* Specimen Frame / Petri Dish effect */}
        <circle cx="250" cy="280" r="260" stroke="rgba(248,243,223,0.1)" strokeWidth="1" fill="none" />
        <circle cx="250" cy="280" r="255" stroke="rgba(248,243,223,0.05)" strokeWidth="0.5" fill="none" />
        
        <g stroke="rgba(248,243,223,0.15)" strokeWidth="0.75" fill="none">
          <circle cx="250" cy="280" r="180" />
          <line x1="70" y1="280" x2="430" y2="280" opacity="0.3" />
          <line x1="250" y1="100" x2="250" y2="460" opacity="0.3" />
        </g>

        {/* Hemp Leaf - 7 Leaflets */}
        <g stroke="rgba(248,243,223,0.4)" strokeWidth="1.2" fill="none" strokeLinecap="round">
          {/* Center Leaflet */}
          <path d="M250,280 Q240,200 250,60 Q260,200 250,280" />
          <path d="M250,110 L245,130 M250,150 L255,170 M250,190 L245,210" strokeWidth="0.5" opacity="0.4" />
          
          {/* Top Right */}
          <path d="M250,280 Q310,210 380,120 Q340,240 250,280" />
          {/* Top Left */}
          <path d="M250,280 Q190,210 120,120 Q160,240 250,280" />
          
          {/* Mid Right */}
          <path d="M250,280 Q350,280 460,280 Q350,300 250,280" />
          {/* Mid Left */}
          <path d="M250,280 Q150,280 40,280 Q150,300 250,280" />
          
          {/* Bottom Right */}
          <path d="M250,280 Q320,360 380,450 Q300,380 250,280" />
          {/* Bottom Left */}
          <path d="M250,280 Q180,360 120,450 Q200,380 250,280" />

          {/* Stem */}
          <path d="M250,280 L250,520" strokeWidth="1.5" />
        </g>

        {/* Entourage Effect / Molecular connections */}
        <g fill="none">
          <g stroke="rgba(248,243,223,0.2)" strokeWidth="0.8">
            <path d="M150,100 L220,180" />
            <path d="M350,100 L280,180" />
            <path d="M430,220 L350,260" />
            <path d="M70,220 L150,260" />
            <path d="M400,400 L320,340" />
            <path d="M100,400 L180,340" />
          </g>
          
          <g fill="rgba(248,243,223,0.4)">
            <circle cx="150" cy="100" r="4" />
            <circle cx="350" cy="100" r="3" />
            <circle cx="430" cy="220" r="5" />
            <circle cx="70" cy="220" r="3" />
            <circle cx="400" cy="400" r="4" />
            <circle cx="100" cy="400" r="3" />
            
            <circle cx="210" cy="150" r="2" opacity="0.3" />
            <circle cx="290" cy="150" r="2" opacity="0.3" />
            <circle cx="330" cy="300" r="2" opacity="0.3" />
            <circle cx="170" cy="300" r="2" opacity="0.3" />
          </g>
          
          <path d="M80,180 A250,250 0 0 1 420,180" stroke="rgba(248,243,223,0.1)" strokeWidth="0.75" strokeDasharray="4 4" />
          <path d="M60,350 A280,280 0 0 0 440,350" stroke="rgba(248,243,223,0.1)" strokeWidth="0.75" strokeDasharray="6 3" />
        </g>

        {/* Dropper Element */}
        <g transform="translate(250, 530)" stroke="rgba(248,243,223,0.5)" strokeWidth="1.2">
          <path d="M-8,-40 L-8,10 Q-8,20 0,20 Q8,20 8,10 L8,-40" fill="none" />
          <line x1="-12" y1="-40" x2="12" y2="-40" />
          <circle cx="0" cy="45" r="3.5" fill="rgba(248,243,223,0.2)" stroke="none" />
        </g>
      </svg>
    </div>
    </div>
  </section>
  )
}
