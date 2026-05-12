const fs = require('fs')
const path = require('path')

const dir = path.join(__dirname, 'src/sections')
const files = fs.readdirSync(dir)

for (const file of files) {
  if (!file.endsWith('.jsx')) continue
  let content = fs.readFileSync(path.join(dir, file), 'utf8')
  
  // Basic react conversion
  content = content.replace(/const (\w+)\s*=\s*\(\)\s*=>\s*\(/g, "export default function $1() {\n  return (")
  // Replace the closing `);` of the component
  content = content.replace(/\);\s*window\.\w+\s*=\s*\w+;/g, "  )\n}")
  // Add use client
  if (!content.includes("'use client'")) {
    content = "'use client'\nimport { motion } from 'framer-motion'\n" + content
  }
  
  fs.writeFileSync(path.join(dir, file), content)
}

// Generate page.js
const pageContent = `'use client'
import Hero from '@/sections/Hero'
import TrustBar from '@/sections/TrustBar'
import PillarGrid from '@/sections/PillarGrid'
import BrandStatement from '@/sections/BrandStatement'
import Products from '@/sections/Products'
import Discover from '@/sections/Discover'
import Consultation from '@/sections/Consultation'
import Articles from '@/sections/Articles'
import Testimonials from '@/sections/Testimonials'
import Newsletter from '@/sections/Newsletter'

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <PillarGrid />
      <BrandStatement />
      <Products />
      <Discover />
      <Consultation />
      <Articles />
      <Testimonials />
      <Newsletter />
    </main>
  )
}
`
fs.writeFileSync(path.join(__dirname, 'src/app/page.js'), pageContent)
