import React from 'react';
import { ThemeMode } from '../types';

interface BrandMarqueeProps {
  themeMode: ThemeMode;
}

export const BrandMarquee: React.FC<BrandMarqueeProps> = ({ themeMode }) => {
  const isLight = themeMode === 'light';

  const items = [
    'FUME HAUTE PARFUMERIE',
    'SINCE 2024',
    'SCENT, REFINED',
    'GRASSE & PARIS',
    '14+ HRS LONGEVITY',
    'BOTANICAL DISTILLATES',
    'EST. 2024',
    'THE ARCHIVE COLLECTION'
  ];

  return (
    <div
      className={`relative w-full overflow-hidden py-4 border-y transition-colors duration-500 select-none z-10 ${
        isLight
          ? 'bg-[#F5F1E8]/70 border-[#E8DFC9] text-[#7A6A4E]'
          : 'bg-[#111111]/80 border-[#262117] text-[#C5A059]'
      }`}
    >
      <div className="animate-marquee flex items-center space-x-12 whitespace-nowrap text-[10px] sm:text-[11px] uppercase tracking-[0.35em] font-sans font-medium">
        {[...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center space-x-12">
            <span>{text}</span>
            <span className="text-[#C5A059] text-xs">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};
