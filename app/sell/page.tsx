import type { Metadata } from 'next'
import SellHero from '@/components/sections/sell/SellHero'
import WhySellWithUs from '@/components/sections/sell/WhySellWithUs'
import SellingProcess from '@/components/sections/sell/SellingProcess'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import SellFAQ from '@/components/sections/sell/SellFAQ'
import SoldPropertiesCTA from '@/components/sections/sell/SoldPropertiesCTA'

export const metadata: Metadata = {
  title: 'Sell Your Property | Propabridge — Zero Fees. Zero Fears.',
  description:
    'Sell or rent your property in Abuja, Kaduna, and Minna with Propabridge. Expert valuation, AI-matched buyers, zero upfront fees. Get your free property valuation today.',
  keywords: [
    'sell property Nigeria', 'sell house Abuja', 'property valuation Nigeria',
    'rent out property Abuja', 'property agent Kaduna', 'real estate agent Nigeria',
    'free property valuation Abuja', 'sell house fast Nigeria',
  ],
  openGraph: {
    title: 'Sell Your Property | Propabridge',
    description:
      'Get a free valuation and connect with pre-qualified buyers through Nigeria\'s verification-first real estate platform.',
    type: 'website',
  },
}

export default function SellPage() {
  return (
    <main>
      {/* 1. Hero — dark background + floating valuation form */}
      <SellHero />

      {/* 2. Why Sell With Us — 3-column layout */}
      <div className="bg-beige pt-8 lg:pt-16">
        <WhySellWithUs />
      </div>

      {/* 3. Selling Process — 5-step accordion */}
      <SellingProcess />

      {/* 4. Reviews Carousel — reused with sell-specific heading */}
      <TestimonialsSection heading="Stories from people who sold their place with us" />

      {/* 5. FAQ — sell-specific questions */}
      <SellFAQ />

      {/* 6. Sold Properties CTA */}
      <SoldPropertiesCTA />
    </main>
  )
}
