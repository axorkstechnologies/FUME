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
      {/* Cinematic Parallax Background Image with Ambient Breathing */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full"
        >
          <motion.img
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.52 }}
            transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
            src="/bottles/hero-three-bottles.jpeg"
            alt="FUME FRAGRANCES — Crown Haute Parfumerie Flacons"
            className="w-full h-full object-cover object-center filter contrast-[1.05]"
            loading="eager"
          />
        </motion.div>
        
        {/* Optical Glass Caustic Overlays & Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-shadow via-shadow/50 to-shadow/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.65)_100%)] pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center text-center pt-24 pb-20">

        {/* Maison Micro-Badge with Liquid Glass Catch */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-5 py-2 mb-8 rounded-none border border-white/20 bg-white/[0.04] backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A59A] animate-pulse" />
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.42em] font-sans text-pearl/80 font-medium">
            HAUTE PARFUMERIE • KARACHI
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] md:text-[11px] uppercase tracking-[0.55em] font-sans text-pearl/70 font-normal mb-6"
        >
          YOUR SCENT. YOUR STORY.
        </motion.p>

        {/* Brand Name with Optical Spatial Presence */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-[9.5rem] font-normal uppercase tracking-[0.22em] leading-[0.88] text-pearl mb-6 drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)]"
        >
          FUME
        </motion.h1>

        {/* Fine Filigree Divider with Subtle Diamond Core */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center my-6 origin-center w-40"
        >
          <div className="w-full h-px bg-gradient-to-r from-transparent via-pearl/40 to-transparent" />
          <div className="absolute w-1.5 h-1.5 rotate-45 border border-pearl/60 bg-shadow" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs md:text-sm tracking-[0.6em] font-sans font-light uppercase text-pearl/70 mb-3"
        >
          FRAGRANCES
        </motion.p>

        {/* EST. */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-[9px] tracking-[0.5em] font-sans text-pearl/40 uppercase mb-6"
        >
          EST. 2024
        </motion.p>

        {/* Supporting sentence */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-[11px] md:text-xs font-sans text-pearl/60 tracking-[0.14em] max-w-lg mx-auto mb-14 leading-relaxed font-light"
        >
          An independent Pakistani fragrance house formulating crown signature flacons and artisanal impressions with 22–28% pure perfume oils.
        </motion.p>

        {/* Luxury Skeuomorphic & Glass CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm sm:max-w-none sm:w-auto flex flex-col sm:flex-row items-center gap-5"
        >
          <button
            onClick={onShopPerfumes}
            className="w-full sm:w-auto px-12 sm:px-14 py-4 sm:py-5 text-[10px] uppercase tracking-[0.35em] font-sans font-medium transition-all duration-400 tactile-button-light animate-sheen cursor-pointer"
          >
            SHOP THE COLLECTION
          </button>

          <button
            onClick={onOpenQuiz || onExploreFume}
            className="w-full sm:w-auto px-12 sm:px-14 py-4 sm:py-5 text-[10px] uppercase tracking-[0.35em] font-sans font-medium transition-all duration-400 luxury-glass-dark text-pearl hover:text-white hover:border-white/40 cursor-pointer"
          >
            {onOpenQuiz ? 'FIND YOUR SCENT' : 'EXPLORE ATELIER'}
          </button>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2.2, duration: 1 }}
        onClick={onExploreFume}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 cursor-pointer group"
      >
        <span className="text-[8px] uppercase tracking-[0.4em] font-sans text-pearl/60 group-hover:text-pearl transition-colors">
          DISCOVER
        </span>
        <div className="w-[1px] h-9 bg-gradient-to-b from-pearl/60 via-pearl/30 to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: [0, 36, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-3 bg-pearl"
          />
        </div>
      </motion.div>
      
      {/* Bottom gradient transition to pearl */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-pearl pointer-events-none" />
    </section>
  );
};
