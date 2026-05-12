'use client'
import React from 'react';
import { motion } from 'framer-motion'
export default function Articles() {
  return (
  <section id="articles" className="rv" style={{ background: "var(--bg)", padding: "96px 0" }}>
    <div className="container-danes">
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px" }}>
      <div>
        <div style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--heading)", marginBottom: "16px" }}>EDUCATION</div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "36px", color: "var(--heading)", letterSpacing: "0.06em", textTransform: "uppercase", margin: 0 }}>THE JOURNAL</h2>
      </div>
      <a href="#journal" style={{ color: "var(--heading)", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", borderBottom: "1px solid var(--border)", paddingBottom: "2px", textDecoration: "none" }}>VIEW ALL ARTICLES &rarr;</a>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
      {[
        { tag: "INGREDIENT GUIDE", title: "Lion's Mane: From Buddhist Monasteries to Modern Neuroscience", readTime: "4 min read", thumb: (
<div style={{
  width:'100%', height:'100%',
  background:'linear-gradient(135deg, #D8E0D1 0%, #c8d4c0 100%)',
  display:'flex', alignItems:'center', justifyContent:'center'
}}>
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" 
    stroke="#105232" strokeWidth="1" strokeLinecap="round">
    {/* Mushroom illustration */}
    <ellipse cx="40" cy="35" rx="22" ry="14" strokeWidth="1.5"/>
    <path d="M28 35 Q28 55 32 60 Q36 65 40 65 Q44 65 48 60 Q52 55 52 35"/>
    <path d="M35 65 Q37 68 40 68 Q43 68 45 65"/>
    <path d="M20 30 Q18 20 24 18 Q30 16 32 24"/>
    <path d="M60 30 Q62 20 56 18 Q50 16 48 24"/>
    <path d="M30 28 Q28 22 32 20"/>
    <path d="M50 28 Q52 22 48 20"/>
    <path d="M40 21 L40 16"/>
    <ellipse cx="40" cy="50" rx="4" ry="8" strokeWidth="0.75" opacity="0.4"/>
  </svg>
</div>
        ) },
        { tag: "SYSTEM EXPLAINER", title: "The Endocannabinoid System: What Your Doctor Didn't Tell You", readTime: "6 min read", thumb: (
<div style={{
  width:'100%', height:'100%',
  background:'linear-gradient(135deg, #D8E0D1 0%, #c8d4c0 100%)',
  display:'flex', alignItems:'center', justifyContent:'center'
}}>
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none"
    stroke="#105232" strokeWidth="1" strokeLinecap="round">
    {/* Neural network / ECS illustration */}
    <circle cx="40" cy="40" r="6" strokeWidth="1.5"/>
    <circle cx="18" cy="24" r="4"/>
    <circle cx="62" cy="24" r="4"/>
    <circle cx="18" cy="56" r="4"/>
    <circle cx="62" cy="56" r="4"/>
    <circle cx="40" cy="14" r="3"/>
    <circle cx="40" cy="66" r="3"/>
    <line x1="34.5" y1="37" x2="22" y2="27.5"/>
    <line x1="45.5" y1="37" x2="58" y2="27.5"/>
    <line x1="34.5" y1="43" x2="22" y2="52.5"/>
    <line x1="45.5" y1="43" x2="58" y2="52.5"/>
    <line x1="40" y1="34" x2="40" y2="17"/>
    <line x1="40" y1="46" x2="40" y2="63"/>
    <circle cx="40" cy="40" r="16" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4"/>
  </svg>
</div>
        ) },
        { tag: "WELLNESS JOURNEY", title: "For Rest: Why Most Sleep Problems Aren't Sleep Problems", readTime: "5 min read", thumb: (
<div style={{
  width:'100%', height:'100%',
  background:'linear-gradient(135deg, #D8E0D1 0%, #c8d4c0 100%)',
  display:'flex', alignItems:'center', justifyContent:'center'
}}>
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none"
    stroke="#105232" strokeWidth="1" strokeLinecap="round">
    {/* Moon + stars / sleep illustration */}
    <path d="M45 20 Q38 28 38 38 Q38 50 48 55 Q35 58 26 50 Q18 40 22 28 Q28 18 40 18 Q42 18 45 20Z" strokeWidth="1.5"/>
    <circle cx="58" cy="22" r="1.5" fill="#105232"/>
    <circle cx="64" cy="32" r="1" fill="#105232"/>
    <circle cx="52" cy="15" r="1" fill="#105232"/>
    <circle cx="62" cy="14" r="1.5" fill="#105232"/>
    <path d="M55 44 Q60 40 65 44 Q60 48 55 44Z" strokeWidth="0.75" opacity="0.5"/>
    <path d="M22 62 Q40 56 58 62" opacity="0.3"/>
    <path d="M18 66 Q40 60 62 66" opacity="0.2"/>
  </svg>
</div>
        ) }
      ].map((a, i) => (
        <motion.div key={i} whileHover="hover" variants={{ hover: { y: -4 } }} style={{ cursor: "pointer", display: "flex", flexDirection: "column" }} className="article-card group">
          <div style={{ aspectRatio: "16/10", borderRadius: "4px", marginBottom: "20px", overflow: "hidden" }}>{a.thumb}</div>
          <div style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "12px" }}>{a.tag}</div>
          <motion.h3 variants={{ hover: { color: "var(--accent)" } }} style={{ fontFamily: "var(--font-heading)", fontSize: "18px", color: "var(--heading)", letterSpacing: "0.04em", lineHeight: 1.3, margin: "0 0 16px", flex: 1 }}>{a.title}</motion.h3>
          <div style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "12px", color: "var(--text-muted)" }}>{a.readTime}</div>
        </motion.div>
      ))}
    </div>
    </div>
  </section>
  )
}
