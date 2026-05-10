'use client'

/**
 * ADK `static/widget.html` is self-contained: launcher bubble, header, and panel (#chatBubble / #chatPanel).
 * Wrapping it in an extra white card + header + outer FAB duplicated the full concierge UI.
 *
 * This component only:
 * - Mounts one fixed, transparent iframe at the bottom-right
 * - Resizes with `{ type: 'propa-chat-toggle', open }` from the widget (see propabridge-adk)
 * - Listens for `open-propa-chat` and posts `propa-chat-open` into the iframe (navbar)
 *
 * Parent → iframe: `'propa-chat-open'` or `{ type: 'propa-chat-open' }`.
 * Iframe → parent: `{ type: 'propa-chat-toggle', open }`, `{ type: 'propa-reply', data }`.
 */

import { useCallback, useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/cn'

import { OPEN_PROPA_CHAT_EVENT, usePropaChat } from './PropaChatContext'

export default function PropaChatEmbed() {
  const { widgetUrl } = usePropaChat()
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [panelOpen, setPanelOpen] = useState(false)
  const pendingOpenRef = useRef(false)

  const notifyIframeOpen = useCallback(() => {
    const win = iframeRef.current?.contentWindow
    if (!win) return
    try {
      win.postMessage('propa-chat-open', '*')
      win.postMessage({ type: 'propa-chat-open' }, '*')
    } catch {
      /* ignore */
    }
  }, [])

  const requestOpenFromParent = useCallback(() => {
    pendingOpenRef.current = true
    notifyIframeOpen()
    window.setTimeout(notifyIframeOpen, 250)
  }, [notifyIframeOpen])

  useEffect(() => {
    window.addEventListener(OPEN_PROPA_CHAT_EVENT, requestOpenFromParent)
    return () => window.removeEventListener(OPEN_PROPA_CHAT_EVENT, requestOpenFromParent)
  }, [requestOpenFromParent])

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.data?.type !== 'propa-chat-toggle') return
      let originOk = false
      try {
        originOk = new URL(widgetUrl).origin === event.origin
      } catch {
        return
      }
      if (!originOk) return
      const isOpen = !!event.data.open
      setPanelOpen(isOpen)
      if (isOpen) pendingOpenRef.current = false
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [widgetUrl])

  const onIframeLoad = useCallback(() => {
    if (!pendingOpenRef.current) return
    notifyIframeOpen()
    window.setTimeout(notifyIframeOpen, 150)
  }, [notifyIframeOpen])

  if (!widgetUrl) return null

  return (
    <div
      className={cn(
        'pointer-events-none fixed bottom-5 right-5 z-[100] overflow-visible transition-[width,height] duration-300 ease-out max-sm:bottom-4 max-sm:right-4',
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
