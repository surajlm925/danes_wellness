'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function ConsultationPage() {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

  // Generate next 5 days dynamically starting from today
  const getDates = () => {
    const dates = []
    const options = { weekday: 'short', day: 'numeric', month: 'short' }
    for (let i = 0; i < 5; i++) {
      const d = new Date()
      d.setDate(d.getDate() + i)
      dates.push({
        value: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        label: d.toLocaleDateString('en-IN', options)
      })
    }
    return dates
  }

  const times = ['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM']

  const dates = getDates()

  const handleWhatsAppRedirect = (e) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime) return

    const message = `Hi Danes Wellness, I would like to book a doctor consultation on ${selectedDate} at ${selectedTime}.`
    const waUrl = `https://wa.me/917899423033?text=${encodeURIComponent(message)}`
    window.open(waUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] pt-40 pb-20 px-6 transition-colors duration-300">
      <div className="container-danes max-w-[1000px] mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="text-[var(--text)] opacity-60 hover:opacity-100 transition-opacity flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[10px] uppercase tracking-widest font-bold font-body">Back to Home</span>
          </Link>
          <div className="h-[1px] flex-1 bg-[var(--border)]" />
          <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--text-muted)] font-body">Medical Consultation</span>
        </div>

        {/* Page Header */}
        <div className="mb-16 text-center max-w-2xl mx-auto space-y-4">
          <h1 className="font-display text-3xl md:text-4xl text-[var(--heading)] uppercase tracking-widest">
            Doctor Consultations
          </h1>
          <p className="font-body text-xs md:text-sm text-[var(--text-muted)] uppercase tracking-wider leading-relaxed">
            AYUSH-Licensed Practitioners &bull; Endocannabinoid Mapping &bull; Personalized Protocols
          </p>
        </div>

        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-16 items-start">
          {/* Left: Explainer Section (6 cols) */}
          <div className="lg:col-span-6 space-y-12">
            <section className="space-y-4">
              <h2 className="font-display text-xl text-[var(--heading)] uppercase tracking-wider">
                Our Holistic Consultation Process
              </h2>
              <p className="text-sm text-[var(--text)] opacity-80 leading-relaxed font-body">
                At Danes Wellness, we do not believe in one-size-fits-all prescriptions. Hemp-derived formulations interact with the Endocannabinoid System (ECS)—the complex biological network governing sleep, anxiety, chronic pain, and digestion. Our medical team guides you through a detailed analysis to optimize your clinical outcome.
              </p>
            </section>

            {/* Steps list */}
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <span className="w-8 h-8 rounded-full border border-[var(--heading)] flex items-center justify-center text-xs text-[var(--heading)] font-bold font-body shrink-0">1</span>
                <div className="space-y-2">
                  <h3 className="font-display text-sm text-[var(--heading)] uppercase tracking-wider">
                    Pre-Consultation Mapping
                  </h3>
                  <p className="text-xs text-[var(--text)] opacity-70 leading-relaxed font-body">
                    Complete your health profile. Outline your concerns (chronic insomnia, persistent joint pain, migraine, or anxiety) and symptoms. If purchasing prescription (Rx) products, this serves as your clinical registration.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <span className="w-8 h-8 rounded-full border border-[var(--heading)] flex items-center justify-center text-xs text-[var(--heading)] font-bold font-body shrink-0">2</span>
                <div className="space-y-2">
                  <h3 className="font-display text-sm text-[var(--heading)] uppercase tracking-wider">
                    Biological Diagnostics
                  </h3>
                  <p className="text-xs text-[var(--text)] opacity-70 leading-relaxed font-body">
                    Engage in a direct consultation with our AYUSH-registered practitioners. We map your symptom severity to your internal biological systems, reviewing your medical reports and previous treatment regimes.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <span className="w-8 h-8 rounded-full border border-[var(--heading)] flex items-center justify-center text-xs text-[var(--heading)] font-bold font-body shrink-0">3</span>
                <div className="space-y-2">
                  <h3 className="font-display text-sm text-[var(--heading)] uppercase tracking-wider">
                    Personalized Dosing & Follow-up
                  </h3>
                  <p className="text-xs text-[var(--text)] opacity-70 leading-relaxed font-body">
                    Receive your customized dosage protocol directly on WhatsApp. This includes standard administration timings, complementary stacks (such as adaptogens or mushrooms), dietary advice, and scheduled follow-ups to track your recovery.
                  </p>
                </div>
              </div>
            </div>

            {/* Note box */}
            <div className="bg-amber/5 border border-amber/25 p-6 flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full bg-amber text-[#105232] flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold font-body">!</span>
              </div>
              <div className="space-y-2">
                <h4 className="text-[var(--heading)] font-bold text-xs uppercase tracking-widest font-body">Ayurvedic Gating Compliance</h4>
                <p className="text-[var(--text)] opacity-70 text-xs font-body leading-relaxed">
                  In compliance with AYUSH regulations, prescription-grade hemp leaf extract products (tagged as **Rx** in our catalog) require doctor verification before shipping. Consultation with our doctors is completely free of charge.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Slot Booking Widget (4 cols) */}
          <div className="lg:col-span-4 bg-[var(--bg-alt)] border border-[var(--border)] p-6 md:p-8 rounded-sm sticky top-32 space-y-6 shadow-sm transition-colors duration-300">
            <h2 className="font-display text-lg text-[var(--heading)] uppercase tracking-wider border-b border-[var(--border)] pb-3">
              Schedule Slot
            </h2>

            <form onSubmit={handleWhatsAppRedirect} className="space-y-6">
              {/* Select Date */}
              <div className="space-y-3">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--text-muted)] block">
                  Select Date
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2">
                  {dates.map((dt) => (
                    <button
                      type="button"
                      key={dt.value}
                      onClick={() => setSelectedDate(dt.value)}
                      className={`py-2 px-3 text-[10px] uppercase font-bold tracking-wider border transition-all ${
                        selectedDate === dt.value
                          ? 'bg-[#105232] dark:bg-[var(--heading)] border-[#105232] dark:border-[var(--heading)] text-white dark:text-[#0d1f14]'
                          : 'border-[var(--border)] text-[var(--text)] bg-transparent hover:border-[var(--heading)]'
                      }`}
                    >
                      {dt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Time */}
              <div className="space-y-3">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--text-muted)] block">
                  Select Time Slot
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {times.map((tm) => (
                    <button
                      type="button"
                      key={tm}
                      onClick={() => setSelectedTime(tm)}
                      className={`py-2 px-3 text-[10px] uppercase font-bold tracking-wider border transition-all ${
                        selectedTime === tm
                          ? 'bg-[#105232] dark:bg-[var(--heading)] border-[#105232] dark:border-[var(--heading)] text-white dark:text-[#0d1f14]'
                          : 'border-[var(--border)] text-[var(--text)] bg-transparent hover:border-[var(--heading)]'
                      }`}
                    >
                      {tm}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={!selectedDate || !selectedTime}
                className="w-full bg-[var(--bg-dark)] text-white py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-[#105232] dark:bg-[var(--heading)] dark:text-[#0d1f14] dark:hover:bg-[#c9d4c2] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
                Book via WhatsApp
              </button>

              <p className="text-[9px] text-center text-[var(--text-muted)] uppercase tracking-wider leading-normal pt-2">
                Booking redirects to WhatsApp for clinical support validation.
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
