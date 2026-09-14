import React from 'react';
import { motion } from 'motion/react';
import { Fragrance, ThemeMode } from '../types';
import { getFragranceTitle } from '../data/fragrances';
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
      className="relative w-full py-24 md:py-36 px-6 md:px-12 lg:px-16 bg-[#0B0A09]"
    >
      <div className="max-w-[1700px] mx-auto space-y-16 md:space-y-24">
        {/* Editorial Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-sans font-medium">
              EST. 2024 • PERMANENT ARCHIVE
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal uppercase tracking-[0.18em] text-[#F5F2EB]">
            THE COLLECTION
          </h2>

          <p className="text-xs sm:text-sm font-sans font-light tracking-wider text-[#9E9589]">
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
                <h3 className="font-serif text-lg md:text-xl font-normal uppercase tracking-[0.18em] transition-colors text-[#F5F2EB] group-hover:text-[#D4AF37]">
                  {getFragranceTitle(fragrance)}
                </h3>
                <p className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#9E9589]">
                  {fragrance.concentration}
                </p>
                <p className="text-[10px] font-sans tracking-[0.25em] text-[#7A7068]">
                  {fragrance.volume}
                </p>
                <div className="pt-1 flex items-center justify-center gap-1.5">
                  <span className="text-xs font-sans font-medium tracking-wider text-[#D4AF37]">
                    Rs {fragrance.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
