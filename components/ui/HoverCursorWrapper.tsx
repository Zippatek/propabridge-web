'use client'

import { type ReactNode, useCallback, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface HoverCursorWrapperProps {
  children: ReactNode
  className?: string
  label?: string
  size?: number
}

export default function HoverCursorWrapper({
  children,
  className = '',
  label = 'ENTER',
  size = 85,
}: HoverCursorWrapperProps) {
  const prefersReducedMotion = useReducedMotion()
  const [isHovering, setIsHovering] = useState(false)
  const [position, setPosition] = useState({ x: size / 2, y: size / 2 })

  const onMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect()
      setPosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      })
    },
    []
  )

  return (
    <div
      className={`card-hover-cursor relative ${className}`.trim()}
      onMouseEnter={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        setPosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        })
        setIsHovering(true)
      }}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={onMouseMove}
    >
      {children}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-30 hidden items-center justify-center rounded-full bg-navy text-beige shadow-[0_14px_40px_rgba(0,26,64,0.35)] md:flex"
        style={{ width: size, height: size }}
        animate={{
          opacity: isHovering ? 1 : 0,
          scale: 1,
          x: position.x - size / 2,
          y: position.y - size / 2,
        }}
        transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0 }}
      >
        <span className="flex items-center gap-0.5 text-[18px] font-bold uppercase tracking-[0.01em]">
          <span className="text-[13px] leading-none">{label}</span>
          <span className="text-[18px] leading-none">&rsaquo;</span>
        </span>
      </motion.div>
    </div>
  )
}
