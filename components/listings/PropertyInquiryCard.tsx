'use client';

import { useState } from 'react';
import { Phone } from 'lucide-react';
import Image from 'next/image';
import { Property } from '@/lib/types';
import { PUBLIC_API_URL } from '@/lib/env-public';
import { dispatchOpenPropaChat } from '@/components/layout/PropaChatContext';

interface Props { property: Property }

// PropaAI WhatsApp number (international format, no +)
const PROPA_AI_WA = '2348055551300';

export function PropertyInquiryCard({ property }: Props) {
  const [form, setForm] = useState({ name: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    setLoading(true);
    setError(null);
    try {
      // Use the correct endpoint: /api/tour (api-gateway /api/tour route)
      // Fallback to /scheduler/book if that fails
      const propertyId = property.property_id || property.id || property.slug;
      const date = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      const res = await fetch(`${PUBLIC_API_URL}/scheduler/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          property_id: propertyId,
          lead_name: form.name,
          lead_phone: form.phone,
          property_title: property.title,
          date,
          time: '10:00 AM',
        }),
      });

      if (!res.ok) {
        // If scheduler fails (e.g. property_id not in DB), fallback to lead capture
        const fallback = await fetch(`${PUBLIC_API_URL}/leads`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name,
            phone: form.phone,
            intent: 'viewing',
            property_id: propertyId,
            message: `Interested in viewing: ${property.title}`,
          }),
        });
        if (!fallback.ok) throw new Error('Submission failed');
      }

      setSubmitted(true);
    } catch {
      setError('Something went wrong. Try WhatsApp instead.');
    } finally {
      setLoading(false);
    }
  };

  const waMessage = encodeURIComponent(
    `Hi PropaAI! I'm interested in viewing this property:\n*${property.title}*\n${property.location ? `📍 ${property.location}` : ''}\n\nCan you help me arrange a tour?`
  );
  const waHref = `https://wa.me/${PROPA_AI_WA}?text=${waMessage}`;

  // Open the PropaAI chat widget pre-filled with the same WhatsApp-style prompt
  const propaAIPrompt = `Hi PropaAI! I'm interested in viewing this property:\n*${property.title}*\n${property.location ? `📍 ${property.location}` : ''}\n\nCan you help me arrange a tour?`;

  const openPropaAIChat = () => {
    // Inject the opening message into the widget iframe so PropaAI already
    // knows the property context when the panel opens
    window.dispatchEvent(
      new CustomEvent('propa-chat-context', {
        detail: { type: 'propa-chat-context', context: propaAIPrompt },
      })
    );
    dispatchOpenPropaChat();
  };

  return (
    <div className="flex flex-col gap-4">
      {/* ── Card 1: PropaAI ───────────────────────────────────────────── */}
      <div className="bg-[#001a40] rounded-[14px] p-6">
        <div className="flex items-start gap-3.5 mb-5">
          {/* Gold icon on navy — brand gold gives strong contrast on dark navy */}
          <div className="w-10 h-10 flex-shrink-0 rounded-[10px] bg-white/10 flex items-center justify-center overflow-hidden">
            <Image
              src="/pbblueicon.png"
              alt="PropaAI"
              width={26}
              height={26}
              className="object-contain"
              style={{ filter: 'brightness(0) saturate(100%) invert(83%) sepia(55%) saturate(700%) hue-rotate(345deg) brightness(105%)' }}
            />
          </div>
          <div>
            <p className="text-white font-bold text-[15px] leading-tight mb-1">
              PropaAI knows this property
            </p>
            <p className="text-[#a0aec0] text-[12px] leading-[1.5]">
              Ask about price trends, similar listings, neighbourhood safety, or negotiate — our AI handles it all.
            </p>
          </div>
        </div>

        {/* Primary: Open chat widget with property context */}
        <button
          onClick={openPropaAIChat}
          className="w-full flex items-center justify-center gap-2 bg-[#006aff] hover:bg-[#0052cc] text-white font-bold text-[13px] uppercase tracking-[0.06em] py-3.5 rounded-[8px] transition-all duration-200 mb-2.5"
        >
          {/* Pure white on blue button */}
          <Image
            src="/pbblueicon.png"
            alt=""
            width={16}
            height={16}
            className="object-contain"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
          ASK PROPAAI ABOUT THIS
        </button>

        {/* Secondary: WhatsApp */}
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 border border-[#ffffff18] hover:border-[#25D366] text-[#a0aec0] hover:text-[#25D366] font-semibold text-[12px] uppercase tracking-[0.05em] py-2.5 rounded-[8px] transition-all duration-200"
        >
          {/* WhatsApp SVG */}
          <svg width="15" height="15" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
            <path d="M16 0C7.164 0 0 7.163 0 16c0 2.822.737 5.474 2.027 7.782L0 32l8.418-2.007A15.931 15.931 0 0016 32c8.836 0 16-7.163 16-16S24.836 0 16 0zm8.293 22.734c-.344.967-2.01 1.84-2.758 1.937-.71.09-1.604.128-2.586-.162-.596-.178-1.362-.414-2.346-.813C12.28 22.2 9.587 18.97 9.38 18.706c-.207-.263-1.69-2.252-1.69-4.297s1.072-3.047 1.45-3.46c.378-.414.828-.518 1.104-.518.276 0 .552.003.793.015.253.012.593-.096.928.708.344.82 1.166 2.864 1.27 3.073.104.208.173.45.034.726-.138.276-.207.449-.414.69-.207.24-.434.538-.621.723-.207.207-.422.43-.182.843.24.414 1.067 1.76 2.293 2.85 1.576 1.402 2.906 1.836 3.32 2.043.413.207.656.173.897-.104.242-.276 1.035-1.208 1.312-1.622.276-.414.552-.345.931-.207.38.138 2.413 1.138 2.827 1.345.414.207.69.31.794.483.103.172.103 1.001-.241 1.967z" />
          </svg>
          WHATSAPP PROPAAI
        </a>
      </div>

      {/* ── Card 2: Book a Viewing ────────────────────────────────────── */}
      <div className="bg-white rounded-[14px] p-6 border border-[#e8e7e0]">
        <h3 className="text-[#001a40] font-bold mb-1" style={{ fontSize: 'clamp(16px, 1.4vw, 19px)' }}>
          Book a viewing
        </h3>
        <p className="text-[#4a5568] text-[13px] leading-[1.55] mb-5">
          Two fields. We handle everything else — scheduling, confirmation, reminders.
        </p>

        {submitted ? (
          <div className="bg-[#1a7a4a]/10 border border-[#1a7a4a]/30 rounded-[8px] p-5 text-center">
            <p className="text-[#1a7a4a] font-bold text-[15px] mb-1">You&apos;re booked in ✓</p>
            <p className="text-[#1a7a4a] text-[13px]">We&apos;ll confirm your viewing time within 2 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-[8px] p-3 text-red-600 text-[13px]">
                {error}{' '}
                <a href={waHref} target="_blank" rel="noopener noreferrer" className="underline font-semibold">
                  WhatsApp us
                </a>
              </div>
            )}
            <div>
              <label className="block text-[#001a40] font-semibold text-[11px] uppercase tracking-[0.07em] mb-1.5">
                Your Name
              </label>
              <input
                type="text" name="name" value={form.name} onChange={handleChange}
                placeholder="Full name" required autoComplete="name"
                className="w-full bg-white border-0 rounded-[8px] px-4 py-3 text-[14px] text-[#001a40] placeholder:text-[#a0aec0] outline-none focus:ring-2 focus:ring-[#006aff]/30 transition"
              />
            </div>
            <div>
              <label className="block text-[#001a40] font-semibold text-[11px] uppercase tracking-[0.07em] mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a0aec0]" />
                <input
                  type="tel" name="phone" value={form.phone} onChange={handleChange}
                  placeholder="+234 8xx xxx xxxx" required autoComplete="tel"
                  className="w-full bg-white border-0 rounded-[8px] pl-9 pr-4 py-3 text-[14px] text-[#001a40] placeholder:text-[#a0aec0] outline-none focus:ring-2 focus:ring-[#006aff]/30 transition"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading || !form.name.trim() || !form.phone.trim()}
              className="w-full flex items-center justify-center gap-2 bg-[#001a40] hover:bg-[#002a5e] disabled:bg-[#001a40]/40 text-white font-bold text-[13px] uppercase tracking-[0.06em] py-4 rounded-[8px] transition-all duration-200 mt-1"
            >
              {loading ? 'BOOKING...' : <>BOOK MY VIEWING <span aria-hidden="true">›</span></>}
            </button>
          </form>
        )}

        <p className="text-[#a0aec0] text-[11px] text-center mt-4 leading-relaxed">
          No spam. No middlemen. Propabridge connects you directly.
        </p>
      </div>
    </div>
  );
}
