import React from 'react';
import { motion } from 'motion/react';
import { EDITORIAL_IMAGE } from '../data/fragrances';
import { ThemeMode } from '../types';

interface EditorialBrandProps {
  onExploreCollection: () => void;
  themeMode: ThemeMode;
}

export const EditorialBrand: React.FC<EditorialBrandProps> = ({
  onExploreCollection,
  themeMode
}) => {
  const isLight = themeMode === 'light';

  return (
    <section
      id="essence-section"
      className="relative w-full py-28 md:py-40 px-6 md:px-12 lg:px-20 border-t border-white/[0.06] bg-[#0D0C0A] overflow-hidden"
    >
      {/* Subtle Moving Background Glow */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #D4AF37 0%, #C49A88 60%, transparent 80%)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [-20, 30, -20]
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-[1500px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left: Cinematic Fragrance Photography with Gold Border Accent */}
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/5] w-full bg-[#111111] overflow-hidden relative group rounded-sm shadow-2xl border border-[#D4AF37]/25 hover:border-[#D4AF37]/50 transition-colors duration-500">
              <img
                src={EDITORIAL_IMAGE}
                alt="The Essence of FUME"
                className="w-full h-full object-cover object-center filter brightness-95 contrast-105 transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-sans">
                <span>ATELIER GRASSE</span>
                <span>ARCHIVE EST. 2024</span>
              </div>
            </div>
          </div>

          {/* Right: Elegant Editorial Typography with Generous Whitespace */}
          <div className="lg:col-span-6 space-y-8 lg:pl-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-sans font-medium block">
                  PHILOSOPHY & VISION
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E9589] font-sans">
                  SINCE 2024
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal uppercase tracking-[0.14em] leading-[1.15] text-[#F5F2EB]">
                THE ESSENCE <br />
                <span className="italic font-light text-[#D4AF37]">OF FUME</span>
              </h2>
            </div>

            <div className="space-y-6 text-sm sm:text-base font-sans font-light leading-relaxed max-w-lg text-[#B8B0A4]">
              <p>
                FUME creates luxurious, long-lasting fragrances designed to evoke emotion, sophistication, and a lasting impression.
              </p>
              <p className="text-xs sm:text-sm leading-relaxed">
                Established in 2024, our atelier merges centuries-old French enfleurage techniques with modern molecular precision. Formulated at high perfume concentrations using rare botanicals, noble woods, and precious resins, each flacon is an intimate signature crafted to evolve with your skin's warmth.
              </p>
            </div>

            {/* Metrics Pillars with Gold Accents */}
            <div className="pt-5 border-t border-white/[0.08] grid grid-cols-2 gap-8 max-w-md">
              <div className="space-y-1">
                <span className="font-serif text-2xl sm:text-3xl text-[#D4AF37] font-normal block">
                  35%
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] font-sans block text-[#9E9589]">
                  Maximal Potency
                </span>
              </div>
              <div className="space-y-1">
                <span className="font-serif text-2xl sm:text-3xl text-[#D4AF37] font-normal block">
                  14+ HRS
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] font-sans block text-[#9E9589]">
                  Skin Longevity
                </span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onExploreCollection}
                className="px-9 py-4 text-[10px] uppercase tracking-[0.26em] font-sans font-medium transition-all cursor-pointer border border-[#D4AF37] text-[#F5F2EB] hover:bg-[#D4AF37] hover:text-black"
              >
                DISCOVER THE ATELIER
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
