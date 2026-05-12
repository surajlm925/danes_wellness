'use client'
import { motion } from 'framer-motion'
import React from 'react';
import { Monogram, Eyebrow, Display, Headline, Body, Button } from '../components/Primitives';
// Homepage sections — Hero, ConcernGrid, BiologyBlock, Apothecary, Consultation.

export default function HeroWatermark() {
  return (
  <svg viewBox="0 0 64 64" fill="none"
       style={{
         position: "absolute", right: 56, bottom: 32,
         width: 220, height: 220, opacity: 0.12,
         color: "var(--text-inv)",
       }}
       stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M32 56 L32 30" />
    <path d="M32 30 C 22 30, 16 22, 16 12 C 26 12, 32 20, 32 30 Z" />
    <path d="M32 30 C 42 30, 48 22, 48 12 C 38 12, 32 20, 32 30 Z" />
    <path d="M32 38 C 25 38, 21 33, 21 26 C 28 26, 32 32, 32 38 Z" />
    <path d="M32 38 C 39 38, 43 33, 43 26 C 36 26, 32 32, 32 38 Z" />
  </svg>
);

export default function Hero() {
  return (
  <section style={{
    position: "relative",
    background: "var(--bg-dark)",
    color: "var(--text-inv)",
    padding: "120px 56px 140px",
    overflow: "hidden",
  }}>
    <HeroWatermark />
    <div style={{ maxWidth: 980, position: "relative" }}>
      <div style={{
        fontFamily: "var(--font-display)",
        fontSize: 16,
        letterSpacing: "0.4em",
        opacity: 0.55,
        marginBottom: 28,
      }}>आरोग्य</div>
      <Display color="var(--text-inv)" size={72} style={{ letterSpacing: "0.04em" }}>
        Your body<br />already knows<br />how to heal.
      </Display>
      <Body color="var(--text-inv-muted)" size={15} style={{ marginTop: 32, maxWidth: 480 }}>
        India's first hemp wellness clinic. Natural curatives.
      </Body>
      <div style={{ display: "flex", gap: 14, marginTop: 56 }}>
        <Button variant="cream">Shop by concern</Button>
        <Button variant="ghost" arrow>Book a consultation</Button>
      </div>
    </div>
  </section>
);

const concerns = [
  { key: "calm", label: "For Calm", desc: "Stress & anxiety management",
    icon: <><path d="M16.5 15.5 A 7 7 0 1 1 9.5 8.5 A 5.5 5.5 0 0 0 16.5 15.5 Z"/><circle cx="7.5" cy="6.5" r="0.6" fill="currentColor"/></> },
  { key: "sleep", label: "For Sleep", desc: "Deep rest & circadian reset",
    icon: <path d="M19 14.5 A 7.5 7.5 0 1 1 9.5 5 A 6 6 0 0 0 19 14.5 Z"/> },
  { key: "recovery", label: "For Recovery", desc: "Muscle & joint support",
    icon: <><circle cx="15" cy="4.5" r="1.6"/><path d="M5 13 L9 11 L12 13 L11 17 L14 20"/><path d="M12 13 L15 9 L19 11"/><path d="M9 17 L6 19"/></> },
  { key: "focus", label: "For Focus", desc: "Cognitive clarity",
    icon: <><path d="M2.5 12 C 5 7, 8.5 5, 12 5 C 15.5 5, 19 7, 21.5 12 C 19 17, 15.5 19, 12 19 C 8.5 19, 5 17, 2.5 12 Z"/><circle cx="12" cy="12" r="2.3"/></> },
  { key: "vitality", label: "For Vitality", desc: "Daily systemic balance",
    icon: <path d="M12 20 C 4 14.5, 3 9, 6 6.5 C 8.5 4.5, 11 6, 12 8 C 13 6, 15.5 4.5, 18 6.5 C 21 9, 20 14.5, 12 20 Z"/> },
];

const ConcernGrid = ({ onPick }) => {
  const [hover, setHover] = React.useState(null);
  return (
    <section style={{ padding: "96px 56px 32px" }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "baseline",
        paddingBottom: 32, borderBottom: "1px solid rgba(16,82,50,0.10)",
      }}>
        <Headline size={24}>Shop by concern</Headline>
        <div style={{
          width: 6, height: 6, borderRadius: 999,
          background: "var(--accent)",
        }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 1, marginTop: 40 }}>
        {concerns.map(c => (
          <button
            key={c.key}
            onClick={() => onPick && onPick(c.key)}
            onMouseEnter={() => setHover(c.key)}
            onMouseLeave={() => setHover(null)}
            style={{
              background: hover === c.key ? "var(--primary-mid)" : "var(--heading)",
              color: "var(--text-inv)",
              padding: "28px 22px",
              minHeight: 160,
              display: "flex", flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "flex-start",
              border: "none", cursor: "pointer",
              textAlign: "left",
              transition: "background 240ms cubic-bezier(0.2,0.6,0.2,1)",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="1.5"
                 strokeLinecap="round" strokeLinejoin="round">
              {c.icon}
            </svg>
            <div>
              <Eyebrow color="var(--text-inv)">{c.label}</Eyebrow>
              <div style={{
                marginTop: 8,
                fontFamily: "var(--font-body)", fontWeight: 400,
                fontSize: 12, color: "var(--text-inv-muted)",
              }}>
                {c.desc}
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default function BiologyBlock() {
  return (
  <section style={{
    background: "var(--bg-alt)",
    padding: "128px 56px",
    textAlign: "center",
  }}>
    <Monogram size={36} color="var(--heading)" style={{ opacity: 0.65, margin: "0 auto" }} />
    <div style={{ marginTop: 32 }}>
      <Headline size={42} style={{ letterSpacing: "0.04em" }}>
        We map your concerns<br />to your biology.
      </Headline>
    </div>
    <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
      <Body size={15} color="var(--text-muted)" style={{ textAlign: "center" }}>
        Apothecary formulations rooted in Ayurvedic texts,<br />
        validated by modern clinical trials.
      </Body>
    </div>
    <div style={{ marginTop: 40 }}>
      <a style={{
        fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 11,
        letterSpacing: "0.22em", textTransform: "uppercase",
        color: "var(--heading)",
        borderBottom: "1px solid rgba(16,82,50,0.30)",
        paddingBottom: 4,
        cursor: "pointer",
      }}>Learn how it works →</a>
    </div>
  </section>
);

const productIcons = {
  bottle: <><path d="M9 4 L15 4"/><path d="M9 4 L9 8 C 7 10, 6 12, 6 15 L 6 19 C 6 20.5, 7 21 8 21 L 16 21 C 17 21, 18 20.5, 18 19 L 18 15 C 18 12, 17 10, 15 8 L 15 4"/><path d="M11 13 L13 13"/></>,
  capsule: <><rect x="4" y="9" width="16" height="6" rx="3"/><path d="M12 9 L12 15"/></>,
  balm: <><path d="M6 6 C 11 8, 13 11, 18 18"/><path d="M18 6 C 13 8, 11 11, 6 18"/><path d="M6 6 C 8 6, 10 7, 11 9"/><path d="M18 6 C 16 6, 14 7, 13 9"/><path d="M6 18 C 8 18, 10 17, 11 15"/><path d="M18 18 C 16 18, 14 17, 13 15"/></>,
  inhalant: <><path d="M10 3 L14 3 L14 6 L 16 8 L 16 19 C 16 20, 15 21, 14 21 L 10 21 C 9 21, 8 20, 8 19 L 8 8 L 10 6 Z"/><path d="M10 6 L14 6"/><path d="M9 11 L15 11"/></>,
};

const ProductCard = ({ tag, name, sub, icon, badge, onClick }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
         style={{ cursor: "pointer" }}>
      <div style={{
        position: "relative",
        aspectRatio: "3 / 4",
        background: "var(--bg-alt)",
        borderRadius: 4,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "background 240ms cubic-bezier(0.2,0.6,0.2,1)",
        ...(hover ? { background: "#cbd4c0" } : {}),
      }}>
        {badge && (
          <div style={{
            position: "absolute", top: 12, left: 12,
            background: "var(--accent)",
            color: "var(--text-inv)",
            fontFamily: "var(--font-body)", fontWeight: 500,
            fontSize: 9, letterSpacing: "0.18em",
            textTransform: "uppercase",
            padding: "5px 9px", borderRadius: 4,
          }}>{badge}</div>
        )}
        <svg width="36%" height="36%" viewBox="0 0 24 24" fill="none"
             stroke="var(--heading)" strokeWidth="1.4"
             strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.45 }}>
          {icon}
        </svg>
      </div>
      <div style={{ marginTop: 14 }}>
        <Eyebrow style={{
          display: "inline-block",
          background: "var(--bg-dark)",
          color: "var(--text-inv)",
          padding: "4px 8px", borderRadius: 4,
        }}>{tag}</Eyebrow>
      </div>
      <div style={{
        marginTop: 8,
        fontFamily: "var(--font-body)", fontWeight: 500,
        fontSize: 14, color: "var(--text)",
      }}>{name}</div>
      <div style={{
        marginTop: 2,
        fontFamily: "var(--font-body)", fontWeight: 300,
        fontSize: 12, color: "var(--text-muted)",
      }}>{sub}</div>
    </div>
  );
};

const Apothecary = ({ onPick }) => (
  <section style={{ padding: "96px 56px" }}>
    <div style={{ textAlign: "center", marginBottom: 56 }}>
      <Eyebrow style={{ letterSpacing: "0.32em" }}>Apothecary</Eyebrow>
      <div style={{ marginTop: 16 }}>
        <Headline size={36} style={{ letterSpacing: "0.04em" }}>Chosen for a reason.</Headline>
      </div>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
      <ProductCard tag="Calm" name="Adaptogenic Relief Drops" sub="30 ml Extract"
        icon={productIcons.bottle} onClick={() => onPick && onPick("drops")} />
      <ProductCard tag="Sleep" name="Clinical Sleep Compound" sub="60 Capsules"
        icon={productIcons.capsule} badge="Consultation"
        onClick={() => onPick && onPick("sleep")} />
      <ProductCard tag="Recovery" name="Deep Tissue Balm" sub="50 g Salve"
        icon={productIcons.balm} onClick={() => onPick && onPick("balm")} />
      <ProductCard tag="Focus" name="Clarity Inhalant" sub="10 ml Roller"
        icon={productIcons.inhalant} onClick={() => onPick && onPick("inhalant")} />
    </div>
  </section>
);

const Consultation = ({ onBook }) => (
  <section style={{
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
    padding: "0 56px 96px",
    gap: 0,
  }}>
    <div style={{
      background: "var(--bg-dark)",
      color: "var(--text-inv)",
      padding: "64px 56px",
      position: "relative",
      borderRadius: "4px 0 0 4px",
    }}>
      <Eyebrow color="var(--accent)">Clinical Practice</Eyebrow>
      <div style={{ marginTop: 24 }}>
        <Headline color="var(--text-inv)" size={32} style={{ letterSpacing: "0.04em" }}>
          Every consultation<br />starts with listening.
        </Headline>
      </div>
      <Body color="var(--text-inv-muted)" size={14} style={{ marginTop: 24, maxWidth: 360 }}>
        Speak directly with our Ayurvedic practitioners to formulate
        a protocol tailored to your specific biometrics and lifestyle.
      </Body>
      <div style={{ marginTop: 40 }}>
        <Button variant="cream" arrow onClick={onBook}>Book now</Button>
      </div>
      <svg viewBox="0 0 24 24" fill="none"
           style={{
             position: "absolute", top: 32, right: 32,
             width: 32, height: 32, opacity: 0.45,
             color: "var(--text-inv)",
           }}
           stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 5 L14 5 C 15 5, 16 6, 16 7 L 16 12 C 16 13, 15 14, 14 14 L 8 14 L 4 18 Z"/>
        <path d="M10 9 L 14 9"/><path d="M10 11 L 12 11"/>
      </svg>
    </div>
    <div style={{
      background: "var(--bg-alt)",
      borderRadius: "0 4px 4px 0",
      padding: 64,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        border: "1px solid rgba(16,82,50,0.30)",
        padding: 56,
        borderRadius: 4,
      }}>
        <Monogram size={88} color="var(--heading)" style={{ opacity: 0.55 }} />
      </div>
    </div>
  </section>
);

export { Hero, ConcernGrid, BiologyBlock, Apothecary, ProductCard, Consultation, productIcons, concerns };
export default function Homepage() {
  return (
    <>
      <Hero />
      <ConcernGrid />
      <BiologyBlock />
      <Apothecary />
      <Consultation />
    </>
  );
}
