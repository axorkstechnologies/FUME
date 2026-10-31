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
      {/* Cinematic Organic Parallax Background with Ambient Breathing & Moving Light Catch */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        <motion.div
          animate={{ scale: [1, 1.035, 1], y: [0, -6, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full"
        >
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.54 }}
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            src="/bottles/hero-three-bottles.jpeg"
            alt="FUME FRAGRANCES — Crown Haute Parfumerie Flacons"
            className="w-full h-full object-cover object-center filter contrast-[1.08] brightness-[0.96]"
            loading="eager"
          />
        </motion.div>
        
        {/* Layered Optical Caustics, Dark Ambient Diffusion & Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-shadow via-shadow/55 to-shadow/35" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.72)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(212,165,154,0.06)_0%,transparent_60%)]" />
      </div>

      {/* Hero Content with High-End Spatial Depth & Architectural Precision */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center text-center pt-28 md:pt-36 pb-32 md:pb-40">

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] md:text-[11.5px] uppercase tracking-[0.55em] font-sans text-pearl font-medium mb-6"
        >
          YOUR SCENT. YOUR STORY.
        </motion.p>

        {/* Brand Moniker with Deep Architectural Spatial Presence */}
        <motion.h1
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-[9.8rem] font-normal uppercase tracking-[0.22em] leading-[0.88] text-pearl mb-6 select-none"
          style={{
            textShadow: '0 2px 4px rgba(0,0,0,0.3), 0 12px 24px rgba(0,0,0,0.45), 0 35px 70px rgba(0,0,0,0.6)'
          }}
        >
          FUME
        </motion.h1>

        {/* Hand-Engraved Filigree Divider with Diamond Core & Accent Beads */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.3, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center my-6 origin-center w-48"
        >
          <div className="w-full h-px bg-gradient-to-r from-transparent via-pearl/40 to-transparent" />
          <div className="absolute flex items-center gap-2 px-2 bg-shadow">
            <span className="w-1 h-1 rounded-full bg-[#D4A59A]/60" />
            <div className="w-2 h-2 rotate-45 border border-pearl/70 bg-shadow shadow-[0_0_6px_rgba(255,255,255,0.2)]" />
            <span className="w-1 h-1 rounded-full bg-[#D4A59A]/60" />
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs md:text-sm tracking-[0.62em] font-sans font-medium uppercase text-pearl mb-3"
        >
          FRAGRANCES
        </motion.p>

        {/* EST. */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] tracking-[0.52em] font-sans text-pearl/80 uppercase mb-6 font-medium"
        >
          EST. 2024
        </motion.p>

        {/* Supporting Narrative */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-[12px] md:text-[13px] font-sans text-pearl/90 tracking-[0.12em] max-w-xl mx-auto mb-10 md:mb-12 leading-relaxed font-normal"
        >
          An independent Pakistani fragrance house formulating crown signature flacons and artisanal impressions with pure perfume oils.
        </motion.p>

        {/* Skeuomorphic Tactile & Liquid Glass CTAs - Elevated z-index & clean stacking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-30 w-full max-w-sm sm:max-w-none sm:w-auto flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6"
        >
          <button
            onClick={onShopPerfumes}
            className="w-full sm:w-auto px-12 sm:px-14 py-4 sm:py-5 text-[10px] uppercase tracking-[0.35em] font-sans font-semibold transition-all duration-400 tactile-button-light animate-sheen cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            SHOP THE COLLECTION
          </button>

          <button
            onClick={onOpenQuiz || onExploreFume}
            className="w-full sm:w-auto px-12 sm:px-14 py-4 sm:py-5 text-[10px] uppercase tracking-[0.35em] font-sans font-semibold transition-all duration-400 luxury-glass-dark text-pearl hover:text-white hover:border-white/40 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            {onOpenQuiz ? 'FIND YOUR SCENT' : 'EXPLORE ATELIER'}
          </button>
        </motion.div>
      </div>

      {/* Floating Scroll Discovery Indicator - Cleanly positioned below with no overlap */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 2.2, duration: 1.2 }}
        onClick={onExploreFume}
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 hidden sm:flex flex-col items-center gap-2.5 cursor-pointer group pointer-events-auto"
      >
        <span className="text-[8px] uppercase tracking-[0.45em] font-sans text-pearl/70 group-hover:text-pearl transition-colors duration-300 font-medium">
          DISCOVER
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-pearl/60 via-pearl/25 to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: [0, 32, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-3 bg-gradient-to-b from-pearl to-[#D4A59A]"
          />
        </div>
      </motion.div>
      
      {/* Clean Bottom Gradient Edge - strictly confined to boundary behind content */}
      <div className="absolute bottom-0 left-0 w-full h-16 md:h-24 bg-gradient-to-b from-transparent to-pearl z-10 pointer-events-none" />
    </section>
  );
};
