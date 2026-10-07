const fs = require('fs');

const code = `import React from 'react';
import { motion } from 'motion/react';
import { ThemeMode } from '../types';

interface HeroSectionProps {
  onShopPerfumes: () => void;
  onExploreFume: () => void;
  onOpenQuiz?: () => void;
  themeMode?: ThemeMode;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopPerfumes,
  onExploreFume,
  onOpenQuiz
}) => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-shadow">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <motion.img
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          src="/bottles/hero-three-bottles.jpeg"
          alt="FUME FRAGRANCES"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* Stark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-shadow via-shadow/50 to-transparent" />
        <div className="absolute inset-0 bg-shadow/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center text-center pt-24">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] font-sans text-pearl/70 font-medium">
            YOUR SCENT. YOUR STORY.
          </span>
          <span className="w-1 h-1 rounded-full bg-pearl/40" />
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] text-pearl/70 font-sans font-medium">
            EST. 2024
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-[8rem] font-normal uppercase tracking-[0.16em] leading-[0.9] text-pearl mb-8"
        >
          SCENT,<br className="hidden sm:block" />
          <span className="italic text-pearl/80">REFINED.</span>
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-xs md:text-sm font-sans text-pearl/60 tracking-[0.15em] max-w-xl mx-auto mb-14 leading-relaxed font-normal"
        >
          AN INDEPENDENT FRAGRANCE HOUSE CRAFTING SIGNATURE AND IMPRESSION EAU DE PARFUM WITH UNCOMPROMISING PRESENCE.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="w-full max-w-sm sm:max-w-none sm:w-auto flex flex-col sm:flex-row items-center gap-6"
        >
          <button
            onClick={onShopPerfumes}
            className="w-full sm:w-auto px-14 py-[20px] text-[10px] uppercase tracking-[0.35em] font-sans font-medium transition-all duration-500 bg-pearl text-shadow hover:bg-pearl/90 active:scale-[0.98] cursor-pointer"
          >
            SHOP THE COLLECTION
          </button>

          <button
            onClick={onOpenQuiz || onExploreFume}
            className="w-full sm:w-auto px-14 py-[20px] text-[10px] uppercase tracking-[0.35em] font-sans font-medium transition-all duration-500 bg-transparent border border-pearl/30 text-pearl hover:border-pearl hover:bg-pearl/5 active:scale-[0.98] cursor-pointer"
          >
            {onOpenQuiz ? 'FIND YOUR SCENT' : 'EXPLORE FUME'}
          </button>
        </motion.div>
      </div>
      
      {/* Absolute Bottom transition */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-pearl" />
    </section>
  );
};
`;

fs.writeFileSync('src/components/HeroSection.tsx', code);
console.log('Done replacing HeroSection.tsx');
