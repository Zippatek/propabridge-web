import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import { Inter, Nunito_Sans, DM_Sans, Outfit } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import ConditionalFooter from '@/components/layout/ConditionalFooter'
import PropaChatEmbed from '@/components/layout/PropaChatEmbed'
import { PropaChatProvider } from '@/components/layout/PropaChatContext'
import PageTransition from '@/components/PageTransition'
import { PROPA_WIDGET_URL } from '@/lib/env-public'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-inter',
})

// ── Display font candidates for "buy. sell. rent." ────────────────────
//
// Realist uses a font close to Circular Std / GT Walsheim — both paid.
// Key trait: lowercase letters have CURVED/ROUNDED foot terminals (the
// bottom of b, l, u, y curves rather than cutting flat). These three
// Google Fonts match that characteristic most closely:
//
//   Nunito Sans  — rounded terminals on all strokes, very close to Circular
//   DM Sans      — humanist, soft terminals, modern real-estate feel
//   Outfit       — geometric, slightly rounded, Proxima Nova-ish

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-display',           // ← currently active via --font-hero
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-display-alt',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-display-syne',      // reusing same slot name
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

const OG_IMAGE = {
  url: 'https://propabridge.com/logo-circle.jpg',
  width: 400,
  height: 400,
  alt: 'Propabridge — Verified Real Estate in Nigeria',
}

export const metadata: Metadata = {
  title: {
    default: 'Propabridge — Find Verified Homes in Nigeria',
    template: '%s | Propabridge',
  },
  description:
    'Buy, rent, or invest in verified properties across Nigeria. No fake listings. No inspection fees. Every home physically and legally verified — so you move with confidence.',
  keywords: [
    'real estate Nigeria',
    'verified properties Nigeria',
    'buy property Abuja',
    'rent property Nigeria',
    'Kaduna real estate',
    'Minna property',
    'no inspection fees Nigeria',
    'verified homes Abuja',
  ],
  openGraph: {
    title: 'Propabridge — Find Verified Homes in Nigeria',
    description:
      'Buy, rent, or invest with confidence. Every listing physically and legally verified. No fees. No fakes.',
    url: 'https://propabridge.com',
    siteName: 'Propabridge',
    images: [OG_IMAGE],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Propabridge — Find Verified Homes in Nigeria',
    description:
      'Buy, rent, or invest with confidence. Every listing physically and legally verified. No fees. No fakes.',
    images: [OG_IMAGE.url],
  },
  icons: {
    icon: '/logo-circle.jpg',
    apple: '/logo-circle.jpg',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${nunitoSans.variable} ${dmSans.variable} ${outfit.variable}`} data-scroll-behavior="smooth">
      <body className={`${inter.className} antialiased overflow-x-hidden`}>
        <PropaChatProvider widgetUrl={PROPA_WIDGET_URL}>
          <Navbar />
          <main id="main-content" tabIndex={-1}>
            <Suspense fallback={null}>
              <PageTransition>{children}</PageTransition>
            </Suspense>
          </main>
          <ConditionalFooter />
          <PropaChatEmbed />
        </PropaChatProvider>
      </body>
    </html>
  )
}
