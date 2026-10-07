import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Fragrance, ThemeMode } from '../types';
import { getFragranceTitle } from '../data/fragrances';


interface FragranceDiscoveryProps {
  fragrances: Fragrance[];
  onSelectFragrance: (fragrance: Fragrance) => void;
  onAddToCart: (fragrance: Fragrance) => void;
  onViewAllPerfumes: () => void;
  themeMode: ThemeMode;
}

type DiscoveryCategory = 'ALL' | 'FOR HIM' | 'FOR HER' | 'UNISEX' | 'FRESH' | 'WOODY' | 'ORIENTAL';

const CATEGORIES: {
  label: DiscoveryCategory;
  description: string;
  pastelPill: string;
}[] = [
  { label: 'FOR HIM', description: 'Commanding woods, mineral ambergris, and crisp bergamot', pastelPill: '#F0EBE3' },
  { label: 'FOR HER', description: 'Nocturnal jasmine, luminous tuberose, and velvet vanilla', pastelPill: '#F0EBE3' },
  { label: 'UNISEX', description: 'Tuscan leather, Florentine iris, and smoked oakmoss', pastelPill: '#F0EBE3' },
  { label: 'FRESH', description: 'Calabrian citrus, frost aldehydes, and oceanic accords', pastelPill: '#F0EBE3' },
  { label: 'WOODY', description: 'Smoky birch, aged cedarwood, and cured Virginian tobacco', pastelPill: '#F0EBE3' },
  { label: 'ORIENTAL', description: 'Charred tonka bean, sacred frankincense, and warm resins', pastelPill: '#F0EBE3' }
];

export const FragranceDiscovery: React.FC<FragranceDiscoveryProps> = ({
  fragrances,
  onSelectFragrance,
  onAddToCart,
  onViewAllPerfumes,
  themeMode
}) => {
  const [activeCategory, setActiveCategory] = useState<DiscoveryCategory>('UNISEX');
  const isLight = themeMode === 'light';

  const filteredFragrances = fragrances.filter((f) => {
    if (activeCategory === 'ALL') return true;
    if (activeCategory === 'FOR HIM') return f.gender === 'him';
    if (activeCategory === 'FOR HER') return f.gender === 'her';
    if (activeCategory === 'UNISEX') return f.gender === 'unisex';
    return f.families.includes(activeCategory.toLowerCase());
  });

  return (
    <section
      className="relative w-full py-24 md:py-36 px-6 md:px-12 lg:px-20 border-t border-shadow/[0.06] bg-pearl"
    >
      <div className="max-w-[1700px] mx-auto space-y-16 md:space-y-20">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.35em] text-dusty-rose font-sans font-medium block">
            OLFACTORY CURATION • SINCE 2024
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal uppercase tracking-[0.16em] text-shadow">
            FIND YOUR SIGNATURE
          </h2>
          <p className="text-xs sm:text-sm font-sans font-light tracking-wide text-shadow/60">
            Select a profile to uncover your personal aura.
          </p>
        </div>

        {/* Sophisticated Editorial Category Navigation with Dark Glass Pills */}
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5">
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(cat.label)}
                  className={`px-6 py-3 text-[11px] uppercase tracking-[0.24em] font-sans transition-all duration-300 cursor-pointer rounded-xs border ${
                    isSelected
                      ? 'bg-dusty-rose text-pearl border-dusty-rose font-medium shadow-[0_0_20px_rgba(201,169,166,0.35)]'
                      : 'bg-pearl/[0.04] text-shadow/60 border-shadow/[0.08] hover:border-dusty-rose/60 hover:text-shadow'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Active Category Description */}
          <div className="text-center pt-3 text-xs text-dusty-rose font-sans italic tracking-wider">
            {CATEGORIES.find((c) => c.label === activeCategory)?.description}
          </div>
        </div>

        {/* Filtered Fragrances – Consistent Card Structure */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10 pt-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredFragrances.map((fragrance) => (
              <motion.div
                key={fragrance.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group flex flex-col cursor-pointer"
                onClick={() => onSelectFragrance(fragrance)}
              >
                {/* Image Card – Fixed aspect ratio for consistency */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-oyster border border-shadow/[0.06] transition-all duration-500 group-hover:shadow-[0_16px_48px_rgba(26,26,26,0.1)] group-hover:border-dusty-rose/40 group-hover:-translate-y-1.5">
                  <img
                    src={fragrance.image}
                    alt={`FUME ${fragrance.name} Eau de Parfum`}
                    className="absolute inset-0 w-full h-full object-contain object-center p-6 sm:p-8 select-none transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-20">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(fragrance);
                      }}
                      className="w-full py-3 bg-dusty-rose text-pearl text-[10px] uppercase tracking-[0.24em] font-sans font-semibold cursor-pointer rounded transition-colors hover:bg-shadow hover:text-pearl shadow-md active:scale-[0.98]"
                    >
                      ADD TO BAG
                    </button>
                  </div>
                </div>

                {/* Product Meta – Identical to FeaturedCollection */}
                <div className="pt-5 space-y-1.5 text-center">
                  <h3 className="font-serif text-base md:text-lg font-normal uppercase tracking-[0.16em] text-shadow transition-colors group-hover:text-dusty-rose leading-snug">
                    {getFragranceTitle(fragrance)}
                  </h3>
                  <p className="text-[10px] font-sans uppercase tracking-[0.22em] text-shadow/45">
                    {fragrance.concentration}
                  </p>
                  <p className="text-[9px] font-sans tracking-[0.2em] text-shadow/40">
                    {fragrance.volume}
                  </p>
                  <p className="text-sm font-sans font-medium tracking-wider text-dusty-rose pt-1">
                    Rs {fragrance.price.toLocaleString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Discovery Link */}
        <div className="text-center pt-8">
          <button
            onClick={onViewAllPerfumes}
            className="text-[11px] uppercase tracking-[0.28em] transition-colors cursor-pointer border-b border-dusty-rose pb-1 font-sans text-shadow/60 hover:text-shadow"
          >
            EXPLORE COMPLETE COLLECTION →
          </button>
        </div>
      </div>
    </section>
  );
};
