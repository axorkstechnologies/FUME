import React from 'react';
import { ThemeMode } from '../types';

interface BrandStatementProps {
  themeMode: ThemeMode;
}

export const BrandStatement: React.FC<BrandStatementProps> = ({ themeMode }) => {
  const isLight = themeMode === 'light';

  return (
    <section
      className={`relative w-full py-32 md:py-44 px-6 md:px-12 lg:px-20 border-b transition-colors duration-500 ${
        isLight ? 'bg-[#FAF8F5] border-[#E8DFC9]' : 'bg-[#0a0a0a] border-[#1a1a1a]'
      }`}
    >
      <div className="max-w-4xl mx-auto text-center space-y-10 md:space-y-12">
        <div className="flex items-center justify-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#C5A059] font-sans font-medium block">
            THE FUME PHILOSOPHY • SINCE 2024
          </span>
        </div>

        {/* Headline */}
        <h2
          className={`font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal uppercase tracking-[0.12em] leading-tight ${
            isLight ? 'text-[#1A1816]' : 'text-[#f5f4f0]'
          }`}
        >
          A SCENT THAT STAYS.
        </h2>

        {/* Short supporting copy */}
        <div className="space-y-6 max-w-2xl mx-auto">
          <p
            className={`text-base sm:text-lg md:text-xl font-sans font-light leading-relaxed ${
              isLight ? 'text-[#4A4338]' : 'text-[#a9a7a1]'
            }`}
          >
            True luxury does not clamor for attention. It commands through quiet presence and enduring depth.
          </p>
          <p
            className={`text-xs sm:text-sm font-sans font-light leading-relaxed max-w-xl mx-auto ${
              isLight ? 'text-[#7D766E]' : 'text-[#8c8985]'
            }`}
          >
            Founded in 2024, FUME crafts every fragrance with exceptional concentration. Formulated to bond with epidermal warmth, our noble woods and balsamic resins mature into an indelible personal signature that stays with you all day and into the night.
          </p>
        </div>

        {/* Restrained Architectural Pillars with Gold Accents */}
        <div
          className={`pt-12 border-t grid grid-cols-1 sm:grid-cols-3 gap-8 text-center ${
            isLight ? 'border-[#E6DDD0]' : 'border-[#1a1a1a]'
          }`}
        >
          <div className="space-y-1.5">
            <span className="font-serif text-lg text-[#C5A059] font-normal block">
              LONGEVITY
            </span>
            <span
              className={`text-[10px] uppercase tracking-[0.25em] font-sans block ${
                isLight ? 'text-[#7D766E]' : 'text-[#8c8985]'
              }`}
            >
              12–16 Hour Persistence
            </span>
          </div>

          <div className="space-y-1.5">
            <span className="font-serif text-lg text-[#C5A059] font-normal block">
              PURITY
            </span>
            <span
              className={`text-[10px] uppercase tracking-[0.25em] font-sans block ${
                isLight ? 'text-[#7D766E]' : 'text-[#8c8985]'
              }`}
            >
              High Potency Oils
            </span>
          </div>

          <div className="space-y-1.5">
            <span className="font-serif text-lg text-[#C5A059] font-normal block">
              HERITAGE
            </span>
            <span
              className={`text-[10px] uppercase tracking-[0.25em] font-sans block ${
                isLight ? 'text-[#7D766E]' : 'text-[#8c8985]'
              }`}
            >
              Hand-Poured Since 2024
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
