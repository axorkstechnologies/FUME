import React from 'react';
import { motion } from 'motion/react';
import { Fragrance, ThemeMode } from '../types';
import { getFragranceTitle } from '../data/fragrances';

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
  return (
    <section
      id="collection-section"
      className="relative w-full py-28 md:py-40 px-6 md:px-12 lg:px-16 bg-pearl"
    >
      <div className="max-w-[1400px] mx-auto space-y-16 md:space-y-20">
        {/* Section Header */}
        <div className="text-center space-y-5 max-w-2xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.4em] text-dusty-rose font-sans font-medium block">
            EST. 2024 • PERMANENT ARCHIVE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal uppercase tracking-[0.16em] text-shadow leading-tight">
            THE COLLECTION
          </h2>
          <p className="text-sm font-sans font-light tracking-wide text-shadow/50 max-w-md mx-auto leading-relaxed">
            A curated archive of FUME fragrances, each formulated with pure botanical distillates and housed in architectural flint glass.
          </p>
        </div>

        {/* Product Grid – Consistent Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
          {fragrances.map((fragrance, index) => (
            <motion.div
              key={fragrance.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              onClick={() => onSelectFragrance(fragrance)}
              className="group flex flex-col cursor-pointer"
            >
              {/* Image Card – Fixed aspect ratio for consistency */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-oyster border border-shadow/[0.06] transition-all duration-500 group-hover:shadow-[0_16px_48px_rgba(26,26,26,0.1)] group-hover:border-dusty-rose/40 group-hover:-translate-y-1.5">
                {/* Product Image */}
                <img
                  src={fragrance.image}
                  alt={`FUME ${fragrance.name} Eau de Parfum bottle`}
                  className="absolute inset-0 w-full h-full object-contain object-center p-6 sm:p-8 select-none transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                />

                {/* Subtle shimmer on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

                {/* ADD TO BAG – consistent bottom position */}
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

              {/* Product Meta – Identical structure for every card */}
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
        </div>
      </div>
    </section>
  );
};
