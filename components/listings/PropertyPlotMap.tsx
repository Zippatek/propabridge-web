'use client';

import { useState } from 'react';
import Image from 'next/image';

// Two distinct static map images sourced from the propabridge bucket.
const SATELLITE_IMAGE = 'https://storage.googleapis.com/propabridge-listings-us/neighborhoods/millenium-city/1d89c15ac857.webp';
const BLUEPRINT_IMAGE = 'https://storage.googleapis.com/propabridge-listings-us/neighborhoods/millenium-city/219282d2f5af.webp';

// Plot grid — 2 rows × 3 cols, each cell has a status color
const PLOT_GRID = [
  ['available', 'available', 'reserved'],
  ['available', 'reserved',  'sold'    ],
];

const PLOT_COLOR: Record<string, string> = {
  available: 'rgba(26, 122, 74, 0.82)',   // verified green
  reserved:  'rgba(217, 119, 6, 0.82)',   // amber
  sold:      'rgba(192, 57, 43, 0.82)',   // alert red
};

const LEGEND = [
  { label: 'Available', color: '#1a7a4a' },
  { label: 'Reserved',  color: '#d97706' },
  { label: 'Sold',      color: '#c0392b' },
];

export function PropertyPlotMap() {
  const [view, setView] = useState<'satellite' | 'blueprint'>('satellite');

  return (
    <div className="container-site mb-16">
      {/* Map Container */}
      <div
        className="relative w-full overflow-hidden rounded-[16px]"
        style={{ height: '430px' }}
      >
        {/* ── Static Map Image ── */}
        <Image
          src={view === 'satellite' ? SATELLITE_IMAGE : BLUEPRINT_IMAGE}
          alt="Property plot map"
          fill
          className={`object-cover transition-all duration-500 ${
            view === 'blueprint' ? 'grayscale brightness-110 contrast-[1.15]' : ''
          }`}
          sizes="100vw"
          priority
        />

        {/* Dark scrim so UI elements are readable */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />

        {/* ── Blueprint / Satellite Toggle (top-right) ── */}
        <div className="absolute top-4 right-4 z-10 bg-[#001a40]/90 backdrop-blur-sm rounded-lg overflow-hidden flex shadow-lg">
          {(['blueprint', 'satellite'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setView(mode)}
              className={`px-4 py-2 text-[13px] font-semibold capitalize transition-all duration-200 ${
                view === mode
                  ? 'bg-white text-[#001a40]'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>

        {/* ── Plot Grid Overlay (centered slightly left of center) ── */}
        <div
          className="absolute z-10"
          style={{ top: '50%', left: '50%', transform: 'translate(-60%, -50%)' }}
        >
          {/* Outer white border wrapper */}
          <div
            className="grid gap-[3px] p-[3px] bg-white shadow-xl"
            style={{
              gridTemplateColumns: 'repeat(3, 52px)',
              gridTemplateRows:    'repeat(2, 52px)',
            }}
          >
            {PLOT_GRID.map((row, ri) =>
              row.map((status, ci) => (
                <div
                  key={`${ri}-${ci}`}
                  className="w-full h-full transition-opacity duration-200 hover:opacity-90 cursor-pointer"
                  style={{ backgroundColor: PLOT_COLOR[status] }}
                  title={status.charAt(0).toUpperCase() + status.slice(1)}
                />
              ))
            )}
          </div>
        </div>

        {/* ── Plot Status Legend (bottom-left) ── */}
        <div className="absolute bottom-5 left-5 z-10">
          <p className="text-white font-bold text-[13px] mb-2 drop-shadow-md">
            Plot Status
          </p>
          <div className="flex flex-col gap-1.5">
            {LEGEND.map(({ label, color }) => (
              <div key={label} className="flex items-center gap-2">
                <span
                  className="inline-block w-[14px] h-[14px] rounded-[2px] flex-shrink-0"
                  style={{ backgroundColor: color }}
                />
                <span className="text-white text-[12px] font-medium drop-shadow-md">
                  {label}
                </span>
              </div>
            ))}
          </div>
          {/* Mapbox-style attribution */}
          <div className="mt-3 flex items-center gap-1 opacity-75">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 7v5l3 3" stroke="#001a40" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
            <span className="text-white text-[10px]">mapbox</span>
          </div>
        </div>

        {/* ── Mapbox Attribution (bottom-right) ── */}
        <div className="absolute bottom-3 right-4 z-10">
          <p className="text-white/60 text-[10px]">
            © Mapbox © OpenStreetMap{' '}
            <span className="underline cursor-pointer hover:text-white/90">Improve this map</span>{' '}
            © Maxar
          </p>
        </div>
      </div>
    </div>
  );
}
