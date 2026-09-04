import React, { useState, useMemo } from 'react';
import { X, Search as SearchIcon, ArrowRight } from 'lucide-react';
import { Fragrance, ThemeMode } from '../types';
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
        f.topNotes.toLowerCase().includes(q) ||
        f.heartNotes.toLowerCase().includes(q) ||
        f.baseNotes.toLowerCase().includes(q) ||
        f.olfactoryFamily.toLowerCase().includes(q) ||
        f.genderCategory.toLowerCase().includes(q)
      );
    });
  }, [query, fragrances]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 backdrop-blur-md flex flex-col items-center pt-24 px-6 md:px-12 animate-in fade-in duration-200 ${
        isLight ? 'bg-[#FAF8F5]/95 text-[#1A1816]' : 'bg-black/90 text-white'
      }`}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className={`absolute top-8 right-8 p-2 cursor-pointer transition-colors ${
          isLight ? 'text-[#7D766E] hover:text-[#1A1816]' : 'text-[#8c8985] hover:text-white'
        }`}
        aria-label="Close search"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="w-full max-w-3xl space-y-8">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A059] font-sans font-medium">
            FUME ARCHIVE SEARCH • SINCE 2024
          </span>
        </div>

        {/* Search Input */}
        <div
          className={`relative border-b pb-3 ${
            isLight ? 'border-[#D9CFBE]' : 'border-[#333333]'
          }`}
        >
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH PERFUMES OR NOTES (E.G. JASMINE, BIRCH, LEATHER)..."
            className={`w-full bg-transparent text-xl sm:text-2xl md:text-3xl font-serif placeholder:text-[#A8A196] focus:outline-none uppercase tracking-wider pr-10 ${
              isLight ? 'text-[#1A1816]' : 'text-white'
            }`}
          />
          <SearchIcon className="absolute right-0 top-2 w-6 h-6 text-[#C5A059]" />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-sans">
          <span
            className={`text-[10px] uppercase tracking-widest ${
              isLight ? 'text-[#8C8377]' : 'text-[#666666]'
            }`}
          >
            QUICK NOTES:
          </span>
          {['Jasmine', 'Leather', 'Bergamot', 'Birch', 'Tonka', 'Iris'].map((note) => (
            <button
              key={note}
              onClick={() => setQuery(note)}
              className={`px-3 py-1 text-[10px] uppercase tracking-wider rounded-xs transition-colors cursor-pointer border ${
                isLight
                  ? 'bg-white border-[#E0D5C3] text-[#7D766E] hover:border-[#C5A059] hover:text-[#1A1816]'
                  : 'bg-[#141414] border-[#222222] text-[#8c8985] hover:border-[#444444] hover:text-white'
              }`}
            >
              {note}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="space-y-4 max-h-[50vh] overflow-y-auto pt-4">
          {query.trim() && results.length === 0 ? (
            <div className="text-center py-12 text-xs uppercase tracking-widest text-[#8c8985] font-sans">
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
                className={`p-4 border transition-all flex items-center justify-between cursor-pointer group ${
                  isLight
                    ? 'border-[#E8DFC9] bg-white hover:border-[#C5A059]'
                    : 'border-[#1a1a1a] bg-[#0d0d0d] hover:border-[#C5A059]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-14 overflow-hidden rounded-xs shrink-0 p-0.5 flex items-center justify-center border border-[#C5A059]/20"
                    style={{
                      backgroundColor: isLight ? fragrance.pastelBg : '#141414'
                    }}
                  >
                    <FlaconBottle
                      fragrance={fragrance}
                      variant="thumb"
                      themeMode={themeMode}
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <h4
                      className={`font-serif text-lg uppercase tracking-wider group-hover:text-[#C5A059] transition-colors ${
                        isLight ? 'text-[#1A1816]' : 'text-white'
                      }`}
                    >
                      {fragrance.name}
                    </h4>
                    <p
                      className={`text-[10px] uppercase tracking-wider ${
                        isLight ? 'text-[#7D766E]' : 'text-[#8c8985]'
                      }`}
                    >
                      {fragrance.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs font-sans font-medium text-[#C5A059]">
                    Rs {fragrance.price.toLocaleString()}
                  </span>
                  <ArrowRight
                    className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${
                      isLight ? 'text-[#7D766E]' : 'text-[#8c8985]'
                    }`}
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
