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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3500);
      setEmail('');
    }
  };

  return (
    <footer className="relative w-full font-sans border-t border-shadow/[0.08] bg-pearl text-shadow">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-20 pb-12 space-y-16">

        {/* Top: Logo & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pb-16 border-b border-shadow/[0.08]">
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="/logo/logo-black.png"
                alt="FUME FRAGRANCES"
                className="h-8 md:h-10 w-auto object-contain select-none"
              />
              <span className="text-[9px] uppercase tracking-[0.3em] text-dusty-rose font-sans font-semibold px-2 py-0.5 border border-dusty-rose/40 rounded-xs">
                EST. 2024
              </span>
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-dusty-rose font-medium">
              FUME FRAGRANCES (SMC-PRIVATE) LIMITED
            </p>
          </div>

          <div className="lg:col-span-7 lg:pl-10 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] block text-shadow font-medium">
              NEWSLETTER
            </span>
            <p className="text-xs font-normal max-w-md text-shadow/80 leading-relaxed">
              Receive private allocations, seasonal flacon releases, and invitations to salon appointments.
            </p>

            {subscribed ? (
              <div className="text-xs text-dusty-rose uppercase tracking-widest pt-2">
                THANK YOU FOR SUBSCRIBING. YOUR DOSSIER HAS BEEN NOTED.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex max-w-md border-b border-shadow/20 pb-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL..."
                  className="bg-transparent text-xs placeholder:text-shadow/30 focus:outline-none flex-1 uppercase tracking-wider py-2 text-shadow"
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

        {/* Middle: Navigation + Studio Info */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 text-xs">
          {/* SHOP */}
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.28em] block font-medium text-shadow">
              SHOP
            </span>
            <ul className="space-y-2.5 text-[11px] tracking-wider uppercase">
              <li>
                <button onClick={() => onNavigate('perfumes')} className="hover:text-dusty-rose transition-colors cursor-pointer">
                  Perfumes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('collections')} className="hover:text-dusty-rose transition-colors cursor-pointer">
                  Collections
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('perfumes')} className="hover:text-dusty-rose transition-colors cursor-pointer">
                  Best Sellers
                </button>
              </li>
            </ul>
          </div>

          {/* ABOUT */}
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.28em] block font-medium text-shadow">
              ABOUT
            </span>
            <ul className="space-y-2.5 text-[11px] tracking-wider uppercase">
              <li>
                <button onClick={() => onNavigate('story')} className="hover:text-dusty-rose transition-colors cursor-pointer">
                  Our Story
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('films')} className="hover:text-dusty-rose transition-colors cursor-pointer">
                  Films & Stories
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-dusty-rose transition-colors cursor-pointer">
                  Concierge
                </button>
              </li>
            </ul>
          </div>

          {/* CLIENT CARE */}
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.28em] block font-medium text-shadow">
              CLIENT CARE
            </span>
            <ul className="space-y-2.5 text-[11px] tracking-wider uppercase">
              <li>
                <button onClick={() => onNavigate('care')} className="hover:text-dusty-rose transition-colors cursor-pointer">
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('care')} className="hover:text-dusty-rose transition-colors cursor-pointer">
                  Returns & Guarantee
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('care')} className="hover:text-dusty-rose transition-colors cursor-pointer">
                  FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* STUDIO & CONTACT */}
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.28em] block font-medium text-shadow">
              STUDIO
            </span>
            <ul className="space-y-2.5 text-[11px] tracking-wider">
              <li className="uppercase text-shadow leading-relaxed font-normal">
                32/A Society Office,<br />
                PECHS Block 2,<br />
                Kashmir Road, Karachi
              </li>
              <li className="pt-1 border-t border-shadow/[0.06]">
                <a href="mailto:jiaaryan20@gmail.com" className="hover:text-dusty-rose transition-colors lowercase text-shadow font-medium">
                  jiaaryan20@gmail.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/92381825636" target="_blank" rel="noopener noreferrer" className="hover:text-dusty-rose transition-colors uppercase text-shadow font-medium">
                  WhatsApp: +92 381 825 636
                </a>
              </li>
            </ul>
          </div>

          {/* OUTLETS & SOCIAL */}
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.28em] block font-medium text-shadow">
              OUTLETS
            </span>
            <p className="text-[11px] tracking-wider uppercase text-dusty-rose font-medium italic">
              Coming Soon
            </p>

            <span className="text-[10px] uppercase tracking-[0.28em] block font-medium text-shadow pt-4">
              SOCIAL
            </span>
            <ul className="space-y-2.5 text-[11px] tracking-wider uppercase">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-dusty-rose transition-colors text-shadow font-medium">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-dusty-rose transition-colors text-shadow font-medium">
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="pt-8 border-t border-shadow/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-[0.25em] text-shadow/60">
          <span>
            © 2024–{new Date().getFullYear()} FUME FRAGRANCES (SMC-PRIVATE) LIMITED. ALL RIGHTS RESERVED.
          </span>
          <div className="flex gap-6">
            <span>KARACHI • PAKISTAN</span>
            <span>PRIVACY & LEGAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
