'use client'

import { cn } from '@/lib/cn'
import { useState, useEffect } from 'react'
import { fetchPropertyFilters } from '@/lib/api'

interface ListingsFiltersProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
  className?: string
}

export default function ListingsFilters({ activeCategory, onCategoryChange, className }: ListingsFiltersProps) {
  const [categories, setCategories] = useState<string[]>(['ALL'])

  useEffect(() => {
    fetchPropertyFilters().then(setCategories)
  }, [])

  return (
    <div className={cn("flex gap-2 overflow-x-auto pb-2 scrollbar-hide", className)}>
      {categories.map((category) => {
        const isActive = activeCategory === category
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={cn(
              "px-4 py-2.5 rounded-[8px] text-[12px] font-bold tracking-[0.05em] uppercase transition-colors whitespace-nowrap",
              isActive
                ? "bg-navy text-white shadow-md"
                : "bg-[#E5E7EB] text-navy hover:bg-[#D1D5DB]"
            )}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}
