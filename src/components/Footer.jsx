'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const MotionLink = motion.create(Link);

export default function Footer() {
  const shopLinks = [
    { label: "All Products", href: "/shop" },
    { label: "For Calm", href: "/shop?category=Calm" },
    { label: "For Rest", href: "/shop?category=Sleep" },
    { label: "For Clarity", href: "/shop?category=Clarity" },
    { label: "For Pain", href: "/shop?category=Pain" },
    { label: "View All Pillars", href: "/shop" }
  ];

  const helpLinks = [
    { label: "FAQs", href: "/#faq" },
    { label: "Shipping & Returns", href: "/refund" },
    { label: "Track Your Order", href: "/profile" },
    { label: "Contact Us", href: "mailto:support@daneswellness.com" },
    { label: "Consultation Info", href: "/consultation" }
  ];

  const companyLinks = [
    { label: "Our Story", href: "/#story" },
    { label: "Learn", href: "/#articles" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund Policy", href: "/refund" }
  ];

  const connectLinks = [
    { label: "WhatsApp", href: "https://wa.me/917899423033" },
    { label: "Instagram", href: "https://instagram.com/daneswellness" },
    { label: "+91 78994 23033", href: "tel:+917899423033" },
    { label: "Indiranagar Bengaluru", href: "https://maps.google.com/?q=Danes+Wellness+Indiranagar+Bengaluru" }
  ];

  const renderLink = (link) => {
    const isExternal = link.href.startsWith('http') || link.href.startsWith('mailto') || link.href.startsWith('tel');
    const style = {
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: '13px',
      color: 'rgba(216,224,209,0.6)',
      textDecoration: 'none',
      display: 'block',
      transition: 'color 0.2s'
    };

    if (isExternal) {
      return (
        <motion.a
          whileHover={{ x: 4 }}
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          style={style}
          onMouseEnter={e => e.target.style.color = '#F8F3DF'}
          onMouseLeave={e => e.target.style.color = 'rgba(216,224,209,0.6)'}
        >
          {link.label}
        </motion.a>
      );
    }

    return (
      <MotionLink
        whileHover={{ x: 4 }}
        key={link.label}
        href={link.href}
        style={style}
        onMouseEnter={e => e.target.style.color = '#F8F3DF'}
        onMouseLeave={e => e.target.style.color = 'rgba(216,224,209,0.6)'}
      >
        {link.label}
      </MotionLink>
    );
  };

  return (
    <footer style={{background:'#112519'}} className="pt-[80px] pb-[40px]">
      <div className="container-danes">
        {/* Top Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr',
          gap: '40px',
          marginBottom: '64px'
        }}>
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-start">
            <div className="flex items-center gap-2.5 mb-4">
              <svg width="32" height="25" viewBox="0 0 48 36" fill="none">
                <line x1="24" y1="22" x2="24" y2="4" stroke="#F8F3DF" strokeWidth="2.2" strokeLinecap="round"/>
                <line x1="22" y1="21" x2="14" y2="8" stroke="#F8F3DF" strokeWidth="2" strokeLinecap="round"/>
                <line x1="20" y1="21.5" x2="8" y2="13" stroke="#F8F3DF" strokeWidth="2" strokeLinecap="round"/>
                <line x1="18" y1="23" x2="4" y2="22" stroke="#F8F3DF" strokeWidth="2" strokeLinecap="round"/>
                <line x1="26" y1="21" x2="34" y2="8" stroke="#F8F3DF" strokeWidth="2" strokeLinecap="round"/>
                <line x1="28" y1="21.5" x2="40" y2="13" stroke="#F8F3DF" strokeWidth="2" strokeLinecap="round"/>
                <line x1="30" y1="23" x2="44" y2="22" stroke="#F8F3DF" strokeWidth="2" strokeLinecap="round"/>
                <line x1="3" y1="27" x2="20" y2="27" stroke="#F8F3DF" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="24" cy="27" r="3" fill="#F8F3DF"/>
                <line x1="28" y1="27" x2="45" y2="27" stroke="#F8F3DF" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span style={{fontFamily:'"Copperplate","Cinzel",serif', fontSize:'16px', 
                letterSpacing:'0.22em', color:'#F8F3DF'}}>DANES</span>
            </div>
            <div className="font-body font-light text-[13px] text-[rgba(216,224,209,0.4)] mb-1">ಡೇನ್ಸ್</div>
            <div className="font-body font-light italic text-[12px] text-[rgba(216,224,209,0.35)]">Natural Curatives</div>
          </div>

          {/* Shop */}
          <div className="flex flex-col gap-3">
            <div className="font-body font-medium text-[10px] tracking-label uppercase text-[rgba(216,224,209,0.38)] mb-4">Shop</div>
            {shopLinks.map(link => renderLink(link))}
          </div>

          {/* Help */}
          <div className="flex flex-col gap-3">
            <div className="font-body font-medium text-[10px] tracking-label uppercase text-[rgba(216,224,209,0.38)] mb-4">Help</div>
            {helpLinks.map(link => renderLink(link))}
          </div>

          {/* Company */}
          <div className="flex flex-col gap-3">
            <div className="font-body font-medium text-[10px] tracking-label uppercase text-[rgba(216,224,209,0.38)] mb-4">Company</div>
            {companyLinks.map(link => renderLink(link))}
          </div>

          {/* Connect */}
          <div className="flex flex-col gap-3">
            <div className="font-body font-medium text-[10px] tracking-label uppercase text-[rgba(216,224,209,0.38)] mb-4">Connect</div>
            {connectLinks.map(link => renderLink(link))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[rgba(216,224,209,0.08)] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-body font-light text-[12px] text-[rgba(216,224,209,0.28)]">
            © 2026 Danes Medical Solutions. Bengaluru.
          </div>
          <div className="font-body font-light text-[12px] text-[rgba(216,224,209,0.28)]">
            India's First Hemp Wellness Clinic
          </div>
        </div>
      </div>
    </footer>
  )
}
