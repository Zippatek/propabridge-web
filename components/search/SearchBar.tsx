'use client'

import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { apiGet, apiPost } from '@/lib/apiClient'

export default function PropertySearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ghostText, setGhostText] = useState('')

  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  // AI ghost text autocomplete — 600ms debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length >= 3 && !searched) {
        fetchAICompletion()
      } else {
        setGhostText('')
      }
    }, 600)
    return () => clearTimeout(timer)
  }, [query])

  async function fetchAICompletion() {
    try {
      const data = await apiGet<any>(`/nlp-complete?q=${encodeURIComponent(query)}`)
      if (data.completion) {
        const completion = data.completion
        if (completion.toLowerCase().startsWith(query.toLowerCase())) {
          setGhostText(query + completion.slice(query.length))
        } else {
          setGhostText(completion)
        }
      }
    } catch {
      /* non-critical */
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Tab' || e.key === 'ArrowRight') && ghostText) {
      e.preventDefault()
      setQuery(ghostText)
      setGhostText('')
    } else if (e.key === 'Enter') {
      handleSearch()
    }
  }

  async function handleSearch() {
    if (!query.trim()) return
    setLoading(true)
    setSearched(true)
    setIsOpen(true)
    setError(null)
    try {
      const data = await apiPost<any>('/search', { query })
      setResults(data.results || [])
    } catch (err) {
      console.error('Search failed:', err)
      setError('Connection to search engine failed.')
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (val: any) => {
    if (val === null || val === undefined) return 'Price on Request'
    const num = Number(String(val).replace(/[^0-9.]/g, ''))
    if (isNaN(num) || num === 0) return 'Price on Request'
    return `₦${num.toLocaleString('en-NG')}`
  }

  const navigateToProperty = (slug: string) => {
    if (!slug) return
    window.location.href = `/listings/${slug}`
  }

  return (
    <div
      style={{
        fontFamily: "'Outfit', 'Inter', sans-serif",
        padding: '40px 20px',
        width: '100%',
        background: 'transparent',
        color: '#111',
      }}
    >
      <style>{`
        #search-results-overlay::-webkit-scrollbar { width: 8px; }
        #search-results-overlay::-webkit-scrollbar-track { background: transparent; }
        #search-results-overlay::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
        #search-results-overlay::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.2); }
        @keyframes pb-spin { to { transform: rotate(360deg); } }
        @keyframes pb-fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .pb-property-card { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); animation: pb-fadeIn 0.5s ease backwards; }
        .pb-property-card:hover { transform: translateY(-4px) scale(1.01); box-shadow: 0 20px 48px rgba(0,0,0,0.12) !important; border-color: rgba(0,102,255,0.3) !important; }
        .pb-search-btn:active { transform: scale(0.95); }
        @media (max-width: 600px) { .pb-res-card { flex-direction: column !important; } .pb-res-image { width: 100% !important; height: 180px !important; } }
      `}</style>

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{ position: 'fixed', top: '-5000px', left: '-5000px', right: '-5000px', bottom: '-5000px', background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', zIndex: 9998, animation: 'pb-fadeIn 0.4s ease forwards', pointerEvents: 'auto', cursor: 'default' }}
        />
      )}

      <div ref={containerRef} style={{ position: 'relative', maxWidth: 850, margin: '0 auto', zIndex: 9999 }}>
        {/* Search bar */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', borderRadius: 24, transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', background: '#fff', padding: '6px', border: isOpen ? '1px solid rgba(0,102,255,0.4)' : '1px solid #eee', boxShadow: isOpen ? '0 20px 60px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.05)', zIndex: 10000, transform: isOpen ? 'scale(1.03)' : 'scale(1)' }}>
          <div style={{ paddingLeft: 20, color: '#999', display: 'flex', alignItems: 'center' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>

          <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
            {ghostText && (
              <div style={{ position: 'absolute', left: 16, top: 0, bottom: 0, display: 'flex', alignItems: 'center', fontSize: 18, color: '#bbb', pointerEvents: 'none', whiteSpace: 'pre', fontWeight: 400, zIndex: 1 }}>
                {ghostText}
              </div>
            )}
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => { if (searched || query.trim().length > 0) setIsOpen(true) }}
              onKeyDown={handleKeyDown}
              placeholder={ghostText ? '' : 'Start typing (e.g. apartment in Abuja)...'}
              style={{ width: '100%', padding: '18px 16px', border: 'none', background: 'transparent', fontSize: 18, fontWeight: 500, color: '#111', outline: 'none', position: 'relative', zIndex: 2 }}
            />
          </div>

          <button
            className="pb-search-btn"
            onClick={handleSearch}
            disabled={loading}
            style={{ padding: '14px 32px', background: loading ? '#666' : '#001a40', color: '#fff', border: 'none', borderRadius: 18, fontSize: 16, fontWeight: 700, cursor: loading ? 'wait' : 'pointer', boxShadow: '0 6px 20px rgba(0,0,0,0.15)', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', marginRight: 4 }}
          >
            {loading ? '...' : 'Search'}
          </button>
        </div>

        {/* Results */}
        {isOpen && (searched || loading || error) && (
          <div style={{ position: 'absolute', top: 'calc(100% + 16px)', left: 0, right: 0, background: '#fff', border: '1px solid #f0f0f0', borderRadius: 28, boxShadow: '0 40px 100px rgba(0,0,0,0.25)', zIndex: 10001, overflow: 'hidden', animation: 'pb-fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) backwards' }}>
            <div id="search-results-overlay" onWheel={(e) => e.stopPropagation()} onTouchMove={(e) => e.stopPropagation()} style={{ maxHeight: '70vh', overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch', padding: '24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                  <div style={{ width: 40, height: 40, margin: '0 auto 20px', border: '4px solid rgba(0,0,0,0.05)', borderTopColor: '#001a40', borderRadius: '50%', animation: 'pb-spin 0.8s linear infinite' }} />
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Thinking...</h3>
                  <p style={{ color: '#666' }}>Scanning verified listings for the best matches.</p>
                </div>
              ) : error ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <div style={{ fontSize: 44, marginBottom: 20 }}>📡</div>
                  <h3 style={{ fontSize: 20, color: '#ef4444', fontWeight: 800 }}>Server Timeout</h3>
                  <p style={{ color: '#666', marginBottom: 24 }}>Could not reach the search engine.</p>
                </div>
              ) : results.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                  <div style={{ fontSize: 56, marginBottom: 20 }}>🏜️</div>
                  <h3 style={{ fontSize: 20, fontWeight: 800 }}>No perfect matches</h3>
                  <p style={{ color: '#666' }}>We couldn&apos;t find exactly that. Try a different city or price range.</p>
                </div>
              ) : (
                <>
                  {results.map((p, idx) => (
                    <div
                      key={p.id}
                      className="pb-property-card pb-res-card"
                      onClick={() => navigateToProperty(p.slug)}
                      style={{ display: 'flex', flexShrink: 0, background: '#fff', borderRadius: 24, overflow: 'hidden', border: '1px solid #f0f0f0', minHeight: 250, animationDelay: `${idx * 0.05}s`, cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}
                    >
                      <div className="pb-res-image" style={{ width: 240, flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                        {p.cover_image_url ? (
                          <img src={p.cover_image_url} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: '100%', height: '100%', background: '#f8f8f8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>No Photo</div>
                        )}
                        <div style={{ position: 'absolute', top: 12, left: 12 }}>
                          <span style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(4px)', padding: '4px 12px', borderRadius: 8, fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', border: '1px solid rgba(0,0,0,0.05)', color: p.listing_type === 'sale' ? '#0066FF' : '#F59E0B' }}>
                            For {p.listing_type}
                          </span>
                        </div>
                      </div>

                      <div style={{ padding: '20px 24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                            <span style={{ fontSize: 11, fontWeight: 800, color: '#0066FF', background: '#f0f6ff', padding: '2px 10px', borderRadius: 6 }}>
                              {Math.round(p.score * 100)}% Match
                            </span>
                            <span style={{ color: '#eee', fontSize: 12 }}>•</span>
                            <span style={{ color: '#888', fontSize: 11, fontWeight: 600 }}>{p.city}</span>
                          </div>
                          <h3 style={{ margin: '0 0 6px', fontSize: 18, fontWeight: 700, color: '#111', lineHeight: 1.2 }}>{p.title}</h3>
                          <p style={{ fontSize: 14, color: '#666', lineHeight: 1.5, margin: '0 0 12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {p.description}
                          </p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span style={{ fontSize: 18 }}>🛏️</span>
                              <span style={{ fontSize: 13, fontWeight: 600, color: '#444' }}>{p.bedrooms} Beds</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span style={{ fontSize: 18 }}>🚿</span>
                              <span style={{ fontSize: 13, fontWeight: 600, color: '#444' }}>{p.bathrooms} Baths</span>
                            </div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid #f8f8f8' }}>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: 10, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 2 }}>Price Total</span>
                            <span style={{ fontSize: 24, fontWeight: 800, color: '#000' }}>{formatPrice(p.price)}</span>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); navigateToProperty(p.slug) }}
                            style={{ padding: '12px 24px', background: '#001a40', color: '#fff', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}
                          >
                            View Listing
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div style={{ height: 4, flexShrink: 0 }} />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
