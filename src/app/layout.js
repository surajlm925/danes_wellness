import './globals.css'
import { ThemeProvider } from 'next-themes'
import LenisProvider from '@/components/LenisProvider'

export const metadata = {
  title: 'Danes — Natural Curatives',
  description: "India's first hemp wellness clinic. Indiranagar, Bengaluru.",
}

import Nav from '@/components/Nav'
import dynamic from 'next/dynamic'

const Footer = dynamic(() => import('@/components/Footer'))

import PageTransition from '@/components/PageTransition'

import { CartProvider } from '@/context/CartContext'

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="danes-theme"
        >
          <CartProvider>
            <LenisProvider>
              <Nav />
              <PageTransition>
                {children}
              </PageTransition>

              <Footer />
            </LenisProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
