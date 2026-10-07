import React, { useState, useMemo } from 'react';
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

type DiscoveryCategory = 'FOR HIM' | 'FOR HER' | 'UNISEX' | 'FRESH' | 'WOODY' | 'ORIENTAL';

const CATEGORIES: {
  label: DiscoveryCategory;
  description: string;
}[] = [
  { label: 'FOR HIM', description: 'Commanding noble woods, mineral ambergris, and crisp bergamot.' },
  { label: 'FOR HER', description: 'Nocturnal jasmine, luminous white tuberose, and velvet bourbon vanilla.' },
  { label: 'UNISEX', description: 'Tuscan leather, Florentine iris butter, and smoked oakmoss.' },
  { label: 'FRESH', description: 'Calabrian citrus, frost aldehydes, and pure oceanic accords.' },
  { label: 'WOODY', description: 'Smoky birch, aged cedarwood, and cured Virginian tobacco.' },
  { label: 'ORIENTAL', description: 'Charred tonka bean, sacred frankincense, and warm amber resins.' }
];

export const FragranceDiscovery: React.FC<FragranceDiscoveryProps> = ({
  fragrances,
  onSelectFragrance,
  onAddToCart,
  onViewAllPerfumes
}) => {
  const [activeCategory, setActiveCategory] = useState<DiscoveryCategory>('UNISEX');

  const filteredFragrances = useMemo(() => {
    let list = fragrances.filter((f) => {
      if (activeCategory === 'FOR HIM') return f.gender === 'him';
      if (activeCategory === 'FOR HER') return f.gender === 'her';
      if (activeCategory === 'UNISEX') return f.gender === 'unisex';
      return f.families.includes(activeCategory.toLowerCase());
    });

    // Ensure Discovery Set is always at the end if present
    const discoverySet = list.find((f) => f.id === 'discovery-set');
    const itemsWithoutSet = list.filter((f) => f.id !== 'discovery-set');

    // Ensure Signature scents (ARAB & DESERT) are prioritized at top
    itemsWithoutSet.sort((a, b) => {
      if (a.id === 'arab' || a.id === 'desert') {
        if (b.id !== 'arab' && b.id !== 'desert') return -1;
      }
      if (b.id === 'arab' || b.id === 'desert') {
        if (a.id !== 'arab' && a.id !== 'desert') return 1;
      }
      return 0;
    });

    return discoverySet ? [...itemsWithoutSet, discoverySet] : itemsWithoutSet;
  }, [fragrances, activeCategory]);

  return (
    <section
      className="relative w-full py-28 md:py-40 px-5 sm:px-8 md:px-12 lg:px-20 border-t border-shadow/[0.06] bg-pearl"
    >
      <div className="max-w-[1600px] mx-auto space-y-16 md:space-y-20">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.45em] text-dusty-rose font-sans font-medium block">
            OLFACTORY CURATION • EST. 2024
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal uppercase tracking-[0.16em] text-shadow">
            FIND YOUR SIGNATURE
          </h2>
          <p className="text-xs sm:text-sm font-sans font-normal tracking-wider text-shadow/80">
            Select an olfactory profile to discover the scent that belongs to you.
          </p>
        </div>

        {/* Category Navigation Pills */}
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 md:gap-4">
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(cat.label)}
                  className={`px-5 sm:px-6 py-2.5 sm:py-3 text-[10px] uppercase tracking-[0.24em] font-sans transition-all duration-300 cursor-pointer rounded-xs border ${
                    isSelected
                      ? 'bg-shadow text-pearl border-shadow font-semibold shadow-sm'
                      : 'bg-white/60 text-shadow/80 border-shadow/[0.08] hover:border-dusty-rose hover:text-shadow'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Active Category Description */}
          <div className="text-center pt-2 text-xs text-dusty-rose font-sans tracking-wide">
            {CATEGORIES.find((c) => c.label === activeCategory)?.description}
          </div>
        </div>

        {/* Filtered Fragrance Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 pt-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredFragrances.map((fragrance) => {
              const isSignature = fragrance.productType === 'signature';
              const isDiscoverySet = fragrance.id === 'discovery-set';

              return (
                <motion.div
                  key={fragrance.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className={`group flex flex-col justify-between rounded-sm p-6 cursor-pointer transition-all duration-400 hover:shadow-[0_16px_40px_rgba(18,17,16,0.08)] hover:-translate-y-1 ${
                    isSignature
                      ? 'bg-[#F4EFEB] border-2 border-dusty-rose/40 hover:border-dusty-rose'
                      : isDiscoverySet
                      ? 'bg-gradient-to-b from-[#F7F2EC] to-[#EFECE6] border border-dusty-rose/30 hover:border-dusty-rose'
                      : 'bg-[#F8F5F1] border border-shadow/[0.08] hover:border-dusty-rose/50'
                  }`}
                  onClick={() => onSelectFragrance(fragrance)}
                >
                  {/* Badges */}
                  <div className="flex items-center justify-between mb-3">
                    {isSignature ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-shadow text-pearl text-[8px] uppercase tracking-[0.28em] font-semibold rounded-xs shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-dusty-rose animate-pulse" />
                        SIGNATURE
                      </span>
                    ) : isDiscoverySet ? (
                      <span className="px-3 py-1 bg-dusty-rose text-pearl text-[8px] uppercase tracking-[0.25em] font-semibold rounded-xs shadow-xs">
                        TESTERS COFFRET
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-white border border-shadow/10 text-shadow text-[8px] uppercase tracking-[0.22em] font-medium rounded-xs shadow-xs">
                        IMPRESSION
                      </span>
                    )}

                    <span className="text-[9px] uppercase tracking-[0.2em] text-shadow/60 font-sans">
                      {fragrance.genderCategory}
                    </span>
                  </div>

                  {/* Bottle Showcase */}
                  <div className="relative w-full aspect-[4/5] flex items-center justify-center p-6 bg-pearl/75 rounded-xs border border-shadow/[0.03] overflow-hidden my-3">
                    <img
                      src={fragrance.image}
                      alt={`FUME ${fragrance.name} Flacon`}
                      className="w-full h-full object-contain p-2 select-none transition-transform duration-600 ease-out group-hover:scale-105 filter drop-shadow-sm"
                      loading="lazy"
                    />
                  </div>

                  {/* Metadata & Actions */}
                  <div className="pt-3 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1 text-center">
                      <h4 className="font-serif text-lg uppercase tracking-[0.14em] text-shadow group-hover:text-dusty-rose transition-colors duration-300">
                        {getFragranceTitle(fragrance)}
                      </h4>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-dusty-rose font-sans font-medium">
                        {fragrance.subtitle}
                      </p>
                      <p className="text-[9px] uppercase tracking-[0.18em] text-shadow/60 font-sans">
                        {isDiscoverySet ? '5 × 5 ML CURATED TESTERS' : '50 ML EAU DE PARFUM'}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-shadow/[0.06] flex items-center justify-between">
                      <span className="font-serif text-lg font-medium text-dusty-rose">
                        Rs {fragrance.price.toLocaleString()}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(fragrance);
                        }}
                        className="px-4 py-2 bg-shadow text-pearl hover:bg-dusty-rose text-[9px] uppercase tracking-[0.22em] font-sans font-semibold transition-colors duration-300 cursor-pointer shadow-xs active:scale-[0.98]"
                      >
                        ADD TO BAG
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* View All Perfumes CTA */}
        <div className="text-center pt-8">
          <button
            onClick={onViewAllPerfumes}
            className="px-12 py-4 bg-transparent border border-shadow/30 text-shadow hover:border-dusty-rose hover:text-dusty-rose text-[10px] uppercase tracking-[0.28em] font-sans font-medium transition-all duration-300 cursor-pointer"
          >
            VIEW ALL PERFUMES
          </button>
        </div>
      </div>
    </section>
  );
};
