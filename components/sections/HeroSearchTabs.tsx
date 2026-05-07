'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { cn } from '@/lib/cn'

type Tab = 'buy' | 'rent' | 'sell'

const TABS: { id: Tab; label: string; placeholder: string }[] = [
  { id: 'buy', label: 'BUY', placeholder: 'e.g. 4 bedroom duplex in Maitama' },
  { id: 'rent', label: 'RENT', placeholder: 'e.g. 2 bedroom flat in Gwarinpa under ₦2M' },
  { id: 'sell', label: 'SELL', placeholder: 'Tell us about your property' },
]

export default function HeroSearchTabs() {
  const router = useRouter()
  const [active, setActive] = useState<Tab>('buy')
  const [q, setQ] = useState('')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (active === 'sell') {
      router.push(`/sell${q ? `?q=${encodeURIComponent(q)}` : ''}`)
      return
    }
    const status = active === 'rent' ? 'FOR+RENT' : 'FOR+SALE'
    const params = new URLSearchParams()
    params.set('status', status)
    if (q) params.set('q', q)
    router.push(`/listings?${params.toString()}`)
  }

  const current = TABS.find((t) => t.id === active)!

  return (
    <div className="w-full max-w-[640px] mx-auto">
      <div className="flex gap-1 mb-2 px-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            type="button"
            className={cn(
              'px-5 py-2 rounded-t-[10px] text-[12px] font-bold tracking-[0.08em] uppercase transition-colors',
              active === t.id
                ? 'bg-white text-navy'
                : 'bg-white/20 text-white hover:bg-white/30',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <form
        onSubmit={onSubmit}
        className="flex items-center bg-white rounded-[14px] p-2 gap-2"
      >
        <Search size={20} className="text-gray-400 ml-2" />
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={current.placeholder}
          className="flex-1 min-w-0 bg-transparent border-none outline-none text-[14px] text-navy placeholder:text-gray-400"
        />
        <button
          type="submit"
          className="bg-blue hover:bg-blue-hover text-white font-semibold text-[13px] uppercase tracking-wide px-5 py-2.5 rounded-[10px] transition-colors"
        >
          Search
        </button>
      </form>
    </div>
  )
}
