'use client'

import { cn } from '@/lib/cn'
import { usePropertyFilters } from '@/hooks/usePropertyData'

interface ListingsFiltersProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
  className?: string
}

export default function ListingsFilters({ activeCategory, onCategoryChange, className }: ListingsFiltersProps) {
  const { data: categories = ['ALL'], isLoading } = usePropertyFilters()

  if (isLoading && categories.length <= 1) {
    return (
      <div className={cn("flex gap-2 overflow-x-auto pb-2 scrollbar-hide animate-pulse", className)}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-10 w-24 bg-beige rounded-[8px]" />
        ))}
      </div>
    )
  }

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
                : "bg-[#e9e7d9] text-navy hover:bg-[#d9d8d0]"
            )}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}
