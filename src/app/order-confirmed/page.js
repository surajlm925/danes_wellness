'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function OrderConfirmedPage() {
  const [orderId, setOrderId] = useState('')

  useEffect(() => {
    // Generate a random 6-digit order ID
    setOrderId(Math.floor(100000 + Math.random() * 900000).toString())
  }, [])

  return (
    <main className="min-h-screen bg-evergreen flex flex-col items-center justify-center p-6 text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-lg w-full space-y-12"
      >
        {/* Danes Sun Monogram */}
        <div className="flex justify-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="relative w-32 h-32"
          >
            <svg viewBox="0 0 100 100" fill="none" className="text-cream opacity-80">
              <circle cx="50" cy="50" r="10" fill="currentColor" />
              {[...Array(12)].map((_, i) => (
                <line 
                  key={i}
                  x1="50" y1="25" x2="50" y2="5" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                  transform={`rotate(${i * 30} 50 50)`} 
                />
              ))}
              {[...Array(12)].map((_, i) => (
                <line 
                  key={i}
                  x1="50" y1="35" x2="50" y2="28" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round"
                  transform={`rotate(${i * 30 + 15} 50 50)`} 
                />
              ))}
            </svg>
          </motion.div>
        </div>

        <div className="space-y-4">
          <h1 className="font-heading text-4xl sm:text-5xl text-cream uppercase tracking-tight leading-tight">
            Your order is placed.
          </h1>
          <p className="font-body text-cream/70 text-lg uppercase tracking-widest">
            Order #{orderId}
          </p>
        </div>

        <div className="space-y-8">
          <p className="font-body text-cream/80 leading-relaxed max-w-sm mx-auto">
            Thank you for choosing Danes. We'll reach you on WhatsApp shortly to confirm your delivery details and consultation.
          </p>

          <Link 
            href="/shop"
            className="inline-block bg-cream text-evergreen px-12 py-5 font-body font-bold uppercase tracking-widest hover:bg-palemoss transition-all shadow-2xl hover:shadow-cream/10"
          >
            Continue Shopping
          </Link>
        </div>
      </motion.div>
    </main>
  )
}
