'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Home as HouseSimple, Sparkles as Sparkle, Camera, User, ArrowRight, ChevronDown as CaretDown,
} from 'lucide-react';

const PROPERTY_TYPES = [
  'Single-Family Home', 'Condo / Apartment', 'Townhouse', 'Multi-Family Home',
  'Land / Lot', 'Commercial Property', 'Luxury Home', 'Vacation Home', 'Others',
];

const BEST_TIMES = ['Morning (8am–12pm)', 'Afternoon (12pm–4pm)', 'Evening (4pm–7pm)', 'Anytime'];

interface FormData {
  title: string;
  propertyType: string;
  listingType: 'sale' | 'rent';
  price: string;
  location: string;
  bedrooms: string;
  bathrooms: string;
  interiorArea: string;
  yearBuilt: string;
  lotSize: string;
  parking: string;
  floors: string;
  interior: string;
  exterior: string;
  building: string;
  mediaLink: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  ownerType: string;
  bestTime: string;
  message: string;
}

const initialForm: FormData = {
  title: '', propertyType: '', listingType: 'sale', price: '', location: '',
  bedrooms: '', bathrooms: '', interiorArea: '', yearBuilt: '', lotSize: '', parking: '', floors: '',
  interior: '', exterior: '', building: '',
  mediaLink: '',
  ownerName: '', ownerPhone: '', ownerEmail: '', ownerType: '', bestTime: '', message: '',
};

// ── Shared styles ───────────────────────────────────────────────────────────────
const inputCls = 'w-full bg-[#f4f3ea] border border-transparent rounded-[6px] px-4 py-3 text-[14px] text-[#001a40] placeholder:text-[#a0a090] outline-none focus:ring-1 focus:ring-[#ffc870] focus:border-[#ffc870] transition';
const labelCls = 'block text-[#001a40] font-medium text-[14px] mb-2';

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
}

function SectionHeader({ icon, title }: SectionHeaderProps) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2.5 mb-3">
        <span className="text-[#001a40]">{icon}</span>
        <h3 className="text-[#001a40] font-semibold text-[18px]">{title}</h3>
      </div>
      <hr className="border-t border-[#d0cec4]" />
    </div>
  );
}

interface CustomDropdownProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
}

