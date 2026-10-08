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
      className="relative w-full py-28 md:py-40 px-6 md:px-12 lg:px-20 border-t border-shadow/[0.06] bg-pearl overflow-hidden"
    >
      {/* Subtle Moving Background Glow */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #D4A59A 0%, #D4A59A 60%, transparent 80%)'
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
            <div className="w-full bg-oyster overflow-hidden relative group border border-dusty-rose/25 hover:border-dusty-rose/50 transition-colors duration-500">
              <img
                src={EDITORIAL_IMAGE}
                alt="The Essence of FUME"
                className="w-full h-auto object-contain filter transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pearl/70 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-dusty-rose font-sans">
                <span>ATELIER FUME</span>
                <span>ARCHIVE EST. 2024</span>
              </div>
            </div>
          </div>

          {/* Right: Elegant Editorial Typography with Generous Whitespace */}
          <div className="lg:col-span-6 space-y-8 lg:pl-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase tracking-[0.35em] text-dusty-rose font-sans font-medium block">
                  PHILOSOPHY & VISION
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-dusty-rose" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-shadow/80 font-sans">
                  SINCE 2024
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal uppercase tracking-[0.14em] leading-[1.15] text-shadow">
                THE ESSENCE <br />
                <span className="italic font-normal text-dusty-rose">OF FUME</span>
              </h2>
            </div>

            <div className="space-y-6 text-sm sm:text-base font-sans font-normal leading-relaxed max-w-lg text-shadow">
              <p>
                FUME creates refined, long-lasting fragrances designed to evoke emotion, sophistication, and an indelible impression.
              </p>
              <p className="text-xs sm:text-sm leading-relaxed text-shadow/80">
                Established in 2024, our atelier merges time-honored artisanal enfleurage traditions with modern precision. Formulated at high perfume concentrations using rare botanicals, noble woods, and precious resins, each flacon is an intimate signature crafted to evolve with your skin's warmth.
              </p>
            </div>

            {/* Metrics Pillars with Gold Accents */}
            <div className="pt-5 border-t border-shadow/[0.08] grid grid-cols-2 gap-8 max-w-md">
              <div className="space-y-1">
                <span className="font-serif text-2xl sm:text-3xl text-dusty-rose font-normal block">
                  35%
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] font-sans block text-shadow/80">
                  Maximal Potency
                </span>
              </div>
              <div className="space-y-1">
                <span className="font-serif text-2xl sm:text-3xl text-dusty-rose font-normal block">
                  ALL-DAY
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] font-sans block text-shadow/80">
                  Skin Longevity
                </span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onExploreCollection}
                className="px-9 py-4 text-[10px] uppercase tracking-[0.26em] font-sans font-medium transition-all cursor-pointer border border-dusty-rose text-shadow hover:bg-dusty-rose hover:text-pearl"
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
