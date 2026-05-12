'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

export default function Newsletter() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [email, setEmail] = useState('')

  return (
    <section style={{
      background: "#105232",
      padding: "88px 0"
    }}>
      <div className="container-danes" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.2,0.6,0.2,1] }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center"
          }}
        >
          {/* Left — Instagram */}
          <div>
            <h2 style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(20px, 2.4vw, 28px)",
              color: "#F8F3DF",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "14px"
            }}>Follow Our Journey</h2>
            <p style={{
              fontFamily: "var(--font-body)", fontWeight: 400,
              fontSize: "15px",
              color: "rgba(216,224,209,0.7)",
              marginBottom: "24px"
            }}>Follow us @daneswellness</p>
            <a href="https://instagram.com/daneswellness" 
              target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "10px",
                color: "#F8F3DF", textDecoration: "none", opacity: 0.8 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="5"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
              </svg>
              <span style={{ fontFamily: "var(--font-body)", fontWeight: 500,
                fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                Instagram
              </span>
            </a>
          </div>

          {/* Right — Newsletter */}
          <div>
            <h2 style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(20px, 2.4vw, 28px)",
              color: "#F8F3DF",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "28px"
            }}>Stay Informed. No Noise.</h2>
            <div style={{ display: "flex" }}>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  flex: 1,
                  background: "rgba(248,243,223,0.07)",
                  border: "1px solid rgba(248,243,223,0.14)",
                  borderRight: "none",
                  color: "#F8F3DF",
                  fontFamily: "var(--font-body)",
                  fontSize: "14px", fontWeight: 300,
                  padding: "14px 20px",
                  borderRadius: "4px 0 0 4px",
                  outline: "none"
                }}
              />
              <button style={{
                background: "#F8F3DF", color: "#105232",
                fontFamily: "var(--font-body)", fontWeight: 500,
                fontSize: "10px", letterSpacing: "0.18em",
                textTransform: "uppercase",
                padding: "14px 24px", border: "none",
                borderRadius: "0 4px 4px 0", cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "background 0.2s"
              }}>Subscribe</button>
            </div>
            <p style={{
              fontFamily: "var(--font-body)", fontWeight: 300,
              fontSize: "11px",
              color: "rgba(216,224,209,0.4)",
              marginTop: "12px"
            }}>No spam. Unsubscribe anytime.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
