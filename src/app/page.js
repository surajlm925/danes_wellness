'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Hero from '@/sections/Hero'
import TrustBar from '@/sections/TrustBar'
import dynamic from 'next/dynamic'

const PillarGrid     = dynamic(() => import('@/sections/PillarGrid'))
const BrandStatement = dynamic(() => import('@/sections/BrandStatement'))
const Products       = dynamic(() => import('@/sections/Products'))
const Discover       = dynamic(() => import('@/sections/Discover'))
const Consultation   = dynamic(() => import('@/sections/Consultation'))
const Articles       = dynamic(() => import('@/sections/Articles'))
const Testimonials   = dynamic(() => import('@/sections/Testimonials'))
const Newsletter     = dynamic(() => import('@/sections/Newsletter'))

function SectionReveal({ children, margin = "-40px" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin }}
      transition={{ duration: 0.8, ease: [0.2, 0.6, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  return (
    <main>
      <Hero />
      <SectionReveal margin="-40px"><TrustBar /></SectionReveal>
      <SectionReveal margin="-40px"><PillarGrid /></SectionReveal>
      <SectionReveal margin="-80px"><BrandStatement /></SectionReveal>
      <SectionReveal margin="-80px"><Products /></SectionReveal>
      <SectionReveal margin="-80px"><Discover /></SectionReveal>
      <SectionReveal margin="-80px"><Consultation /></SectionReveal>
      <SectionReveal margin="-60px"><Articles /></SectionReveal>
      <SectionReveal margin="-60px"><Testimonials /></SectionReveal>
      <SectionReveal margin="-60px"><Newsletter /></SectionReveal>
    </main>
  )
}
