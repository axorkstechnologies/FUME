import React, { useState } from 'react';
import { ScreenView, ThemeMode } from '../types';

interface FooterProps {
  onNavigate: (view: ScreenView) => void;
  onOpenContact: () => void;
  onOpenStory: () => void;
  themeMode: ThemeMode;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenContact,
  onOpenStory,
  themeMode
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const isLight = themeMode === 'light';

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3500);
      setEmail('');
    }
  };

  return (
    <footer
      className={`relative w-full font-sans border-t transition-colors duration-500 ${
        isLight
          ? 'bg-[#F4EFE6] text-[#635A4D] border-[#E5DAC8]'
          : 'bg-[#050505] text-[#8c8985] border-[#1a1a1a]'
      }`}
    >
      <div className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16 pt-20 pb-12 space-y-16">
        {/* Top Tier: FUME Wordmark & Minimal Newsletter */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pb-16 border-b ${
            isLight ? 'border-[#E5DAC8]' : 'border-[#141414]'
          }`}
        >
          <div className="lg:col-span-5 space-y-2">
            <div className="flex items-center gap-3">
              <span
                className={`font-serif text-3xl md:text-4xl uppercase tracking-[0.35em] block ${
                  isLight ? 'text-[#1A1816]' : 'text-[#f5f4f0]'
                }`}
              >
                FUME
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#C5A059] font-sans font-medium px-2 py-0.5 border border-[#C5A059]/40 rounded-xs">
                EST. 2024
              </span>
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#C5A059]">
              HAUTE PARFUMERIE • SCENT, REFINED.
            </p>
          </div>

          <div className="lg:col-span-7 lg:pl-10 space-y-4">
            <span
              className={`text-[10px] uppercase tracking-[0.3em] block ${
                isLight ? 'text-[#1A1816]' : 'text-[#e5e3dc]'
              }`}
            >
              NEWSLETTER
            </span>
            <p className="text-xs font-light max-w-md">
              Receive private allocations, seasonal flacon releases, and invitations to private salon appointments.
            </p>

            {subscribed ? (
              <div className="text-xs text-[#C5A059] uppercase tracking-widest pt-2">
                THANK YOU FOR SUBSCRIBING. YOUR DOSSIER HAS BEEN NOTED.
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className={`flex max-w-md border-b pb-1 ${
                  isLight ? 'border-[#7D766E]' : 'border-[#333333]'
                }`}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL..."
                  className={`bg-transparent text-xs placeholder:text-[#8C8377] focus:outline-none flex-1 uppercase tracking-wider py-2 ${
                    isLight ? 'text-[#1A1816]' : 'text-white'
                  }`}
                />
                <button
                  type="submit"
                  className={`text-[10px] uppercase tracking-[0.25em] transition-colors cursor-pointer px-3 ${
                    isLight ? 'text-[#1A1816] hover:text-[#C5A059]' : 'text-white hover:text-[#C5A059]'
                  }`}
                >
                  JOIN
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Tier: Categorized Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-xs">
          {/* SHOP */}
          <div className="space-y-4">
            <span
              className={`text-[10px] uppercase tracking-[0.28em] block font-medium ${
                isLight ? 'text-[#1A1816]' : 'text-[#f5f4f0]'
              }`}
            >
              SHOP
            </span>
            <ul className="space-y-2.5 text-[11px] tracking-wider uppercase">
              <li>
                <button
                  onClick={() => onNavigate('perfumes')}
                  className="hover:text-[#C5A059] transition-colors cursor-pointer"
                >
                  Perfumes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collections')}
                  className="hover:text-[#C5A059] transition-colors cursor-pointer"
                >
                  Collections
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('perfumes')}
                  className="hover:text-[#C5A059] transition-colors cursor-pointer"
                >
                  Best Sellers
                </button>
              </li>
            </ul>
          </div>

          {/* ABOUT */}
          <div className="space-y-4">
            <span
              className={`text-[10px] uppercase tracking-[0.28em] block font-medium ${
                isLight ? 'text-[#1A1816]' : 'text-[#f5f4f0]'
              }`}
            >
              ABOUT
            </span>
            <ul className="space-y-2.5 text-[11px] tracking-wider uppercase">
              <li>
                <button
                  onClick={() => onNavigate('story')}
                  className="hover:text-[#C5A059] transition-colors cursor-pointer"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#C5A059] transition-colors cursor-pointer"
                >
                  Contact & Concierge
                </button>
              </li>
            </ul>
          </div>

          {/* HELP */}
          <div className="space-y-4">
            <span
              className={`text-[10px] uppercase tracking-[0.28em] block font-medium ${
                isLight ? 'text-[#1A1816]' : 'text-[#f5f4f0]'
              }`}
            >
              CLIENT CARE
            </span>
            <ul className="space-y-2.5 text-[11px] tracking-wider uppercase">
              <li>
                <button
                  onClick={() => onNavigate('care')}
                  className="hover:text-[#C5A059] transition-colors cursor-pointer"
                >
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('care')}
                  className="hover:text-[#C5A059] transition-colors cursor-pointer"
                >
                  Returns & Discovery Guarantee
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('care')}
                  className="hover:text-[#C5A059] transition-colors cursor-pointer"
                >
                  Bottle Care & FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div className="space-y-4">
            <span
              className={`text-[10px] uppercase tracking-[0.28em] block font-medium ${
                isLight ? 'text-[#1A1816]' : 'text-[#f5f4f0]'
              }`}
            >
              SOCIAL
            </span>
            <ul className="space-y-2.5 text-[11px] tracking-wider uppercase">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C5A059] transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C5A059] transition-colors"
                >
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Understated Marks */}
        <div
          className={`pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-[0.25em] ${
            isLight ? 'border-[#E5DAC8] text-[#8C8377]' : 'border-[#141414] text-[#555555]'
          }`}
        >
          <span>
            © 2024–{new Date().getFullYear()} FUME PARFUMS • CRAFTING INDELIBLE SILAGE SINCE 2024.
          </span>
          <div className="flex gap-6">
            <span>GRASSE • PARIS • LONDON</span>
            <span>PRIVACY & LEGAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
