'use client'

import { useState } from 'react'

const PROPERTY_TYPES = [
  'Apartment',
  'Terrace House',
  'Detached House',
  'Semi-Detached',
  'Duplex',
  'Land',
  'Commercial',
  'Off-Plan',
]

interface FormData {
  name: string
  phone: string
  email: string
  propertyType: string
  location: string
  bedrooms: string
  bathrooms: string
  propertySize: string
  yearBuilt: string
  lotSize: string
  bestTimeToCall: string
  message: string
}

const INITIAL: FormData = {
  name: '',
  phone: '',
  email: '',
  propertyType: '',
  location: '',
  bedrooms: '',
  bathrooms: '',
  propertySize: '',
  yearBuilt: '',
  lotSize: '',
  bestTimeToCall: '',
  message: '',
}

const inputBase =
  'w-full bg-[#f4f3ea] border border-transparent rounded-[10px] h-[52px] px-4 text-[15px] text-navy placeholder:text-navy/40 focus:outline-none focus:ring-2 focus:ring-blue/40 transition-all'

const textareaBase =
  'w-full bg-[#f4f3ea] border border-transparent rounded-[10px] p-4 text-[15px] text-navy placeholder:text-navy/40 focus:outline-none focus:ring-2 focus:ring-blue/40 transition-all resize-none'

const labelBase = 'block text-[13px] font-semibold text-navy mb-2'

export default function SellValuationForm() {
  const [form, setForm] = useState<FormData>(INITIAL)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [submitted, setSubmitted] = useState(false)

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.phone.trim()) newErrors.phone = 'Phone is required'
    if (!form.email.trim()) newErrors.email = 'Email is required'
    if (!form.propertyType) newErrors.propertyType = 'Please select a property type'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    // Mock submission
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <div className="w-14 h-14 rounded-full bg-blue/10 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#006aff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="text-navy font-bold text-[20px]">Request Received!</p>
        <p className="text-grey text-[15px] max-w-[280px]">
          Our team will contact you within 24 hours with your property valuation.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

      {/* Row 1: Name + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="sell-name" className={labelBase}>Name</label>
          <input
            id="sell-name"
            type="text"
            className={inputBase}
            placeholder="Jane Smith"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="text-red-500 text-[12px] mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="sell-phone" className={labelBase}>Phone</label>
          <input
            id="sell-phone"
            type="tel"
            className={inputBase}
            placeholder="(123) 456-7890"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && <p className="text-red-500 text-[12px] mt-1">{errors.phone}</p>}
        </div>
      </div>

      {/* Row 2: Email */}
      <div>
        <label htmlFor="sell-email" className={labelBase}>Email</label>
        <input
          id="sell-email"
          type="email"
          className={inputBase}
          placeholder="jane@propabridge.com"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className="text-red-500 text-[12px] mt-1">{errors.email}</p>}
      </div>

      {/* Row 3: Property Type */}
      <div>
        <label htmlFor="sell-property-type" className={labelBase}>Property type</label>
        <div className="relative">
          <select
            id="sell-property-type"
            className={`${inputBase} appearance-none pr-10 cursor-pointer`}
            value={form.propertyType}
            onChange={(e) => update('propertyType', e.target.value)}
            aria-invalid={!!errors.propertyType}
          >
            <option value="" disabled>Select...</option>
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#001a40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
        {errors.propertyType && <p className="text-red-500 text-[12px] mt-1">{errors.propertyType}</p>}
      </div>

      {/* Row 4: Location */}
      <div>
        <label htmlFor="sell-location" className={labelBase}>Location</label>
        <input
          id="sell-location"
          type="text"
          className={inputBase}
          placeholder="City, State, ZIP"
          value={form.location}
          onChange={(e) => update('location', e.target.value)}
        />
      </div>

      {/* Row 5: Bedrooms + Bathrooms + Property Size */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="sell-bedrooms" className={labelBase}>Bedrooms</label>
          <input
            id="sell-bedrooms"
            type="number"
            min="0"
            className={inputBase}
            placeholder="5"
            value={form.bedrooms}
            onChange={(e) => update('bedrooms', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="sell-bathrooms" className={labelBase}>Bathrooms</label>
          <input
            id="sell-bathrooms"
            type="number"
            min="0"
            className={inputBase}
            placeholder="4"
            value={form.bathrooms}
            onChange={(e) => update('bathrooms', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="sell-size" className={labelBase}>Property Size (SQFT)</label>
          <input
            id="sell-size"
            type="number"
            min="0"
            className={inputBase}
            placeholder="e.g., 1500"
            value={form.propertySize}
            onChange={(e) => update('propertySize', e.target.value)}
          />
        </div>
      </div>

      {/* Row 6: Year Built + Lot Size + Best Time to Call */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="sell-year" className={labelBase}>Year Built</label>
          <input
            id="sell-year"
            type="number"
            min="1900"
            max="2026"
            className={inputBase}
            placeholder="2015"
            value={form.yearBuilt}
            onChange={(e) => update('yearBuilt', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="sell-lot" className={labelBase}>Lot Size</label>
          <input
            id="sell-lot"
            type="text"
            className={inputBase}
            placeholder="e.g., 6000"
            value={form.lotSize}
            onChange={(e) => update('lotSize', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="sell-time" className={labelBase}>Best Time to Call</label>
          <input
            id="sell-time"
            type="time"
            className={inputBase}
            value={form.bestTimeToCall}
            onChange={(e) => update('bestTimeToCall', e.target.value)}
          />
        </div>
      </div>

      {/* Row 7: Message */}
      <div>
        <label htmlFor="sell-message" className={labelBase}>Messsage</label>
        <textarea
          id="sell-message"
          rows={4}
          className={textareaBase}
          placeholder="Write your message here"
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-navy hover:bg-navy/90 text-white font-bold text-[14px] uppercase tracking-[0.1em] h-[58px] rounded-[10px] transition-colors duration-200 mt-2"
      >
        SHOW ME THE VALUE
        <span aria-hidden="true">›</span>
      </button>

    </form>
  )
}
