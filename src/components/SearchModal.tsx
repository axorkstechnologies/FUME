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
      className="fixed inset-0 z-50 flex flex-col items-center pt-24 px-6 md:px-12 animate-in fade-in duration-200 bg-pearl/95 text-shadow"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 p-2 cursor-pointer transition-colors text-shadow/80 hover:text-dusty-rose"
        aria-label="Close search"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="w-full max-w-3xl space-y-8">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.35em] text-dusty-rose font-sans font-medium">
            FUME ARCHIVE SEARCH • SINCE 2024
          </span>
        </div>

        {/* Search Input */}
        <div
          className="relative border-b border-shadow/20 pb-3"
        >
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH PERFUMES OR NOTES (E.G. JASMINE, BIRCH, LEATHER)..."
            className="w-full bg-transparent text-xl sm:text-2xl md:text-3xl font-serif placeholder:text-shadow/70 focus:outline-none uppercase tracking-wider pr-10 text-shadow"
          />
          <SearchIcon className="absolute right-0 top-2 w-6 h-6 text-dusty-rose" />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-sans">
          <span
            className="text-[10px] uppercase tracking-widest text-shadow/80"
          >
            QUICK NOTES:
          </span>
          {['Jasmine', 'Leather', 'Bergamot', 'Birch', 'Tonka', 'Iris', 'Oud', 'Amber'].map((note) => (
            <button
              key={note}
              onClick={() => setQuery(note)}
              className="px-3 py-1 text-[10px] uppercase tracking-wider transition-colors cursor-pointer border bg-pearl/[0.04] border-shadow/[0.08] text-shadow/80 hover:border-dusty-rose hover:text-shadow"
            >
              {note}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="space-y-4 max-h-[50vh] overflow-y-auto pt-4">
          {query.trim() && results.length === 0 ? (
            <div className="text-center py-12 text-xs uppercase tracking-widest text-shadow/80 font-sans">
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
                className="p-4 border border-shadow/[0.08] bg-shadow/5/80 hover:border-dusty-rose/60 transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-14 overflow-hidden shrink-0 p-0.5 flex items-center justify-center border border-shadow/[0.08] bg-pearl"
                  >
                    <img src={fragrance.image}
                      alt={fragrance.name}
                      className="w-full h-full object-contain"
                     loading="lazy" decoding="async" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4
                        className="font-serif text-lg uppercase tracking-wider group-hover:text-dusty-rose transition-colors text-shadow"
                      >
                        {getFragranceTitle(fragrance)}
                      </h4>
                      {fragrance.productType === 'signature' ? (
                        <span className="text-[7px] uppercase tracking-[0.2em] px-2 py-0.5 bg-shadow text-pearl font-semibold rounded-2xs">
                          SIGNATURE
                        </span>
                      ) : fragrance.id === 'discovery-set' ? (
                        <span className="text-[7px] uppercase tracking-[0.2em] px-2 py-0.5 bg-dusty-rose text-pearl font-semibold rounded-2xs">
                          SET
                        </span>
                      ) : (
                        <span className="text-[7px] uppercase tracking-[0.2em] px-2 py-0.5 border border-shadow/20 text-shadow/80 rounded-2xs">
                          IMPRESSION
                        </span>
                      )}
                    </div>
                    <p
                      className="text-[10px] uppercase tracking-wider text-shadow/80"
                    >
                      {fragrance.subtitle} • <span className="text-dusty-rose">{fragrance.olfactoryFamily}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs font-sans font-medium text-dusty-rose">
                    Rs {fragrance.price.toLocaleString()}
                  </span>
                  <ArrowRight
                    className="w-4 h-4 text-shadow/80 group-hover:translate-x-1 group-hover:text-dusty-rose transition-all"
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
