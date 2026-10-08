import React from 'react';
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
          animate={{ scale: 1, opacity: 0.45 }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          src="/bottles/hero-three-bottles.jpeg"
          alt="FUME FRAGRANCES"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-shadow via-shadow/40 to-shadow/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center text-center">

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] font-sans text-pearl/70 font-medium mb-10"
        >
          YOUR SCENT. YOUR STORY.
        </motion.p>

        {/* Brand Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-normal uppercase tracking-[0.2em] leading-[0.9] text-pearl mb-4"
        >
          FUME
        </motion.h1>

        {/* Separator */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.0 }}
          className="w-14 h-px bg-pearl my-6 origin-center"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="text-xs md:text-sm tracking-[0.5em] font-sans font-light uppercase text-pearl/60 mb-6"
        >
          FRAGRANCES
        </motion.p>

        {/* EST. */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="text-[9px] tracking-[0.5em] font-sans text-pearl/40 uppercase mb-4"
        >
          EST. 2024
        </motion.p>

        {/* Supporting sentence */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="text-[11px] md:text-xs font-sans text-pearl/50 tracking-[0.12em] max-w-md mx-auto mb-14 leading-relaxed"
        >
          An independent Pakistani fragrance house crafting signature and impression Eau de Parfum with uncompromising presence.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="w-full max-w-sm sm:max-w-none sm:w-auto flex flex-col sm:flex-row items-center gap-5"
        >
          <button
            onClick={onShopPerfumes}
            className="w-full sm:w-auto px-14 py-5 text-[10px] uppercase tracking-[0.35em] font-sans font-medium transition-all duration-500 bg-pearl text-shadow hover:bg-pearl hover:text-shadow active:scale-[0.98] cursor-pointer"
          >
            SHOP THE COLLECTION
          </button>

          <button
            onClick={onOpenQuiz || onExploreFume}
            className="w-full sm:w-auto px-14 py-5 text-[10px] uppercase tracking-[0.35em] font-sans font-medium transition-all duration-500 bg-transparent border border-pearl/30 text-pearl hover:border-pearl hover:bg-pearl hover:text-shadow active:scale-[0.98] cursor-pointer"
          >
            {onOpenQuiz ? 'FIND YOUR SCENT' : 'EXPLORE FUME'}
          </button>
        </motion.div>
      </div>
      
      {/* Bottom gradient transition to pearl */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-pearl pointer-events-none" />
    </section>
  );
};
