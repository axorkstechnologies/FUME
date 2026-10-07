const fs = require('fs');

const code = `import React from 'react';
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
  fragrances
}) => {

  const collections = [
    {
      title: 'THE NOCTURNE TRILOGY',
      tagline: 'SCENT AFTER MIDNIGHT',
      description: 'Conceived for intimate darkness and low-lit rooms. Formulated with smoked oakmoss, night-blooming jasmine, and charred tonka bean.',
      image: '/bottles/hero-three-bottles.jpeg',
      featuredIds: ['bloom', 'my-way', 'wanted']
    },
    {
      title: 'THE MAISON ARCHIVE',
      tagline: 'SIGNATURE & CLASSICS',
      description: 'Our foundational portfolio of olfactory signatures. Balancing bright citrus top notes with enduring, structured woody bases.',
      image: EDITORIAL_IMAGE,
      featuredIds: ['arab', 'desert', 'legend']
    }
  ];

  return (
    <div className="relative w-full min-h-screen pt-32 pb-32 px-5 sm:px-8 md:px-12 lg:px-16 bg-pearl text-shadow">
      <div className="max-w-[1400px] mx-auto space-y-32">
        
        {/* Header */}
        <div className="text-center space-y-5 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.45em] text-shadow/60 font-sans font-medium block">
              CURATED SETS
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal uppercase tracking-[0.16em] text-shadow">
            COLLECTIONS
          </h1>
          <p className="text-xs sm:text-sm font-sans font-normal tracking-wider max-w-lg mx-auto text-shadow/80 leading-relaxed">
            Thematic olfactory trilogies assembled for distinct moods, seasons, and occasions.
          </p>
        </div>

        {/* Collections Feed */}
        <div className="space-y-32">
          {collections.map((collection, index) => {
            const isEven = index % 2 === 0;
            const collectionFragrances = collection.featuredIds
              .map(id => fragrances.find(f => f.id === id))
              .filter(Boolean) as Fragrance[];

            return (
              <section key={collection.title} className="space-y-16">
                <div className={\`flex flex-col \${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center\`}>
                  
                  {/* Editorial Image */}
                  <div className="w-full lg:w-[45%] aspect-[4/5] bg-oyster/50 flex items-center justify-center overflow-hidden">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="w-full h-full object-cover filter grayscale opacity-90 transition-transform duration-1000 hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Editorial Copy */}
                  <div className="w-full lg:w-[55%] space-y-8">
                    <div className="space-y-4">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-shadow/60 font-semibold block">
                        {collection.tagline}
                      </span>
                      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl uppercase tracking-[0.14em] text-shadow leading-tight">
                        {collection.title}
                      </h2>
                    </div>
                    <p className="text-sm font-sans font-light leading-relaxed text-shadow/80 max-w-md">
                      {collection.description}
                    </p>
                    
                    <button
                      onClick={onShopPerfumes}
                      className="inline-block px-10 py-4 border border-shadow text-shadow hover:bg-shadow hover:text-pearl text-[9px] uppercase tracking-[0.3em] font-sans transition-all duration-300"
                    >
                      EXPLORE TRILOGY
                    </button>
                  </div>
                </div>

                {/* Fragrance Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-shadow/[0.08]">
                  {collectionFragrances.map((fragrance) => (
                    <div 
                      key={fragrance.id}
                      onClick={() => onSelectFragrance(fragrance)}
                      className="group flex flex-col cursor-pointer"
                    >
                      <div className="relative w-full aspect-square bg-oyster/30 flex items-center justify-center p-8 overflow-hidden mb-6 transition-colors duration-500 group-hover:bg-oyster/80">
                        <img
                          src={fragrance.image}
                          alt={fragrance.name}
                          className="w-full h-full object-contain filter drop-shadow-sm select-none transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="font-serif text-xl uppercase tracking-[0.16em] text-shadow mb-2">
                          {fragrance.name}
                        </h3>
                        <p className="text-[9px] uppercase tracking-[0.2em] text-shadow/60 font-sans">
                          {fragrance.subtitle}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

      </div>
    </div>
  );
};
`;

fs.writeFileSync('src/components/CollectionsView.tsx', code);
console.log('Done replacing CollectionsView.tsx');
