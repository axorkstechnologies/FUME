import React from 'react';
import { motion } from 'motion/react';

interface CustomScentAtelierProps {
  onOpenContact: () => void;
}

export const CustomScentAtelier: React.FC<CustomScentAtelierProps> = ({ onOpenContact }) => {
  const handleWhatsAppCustom = () => {
    const msg = encodeURIComponent(
      "Hello FUME! I'd like to create a custom fragrance. Please guide me through the process."
    );
    window.open(`https://wa.me/923281825636?text=${msg}`, '_blank');
  };

  const handleDescribeScent = () => {
    const msg = encodeURIComponent(
      "Hello FUME! I have a scent idea in mind and I'd like to describe it to your perfumer."
    );
    window.open(`https://wa.me/923281825636?text=${msg}`, '_blank');
  };

  return (
    <section className="relative w-full py-28 md:py-40 px-6 md:px-12 lg:px-16 bg-oyster overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-dusty-rose/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-dusty-rose/30 to-transparent" />

      <div className="max-w-[900px] mx-auto text-center space-y-10">
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] uppercase tracking-[0.5em] text-dusty-rose font-sans font-medium block"
        >
          BESPOKE OLFACTORY EXPERIENCE
        </motion.span>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-normal uppercase tracking-[0.14em] text-shadow leading-tight"
        >
          CREATE YOUR <br className="hidden sm:block" />
          <span className="italic font-normal text-dusty-rose">SIGNATURE</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm md:text-base font-sans font-normal tracking-wide text-shadow/80 max-w-xl mx-auto leading-relaxed"
        >
          Work with our master perfumers to compose an entirely personal fragrance. Bottled exclusively for you in a bespoke engraved flacon.
        </motion.p>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
        >
          {['Choose Your Notes', 'Expert Guidance', 'Custom Bottle', 'Personal Formula'].map((feature) => (
            <span
              key={feature}
              className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] px-4 py-2 font-sans border border-sand/60 text-shadow/80 rounded-full bg-pearl"
            >
              {feature}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <button
            onClick={handleWhatsAppCustom}
            className="w-full sm:w-auto px-10 py-4 bg-dusty-rose text-pearl text-xs uppercase tracking-[0.28em] font-sans font-semibold transition-all hover:bg-shadow hover:text-pearl active:scale-[0.97] cursor-pointer"
          >
            START YOUR CUSTOM SCENT
          </button>
          <button
            onClick={handleDescribeScent}
            className="w-full sm:w-auto px-10 py-4 bg-transparent text-shadow text-xs uppercase tracking-[0.28em] font-sans font-medium transition-all border border-sand hover:border-dusty-rose hover:text-dusty-rose active:scale-[0.97] cursor-pointer"
          >
            DESCRIBE YOUR SCENT
          </button>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] uppercase tracking-[0.3em] text-shadow/35 font-sans pt-4"
        >
          COMPLIMENTARY CONSULTATION • HANDCRAFTED IN KARACHI • FROM RS 3,500
        </motion.p>
      </div>
    </section>
  );
};
