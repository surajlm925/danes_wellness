'use client'

import React from 'react'
import Link from 'next/link'

export default function RefundPage() {
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
          <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--text-muted)] font-body">Refund & Return Policy</span>
        </div>

        {/* Page Title */}
        <h1 className="font-display text-3xl md:text-4xl text-[var(--heading)] uppercase tracking-widest mb-12 border-b border-[var(--border)] pb-6">
          Refund & Return Policy
        </h1>

        {/* Content */}
        <div className="font-body text-sm text-[var(--text)] leading-relaxed space-y-8 opacity-90">
          <p>
            At Danes Wellness, we aim to ensure the highest standards of safety, quality, and efficacy for all our hemp-based Ayurvedic formulations. Please read our guidelines on shipping, returns, and refunds below.
          </p>

          <section className="space-y-4">
            <h2 className="font-display text-lg text-[var(--heading)] uppercase tracking-wider pt-4">
              1. Returns and Cancellations
            </h2>
            <p>
              Due to the health, hygiene, and Rx gating standards associated with our medical wellness products, we are unable to accept returns of opened, used, or unsealed items once they have been delivered.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Cancellations:</strong> You can request an order cancellation within 2 hours of placing the order or before the order is dispatched (whichever is earlier) by contacting our customer support.</li>
              <li><strong>Rx Gating Cancellations:</strong> If you place an order for a gated Rx product and are unable to provide a valid prescription or do not wish to complete our free doctor consultation, your order will be cancelled and a full refund will be processed.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-lg text-[var(--heading)] uppercase tracking-wider pt-4">
              2. Damaged or Incorrect Items
            </h2>
            <p>
              If you receive an item that is damaged, leaking, broken, or incorrect (different from what you ordered), we will issue a replacement or a full refund.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Please contact our support team at <a href="mailto:support@daneswellness.com" className="text-amber underline">support@daneswellness.com</a> or via WhatsApp (+91 78994 23033) within 48 hours of delivery.</li>
              <li>Please provide your Order ID along with photographic evidence or an unboxing video showing the packaging damage or mismatch.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-lg text-[var(--heading)] uppercase tracking-wider pt-4">
              3. Refund Processing
            </h2>
            <p>
              Once a cancellation or return refund is approved, it will be processed and credited back to your original payment method (Razorpay, credit/debit card, net banking, or UPI) within 5 to 7 working days, subject to your bank's policies.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-lg text-[var(--heading)] uppercase tracking-wider pt-4">
              4. Shipping Policies
            </h2>
            <p>
              We ship to all major cities across India. Standard orders are dispatched within 24 to 48 hours of payment verification (or prescription approval for Rx items). Delivery typically takes between 3 to 5 business days depending on the region. Shipping is free on orders above ₹999; orders below this threshold attract a flat shipping charge of ₹99.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-lg text-[var(--heading)] uppercase tracking-wider pt-4">
              5. Contact Support
            </h2>
            <p>
              For any help related to shipping, tracking, returns, or refunds, please reach out to us:
            </p>
            <p className="font-semibold text-[var(--heading)]">
              Email: support@daneswellness.com<br />
              WhatsApp Support: +91 78994 23033
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
