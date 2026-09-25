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
      className="relative w-full font-sans border-t border-shadow/[0.08] bg-pearl text-shadow/60"
    >
      <div className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16 pt-20 pb-12 space-y-16">
        {/* Top Tier: FUME Wordmark & Minimal Newsletter */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pb-16 border-b border-shadow/[0.08]"
        >
          <div className="lg:col-span-5 space-y-2">
            <div className="flex items-center gap-3">
              <img
                src="/logo/logo-black.png"
                alt="FUME FRAGRANCES"
                className="h-8 md:h-10 w-auto object-contain select-none"
              />
              <span className="text-[9px] uppercase tracking-[0.3em] text-dusty-rose font-sans font-medium px-2 py-0.5 border border-dusty-rose/40 rounded-xs">
                EST. 2024
              </span>
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-dusty-rose">
              FUME FRAGRANCES (SMC-PRIVATE) LIMITED
            </p>
          </div>

          <div className="lg:col-span-7 lg:pl-10 space-y-4">
            <span
              className="text-[10px] uppercase tracking-[0.3em] block text-shadow"
            >
              NEWSLETTER
            </span>
            <p className="text-xs font-light max-w-md text-shadow/60">
              Receive private allocations, seasonal flacon releases, and invitations to private salon appointments.
            </p>

            {subscribed ? (
              <div className="text-xs text-dusty-rose uppercase tracking-widest pt-2">
                THANK YOU FOR SUBSCRIBING. YOUR DOSSIER HAS BEEN NOTED.
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex max-w-md border-b border-shadow/20 pb-1"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL..."
                  className="bg-transparent text-xs placeholder:text-shadow/40 focus:outline-none flex-1 uppercase tracking-wider py-2 text-shadow"
                />
                <button
                  type="submit"
                  className="text-[10px] uppercase tracking-[0.25em] transition-colors cursor-pointer px-3 text-shadow hover:text-dusty-rose"
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
              className="text-[10px] uppercase tracking-[0.28em] block font-medium text-shadow"
            >
              SHOP
            </span>
            <ul className="space-y-2.5 text-[11px] tracking-wider uppercase">
              <li>
                <button
                  onClick={() => onNavigate('perfumes')}
                  className="hover:text-dusty-rose transition-colors cursor-pointer"
                >
                  Perfumes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collections')}
                  className="hover:text-dusty-rose transition-colors cursor-pointer"
                >
                  Collections
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('perfumes')}
                  className="hover:text-dusty-rose transition-colors cursor-pointer"
                >
                  Best Sellers
                </button>
              </li>
            </ul>
          </div>

          {/* ABOUT */}
          <div className="space-y-4">
            <span
              className="text-[10px] uppercase tracking-[0.28em] block font-medium text-shadow"
            >
              ABOUT
            </span>
            <ul className="space-y-2.5 text-[11px] tracking-wider uppercase">
              <li>
                <button
                  onClick={() => onNavigate('story')}
                  className="hover:text-dusty-rose transition-colors cursor-pointer"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('films')}
                  className="hover:text-dusty-rose transition-colors cursor-pointer"
                >
                  Films & Stories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-dusty-rose transition-colors cursor-pointer"
                >
                  Contact & Concierge
                </button>
              </li>
            </ul>
          </div>

          {/* HELP */}
          <div className="space-y-4">
            <span
              className="text-[10px] uppercase tracking-[0.28em] block font-medium text-shadow"
            >
              CLIENT CARE
            </span>
            <ul className="space-y-2.5 text-[11px] tracking-wider uppercase">
              <li>
                <button
                  onClick={() => onNavigate('care')}
                  className="hover:text-dusty-rose transition-colors cursor-pointer"
                >
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('care')}
                  className="hover:text-dusty-rose transition-colors cursor-pointer"
                >
                  Returns & Discovery Guarantee
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('care')}
                  className="hover:text-dusty-rose transition-colors cursor-pointer"
                >
                  Bottle Care & FAQs
                </button>
              </li>
              <li className="pt-1 border-t border-shadow/[0.08]">
                <a
                  href="mailto:jiaaryan20@gmail.com"
                  className="hover:text-dusty-rose transition-colors lowercase block text-shadow/80"
                >
                  jiaaryan20@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/923132970468"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-dusty-rose transition-colors block text-shadow/80"
                >
                  WhatsApp: +92 313 297 0468
                </a>
              </li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div className="space-y-4">
            <span
              className="text-[10px] uppercase tracking-[0.28em] block font-medium text-shadow"
            >
              SOCIAL
            </span>
            <ul className="space-y-2.5 text-[11px] tracking-wider uppercase">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-dusty-rose transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-dusty-rose transition-colors"
                >
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Understated Marks */}
        <div
          className="pt-8 border-t border-shadow/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-[0.25em] text-shadow/40"
        >
          <span>
            © 2024 {new Date().getFullYear()} FUME FRAGRANCES (SMC-PRIVATE) LIMITED. ALL RIGHTS RESERVED.
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
