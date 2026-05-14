'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'

export type Review = {
  id: string
  type: 'image' | 'text'
  highlightQuote?: string[] 
  fullText?: string
  author: string
  role?: string
  location: string
  image: string
  hasVideo?: boolean
}

const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    type: 'text',
    highlightQuote: ['“Found my dream home without', 'losing my money or sanity!”'],
    fullText: '"I thought house hunting in Abuja would mean dealing with endless quack agents and paying ridiculous registration fees. Working with Propabridge changed everything. From the first chat with their AI, Propa, to the final handover, I didn\'t pay a single dime in \'viewing fees.\' They made me feel completely safe."',
    author: 'Tunde O.,',
    location: 'RENTER, GWARINPA ABUJA',
    image: '/images/reviews/tunde.png',
  },
  {
    id: 'rev-2',
    type: 'image',
    fullText: '“They made selling my home feel effortless.”',
    author: 'Abubakar Sadiq',
    location: 'MINNA, NIGER',
    image: '/images/reviews/omar.png',
  },
  {
    id: 'rev-3',
    type: 'text',
    highlightQuote: ['“I felt supported from day one.”'],
    fullText: '"I felt supported from day one. Propabridge understood what I was looking for even better than I did. They walked me through different neighborhoods, explained market trends clearly, and helped me make decisions without rushing me. When it came to negotiations, they fought for every dollar and made sure I got the best possible price. I couldn\'t have asked for a more professional, friendly team."',
    author: 'Alh. Musa K.',
    location: 'LANDLORD, KADUNA',
    image: '/images/reviews/avatar.png',
  },
  {
    id: 'rev-4',
    type: 'image',
    fullText: '“I recommend them to everyone — even my picky cousin.”',
    author: 'Hadiza M.',
    location: 'YOUNG PROFESSIONAL, ABUJA',
    image: '/images/reviews/daniel.png',
  },
  {
    id: 'rev-5',
    type: 'text',
    highlightQuote: ['...they made selling my', 'property feel effortless...'],
    fullText: '"I was nervous about giving my property to agents who would just inflate the price and chase away serious buyers. Propabridge helped me set the perfect valuation. They handled all the marketing and only brought pre-screened clients. We closed the deal in two weeks without any drama."',
    author: 'Dr. Imam I.,',
    location: 'LANDLORD, KADUNA',
    image: '/images/reviews/amaka_avatar.png',
  },
  {
    id: 'rev-6',
    type: 'image',
    fullText: '“They sold my home faster than I expected.”',
    author: 'Property Developer',
    location: 'KADUNA',
    image: '/images/reviews/dr.png',
  },
  {
    id: 'rev-7',
    type: 'text',
    highlightQuote: ['“I trusted them completely', 'with my investment.”'],
    fullText: '"As someone living in the diaspora, buying property back home is usually a nightmare full of scams. I trusted Propabridge because they are founded by actual Estate Surveyors. They handled the legal verification, title checks, and everything in between. I’ve already recommended them to my friends in the UK."',
    author: 'Dr. Nkechi A.,',
    location: 'DIASPORA INVESTOR',
    image: '/images/reviews/avatar.png',
  },
  {
    id: 'rev-8',
    type: 'image',
    fullText: '“They cared more about my comfort than the commission.”',
    author: 'Beckett Ivers',
    location: 'DENVER, CO',
    image: '/images/reviews/omar.png',
  },
  {
    id: 'rev-9',
    type: 'text',
    highlightQuote: ['...they cared more about my', 'safety than the commission...'],
    fullText: '"They didn\'t rush me. Realist (Propabridge) understood what I was looking for. When it came to negotiations, they fought for a fair price and ensured the tenancy agreement protected me. I couldn\'t have asked for a more professional team."',
    author: 'Emeka R.,',
    location: 'RENTER, JABI',
    image: '/images/reviews/tunde.png',
  }
]

interface TestimonialsSectionProps {
  heading?: string
  isPage?: boolean
}

