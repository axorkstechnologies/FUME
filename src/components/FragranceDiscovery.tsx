import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Fragrance, ThemeMode } from '../types';
import { getFragranceTitle } from '../data/fragrances';
import { FlaconBottle } from './FlaconBottle';

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
  { label: 'FOR HIM', description: 'Commanding woods, mineral ambergris, and crisp bergamot', pastelPill: '#E8E2DC' },
  { label: 'FOR HER', description: 'Nocturnal jasmine, luminous tuberose, and velvet vanilla', pastelPill: '#E8E2DC' },
  { label: 'UNISEX', description: 'Tuscan leather, Florentine iris, and smoked oakmoss', pastelPill: '#E8E2DC' },
  { label: 'FRESH', description: 'Calabrian citrus, frost aldehydes, and oceanic accords', pastelPill: '#E8E2DC' },
  { label: 'WOODY', description: 'Smoky birch, aged cedarwood, and cured Virginian tobacco', pastelPill: '#E8E2DC' },
  { label: 'ORIENTAL', description: 'Charred tonka bean, sacred frankincense, and warm resins', pastelPill: '#E8E2DC' }
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

        {/* Filtered Fragrances Showcase with Animated Transitions */}
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
                className="group flex flex-col cursor-pointer p-5 transition-all duration-300 rounded-sm border bg-shadow/5/80 border-shadow/[0.06] hover:border-dusty-rose/50 hover:shadow-[0_8px_32px_rgba(201,169,166,0.12)]"
                onClick={() => onSelectFragrance(fragrance)}
              >
                <FlaconBottle
                  fragrance={fragrance}
                  variant="card"
                  themeMode="dark"
                  showQuickAdd={true}
                  onQuickAdd={() => onAddToCart(fragrance)}
                  className="mb-5 rounded-xs"
                />

                <div className="space-y-1 text-center">
                  <h3 className="font-serif text-lg font-normal uppercase tracking-[0.16em] text-shadow group-hover:text-dusty-rose transition-colors">
                    {getFragranceTitle(fragrance)}
                  </h3>
                  <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-shadow/60">
                    {fragrance.concentration} • {fragrance.volume}
                  </p>
                  <p className="text-[11px] font-sans font-medium pt-1 text-dusty-rose">
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
