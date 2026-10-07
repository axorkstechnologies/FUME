import React, { useState, useMemo } from 'react';
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

  // Filter and sort while STRICTLY keeping Discovery Set at the very end
  const displayedFragrances = useMemo(() => {
    if (selectedCategory === 'CUSTOM MADE') return [];

    let list = fragrances.filter((f) => {
      if (selectedCategory === 'ALL') return true;
      if (selectedCategory === 'FOR HIM') return f.gender === 'him';
      if (selectedCategory === 'FOR HER') return f.gender === 'her';
      if (selectedCategory === 'UNISEX') return f.gender === 'unisex';
      return true;
    });

    // Separate discovery set so it is GUARANTEED to be at the very end
    const discoverySet = list.find((f) => f.id === 'discovery-set');
    const itemsWithoutSet = list.filter((f) => f.id !== 'discovery-set');

    if (sortBy === 'price-asc') {
      itemsWithoutSet.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      itemsWithoutSet.sort((a, b) => b.price - a.price);
    } else {
      // 'featured': Signatures (ARAB & DESERT) strictly first
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

    // Always append discovery set at the very end if it was part of the filtered list
    return discoverySet ? [...itemsWithoutSet, discoverySet] : itemsWithoutSet;
  }, [fragrances, selectedCategory, sortBy]);

  const handleWhatsAppConsultation = () => {
    const msg = encodeURIComponent(
      "Hello FUME Concierge, I am interested in creating a Custom Made Bespoke Fragrance. Please guide me through your private atelier process."
    );
    window.open(`https://wa.me/92381825636?text=${msg}`, '_blank');
  };

  return (
    <div className="relative w-full min-h-screen pt-32 pb-32 px-5 sm:px-8 md:px-12 lg:px-16 bg-pearl text-shadow">
      <div className="max-w-[1600px] mx-auto space-y-16 md:space-y-20">
        
        {/* Editorial Heading */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.45em] text-dusty-rose font-sans font-medium block">
              EST. 2024 • COMPLETE CATALOGUE
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal uppercase tracking-[0.16em] text-shadow">
            ALL PERFUMES
          </h1>
          <p className="text-xs sm:text-sm font-sans font-normal tracking-wider max-w-lg mx-auto text-shadow/80 leading-relaxed">
            Every creation is formulated at genuine Eau de Parfum strength, bottled in architectural flint glass, and delivered nationwide with a complimentary 2ml wear-test vial.
          </p>
        </div>

        {/* Discovery Filter & Sort Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-y border-shadow/[0.08] py-5">
          {/* Mandatory Categories: For Him • For Her • Unisex • Custom Made */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 text-[10px] uppercase tracking-[0.24em] font-sans transition-all duration-300 cursor-pointer rounded-xs border ${
                  selectedCategory === cat
                    ? 'bg-shadow text-pearl border-shadow font-semibold shadow-sm'
                    : 'bg-white/60 text-shadow/80 border-shadow/[0.1] hover:border-dusty-rose hover:text-shadow'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown (hidden on Custom Made view) */}
          {selectedCategory !== 'CUSTOM MADE' && (
            <div className="flex items-center gap-3 text-xs font-sans uppercase tracking-widest text-shadow/80">
              <span className="text-[10px] tracking-[0.2em]">SORT:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white/80 border border-shadow/20 text-shadow text-[10px] uppercase tracking-wider px-3.5 py-2 focus:outline-none cursor-pointer rounded-xs"
              >
                <option value="featured">Maison Curated (Signatures First)</option>
                <option value="price-asc">Price: Ascending</option>
                <option value="price-desc">Price: Descending</option>
              </select>
            </div>
          )}
        </div>

        {/* CUSTOM MADE SPECIAL VIEW */}
        {selectedCategory === 'CUSTOM MADE' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto bg-[#F5F0EB] border border-dusty-rose/40 rounded-sm p-8 sm:p-12 md:p-16 space-y-10 text-center shadow-lg"
          >
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.4em] text-dusty-rose font-sans font-semibold block">
                ATELIER BESPOKE COMMISSION
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl uppercase tracking-[0.14em] text-shadow">
                CUSTOM MADE FLACONS
              </h2>
              <p className="text-xs sm:text-sm font-sans text-shadow/80 max-w-xl mx-auto leading-relaxed pt-2">
                Compose an entirely individual olfactory identity. Collaborate one-on-one with our perfumer to formulate a private scent, bottled exclusively for you in a bespoke engraved flacon.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-left border-y border-shadow/[0.08] py-8">
              <div className="p-4 bg-pearl/60 rounded-xs border border-shadow/[0.04] space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-dusty-rose font-semibold block">
                  1. NOTE MAPPING
                </span>
                <p className="text-xs text-shadow/70 leading-relaxed font-sans">
                  Select your desired botanical accords, rare resinous woods, and personal sillage preferences.
                </p>
              </div>
              <div className="p-4 bg-pearl/60 rounded-xs border border-shadow/[0.04] space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-dusty-rose font-semibold block">
                  2. MACERATION
                </span>
                <p className="text-xs text-shadow/70 leading-relaxed font-sans">
                  Your custom formula undergoes cold-cellar maturation for balanced depth and skin performance.
                </p>
              </div>
              <div className="p-4 bg-pearl/60 rounded-xs border border-shadow/[0.04] space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-dusty-rose font-semibold block">
                  3. ENGRAVED FLACON
                </span>
                <p className="text-xs text-shadow/70 leading-relaxed font-sans">
                  Bottled in architectural flint glass with bespoke personalized gold engraving and certified dossier.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleWhatsAppConsultation}
                className="w-full sm:w-auto px-10 py-4 bg-shadow text-pearl hover:bg-dusty-rose text-[11px] uppercase tracking-[0.28em] font-sans font-semibold transition-all duration-300 cursor-pointer shadow-md flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>START BESPOKE CONSULTATION VIA WHATSAPP</span>
              </button>
            </div>

            <p className="text-[10px] uppercase tracking-[0.25em] text-shadow/50 font-sans">
              WHATSAPP CONCIERGE: +92 381 825 636 • STUDIO PECHS BLOCK 2, KARACHI
            </p>
          </motion.div>
        ) : (
          /* STANDARD CATALOGUE GRID */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
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
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                    onClick={() => onSelectFragrance(fragrance)}
                    className={`group flex flex-col justify-between rounded-sm p-6 cursor-pointer transition-all duration-400 hover:shadow-[0_16px_40px_rgba(18,17,16,0.08)] hover:-translate-y-1 ${
                      isSignature
                        ? 'bg-[#F4EFEB] border-2 border-dusty-rose/40 hover:border-dusty-rose'
                        : isDiscoverySet
                        ? 'bg-gradient-to-b from-[#F7F2EC] to-[#EFECE6] border border-dusty-rose/30 hover:border-dusty-rose'
                        : 'bg-[#F8F5F1] border border-shadow/[0.08] hover:border-dusty-rose/50'
                    }`}
                  >
                    {/* Header Badges */}
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

                    {/* Bottle Display — Generous Padding & Framing */}
                    <div className="relative w-full aspect-[4/5] flex items-center justify-center p-6 bg-pearl/75 rounded-xs border border-shadow/[0.03] overflow-hidden my-3">
                      <img
                        src={fragrance.image}
                        alt={`FUME ${fragrance.name} Flacon`}
                        className="w-full h-full object-contain p-2 select-none transition-transform duration-600 ease-out group-hover:scale-105 filter drop-shadow-sm"
                        loading="lazy"
                      />
                    </div>

                    {/* Metadata Section */}
                    <div className="pt-3 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-1 text-center">
                        <h3 className="font-serif text-lg uppercase tracking-[0.14em] text-shadow group-hover:text-dusty-rose transition-colors duration-300">
                          {getFragranceTitle(fragrance)}
                        </h3>
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
          </div>
        )}

      </div>
    </div>
  );
};
