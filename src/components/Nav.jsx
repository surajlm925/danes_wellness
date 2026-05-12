'use client'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const links = [
    { label: 'Home', href: '#hero' },
    { label: 'Shop by Concern', href: '#concerns' },
    { label: 'Products', href: '#products' },
    { label: 'Consult', href: '#consultation' },
    { label: 'Our Story', href: '#story' },
    { label: 'Learn', href: '#articles' },
  ]

  const navBg = scrolled && mounted
    ? resolvedTheme === 'dark'
      ? 'rgba(10,26,15,0.97)'
      : 'rgba(248,243,223,0.97)'
    : 'transparent'

  const navClasses = `fixed top-[40px] left-0 right-0 z-50 h-[68px]
  transition-all duration-400 ease-in-out
  ${scrolled ? 'backdrop-blur-md shadow-sm' : ''}`

  const linkClasses = `relative font-body font-medium text-[11px]
  tracking-nav uppercase transition-colors duration-300
  after:absolute after:-bottom-1 after:left-0 after:h-[1px]
  after:w-full after:bg-current after:origin-left after:scale-x-0
  hover:after:scale-x-100 after:transition-transform after:duration-300
  ${scrolled && mounted
    ? resolvedTheme === 'dark'
      ? 'text-[#D8E0D1] hover:text-[#F8F3DF]'
      : 'text-evergreen hover:text-midgreen'
    : 'text-[rgba(248,243,223,0.8)] hover:text-cream'
  }`
  
  const iconClasses = `transition-colors duration-300 cursor-pointer
  ${scrolled && mounted
    ? resolvedTheme === 'dark'
      ? 'text-[#D8E0D1] hover:text-[#F8F3DF]'
      : 'text-evergreen hover:text-midgreen'
    : 'text-[rgba(248,243,223,0.8)] hover:text-cream'
  }`

  return (
    <>
      {/* Scroll Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-amber z-[70] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Announcement Bar */}
      <div className="fixed top-0 left-0 right-0 h-[40px] z-[60] bg-evergreen flex items-center justify-center font-body text-cream text-[11px] tracking-nav">
        Free shipping on orders over ₹999 &nbsp;&middot;&nbsp; Use code DANESVIP for 10% off
      </div>

      {/* Nav Bar */}
      <nav className={navClasses} style={{ background: navBg }}>
        <div className="container-danes h-full flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2.5">
            <svg 
              width="36" height="28" 
              viewBox="0 0 48 36" 
              fill="none"
              style={{
                color: scrolled && mounted
                  ? resolvedTheme === 'dark' ? '#D8E0D1' : '#105232'
                  : '#F8F3DF',
                transition: 'color 0.3s ease'
              }}
            >
              <line x1="24" y1="22" x2="24" y2="4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
              <line x1="22" y1="21" x2="14" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="20" y1="21.5" x2="8" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="18" y1="23" x2="4" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="26" y1="21" x2="34" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="28" y1="21.5" x2="40" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="30" y1="23" x2="44" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="3" y1="27" x2="20" y2="27" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="24" cy="27" r="3" fill="currentColor"/>
              <line x1="28" y1="27" x2="45" y2="27" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span style={{
              fontFamily: '"Copperplate", "Cinzel", serif',
              fontSize: '16px',
              letterSpacing: '0.22em',
              color: scrolled && mounted
                ? resolvedTheme === 'dark' ? '#D8E0D1' : '#105232'
                : '#F8F3DF',
              transition: 'color 0.3s ease'
            }}>
              DANES
            </span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex gap-6 items-center">
            {links.map((link) => (
              <a 
                key={link.label} 
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={linkClasses}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button className={iconClasses} aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="6"/>
                <path d="M20 20L15.5 15.5" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Account */}
            <button className={iconClasses} aria-label="Account">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" strokeLinecap="round"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </button>

            {/* Cart */}
            <button className={iconClasses} aria-label="Cart" onClick={() => setCartOpen(true)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6L18 2H6Z" strokeLinejoin="round"/>
                <path d="M3 6H21" strokeLinecap="round"/>
                <path d="M16 10C16 12.2091 14.2091 14 12 14C9.79086 14 8 12.2091 8 10" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Theme Toggle */}
            <button 
              className={iconClasses}
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle Theme"
            >
              {mounted && (
                <AnimatePresence mode="wait">
                  {resolvedTheme === 'dark' ? (
                    <motion.svg
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                    >
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinecap="round" strokeLinejoin="round"/>
                    </motion.svg>
                  ) : (
                    <motion.svg
                      key="moon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                    >
                      <circle cx="12" cy="12" r="5"/>
                      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round"/>
                    </motion.svg>
                  )}
                </AnimatePresence>
              )}
            </button>

            {/* Hamburger (Mobile Only) */}
            <button 
              className={`md:hidden ml-2 ${iconClasses}`} 
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[108px] left-0 right-0 z-40 bg-[var(--bg)] border-b border-[var(--border)] shadow-lg md:hidden"
          >
            <div className="flex flex-col py-4 px-6 gap-4">
              {links.map((link) => (
                <a 
                  key={link.label} 
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-body font-medium text-[12px] tracking-nav uppercase text-[var(--text)] hover:text-[var(--heading)] transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            {/* Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black/30 z-[100] cursor-pointer"
            />
            {/* Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[380px] max-w-[100vw] bg-[var(--bg)] shadow-2xl z-[101] p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-[22px] text-[var(--heading)] tracking-wide">Your Cart</h2>
                <button onClick={() => setCartOpen(false)} className="text-[var(--text)] hover:text-[var(--heading)] transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <p className="font-body font-light text-[15px] text-[var(--text-muted)]">Your cart is empty.</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
