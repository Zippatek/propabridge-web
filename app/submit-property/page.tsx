import { SubmitPropertyForm } from '@/components/forms/SubmitPropertyForm';
import { ListingPerksSection } from '@/components/sections/ListingPerksSection';
import { SubmitPropertyFAQ } from '@/components/sections/SubmitPropertyFAQ';

export const metadata = {
  title: 'Submit Property — Propabridge',
  description: 'Submit your property for listing on Propabridge. Free verification, zero inspection fees, maximum visibility.',
};

export default function SubmitPropertyPage() {
  return (
    <main className="min-h-screen bg-[#f4f3ea]">

      {/* ── PAGE HEADER ─────────────────────────────────────────────── */}
      <section className="pt-16 pb-10 px-4 flex flex-col items-center text-center">

        {/* Centered pill badge */}
        <div className="inline-flex items-center gap-2.5 bg-[#eae9e0] px-4 py-2 rounded-[8px] mb-8">
          <span className="w-[8px] h-[8px] rounded-[2px] bg-[#001a40] inline-block" />
          <span className="text-[#001a40] text-[12px] font-bold font-sans uppercase tracking-[0.08em]">
            Submit Property
          </span>
          <span className="w-[8px] h-[8px] rounded-[2px] bg-[#001a40] inline-block" />
        </div>

        {/* Centered headline */}
        <h1
          className="text-[#001a40] font-medium font-sans leading-[1.15] tracking-[-0.02em] w-full max-w-[800px]"
          style={{ fontSize: 'clamp(28px, 3.5vw, 46px)' }}
        >
          Submit Your Property. Reach<br className="hidden md:block" /> Thousands of Verified Clients.
        </h1>
        <p className="mt-5 text-[#001a40]/70 text-[15px] md:text-[17px] leading-[1.6] max-w-[640px]">
          Get expert handling, AI-driven matching, and real results — all under one roof.
        </p>
      </section>

      {/* ── FORM ────────────────────────────────────────────────────── */}
      <section className="pb-28 px-4">
        <div className="max-w-[760px] mx-auto">
          <SubmitPropertyForm />
        </div>
      </section>

      {/* ── LISTING PERKS ───────────────────────────────────────────── */}
      <ListingPerksSection />

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <SubmitPropertyFAQ />

    </main>
  );
}
