import React from 'react';
import { ThemeMode } from '../types';

interface BrandStatementProps {
  themeMode?: ThemeMode;
}

export const BrandStatement: React.FC<BrandStatementProps> = () => {
  return (
    <section
      className="relative w-full py-32 md:py-44 px-6 md:px-12 lg:px-20 border-b border-shadow/[0.06] bg-pearl overflow-hidden"
    >
      <div className="max-w-4xl mx-auto text-center space-y-10 md:space-y-14">
        {/* Archival Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-shadow/10 bg-white/70 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A59A]" />
          <span className="text-[9px] uppercase tracking-[0.42em] text-dusty-rose font-sans font-medium block">
            THE FUME PHILOSOPHY &bull; EST. 2024
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal uppercase tracking-[0.14em] leading-[1.08] text-shadow">
          A SCENT THAT STAYS.
        </h2>

        {/* Supporting Copy */}
        <div className="space-y-6 max-w-2xl mx-auto">
          <p className="text-base sm:text-lg md:text-xl font-serif italic leading-relaxed text-shadow/90 font-normal">
            "True refinement does not clamor for attention. It commands through quiet presence and enduring depth."
          </p>
          <p className="text-xs sm:text-sm font-sans font-light leading-relaxed max-w-xl mx-auto text-shadow/75">
            Founded in 2024, FUME crafts every fragrance with exceptional concentration. Formulated to bond with epidermal warmth, our noble woods and balsamic resins mature into an indelible personal signature that stays with you all day and into the night.
          </p>
        </div>

        {/* Restrained Architectural Pillars in Frosted Vitrines */}
        <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="p-6 luxury-glass-card border border-shadow/[0.08] space-y-2 shadow-[0_8px_20px_-8px_rgba(10,10,10,0.03)]">
            <span className="font-serif text-xl sm:text-2xl text-dusty-rose font-normal block">
              LONGEVITY
            </span>
            <span className="text-[9px] uppercase tracking-[0.28em] font-sans block text-shadow/70 font-medium">
              All-Day Skin Presence
            </span>
          </div>

          <div className="p-6 luxury-glass-card border border-shadow/[0.08] space-y-2 shadow-[0_8px_20px_-8px_rgba(10,10,10,0.03)]">
            <span className="font-serif text-xl sm:text-2xl text-dusty-rose font-normal block">
              PURITY
            </span>
            <span className="text-[9px] uppercase tracking-[0.28em] font-sans block text-shadow/70 font-medium">
              High Potency Oils
            </span>
          </div>

          <div className="p-6 luxury-glass-card border border-shadow/[0.08] space-y-2 shadow-[0_8px_20px_-8px_rgba(10,10,10,0.03)]">
            <span className="font-serif text-xl sm:text-2xl text-dusty-rose font-normal block">
              HERITAGE
            </span>
            <span className="text-[9px] uppercase tracking-[0.28em] font-sans block text-shadow/70 font-medium">
              Hand-Poured Since 2024
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
