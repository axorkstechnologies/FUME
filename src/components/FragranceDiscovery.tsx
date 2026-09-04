import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Fragrance, ThemeMode } from '../types';
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
  { label: 'FOR HIM', description: 'Commanding woods, mineral ambergris, and crisp bergamot', pastelPill: '#EFF4F8' },
  { label: 'FOR HER', description: 'Nocturnal jasmine, luminous tuberose, and velvet vanilla', pastelPill: '#FAF2ED' },
  { label: 'UNISEX', description: 'Tuscan leather, Florentine iris, and smoked oakmoss', pastelPill: '#F6F0E6' },
  { label: 'FRESH', description: 'Calabrian citrus, frost aldehydes, and oceanic accords', pastelPill: '#F0F4F7' },
  { label: 'WOODY', description: 'Smoky birch, aged cedarwood, and cured Virginian tobacco', pastelPill: '#F2F5F0' },
  { label: 'ORIENTAL', description: 'Charred tonka bean, sacred frankincense, and warm resins', pastelPill: '#FAF3EA' }
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
      className={`relative w-full py-24 md:py-36 px-6 md:px-12 lg:px-20 border-t transition-colors duration-500 ${
        isLight ? 'bg-[#FAF8F5] border-[#E8DFC9]' : 'bg-[#0a0a0a] border-[#1a1a1a]'
      }`}
    >
      <div className="max-w-[1700px] mx-auto space-y-16 md:space-y-20">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A059] font-sans font-medium block">
            OLFACTORY CURATION • SINCE 2024
          </span>
          <h2
            className={`font-serif text-3xl sm:text-4xl md:text-5xl font-normal uppercase tracking-[0.16em] ${
              isLight ? 'text-[#1A1816]' : 'text-[#f5f4f0]'
            }`}
          >
            FIND YOUR SIGNATURE
          </h2>
          <p
            className={`text-xs sm:text-sm font-sans font-light tracking-wide ${
              isLight ? 'text-[#7D766E]' : 'text-[#8c8985]'
            }`}
          >
            Select a profile to uncover your personal aura.
          </p>
        </div>

        {/* Sophisticated Editorial Category Navigation with Pastel & Gold Accents */}
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
                      ? isLight
                        ? 'bg-[#1A1816] text-[#FAF8F5] border-[#1A1816] shadow-sm font-medium'
                        : 'bg-[#C5A059] text-black border-[#C5A059] font-medium shadow-[0_0_15px_rgba(197,160,89,0.3)]'
                      : isLight
                      ? 'bg-white/80 text-[#5C5449] border-[#E2D8C6] hover:border-[#C5A059]'
                      : 'bg-[#141414] text-[#8c8985] border-[#262626] hover:border-[#555555] hover:text-white'
                  }`}
                  style={{
                    backgroundColor: !isSelected && isLight ? cat.pastelPill : undefined
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Active Category Description */}
          <div className="text-center pt-3 text-xs text-[#C5A059] font-sans italic tracking-wider">
            ✦ {CATEGORIES.find((c) => c.label === activeCategory)?.description} ✦
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
                className={`group flex flex-col cursor-pointer p-5 transition-all duration-300 rounded-sm border ${
                  isLight
                    ? 'border-[#EAE2D5] hover:border-[#C5A059] hover:shadow-lg'
                    : 'bg-[#0d0d0d] border-[#1E1E1E] hover:border-[#C5A059]/80'
                }`}
                style={{
                  backgroundColor: isLight ? fragrance.pastelBg : '#0d0d0d'
                }}
                onClick={() => onSelectFragrance(fragrance)}
              >
                <FlaconBottle
                  fragrance={fragrance}
                  variant="card"
                  themeMode={themeMode}
                  showQuickAdd={true}
                  onQuickAdd={() => onAddToCart(fragrance)}
                  className="mb-5 rounded-xs"
                />

                <div className="space-y-1 text-center">
                  <h3
                    className={`font-serif text-lg font-normal uppercase tracking-[0.16em] group-hover:text-[#C5A059] transition-colors ${
                      isLight ? 'text-[#1A1816]' : 'text-[#f5f4f0]'
                    }`}
                  >
                    {fragrance.name}
                  </h3>
                  <p
                    className={`text-[10px] font-sans uppercase tracking-[0.2em] ${
                      isLight ? 'text-[#7D766E]' : 'text-[#8c8985]'
                    }`}
                  >
                    {fragrance.concentration} • {fragrance.volume}
                  </p>
                  <p
                    className={`text-[11px] font-sans font-medium pt-1 ${
                      isLight ? 'text-[#1A1816]' : 'text-[#d4d2cc]'
                    }`}
                  >
                    ${fragrance.price}
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
            className={`text-[11px] uppercase tracking-[0.28em] transition-colors cursor-pointer border-b pb-1 font-sans ${
              isLight
                ? 'text-[#5C5449] border-[#C5A059] hover:text-[#1A1816]'
                : 'text-[#8c8985] border-[#C5A059] hover:text-white'
            }`}
          >
            EXPLORE COMPLETE COLLECTION →
          </button>
        </div>
      </div>
    </section>
  );
};
