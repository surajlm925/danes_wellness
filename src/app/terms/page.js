'use client'

import React from 'react'
import Link from 'next/link'

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] pt-40 pb-20 px-6 transition-colors duration-300">
      <div className="container-danes max-w-[900px] mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="text-[var(--text)] opacity-60 hover:opacity-100 transition-opacity flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[10px] uppercase tracking-widest font-bold font-body">Back to Home</span>
          </Link>
          <div className="h-[1px] flex-1 bg-[var(--border)]" />
          <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--text-muted)] font-body">Terms of Service</span>
        </div>

        {/* Page Title */}
        <h1 className="font-display text-3xl md:text-4xl text-[var(--heading)] uppercase tracking-widest mb-12 border-b border-[var(--border)] pb-6">
          Terms of Service
        </h1>

        {/* Content */}
        <div className="font-body text-sm text-[var(--text)] leading-relaxed space-y-8 opacity-90">
          <p>
            Welcome to Danes Wellness. By accessing or using our website and purchasing our services or products, you agree to comply with and be bound by the following Terms of Service. Please review them carefully.
          </p>

          <section className="space-y-4">
            <h2 className="font-display text-lg text-[var(--heading)] uppercase tracking-wider pt-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing this website, you agree to these Terms of Service, all applicable laws, and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-lg text-[var(--heading)] uppercase tracking-wider pt-4">
              2. Medical Consultation and Prescription gating
            </h2>
            <p>
              Danes Wellness provides access to proprietary hemp-based Ayurvedic formulations, some of which are licensed under AYUSH and categorized as prescription-only medicines (Rx).
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Purchases of gated Rx products require the upload of a valid medical prescription or completion of a consultation with our registered in-house medical practitioners.</li>
              <li>Consultations provided by our doctors are for general diagnostic and support purposes. They are not a replacement for emergency clinical care or specialized physical diagnostics.</li>
              <li>You agree to provide accurate, honest, and complete medical details when filling out questionnaires or conversing with our doctors.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-lg text-[var(--heading)] uppercase tracking-wider pt-4">
              3. User Accounts and Verification
            </h2>
            <p>
              To access certain dashboard features (e.g. order tracking, medical uploads), you may be required to register an account. You are responsible for maintaining the confidentiality of your credentials and account files, and you agree to accept responsibility for all activities that occur under your account.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-lg text-[var(--heading)] uppercase tracking-wider pt-4">
              4. Product Pricing and Availability
            </h2>
            <p>
              All prices shown on the website are in Indian Rupees (INR) and are subject to change without notice. We reserve the right to modify or discontinue any product or service at any time. We make every effort to display product colors and packaging as accurately as possible, but cannot guarantee your device's screen will perfectly represent the actual products.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-lg text-[var(--heading)] uppercase tracking-wider pt-4">
              5. Intellectual Property
            </h2>
            <p>
              The content, visual art, layouts, trademarks, logos, and digital designs of Danes Wellness are protected by copyright and intellectual property laws. You may not reproduce, distribute, modify, or reuse any design elements or content from this site without our express prior written consent.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-lg text-[var(--heading)] uppercase tracking-wider pt-4">
              6. Governing Law
            </h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of India, and any disputes arising out of or related to your use of this site shall be subject to the exclusive jurisdiction of the courts of Bengaluru, Karnataka.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
