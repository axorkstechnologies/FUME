import React from 'react';
import { motion } from 'motion/react';
import { Fragrance, ThemeMode } from '../types';
import { getFragranceTitle } from '../data/fragrances';
import { Sparkles, ArrowRight } from 'lucide-react';

interface FeaturedCollectionProps {
  fragrances: Fragrance[];
  onSelectFragrance: (fragrance: Fragrance) => void;
  onAddToCart: (fragrance: Fragrance) => void;
  themeMode: ThemeMode;
}

export const FeaturedCollection: React.FC<FeaturedCollectionProps> = ({
  fragrances,
  onSelectFragrance,
  onAddToCart
}) => {
  // Strict sorting: Signature scents (ARAB & DESERT) first, Discovery Set last, Impressions in-between
  const sortedFragrances = [...fragrances].sort((a, b) => {
    if (a.id === 'arab' || a.id === 'desert') {
      if (b.id !== 'arab' && b.id !== 'desert') return -1;
    }
    if (b.id === 'arab' || b.id === 'desert') {
      if (a.id !== 'arab' && a.id !== 'desert') return 1;
    }
    if (a.id === 'discovery-set') return 1;
    if (b.id === 'discovery-set') return -1;
    return 0;
  });

  const signatureFragrances = sortedFragrances.filter(f => f.productType === 'signature');
  const catalogFragrances = sortedFragrances.filter(f => f.productType !== 'signature');

  return (
    <section
      id="collection-section"
      className="relative w-full py-28 md:py-40 px-5 sm:px-8 md:px-12 lg:px-16 bg-pearl"
    >
      <div className="max-w-[1500px] mx-auto space-y-20 md:space-y-28">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.45em] text-dusty-rose font-sans font-medium block">
              EST. 2024 • THE MAISON ARCHIVE
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal uppercase tracking-[0.16em] text-shadow leading-tight">
            THE COLLECTION
          </h2>
          <p className="text-xs sm:text-sm font-sans font-normal tracking-wider text-shadow/80 max-w-lg mx-auto leading-relaxed">
            Architectural glass flacons holding pure Eau de Parfum concentrations, meticulously formulated for enduring sillage.
          </p>
        </div>

        {/* 1. SIGNATURE SCENTS SPOTLIGHT (ARAB & DESERT) — HIGHEST VISUAL PRIORITY */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-shadow/[0.08]">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-dusty-rose">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-[10px] uppercase tracking-[0.35em] font-sans font-semibold">
                  MAISON ORIGINALS
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl uppercase tracking-[0.14em] text-shadow">
                SIGNATURE SCENTS
              </h3>
            </div>
            <p className="text-[11px] font-sans uppercase tracking-[0.2em] text-shadow/60 max-w-sm sm:text-right">
              Our crown formulations. Designed from the ground up to embody ancient grandeur and desert mystery.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            {signatureFragrances.map((fragrance, index) => (
              <motion.div
                key={fragrance.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => onSelectFragrance(fragrance)}
                className="group relative flex flex-col md:flex-row bg-[#F4EFEB] rounded-none border border-dusty-rose/30 p-6 sm:p-8 md:p-10 cursor-pointer transition-all duration-500 hover:border-dusty-rose  hover:-translate-y-1"
              >
                {/* Visual Accent Badge */}
                <div className="absolute top-6 left-6 z-20">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-shadow text-pearl text-[9px] uppercase tracking-[0.3em] font-semibold rounded-none shadow-none">
                    <span className="w-1.5 h-1.5 rounded-none bg-dusty-rose " />
                    SIGNATURE
                  </span>
                </div>

                {/* Flacon Image Showcase — Generous Framing */}
                <div className="relative w-full md:w-1/2 aspect-square flex items-center justify-center p-6 bg-pearl rounded-none border border-shadow/[0.04] overflow-hidden">
                  <img
                    src={fragrance.image}
                    alt={`FUME ${fragrance.name} Signature Flacon`}
                    className="w-full h-full object-contain p-2 select-none transition-transform duration-700 ease-out group-hover:scale-105 filter drop-shadow-none"
                    loading="eager"
                  />
                  {/* Subtle soft gradient reflection */}
                  <div className="absolute inset-0 bg-gradient-to-t from-shadow/[0.03] to-transparent pointer-events-none" />
                </div>

                {/* Product Narrative & Metadata */}
                <div className="w-full md:w-1/2 flex flex-col justify-between pt-6 md:pt-0 md:pl-8 space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-dusty-rose font-medium">
                      <span>{fragrance.genderCategory}</span>
                      <span>•</span>
                      <span>{fragrance.olfactoryFamily}</span>
                    </div>

                    <h4 className="font-serif text-2xl sm:text-3xl uppercase tracking-[0.14em] text-shadow group-hover:text-dusty-rose transition-colors duration-300">
                      {getFragranceTitle(fragrance)}
                    </h4>

                    <p className="text-[11px] uppercase tracking-[0.22em] text-shadow/60 font-sans">
                      {fragrance.subtitle}
                    </p>

                    <p className="text-xs font-sans text-shadow/80 leading-relaxed pt-1 line-clamp-3">
                      {fragrance.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-shadow/[0.08]">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-shadow/60 font-sans">
                        50 ML EAU DE PARFUM
                      </span>
                      <span className="font-serif text-xl sm:text-2xl font-medium text-dusty-rose">
                        Rs {fragrance.price.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(fragrance);
                        }}
                        className="flex-1 py-3.5 bg-shadow text-pearl hover:bg-dusty-rose text-[10px] uppercase tracking-[0.26em] font-sans font-semibold transition-all duration-300 cursor-pointer shadow-none active:scale-[0.98]"
                      >
                        ADD TO BAG
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectFragrance(fragrance);
                        }}
                        className="px-4 py-3.5 border border-shadow/20 hover:border-dusty-rose text-shadow hover:text-dusty-rose text-[10px] uppercase tracking-[0.2em] font-sans transition-colors cursor-pointer"
                        aria-label="View flacon details"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 2. CURATED IMPRESSIONS & DISCOVERY SET GRID */}
        <div className="space-y-8 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-shadow/[0.08]">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.35em] text-dusty-rose font-sans font-semibold block">
                HOMAGE ARCHIVE
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl uppercase tracking-[0.14em] text-shadow">
                IMPRESSIONS &amp; DISCOVERY
              </h3>
            </div>
            <p className="text-[11px] font-sans uppercase tracking-[0.2em] text-shadow/60 max-w-sm sm:text-right">
              Master-crafted impressions inspired by the world’s most iconic scents, finished with generous tester coffrets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {catalogFragrances.map((fragrance, index) => {
              const isDiscoverySet = fragrance.id === 'discovery-set';

              return (
                <motion.div
                  key={fragrance.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.04 }}
                  onClick={() => onSelectFragrance(fragrance)}
                  className={`group flex flex-col justify-between bg-[#F8F5F1] border rounded-none p-5 sm:p-6 cursor-pointer transition-all duration-400  hover:-translate-y-1 ${
                    isDiscoverySet
                      ? 'border-dusty-rose/40 bg-gradient-to-b from-[#F7F2EC] to-[#EFECE6]'
                      : 'border-shadow/[0.08] hover:border-dusty-rose/60'
                  }`}
                >
                  {/* Top Header / Badge */}
                  <div className="flex items-center justify-between mb-3">
                    {isDiscoverySet ? (
                      <span className="px-2.5 py-1 bg-dusty-rose text-pearl text-[8px] uppercase tracking-[0.25em] font-semibold rounded-none shadow-none">
                        DISCOVERY SET
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-white border border-shadow/10 text-shadow text-[8px] uppercase tracking-[0.22em] font-medium rounded-none shadow-none">
                        IMPRESSION
                      </span>
                    )}

                    <span className="text-[9px] uppercase tracking-[0.2em] text-shadow/60 font-sans">
                      {fragrance.genderCategory}
                    </span>
                  </div>

                  {/* Bottle Showcase — Uncropped with Breathing Room */}
                  <div className="relative w-full aspect-[4/5] flex items-center justify-center p-6 bg-pearl rounded-none border border-shadow/[0.03] overflow-hidden my-2">
                    <img
                      src={fragrance.image}
                      alt={`FUME ${fragrance.name} Flacon`}
                      className="w-full h-full object-contain p-2 select-none transition-transform duration-600 ease-out group-hover:scale-105 filter drop-shadow-none"
                      loading="lazy"
                    />
                  </div>

                  {/* Metadata */}
                  <div className="pt-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1 text-center">
                      <h4 className="font-serif text-base sm:text-lg uppercase tracking-[0.14em] text-shadow group-hover:text-dusty-rose transition-colors duration-300">
                        {getFragranceTitle(fragrance)}
                      </h4>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-dusty-rose font-sans font-medium">
                        {fragrance.subtitle}
                      </p>
                      <p className="text-[9px] uppercase tracking-[0.18em] text-shadow/60 font-sans">
                        {isDiscoverySet ? '5 × 5 ML TESTERS' : '50 ML EAU DE PARFUM'}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-shadow/[0.06] flex items-center justify-between">
                      <span className="font-serif text-base font-medium text-dusty-rose">
                        Rs {fragrance.price.toLocaleString()}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(fragrance);
                        }}
                        className="px-4 py-2 bg-shadow text-pearl hover:bg-dusty-rose text-[9px] uppercase tracking-[0.22em] font-sans font-semibold transition-colors duration-300 cursor-pointer shadow-none active:scale-[0.98]"
                      >
                        ADD TO BAG
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