function CustomDropdown({ options, value, onChange, placeholder }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`${inputCls} w-full flex items-center justify-between text-left ${isOpen ? '!border-[#ffc870] !ring-1 !ring-[#ffc870]' : ''
          }`}
      >
        <span className={value ? 'text-[#001a40]' : 'text-[#a0a090] text-[14px]'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <CaretDown size={16} className="text-[#001a40]" />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-[#eceae0] border border-[#d8d6cc] rounded-[6px] shadow-lg max-h-[250px] overflow-y-auto py-2">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`w-full text-left px-4 py-2.5 text-[14px] transition-colors hover:bg-[#d8d6cc] ${value === opt.value ? 'bg-[#d8d6cc] font-medium text-[#001a40]' : 'text-[#001a40]'
                }`}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function SubmitPropertyForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.ownerName,
        phone: form.ownerPhone,
        email: form.ownerEmail,
        intent: form.listingType === 'rent' ? 'rent' : 'sell',
        source: 'submit_property_form',
        status: 'new',
      }),
    });
  } catch {}
  setSubmitted(true);
};

  if (submitted) {
    return (
      <div className="bg-[#eceae0] rounded-[12px] p-10 md:p-14 text-center">
        <div className="w-[72px] h-[72px] rounded-full bg-[#1a7a4a]/10 flex items-center justify-center mx-auto mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a7a4a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-[#001a40] font-bold text-[24px] mb-3">Submission Received!</h3>
        <p className="text-[#4a5568] text-[15px] leading-[1.6] max-w-md mx-auto">
          Our team will review your property details and reach out within 24 hours to schedule a physical inspection.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-white rounded-[12px] p-8 md:p-10 shadow-sm border border-[#eceae0]">

      {/* ── SECTION A: Basic Details ──────────────────────────────────── */}
      <div className="mb-8">
        <SectionHeader icon={<HouseSimple size={20} />} title="Basic Details" />

        {/* Row 1: Property Title + Property Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <div>
            <label className={labelCls}>Property Title</label>
            <input type="text" className={inputCls} placeholder="Enter Property Title" value={form.title} onChange={(e) => set('title', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Property type</label>
            <CustomDropdown
              options={PROPERTY_TYPES.map(t => ({ label: t, value: t }))}
              value={form.propertyType}
              onChange={(val) => set('propertyType', val)}
              placeholder="Select..."
            />
          </div>
        </div>

        {/* Listing Type — radio buttons */}
        <div className="mb-5">
          <label className={labelCls}>Listing type</label>
          <div className="flex flex-col gap-2.5">
            {(['sale', 'rent'] as const).map((type) => (
              <label key={type} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="listingType"
                  value={type}
                  checked={form.listingType === type}
                  onChange={() => set('listingType', type)}
                  className="w-4 h-4 accent-[#ffc870] cursor-pointer"
                />
                <span className="text-[#001a40] text-[14px]">For {type === 'sale' ? 'Sale' : 'Rent'}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price or Rate */}
        <div className="mb-5">
          <label className={labelCls}>Price or Rate</label>
          <input type="text" className={inputCls} placeholder="₦20000/m" value={form.price} onChange={(e) => set('price', e.target.value)} />
        </div>

        {/* Location */}
        <div>
          <label className={labelCls}>Location</label>
          <input type="text" className={inputCls} placeholder="Street, Area, City — e.g. 5 Gwarinpa Avenue, Abuja" value={form.location} onChange={(e) => set('location', e.target.value)} />
        </div>
      </div>

      {/* ── SECTION B: Property Info ──────────────────────────────────── */}
      <div className="mb-8">
        <SectionHeader icon={<HouseSimple size={20} />} title="Property info" />

        {/* Row 1: Bedrooms + Bathrooms + Interior Area (3 cols) */}
        <div className="grid grid-cols-3 gap-4 mb-5">
          <div>
            <label className={labelCls}>Bedrooms</label>
            <input type="number" min="0" className={inputCls} placeholder="5" value={form.bedrooms} onChange={(e) => set('bedrooms', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Bathrooms</label>
            <input type="number" min="0" className={inputCls} placeholder="4" value={form.bathrooms} onChange={(e) => set('bathrooms', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Interior Area</label>
            <input type="text" className={inputCls} placeholder="e.g., 1500 sq ft" value={form.interiorArea} onChange={(e) => set('interiorArea', e.target.value)} />
          </div>
        </div>

        {/* Row 2: Year Built + Lot Size (2 cols) */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className={labelCls}>Year Built</label>
            <input type="text" className={inputCls} placeholder="2015" value={form.yearBuilt} onChange={(e) => set('yearBuilt', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Lot Size</label>
            <input type="text" className={inputCls} placeholder="e.g., 6000 sq ft" value={form.lotSize} onChange={(e) => set('lotSize', e.target.value)} />
          </div>
        </div>

        {/* Row 3: Parking + Floors/Level (2 cols) */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Parking</label>
            <input type="text" className={inputCls} placeholder="2" value={form.parking} onChange={(e) => set('parking', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Floors / Level</label>
            <input type="text" className={inputCls} placeholder="2" value={form.floors} onChange={(e) => set('floors', e.target.value)} />
          </div>
        </div>
      </div>

      {/* ── SECTION C: Features & Amenities ──────────────────────────── */}
      <div className="mb-8">
        <SectionHeader icon={<Sparkle size={20} />} title="Features & amenities" />

        <div className="space-y-5">
          <div>
            <label className={labelCls}>Interior</label>
            <textarea
              className={inputCls + ' resize-y min-h-[88px]'}
              placeholder="Modern kitchen, laundry, AC, smart home, etc."
              value={form.interior}
              onChange={(e) => set('interior', e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>Exterior</label>
            <textarea
              className={inputCls + ' resize-y min-h-[88px]'}
              placeholder="Balcony, pool, garden, rooftop, sea view, etc."
              value={form.exterior}
              onChange={(e) => set('exterior', e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>Building</label>
            <textarea
              className={inputCls + ' resize-y min-h-[88px]'}
              placeholder="Gym, concierge, elevator, parking"
              value={form.building}
              onChange={(e) => set('building', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ── SECTION D: Media ─────────────────────────────────────────── */}
      <div className="mb-8">
        <SectionHeader icon={<Camera size={20} />} title="Media" />
        <div>
          <label className={labelCls}>Photo, Video & Floor Plan</label>
          <input
            type="url"
            className={inputCls}
            placeholder="Paste your Google Drive or other cloud storage link"
            value={form.mediaLink}
            onChange={(e) => set('mediaLink', e.target.value)}
          />
        </div>
      </div>

      {/* ── SECTION E: Owner Info ─────────────────────────────────────── */}
      <div className="mb-8">
        <SectionHeader icon={<User size={20} />} title="Owner Info" />

        {/* Name + Phone */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className={labelCls}>Name</label>
            <input type="text" className={inputCls} placeholder="Jane Smith" value={form.ownerName} onChange={(e) => set('ownerName', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Phone</label>
            <input type="tel" className={inputCls} placeholder="(123) 456-7890" value={form.ownerPhone} onChange={(e) => set('ownerPhone', e.target.value)} />
          </div>
        </div>

        {/* Email — full width */}
        <div className="mb-5">
          <label className={labelCls}>Email</label>
          <input type="email" className={inputCls} placeholder="jane@propabridge.com" value={form.ownerEmail} onChange={(e) => set('ownerEmail', e.target.value)} />
        </div>

        {/* Owner/Agent + Best Time to Call */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className={labelCls}>Owner / Agent Info</label>
            <CustomDropdown
              options={[
                { label: 'I am the property owner', value: 'owner' },
                { label: 'I am a licensed agent', value: 'agent' },
                { label: 'I am a developer', value: 'developer' }
              ]}
              value={form.ownerType}
              onChange={(val) => set('ownerType', val)}
              placeholder="Select..."
            />
          </div>
          <div>
            <label className={labelCls}>Best Time to Call</label>
            <input
              type="time"
              className={inputCls + ' cursor-pointer'}
              value={form.bestTime}
              onChange={(e) => set('bestTime', e.target.value)}
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className={labelCls}>Messsage</label>
          <textarea
            className={inputCls + ' resize-y min-h-[112px]'}
            placeholder="Write your message here"
            value={form.message}
            onChange={(e) => set('message', e.target.value)}
          />
        </div>
      </div>

      {/* ── SUBMIT BUTTON ─────────────────────────────────────────────── */}
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-[#001a40] hover:bg-[#002a5e] text-white font-bold text-[13px] uppercase tracking-[0.08em] py-4 rounded-[8px] transition-all duration-200"
      >
        SUBMIT FOR REVIEW
        <ArrowRight size={15} />
      </button>

    </form>
  );
}
