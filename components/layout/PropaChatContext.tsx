'use client'

import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react'

/** Dispatched on `window` so any client component can open chat without importing `usePropaChat`. */
export const OPEN_PROPA_CHAT_EVENT = 'open-propa-chat'

export function dispatchOpenPropaChat() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(OPEN_PROPA_CHAT_EVENT))
}

type PropaChatContextValue = {
  widgetUrl: string
  openChat: () => void
}

const PropaChatContext = createContext<PropaChatContextValue | null>(null)

export function PropaChatProvider({
  widgetUrl,
  children,
}: {
  widgetUrl: string
  children: ReactNode
}) {
  const openChat = useCallback(() => {
    dispatchOpenPropaChat()
  }, [])

  const value = useMemo(() => ({ widgetUrl, openChat }), [widgetUrl, openChat])

  return <PropaChatContext.Provider value={value}>{children}</PropaChatContext.Provider>
}

export function usePropaChat(): PropaChatContextValue {
  const ctx = useContext(PropaChatContext)
  if (!ctx) {
    throw new Error('usePropaChat must be used within PropaChatProvider')
  }
  return ctx
}
