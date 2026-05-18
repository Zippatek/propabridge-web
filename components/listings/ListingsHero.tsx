'use client'

import { useState } from 'react'
import { Search as MagnifyingGlass, Building2 as Buildings, Tag, Key, Handshake } from 'lucide-react'
import { cn } from '@/lib/cn'
import SearchBar from '@/components/search/SearchBar'

interface ListingsHeroProps {
  activeStatus: string
  onStatusChange: (status: string) => void
}

const STATUS_FILTERS = [
  { label: 'ALL', icon: Buildings },
  { label: 'FOR SALE', icon: Tag },
  { label: 'FOR RENT', icon: Key },
  { label: 'SOLD', icon: Handshake },
]

export default function ListingsHero({ activeStatus, onStatusChange }: ListingsHeroProps) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="relative flex flex-col items-center text-center pb-12 px-4 sm:px-6 w-full -mt-[84px] pt-[180px]">
      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,26,64,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,26,64,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          backgroundPosition: 'center top'
        }}
      />

      {/* Badge */}
      <div className="relative z-10 inline-flex items-center gap-2.5 px-3 py-2.5 rounded-[6px] bg-[#e2e1d7] mb-8 shadow-sm">
        <div className="w-[7px] h-[7px] rounded-[1.5px] bg-navy"></div>
        <span className="text-[11px] font-bold text-navy tracking-[0.08em] uppercase leading-none pt-[1px]">PROPERTIES</span>
        <div className="w-[7px] h-[7px] rounded-[1.5px] bg-navy"></div>
      </div>

      {/* Heading */}
      <h1 className="relative z-10 text-display-lg text-heading font-medium max-w-[980px] mb-12">
        Find a place to live, work, or dream big —<br />all in one beautiful map of possibilities.
      </h1>
      <div className="container-site flex justify-center relative z-20 pt-12 pb-10 w-full max-w-[1280px]">
        <SearchBar />
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap justify-center items-center gap-3">
        {STATUS_FILTERS.map((status) => {
          const Icon = status.icon
          const isActive = activeStatus === status.label
          return (
            <button
              key={status.label}
              onClick={() => onStatusChange(status.label)}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-[12px] text-[13px] font-bold tracking-[0.05em] uppercase transition-colors",
                isActive
                  ? "bg-navy text-brand-textWhite shadow-md"
                  : "bg-[#e9e7d9] text-navy hover:bg-[#d9d8d0]"
              )}
            >
              <Icon size={16} />
              {status.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
