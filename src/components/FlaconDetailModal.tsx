import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Check } from 'lucide-react';
import { Fragrance, ThemeMode } from '../types';
import { FlaconBottle } from './FlaconBottle';
import { resetScrollLock } from '../utils/scrollLock';
import { getPrice50, getPrice100 } from '../utils/pricing';

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

    document.body.style.overflow = 'hidden';
    document.body.classList.add('overlay-open');

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
      resetScrollLock();
      previousActiveElement.current?.focus?.();
    };
  }, [onClose]);

  const price50 = getPrice50(fragrance.id);
  const price100 = getPrice100(price50);
  const currentPrice = selectedSize === '50ml' ? price50 : price100;

  const handleAdd = () => {
    onAddToCart(fragrance, selectedSize, currentPrice);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-2 sm:p-4 backdrop-blur-xs"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(0,0,0,0.45)'
      }}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={`FUME ${fragrance.name} Details`}
        onClick={(e) => e.stopPropagation()}
        className={`relative shadow-2xl border overflow-hidden grid grid-cols-1 md:grid-cols-2 grid-rows-[minmax(180px,36%)_1fr] md:grid-rows-1 ${
          isLight
            ? 'bg-[#FAF8F5] text-[#1A1816] border-[#E8DFC9]'
            : 'bg-[#0a0a0a] text-[#f5f4f0] border-[#222222]'
        }`}
        style={{
          width: 'min(1120px, calc(100vw - 32px))',
          height: 'min(860px, calc(100dvh - 32px))',
          maxHeight: 'calc(100dvh - 32px)',
          overflow: 'hidden'
        }}
      >
        {/* Close Button on panel — 44×44px hit area, full ×, top: 12px, right: 12px, z-index: 50 */}
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Close"
          onClick={onClose}
          className={`pdp-close absolute z-50 w-[44px] h-[44px] min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center transition-all cursor-pointer border ${
            isLight
              ? 'border-[#C5A059]/40 bg-white/95 text-[#1A1816] hover:bg-[#FAF8F5] hover:text-[#C5A059] shadow-sm'
              : 'border-[#C5A059]/40 bg-[#141414]/95 text-[#EAE2D5] hover:bg-[#1f1d1b] hover:text-[#C5A059] shadow-sm'
          }`}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '44px',
            height: '44px',
            zIndex: 50
          }}
        >
          <X className="w-5 h-5 shrink-0" strokeWidth={1.5} />
        </button>

        {/* Left: Fragrance Bottle Image Pane (min-height: 0; overflow: hidden;) */}
        <div
          className="pdp-media relative overflow-hidden flex items-center justify-center md:justify-end border-b md:border-b-0 md:border-r h-full"
          style={{
            backgroundColor: isLight ? fragrance.pastelBg : '#111111',
            borderColor: isLight ? '#E8DFC9' : '#222222',
            minHeight: 0,
            overflow: 'hidden'
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
            imageClassName="object-contain md:!object-right w-full h-full"
          />

          <div className="absolute bottom-4 left-4 z-20 text-[9px] uppercase tracking-[0.3em] font-sans text-[#C5A059] font-medium bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-xs border border-[#C5A059]/30 pointer-events-none">
            HAUTE FLACON • SINCE 2024
          </div>
        </div>

        {/* Right: Olfactory Details & Actions Pane (min-height: 0; overflow-y: auto; overscroll-behavior: contain; padding-top: 56px) */}
        <div
          className="relative p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-8 h-full"
          style={{
            backgroundColor: isLight ? '#FAF8F5' : '#0a0a0a',
            minHeight: 0,
            overflowY: 'auto',
            overscrollBehavior: 'contain',
            paddingTop: '56px'
          }}
        >

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
                    50 ML (Rs {price50.toLocaleString()})
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
                    100 ML (Rs {price100.toLocaleString()})
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
                  Rs {currentPrice.toLocaleString()}
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

            {/* Direct WhatsApp Concierge Order / Query */}
            <div className="pt-2 text-center border-t border-[#E8DFC9]/40">
              <a
                href={`https://wa.me/923132970468?text=${encodeURIComponent(
                  `Hello FUME Concierge, I would like to inquire / order ${fragrance.name} (${selectedSize} - Rs ${currentPrice.toLocaleString()})${monogram ? ` with bespoke monogram "${monogram}"` : ''}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.22em] font-sans transition-colors py-1 ${
                  isLight ? 'text-[#7D766E] hover:text-[#C5A059]' : 'text-[#8c8985] hover:text-[#C5A059]'
                }`}
              >
                <span>✦ Order or Inquire via WhatsApp (+92 313 297 0468) →</span>
              </a>
            </div>
          </div>
        </div>
      </div>,
    document.body
  );
};
