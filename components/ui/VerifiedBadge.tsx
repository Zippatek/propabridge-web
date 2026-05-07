import { Shield, Check } from '@phosphor-icons/react/dist/ssr'
import { cn } from '@/lib/cn'

interface VerifiedBadgeProps {
  size?: 'sm' | 'md' | 'lg'
  items?: string[]
  className?: string
}

/**
 * Foundation glassmorphism verified badge.
 * - bg rgba(255,255,255,0.85), backdrop-blur(8px)
 * - border 1px rgba(255,255,255,0.6), radius 20px (pill), padding 6/12
 * - shadow 0 2px 12px rgba(0,26,64,0.14)
 * - Shield icon stroke 14px gold + "Verified by Propabridge" 11px/600 navy
 */
export default function VerifiedBadge({ size = 'md', items, className }: VerifiedBadgeProps) {
  const glass =
    'inline-flex items-center bg-white/85 backdrop-blur-[8px] border border-white/60 rounded-pill shadow-verified'

  if (size === 'sm') {
    return (
      <div
        className={cn(glass, 'gap-1 px-2 py-1', className)}
        aria-label="Verified by Propabridge"
      >
        <Shield size={14} weight="regular" color="#ffc870" aria-hidden="true" />
      </div>
    )
  }

  if (size === 'lg' && items && items.length > 0) {
    return (
      <div className={cn(glass, 'flex-col items-start gap-2 px-4 py-3', className)}>
        <div className="flex items-center gap-2">
          <Shield size={14} weight="regular" color="#ffc870" aria-hidden="true" />
          <span className="text-[#001a40] font-semibold text-[11px] tracking-[0.04em]">
            Verified by Propabridge
          </span>
        </div>
        <div className="flex flex-col gap-1">
          {items.map((item) => (
            <div key={item} className="flex items-center gap-1.5">
              <Check size={12} color="#1a7a4a" weight="regular" aria-hidden="true" />
              <span className="text-[11px] text-[#4a5568] font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Foundation default — md
  return (
    <div className={cn(glass, 'gap-1.5 px-3 py-1.5', className)}>
      <Shield size={14} weight="regular" color="#ffc870" aria-hidden="true" />
      <span className="text-[#001a40] font-semibold text-[11px] tracking-[0.04em] whitespace-nowrap">
        Verified by Propabridge
      </span>
    </div>
  )
}
