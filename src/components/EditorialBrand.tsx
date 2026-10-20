import React from 'react';
import { motion } from 'motion/react';
import { EDITORIAL_IMAGE } from '../data/fragrances';
import { ThemeMode } from '../types';

interface EditorialBrandProps {
  onExploreCollection: () => void;
  themeMode: ThemeMode;
}

export const EditorialBrand: React.FC<EditorialBrandProps> = ({
  onExploreCollection
}) => {
  return (
    <section
      id="essence-section"
      className="relative w-full py-28 md:py-44 px-6 md:px-12 lg:px-20 border-t border-shadow/[0.06] bg-pearl overflow-hidden"
    >
      <div className="max-w-[1540px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          {/* Left: Cinematic Fragrance Photography with Museum Double-Framing & Frosted Plaque */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="p-2 sm:p-3 bg-white/70 border border-shadow/10 shadow-[0_24px_60px_-15px_rgba(10,10,10,0.1)]">
              <div className="w-full bg-oyster overflow-hidden relative group crystal-vitrine border border-dusty-rose/30">
                <img
                  src={EDITORIAL_IMAGE}
                  alt="The Essence of FUME"
                  className="w-full h-auto object-contain filter transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pearl/80 via-transparent to-transparent pointer-events-none" />

                {/* Museum Archival Frosted Glass Plaque */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[10px] uppercase tracking-[0.32em] text-dusty-rose font-sans font-medium px-5 py-3 luxury-glass border border-white/60 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.1)]">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4A59A]" />
                    <span>ATELIER FUME</span>
                  </div>
                  <span>ARCHIVE EST. 2024</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Elegant Editorial Typography with Generous Architectural Whitespace */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-8 lg:pl-4"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-shadow/10 bg-white/70 backdrop-blur-sm">
                <span className="text-[10px] uppercase tracking-[0.38em] text-dusty-rose font-sans font-medium block">
                  PHILOSOPHY & VISION
                </span>
                <span className="w-1 h-1 rounded-full bg-[#D4A59A]" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-shadow/70 font-sans">
                  SINCE 2024
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-normal uppercase tracking-[0.14em] leading-[1.12] text-shadow">
                THE ESSENCE <br />
                <span className="italic font-normal text-dusty-rose">OF FUME</span>
              </h2>
            </div>

            <div className="space-y-6 text-sm sm:text-base font-sans font-normal leading-relaxed max-w-lg text-shadow">
              <p className="font-serif italic text-lg sm:text-xl text-shadow/90 leading-relaxed">
                "FUME creates refined, long-lasting fragrances designed to evoke emotion, sophistication, and an indelible impression."
              </p>
              <p className="text-xs sm:text-sm leading-relaxed text-shadow/80 font-light">
                Established in 2024, our atelier merges time-honored artisanal enfleurage traditions with modern precision. Formulated at high perfume concentrations using rare botanicals, noble woods, and precious resins, each flacon is an intimate signature crafted to evolve with your skin's warmth.
              </p>
            </div>

            {/* Metrics Pillars in Luxury Frosted Glass Plaques */}
            <div className="pt-4 border-t border-shadow/[0.08] grid grid-cols-2 gap-5 max-w-md">
              <div className="p-5 luxury-glass-card border border-shadow/[0.08] space-y-1.5 shadow-[0_8px_20px_-8px_rgba(10,10,10,0.04)]">
                <span className="font-serif text-2xl sm:text-3xl text-dusty-rose font-normal block">
                  22–28%
                </span>
                <span className="text-[9px] uppercase tracking-[0.28em] font-sans block text-shadow/80 font-medium">
                  Pure Perfume Oil
                </span>
              </div>
              <div className="p-5 luxury-glass-card border border-shadow/[0.08] space-y-1.5 shadow-[0_8px_20px_-8px_rgba(10,10,10,0.04)]">
                <span className="font-serif text-2xl sm:text-3xl text-dusty-rose font-normal block">
                  ALL-DAY
                </span>
                <span className="text-[9px] uppercase tracking-[0.28em] font-sans block text-shadow/80 font-medium">
                  Skin Longevity
                </span>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <button
                onClick={onExploreCollection}
                className="px-10 py-4.5 text-[10px] uppercase tracking-[0.28em] font-sans font-semibold transition-all cursor-pointer tactile-button-dark animate-sheen hover:scale-[1.02] active:scale-[0.98]"
              >
                DISCOVER THE ATELIER
              </button>
              <p className="text-[9px] uppercase tracking-[0.2em] text-shadow/50 font-sans">
                Complimentary 2ml discovery vial included with every flacon order
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
