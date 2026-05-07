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
        // ── PRIMARY PALETTE — Propabridge Design Foundation ──
        navy: {
          DEFAULT: '#001a40',
          light:   '#002a5e',
          50:      '#f0f4ff',
          100:     '#d9e4f5',
        },
        blue: {
          DEFAULT: '#006aff',
          action:  '#006aff',
          hover:   '#0052cc',
        },
        action: {
          DEFAULT: '#006aff',
          hover:   '#0052cc',
          light:   'rgba(0, 106, 255, 0.1)',
        },
        gold: {
          DEFAULT: '#ffc870',
          hover:   '#f5c842',
          light:   'rgba(255, 200, 112, 0.15)',
        },
        beige: {
          DEFAULT: '#f4f3ea',
          dark:    '#ebe9dc',
        },
        // ── SECONDARY / SUPPORT ─────────────────────────────────────
        green: {
          verified: '#1a7a4a',
        },
        verified: {
          DEFAULT: '#1a7a4a',
          light:   'rgba(26, 122, 74, 0.1)',
        },
        amber: {
          DEFAULT: '#d97706',
          warn:    '#d97706',
        },
        warning: {
          DEFAULT: '#d97706',
          light:   'rgba(217, 119, 6, 0.1)',
        },
        red: {
          alert:   '#c0392b',
        },
        danger: {
          DEFAULT: '#c0392b',
          light:   'rgba(192, 57, 43, 0.1)',
        },
        grey: {
          DEFAULT:     '#4a5568',
          subtle:      '#4a5568',
          divider:     '#cbd5e0',
          placeholder: '#a0aec0',
          light:       '#cbd5e0',
        },
        subtle:      '#4a5568',
        divider:     '#cbd5e0',
        placeholder: '#a0aec0',
        heading:     '#001a40',
      },


      fontFamily: {
        // Dashboard-aligned typography stack
        sans: ['var(--font-inter)', 'Inter Display', 'Inter', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        'display-2xl': ['clamp(56px, 10vw, 128px)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'display-xl': ['clamp(40px, 6vw, 64px)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(32px, 4.2vw, 52px)', { lineHeight: '1.08', letterSpacing: '-0.024em' }],
        'display-md': ['clamp(28px, 3.2vw, 40px)', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
        'display-sm': ['28px', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        // Display
        'display': ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        // H1
        'h1': ['36px', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        // H2
        'h2': ['28px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        // H3
        'h3': ['22px', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h4': ['18px', { lineHeight: '1.4', fontWeight: '600' }],
        // Body
        'body-lg': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'body':    ['15px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        // Caption
        'caption': ['12px', { lineHeight: '1.4', fontWeight: '400' }],
        // Badge
        'badge':   ['11px', { lineHeight: '1.3', fontWeight: '600', letterSpacing: '0.04em' }],
        'nav': ['13px', { lineHeight: '1', fontWeight: '500', letterSpacing: '0.02em' }],
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
        '4.5': '18px',
        '18': '72px',
        '22': '88px',
        '30': '120px',
      },

      borderRadius: {
        'card':      '12px',
        'btn':       '8px',
        'button':    '8px',
        'container': '8px',
        'input':     '8px',
        'panel':     '8px',
        'badge':     '20px',
        'pill':      '20px',
        'avatar':    '50%',
        'full':      '9999px',
      },

      boxShadow: {
        'card':       '0 4px 24px rgba(0, 26, 64, 0.08)',
        'card-hover': '0 8px 32px rgba(0, 26, 64, 0.12)',
        'verified':   '0 2px 12px rgba(0, 26, 64, 0.14)',
        'badge':      '0 2px 12px rgba(0, 26, 64, 0.14)',
        'float':      '0 8px 32px rgba(0, 26, 64, 0.12)',
        'navbar':     '0 2px 12px rgba(0, 0, 0, 0.08)',
        'modal':      '0 20px 60px rgba(0, 26, 64, 0.18)',
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
