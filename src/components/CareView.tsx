import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeMode } from '../types';
import { ChevronDown, ShieldCheck, Truck, RefreshCw, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';

interface CareViewProps {
  onNavigateToContact: () => void;
  onShopPerfumes: () => void;
  themeMode: ThemeMode;
}

interface FaqItem {
  question: string;
  category: string;
  answer: string;
  highlight?: string;
}

export const CareView: React.FC<CareViewProps> = ({
  onNavigateToContact,
  onShopPerfumes,
  themeMode
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const isLight = themeMode === 'light';

  const faqs: FaqItem[] = [
    {
      category: 'DISCOVERY GUARANTEE',
      question: 'HOW DOES THE COMPLIMENTARY 2ML DISCOVERY VIAL WORK?',
      answer:
        'Every full 50ml or 100ml FUME flacon arrives accompanied by an individual 2ml matching sample vial positioned outside the sealed presentation box. We invite you to spritz and wear the 2ml sample for several days to witness how its top, heart, and base notes harmonize with your unique skin chemistry. If it is not your signature scent, simply return the unopened, sealed full flacon for a complete refund. Return shipping is entirely complimentary.',
      highlight: 'Test risk-free before opening the master presentation flacon.'
    },
    {
      category: 'SHIPPING & DISPATCH',
      question: 'WHAT ARE YOUR SHIPPING TIMELINES AND GLOBAL DESTINATIONS?',
      answer:
        'All orders are fulfilled through carbon-neutral air couriers directly from our central depot in France. Orders placed prior to 14h00 CET are dispatched the same business day. Delivery across the European Union and the United Kingdom takes 1–3 business days. Delivery to North America, Asia-Pacific, and the Middle East takes 2–4 business days via DHL Express Haute Couture service with temperature-regulated transit.',
      highlight: 'Complimentary worldwide express shipping on all orders.'
    },
    {
      category: 'RETURNS & EXCHANGES',
      question: 'WHAT IS THE FUME RETURN AND EXCHANGE PROTOCOL?',
      answer:
        'We offer a 30-day return window from the day your delivery is signed for. To be eligible for a refund or exchange, the master 50ml or 100ml flacon must remain sealed in its original cellophane wrap and outer embossed carton with tamper seals intact. You are welcome to keep the 2ml discovery vial regardless. Simply contact our concierge to generate an insured prepaid courier collection label.',
      highlight: '30 days, zero return fees, courier doorstep pickup.'
    },
    {
      category: 'BOTTLE CARE',
      question: 'HOW SHOULD I STORE MY FLACON TO MAINTAIN ITS 14-HOUR LONGEVITY?',
      answer:
        'Our formulas contain elevated percentages of pure botanical absolutes and noble resins. To preserve their delicate olfactory pyramid, store your flacon in a dry, temperate space (between 15°C and 22°C / 59°F and 72°F) away from direct sunlight and bathroom humidity. Always reseat the heavy obsidian cap firmly to prevent evaporation of the volatile top notes.',
      highlight: 'Keep away from UV radiation and rapid temperature fluctuations.'
    },
    {
      category: 'AUTHENTICITY',
      question: 'HOW DO I VERIFY THE AUTHENTICITY AND BATCH NUMBER OF MY BOTTLE?',
      answer:
        'Every authentic FUME flacon is laser-etched with a unique 6-digit alphanumeric archival batch code along the base edge of the glass. This exact code corresponds to the hot-stamped certificate of authenticity enclosed in your velvet presentation coffret. You can input this code with our Concierge to view the exact harvest date, maceration cellar, and master perfumer inspection log.',
      highlight: 'Individual laser-etched batch codes on every flacon.'
    },
    {
      category: 'BESPOKE & ENGRAVING',
      question: 'CAN I COMMISSION BESPOKE FLACON ENGRAVING OR MONOGRAMS?',
      answer:
        'Yes. We offer diamond-drag hand calligraphy engraving on the back facet of our 50ml and 100ml flacons. You may request up to three initials or a milestone date (e.g. "EST. 2024"). Bespoke engraved bottles are finalized in our Paris workshop and dispatched within 48 hours.',
      highlight: 'Complimentary custom engraving available upon request.'
    }
  ];

  const categories = ['ALL', 'DISCOVERY GUARANTEE', 'SHIPPING & DISPATCH', 'RETURNS & EXCHANGES', 'BOTTLE CARE', 'AUTHENTICITY'];

  const filteredFaqs = activeCategory === 'ALL'
    ? faqs
    : faqs.filter((f) => f.category === activeCategory);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div
      className={`relative w-full min-h-screen pt-32 pb-32 px-6 md:px-12 lg:px-16 transition-colors duration-500 ${
        isLight ? 'bg-[#FAF8F5] text-[#1A1816]' : 'bg-[#0a0a0a] text-[#f5f4f0]'
      }`}
    >
      <div className="max-w-[1400px] mx-auto space-y-20">
        {/* Page Header with Breadcrumb */}
        <div className="text-center space-y-5 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.4em] text-[#C5A059] font-sans font-medium">
            <span>HOME</span>
            <span>/</span>
            <span>CUSTOMER CARE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] ml-1" />
            <span>DIRECTIVES</span>
          </div>

          <h1
            className={`font-serif text-4xl sm:text-5xl md:text-6xl font-normal uppercase tracking-[0.16em] ${
              isLight ? 'text-[#1A1816]' : 'text-white'
            }`}
          >
            CLIENT CARE & FAQS
          </h1>

          <p
            className={`text-sm sm:text-base font-sans font-light tracking-wide leading-relaxed ${
              isLight ? 'text-[#6B6357]' : 'text-[#a9a7a1]'
            }`}
          >
            Detailed protocols on the 2ml Discovery Guarantee, global carbon-neutral shipping, flacon conservation, and authenticity verification.
          </p>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className={`p-8 border rounded-xs space-y-3 ${
              isLight ? 'border-[#E6DDD0] bg-white' : 'border-[#222222] bg-[#0f0f0f]'
            }`}
          >
            <ShieldCheck className="w-8 h-8 text-[#C5A059]" />
            <h3
              className={`font-serif text-lg uppercase tracking-wider ${
                isLight ? 'text-[#1A1816]' : 'text-white'
              }`}
            >
              THE DISCOVERY GUARANTEE
            </h3>
            <p
              className={`text-xs font-sans font-light leading-relaxed ${
                isLight ? 'text-[#6B6357]' : 'text-[#8c8985]'
              }`}
            >
              Every bottle includes a companion 2ml sample. Test before unwrapping the sealed flacon. Return free if unsuited.
            </p>
          </div>

          <div
            className={`p-8 border rounded-xs space-y-3 ${
              isLight ? 'border-[#E6DDD0] bg-white' : 'border-[#222222] bg-[#0f0f0f]'
            }`}
          >
            <Truck className="w-8 h-8 text-[#C5A059]" />
            <h3
              className={`font-serif text-lg uppercase tracking-wider ${
                isLight ? 'text-[#1A1816]' : 'text-white'
              }`}
            >
              WHITE-GLOVE DISPATCH
            </h3>
            <p
              className={`text-xs font-sans font-light leading-relaxed ${
                isLight ? 'text-[#6B6357]' : 'text-[#8c8985]'
              }`}
            >
              Complimentary temperature-controlled international courier delivery with real-time GPS tracking.
            </p>
          </div>

          <div
            className={`p-8 border rounded-xs space-y-3 ${
              isLight ? 'border-[#E6DDD0] bg-white' : 'border-[#222222] bg-[#0f0f0f]'
            }`}
          >
            <RefreshCw className="w-8 h-8 text-[#C5A059]" />
            <h3
              className={`font-serif text-lg uppercase tracking-wider ${
                isLight ? 'text-[#1A1816]' : 'text-white'
              }`}
            >
              ARCHIVAL REFILLS
            </h3>
            <p
              className={`text-xs font-sans font-light leading-relaxed ${
                isLight ? 'text-[#6B6357]' : 'text-[#8c8985]'
              }`}
            >
              Bring your empty flint glass flacon to any FUME atelier for a circular botanical refill at 25% privilege.
            </p>
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(0);
              }}
              className={`px-4 py-2 text-[10px] uppercase tracking-widest font-sans rounded-xs transition-colors cursor-pointer border ${
                activeCategory === cat
                  ? isLight
                    ? 'bg-[#1A1816] text-[#FAF8F5] border-[#1A1816]'
                    : 'bg-white text-black border-white'
                  : isLight
                  ? 'bg-white border-[#E6DDD0] text-[#7D766E] hover:border-[#C5A059] hover:text-[#1A1816]'
                  : 'bg-[#121212] border-[#222222] text-[#8c8985] hover:border-[#444444] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion FAQ List */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`border rounded-xs transition-all overflow-hidden ${
                  isLight
                    ? isOpen
                      ? 'border-[#C5A059] bg-white shadow-sm'
                      : 'border-[#E6DDD0] bg-white/70 hover:border-[#C5A059]/60'
                    : isOpen
                    ? 'border-[#C5A059] bg-[#111111]'
                    : 'border-[#1f1f1f] bg-[#0c0c0c] hover:border-[#333333]'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-widest text-[#C5A059] font-sans font-medium block">
                      {faq.category}
                    </span>
                    <h4
                      className={`font-serif text-base sm:text-lg uppercase tracking-wider ${
                        isLight ? 'text-[#1A1816]' : 'text-white'
                      }`}
                    >
                      {faq.question}
                    </h4>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#C5A059] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div
                        className={`px-6 pb-6 pt-2 border-t space-y-3 text-xs sm:text-sm font-sans font-light leading-relaxed ${
                          isLight
                            ? 'border-[#FAF5EE] text-[#5C5449]'
                            : 'border-[#1a1a1a] text-[#a9a7a1]'
                        }`}
                      >
                        <p>{faq.answer}</p>
                        {faq.highlight && (
                          <div className="p-3 border-l-2 border-[#C5A059] bg-[#C5A059]/10 text-[#C5A059] text-[11px] font-medium font-sans">
                            {faq.highlight}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Contact Concierge Box */}
        <div
          className={`border p-8 sm:p-12 text-center rounded-xs space-y-5 max-w-3xl mx-auto ${
            isLight
              ? 'border-[#E6DDD0] bg-[#F5F1E8]/70'
              : 'border-[#222222] bg-[#0e0e0e]'
          }`}
        >
          <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.35em] text-[#C5A059] font-sans font-medium">
            <HelpCircle className="w-4 h-4 text-[#C5A059]" />
            <span>UNRESOLVED INQUIRIES</span>
          </div>

          <h3
            className={`font-serif text-2xl sm:text-3xl uppercase tracking-wider ${
              isLight ? 'text-[#1A1816]' : 'text-white'
            }`}
          >
            REQUIRE BESPOKE ASSISTANCE?
          </h3>

          <p
            className={`text-xs sm:text-sm font-sans font-light max-w-lg mx-auto leading-relaxed ${
              isLight ? 'text-[#6B6357]' : 'text-[#8c8985]'
            }`}
          >
            Our dedicated client concierge is available daily for private orders, customized bridal flacons, and batch lookups.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onNavigateToContact}
              className="px-8 py-3.5 bg-[#1A1816] text-[#FAF8F5] hover:bg-[#C5A059] hover:text-black transition-colors uppercase tracking-[0.25em] text-[11px] font-sans font-medium cursor-pointer"
            >
              CONTACT CONCIERGE
            </button>
            <button
              onClick={onShopPerfumes}
              className={`px-8 py-3.5 border transition-colors uppercase tracking-[0.25em] text-[11px] font-sans font-medium cursor-pointer ${
                isLight
                  ? 'border-[#C5A059] text-[#1A1816] hover:bg-white'
                  : 'border-[#C5A059] text-white hover:bg-white/5'
              }`}
            >
              VIEW COLLECTION
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
