'use client'

import React from 'react'
import Link from 'next/link'

export default function PrivacyPage() {
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
          <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--text-muted)] font-body">Privacy Policy</span>
        </div>

        {/* Page Title */}
        <h1 className="font-display text-3xl md:text-4xl text-[var(--heading)] uppercase tracking-widest mb-12 border-b border-[var(--border)] pb-6">
          Privacy Policy
        </h1>

        {/* Content */}
        <div className="font-body text-sm text-[var(--text)] leading-relaxed space-y-8 opacity-90">
          <p>
            At Danes Wellness, we prioritize the privacy and security of our patients and customers. This Privacy Policy documents the types of personal information we collect, how we use it, and the safeguards we have in place to protect it.
          </p>

          <section className="space-y-4">
            <h2 className="font-display text-lg text-[var(--heading)] uppercase tracking-wider pt-4">
              1. Information We Collect
            </h2>
            <p>
              We collect information to provide better services to our users. The types of personal information we collect include:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Contact Information:</strong> Name, shipping address, billing address, email address, and phone number when you place an order or book a consultation.</li>
              <li><strong>Medical Data:</strong> Prescriptions and medical histories uploaded for prescription-grade Ayurvedic (Rx) product gating, which are stored securely and accessed strictly by our registered doctors.</li>
              <li><strong>Usage Information:</strong> Details of your visits to our website, traffic data, and other communication data.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-lg text-[var(--heading)] uppercase tracking-wider pt-4">
              2. How We Use Your Information
            </h2>
            <p>
              We use the collected information for various purposes, including:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Processing and delivering your orders.</li>
              <li>Providing doctor consultations and verifying prescription uploads for gated (Rx) items.</li>
              <li>Communicating with you regarding your orders or consultations via email, phone, or WhatsApp.</li>
              <li>Improving our website functionality and user experience.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-lg text-[var(--heading)] uppercase tracking-wider pt-4">
              3. Data Security and Confidentiality
            </h2>
            <p>
              We implement comprehensive physical, electronic, and administrative procedures to safeguard and secure your personal and medical information. Access to your medical uploads and history is strictly restricted to authorized medical practitioners of Danes Wellness for the purpose of health evaluations. We do not sell, rent, or trade your personal or medical data to third parties.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-lg text-[var(--heading)] uppercase tracking-wider pt-4">
              4. Cookies
            </h2>
            <p>
              Our website uses cookies to enhance your browsing experience. Cookies are small files stored on your computer's hard drive that help us analyze web traffic and allow web applications to respond to you as an individual. You can choose to accept or decline cookies in your browser settings.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-lg text-[var(--heading)] uppercase tracking-wider pt-4">
              5. Contact Us
            </h2>
            <p>
              If you have any questions or concerns regarding this Privacy Policy or your personal information, please reach out to us at:
            </p>
            <p className="font-semibold text-[var(--heading)]">
              Email: support@daneswellness.com<br />
              Address: Danes Medical Solutions, Indiranagar, Bengaluru, India.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
