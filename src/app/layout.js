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
const FloatingCTA = dynamic(() => import('@/components/FloatingCTA'))
import PageTransition from '@/components/PageTransition'

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="danes-theme"
        >
          <LenisProvider>
            <Nav />
            <PageTransition>
              {children}
            </PageTransition>
            <FloatingCTA />
            <Footer />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
