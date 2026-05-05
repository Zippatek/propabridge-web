import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── PRIMARY PALETTE ─────────────────────────────────────────
        navy: {
          DEFAULT: '#001a40',   // Deep Navy — headings, heavy BGs
          light:   '#002a5e',   // Gradient endpoint only
        },
        blue: {
          DEFAULT: '#006aff',   // Electric Blue — CTAs, actions
          hover:   '#0052cc',   // Electric Blue hover state
        },
        gold: {
          DEFAULT: '#ffc870',   // Warm Gold — verified badge, stars, decorative
          hover:   '#f5c842',   // Hero link hover (buy/sell/rent on-hover glow)
        },
        beige: {
          DEFAULT: '#f4f3ea',   // Light Beige — page canvas, card BGs
        },
        // ── SECONDARY / SUPPORT ─────────────────────────────────────
        verified: '#1a7a4a',    // Verified Green — success/verified status
        amber:    '#d97706',    // Amber — pending/caution
        danger:   '#c0392b',    // Alert Red — error/failed (never decorative)
        grey: {
          DEFAULT: '#4a5568',   // Cool Grey — body copy, metadata
          light:   '#cbd5e0',   // Light Grey — borders, dividers
        },
      },


      fontFamily: {
        // Design guideline: Inter first, Plus Jakarta Sans as fallback
        sans: ['var(--font-inter)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        // Display
        'display': ['clamp(40px, 5vw, 56px)', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '800' }],
        // H1
        'h1': ['clamp(32px, 3.5vw, 40px)', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        // H2
        'h2': ['clamp(24px, 2.5vw, 30px)', { lineHeight: '1.25', letterSpacing: '-0.02em', fontWeight: '700' }],
        // H3
        'h3': ['clamp(20px, 2vw, 24px)', { lineHeight: '1.3', fontWeight: '600' }],
        // Body
        'body-lg': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'body':    ['15px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        // Caption
        'caption': ['13px', { lineHeight: '1.4', fontWeight: '400' }],
        // Badge
        'badge':   ['12px', { lineHeight: '1', fontWeight: '600', letterSpacing: '0.02em' }],
      },

      spacing: {
        // 8pt system — always use multiples of 8
        '1':  '4px',
        '2':  '8px',
        '3':  '12px',
        '4':  '16px',
        '6':  '24px',
        '8':  '32px',
        '12': '48px',
        '16': '64px',
        '24': '96px',
      },

      borderRadius: {
        'card':   '12px',
        'btn':    '8px',
        'badge':  '20px',
        'panel':  '8px',
        'avatar': '50%',
        'full':   '9999px',
      },

      boxShadow: {
        // Per design guideline exactly:
        'card':   '0 4px 24px rgba(0, 26, 64, 0.08)',   // Cards — soft, barely visible
        'badge':  '0 2px 12px rgba(0, 26, 64, 0.14)',   // Floating badges
        'float':  '0 8px 32px rgba(0, 26, 64, 0.12)',   // Elevated elements
        'navbar': '0 2px 12px rgba(0, 0, 0, 0.08)',     // Floating navbar scroll state
      },

      transitionDuration: {
        // Design guideline: standard 200ms for all interactions
        DEFAULT: '200ms',
        fast:    '100ms',
        slow:    '300ms',
      },

      transitionTimingFunction: {
        DEFAULT: 'ease-in-out',
      },

      backgroundImage: {
        'navy-gradient': 'linear-gradient(135deg, #001a40 0%, #002a5e 100%)',
        'image-overlay': 'linear-gradient(to top, rgba(0,26,64,0.85) 0%, rgba(0,26,64,0.3) 60%, transparent 100%)',
      },

      maxWidth: {
        'site': '1280px',
        'text': '720px',
      },
    },
  },
  plugins: [],
}

export default config
