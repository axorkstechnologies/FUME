import React from 'react';
import { motion } from 'motion/react';
import { Fragrance, ThemeMode } from '../types';
import { FlaconBottle } from './FlaconBottle';

interface FeaturedCollectionProps {
  fragrances: Fragrance[];
  onSelectFragrance: (fragrance: Fragrance) => void;
  onAddToCart: (fragrance: Fragrance) => void;
  themeMode: ThemeMode;
}

export const FeaturedCollection: React.FC<FeaturedCollectionProps> = ({
  fragrances,
  onSelectFragrance,
  onAddToCart,
  themeMode
}) => {
  const isLight = themeMode === 'light';

  return (
    <section
      id="collection-section"
      className={`relative w-full py-24 md:py-36 px-6 md:px-12 lg:px-16 transition-colors duration-500 ${
        isLight ? 'bg-[#FAF8F5]' : 'bg-[#0a0a0a]'
      }`}
    >
      <div className="max-w-[1700px] mx-auto space-y-16 md:space-y-24">
        {/* Editorial Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A059] font-sans font-medium">
              EST. 2024 • PERMANENT ARCHIVE
            </span>
          </div>

          <h2
            className={`font-serif text-3xl sm:text-4xl md:text-5xl font-normal uppercase tracking-[0.18em] ${
              isLight ? 'text-[#1A1816]' : 'text-[#f5f4f0]'
            }`}
          >
            THE COLLECTION
          </h2>

          <p
            className={`text-xs sm:text-sm font-sans font-light tracking-wider ${
              isLight ? 'text-[#7D766E]' : 'text-[#8c8985]'
            }`}
          >
            A curated selection of FUME fragrances, formulated in Grasse since 2024.
          </p>
        </div>

        {/* Sophisticated Pastel & Gold Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 lg:gap-x-8 gap-y-14 md:gap-y-18">
          {fragrances.map((fragrance, index) => (
            <motion.div
              key={fragrance.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              onClick={() => onSelectFragrance(fragrance)}
              className="group flex flex-col cursor-pointer"
            >
              {/* Product Flacon with Printed Plaque, Ambient Aura & Quick Add */}
              <FlaconBottle
                fragrance={fragrance}
                variant="card"
                themeMode={themeMode}
                showQuickAdd={true}
                onQuickAdd={() => onAddToCart(fragrance)}
                className="mb-5"
              />

              {/* Minimal Product Meta */}
              <div className="space-y-1 text-center">
                <h3
                  className={`font-serif text-lg md:text-xl font-normal uppercase tracking-[0.18em] transition-colors group-hover:text-[#C5A059] ${
                    isLight ? 'text-[#1A1816]' : 'text-[#f5f4f0]'
                  }`}
                >
                  {fragrance.name}
                </h3>
                <p
                  className={`text-[11px] font-sans uppercase tracking-[0.2em] ${
                    isLight ? 'text-[#8C8377]' : 'text-[#8c8985]'
                  }`}
                >
                  {fragrance.concentration}
                </p>
                <p
                  className={`text-[10px] font-sans tracking-[0.25em] ${
                    isLight ? 'text-[#A0988C]' : 'text-[#666666]'
                  }`}
                >
                  {fragrance.volume}
                </p>
                <div className="pt-1 flex items-center justify-center gap-1.5">
                  <span
                    className={`text-xs font-sans font-medium tracking-wider ${
                      isLight ? 'text-[#1A1816]' : 'text-[#d4d2cc]'
                    }`}
                  >
                    ${fragrance.price}
                  </span>
                  <span className="text-[10px] text-[#C5A059] font-serif">✦</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
