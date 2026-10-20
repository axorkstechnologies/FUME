import React from 'react';
import { motion } from 'motion/react';
import { ThemeMode } from '../types';

interface BrandStatementProps {
  themeMode?: ThemeMode;
}

export const BrandStatement: React.FC<BrandStatementProps> = () => {
  return (
    <section
      className="relative w-full py-32 md:py-48 px-6 md:px-12 lg:px-20 border-b border-shadow/[0.06] bg-pearl overflow-hidden"
    >
      <div className="max-w-5xl mx-auto text-center space-y-12 md:space-y-16">
        {/* Archival Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-shadow/10 bg-white/70 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A59A]" />
          <span className="text-[9px] uppercase tracking-[0.42em] text-dusty-rose font-sans font-medium block">
            THE FUME PHILOSOPHY &bull; EST. 2024
          </span>
        </motion.div>

        {/* Monumental Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal uppercase tracking-[0.14em] leading-[1.05] text-shadow"
          style={{
            textShadow: '0 2px 4px rgba(0,0,0,0.06), 0 10px 20px rgba(0,0,0,0.08)'
          }}
        >
          A SCENT THAT STAYS.
        </motion.h2>

        {/* Fine Filigree Divider */}
        <div className="relative flex items-center justify-center origin-center w-36 mx-auto">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-shadow/25 to-transparent" />
          <div className="absolute w-1.5 h-1.5 rotate-45 border border-dusty-rose/70 bg-pearl" />
        </div>

        {/* Supporting Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 max-w-2xl mx-auto"
        >
          <p className="text-base sm:text-xl md:text-2xl font-serif italic leading-relaxed text-shadow/90 font-normal">
            "True refinement does not clamor for attention. It commands through quiet presence and enduring depth."
          </p>
          <p className="text-xs sm:text-sm font-sans font-light leading-relaxed max-w-xl mx-auto text-shadow/75">
            Founded in 2024, FUME crafts every fragrance with exceptional concentration. Formulated to bond with epidermal warmth, our noble woods and balsamic resins mature into an indelible personal signature that stays with you all day and into the night.
          </p>
        </motion.div>

        {/* Restrained Architectural Pillars in Frosted Vitrines with Staggered Entrance */}
        <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 luxury-glass-card border border-shadow/[0.08] space-y-2.5 shadow-[0_12px_28px_-10px_rgba(10,10,10,0.04)] hover:-translate-y-1.5 transition-all duration-400 group"
          >
            <span className="font-serif text-2xl sm:text-3xl text-dusty-rose font-normal block group-hover:scale-105 transition-transform duration-300">
              LONGEVITY
            </span>
            <span className="text-[9.5px] uppercase tracking-[0.28em] font-sans block text-shadow/70 font-medium">
              All-Day Skin Presence
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 luxury-glass-card border border-shadow/[0.08] space-y-2.5 shadow-[0_12px_28px_-10px_rgba(10,10,10,0.04)] hover:-translate-y-1.5 transition-all duration-400 group"
          >
            <span className="font-serif text-2xl sm:text-3xl text-dusty-rose font-normal block group-hover:scale-105 transition-transform duration-300">
              PURITY
            </span>
            <span className="text-[9.5px] uppercase tracking-[0.28em] font-sans block text-shadow/70 font-medium">
              High Potency Oils
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 luxury-glass-card border border-shadow/[0.08] space-y-2.5 shadow-[0_12px_28px_-10px_rgba(10,10,10,0.04)] hover:-translate-y-1.5 transition-all duration-400 group"
          >
            <span className="font-serif text-2xl sm:text-3xl text-dusty-rose font-normal block group-hover:scale-105 transition-transform duration-300">
              HERITAGE
            </span>
            <span className="text-[9.5px] uppercase tracking-[0.28em] font-sans block text-shadow/70 font-medium">
              Hand-Poured Since 2024
            </span>
          </motion.div>
        </div>

        {/* Footer Monogram Note */}
        <div className="pt-6">
          <p className="text-[8.5px] uppercase tracking-[0.35em] font-sans text-shadow/40">
            EST. 2024 &bull; KARACHI, PAKISTAN &bull; ARCHIVAL RELEASE
          </p>
        </div>
      </div>
    </section>
  );
};
