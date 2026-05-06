import {
  Eye, Target, Image as PhosphorImage, Chats, ListChecks, ShieldCheck,
} from '@phosphor-icons/react/dist/ssr';
import { ReactNode } from 'react';

interface Perk {
  icon: ReactNode;
  title: string;
  description: string;
}

const PERKS: Perk[] = [
  {
    icon: <Eye size={20} weight="fill" className="text-[#001a40]" />,
    title: 'Maximum Visibility, Faster Closings',
    description: 'Your property is pushed to thousands of active, serious seekers across Nigeria. Better marketing means less time sitting empty.',
  },
  {
    icon: <Target size={20} weight="fill" className="text-[#001a40]" />,
    title: 'AI Speed, Human Expertise',
    description: 'Our smart AI concierge, Propa, matches your property with the exact right clients instantly, while our certified human experts handle the physical tours and negotiations.',
  },
  {
    icon: <PhosphorImage size={20} weight="fill" className="text-[#001a40]" />,
    title: 'Premium Presentation',
    description: 'We turn your space into a showstopper with magazine-style photos and visuals that make people stop scrolling.',
  },
  {
    icon: <Chats size={20} weight="fill" className="text-[#001a40]" />,
    title: 'Only serious buyers reach you',
    description: 'Propa pre-qualifies every inquiry before it becomes a viewing request. No tyre-kickers. No time-wasters. Just people ready to move.',
  },
  {
    icon: <ListChecks size={20} weight="fill" className="text-[#001a40]" />,
    title: 'You stay behind the scenes',
    description: "Your phone isn't ringing all day from strangers. We manage every inquiry, viewing, and follow-up on your behalf.",
  },
  {
    icon: <ShieldCheck size={20} weight="fill" className="text-[#001a40]" />,
    title: 'Secure & Professional Handling',
    description: 'Founded by professional Estate Surveyors, we protect your asset. We ensure all negotiations, paperwork, and legalities meet the highest industry standards.',
  },
];

export function ListingPerksSection() {
  return (
    <section className="bg-[#f4f3ea] pt-20 pb-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Top divider ── */}
        <hr className="border-t border-[#c8c6bc] mb-14" />

        {/* ── Tag (left) + Headline (right) — same row ── */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-12 mb-14">
          {/* Tag pinned to left */}
          <div className="flex items-center gap-2 shrink-0 lg:pt-2">
            <span className="w-[9px] h-[9px] rounded-[2px] bg-[#001a40] inline-block" />
            <span className="text-[#001a40] text-[11px] font-bold uppercase tracking-[0.12em]">
              Listing Perks
            </span>
          </div>

          {/* Headline fills remaining space */}
          <h2
            className="text-[#001a40] font-bold leading-[1.15] tracking-[-0.02em] text-center lg:text-left flex-1"
            style={{ fontSize: 'clamp(28px, 3.8vw, 48px)' }}
          >
            Get expert handling, AI-driven matching,<br className="hidden md:block" /> and real results — all under one roof.
          </h2>
        </div>

        {/* ── Perk cards — 3-column grid, no card boxes ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
          {PERKS.map((perk) => (
            <div key={perk.title}>
              {/* Icon in small dark navy rounded square */}
              <div className="w-[38px] h-[38px] rounded-[8px] flex items-center justify-center mb-4">
                {perk.icon}
              </div>
              <h3 className="text-[#001a40] font-bold text-[14px] mb-2 leading-[1.4]">
                {perk.title}
              </h3>
              <p className="text-[#4a5568] text-[13px] leading-[1.7]">
                {perk.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
