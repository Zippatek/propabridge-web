import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-inter',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: {
    default: 'Propabridge — Verified Real Estate in Nigeria | Zero Fees. Zero Fears.',
    template: '%s | Propabridge',
  },
  description:
    'The smartest way to rent, buy and invest in properties in Nigeria. Zero inspection fees. Zero fake listings. Physical + legal verification on every listing.',
  keywords: [
    'real estate Nigeria',
    'verified properties Abuja',
    'buy property Nigeria',
    'rent property Abuja',
    'Kaduna property',
    'Minna real estate',
  ],
  openGraph: {
    title: "Propabridge — Nigeria's Verification-First Real Estate Platform",
    description: 'Zero Fees. Zero Fears. Find verified homes in Abuja, Kaduna & Minna.',
    url: 'https://propabridge.com',
    siteName: 'Propabridge',
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Propabridge — Verified Real Estate in Nigeria',
    description: 'Zero Fees. Zero Fears. Find verified homes in Abuja, Kaduna & Minna.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth">
      <body className={`${inter.className} antialiased overflow-x-hidden`}>
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
