import React from 'react';
import { ThemeMode } from '../types';

interface BrandMarqueeProps {
  themeMode: ThemeMode;
}

export const BrandMarquee: React.FC<BrandMarqueeProps> = () => {
  const items = [
    'FUME HAUTE PARFUMERIE',
    'EST. 2024',
    'YOUR SCENT. YOUR STORY.',
    'KARACHI · PAKISTAN',
    'ALL-DAY PRESENCE',
    'ARTISAN CRAFTED'
  ];

  return (
    <div className="relative w-full overflow-hidden py-5 sm:py-6 border-y border-shadow/[0.08] bg-pearl text-shadow/90 select-none z-10">
      <div className="animate-marquee flex items-center space-x-16 sm:space-x-24 whitespace-nowrap text-[9px] sm:text-[10px] uppercase tracking-[0.4em] font-sans font-medium">
        {[...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center space-x-16 sm:space-x-24">
            <span>{text}</span>
            <span className="text-dusty-rose/40 text-xs">·</span>
          </div>
        ))}
      </div>
    </div>
  );
};
