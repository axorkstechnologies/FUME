import React from 'react';
import { ShieldCheck, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  scent: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Hamza K.',
    location: 'Karachi (Clifton)',
    scent: 'DESERT Eau de Parfum',
    rating: 5,
    date: 'August 2026',
    comment: 'First spray in the morning before work. The amber and smoky sandalwood projection is unbelievable in Karachi heat. Still caught wafts at 9 PM. The heavy glass flacon and packaging is pure luxury.',
    verified: true
  },
  {
    id: 't2',
    name: 'Areeba M.',
    location: 'Lahore (Gulberg)',
    scent: 'BLOOM Eau de Parfum',
    rating: 5,
    date: 'August 2026',
    comment: 'Wore it to an outdoor evening wedding in Lahore. The night jasmine and tuberose are so refined without being synthetic or headache-inducing. Three people asked me what I was wearing.',
    verified: true
  },
  {
    id: 't3',
    name: 'Zainab H.',
    location: 'Islamabad (F-7)',
    scent: 'ARAB Eau de Parfum',
    rating: 5,
    date: 'July 2026',
    comment: 'The 2ml tester vial outside the box is a genius touch. I tested it on my skin for two days before breaking the main seal. The rich oud and saffron notes are masterclass. Will be ordering my second bottle.',
    verified: true
  },
  {
    id: 't4',
    name: 'Danyal S.',
    location: 'Peshawar',
    scent: 'BLEU Eau de Parfum',
    rating: 5,
    date: 'August 2026',
    comment: 'Cash on delivery arrived within 48 hours. Crisp bergamot and sacred frankincense depth. Beats my Rs 40,000 designer bottles in longevity by far. FUME is legit.',
    verified: true
  }
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section aria-labelledby="testimonials-heading" className="w-full py-16 sm:py-20 bg-pearl border-t border-shadow/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.35em] text-dusty-rose font-sans font-medium">
              Verified Client Stories
            </span>
          </div>
          <h2 id="testimonials-heading" className="font-serif text-3xl sm:text-4xl uppercase tracking-[0.14em] text-shadow font-normal">
            Voices of Sillage
          </h2>
          <p className="text-xs sm:text-sm font-sans text-shadow/60 leading-relaxed">
            Real experiences from fragrance collectors across Karachi, Lahore, Islamabad, and nationwide.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 sm:p-7 bg-shadow/5/80 backdrop-blur-sm border border-shadow/[0.06] rounded-xs space-y-4 flex flex-col justify-between hover:border-dusty-rose/40 transition-colors shadow-[0_4px_24px_rgba(44,37,34,0.3)]"
            >
              <div className="space-y-3">
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-dusty-rose">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  {t.verified && (
                    <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider text-shadow/60 font-sans">
                      <ShieldCheck className="w-3 h-3 text-dusty-rose" />
                      Verified
                    </span>
                  )}
                </div>

                {/* Scent Worn */}
                <span className="text-[10px] uppercase tracking-[0.2em] text-dusty-rose font-sans font-medium block">
                  {t.scent}
                </span>

                {/* Comment */}
                <p className="text-xs sm:text-sm font-sans font-light leading-relaxed text-shadow/60 italic">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-shadow/[0.08] flex items-center justify-between text-[10px] uppercase tracking-wider font-sans">
                <span className="font-medium text-shadow">{t.name}</span>
                <span className="text-shadow/60">{t.location}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Aggregate Trust Bar */}
        <div className="p-6 bg-shadow/5/60 border border-shadow/[0.06] rounded-xs flex flex-wrap items-center justify-around gap-6 text-center">
          <div className="space-y-0.5">
            <span className="font-serif text-2xl text-dusty-rose font-medium block">4.9 / 5.0</span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-shadow/60 font-sans block">Aggregate Buyer Rating</span>
          </div>
          <div className="w-[1px] h-8 bg-pearl/[0.08] hidden sm:block" />
          <div className="space-y-0.5">
            <span className="font-serif text-2xl text-dusty-rose font-medium block">14+ Hours</span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-shadow/60 font-sans block">Verified Skin Persistence</span>
          </div>
          <div className="w-[1px] h-8 bg-pearl/[0.08] hidden sm:block" />
          <div className="space-y-0.5">
            <span className="font-serif text-2xl text-dusty-rose font-medium block">100% Free</span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-shadow/60 font-sans block">2ml Risk-Free Tester With Every Flacon</span>
          </div>
        </div>
      </div>
    </section>
  );
};

