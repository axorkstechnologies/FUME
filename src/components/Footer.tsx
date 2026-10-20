import React, { useState } from 'react';
import { ScreenView, ThemeMode } from '../types';

interface FooterProps {
  onNavigate: (view: ScreenView) => void;
  onOpenContact: () => void;
  onOpenStory: () => void;
  themeMode?: ThemeMode;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenContact
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3500);
      setEmail('');
    }
  };

  return (
    <footer className="relative w-full bg-shadow text-pearl py-24 px-6 sm:px-8 md:px-12 lg:px-16 border-t border-white/[0.08]">
      <div className="max-w-[1500px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.45em] font-semibold text-[#D4A59A] block">
                HAUTE PARFUMERIE
              </span>
              <h3 className="font-serif text-2xl uppercase tracking-[0.16em] text-pearl">
                FUME
              </h3>
            </div>
            <div className="space-y-2 text-xs uppercase tracking-[0.25em] font-sans text-pearl/70 font-light leading-relaxed">
              <p>INDEPENDENT FRAGRANCE MAISON</p>
              <p>ARCHIVE EST. 2024</p>
              <p>KARACHI, PAKISTAN</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-semibold text-pearl/50">EXPLORE</h4>
            <ul className="space-y-3.5">
              <li>
                <a href="#perfumes" onClick={(e) => { e.preventDefault(); onNavigate('perfumes'); }} className="text-xs uppercase tracking-[0.22em] font-sans text-pearl/80 hover:text-pearl transition-colors duration-300">
                  ALL PERFUMES
                </a>
              </li>
              <li>
                <a href="#collections" onClick={(e) => { e.preventDefault(); onNavigate('collections'); }} className="text-xs uppercase tracking-[0.22em] font-sans text-pearl/80 hover:text-pearl transition-colors duration-300">
                  HAUTE COLLECTIONS
                </a>
              </li>
              <li>
                <a href="#story" onClick={(e) => { e.preventDefault(); onNavigate('story'); }} className="text-xs uppercase tracking-[0.22em] font-sans text-pearl/80 hover:text-pearl transition-colors duration-300">
                  OUR CREED & STORY
                </a>
              </li>
            </ul>
          </div>

          {/* Client Care */}
          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-semibold text-pearl/50">CLIENT CARE</h4>
            <ul className="space-y-3.5">
              <li>
                <a href="#care" onClick={(e) => { e.preventDefault(); onNavigate('care'); }} className="text-xs uppercase tracking-[0.22em] font-sans text-pearl/80 hover:text-pearl transition-colors duration-300">
                  SHIPPING & 2ML GUARANTEE
                </a>
              </li>
              <li>
                <button onClick={onOpenContact} className="text-xs uppercase tracking-[0.22em] font-sans text-pearl/80 hover:text-pearl transition-colors duration-300 cursor-pointer">
                  CONCIERGE & BESPOKE
                </button>
              </li>
              <li>
                <a href="https://wa.me/923281825636" target="_blank" rel="noreferrer" className="text-xs uppercase tracking-[0.22em] font-sans text-pearl/80 hover:text-pearl transition-colors duration-300">
                  WHATSAPP: +92 328 182 5636
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Private Allocations */}
          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-semibold text-pearl/50">PRIVATE ALLOCATIONS</h4>
            <p className="text-xs font-sans font-light tracking-widest text-pearl/70 leading-relaxed uppercase">
              Join our register for bespoke flacon releases and private atelier compounding.
            </p>
            {subscribed ? (
              <div className="p-3 bg-white/10 border border-white/20 text-xs font-sans tracking-[0.25em] text-[#D4A59A] uppercase">
                Registry Confirmed.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="PATRON EMAIL ADDRESS"
                  aria-label="Email address for newsletter"
                  className="bg-white/[0.06] border border-white/20 px-3.5 py-3 text-xs font-sans tracking-widest text-pearl focus:outline-none focus:border-[#D4A59A] transition-colors rounded-none placeholder:text-pearl/30 uppercase"
                />
                <button
                  type="submit"
                  className="py-3 px-6 text-[9px] uppercase tracking-[0.3em] font-sans font-semibold bg-pearl text-shadow hover:bg-white active:scale-[0.99] transition-all cursor-pointer"
                >
                  REQUEST ACCESS
                </button>
              </form>
            )}
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-[9px] uppercase tracking-[0.3em] font-sans text-pearl/50">
          <p>&copy; {new Date().getFullYear()} FUME FRAGRANCES (SMC-PRIVATE) LIMITED. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <span className="text-pearl/40">22–28% EXTRAIT DE PARFUM</span>
            <span className="text-pearl/40">&bull;</span>
            <span className="text-pearl/40">NATIONWIDE CASH ON DELIVERY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
