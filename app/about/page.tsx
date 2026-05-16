import type { Metadata } from 'next'
import { AboutHero } from "@/components/sections/about/AboutHero";

export const metadata: Metadata = {
  title: 'About Propabridge — Verified Real Estate in Nigeria',
  description:
    'Propabridge is Nigeria\'s first curated, verification-first property platform. We physically inspect every listing, check every title document, and charge zero inspection fees.',
  keywords: ['about Propabridge', 'Nigeria real estate company', 'verified property platform Nigeria', 'Abuja real estate agency'],
  openGraph: {
    title: 'About Propabridge — Verified Real Estate in Nigeria',
    description: 'We physically inspect every listing, check every title document, and charge zero inspection fees. Real estate done right.',
    url: 'https://propabridge.com/about',
    siteName: 'Propabridge',
    images: [{ url: 'https://propabridge.com/logo-circle.jpg', width: 400, height: 400 }],
    type: 'website',
  },
}
import { AboutMission } from "@/components/sections/about/AboutMission";
import { AboutProblem } from "@/components/sections/about/AboutProblem";
import { AboutCompany } from "@/components/sections/about/AboutCompany";
import { AboutHistory } from "@/components/sections/about/AboutHistory";
import { AboutDifferences } from "@/components/sections/about/AboutDifferences";
import { AboutValues } from "@/components/sections/about/AboutValues";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f4f3ea]">
      <AboutHero />
      <div className="relative pt-12 pb-24 md:pt-16 md:pb-32 bg-[#f4f3ea]">
        {/* Background grid pattern */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
        <div className="relative z-10 flex flex-col gap-24 lg:gap-32">
          <AboutMission />
          <AboutProblem />
          <AboutCompany />
          <AboutHistory />
          <AboutDifferences />
          <AboutValues />
        </div>
      </div>
    </main>
  );
}
