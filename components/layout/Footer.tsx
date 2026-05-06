import Link from 'next/link'
import { WhatsappLogo } from '@phosphor-icons/react/dist/ssr'
import Button from '@/components/ui/Button'

export default function Footer() {
  return (
    <>
      {/* ── PRE-FOOTER CTA BANNER ────────────────────────────────────────────── */}
      <section className="bg-navy-gradient" aria-labelledby="cta-heading">
        <div className="container-site section-padding text-center">
          <h2
            id="cta-heading"
            className="text-white font-extrabold leading-[1.1] tracking-tight mb-4"
            style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}
          >
            Zero Fees. Zero Fears.
          </h2>
          <p className="text-white/75 text-[18px] font-medium mb-10 max-w-[540px] mx-auto">
            Find your verified property in Abuja, Kaduna, or Minna today.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button variant="primary" href="/listings">
              Browse Listings
            </Button>
            <Link
              href="https://wa.me/2348090892219"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-[1.5px] border-white text-white font-semibold text-[14px] px-7 py-3.5 rounded-btn hover:bg-white/10 transition-colors"
            >
              <WhatsappLogo size={18} weight="fill" aria-hidden="true" />
              Chat With Propa on WhatsApp
            </Link>
          </div>
        </div>
      </section>

      {/* ── MAIN FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="bg-navy relative pt-20 pb-10" role="contentinfo">
        <div className="container-site">
          
          {/* ── TOP: 3 COLUMNS ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-20 mb-20">
            {/* COLUMN 1 */}
            <div>
              <div className="flex items-center gap-2 mb-8">
                <span className="inline-block w-2.5 h-2.5 rounded-sm bg-beige shrink-0" aria-hidden="true" />
                <h3 className="text-white font-bold text-[12px] uppercase tracking-[0.08em]">PAGES</h3>
              </div>
              <ul className="flex flex-col">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'About us', href: '/about' },
                  { label: 'Services', href: '/#services' },
                  { label: 'Blogs', href: '/blogs' },
                  { label: 'Career', href: '/career' },
                  { label: 'Reviews', href: '/reviews' },
                  { label: 'Sell Properties', href: '/sell' },
                  { label: 'Submit Properties', href: '/submit-property' },
                  { label: 'Contact', href: '/contact' },
                ].map((link) => (
                  <li key={link.label} className="border-b border-white/10">
                    <Link href={link.href} className="flex items-center justify-between py-4 text-white hover:text-beige transition-all duration-300 hover:translate-x-1">
                      <span className="text-[15px] font-medium tracking-tight">{link.label}</span>
                      <span className="text-[12px] opacity-80">&gt;</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 2 */}
            <div>
              <div className="flex items-center gap-2 mb-8">
                <span className="inline-block w-2.5 h-2.5 rounded-sm bg-beige shrink-0" aria-hidden="true" />
                <h3 className="text-white font-bold text-[12px] uppercase tracking-[0.08em]">EXPLORE PROPERTIES BY</h3>
              </div>
              <ul className="flex flex-col">
                {[
                  { label: 'Categories', href: '/categories' },
                  { label: 'All Properties', href: '/listings' },
                  { label: 'Neighborhoods', href: '/neighborhood' },
                ].map((link) => (
                  <li key={link.label} className="border-b border-white/10">
                    <Link href={link.href} className="flex items-center justify-between py-4 text-white hover:text-beige transition-all duration-300 hover:translate-x-1">
                      <span className="text-[15px] font-medium tracking-tight">{link.label}</span>
                      <span className="text-[12px] opacity-80">&gt;</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 3 */}
            <div>
              <div className="flex items-center gap-2 mb-8">
                <span className="inline-block w-2.5 h-2.5 rounded-sm bg-beige shrink-0" aria-hidden="true" />
                <h3 className="text-white font-bold text-[12px] uppercase tracking-[0.08em]">CATEGORIES</h3>
              </div>
              <ul className="flex flex-col">
                {[
                  { label: 'Retail Shop', href: '/listings?category=retail' },
                  { label: 'All', href: '/listings' },
                  { label: 'Villa', href: '/listings?category=villa' },
                  { label: 'Single Family Home', href: '/listings?category=single-family' },
                  { label: 'Luxury Homes', href: '/listings?category=luxury' },
                  { label: 'Apartment', href: '/listings?category=apartment' },
                  { label: 'Office Space', href: '/listings?category=office' },
                  { label: 'Commercial', href: '/listings?category=commercial' },
                  { label: 'Land', href: '/listings?category=land' },
                ].map((link) => (
                  <li key={link.label} className="border-b border-white/10">
                    <Link href={link.href} className="flex items-center justify-between py-4 text-white hover:text-beige transition-all duration-300 hover:translate-x-1">
                      <span className="text-[15px] font-medium tracking-tight">{link.label}</span>
                      <span className="text-[12px] opacity-80">&gt;</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── MIDDLE: MASSIVE TEXT & SOCIALS ── */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-16">
            <span
              className="text-beige font-medium leading-none tracking-[-0.04em] whitespace-nowrap"
              style={{ fontSize: 'clamp(50px, 11.5vw, 240px)' }}
            >
              Propabridge
            </span>

            {/* Social Icons 3x2 Grid */}
            <div className="grid grid-cols-3 gap-3 shrink-0 lg:mt-6">
              <Link href="https://www.linkedin.com/company/propabridge" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-[52px] h-[52px] bg-white/5 hover:bg-white/10 border border-white/5 rounded-[14px] flex items-center justify-center transition-colors">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-white"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </Link>
              <Link href="https://www.facebook.com/propabridge" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-[52px] h-[52px] bg-white/5 hover:bg-white/10 border border-white/5 rounded-[14px] flex items-center justify-center transition-colors">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-white"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </Link>
              <Link href="https://www.tiktok.com/@propabridge" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-[52px] h-[52px] bg-white/5 hover:bg-white/10 border border-white/5 rounded-[14px] flex items-center justify-center transition-colors">
                 <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-white"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.25-.9 4.41-2.31 6.04-1.28 1.48-3.07 2.44-4.99 2.82-1.9.36-3.92.2-5.74-.53-1.84-.74-3.39-2.07-4.32-3.82-1.02-1.92-1.35-4.14-.94-6.26.41-2.12 1.54-4.04 3.19-5.41 1.63-1.36 3.65-2.15 5.75-2.22 0 1.34.02 2.68-.01 4.02-1.15.06-2.29.5-3.15 1.25-.86.75-1.35 1.83-1.42 2.98-.05 1.16.34 2.32 1.05 3.2.71.88 1.74 1.45 2.86 1.63 1.11.16 2.28-.01 3.22-.62.94-.61 1.58-1.58 1.76-2.69.17-1.11.02-2.26-.04-3.38v-10.42c-.02-1.81.01-3.62-.02-5.43z"/></svg>
              </Link>
              <Link href="https://www.instagram.com/propabridge" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-[52px] h-[52px] bg-white/5 hover:bg-white/10 border border-white/5 rounded-[14px] flex items-center justify-center transition-colors">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </Link>
              <Link href="https://www.youtube.com/@propabridge" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-[52px] h-[52px] bg-white/5 hover:bg-white/10 border border-white/5 rounded-[14px] flex items-center justify-center transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              </Link>
              <Link href="https://x.com/propabridge" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="w-[52px] h-[52px] bg-white/5 hover:bg-white/10 border border-white/5 rounded-[14px] flex items-center justify-center transition-colors">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </Link>
            </div>
          </div>

          {/* ── BOTTOM: NEWSLETTER & LEGAL ── */}
          <div className="flex flex-col lg:flex-row items-end justify-between gap-10">
            {/* Legal Links */}
            <div className="flex items-center gap-8 order-2 lg:order-1 w-full lg:w-auto mt-4 lg:mt-0">
              <Link href="/privacy" className="text-white font-bold text-[11px] uppercase tracking-wider hover:text-beige transition-colors">
                PRIVACY POLICY
              </Link>
              <Link href="/terms" className="text-white font-bold text-[11px] uppercase tracking-wider hover:text-beige transition-colors">
                TERMS
              </Link>
            </div>

            {/* Newsletter */}
            <div className="w-full max-w-[500px] order-1 lg:order-2 mx-auto lg:mx-0 mr-auto lg:mr-24">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block w-2.5 h-2.5 rounded-sm bg-beige shrink-0" aria-hidden="true" />
                <h3 className="text-white font-bold text-[11px] uppercase tracking-wider">GET FRESH UPDATES</h3>
              </div>
              <form className="flex bg-[#fcfdf8] p-1.5 rounded-btn shadow-sm w-full h-[64px]" action={process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/newsletter/subscribe` : '#'} method="post">
                <input 
                  type="email" 
                  placeholder="jane@propabridge.com" 
                  className="flex-1 min-w-0 bg-transparent px-4 sm:px-6 border-none outline-none text-navy text-[14px] sm:text-[15px] placeholder:text-navy/40 h-full"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-navy shrink-0 text-white font-semibold text-[12px] sm:text-[13px] uppercase tracking-wider px-5 sm:px-8 h-full rounded-btn flex items-center justify-center gap-1.5 sm:gap-2 hover:bg-navy/90 transition-colors"
                >
                  <span className="hidden sm:inline">SUBSCRIBE</span>
                  <span className="sm:hidden">SUBSCRIBE</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="m9 18 6-6-6-6"/></svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
