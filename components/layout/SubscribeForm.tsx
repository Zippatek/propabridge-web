'use client'

import { useState } from 'react'
import { subscribeNewsletter } from '@/lib/api'

export default function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [message, setMessage] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setState('loading')
    setMessage(null)
    try {
      await subscribeNewsletter(email)
      setState('ok')
      setMessage("You're subscribed.")
      setEmail('')
    } catch (err) {
      setState('error')
      setMessage(err instanceof Error ? err.message : 'Could not subscribe')
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="flex bg-[#FFFFF2] p-1.5 rounded-btn shadow-sm w-full h-[64px]">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jane@propabridge.com"
          required
          disabled={state === 'loading'}
          className="flex-1 min-w-0 bg-transparent px-4 sm:px-6 border-none outline-none text-navy text-[14px] sm:text-[15px] placeholder:text-navy/40 h-full"
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          className="bg-navy shrink-0 text-white font-semibold text-[12px] sm:text-[13px] uppercase tracking-wider px-5 sm:px-8 h-full rounded-btn flex items-center justify-center gap-1.5 sm:gap-2 hover:bg-navy/90 transition-colors disabled:opacity-60"
        >
          <span>{state === 'loading' ? 'SENDING' : 'SUBSCRIBE'}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="m9 18 6-6-6-6" /></svg>
        </button>
      </form>
      {message && (
        <p className={`mt-2 text-[12px] ${state === 'ok' ? 'text-beige' : 'text-gold'}`}>{message}</p>
      )}
    </div>
  )
}
