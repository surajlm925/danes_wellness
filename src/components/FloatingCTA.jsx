'use client'
import { motion } from 'framer-motion'

export default function FloatingCTA() {
  const handleClick = () => {
    document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.button
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 2, duration: 0.6 }}
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 bg-amber text-white rounded-full py-[13px] px-[22px] flex items-center gap-2 font-body font-medium text-[11px] tracking-nav uppercase shadow-lg"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Speak to a Doctor
    </motion.button>
  )
}
