import Image from 'next/image'
import SellValuationForm from './SellValuationForm'
import { HERO_IMAGES } from '@/lib/bucket'

export default function SellHero() {
  return (
    <section
      className="relative -mt-[84px] bg-beige"
      aria-labelledby="sell-hero-heading"
      style={{
        backgroundImage: 'linear-gradient(rgba(0,26,64,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,26,64,0.04) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    >

      {/* ── DARK HERO BACKGROUND (stops exactly halfway down the 'Property type' field) ── */}
      <div className="relative pt-[110px] pb-[280px] lg:pt-[120px] lg:pb-[320px]">
        {/* Background image + overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_IMAGES.sellHero}
            alt=""
            fill
            className="object-cover object-center"
            priority
            aria-hidden="true"
          />
          {/* Navy tinted overlay */}
          <div className="absolute inset-0 bg-[#001a40]/65" />
        </div>

        {/* ── HERO TEXT — centered ── */}
        <div className="relative z-10 container-site flex flex-col items-center text-center">
          <h1
            id="sell-hero-heading"
            className="text-display-xl text-[#f0efeb] font-medium font-sans mb-3 w-full max-w-[900px]"
          >
            Sell your home smarter, faster, and with less stress.
          </h1>
          <p className="text-white/80 text-center text-[15px] lg:text-[16px] leading-[1.6] w-full max-w-[900px]">
            We filter out the noise. By combining expert valuation, AI matchmaking, and high-impact marketing,<br className="hidden md:block" />
            we help you sell or rent your property to serious clients—without the hassle of unverified agents.
          </p>
        </div>
      </div>

      {/* ── FORM CARD — straddles the dark bg and the beige grid bg ── */}
      <div className="relative z-20 container-site -mt-[250px] lg:-mt-[270px] pb-12 lg:pb-16">
        <div className="flex justify-center">
          <div
            className="w-full max-w-[640px] bg-white/75 backdrop-blur-xl border border-white/20 rounded-[20px] p-6 sm:p-8 lg:p-10 shadow-[0_8px_48px_rgba(0,0,0,0.15)]"
          >
            <SellValuationForm />
          </div>
        </div>
      </div>

    </section>
  )
}
