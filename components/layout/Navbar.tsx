'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { List, X, CaretDown, CaretRight, ArrowRight, HouseSimple } from '@phosphor-icons/react'
import { NavLink } from '@/lib/types'
import { cn } from '@/lib/cn'

const NAV_LINKS: NavLink[] = [
  { label: 'ABOUT', href: '/about' },
  {
    label: 'LISTINGS',
    href: '/listings',
    children: [
      { label: 'All Properties', href: '/listings' },
      { label: 'For Sale', href: '/listings?status=FOR+SALE' },
      { label: 'For Rent', href: '/listings?status=FOR+RENT' },
      { label: 'Off-Plan', href: '/listings?status=OFF-PLAN' },
    ],
  },
  { label: 'SELL', href: '/sell' },
  { label: 'SUBMIT PROPERTY', href: '/submit-property' },
  { label: 'BLOGS', href: '/blogs' },
  { label: 'REVIEWS', href: '/reviews' },
  { label: 'CONTACT', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      {/* Blurred Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileOpen(false)}
        aria-hidden={!mobileOpen}
      />

      <header
        className={cn(
          'fixed top-3 left-4 right-4 z-50 bg-[#fcfdf8] rounded-[24px] transition-all duration-500 ease-in-out overflow-hidden lg:overflow-visible flex flex-col',
          scrolled && !mobileOpen ? 'shadow-[0_4px_24px_rgba(0,0,0,0.12)]' : 'shadow-[0_2px_12px_rgba(0,0,0,0.08)]',
          mobileOpen ? 'max-h-[850px]' : 'max-h-[72px]'
        )}
        role="banner"
      >
        <div className="w-full flex items-center h-[72px] shrink-0 px-4 lg:px-6">
          {/* Logo */}
          <div className="flex flex-1 justify-start">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue focus-visible:outline-offset-2 rounded-sm shrink-0"
              aria-label="Propabridge — home"
            >
              <div className="flex items-center justify-center w-6 h-6 lg:w-7 lg:h-7 bg-navy rounded-[6px] shrink-0">
                <HouseSimple size={14} className="lg:hidden" color="white" weight="fill" aria-hidden="true" />
                <HouseSimple size={16} className="hidden lg:block" color="white" weight="fill" aria-hidden="true" />
              </div>
              <span className="font-extrabold text-blue text-[18px] lg:text-[20px] tracking-tight leading-none">
                PROPA
              </span>
              <span className="font-normal text-navy text-[18px] lg:text-[20px] tracking-tight leading-none">
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center justify-center gap-1 xl:gap-3" aria-label="Main navigation">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1 text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors rounded-btn px-3 py-1.5 whitespace-nowrap",
                      activeDropdown === link.label ? "bg-beige" : "bg-transparent",
                      (pathname?.startsWith('/listings') || pathname?.startsWith('/properties-details')) && link.label === 'LISTINGS'
                        ? "text-blue"
                        : "text-navy hover:text-[#6b7280]"
                    )}
                    aria-haspopup="true"
                    aria-expanded={activeDropdown === link.label}
                  >
                    {link.label}
                    <CaretDown size={12} weight="bold" className={cn("transition-transform", activeDropdown === link.label && "rotate-180")} aria-hidden="true" />
                  </Link>
                  {activeDropdown === link.label && link.label === 'LISTINGS' && (
                    <div
                      className="fixed top-[96px] left-4 right-4 w-auto bg-beige rounded-[16px] shadow-[0_20px_40px_rgba(0,0,0,0.2)] p-6 z-50 flex gap-6 cursor-default before:absolute before:-top-8 before:left-0 before:w-full before:h-8 before:bg-transparent"
                      onMouseEnter={() => setActiveDropdown(link.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Column 1 */}
                      <Link href="/listings" className="flex-1 flex flex-col group/col cursor-pointer" onClick={() => setActiveDropdown(null)}>
                        <div className="relative w-full aspect-[16/7] rounded-[12px] overflow-hidden mb-4">
                          <Image src="/images/menu/house_in_field.png" alt="All Properties" fill className="object-cover transition-transform duration-500 group-hover/col:scale-105" />
                        </div>
                        <h3 className="text-gray font-semibold text-[18px] mb-1.5 transition-colors">All Properties</h3>
                        <p className="text-gray/70 text-[14px] leading-relaxed mb-4 flex-grow">Browse everything we&apos;ve verified and uploaded, from self-contains to luxury homes.</p>
                        <div className="text-gray font-semibold text-[13px] uppercase tracking-wider flex items-center gap-1 group-hover/col:gap-2 transition-all mt-auto">
                          SEE ALL LISTINGS <CaretRight size={12} weight="bold" />
                        </div>
                      </Link>

                      {/* Column 2 */}
                      <Link href="/neighborhood" className="flex-1 flex flex-col group/col cursor-pointer" onClick={() => setActiveDropdown(null)}>
                        <div className="relative w-full aspect-[16/7] rounded-[12px] overflow-hidden mb-4">
                          <Image src="/images/menu/rainy_city_street.png" alt="Neighborhoods" fill className="object-cover transition-transform duration-500 group-hover/col:scale-105" />
                        </div>
                        <h3 className="text-gray font-semibold text-[18px] mb-1.5 transition-colors">Neighborhoods</h3>
                        <p className="text-gray/70 text-[14px] leading-relaxed mb-4 flex-grow">Discover local communities, lifestyle perks, and what makes each area special.</p>
                        <div className="text-gray font-semibold text-[13px] uppercase tracking-wider flex items-center gap-1 group-hover/col:gap-2 transition-all mt-auto">
                          EXPLORE AREAS <CaretRight size={12} weight="bold" />
                        </div>
                      </Link>

                      {/* Column 3 */}
                      <Link href="/listings?type=all" className="flex-1 flex flex-col group/col cursor-pointer" onClick={() => setActiveDropdown(null)}>
                        <div className="relative w-full aspect-[16/7] rounded-[12px] overflow-hidden mb-4">
                          <Image src="/images/menu/men_in_suits.png" alt="Property Types" fill className="object-cover transition-transform duration-500 group-hover/col:scale-105" />
                        </div>
                        <h3 className="text-gray font-semibold text-[18px] mb-1.5 transition-colors">Property Types</h3>
                        <p className="text-gray/70 text-[14px] leading-relaxed mb-4 flex-grow">Flat · Duplex · Detached · Bungalow<br />· Land · Shortlet · Commercial</p>
                        <div className="text-gray font-semibold text-[13px] uppercase tracking-wider flex items-center gap-1 group-hover/col:gap-2 transition-all mt-auto">
                          EXPLORE TYPES <CaretRight size={12} weight="bold" />
                        </div>
                      </Link>
                    </div>
                  )}
                  {activeDropdown === link.label && link.label !== 'LISTINGS' && (
                    <div
                      className="absolute top-full left-0 mt-2 w-52 bg-[#fcfdf8] rounded-panel shadow-card py-2 z-50"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2.5 text-[14px] text-navy hover:bg-beige hover:text-blue transition-colors"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "flex items-center text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors rounded-btn px-3.5 py-2 whitespace-nowrap",
                    pathname === link.href || (pathname?.startsWith(link.href) && link.href !== '/')
                      ? "bg-beige text-navy"
                      : "text-navy hover:bg-beige hover:text-[#6b7280]"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA + Mobile Trigger */}
          <div className="flex flex-1 items-center justify-end gap-3 shrink-0">
            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center justify-center gap-2 bg-[#006aff] text-white font-semibold text-[14px] px-6 py-3 rounded-[12px] hover:bg-blue-hover transition-colors whitespace-nowrap"
            >
              CHAT WITH PROPA
              <ArrowRight size={14} weight="bold" aria-hidden="true" />
            </Link>

            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-panel text-navy hover:bg-beige transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileOpen ? (
                <X size={20} weight="regular" aria-hidden="true" className="text-gray-400 hover:text-navy" />
              ) : (
                <List size={24} weight="regular" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Links (rendered inside the expanding header) */}
        <div
          className={cn(
            "lg:hidden flex flex-col items-center px-6 transition-opacity duration-300",
            mobileOpen ? "opacity-100 delay-100" : "opacity-0"
          )}
        >
          <nav className="flex flex-col items-center py-6 gap-6 w-full border-t border-navy/5" aria-label="Mobile navigation">
            {[
              { label: 'ABOUT', href: '/about' },
              { label: 'ALL PROPERTIES', href: '/listings' },
              { label: 'NEIGHBORHOODS', href: '/neighborhood' },
              { label: 'AGENTS', href: '/agents' },
              { label: 'SELL', href: '/sell' },
              { label: 'REVIEWS', href: '/reviews' },
              { label: 'SUBMIT PROPERTY', href: '/submit-property' },
              { label: 'BLOGS', href: '/blogs' },
              { label: 'CONTACT', href: '/contact' }
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-navy font-bold text-[13px] uppercase tracking-[0.08em] hover:text-blue transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Bottom CTA */}
          <div className="w-full pb-8 pt-2 flex justify-center">
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 bg-[#006aff] text-white font-bold text-[13px] px-8 py-3.5 rounded-btn shadow-md hover:bg-[#0052cc] transition-colors"
            >
              CHAT WITH PROPA
              <CaretRight size={14} weight="bold" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </header>

      {/* Spacer: navbar height (72px) + top margin (12px) = 84px */}
      <div className="h-[84px]" aria-hidden="true" />
    </>
  )
}
