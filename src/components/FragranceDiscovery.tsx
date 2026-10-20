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
  onSelectCustomCategory?: (category: 'FOR HER' | 'FOR HIM' | 'UNISEX' | string) => void;
}

type DiscoveryCategory = 'FOR HER' | 'FOR HIM' | 'UNISEX';

const CATEGORIES: {
  label: DiscoveryCategory;
  description: string;
}[] = [
  { label: 'FOR HER', description: 'Nocturnal jasmine, luminous white tuberose, and velvet bourbon vanilla.' },
  { label: 'FOR HIM', description: 'Commanding noble woods, mineral ambergris, and crisp bergamot.' },
  { label: 'UNISEX', description: 'Tuscan leather, Florentine iris butter, and smoked oakmoss.' }
];

export const FragranceDiscovery: React.FC<FragranceDiscoveryProps> = ({
  fragrances,
  onSelectFragrance,
  onAddToCart,
  onViewAllPerfumes,
  onSelectCustomCategory
}) => {
  const [activeCategory, setActiveCategory] = useState<DiscoveryCategory>('UNISEX');

  const filteredFragrances = useMemo(() => {
    let list = fragrances.filter((f) => {
      if (activeCategory === 'FOR HIM') return f.gender === 'him';
      if (activeCategory === 'FOR HER') return f.gender === 'her';
      if (activeCategory === 'UNISEX') return f.gender === 'unisex';
      return true;
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
      className="relative w-full py-28 md:py-44 px-5 sm:px-8 md:px-12 lg:px-20 border-t border-shadow/[0.06] bg-pearl overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto space-y-16 md:space-y-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-4 max-w-xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-shadow/10 bg-white/70 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A59A]" />
            <span className="text-[10px] uppercase tracking-[0.45em] text-dusty-rose font-sans font-medium">
              OLFACTORY CURATION • EST. 2024
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal uppercase tracking-[0.16em] text-shadow">
            FIND YOUR SIGNATURE
          </h2>
          <p className="text-xs sm:text-sm font-sans font-normal tracking-wider text-shadow/80 leading-relaxed">
            Select an olfactory profile to discover the scent that belongs to you.
          </p>
        </motion.div>

        {/* Category Navigation Pills on Liquid Glass Runway */}
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 p-2 luxury-glass-card max-w-fit mx-auto border border-shadow/[0.08] shadow-[0_12px_32px_-10px_rgba(10,10,10,0.06)]">
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(cat.label)}
                  className={`relative px-8 py-3.5 text-[10px] uppercase tracking-[0.26em] font-sans transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'tactile-button-dark font-semibold'
                      : 'bg-white/80 text-shadow/75 hover:text-shadow hover:bg-white border border-transparent hover:border-shadow/10 hover:scale-[1.02]'
                  }`}
                >
                  {cat.label}
                  {isSelected && (
                    <motion.div
                      layoutId="activePillUnderline"
                      className="absolute -bottom-1 left-4 right-4 h-0.5 bg-[#D4A59A]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Category Description & Atelier Bridge */}
          <div className="text-center pt-2 space-y-4">
            <p className="text-xs sm:text-sm text-dusty-rose font-sans tracking-wide max-w-md mx-auto leading-relaxed">
              {CATEGORIES.find((c) => c.label === activeCategory)?.description}
            </p>
            <div className="flex items-center justify-center pt-1">
              <button
                onClick={() => {
                  if (onSelectCustomCategory) {
                    onSelectCustomCategory(activeCategory);
                  }
                  const el = document.getElementById('custom-scent-atelier');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group inline-flex items-center gap-3 px-7 py-3 border border-dusty-rose/40 bg-white/90 hover:bg-shadow hover:text-pearl text-[9.5px] uppercase tracking-[0.26em] font-sans font-medium text-shadow transition-all duration-300 cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Compose Bespoke {activeCategory} Formula</span>
                <span className="text-dusty-rose group-hover:text-pearl transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filtered Fragrance Grid with AnimatePresence */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 pt-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredFragrances.map((fragrance, index) => {
              const isSignature = fragrance.productType === 'signature';
              const isDiscoverySet = fragrance.id === 'discovery-set';

              return (
                <motion.div
                  key={fragrance.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, delay: (index % 4) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className={`group flex flex-col justify-between p-6 cursor-pointer crystal-vitrine transition-all duration-500 hover:-translate-y-1.5 shadow-[0_12px_28px_-10px_rgba(10,10,10,0.04)] hover:shadow-[0_26px_50px_-12px_rgba(10,10,10,0.12)] ${
                    isSignature
                      ? 'bg-[#F4EFEB] border border-dusty-rose/40 hover:border-dusty-rose'
                      : isDiscoverySet
                      ? 'bg-gradient-to-b from-[#F7F2EC] to-[#EFECE6] border border-dusty-rose/30 hover:border-dusty-rose'
                      : 'bg-[#F8F5F1] border border-shadow/[0.08] hover:border-dusty-rose/50'
                  }`}
                  onClick={() => onSelectFragrance(fragrance)}
                >
                  {/* Badges */}
                  <div className="flex items-center justify-between mb-3">
                    {isSignature ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-shadow text-pearl text-[8px] uppercase tracking-[0.3em] font-semibold border border-white/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4A59A] animate-pulse" />
                        SIGNATURE
                      </span>
                    ) : isDiscoverySet ? (
                      <span className="px-3 py-1 bg-dusty-rose text-pearl text-[8px] uppercase tracking-[0.25em] font-semibold">
                        TESTERS COFFRET
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm border border-shadow/10 text-shadow text-[8px] uppercase tracking-[0.22em] font-medium">
                        IMPRESSION
                      </span>
                    )}

                    <span className="text-[9px] uppercase tracking-[0.2em] text-shadow/60 font-sans font-medium">
                      {fragrance.genderCategory}
                    </span>
                  </div>

                  {/* Bottle Showcase with Pedestal Lighting */}
                  <div className="relative w-full aspect-[4/5] flex items-center justify-center p-6 bg-pearl border border-shadow/[0.03] overflow-hidden my-3 pedestal-light group-hover:scale-[1.02] transition-transform duration-700">
                    <img
                      src={fragrance.image}
                      alt={`FUME ${fragrance.name} Flacon`}
                      className="w-full h-full object-contain p-2 select-none transition-transform duration-700 ease-out group-hover:scale-105 filter drop-shadow-[0_12px_22px_rgba(0,0,0,0.1)]"
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
                        className="px-4 py-2.5 tactile-button-dark animate-sheen text-[9px] uppercase tracking-[0.24em] font-sans font-semibold cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
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
          <div className="relative flex items-center justify-center origin-center w-full max-w-md mx-auto mb-8">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-shadow/15 to-transparent" />
            <div className="absolute px-3 bg-pearl">
              <span className="w-1.5 h-1.5 rotate-45 border border-dusty-rose/60 bg-pearl block" />
            </div>
          </div>
          <button
            onClick={onViewAllPerfumes}
            className="px-14 py-5 bg-transparent border border-shadow/30 text-shadow hover:border-dusty-rose hover:text-dusty-rose text-[10px] uppercase tracking-[0.3em] font-sans font-semibold transition-all duration-400 cursor-pointer hover:bg-white/60 hover:scale-[1.02] active:scale-[0.98]"
          >
            VIEW ALL PERFUMES
          </button>
        </div>
      </div>
    </section>
  );
};
