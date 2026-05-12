'use client'
import React from 'react';
import { motion } from 'framer-motion'
export default function TrustBar() {
  return (
  <section style={{ background: "var(--bg-alt)", height: "48px", overflow: "hidden", whiteSpace: "nowrap" }}>
    <style>{`@keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>
    <div style={{ display: "inline-flex", gap: "80px", animation: "marquee 28s linear infinite" }}>
      {["EST. 2021 · 3,000-YEAR LINEAGE · IN-HOUSE DOCTORS · 50+ NATURAL PRODUCTS · PAN-INDIA SHIPPING", "EST. 2021 · 3,000-YEAR LINEAGE · IN-HOUSE DOCTORS · 50+ NATURAL PRODUCTS · PAN-INDIA SHIPPING", "EST. 2021 · 3,000-YEAR LINEAGE · IN-HOUSE DOCTORS · 50+ NATURAL PRODUCTS · PAN-INDIA SHIPPING", "EST. 2021 · 3,000-YEAR LINEAGE · IN-HOUSE DOCTORS · 50+ NATURAL PRODUCTS · PAN-INDIA SHIPPING"].map((t, i) => (
        <div key={i} style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "10.5px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--heading)", display: "flex", alignItems: "center" }}>
          {t}
        </div>
      ))}
    </div>
  </section>
  )
}
