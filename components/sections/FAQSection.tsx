'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { cn } from '@/lib/cn'

const FAQ_ITEMS = [
  {
    id: 'faq-1',
    question: 'How do I know the listings are real and up to date?',
    answer:
      "We verify every property before it goes live on our site and update them regularly to avoid wasting your time. That means no fake homes, no expired rentals, and no confusing duplicates. When you see a property here, you can trust that it's real and available.",
  },
  {
    id: 'faq-2',
    question: 'Are there really no inspection fees?',
    answer:
      'None. Zero. The practice of chargin tenants to view a house is exploitative, and we refuse to to do it. Your search, chat with Propa, and view properties completely free. We only earn a standard commission when you successfully find and sign for a property.',
  },
  {
    id: 'faq-3',
    question: "Why don't I see which agent listed the property?",
    answer:
      'Because that is how we protect you. In the traditional market, you are gambling on whether the person behind a listing is real.On Propabridge, you deal with us — a registered company that has already done the verification.We manage the agent relationship in the background so you never have to.',
  },
  {
    id: 'faq-4',
    question: 'Can you help me sell my current home?',
    answer:
      "Yes! We don't just list homes — we help you get the best price. Our services include professional valuation, staging tips, photography, marketing campaigns, and handling offers. We'll guide you from the very first consultation until the day you hand over the keys.",
  },
  {
    id: 'faq-5',
    question: 'How do you verify the properties?',
    answer:
      "Our team physically visits every property before it goes live. We check that the photos match reality, sight the original title documents, verify ownership, and sign a binding agreement with the property owner. If it hasn't passed all of this — it doesn't appear on our platform.",
  },
  {
    id: 'faq-6',
    question: 'How does Propa work?',
    answer:
      "Just chat with her — on our website or WhatsApp. Tell her what you need in plain language. She searches our verified database instantly, presents the best matches, and can book you a viewing right in the conversation. No forms. No waiting. Just answers.",
  },
  {
    id: 'faq-7',
    question: 'How much commission do you charge?',
    answer:
      "Our commission rates vary depending on the property type and service you need, but we're always transparent. No hidden fees, no surprise charges — we'll explain everything upfront so you know exactly what you're paying for and why.",
  },
  {
    id: 'faq-8',
    question: 'Can you help me get a mortgage or loan?',
    answer:
      "Yes! We work with a network of verified lenders and mortgage brokers. While we don't give out loans ourselves, we connect you with the right people, explain your financing options, and help you understand the paperwork. Think of us as your bridge between lenders and your dream home.",
  },
  {
    id: 'faq-9',
    question: "I'm a landlord or developer. How do I list with you?",
    answer:
      "Visit the 'Submit Property' page and fill in your details. We'll contact you, conduct our verification, and once approved, we upload and market your property across our platform. You deal only with us — no chaotic open-agent model.",
  },
  {
    id: 'faq-10',
    question: 'How are you different from PropertyPro or Nigeria Property Centre?',
    answer:
      "They are open marketplaces — anyone can list. We are a curated platform — only verified properties from vetted sources are uploaded, by our team, under our name. On those platforms, fraud risk is yours. Here, it's ours.",
  },
]

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section className="bg-beige section-pt section-pb" aria-labelledby="faq-heading">
      {/* ── TOP DIVIDER ── */}
      <hr className="border-t border-grey-light mx-6 mb-12" aria-hidden="true" />

      <div className="container-site">
        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-16 pt-8">
          <div className="flex items-center gap-2 pt-2 md:w-[30%] shrink-0">
            <span className="inline-block w-2.5 h-2.5 rounded-sm bg-navy shrink-0" aria-hidden="true" />
            <p className="text-[12px] font-semibold text-navy uppercase tracking-[0.08em]">
              FAQS
            </p>
          </div>
          <h2
            id="faq-heading"
            className="text-display-lg faq-contact-heading-copy text-heading md:w-[70%] max-w-[650px] mr-auto"
          >
            Everything you wanted to ask (but didn&apos;t know who to)
          </h2>
        </div>

        {/* ── CONTENT GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

          {/* LEFT: CONTACT FORM */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="bg-[#FFFFF2] rounded-[24px] p-8 lg:p-10 border border-[#ecece0]/50 sticky top-24">
              <h3 className="text-navy faq-contact-heading-copy text-[24px] lg:text-[28px] mb-8">
                We&apos;re just a form away—send us your question, and we&apos;ll be happy to help!
              </h3>

              <form className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="faq-name" className="faq-contact-form-label text-navy">
                      Name
                    </label>
                    <input
                      type="text"
                      id="faq-name"
                      className="bg-[#F4F3EA]/70 border-none rounded-btn h-[52px] px-4 text-[15px] focus:ring-1 focus:ring-navy outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="faq-phone" className="faq-contact-form-label text-navy">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="faq-phone"
                      className="bg-[#F4F3EA]/70 border-none rounded-btn h-[52px] px-4 text-[15px] focus:ring-1 focus:ring-navy outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="faq-email" className="faq-contact-form-label text-navy">
                    Email
                  </label>
                  <input
                    type="email"
                    id="faq-email"
                    className="bg-[#F4F3EA]/70 border-none rounded-btn h-[52px] px-4 text-[15px] focus:ring-1 focus:ring-navy outline-none"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="faq-message" className="faq-contact-form-label text-navy">
                    Message
                  </label>
                  <textarea
                    id="faq-message"
                    rows={4}
                    className="bg-[#F4F3EA]/70 border-none rounded-btn p-4 text-[15px] focus:ring-1 focus:ring-navy outline-none resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="mt-4 bg-navy text-white font-bold text-[14px] uppercase tracking-wider h-[56px] rounded-btn flex items-center justify-center gap-2 hover:bg-navy/90 transition-colors"
                >
                  SEND MESSAGE
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6"></path>
                  </svg>
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT: ACCORDION */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col pt-2">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openId === item.id
              return (
                <div
                  key={item.id}
                  className={cn(
                    'border-b border-grey-light/60 py-5 lg:py-6',
                    index === 0 && 'border-t'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => toggle(item.id)}
                    className="w-full flex items-start gap-4 text-left group focus-visible:outline-none"
                    aria-expanded={isOpen}
                    aria-controls={`${item.id}-answer`}
                    id={`${item.id}-btn`}
                  >
                    <div className="shrink-0 mt-0.5 w-[36px] h-[36px] rounded-full border border-grey-light flex items-center justify-center text-navy group-hover:border-navy transition-colors">
                      {isOpen ? (
                        <X size={14} />
                      ) : (
                        <Plus size={14} />
                      )}
                    </div>

                    <span className="text-navy font-medium text-[18px] lg:text-[20px] leading-[1.3] pt-1">
                      {item.question}
                    </span>
                  </button>

                  {/* Answer — CSS height animation */}
                  <div
                    id={`${item.id}-answer`}
                    role="region"
                    aria-labelledby={`${item.id}-btn`}
                    className={cn(
                      'overflow-hidden transition-all duration-300 ease-in-out pl-[52px]',
                      isOpen ? 'max-h-[400px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
                    )}
                  >
                    <p className="faq-contact-answer-copy text-grey text-[15px] lg:text-[16px] max-w-[600px] pb-2">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}

