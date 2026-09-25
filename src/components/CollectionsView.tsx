import React from 'react';
import { motion } from 'motion/react';
import { Fragrance, ThemeMode } from '../types';
import { CAMPAIGN_IMAGE, EDITORIAL_IMAGE, HERO_BOTTLE_IMAGE } from '../data/fragrances';

interface CollectionsViewProps {
  onShopPerfumes: () => void;
  onSelectFragrance: (fragrance: Fragrance) => void;
  fragrances: Fragrance[];
  themeMode: ThemeMode;
}

export const CollectionsView: React.FC<CollectionsViewProps> = ({
  onShopPerfumes,
  onSelectFragrance,
  fragrances,
  themeMode
}) => {
  const isLight = themeMode === 'light';

  const collections = [
    {
      title: 'THE NOCTURNE TRILOGY',
      tagline: 'SCENT AFTER MIDNIGHT • EST. 2024',
      description: 'Conceived for intimate darkness and low-lit rooms. Formulated with smoked oakmoss, night-blooming jasmine, and charred tonka bean.',
      image: HERO_BOTTLE_IMAGE,
      featuredIds: ['bloom', 'my-way', 'wanted'],
      pastelTag: '#F8F4F0'
    },
    {
      title: 'THE TERRA LEATHER ARCHIVE',
      tagline: 'RARE WOODS & AGED RESINS • EST. 2024',
      description: 'Scorched birch, Tuscan leather, and Virginian tobacco aged in French oak casks for unprecedented longevity.',
      image: EDITORIAL_IMAGE,
      featuredIds: ['bomb', 'creed', 'beckham'],
      pastelTag: '#F8F4F0'
    },
    {
      title: 'THE MINERAL & ALDEHYDE SUITE',
      tagline: 'CRYSTALLINE EQUILIBRIUM • EST. 2024',
      description: 'Frost aldehydes, Florentine iris butter, and raw ambroxan. Razor-sharp elegance that cuts cleanly through cold air.',
      image: CAMPAIGN_IMAGE,
      featuredIds: ['eternity', 'sauvage'],
      pastelTag: '#F8F4F0'
    }
  ];

  return (
    <div
      className="relative w-full min-h-screen pt-32 pb-32 px-6 md:px-12 lg:px-16 bg-pearl text-shadow"
    >
      <div className="max-w-[1700px] mx-auto space-y-24">
        {/* Editorial Heading */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.4em] text-dusty-rose font-sans font-medium block">
              SINCE 2024 • CURATED ANTHOLOGIES
            </span>
          </div>

          <h1
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal uppercase tracking-[0.16em] text-shadow"
          >
            COLLECTIONS
          </h1>
          <p
            className="text-xs sm:text-sm font-sans font-light tracking-widest max-w-md mx-auto text-shadow/60"
          >
            Thematic expressions uniting fragrance, architecture, and enduring emotion.
          </p>
        </div>

        {/* Collection Blocks */}
        <div className="space-y-28">
          {collections.map((col, idx) => (
            <div
              key={col.title}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="aspect-[16/10] bg-pearl overflow-hidden relative group rounded-sm border border-shadow/[0.08] shadow-2xl">
                  <img
                    src={col.image}
                    alt={col.title}
                    className="w-full h-full object-cover object-center filter brightness-90 contrast-105 transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-pearl/35" />
                </div>
              </div>

              <div className={`lg:col-span-5 space-y-6 ${idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                <span className="text-[10px] uppercase tracking-[0.3em] text-dusty-rose font-sans block font-medium">
                  {col.tagline}
                </span>
                <h2
                  className="font-serif text-3xl sm:text-4xl uppercase tracking-[0.16em] text-shadow"
                >
                  {col.title}
                </h2>
                <p
                  className="text-xs sm:text-sm font-sans font-light leading-relaxed text-shadow/60"
                >
                  {col.description}
                </p>

                {/* Included Flacons Pills */}
                <div className="pt-2 space-y-2">
                  <span
                    className="text-[9px] uppercase tracking-[0.25em] block text-shadow/60"
                  >
                    INCLUDED FLACONS:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {col.featuredIds.map((id) => {
                      const frag = fragrances.find((f) => f.id === id);
                      if (!frag) return null;
                      return (
                        <button
                          key={id}
                          onClick={() => onSelectFragrance(frag)}
                          className="px-3.5 py-1.5 text-[10px] uppercase tracking-wider transition-colors cursor-pointer rounded-xs border bg-white/[0.04] border-shadow/[0.08] text-shadow hover:border-dusty-rose hover:text-dusty-rose"
                        >
                          {frag.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={onShopPerfumes}
                    className="px-8 py-3.5 text-[10px] uppercase tracking-[0.25em] font-sans font-semibold transition-all cursor-pointer bg-dusty-rose text-pearl hover:bg-dusty-rose hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]"
                  >
                    EXPLORE ALL PERFUMES
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
