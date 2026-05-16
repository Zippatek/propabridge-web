import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Join the Waitlist | Propabridge',
  description: 'Be the first to know when new verified properties and features launch on Propabridge. Join our waitlist today.',
  openGraph: {
    title: 'Join the Propabridge Waitlist',
    description: 'Get early access to verified property listings across Nigeria. Zero inspection fees.',
    url: 'https://propabridge.com/waitlist',
    siteName: 'Propabridge',
    images: [{ url: 'https://propabridge.com/logo-circle.jpg', width: 400, height: 400 }],
    type: 'website',
  },
}

import Link from 'next/link';

const WaitlistPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(0,106,255,0.14),_transparent_18%),radial-gradient(circle_at_bottom_right,_rgba(0,26,64,0.08),_transparent_26%),#F4F3EA] px-4 py-20">
      <div className="max-w-xl w-full bg-white/95 border border-navy/10 rounded-[28px] p-10 text-center backdrop-blur-sm">
        <span className="inline-flex items-center justify-center rounded-full bg-beige px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-navy mb-6">
          Waitlist
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-navy mb-5 leading-tight">
          Join the Propabridge Waitlist
        </h1>
        <p className="mx-auto max-w-lg text-base sm:text-lg text-grey-subtle mb-8">
          Be the first to get access to verified locations in Abuja, Kaduna, and Minna.
        </p>
        <Link
          href="https://chat.whatsapp.com/Fz5aPGbknm14h60aTFaz4q?mode=gi_t"
          className="inline-flex items-center justify-center rounded-[18px] bg-navy px-10 py-4 text-sm font-semibold text-white shadow-card transition duration-200 ease-in-out hover:bg-navy-light hover:-translate-y-0.5"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join our WhatsApp Group
        </Link>
      </div>
    </div>
  )
}

export default WaitlistPage;
