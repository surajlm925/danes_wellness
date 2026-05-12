'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Consultation() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const doctors = [
    {
      name: "Dr. Avni Sharma",
      qual: "BAMS, MD — Ayurveda",
      bio: "Expert in hemp-based formulations and women's wellness."
    },
    {
      name: "Dr. Rohan Mehta",
      qual: "BAMS, 12 yrs experience",
      bio: "Specialist in pain management and neurological concerns."
    }
  ]

  return (
    <section id="consultation" style={{
      background: "#105232",
      padding: "96px 0",
      color: "#F8F3DF"
    }}>
      <div className="container-danes" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.2,0.6,0.2,1] }}
        >
          <p style={{
            fontFamily: "var(--font-body)", fontWeight: 500,
            fontSize: "11px", letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(216,224,209,0.7)",
            marginBottom: "24px"
          }}>Clinical Practice</p>

          <h2 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(26px, 3vw, 44px)",
            color: "#F8F3DF",
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            lineHeight: 1.2,
            maxWidth: "580px",
            marginBottom: "20px"
          }}>Every Consultation Starts With Listening.</h2>

          <p style={{
            fontFamily: "var(--font-body)", fontWeight: 400,
            fontSize: "15px",
            color: "rgba(216,224,209,0.7)",
            maxWidth: "520px",
            lineHeight: 1.85,
            marginBottom: "52px"
          }}>
            Our in-house doctors combine 3,000 years of Ayurveda with modern 
            clinical insights. Your consultation is personalised to your biology.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            maxWidth: "680px",
            marginBottom: "44px"
          }}>
            {doctors.map((doc, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -3, background: "rgba(248,243,223,0.13)" }}
                style={{
                  background: "rgba(248,243,223,0.08)",
                  border: "1px solid rgba(248,243,223,0.12)",
                  borderRadius: "4px",
                  padding: "28px 24px",
                  transition: "background 0.25s"
                }}
              >
                <div style={{
                  width: "52px", height: "52px",
                  borderRadius: "50%",
                  background: "rgba(216,224,209,0.15)",
                  display: "flex", alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px"
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="rgba(248,243,223,0.4)" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <p style={{
                  fontFamily: "var(--font-heading)", fontSize: "14px",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "#F8F3DF", marginBottom: "6px"
                }}>{doc.name}</p>
                <p style={{
                  fontFamily: "var(--font-body)", fontWeight: 400,
                  fontSize: "12px", color: "rgba(216,224,209,0.6)",
                  marginBottom: "8px"
                }}>{doc.qual}</p>
                <p style={{
                  fontFamily: "var(--font-body)", fontWeight: 300,
                  fontSize: "12px", color: "rgba(216,224,209,0.5)"
                }}>{doc.bio}</p>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02, background: "#D8E0D1" }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: "#F8F3DF", color: "#105232",
              fontFamily: "var(--font-body)", fontWeight: 500,
              fontSize: "11px", letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "16px 44px", border: "none",
              borderRadius: "4px", cursor: "pointer"
            }}
          >
            Book a Free 10-Min Call
          </motion.button>
          <p style={{
            fontFamily: "var(--font-body)", fontWeight: 300,
            fontSize: "12px",
            color: "rgba(216,224,209,0.4)",
            marginTop: "12px"
          }}>Paid consultation with our in-house doctor.</p>
        </motion.div>
      </div>
    </section>
  )
}
