const fs = require('fs');

const code = `import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Fragrance, ThemeMode } from '../types';
import { getFragranceTitle } from '../data/fragrances';
import { Sparkles, MessageCircle, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

interface PerfumesViewProps {
  fragrances: Fragrance[];
  onSelectFragrance: (fragrance: Fragrance) => void;
  onAddToCart: (fragrance: Fragrance) => void;
  themeMode: ThemeMode;
}

type MainCategory = 'ALL' | 'FOR HIM' | 'FOR HER' | 'UNISEX' | 'CUSTOM MADE';

export const PerfumesView: React.FC<PerfumesViewProps> = ({
  fragrances,
  onSelectFragrance,
  onAddToCart
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MainCategory>('ALL');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const categories: MainCategory[] = ['ALL', 'FOR HIM', 'FOR HER', 'UNISEX', 'CUSTOM MADE'];

  const displayedFragrances = useMemo(() => {
    if (selectedCategory === 'CUSTOM MADE') return [];

    let list = fragrances.filter((f) => {
      if (selectedCategory === 'ALL') return true;
      if (selectedCategory === 'FOR HIM') return f.gender === 'him';
      if (selectedCategory === 'FOR HER') return f.gender === 'her';
      if (selectedCategory === 'UNISEX') return f.gender === 'unisex';
      return true;
    });

    const discoverySet = list.find((f) => f.id === 'discovery-set');
    const itemsWithoutSet = list.filter((f) => f.id !== 'discovery-set');

    if (sortBy === 'price-asc') {
      itemsWithoutSet.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      itemsWithoutSet.sort((a, b) => b.price - a.price);
    } else {
      itemsWithoutSet.sort((a, b) => {
        if (a.id === 'arab' || a.id === 'desert') {
          if (b.id !== 'arab' && b.id !== 'desert') return -1;
        }
        if (b.id === 'arab' || b.id === 'desert') {
          if (a.id !== 'arab' && a.id !== 'desert') return 1;
        }
        return 0;
      });
    }

    return discoverySet ? [...itemsWithoutSet, discoverySet] : itemsWithoutSet;
  }, [fragrances, selectedCategory, sortBy]);

  const handleWhatsAppConsultation = () => {
    const msg = encodeURIComponent(
      "Hello FUME Concierge, I am interested in creating a Custom Made Bespoke Fragrance. Please guide me through your private atelier process."
    );
    window.open(\`https://wa.me/92381825636?text=\${msg}\`, '_blank');
  };

  return (
    <div className="relative w-full min-h-screen pt-32 pb-32 px-5 sm:px-8 md:px-12 lg:px-16 bg-pearl text-shadow">
      <div className="max-w-[1600px] mx-auto space-y-16 md:space-y-24">
        
        {/* Editorial Heading */}
        <div className="text-center space-y-5 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.45em] text-shadow/60 font-sans font-medium block">
              EST. 2024
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal uppercase tracking-[0.16em] text-shadow">
            THE CATALOGUE
          </h1>
          <p className="text-xs sm:text-sm font-sans font-normal tracking-wider max-w-lg mx-auto text-shadow/80 leading-relaxed">
            Every creation is formulated at genuine Eau de Parfum strength, bottled in architectural flint glass, and delivered with uncompromising presence.
          </p>
        </div>

        {/* Discovery Filter & Sort Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-y border-shadow/[0.08] py-6">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={\`text-[10px] uppercase tracking-[0.24em] font-sans transition-all duration-300 cursor-pointer relative py-1 \${
                  selectedCategory === cat
                    ? 'text-shadow font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-shadow'
                    : 'text-shadow/60 hover:text-shadow'
                }\`}
              >
                {cat}
              </button>
            ))}
          </div>

          {selectedCategory !== 'CUSTOM MADE' && (
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] font-sans">
              <span className="text-shadow/60">SORT:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-shadow focus:outline-none cursor-pointer border-b border-shadow/20 pb-1"
              >
                <option value="featured">Maison Curated</option>
                <option value="price-asc">Price: Ascending</option>
                <option value="price-desc">Price: Descending</option>
              </select>
            </div>
          )}
        </div>

        {selectedCategory === 'CUSTOM MADE' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-12 bg-oyster/30 p-8 sm:p-16 border border-shadow/[0.05]"
          >
            <div className="text-center space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-shadow/60 font-semibold block">
                PRIVATE ATELIER
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl uppercase tracking-[0.12em]">
                BESPOKE CREATION
              </h2>
              <p className="text-sm font-sans text-shadow/80 leading-relaxed max-w-2xl mx-auto">
                Commission a private olfactory signature. Work directly with our concierge to formulate a scent profile entirely unique to you, poured into an engraved flacon.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-4 border-y border-shadow/[0.08] py-12">
              <div className="space-y-4 text-center">
                <span className="text-[10px] uppercase tracking-[0.25em] text-shadow font-semibold block">
                  1. NOTE MAPPING
                </span>
                <p className="text-xs text-shadow/70 leading-relaxed font-sans px-4">
                  Select your desired botanical accords, rare woods, and personal sillage preferences.
                </p>
              </div>
              <div className="space-y-4 text-center">
                <span className="text-[10px] uppercase tracking-[0.25em] text-shadow font-semibold block">
                  2. MACERATION
                </span>
                <p className="text-xs text-shadow/70 leading-relaxed font-sans px-4">
                  Your custom formula undergoes maturation for balanced depth and skin performance.
                </p>
              </div>
              <div className="space-y-4 text-center">
                <span className="text-[10px] uppercase tracking-[0.25em] text-shadow font-semibold block">
                  3. ENGRAVED FLACON
                </span>
                <p className="text-xs text-shadow/70 leading-relaxed font-sans px-4">
                  Bottled in architectural glass with personalized engraving and certified dossier.
                </p>
              </div>
            </div>

            <div className="pt-6 flex justify-center">
              <button
                onClick={handleWhatsAppConsultation}
                className="px-12 py-5 bg-shadow text-pearl hover:bg-dusty-rose text-[10px] uppercase tracking-[0.3em] font-sans transition-all duration-300 cursor-pointer flex items-center justify-center gap-4"
              >
                <MessageCircle className="w-4 h-4" />
                <span>START BESPOKE CONSULTATION VIA WHATSAPP</span>
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            <AnimatePresence mode="popLayout">
              {displayedFragrances.map((fragrance, index) => {
                const isSignature = fragrance.productType === 'signature';
                const isDiscoverySet = fragrance.id === 'discovery-set';

                return (
                  <motion.div
                    key={fragrance.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    onClick={() => onSelectFragrance(fragrance)}
                    className="group flex flex-col cursor-pointer"
                  >
                    {/* Bottle Display - High-end framed look */}
                    <div className={\`relative w-full aspect-[3/4] flex items-center justify-center p-8 transition-colors duration-500 overflow-hidden mb-6 \${
                      isSignature 
                        ? 'bg-[#EAE6DF]' // Sand tone for signature
                        : isDiscoverySet 
                        ? 'bg-oyster'
                        : 'bg-oyster/50 hover:bg-oyster'
                    }\`}>
                      {isSignature && (
                        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                          <span className="text-[9px] uppercase tracking-[0.3em] font-sans font-semibold text-shadow">
                            SIGNATURE
                          </span>
                        </div>
                      )}
                      {!isSignature && !isDiscoverySet && (
                        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                          <span className="text-[8px] uppercase tracking-[0.2em] font-sans text-shadow/60">
                            IMPRESSION
                          </span>
                        </div>
                      )}
                      {isDiscoverySet && (
                        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                          <span className="text-[8px] uppercase tracking-[0.2em] font-sans text-shadow/60">
                            TESTERS
                          </span>
                        </div>
                      )}

                      <img
                        src={fragrance.image}
                        alt={\`FUME \${fragrance.name}\`}
                        className="w-full h-full object-contain filter drop-shadow-md select-none transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-col flex-1 text-center">
                      <h3 className="font-serif text-2xl uppercase tracking-[0.16em] text-shadow mb-2">
                        {getFragranceTitle(fragrance)}
                      </h3>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-shadow/60 font-sans mb-1">
                        {fragrance.subtitle}
                      </p>
                      <p className="text-[9px] uppercase tracking-[0.15em] text-shadow/40 font-sans mb-5">
                        {isDiscoverySet ? '5 A- 5 ML' : '50 ML EAU DE PARFUM'}
                      </p>

                      <div className="mt-auto flex flex-col items-center">
                        <span className="font-sans text-[11px] tracking-[0.1em] text-shadow mb-4">
                          Rs {fragrance.price.toLocaleString()}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(fragrance);
                          }}
                          className="w-full py-3.5 border border-shadow text-shadow hover:bg-shadow hover:text-pearl text-[9px] uppercase tracking-[0.25em] font-sans transition-all duration-300"
                        >
                          ADD TO BAG
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};
`;

fs.writeFileSync('src/components/PerfumesView.tsx', code);
console.log('Done replacing PerfumesView.tsx');
