'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

const SUGGESTIONS = [
  'Apartment in Gwarinpa, Abuja',
  'Terrace house in Karsana North',
  'Commercial space in Lokogoma',
  'Flat for rent in Kaduna GRA',
  'Detached house in Maitama',
  'Land in Minna, Niger State',
]

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const filtered = query.length > 0
    ? SUGGESTIONS.filter((s) => s.toLowerCase().includes(query.toLowerCase()))
    : SUGGESTIONS

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/listings?q=${encodeURIComponent(query.trim())}`)
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    setShowSuggestions(false)
    router.push(`/listings?q=${encodeURIComponent(suggestion)}`)
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="relative w-full" style={{ maxWidth: 640 }}>
      <form onSubmit={handleSubmit}>
        {/* White pill container — matches reference: light shadow, rounded pill */}
        <div className="flex items-center bg-white rounded-full shadow-md border border-grey-light/30 px-5 py-1.5 gap-3">
          <Search size={18} color="#9ca3af" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setShowSuggestions(true)
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Start typing (e.g. apartment in Abuja)..."
            className="flex-1 bg-transparent border-none outline-none text-[14px] text-grey placeholder:text-grey/50 min-w-0 py-2"
            aria-label="Search properties"
            autoComplete="off"
          />
          {/* Dark/black Search button — matches reference */}
          <button
            type="submit"
            className="bg-[#1a1a2e] text-white font-semibold text-[14px] px-6 py-2.5 rounded-full hover:bg-navy transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            Search
          </button>
        </div>
      </form>

      {/* Suggestions dropdown */}
      {showSuggestions && filtered.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-[12px] shadow-card z-50 overflow-hidden border border-grey-light/20">
          {filtered.slice(0, 5).map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full text-left px-5 py-3 text-[14px] text-navy hover:bg-beige transition-colors flex items-center gap-3"
            >
              <Search size={13} color="#9ca3af" aria-hidden="true" />
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
