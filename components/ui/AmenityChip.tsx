import { cn } from '@/lib/cn'

interface AmenityChipProps {
  icon?: React.ReactNode
  children: React.ReactNode
  className?: string
}

/**
 * Foundation Amenity Chip:
 * bg #f4f3ea, border 1px #cbd5e0, text 12/500 #4a5568,
 * icon 16px stroke #4a5568, radius 20px (pill), padding 6/12
 */
export default function AmenityChip({ icon, children, className }: AmenityChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 bg-[#f4f3ea] border border-[#cbd5e0] rounded-pill px-3 py-1.5 text-[12px] font-medium text-[#4a5568]',
        className
      )}
    >
      {icon}
      {children}
    </span>
  )
}
