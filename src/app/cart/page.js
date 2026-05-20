'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/context/CartContext'

export default function CartPage() {
  const { cart, removeItem, updateQuantity, cartTotal, cartCount } = useCart()

  const shipping = cartTotal > 999 ? 0 : 99
  const total = cartTotal + shipping
  const hasRx = cart.some(item => item.requiresConsultation)

  if (cartCount === 0) {
    return (
      <main className="min-h-screen bg-[var(--bg)] pt-40 pb-20 px-6">
        <div className="container-danes max-w-2xl text-center">
          <h1 className="font-heading text-4xl text-evergreen mb-6 uppercase tracking-tight">Your Cart is Empty</h1>
          <p className="font-body text-evergreen/70 mb-10 text-lg">Looks like you haven't added anything to your cart yet.</p>
          <Link 
            href="/shop"
            className="inline-block bg-evergreen text-cream px-10 py-4 font-body font-bold uppercase tracking-widest hover:bg-midgreen transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] pt-40 pb-20 px-6">
      <div className="container-danes">
        <h1 className="font-heading text-4xl text-evergreen mb-12 uppercase tracking-tight">Shopping Cart <span className="text-evergreen/40">({cartCount})</span></h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-8">
            {hasRx && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-amber/10 border border-amber/30 p-4 flex gap-4 items-start"
              >
                <div className="w-5 h-5 rounded-full bg-amber text-evergreen flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[10px] font-bold">!</span>
                </div>
                <div>
                  <h4 className="text-evergreen font-bold text-sm uppercase tracking-wider mb-1 font-body">Consultation Required</h4>
                  <p className="text-evergreen/70 text-xs font-body leading-relaxed">
                    One or more items in your cart require a doctor's consultation. Our team will reach out to you on WhatsApp after you place the order.
                  </p>
                </div>
              </motion.div>
            )}

            <div className="space-y-6">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col sm:flex-row gap-6 pb-6 border-b border-evergreen/10 group"
                  >
                    <div className="relative w-24 h-32 bg-[var(--bg-dark)] shrink-0 overflow-hidden border border-[var(--border)]">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-contain p-2"
                          loading="lazy" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-[9px] text-[#D8E0D1] text-center uppercase tracking-widest px-2 font-body font-bold">
                            {item.brand}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest font-bold text-evergreen/60 font-body mb-1">
                            {item.brand}
                          </p>
                          <Link href={`/shop/${item.handle}`}>
                            <h3 className="text-xl font-heading text-evergreen hover:text-midgreen transition-colors leading-tight mb-2">
                              {item.name}
                            </h3>
                          </Link>
                          <span className="text-[9px] px-2 py-0.5 bg-palemoss/30 text-evergreen rounded-full font-medium">
                            {item.pillar}
                          </span>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-evergreen/40 hover:text-red-500 transition-colors p-1"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>

                      <div className="flex justify-between items-end mt-4">
                        <div className="flex items-center border border-evergreen/20 rounded-sm">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-evergreen hover:bg-evergreen/5 transition-colors"
                          >
                            -
                          </button>
                          <span className="w-10 text-center font-body text-sm font-medium border-x border-evergreen/20 h-8 flex items-center justify-center">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-evergreen hover:bg-evergreen/5 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-lg font-body font-bold text-evergreen">
                          {item.price 
                            ? `₹${(item.price * item.quantity).toLocaleString('en-IN')}`
                            : <span className="text-[var(--accent)] text-[11px] uppercase tracking-widest block">Price on Consultation</span>
                          }
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-cream border border-evergreen/10 p-8 sticky top-32">
              <h2 className="font-heading text-xl text-evergreen mb-8 uppercase tracking-tight">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-evergreen/70 uppercase tracking-wider">Subtotal</span>
                  <div className="text-right">
                    <span className="text-evergreen font-bold">₹{cartTotal.toLocaleString()}</span>
                    {cart.some(item => !item.price) && (
                      <p className="text-[10px] text-[var(--accent)] uppercase tracking-widest mt-1">
                        * Consultation items priced at checkout
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-evergreen/70 uppercase tracking-wider">Shipping</span>
                  <span className="text-evergreen font-bold">
                    {shipping === 0 ? <span className="text-midgreen">FREE</span> : `₹${shipping}`}
                  </span>
                </div>
                <div className="pt-4 border-t border-evergreen/10 flex justify-between font-body">
                  <span className="text-evergreen font-bold uppercase tracking-widest text-lg">Total</span>
                  <span className="text-evergreen font-bold text-xl">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Link 
                  href="/checkout"
                  className="block w-full bg-evergreen text-cream text-center py-4 font-body font-bold uppercase tracking-widest hover:bg-midgreen transition-all shadow-lg hover:shadow-evergreen/20"
                >
                  Proceed to Checkout
                </Link>
                <Link 
                  href="/shop"
                  className="block w-full border border-evergreen text-evergreen text-center py-4 font-body font-bold uppercase tracking-widest hover:bg-evergreen hover:text-cream transition-all"
                >
                  Continue Shopping
                </Link>
              </div>

              <div className="mt-8 flex items-center gap-3 justify-center opacity-40">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
