'use client'
import React from 'react';
import { motion } from 'framer-motion'
export default function Testimonials() {
  return (
  <section className="rv" style={{ background: "var(--bg-alt)", padding: "96px 0", textAlign: "center" }}>
    <div className="container-danes">
    <div style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--heading)", marginBottom: "48px" }}>PATIENT STORIES</div>
    <div style={{ display: "flex", justifyContent: "center", gap: "40px", flexWrap: "wrap" }}>
      {[
        { quote: "After 4 years of chronic insomnia, the Rest Drops have finally allowed me to sleep through the night. Truly life-changing.", author: "Priya M.", detail: "Verified Patient" },
        { quote: "The consultation was incredibly thorough. The doctor actually listened to my history with inflammation before prescribing.", author: "Rahul K.", detail: "Verified Patient" }
      ].map((t, i) => (
        <div key={i} style={{ flex: "1 1 400px", maxWidth: "480px", background: "var(--bg)", padding: "48px", borderRadius: "4px", textAlign: "left" }}>
          <div style={{ display: "flex", gap: "4px", color: "var(--accent)", marginBottom: "24px" }}>
            {[1,2,3,4,5].map(s => <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
          </div>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: "18px", color: "var(--heading)", lineHeight: 1.5, fontStyle: "italic", marginBottom: "32px" }}>"{t.quote}"</p>
          <div style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "13px", color: "var(--heading)", marginBottom: "4px" }}>{t.author}</div>
          <div style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{t.detail}</div>
        </div>
      ))}
    </div>
    </div>
  </section>
  )
}
