const fs = require('fs');

const code = `import React, { useState } from 'react';
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
  onOpenStory
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
    <footer className="relative w-full bg-shadow text-pearl py-20 px-6 sm:px-8 md:px-12 lg:px-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-semibold text-pearl/50">MAISON</h4>
            <div className="space-y-3 text-xs uppercase tracking-[0.25em] font-sans text-pearl/80">
              <p>FUME FRAGRANCES</p>
              <p>EST. 2024</p>
              <p>KARACHI, PAKISTAN</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-semibold text-pearl/50">EXPLORE</h4>
            <ul className="space-y-4">
              <li>
                <button onClick={() => onNavigate('perfumes')} className="text-xs uppercase tracking-[0.25em] font-sans text-pearl hover:text-pearl/60 transition-colors">
                  ALL PERFUMES
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('collections')} className="text-xs uppercase tracking-[0.25em] font-sans text-pearl hover:text-pearl/60 transition-colors">
                  COLLECTIONS
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('story')} className="text-xs uppercase tracking-[0.25em] font-sans text-pearl hover:text-pearl/60 transition-colors">
                  OUR STORY
                </button>
              </li>
            </ul>
          </div>

          {/* Client Care */}
          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-semibold text-pearl/50">CLIENT CARE</h4>
            <ul className="space-y-4">
              <li>
                <button onClick={() => onNavigate('care')} className="text-xs uppercase tracking-[0.25em] font-sans text-pearl hover:text-pearl/60 transition-colors">
                  SHIPPING & RETURNS
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="text-xs uppercase tracking-[0.25em] font-sans text-pearl hover:text-pearl/60 transition-colors">
                  CONCIERGE
                </button>
              </li>
              <li>
                <a href="https://wa.me/92381825636" target="_blank" rel="noreferrer" className="text-xs uppercase tracking-[0.25em] font-sans text-pearl hover:text-pearl/60 transition-colors">
                  WHATSAPP: +92 381 825 636
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-semibold text-pearl/50">PRIVATE ALLOCATIONS</h4>
            <p className="text-xs font-sans font-light tracking-widest text-pearl/80 leading-relaxed uppercase">
              Join our registry for bespoke releases and private events.
            </p>
            {subscribed ? (
              <p className="text-xs font-sans tracking-[0.25em] text-pearl uppercase">Registry Confirmed.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="EMAIL ADDRESS"
                  className="bg-transparent border-b border-pearl/30 px-0 py-2 text-xs font-sans tracking-widest text-pearl focus:outline-none focus:border-pearl transition-colors rounded-none placeholder:text-pearl/30 uppercase"
                />
                <button
                  type="submit"
                  className="self-start text-[10px] uppercase tracking-[0.3em] font-sans border-b border-pearl pb-1 hover:text-pearl/60 hover:border-pearl/60 transition-colors"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>

        </div>

        <div className="pt-8 border-t border-pearl/20 flex flex-col sm:flex-row items-center justify-between gap-6 text-[9px] uppercase tracking-[0.3em] font-sans text-pearl/50">
          <p>&copy; {new Date().getFullYear()} FUME FRAGRANCES. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <button className="hover:text-pearl transition-colors">PRIVACY POLICY</button>
            <button className="hover:text-pearl transition-colors">TERMS OF SERVICE</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
`;

fs.writeFileSync('src/components/Footer.tsx', code);
console.log('Done replacing Footer.tsx');
