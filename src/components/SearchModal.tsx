import React, { useState, useMemo } from 'react';
import { X, Search as SearchIcon, ArrowRight } from 'lucide-react';
import { Fragrance, ThemeMode } from '../types';
import { getFragranceTitle } from '../data/fragrances';
import { FlaconBottle } from './FlaconBottle';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  fragrances: Fragrance[];
  onSelectFragrance: (fragrance: Fragrance) => void;
  themeMode: ThemeMode;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  fragrances,
  onSelectFragrance,
  themeMode
}) => {
  const [query, setQuery] = useState('');
  const isLight = themeMode === 'light';

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return fragrances.filter((f) => {
      return (
        f.name.toLowerCase().includes(q) ||
        f.subtitle.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        f.notesLine.toLowerCase().includes(q) ||
        f.topNotes.toLowerCase().includes(q) ||
        f.heartNotes.toLowerCase().includes(q) ||
        f.baseNotes.toLowerCase().includes(q) ||
        f.olfactoryFamily.toLowerCase().includes(q) ||
        f.genderCategory.toLowerCase().includes(q) ||
        f.families.some(fam => fam.toLowerCase().includes(q))
      );
    });
  }, [query, fragrances]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 backdrop-blur-2xl flex flex-col items-center pt-24 px-6 md:px-12 animate-in fade-in duration-200 bg-[#0B0A09]/95 text-[#F5F2EB]"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 p-2 cursor-pointer transition-colors text-[#9E9589] hover:text-[#D4AF37]"
        aria-label="Close search"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="w-full max-w-3xl space-y-8">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-sans font-medium">
            FUME ARCHIVE SEARCH • SINCE 2024
          </span>
        </div>

        {/* Search Input */}
        <div
          className="relative border-b border-white/20 pb-3"
        >
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH PERFUMES OR NOTES (E.G. JASMINE, BIRCH, LEATHER)..."
            className="w-full bg-transparent text-xl sm:text-2xl md:text-3xl font-serif placeholder:text-[#666666] focus:outline-none uppercase tracking-wider pr-10 text-[#F5F2EB]"
          />
          <SearchIcon className="absolute right-0 top-2 w-6 h-6 text-[#D4AF37]" />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-sans">
          <span
            className="text-[10px] uppercase tracking-widest text-[#9E9589]"
          >
            QUICK NOTES:
          </span>
          {['Jasmine', 'Leather', 'Bergamot', 'Birch', 'Tonka', 'Iris', 'Oud', 'Amber'].map((note) => (
            <button
              key={note}
              onClick={() => setQuery(note)}
              className="px-3 py-1 text-[10px] uppercase tracking-wider rounded-xs transition-colors cursor-pointer border bg-white/[0.04] border-white/[0.08] text-[#9E9589] hover:border-[#D4AF37] hover:text-[#F5F2EB]"
            >
              {note}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="space-y-4 max-h-[50vh] overflow-y-auto pt-4">
          {query.trim() && results.length === 0 ? (
            <div className="text-center py-12 text-xs uppercase tracking-widest text-[#9E9589] font-sans">
              NO FRAGRANCES FOUND MATCHING &quot;{query}&quot;
            </div>
          ) : (
            results.map((fragrance) => (
              <div
                key={fragrance.id}
                onClick={() => {
                  onSelectFragrance(fragrance);
                  onClose();
                }}
                className="p-4 border border-white/[0.08] bg-[#141210]/80 hover:border-[#D4AF37]/60 transition-all flex items-center justify-between cursor-pointer group rounded-xs"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-14 overflow-hidden rounded-xs shrink-0 p-0.5 flex items-center justify-center border border-white/[0.08] bg-[#111111]"
                  >
                    <FlaconBottle
                      fragrance={fragrance}
                      variant="thumb"
                      themeMode="dark"
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <h4
                      className="font-serif text-lg uppercase tracking-wider group-hover:text-[#D4AF37] transition-colors text-[#F5F2EB]"
                    >
                      {getFragranceTitle(fragrance)}
                    </h4>
                    <p
                      className="text-[10px] uppercase tracking-wider text-[#9E9589]"
                    >
                      {fragrance.subtitle} • <span className="text-[#D4AF37]">{fragrance.olfactoryFamily}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs font-sans font-medium text-[#D4AF37]">
                    Rs {fragrance.price.toLocaleString()}
                  </span>
                  <ArrowRight
                    className="w-4 h-4 text-[#9E9589] group-hover:translate-x-1 group-hover:text-[#D4AF37] transition-all"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
