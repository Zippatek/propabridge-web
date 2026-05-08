'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Property } from '@/lib/types';

interface PropertyGalleryProps {
  property: Property;
}

export function PropertyGallery({ property }: PropertyGalleryProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const displayImages =
    property.images?.filter((u) => typeof u === 'string' && u.trim()) ?? [];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && displayImages.length > 0) {
      setLightboxIndex((lightboxIndex + 1) % displayImages.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && displayImages.length > 0) {
      setLightboxIndex((lightboxIndex - 1 + displayImages.length) % displayImages.length);
    }
  };

  if (displayImages.length === 0) {
    return (
      <div className="w-full mt-10 mb-16">
        <div className="container-site">
          <div className="rounded-[12px] overflow-hidden border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900/50 aspect-[21/9] flex items-center justify-center">
            <p className="text-neutral-500 dark:text-neutral-400 text-sm font-medium tracking-wide">
              No photos available for this listing.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-10 mb-16">
      <div className="container-site">
        {/* Desktop Layout (hidden on mobile) */}
        <div className="hidden md:grid grid-cols-12 gap-3" style={{ gridAutoRows: 'minmax(180px, auto)' }}>
          {/* Default 6 images */}
          {displayImages.slice(0, 6).map((img, idx) => {
            const isLarge = idx === 0 || idx === 1;
            return (
              <div
                key={`desktop-default-${idx}`}
                onClick={() => setLightboxIndex(idx)}
                className={`relative rounded-[12px] overflow-hidden cursor-pointer group ${
                  isLarge ? 'col-span-4 aspect-square' : 'col-span-2 aspect-square'
                }`}
                style={isLarge ? { gridRow: 'span 2' } : {}}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10 duration-300" />
                <Image
                  src={img}
                  alt={`Property Image ${idx + 1}`}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  sizes={isLarge ? '33vw' : '15vw'}
                />
              </div>
            );
          })}
        </div>

        {/* Mobile Layout (hidden on desktop) */}
        <div className="grid md:hidden grid-cols-2 gap-3">
          {/* Default 4 images */}
          {displayImages.slice(0, 4).map((img, idx) => (
            <div
              key={`mobile-default-${idx}`}
              onClick={() => setLightboxIndex(idx)}
              className="relative rounded-[12px] overflow-hidden cursor-pointer aspect-square group"
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10 duration-300" />
              <Image
                src={img}
                alt={`Property Image ${idx + 1}`}
                fill
                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                sizes="50vw"
              />
            </div>
          ))}
        </div>

        {/* Expanded Grid (Animated) */}
        <AnimatePresence initial={false}>
          {isExpanded && displayImages.length > 4 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              {/* Extra padding top to separate from default grid */}
              <div className="pt-3">
                {/* Desktop Expanded (shows remaining from idx 6) */}
                <div className="hidden md:grid grid-cols-6 gap-3">
                  {displayImages.slice(6).map((img, idx) => (
                    <div
                      key={`desktop-expanded-${idx}`}
                      onClick={() => setLightboxIndex(idx + 6)}
                      className="relative rounded-[12px] overflow-hidden cursor-pointer aspect-square group"
                    >
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10 duration-300" />
                      <Image
                        src={img}
                        alt={`Property Image ${idx + 7}`}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        sizes="16vw"
                      />
                    </div>
                  ))}
                </div>

                {/* Mobile Expanded (shows remaining from idx 4) */}
                <div className="grid md:hidden grid-cols-2 gap-3">
                  {displayImages.slice(4).map((img, idx) => (
                    <div
                      key={`mobile-expanded-${idx}`}
                      onClick={() => setLightboxIndex(idx + 4)}
                      className="relative rounded-[12px] overflow-hidden cursor-pointer aspect-square group"
                    >
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10 duration-300" />
                      <Image
                        src={img}
                        alt={`Property Image ${idx + 5}`}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        sizes="50vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View All Button */}
        {displayImages.length > 4 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-[#006aff] hover:bg-[#0052cc] text-white font-semibold text-[13px] uppercase tracking-[0.05em] px-8 py-3.5 rounded-[8px] transition-all duration-300 flex items-center justify-center gap-2 outline-none focus:outline-none focus:ring-0 border-none"
            >
              {isExpanded ? 'Show Less Images' : `View All Images (${displayImages.length})`}
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 md:p-8"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 p-2"
              onClick={() => setLightboxIndex(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256">
                <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
              </svg>
            </button>

            {/* Navigation Buttons */}
            <button
              className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-4 z-50 bg-black/20 hover:bg-black/50 rounded-full"
              onClick={handlePrev}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 256 256">
                <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
              </svg>
            </button>

            <button
              className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-4 z-50 bg-black/20 hover:bg-black/50 rounded-full"
              onClick={handleNext}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 256 256">
                <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
              </svg>
            </button>

            {/* Main Image Container */}
            <div
              className="relative w-full max-w-[1200px] h-full max-h-[85vh] select-none"
              onClick={(e) => e.stopPropagation()} // Prevent click from bubbling up and closing modal
            >
              <Image
                src={displayImages[lightboxIndex]}
                alt={`Gallery image ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                quality={100}
                priority
              />
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/90 font-sans tracking-widest text-[14px] bg-black/40 px-4 py-1.5 rounded-full">
              {lightboxIndex + 1} / {displayImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
