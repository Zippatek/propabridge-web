'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Home, FileText, Star, Lightbulb, Paintbrush, Share2 } from 'lucide-react'
import { cn } from '@/lib/cn'
import { BLOGS } from '@/data/blogs'
import type { FrontendBlog } from '@/lib/api'

interface BlogsSectionProps {
  limit?: number
  isPage?: boolean
  blogs?: FrontendBlog[]
}

export default function BlogsSection({ limit = 3, isPage = false, blogs = BLOGS }: BlogsSectionProps) {
  return (
    <section className={cn("bg-beige relative", isPage ? "pt-2 pb-24" : "section-pt section-pb")} aria-labelledby={isPage ? undefined : "blogs-heading"}>

      {/* ── TOP DIVIDER ── */}
      {!isPage && (
        <hr className="border-t border-black/30 mx-6 mb-12 md:mb-16" aria-hidden="true" />
      )}

      <div className="container-site">

        {/* ── HEADER ── */}
        <div className={cn("relative mb-12 md:mb-16 flex flex-col items-center", !isPage && "pt-8")}>
          {!isPage && (
            <div className="absolute left-0 top-0 flex items-start gap-2 pt-1 md:pt-4">
              <span className="inline-block w-2.5 h-2.5 rounded-sm bg-navy shrink-0 mt-[4px]" aria-hidden="true" />
              <p className="text-[12px] font-bold text-navy uppercase tracking-[0.08em]">
                BLOGS
              </p>
            </div>
          )}

          {/* ── PILL BADGE (Only for the dedicated page) ── */}
          {isPage && (
            <div className="flex items-center justify-center gap-2.5 bg-[#eae9e0] px-4 py-2 rounded-[8px] mb-6">
              <div className="w-[8px] h-[8px] bg-navy rounded-[2px]" />
              <span className="text-[12px] font-bold font-sans text-navy uppercase tracking-[0.08em]">Blogs & Insights</span>
              <div className="w-[8px] h-[8px] bg-navy rounded-[2px]" />
            </div>
          )}

          <h2
            id="blogs-heading"
            className={cn(
              "font-sans w-full px-4 text-center text-heading font-medium",
              isPage ? "max-w-[900px] text-display-xl leading-[1.02]" : "max-w-[1000px] text-display-lg"
            )}
          >
            {isPage ? (
              <>Everything you ever wanted to know<br className="hidden md:block" /> about buying, selling, and living better</>
            ) : (
              <>News, stories, and inspiration<br className="hidden md:block" /> for better living every day</>
            )}
          </h2>

          {/* ── CATEGORY FILTERS (Only for the dedicated page) ── */}
          {isPage && (
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mt-10 w-full">
              <button className="flex items-center gap-2 bg-navy text-brand-textWhite text-nav font-bold font-sans px-5 py-2.5 rounded-btn transition-colors uppercase tracking-wider">
                <FileText size={16} />
                ALL
              </button>
              <button className="flex items-center gap-2 bg-[#eae9e0] hover:bg-[#dfded5] text-navy text-[13px] font-bold font-sans px-5 py-2.5 rounded-btn transition-colors uppercase tracking-wider">
                <Star size={16} />
                FEATURED
              </button>
              <button className="flex items-center gap-2 bg-[#eae9e0] hover:bg-[#dfded5] text-navy text-[13px] font-bold font-sans px-5 py-2.5 rounded-btn transition-colors uppercase tracking-wider">
                <Lightbulb size={16} />
                GUIDE
              </button>
              <button className="flex items-center gap-2 bg-[#eae9e0] hover:bg-[#dfded5] text-navy text-[13px] font-bold font-sans px-5 py-2.5 rounded-btn transition-colors uppercase tracking-wider">
                <Paintbrush size={16} />
                LIFESTYLE
              </button>
              <button className="flex items-center gap-2 bg-[#eae9e0] hover:bg-[#dfded5] text-navy text-[13px] font-bold font-sans px-5 py-2.5 rounded-btn transition-colors uppercase tracking-wider">
                <Share2 size={16} />
                NEWS
              </button>
            </div>
          )}
        </div>

        {/* ── BLOG GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
          {blogs.slice(0, limit).map(blog => (
            <Link
              href={`/blogs/${blog.id}`}
              key={blog.id}
              className="group block transition-transform hover:-translate-y-1 duration-300 flex flex-col h-full"
            >
              {/* Image Thumbnail */}
              <div className="relative w-full aspect-[4/3] md:aspect-[3/2] rounded-[16px] overflow-hidden bg-[#e0e0d5] mb-6 border border-[#ecece0]/50 transition-shadow shrink-0">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Data Row */}
              <div className="flex items-center gap-2 text-navy mb-3 shrink-0">
                <p className="text-[12px] font-semibold tracking-[0.05em] uppercase">{blog.date}</p>
                <div className="w-1 h-1 rounded-full bg-navy" />
                <p className="text-[12px] font-semibold tracking-[0.05em] uppercase">{blog.category}</p>
              </div>

              {/* Title */}
              <h3 className="text-[20px] md:text-[22px] text-navy font-bold leading-[1.3] tracking-[-0.01em] mb-6 pr-4 flex-grow">
                {blog.title}
              </h3>

              {/* Author Pill */}
              <div className="inline-flex items-center self-start gap-2.5 bg-[#eae9e0] pr-4 pl-1.5 py-1.5 rounded-full border border-[#ecece0]/80 shrink-0">
                <div className="relative flex items-center justify-center w-7 h-7 rounded-full overflow-hidden shrink-0 bg-brand-light1">
                  {blog.authorName === 'PROPABRIDGE TEAM' ? (
                    <Home size={14} className="text-navy" />
                  ) : (
                    <Image src={blog.authorImage || '/images/blogs/author.svg'} alt={blog.authorName} fill sizes="48px" className="object-cover" />
                  )}
                </div>
                <p className="text-[11px] font-bold text-navy tracking-[0.05em] uppercase">
                  {blog.authorName}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* ── CTA BUTTON ── */}
        {!isPage && (
          <div className="mt-16 md:mt-24 flex justify-center">
            <Link
              href="/blogs"
              className="btn-navy-pill rounded-[8px]"
            >
              READ ALL BLOGS
              <span className="text-[18px] leading-none mb-[3px]">›</span>
            </Link>
          </div>
        )}

      </div>
    </section>
  )
}
