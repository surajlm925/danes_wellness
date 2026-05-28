'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useCart } from '@/context/CartContext'

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, cartTotal, cartCount, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)

  const shipping = cartTotal > 999 ? 0 : 99
  const total = cartTotal + shipping
  const hasRx = cart.some(item => item.requiresConsultation)

  const handlePay = (e) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Mock processing delay
    setTimeout(() => {
      clearCart()
      router.push('/order-confirmed')
    }, 1500)
  }

  if (cartCount === 0) {
    if (typeof window !== 'undefined') router.push('/shop')
    return null
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] pt-40 pb-20 px-6">
      <div className="container-danes">
        <div className="flex items-center gap-4 mb-12">
          <Link href="/cart" className="text-[var(--text)] opacity-60 hover:opacity-100 transition-opacity flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[10px] uppercase tracking-widest font-bold">Back to Cart</span>
          </Link>
          <div className="h-[1px] flex-1 bg-[var(--border)]" />
          <h1 className="font-heading text-2xl text-[var(--heading)] uppercase tracking-tight">Checkout</h1>
        </div>

        <form onSubmit={handlePay} className="grid grid-cols-1 lg:grid-cols-10 gap-16">
          {/* Form Side */}
          <div className="lg:col-span-6 space-y-12">
            {/* Contact Info */}
            <section className="space-y-6">
              <h2 className="font-heading text-xl text-[var(--heading)] uppercase tracking-tight flex items-center gap-3">
                <span className="w-8 h-8 rounded-full border border-[var(--heading)] flex items-center justify-center text-sm text-[var(--heading)] font-semibold">1</span>
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-[var(--text)] opacity-60 px-1">Full Name</label>
                  <input required type="text" className="w-full bg-cream text-evergreen border border-evergreen/20 p-4 font-body text-sm focus:border-evergreen outline-none transition-colors placeholder-evergreen/40 dark:bg-[var(--bg-alt)] dark:border-[var(--border)] dark:text-[var(--text)] dark:placeholder-[var(--text-muted)] dark:focus:border-[var(--heading)]" placeholder="John Doe" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-[var(--text)] opacity-60 px-1">Email Address</label>
                  <input required type="email" className="w-full bg-cream text-evergreen border border-evergreen/20 p-4 font-body text-sm focus:border-evergreen outline-none transition-colors placeholder-evergreen/40 dark:bg-[var(--bg-alt)] dark:border-[var(--border)] dark:text-[var(--text)] dark:placeholder-[var(--text-muted)] dark:focus:border-[var(--heading)]" placeholder="john@example.com" />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-[var(--text)] opacity-60 px-1">Phone Number</label>
                  <input required type="tel" className="w-full bg-cream text-evergreen border border-evergreen/20 p-4 font-body text-sm focus:border-evergreen outline-none transition-colors placeholder-evergreen/40 dark:bg-[var(--bg-alt)] dark:border-[var(--border)] dark:text-[var(--text)] dark:placeholder-[var(--text-muted)] dark:focus:border-[var(--heading)]" placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>
            </section>

            {/* Delivery */}
            <section className="space-y-6">
              <h2 className="font-heading text-xl text-[var(--heading)] uppercase tracking-tight flex items-center gap-3">
                <span className="w-8 h-8 rounded-full border border-[var(--heading)] flex items-center justify-center text-sm text-[var(--heading)] font-semibold">2</span>
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-[var(--text)] opacity-60 px-1">Street Address</label>
                  <input required type="text" className="w-full bg-cream text-evergreen border border-evergreen/20 p-4 font-body text-sm focus:border-evergreen outline-none transition-colors placeholder-evergreen/40 dark:bg-[var(--bg-alt)] dark:border-[var(--border)] dark:text-[var(--text)] dark:placeholder-[var(--text-muted)] dark:focus:border-[var(--heading)]" placeholder="123, Wellness Road" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-[var(--text)] opacity-60 px-1">City</label>
                  <input required type="text" className="w-full bg-cream text-evergreen border border-evergreen/20 p-4 font-body text-sm focus:border-evergreen outline-none transition-colors placeholder-evergreen/40 dark:bg-[var(--bg-alt)] dark:border-[var(--border)] dark:text-[var(--text)] dark:placeholder-[var(--text-muted)] dark:focus:border-[var(--heading)]" placeholder="Mumbai" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-[var(--text)] opacity-60 px-1">State</label>
                  <input required type="text" className="w-full bg-cream text-evergreen border border-evergreen/20 p-4 font-body text-sm focus:border-evergreen outline-none transition-colors placeholder-evergreen/40 dark:bg-[var(--bg-alt)] dark:border-[var(--border)] dark:text-[var(--text)] dark:placeholder-[var(--text-muted)] dark:focus:border-[var(--heading)]" placeholder="Maharashtra" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-[var(--text)] opacity-60 px-1">Pincode</label>
                  <input required type="text" className="w-full bg-cream text-evergreen border border-evergreen/20 p-4 font-body text-sm focus:border-evergreen outline-none transition-colors placeholder-evergreen/40 dark:bg-[var(--bg-alt)] dark:border-[var(--border)] dark:text-[var(--text)] dark:placeholder-[var(--text-muted)] dark:focus:border-[var(--heading)]" placeholder="400001" />
                </div>
              </div>
            </section>

            {hasRx && (
              <div className="bg-amber/5 border border-amber/25 p-6 flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-amber text-[#105232] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold font-body">!</span>
                </div>
                <div>
                  <h4 className="text-[var(--heading)] font-bold text-sm uppercase tracking-wider mb-2 font-body">Prescription Verification</h4>
                  <p className="text-[var(--text)] opacity-70 text-xs font-body leading-relaxed">
                    By proceeding, you acknowledge that items in your cart require a medical consultation. Our registered doctor will review your case via WhatsApp before dispatch.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Summary Side */}
          <div className="lg:col-span-4">
            <div className="bg-[var(--bg-alt)] border border-[var(--border)] p-8 sticky top-32">
              <h2 className="font-heading text-lg text-[var(--heading)] mb-6 uppercase tracking-tight">Your Order</h2>
              
              {/* Line Items Snippet */}
              <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4 mb-8 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-16 h-20 bg-evergreen/5 dark:bg-[var(--bg)] shrink-0 border border-[var(--border)]">
                      {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-[var(--text)] uppercase truncate">{item.name}</h4>
                      <p className="text-[10px] text-[var(--text)] opacity-50 mb-1">Qty: {item.quantity}</p>
                      <p className="text-xs font-bold text-[var(--text)]">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-8 border-t border-[var(--border)] pt-6">
                <div className="flex justify-between font-body text-xs">
                  <span className="text-[var(--text)] opacity-60 uppercase tracking-widest">Subtotal</span>
                  <span className="text-[var(--text)] font-medium">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-body text-xs">
                  <span className="text-[var(--text)] opacity-60 uppercase tracking-widest">Shipping</span>
                  <span className="text-[var(--text)] font-medium">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between font-body text-lg pt-4 border-t border-[var(--border)]">
                  <span className="text-[var(--heading)] font-bold uppercase tracking-widest">Total</span>
                  <span className="text-[var(--heading)] font-bold">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <button 
                disabled={isProcessing}
                className="w-full bg-[var(--bg-dark)] text-[var(--bg)] py-5 font-body font-bold uppercase tracking-[0.2em] text-sm hover:bg-[var(--primary-mid)] transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 dark:bg-[var(--heading)] dark:text-[#0d1f14] dark:hover:bg-[#c9d4c2]"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-cream" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Pay with Razorpay'
                )}
              </button>

              <p className="mt-4 text-[10px] text-center text-[var(--text)] opacity-40 font-body uppercase tracking-widest">
                Payment is encrypted and secure.
              </p>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}
