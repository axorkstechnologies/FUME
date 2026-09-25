import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeMode } from '../types';
import { ChevronDown, ShieldCheck, Truck, RefreshCw, HelpCircle, ArrowRight } from 'lucide-react';

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
      category: 'PERFORMANCE & LONGEVITY',
      question: 'HOW LONG DOES FUME PERFUME LAST ON SKIN AND TEXTILES?',
      answer:
        'FUME Eau de Parfum creations are formulated with an uncompromised 22% to 28% pure perfume oil concentration. In real-world wear tests across Pakistan, our scents consistently deliver 12 to 16+ hours of active skin persistence and up to 24 hours on garments, remaining distinct and elegant even in warm summer climates.',
      highlight: '12 to 16+ hours verified skin persistence in warm climates.'
    },
    {
      category: 'AUTHENTICITY & ORIGIN',
      question: 'WHERE IS FUME FORMULATED AND MANUFACTURED?',
      answer:
        'FUME combines European haute parfumerie standards with Pakistani artisanal precision. We source our botanical distillates, resinous absolutes, and floral essences from Grasse, France. Compounding, 45-day cool cellar maceration, and hand-pouring in heavy architectural flint glass flacons take place in our laboratory in Pakistan.',
      highlight: 'Formulated with Grasse distillates, hand-poured in Pakistan.'
    },
    {
      category: 'SHIPPING & DISPATCH',
      question: 'IS CASH ON DELIVERY (COD) AVAILABLE ACROSS PAKISTAN?',
      answer:
        'Yes. We provide nationwide Cash on Delivery (COD) to all cities across Pakistan, including Karachi, Lahore, Islamabad, Rawalpindi, Peshawar, Multan, and Faisalabad. Orders placed before 15h00 PKT are dispatched the same day via premier tracked air and road couriers, reaching major cities within 2 to 3 business days.',
      highlight: 'Nationwide Cash on Delivery with delivery in 2 to 3 business days.'
    },
    {
      category: 'DISCOVERY GUARANTEE',
      question: 'HOW DOES THE COMPLIMENTARY 2ML DISCOVERY VIAL WORK?',
      answer:
        'Every full 50ml or 100ml FUME flacon arrives accompanied by an individual 2ml matching sample vial positioned outside the sealed presentation box. We invite you to spritz and wear the 2ml sample for several days to witness how its top, heart, and base notes harmonize with your unique skin chemistry. If it is not your signature scent, simply return the unopened, sealed full flacon for a complete refund. Return shipping is entirely complimentary.',
      highlight: 'Test risk-free before opening the master presentation flacon.'
    },
    {
      category: 'SCENT RECOMMENDATION',
      question: 'WHICH FUME PERFUME IS BEST FOR DAILY WEAR OR SPECIAL OCCASIONS?',
      answer:
        'For fresh daily wear and professional environments, BLOOM (night jasmine and tuberose), AQUA (marine citrus), and MY WAY (champagne orange blossom) are clean, luminous choices. For evenings, formal gatherings, and cooler evenings, DESERT (smoky amber and sandalwood), ARAB (noble oud and saffron), and BOMB (Tuscan leather) provide unforgettable projection.',
      highlight: 'Curated recommendations for work, warm days, and festive evenings.'
    },
    {
      category: 'RETURNS & EXCHANGES',
      question: 'WHAT IS THE FUME RETURN AND EXCHANGE PROTOCOL?',
      answer:
        'We offer a 30-day return window from the day your delivery is signed for. To be eligible for a refund or exchange, the master 50ml or 100ml flacon must remain sealed in its original cellophane wrap and outer embossed carton with tamper seals intact. You are welcome to keep the 2ml discovery vial regardless. Simply contact our concierge on WhatsApp to arrange doorstep courier pickup.',
      highlight: '30 days, zero return fees, courier doorstep pickup.'
    },
    {
      category: 'PURITY & SAFETY',
      question: 'ARE FUME PERFUMES CRUELTY-FREE AND SAFE FOR SENSITIVE SKIN?',
      answer:
        'FUME is 100% cruelty-free and certified IFRA-compliant. We never test on animals. Our formulations utilize cosmetic-grade organic sugarcane alcohol and pure botanical absolutes, strictly omitting harsh phthalates, synthetic propellants, or toxic fillers.',
      highlight: '100% cruelty-free, IFRA-compliant, and hypoallergenic standards.'
    }
  ];

  const categories = ['ALL', 'PERFORMANCE & LONGEVITY', 'SHIPPING & DISPATCH', 'DISCOVERY GUARANTEE', 'SCENT RECOMMENDATION', 'AUTHENTICITY & ORIGIN'];

  const filteredFaqs = activeCategory === 'ALL'
    ? faqs
    : faqs.filter((f) => f.category === activeCategory);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div
      className="relative w-full min-h-screen pt-32 pb-32 px-6 md:px-12 lg:px-16 bg-pearl text-shadow"
    >
      <div className="max-w-[1400px] mx-auto space-y-20">
        {/* Page Header with Breadcrumb */}
        <div className="text-center space-y-5 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.4em] text-dusty-rose font-sans font-medium">
            <span>HOME</span>
            <span>/</span>
            <span>CUSTOMER CARE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-dusty-rose ml-1" />
            <span>DIRECTIVES</span>
          </div>

          <h1
            className={`font-serif text-4xl sm:text-5xl md:text-6xl font-normal uppercase tracking-[0.16em] ${
              'text-shadow'
            }`}
          >
            CLIENT CARE & FAQS
          </h1>

          <p
            className={`text-sm sm:text-base font-sans font-light tracking-wide leading-relaxed ${
              'text-shadow/60'
            }`}
          >
            Detailed protocols on the 2ml Discovery Guarantee, global carbon-neutral shipping, flacon conservation, and authenticity verification.
          </p>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className={`p-8 border rounded-xs space-y-3 ${
              'border-sand bg-white'
            }`}
          >
            <ShieldCheck className="w-8 h-8 text-dusty-rose" />
            <h3
              className={`font-serif text-lg uppercase tracking-wider ${
                'text-shadow'
              }`}
            >
              THE DISCOVERY GUARANTEE
            </h3>
            <p
              className={`text-xs font-sans font-light leading-relaxed ${
                'text-shadow/60'
              }`}
            >
              Every bottle includes a companion 2ml sample. Test before unwrapping the sealed flacon. Return free if unsuited.
            </p>
          </div>

          <div
            className={`p-8 border rounded-xs space-y-3 ${
              'border-sand bg-white'
            }`}
          >
            <Truck className="w-8 h-8 text-dusty-rose" />
            <h3
              className={`font-serif text-lg uppercase tracking-wider ${
                'text-shadow'
              }`}
            >
              WHITE-GLOVE DISPATCH
            </h3>
            <p
              className={`text-xs font-sans font-light leading-relaxed ${
                'text-shadow/60'
              }`}
            >
              Complimentary temperature-controlled international courier delivery with real-time GPS tracking.
            </p>
          </div>

          <div
            className={`p-8 border rounded-xs space-y-3 ${
              'border-sand bg-white'
            }`}
          >
            <RefreshCw className="w-8 h-8 text-dusty-rose" />
            <h3
              className={`font-serif text-lg uppercase tracking-wider ${
                'text-shadow'
              }`}
            >
              ARCHIVAL REFILLS
            </h3>
            <p
              className={`text-xs font-sans font-light leading-relaxed ${
                'text-shadow/60'
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
                  ? 'bg-oyster text-pearl border-shadow/10'
                  : 'bg-white border-sand text-shadow/60 hover:border-dusty-rose hover:text-shadow'
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
                  isOpen
                    ? 'border-dusty-rose bg-white shadow-sm'
                    : 'border-sand bg-white/70 hover:border-dusty-rose/60'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-widest text-dusty-rose font-sans font-medium block">
                      {faq.category}
                    </span>
                    <h4
                      className={`font-serif text-base sm:text-lg uppercase tracking-wider ${
                        'text-shadow'
                      }`}
                    >
                      {faq.question}
                    </h4>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-dusty-rose shrink-0 transition-transform duration-300 ${
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
                          'border-shadow/10 text-shadow/60'
                        }`}
                      >
                        <p>{faq.answer}</p>
                        {faq.highlight && (
                          <div className="p-3 border-l-2 border-dusty-rose bg-dusty-rose/10 text-dusty-rose text-[11px] font-medium font-sans">
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
            'border-sand bg-pearl/70'
          }`}
        >
          <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.35em] text-dusty-rose font-sans font-medium">
            <HelpCircle className="w-4 h-4 text-dusty-rose" />
            <span>UNRESOLVED INQUIRIES</span>
          </div>

          <h3
            className={`font-serif text-2xl sm:text-3xl uppercase tracking-wider ${
              'text-shadow'
            }`}
          >
            REQUIRE BESPOKE ASSISTANCE?
          </h3>

          <p
            className={`text-xs sm:text-sm font-sans font-light max-w-lg mx-auto leading-relaxed ${
              'text-shadow/60'
            }`}
          >
            Our dedicated client concierge is available daily for private orders, customized bridal flacons, and batch lookups.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-1 text-xs font-sans">
            <a
              href="mailto:jiaaryan20@gmail.com"
              className="text-dusty-rose hover:underline"
            >
              jiaaryan20@gmail.com
            </a>
            <span className="text-shadow/60">•</span>
            <a
              href="tel:+923132970468"
              className="text-dusty-rose hover:underline"
            >
              +92 313 297 0468
            </a>
            <span className="text-shadow/60">•</span>
            <a
              href="https://wa.me/923132970468?text=Hello%20FUME%20Concierge"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dusty-rose hover:underline"
            >
              WhatsApp (+92 313 297 0468)
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onNavigateToContact}
              className="px-8 py-3.5 bg-oyster text-pearl hover:bg-dusty-rose hover:text-shadow transition-colors uppercase tracking-[0.25em] text-[11px] font-sans font-medium cursor-pointer rounded-xs"
            >
              CONTACT CONCIERGE
            </button>
            <a
              href="https://wa.me/923132970468?text=Hello%20FUME%20Concierge"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 border border-dusty-rose text-shadow hover:bg-white transition-colors uppercase tracking-[0.25em] text-[11px] font-sans font-medium cursor-pointer rounded-xs"
            >
              CHAT ON WHATSAPP
            </a>
          </div>
        </div>
      </div>

      {/* Structured Data: FAQPage JSON-LD for Search & AI Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(f => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: f.answer
              }
            }))
          })
        }}
      />
    </div>
  );
};

