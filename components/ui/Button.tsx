'use client'

import Link from 'next/link'
import { cn } from '@/lib/cn'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  href?: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

// Foundation: primary px-32 py-14, transitions 150ms
const sizeStyles = {
  sm: 'px-4 py-2 text-[13px]',
  md: 'px-8 py-3.5 text-[14px]',
  lg: 'px-10 py-4 text-[15px]',
}

const variantStyles = {
  primary:
    'bg-[#006aff] text-white font-semibold rounded-btn hover:bg-[#0052cc] transition-colors duration-150',
  secondary:
    'bg-transparent border-[1.5px] border-[#001a40] text-[#001a40] font-semibold rounded-btn hover:bg-[#001a40]/5 transition-colors duration-150',
  ghost:
    'bg-[#f4f3ea] text-[#001a40] font-semibold rounded-btn hover:bg-[#ebe9dc] transition-colors duration-150',
  danger:
    'bg-transparent border-[1.5px] border-[#c0392b] text-[#c0392b] font-semibold rounded-btn hover:bg-[#c0392b]/5 transition-colors duration-150',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'right',
  href,
  children,
  className,
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 cursor-pointer font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006aff]',
    variantStyles[variant],
    sizeStyles[size],
    loading && 'opacity-80 cursor-wait pointer-events-none',
    disabled && !loading && 'opacity-50 cursor-not-allowed pointer-events-none',
    className
  )

  const spinner = (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )

  // Foundation: when loading, spinner replaces text
  const content = loading ? (
    spinner
  ) : (
    <>
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </>
  )

  if (href && !disabled && !loading) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {content}
    </button>
  )
}
