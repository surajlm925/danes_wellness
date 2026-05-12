'use client'
import React from 'react';
import { motion } from 'framer-motion'
import Image from 'next/image'
export default function Products() {
  return (
  <section id="products" className="rv" style={{ background: "var(--bg)", padding: "96px 0" }}>
    <div className="container-danes">
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginBottom: "52px"
    }}>
      <p style={{
        fontFamily: "var(--font-body)",
        fontWeight: 500,
        fontSize: "11px",
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "var(--heading)",
        margin: 0
      }}>Chosen for a Reason</p>
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
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "22px" }}>
      {[
        { name: "Full Spectrum CBD Oil 1000mg", pillar: "FOR CALM", price: "₹2,499" },
        { name: "Lion's Mane + Brahmi Stack", pillar: "FOR CLARITY", price: "₹1,899" },
        { name: "Ashwagandha KSM-66 Extract", pillar: "FOR VITALITY", price: "₹999" },
        { name: "Jatamansi Sleep Ritual Blend", pillar: "FOR REST", price: "₹1,499" }
      ].map((p, i) => (
        <motion.div key={i} whileHover="hover" className="prod-card group" style={{ cursor: "pointer", position: "relative" }}>
          <div style={{
            background: "#F0EBD8",
            aspectRatio: "3/4",
            borderRadius: "4px",
            overflow: "hidden",
            marginBottom: "16px",
            position: "relative"
          }}>
            <Image
              src={`/images/products/product-${i + 1}.png`}
              alt={p.name}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 640px) 100vw, 25vw"
            />
            <div style={{
              position: "absolute", top: "12px", left: "12px",
              background: "#105232", color: "#F8F3DF",
              fontSize: "9px", letterSpacing: "0.18em",
              textTransform: "uppercase", fontWeight: 500,
              padding: "4px 9px", borderRadius: "4px", zIndex: 10
            }}>{p.pillar}</div>
            <button
              className="add-to-cart-btn"
              style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                background: "#105232", color: "#F8F3DF",
                fontSize: "10px", letterSpacing: "0.18em",
                textTransform: "uppercase", fontWeight: 500,
                padding: "13px", border: "none", cursor: "pointer",
                transform: "translateY(100%)",
                transition: "transform 0.3s cubic-bezier(0.2,0.6,0.2,1), background 0.2s"
              }}
            >ADD TO CART</button>
          </div>
          <div style={{ fontFamily: "var(--font-heading)", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>{p.name}</div>
          <div style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "12px", color: "var(--text-muted)", marginBottom: "8px" }}>Danes</div>
          <div style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "15px" }}>{p.price}</div>
        </motion.div>
      ))}
    </div>
    <style>{`
      .prod-card:hover .add-to-cart-btn {
        transform: translateY(0) !important;
      }
      .prod-card:hover .add-to-cart-btn:hover {
        background: #19653F !important;
      }
    `}</style>
    </div>
  </section>
  )
}
