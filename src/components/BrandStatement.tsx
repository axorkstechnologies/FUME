import React from 'react';
import { ThemeMode } from '../types';

interface BrandStatementProps {
  themeMode: ThemeMode;
}

export const BrandStatement: React.FC<BrandStatementProps> = ({ themeMode }) => {
  return (
    <section
      className="relative w-full py-32 md:py-44 px-6 md:px-12 lg:px-20 border-b border-shadow/[0.06] bg-pearl"
    >
      <div className="max-w-4xl mx-auto text-center space-y-10 md:space-y-12">
        <div className="flex items-center justify-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.4em] text-dusty-rose font-sans font-medium block">
            THE FUME PHILOSOPHY • SINCE 2024
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal uppercase tracking-[0.12em] leading-tight text-shadow">
          A SCENT THAT STAYS.
        </h2>

        {/* Short supporting copy */}
        <div className="space-y-6 max-w-2xl mx-auto">
          <p className="text-base sm:text-lg md:text-xl font-sans font-light leading-relaxed text-shadow/60">
            True luxury does not clamor for attention. It commands through quiet presence and enduring depth.
          </p>
          <p className="text-xs sm:text-sm font-sans font-light leading-relaxed max-w-xl mx-auto text-shadow/60">
            Founded in 2024, FUME crafts every fragrance with exceptional concentration. Formulated to bond with epidermal warmth, our noble woods and balsamic resins mature into an indelible personal signature that stays with you all day and into the night.
          </p>
        </div>

        {/* Restrained Architectural Pillars with Gold Accents */}
        <div className="pt-12 border-t border-shadow/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="space-y-1.5">
            <span className="font-serif text-lg text-dusty-rose font-normal block">
              LONGEVITY
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] font-sans block text-shadow/60">
              12 to 16 Hour Persistence
            </span>
          </div>

          <div className="space-y-1.5">
            <span className="font-serif text-lg text-dusty-rose font-normal block">
              PURITY
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] font-sans block text-shadow/60">
              High Potency Oils
            </span>
          </div>

          <div className="space-y-1.5">
            <span className="font-serif text-lg text-dusty-rose font-normal block">
              HERITAGE
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] font-sans block text-shadow/60">
              Hand-Poured Since 2024
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
