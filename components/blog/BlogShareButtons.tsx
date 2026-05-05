'use client'

import { useState } from 'react'
import { LinkSimple } from '@phosphor-icons/react'

interface BlogShareButtonsProps {
  title: string
}

export function BlogShareButtons({ title }: BlogShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, url: window.location.href })
      } catch {
        // user dismissed — do nothing
      }
    } else {
      await handleCopyLink()
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // clipboard unavailable — silent fail
    }
  }

  return (
    <div className="flex items-center gap-3 mt-8">
      {/* SHARE button */}
      <button
        onClick={handleShare}
        className="inline-flex items-center gap-2 bg-navy text-white text-[13px] font-bold tracking-[0.1em] uppercase px-5 h-[42px] rounded-[8px] hover:bg-navy/90 transition-colors"
      >
        SHARE
      </button>

      {/* Copy link icon */}
      <button
        onClick={handleCopyLink}
        title={copied ? 'Copied!' : 'Copy link'}
        aria-label="Copy link to clipboard"
        className="w-[42px] h-[42px] flex items-center justify-center rounded-[8px] border border-[#d0cfc5] bg-white/60 hover:bg-white transition-colors text-navy"
      >
        <LinkSimple size={18} weight="regular" />
      </button>

      {/* Feedback */}
      {copied && (
        <span className="text-[12px] font-semibold text-[#1a7a4a] transition-opacity">
          Link copied!
        </span>
      )}
    </div>
  )
}
