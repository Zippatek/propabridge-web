'use client';

import { useState } from 'react';
import { Plus, X } from '@phosphor-icons/react/dist/ssr';
import { cn } from '@/lib/cn';

const FAQ_ITEMS = [
  {
    id: 'sp-faq-1',
    question: 'How do I submit my property?',
    answer: "Just fill out our quick form with your property details, photos, and contact info. Our team reviews it, assigns an agent, and gets your listing ready to go live fast.",
  },
  {
    id: 'sp-faq-2',
    question: 'Can I list both rentals and properties for sale?',
    answer: 'Absolutely! You can choose \u201cFor Rent\u201d or \u201cFor Sale\u201d in the form \u2014 we handle both. Each listing is optimized differently to reach the right audience.',
  },
  {
    id: 'sp-faq-3',
    question: 'Is there any fee to submit a property?',
    answer: 'No upfront fees! Listing is completely free. We only earn a commission when your property is successfully rented or sold through our agency.',
  },
  {
    id: 'sp-faq-4',
    question: 'What happens after I submit this form?',
    answer: "Our team contacts you within 24 hours to schedule a physical inspection and review your title documents. Nothing goes live until we\u2019ve verified everything ourselves.",
  },
  {
    id: 'sp-faq-5',
    question: 'Do you accept properties from agents?',
    answer: "Yes \u2014 verified agencies can submit on behalf of landlords and developers. You\u2019ll appear as the submitting party, but the listing goes up under Propabridge.",
  },
  {
    id: 'sp-faq-6',
    question: 'What documents do I need?',
    answer: "At minimum: proof of ownership or authorization to list, and a valid ID. Our team will guide you through exactly what\u2019s needed for your property type.",
  },
  {
    id: 'sp-faq-7',
    question: 'How long does verification take?',
    answer: 'Typically 2\u20135 working days from your physical inspection appointment. We move as fast as your documents allow.',
  },
  {
    id: 'sp-faq-8',
    question: 'Can I remove my listing whenever I want?',
    answer: "Yes, you\u2019re always in control. Simply notify us or your agent, and we\u2019ll remove your listing immediately \u2014 no hidden commitments.",
  },
  {
    id: 'sp-faq-9',
    question: 'Can I submit a property in Kaduna or Minna?',
    answer: "Yes. We currently cover Abuja, Kaduna, and Minna \u2014 with more cities coming.",
  },
];

export function SubmitPropertyFAQ() {
  const [openId, setOpenId] = useState<string | null>(null);
  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section className="bg-[#f4f3ea] pt-20 pb-24" aria-labelledby="sp-faq-heading">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Top divider ── */}
        <hr className="border-t border-[#c8c6bc] mb-12" />

        {/* ── FAQS tag ── */}
        <div className="flex items-center gap-2 mb-10">
          <span className="inline-block w-[9px] h-[9px] rounded-[2px] bg-[#001a40]" aria-hidden="true" />
          <p className="text-[11px] font-bold text-[#001a40] uppercase tracking-[0.12em]">FAQS</p>
        </div>

        {/* ── Two-column: heading LEFT, accordion RIGHT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* LEFT: Sticky heading */}
          <div>
            <h2
              id="sp-faq-heading"
              className="text-[#001a40] font-medium leading-[1.15] tracking-[-0.02em] lg:sticky lg:top-28"
              style={{ fontSize: 'clamp(32px, 3.8vw, 52px)' }}
            >
              Everything you wanted to ask (but didn&apos;t know who to)
            </h2>
          </div>

          {/* RIGHT: Accordion */}
          <div>
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={cn(
                    'border-b border-[#c8c6bc] py-5',
                    index === 0 && 'border-t'
                  )}
                >
                  {/* Question row */}
                  <button
                    type="button"
                    onClick={() => toggle(item.id)}
                    className="w-full flex items-center gap-5 text-left group focus-visible:outline-none"
                    aria-expanded={isOpen}
                    aria-controls={`${item.id}-answer`}
                    id={`${item.id}-btn`}
                  >
                    {/* Circle button */}
                    <div className="shrink-0 w-[40px] h-[40px] rounded-full border border-[#c8c6bc] flex items-center justify-center text-[#001a40] group-hover:border-[#001a40] transition-colors">
                      {isOpen
                        ? <X size={14} weight="bold" />
                        : <Plus size={14} weight="bold" />
                      }
                    </div>
                    <span className="text-[#001a40] font-bold text-[18px] leading-[1.35]">
                      {item.question}
                    </span>
                  </button>

                  {/* Answer — flush left, no indent */}
                  <div
                    id={`${item.id}-answer`}
                    role="region"
                    aria-labelledby={`${item.id}-btn`}
                    className={cn(
                      'overflow-hidden transition-all duration-300 ease-in-out',
                      isOpen ? 'max-h-[300px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
                    )}
                  >
                    <p className="text-[#4a5568] text-[15px] leading-[1.7] pb-2">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
