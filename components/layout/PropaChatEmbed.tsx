'use client'

/**
 * ADK `static/widget.html` is self-contained: launcher bubble, header, and panel.
 *
 * Message protocol:
 *   Parent → iframe : 'propa-chat-open' | { type:'propa-chat-open' }  — open panel
 *                     { type:'propa-chat-send', message }              — open + auto-send prompt
 *   Iframe → parent : { type:'propa-chat-toggle', open }              — panel state change
 *                     { type:'propa-reply', data }                    — AI reply
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import { OPEN_PROPA_CHAT_EVENT, usePropaChat } from './PropaChatContext'

export default function PropaChatEmbed() {
  const { widgetUrl } = usePropaChat()
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [panelOpen, setPanelOpen] = useState(false)
  const pendingOpenRef = useRef(false)
  // Message to auto-send once the widget confirms it is open
  const pendingMessageRef = useRef<string | null>(null)

  // ── Send a message into the widget iframe ──────────────────────────
  const postToWidget = useCallback((msg: unknown) => {
    const win = iframeRef.current?.contentWindow
    if (!win) return
    try { win.postMessage(msg, '*') } catch { /* ignore */ }
  }, [])

  // ── Open the widget panel (used by navbar "Chat with Propa" button) ─
  const notifyIframeOpen = useCallback(() => {
    postToWidget('propa-chat-open')
    postToWidget({ type: 'propa-chat-open' })
  }, [postToWidget])

  const requestOpenFromParent = useCallback(() => {
    pendingOpenRef.current = true
    notifyIframeOpen()
    window.setTimeout(notifyIframeOpen, 250)
  }, [notifyIframeOpen])

  useEffect(() => {
    window.addEventListener(OPEN_PROPA_CHAT_EVENT, requestOpenFromParent)
    return () => window.removeEventListener(OPEN_PROPA_CHAT_EVENT, requestOpenFromParent)
  }, [requestOpenFromParent])

  // ── Listen for propa-chat-toggle from widget ───────────────────────
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.data?.type !== 'propa-chat-toggle') return
      // Accept messages from the widget origin only
      try {
        if (new URL(widgetUrl).origin !== event.origin) return
      } catch { return }

      const isOpen = !!event.data.open
      setPanelOpen(isOpen)
      if (isOpen) {
        pendingOpenRef.current = false
        // Widget just opened — flush any pending context message now
        if (pendingMessageRef.current) {
          const msg = pendingMessageRef.current
          pendingMessageRef.current = null
          // Small delay so the panel animation is settled before we inject
          window.setTimeout(() => postToWidget({ type: 'propa-chat-send', message: msg }), 100)
        }
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [widgetUrl, postToWidget])

  // ── Handle property-context prompt from PropertyInquiryCard ───────
  // Strategy: store message, open the widget via propa-chat-open, then
  // send the message once propa-chat-toggle:{open:true} is received above.
  useEffect(() => {
    const onContext = (e: Event) => {
      const { context } = (e as CustomEvent).detail || {}
      if (!context) return
      pendingMessageRef.current = context
      // Open the widget — when it confirms open we'll flush the message
      pendingOpenRef.current = true
      notifyIframeOpen()
      window.setTimeout(notifyIframeOpen, 250)
    }
    window.addEventListener('propa-chat-context', onContext)
    return () => window.removeEventListener('propa-chat-context', onContext)
  }, [notifyIframeOpen])

  // ── Flush pending actions after iframe loads ───────────────────────
  const onIframeLoad = useCallback(() => {
    if (pendingOpenRef.current) {
      notifyIframeOpen()
      window.setTimeout(notifyIframeOpen, 150)
    }
  }, [notifyIframeOpen])

  if (!widgetUrl) return null

  return (
    <div
      className={cn(
        'pointer-events-none fixed bottom-5 right-5 z-[100000] overflow-visible transition-[width,height] duration-300 ease-out max-sm:bottom-4 max-sm:right-4',
        panelOpen
          ? 'h-[min(640px,calc(100vh-2rem))] w-[min(428px,calc(100vw-2rem))]'
          : 'h-24 w-24'
      )}
    >
      <iframe
        ref={iframeRef}
        title="Propa chat widget"
        src={widgetUrl}
        className="pointer-events-auto h-full w-full border-0 bg-transparent"
        allow="clipboard-write; microphone"
        onLoad={onIframeLoad}
      />
    </div>
  )
}
