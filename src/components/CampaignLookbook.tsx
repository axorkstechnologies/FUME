import React from 'react';
import { motion } from 'motion/react';

export const CampaignLookbook: React.FC = () => {
  return (
    <section className="relative w-full py-28 md:py-44 bg-pearl border-y border-shadow/[0.06] overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 space-y-28">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-4 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-shadow/10 bg-white/70 backdrop-blur-sm text-[9px] uppercase tracking-[0.4em] text-dusty-rose font-sans font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A59A]" />
            <span>EDITORIAL VISUAL ARCHIVE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal uppercase tracking-[0.16em] text-shadow leading-tight">
            THE CAMPAIGNS
          </h2>
          <p className="text-xs sm:text-sm font-sans font-normal tracking-wide text-shadow/70 max-w-md mx-auto leading-relaxed">
            Cinematic visual chapters capturing the raw poetry and regal depth of FUME creations.
          </p>
        </motion.div>

        {/* Desert Collection Campaign Diptych */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-shadow/[0.08] pb-3 text-[10px] uppercase tracking-[0.3em] font-sans text-dusty-rose font-medium">
            <span className="flex items-center gap-2">
              <span className="font-serif italic font-normal text-shadow/60">I.</span>
              <span>CHAPTER I — DESERT ENIGMA</span>
            </span>
            <span className="text-shadow/50 hidden sm:inline">AMBER &bull; SMOKED SANDALWOOD</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex items-center justify-center p-6 sm:p-10 bg-oyster/70 crystal-vitrine border border-shadow/[0.08] shadow-[0_18px_40px_-12px_rgba(10,10,10,0.06)] group hover:-translate-y-1.5 transition-all duration-500"
            >
              <div className="overflow-hidden w-full h-full flex items-center justify-center">
                <img 
                  src="/campaigns/desert-girl.jpg" 
                  alt="Desert Campaign Storyline"
                  className="w-full h-auto max-h-[75vh] object-contain transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex items-center justify-center p-6 sm:p-10 bg-oyster/70 crystal-vitrine border border-shadow/[0.08] shadow-[0_18px_40px_-12px_rgba(10,10,10,0.06)] group hover:-translate-y-1.5 transition-all duration-500"
            >
              <div className="overflow-hidden w-full h-full flex items-center justify-center">
                <img 
                  src="/campaigns/desert-man.jpg" 
                  alt="Desert Collection Detail"
                  className="w-full h-auto max-h-[75vh] object-contain transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Centered Ornamental Diptych Break */}
        <div className="relative flex items-center justify-center origin-center w-full py-2">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-shadow/15 to-transparent" />
          <div className="absolute px-4 bg-pearl flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-dusty-rose/40" />
            <div className="w-1.5 h-1.5 rotate-45 border border-dusty-rose/60 bg-pearl" />
            <span className="w-1 h-1 rounded-full bg-dusty-rose/40" />
          </div>
        </div>

        {/* Arab Collection Campaign Diptych */}
        <div className="space-y-8 pt-2">
          <div className="flex items-center justify-between border-b border-shadow/[0.08] pb-3 text-[10px] uppercase tracking-[0.3em] font-sans text-dusty-rose font-medium">
            <span className="flex items-center gap-2">
              <span className="font-serif italic font-normal text-shadow/60">II.</span>
              <span>CHAPTER II — SULTANATE OF ARAB</span>
            </span>
            <span className="text-shadow/50 hidden sm:inline">NOBLE OUD &bull; SPICY SAFFRON</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex items-center justify-center p-6 sm:p-10 bg-oyster/70 crystal-vitrine border border-shadow/[0.08] shadow-[0_18px_40px_-12px_rgba(10,10,10,0.06)] group hover:-translate-y-1.5 transition-all duration-500 md:order-last"
            >
              <div className="overflow-hidden w-full h-full flex items-center justify-center">
                <img 
                  src="/campaigns/arab-girl-bg.jpg" 
                  alt="Arab Collection Inspiration"
                  className="w-full h-auto max-h-[75vh] object-contain transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex items-center justify-center p-6 sm:p-10 bg-oyster/70 crystal-vitrine border border-shadow/[0.08] shadow-[0_18px_40px_-12px_rgba(10,10,10,0.06)] group hover:-translate-y-1.5 transition-all duration-500"
            >
              <div className="overflow-hidden w-full h-full flex items-center justify-center">
                <img 
                  src="/campaigns/arab-man.jpg" 
                  alt="Arab Collection Flacon"
                  className="w-full h-auto max-h-[75vh] object-contain transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};
