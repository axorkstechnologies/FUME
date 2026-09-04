import React, { useState, useEffect, useRef } from 'react';
import { X, Check } from 'lucide-react';
import { Fragrance, ThemeMode } from '../types';
import { FlaconBottle } from './FlaconBottle';

interface FlaconDetailModalProps {
  fragrance: Fragrance | null;
  onClose: () => void;
  onAddToCart: (fragrance: Fragrance, size: '50ml' | '100ml', price: number) => void;
  themeMode: ThemeMode;
}

export const FlaconDetailModal: React.FC<FlaconDetailModalProps> = ({
  fragrance,
  onClose,
  onAddToCart,
  themeMode
}) => {
  if (!fragrance) return null;

  const isLight = themeMode === 'light';
  const [selectedSize, setSelectedSize] = useState<'50ml' | '100ml'>('50ml');
  const [monogram, setMonogram] = useState('');
  const [added, setAdded] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previousActiveElement.current = document.activeElement as HTMLElement | null;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previousActiveElement.current?.focus?.();
    };
  }, [onClose]);

  const currentPrice = selectedSize === '50ml' ? fragrance.price : Math.round(fragrance.price * 1.45);

  const handleAdd = () => {
    onAddToCart(fragrance, selectedSize, currentPrice);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={`FUME ${fragrance.name} Details`}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-4xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200 border ${
          isLight
            ? 'bg-[#FAF8F5] text-[#1A1816] border-[#E8DFC9]'
            : 'bg-[#0a0a0a] text-[#f5f4f0] border-[#222222]'
        }`}
      >
        {/* Close Button - Top right of overlay */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className={`absolute top-4 right-4 md:top-6 md:right-6 z-30 p-2.5 transition-colors cursor-pointer rounded-full ${
            isLight
              ? 'text-[#7D766E] hover:text-[#1A1816] bg-white/90 shadow-sm hover:bg-white border border-[#EAE2D5]'
              : 'text-[#8c8985] hover:text-white bg-black/70 shadow-sm hover:bg-black/90 border border-[#222222]'
          }`}
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Fragrance Bottle with Printed Plaque & Halo - Flush toward details column */}
          <div
            className="pdp-media relative aspect-[3/4] md:aspect-auto md:h-full overflow-hidden flex items-center justify-center md:justify-end border-b md:border-b-0 md:border-r"
            style={{
              backgroundColor: isLight ? fragrance.pastelBg : '#111111',
              borderColor: isLight ? '#E8DFC9' : '#222222'
            }}
          >
            {/* Soft Ambient Halo */}
            <div
              className="absolute inset-0 opacity-50 blur-[40px] pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${fragrance.pastelGlow} 0%, transparent 70%)`
              }}
            />

            <FlaconBottle
              fragrance={fragrance}
              variant="detail"
              themeMode={themeMode}
              customMonogram={monogram}
              className="w-full h-full"
            />

            <div className="absolute bottom-4 left-4 z-20 text-[9px] uppercase tracking-[0.3em] font-sans text-[#C5A059] font-medium bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-xs border border-[#C5A059]/30">
              HAUTE FLACON • SINCE 2024
            </div>
          </div>

          {/* Right: Olfactory Details & Actions */}
          <div className="relative p-6 sm:p-8 md:p-12 flex flex-col justify-between space-y-8">
            {/* Close Button - Top right of details column (visible on mobile) */}
            <button
              onClick={onClose}
              className={`md:hidden absolute top-5 right-5 z-20 p-2 transition-colors cursor-pointer rounded-full ${
                isLight
                  ? 'text-[#7D766E] hover:text-[#1A1816] bg-black/5 hover:bg-black/10'
                  : 'text-[#8c8985] hover:text-white bg-white/10 hover:bg-white/20'
              }`}
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-sans font-medium">
                    {fragrance.genderCategory} • {fragrance.olfactoryFamily}
                  </span>
                  <span className="text-xs text-[#C5A059]">✦</span>
                  <span
                    className={`text-[9px] uppercase tracking-[0.2em] font-sans ${
                      isLight ? 'text-[#8C8377]' : 'text-[#8c8985]'
                    }`}
                  >
                    SINCE 2024
                  </span>
                </div>

                <h2
                  className={`font-serif text-3xl md:text-4xl uppercase tracking-[0.16em] ${
                    isLight ? 'text-[#1A1816]' : 'text-white'
                  }`}
                >
                  {fragrance.name}
                </h2>
                <p className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-sans">
                  {fragrance.subtitle}
                </p>
              </div>

              <p
                className={`text-xs sm:text-sm font-sans font-light leading-relaxed ${
                  isLight ? 'text-[#5C5449]' : 'text-[#a9a7a1]'
                }`}
              >
                {fragrance.description}
              </p>

              {/* Olfactory Pyramid */}
              <div
                className={`space-y-3 pt-4 border-t ${
                  isLight ? 'border-[#E8DFC9]' : 'border-[#1a1a1a]'
                }`}
              >
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#C5A059] font-sans font-medium block">
                    TOP NOTES
                  </span>
                  <span
                    className={`text-xs font-sans ${isLight ? 'text-[#1A1816]' : 'text-[#e5e3dc]'}`}
                  >
                    {fragrance.topNotes}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#C5A059] font-sans font-medium block">
                    HEART NOTES
                  </span>
                  <span
                    className={`text-xs font-sans ${isLight ? 'text-[#1A1816]' : 'text-[#e5e3dc]'}`}
                  >
                    {fragrance.heartNotes}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#C5A059] font-sans font-medium block">
                    BASE NOTES
                  </span>
                  <span
                    className={`text-xs font-sans ${isLight ? 'text-[#1A1816]' : 'text-[#e5e3dc]'}`}
                  >
                    {fragrance.baseNotes}
                  </span>
                </div>
              </div>

              {/* Volume Selector */}
              <div className="space-y-2 pt-2">
                <span
                  className={`text-[9px] uppercase tracking-[0.25em] font-sans block ${
                    isLight ? 'text-[#8C8377]' : 'text-[#8c8985]'
                  }`}
                >
                  FLACON VOLUME
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedSize('50ml')}
                    className={`py-2.5 px-4 text-xs font-sans uppercase tracking-widest border transition-all cursor-pointer ${
                      selectedSize === '50ml'
                        ? isLight
                          ? 'border-[#1A1816] bg-[#1A1816] text-white font-medium'
                          : 'border-[#C5A059] bg-[#C5A059] text-black font-medium'
                        : isLight
                        ? 'border-[#E0D5C3] text-[#7D766E] hover:border-[#C5A059]'
                        : 'border-[#262626] text-[#8c8985] hover:border-white hover:text-white'
                    }`}
                  >
                    50 ML (${fragrance.price})
                  </button>
                  <button
                    onClick={() => setSelectedSize('100ml')}
                    className={`py-2.5 px-4 text-xs font-sans uppercase tracking-widest border transition-all cursor-pointer ${
                      selectedSize === '100ml'
                        ? isLight
                          ? 'border-[#1A1816] bg-[#1A1816] text-white font-medium'
                          : 'border-[#C5A059] bg-[#C5A059] text-black font-medium'
                        : isLight
                        ? 'border-[#E0D5C3] text-[#7D766E] hover:border-[#C5A059]'
                        : 'border-[#262626] text-[#8c8985] hover:border-white hover:text-white'
                    }`}
                  >
                    100 ML (${Math.round(fragrance.price * 1.45)})
                  </button>
                </div>
              </div>

              {/* Bespoke Monogram Engraving Preview Option */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[9px] uppercase tracking-[0.25em] font-sans block ${
                      isLight ? 'text-[#8C8377]' : 'text-[#8c8985]'
                    }`}
                  >
                    BESPOKE GOLD ENGRAVING (OPTIONAL)
                  </span>
                  <span className="text-[8px] uppercase tracking-[0.2em] text-[#C5A059] font-medium">
                    COMPLIMENTARY
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={4}
                  value={monogram}
                  onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                  placeholder="ENTER INITIALS (E.G. M.M.)"
                  className={`w-full px-3 py-2 text-xs uppercase tracking-widest border focus:outline-none transition-colors rounded-xs ${
                    isLight
                      ? 'bg-white border-[#E0D5C3] text-[#1A1816] focus:border-[#C5A059]'
                      : 'bg-[#141414] border-[#2A2A2A] text-white focus:border-[#C5A059]'
                  }`}
                />
              </div>
            </div>

            {/* Price & Add to Bag CTA */}
            <div
              className={`pt-6 border-t flex items-center justify-between gap-4 ${
                isLight ? 'border-[#E8DFC9]' : 'border-[#1a1a1a]'
              }`}
            >
              <div>
                <span
                  className={`text-[9px] uppercase tracking-[0.25em] font-sans block ${
                    isLight ? 'text-[#8C8377]' : 'text-[#8c8985]'
                  }`}
                >
                  PRICE
                </span>
                <span
                  className={`font-serif text-2xl font-medium ${
                    isLight ? 'text-[#1A1816]' : 'text-white'
                  }`}
                >
                  ${currentPrice}
                </span>
              </div>

              <button
                onClick={handleAdd}
                disabled={added}
                className={`px-8 py-4 transition-all text-xs uppercase tracking-[0.25em] font-sans font-medium flex items-center gap-2 cursor-pointer ${
                  added
                    ? 'bg-[#C5A059] text-black'
                    : isLight
                    ? 'bg-[#1A1816] text-white hover:bg-[#C5A059]'
                    : 'bg-white text-black hover:bg-[#C5A059] hover:text-black'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>ADDED TO BAG</span>
                  </>
                ) : (
                  <span>ADD TO BAG</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