export default function TestimonialsSection({
  heading = 'Stories from people who found their place with us',
  isPage = false
}: TestimonialsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [totalDots, setTotalDots] = useState(REVIEWS.length)
  const [showArrows] = useState(true)

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return
    const scrollLeft = scrollRef.current.scrollLeft
    const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth
    const itemWidth = window.innerWidth >= 768 ? 404 : 324

    const calculatedDots = Math.ceil(maxScroll / itemWidth) + 1
    const validDots = calculatedDots > 0 ? calculatedDots : 1

    setTotalDots((prev) => (validDots !== prev ? validDots : prev))

    const newIndex = Math.min(Math.round(scrollLeft / itemWidth), validDots - 1)
    setActiveIndex(Math.max(0, newIndex))
  }, [])

  useEffect(() => {
    const runInitial = window.setTimeout(() => handleScroll(), 0)
    window.addEventListener('resize', handleScroll)
    return () => {
      window.clearTimeout(runInitial)
      window.removeEventListener('resize', handleScroll)
    }
  }, [handleScroll])

  const scrollLeftClick = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft
      const itemWidth = window.innerWidth >= 768 ? 404 : 324
      const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth
      
      if (scrollLeft <= 5) {
        // At start -> jump to end
        scrollRef.current.scrollTo({ left: maxScroll, behavior: 'smooth' })
      } else {
        scrollRef.current.scrollBy({ left: -itemWidth, behavior: 'smooth' })
      }
    }
  }

  const scrollRightClick = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft
      const itemWidth = window.innerWidth >= 768 ? 404 : 324
      const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth
      
      if (scrollLeft >= maxScroll - 5) {
        // At end -> jump back to start
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        scrollRef.current.scrollBy({ left: itemWidth, behavior: 'smooth' })
      }
    }
  }

  const renderCard = (review: Review) => {
    const pageCardShell = isPage
      ? 'rounded-card border border-grey-divider shadow-none'
      : 'rounded-[24px]'
    // VARIANT A: IMAGE FULL-CARD
    if (review.type === 'image') {
       return (
          <div key={review.id} className={cn("relative shrink-0 aspect-[8/11] overflow-hidden group transition-transform hover:scale-[1.01]", pageCardShell, !isPage && "w-[300px] md:w-[380px] snap-center", isPage && "w-full")}>
             <Image src={review.image} alt={review.author} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
             
             {/* Dark Base Gradient Overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/50 to-transparent" />

             {/* Video Play Icon Overlay */}
             {review.hasVideo && (
               <div className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-85 group-hover:opacity-100 transition-opacity">
                  <div className="w-[68px] h-[68px] rounded-full border border-white/50 bg-white/20 backdrop-blur-md flex items-center justify-center pl-1.5 ">
                    <div className="w-0 h-0 border-t-[9px] border-t-transparent border-l-[14px] border-l-white border-b-[9px] border-b-transparent relative left-[2px]" />
                  </div>
               </div>
             )}

             {/* Content Overlay */}
             <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full">
                <h4 className="text-white text-[22px] md:text-[24px] font-medium leading-[1.25] mb-8 tracking-[-0.01em]">
                   {review.fullText}
                </h4>
                <div>
                  <p className="text-white font-bold text-[16px]">{review.author}</p>
                  <p className="text-white/80 text-[11px] font-bold tracking-[0.15em] mt-1.5 uppercase">{review.location}</p>
                </div>
             </div>
          </div>
       )
    }

    // VARIANT B: BEIGE TEXT CARD
    return (
       <div key={review.id} className={cn(
         "relative shrink-0 aspect-[8/11] p-8 md:p-10 flex flex-col justify-between transition-transform hover:scale-[1.01]",
         isPage
           ? "rounded-card bg-beige border border-grey-divider shadow-none"
           : "rounded-[24px] bg-[#FFFFF2] border border-[#ecece0]/60",
         !isPage && "w-[300px] md:w-[380px] snap-center",
         isPage && "w-full"
       )}>
          
          <div className="space-y-6">
            {/* Highlight Block */}
            {review.highlightQuote && (
              <div className="flex flex-col items-start gap-1">
                {review.highlightQuote.map((line, i) => (
                  <span key={i} className="bg-grey-light/50 px-2 py-0.5 leading-snug text-[18px] md:text-[20px] font-medium text-navy tracking-tight">
                    {line}
                  </span>
                ))}
              </div>
            )}

            {/* Full Text Paragraph */}
            <p className="text-grey text-[15px] md:text-[16px] leading-[1.65] tracking-tight">
              {review.fullText}
            </p>
          </div>

          {/* Bottom Author Profile */}
          <div className="flex items-end justify-between mt-8">
            <div className="mb-1">
              <p className="text-navy font-bold text-[17px] mb-1.5">{review.author}</p>
              <p className="text-grey text-[11px] font-bold tracking-[0.1em] uppercase">
                {review.role ? `${review.role}, ${review.location}` : review.location}
              </p>
            </div>
            <div className={cn("relative w-[52px] h-[52px] rounded-[16px] overflow-hidden shrink-0 border", isPage ? "border-grey-divider shadow-none" : "shadow-sm border-grey-light/30")}>
              <Image src={review.image} alt={review.author} fill sizes="64px" className="object-cover" />
            </div>
          </div>

       </div>
    )
  }

  return (
    <section className={cn("bg-beige relative", isPage ? "pt-2 pb-24" : "section-pt section-pb")} aria-labelledby="reviews-heading">
      
      {/* ── DIVIDER ── */}
      {!isPage && <hr className="border-t border-grey-light mx-6 mb-12" aria-hidden="true" />}

      {/* Reviews page hero — full-width grid + blur behind heading */}
      {isPage && (
        <div className="relative mb-12 md:mb-16 w-full overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.45]"
            style={{
              backgroundImage: `
                  linear-gradient(to right, rgba(0,26,64,0.07) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(0,26,64,0.07) 1px, transparent 1px)
                `,
              backgroundSize: '40px 40px',
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-beige/75 backdrop-blur-[3px]"
          />
          <div className="container-site relative flex flex-col items-center px-4 py-10 md:py-12">
            <div className="flex items-center justify-center gap-2.5 bg-beige border border-grey-divider px-4 py-2 rounded-container mb-6">
              <div className="w-[8px] h-[8px] bg-navy rounded-[2px]" />
              <span className="text-[12px] font-bold font-sans text-navy uppercase tracking-[0.08em]">Testimonials</span>
              <div className="w-[8px] h-[8px] bg-navy rounded-[2px]" />
            </div>
            <h2
              id="reviews-heading"
              className="text-display-lg font-medium font-sans text-heading w-full max-w-[1000px] text-center"
            >
              Stories from the buyers, sellers,<br className="hidden md:block" /> and dream-chasers we&apos;ve helped
            </h2>
          </div>
        </div>
      )}
      
      <div className="container-site">
        {/* ── HEADER ── */}
        {!isPage && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-16 md:mb-24">
            <div className="md:col-span-3 flex items-start gap-2 md:pt-4">
              <span className="inline-block w-2.5 h-2.5 rounded-sm bg-navy shrink-0 mt-[4px]" aria-hidden="true" />
              <p className="text-[12px] font-semibold text-navy uppercase tracking-[0.08em]">
                REVIEWS
              </p>
            </div>
            <div className="md:col-span-9 flex items-center">
              <h2
                id="reviews-heading"
                className="text-display-lg font-medium text-heading max-w-[850px]"
              >
                {heading}
              </h2>
            </div>
          </div>
        )}

        {/* ── CONTENT ── */}
        {isPage ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {REVIEWS.map((review) => renderCard(review))}
          </div>
        ) : (
          <div className="relative w-full -mx-4 px-4 md:mx-0 md:px-0">
             
             {/* LEFT ARROW (Desktop only or enabled based on screen) */}
             {showArrows && (
               <button 
                 onClick={scrollLeftClick}
                 className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 w-[52px] h-[52px] bg-navy text-white rounded-full flex items-center justify-center z-30 hover:bg-navy/90 transition-all  hidden md:flex"
                 aria-label="Previous Review"
               >
                  <ChevronLeft size={24} />
               </button>
             )}

             {/* RIGHT ARROW */}
             {showArrows && (
               <button 
                 onClick={scrollRightClick}
                 className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 w-[52px] h-[52px] bg-navy text-white rounded-full flex items-center justify-center z-30 hover:bg-navy/90 transition-all  hidden md:flex"
                 aria-label="Next Review"
               >
                  <ChevronRight size={24} />
               </button>
             )}

             {/* ── SCROLL CONTAINER ── */}
             <div 
               ref={scrollRef}
               onScroll={handleScroll}
               className="flex gap-6 overflow-x-auto snap-x snap-mandatory py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
             >
                {REVIEWS.map((review) => renderCard(review))}
             </div>
          </div>
        )}

        {/* ── PAGINATION DOTS ── */}
        {!isPage && (
          <div className="flex justify-center mt-10 md:mt-14 w-full">
             <div className="flex items-center gap-3 bg-white px-5 py-[10px] rounded-full  border border-[#ecece0]/60">
                {Array.from({ length: totalDots }).map((_, i) => (
                  <button 
                    key={i} 
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => {
                       let targetX = i * (window.innerWidth >= 768 ? 404 : 324)
                       if (scrollRef.current) {
                          const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth
                          if (targetX > maxScroll) targetX = maxScroll
                          scrollRef.current.scrollTo({ left: targetX, behavior: 'smooth' })
                       }
                    }}
                    className={`w-[7px] h-[7px] rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-navy scale-125' : 'bg-grey/30 hover:bg-grey/50'}`}
                  />
                ))}
             </div>
          </div>
        )}

      </div>
    </section>
  )
}
