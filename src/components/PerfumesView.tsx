import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Fragrance, ThemeMode } from '../types';
import { getFragranceTitle } from '../data/fragrances';

interface PerfumesViewProps {
  fragrances: Fragrance[];
  onSelectFragrance: (fragrance: Fragrance) => void;
  onAddToCart: (fragrance: Fragrance) => void;
  themeMode: ThemeMode;
}

type FilterTag = 'ALL' | 'FOR HIM' | 'FOR HER' | 'UNISEX' | 'FRESH' | 'WOODY' | 'ORIENTAL';

export const PerfumesView: React.FC<PerfumesViewProps> = ({
  fragrances,
  onSelectFragrance,
  onAddToCart,
  themeMode
}) => {
  const [selectedTag, setSelectedTag] = useState<FilterTag>('ALL');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const isLight = themeMode === 'light';

  const filteredFragrances = useMemo(() => {
    let list = fragrances.filter((f) => {
      if (selectedTag === 'ALL') return true;
      if (selectedTag === 'FOR HIM') return f.gender === 'him';
      if (selectedTag === 'FOR HER') return f.gender === 'her';
      if (selectedTag === 'UNISEX') return f.gender === 'unisex';
      return f.families.includes(selectedTag.toLowerCase());
    });

    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    return list;
  }, [fragrances, selectedTag, sortBy]);

  const tags: FilterTag[] = ['ALL', 'FOR HIM', 'FOR HER', 'UNISEX', 'FRESH', 'WOODY', 'ORIENTAL'];

  return (
    <div
      className="relative w-full min-h-screen pt-32 pb-32 px-6 md:px-12 lg:px-16 bg-pearl text-shadow"
    >
      <div className="max-w-[1700px] mx-auto space-y-16">
        {/* Editorial Heading */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.4em] text-dusty-rose font-sans font-medium block">
              EST. 2024 • PRIMARY PRODUCT DISCOVERY
            </span>
          </div>

          <h1
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal uppercase tracking-[0.16em] text-shadow"
          >
            PERFUMES
          </h1>
          <p
            className="text-xs sm:text-sm font-sans font-light tracking-widest max-w-md mx-auto text-shadow/60"
          >
            Explore all signature FUME flacons, formulated in Grasse since 2024 for exceptional longevity.
          </p>
        </div>

        {/* Discovery Filter & Sort Bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-6 border-y border-shadow/[0.08] py-4"
        >
          {/* Filter Tags */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 text-[10px] uppercase tracking-[0.22em] font-sans transition-all cursor-pointer rounded-xs border ${
                  selectedTag === tag
                    ? 'bg-dusty-rose text-pearl border-dusty-rose font-semibold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                    : 'bg-white/[0.04] text-shadow/60 border-shadow/[0.08] hover:border-dusty-rose hover:text-shadow'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div
            className="flex items-center gap-3 text-xs font-sans uppercase tracking-widest text-shadow/60"
          >
            <span className="text-[10px]">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-shadow/5 border border-shadow/20 text-shadow text-[10px] uppercase tracking-wider px-3 py-1.5 focus:outline-none cursor-pointer rounded-xs"
            >
              <option value="featured" className="bg-pearl text-shadow">
                Curated Order
              </option>
              <option value="price-asc" className="bg-pearl text-shadow">
                Price: Low to High
              </option>
              <option value="price-desc" className="bg-pearl text-shadow">
                Price: High to Low
              </option>
            </select>
          </div>
        </div>

        {/* Products Grid – Consistent Card Structure */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
          {filteredFragrances.map((fragrance, index) => (
            <motion.div
              key={fragrance.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => onSelectFragrance(fragrance)}
              className="group flex flex-col cursor-pointer"
            >
              {/* Image Card – Fixed aspect ratio */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-oyster border border-shadow/[0.06] transition-all duration-500 group-hover:shadow-[0_16px_48px_rgba(26,26,26,0.1)] group-hover:border-dusty-rose/40 group-hover:-translate-y-1.5">
                <img
                  src={fragrance.image}
                  alt={`FUME ${fragrance.name} Eau de Parfum`}
                  className="absolute inset-0 w-full h-full object-contain object-center p-6 sm:p-8 select-none transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
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

              {/* Product Meta – Identical structure */}
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
    </div>
  );
};
