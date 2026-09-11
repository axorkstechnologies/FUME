import React from 'react';
import { ThemeMode } from '../types';

interface BrandMarqueeProps {
  themeMode: ThemeMode;
}

export const BrandMarquee: React.FC<BrandMarqueeProps> = () => {
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
    <div className="relative w-full overflow-hidden py-4 border-y border-[#E3DDD3] bg-[#F9F6F0]/70 text-[#1A1816] select-none z-10">
      <div className="animate-marquee flex items-center space-x-12 whitespace-nowrap text-[10px] sm:text-[11px] uppercase tracking-[0.35em] font-sans font-medium">
        {[...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center space-x-12">
            <span>{text}</span>
            <span className="text-[#C49A88] text-xs">·</span>
          </div>
        ))}
      </div>
    </div>
  );
};
