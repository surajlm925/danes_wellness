'use client'
import { motion } from 'framer-motion'

export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.2, 0.6, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}
