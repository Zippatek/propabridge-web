import Image from 'next/image'
import {
  ChartLine,
  Camera,
  MegaphoneSimple,
  ChatCircleDots,
  Handshake,
} from '@phosphor-icons/react/dist/ssr'

const PERKS = [
  {
    id: 'valuation',
    icon: ChartLine,
    title: 'Valuation',
    desc: 'Smart valuation opinion',
  },
  {
    id: 'presentation',
    icon: Camera,
    title: 'Presentation',
    desc: 'Polished visuals & optimized listings make your property stand out.',
  },
  {
    id: 'marketing',
    icon: MegaphoneSimple,
    title: 'Smart Marketing',
    desc: 'AI-driven matching that puts your property directly in front of active, ready-to-pay buyers.',
  },
  {
    id: 'updates',
    icon: ChatCircleDots,
    title: 'Updates',
    desc: 'Real-time feedback and transparent communication. No ghosting.',
  },
  {
    id: 'negotiation',
    icon: Handshake,
    title: 'Negotiation',
    desc: 'Expert negotiation and closing support.',
  },
]

export default function WhySellWithUs() {
  return (
    <section className="bg-beige section-pb" aria-labelledby="why-sell-heading">

      {/* ── DIVIDER ── */}
      <hr className="border-t border-grey-light mx-6 mb-16" aria-hidden="true" />

      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8 items-start">

          {/* ── COL 1: Heading + stat card ── */}
          <div className="flex flex-col gap-8">
            {/* Badge */}
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-sm bg-navy shrink-0" aria-hidden="true" />
              <p className="text-[11px] font-bold text-navy uppercase tracking-[0.1em]">Why Sell With Us</p>
            </div>

            {/* Display heading */}
            <h2
              id="why-sell-heading"
              className="text-navy font-medium leading-[1.1] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
            >
              Selling your property in Nigeria, made simple. We&apos;ve fixed the problem of unreliable agents and fake listings.
            </h2>

            {/* Stat card */}
            <div className="bg-white rounded-[20px] p-8 shadow-card">
              <p className="text-navy font-black leading-none tracking-[-0.04em]" style={{ fontSize: 'clamp(52px, 6vw, 80px)' }}>
                100%
              </p>
              <p className="text-grey text-[14px] leading-[1.5] mt-3 max-w-[220px]">
                Every buyer we bring is pre-qualified by Propa before they reach you
              </p>
            </div>
          </div>

          {/* ── COL 2: Photo card ── */}
          <div className="relative rounded-[20px] overflow-hidden aspect-[3/4] shadow-card">
            <Image
              src="https://storage.googleapis.com/propabridge-listings-us/agents/propabridge-team/00cc8bac9257.webp"
              alt="Two Nigerian real estate professionals reviewing a property together"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
            {/* Dark gradient overlay from bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#001a40]/85 via-[#001a40]/30 to-transparent" />

            {/* Top overlay: 100% stat */}
            <div className="absolute top-6 left-6">
              <p className="text-white font-black leading-none" style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}>
                100%
              </p>
              <p className="text-white/80 text-[13px] font-medium mt-1">
                Pre-screened and verified buyers/renters.
              </p>
            </div>

            {/* Bottom caption */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-white text-[15px] font-medium leading-[1.5]">
                Our expert background as Tech and Real Estate Professionals ensure your property reaches the right buyers — fast.
              </p>
            </div>
          </div>

          {/* ── COL 3: Perks list ── */}
          <div className="flex flex-col gap-1">
            <p className="text-navy font-bold text-[15px] mb-6">When you list with us, you get:</p>
            <div className="flex flex-col gap-6">
              {PERKS.map((perk) => {
                const Icon = perk.icon
                return (
                  <div key={perk.id} className="flex items-start gap-4">
                    {/* Icon box */}
                    <div className="shrink-0 w-[40px] h-[40px] rounded-btn border border-navy/15 flex items-center justify-center bg-navy shadow-sm">
                      <Icon size={18} weight="regular" className="text-white" />
                    </div>
                    <div>
                      <p className="text-navy font-bold text-[15px] leading-snug">{perk.title}</p>
                      <p className="text-grey text-[13px] leading-[1.55] mt-0.5">{perk.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
