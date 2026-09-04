import React from 'react';
import { Fragrance, ThemeMode } from '../types';

export interface FlaconBottleProps {
  fragrance: Fragrance;
  variant?: 'hero' | 'card' | 'detail' | 'thumb';
  className?: string;
  themeMode?: ThemeMode;
  showQuickAdd?: boolean;
  onQuickAdd?: () => void;
  customMonogram?: string;
  imageClassName?: string;
  customName?: string;
}

interface FlaconLabelProps {
  name: string;
  customMonogram?: string;
  compact?: boolean;
}

/**
 * Precision haute parfumerie label that seamlessly and perfectly overlaps
 * the physical white label strip existing on the flint glass bottle images.
 * Expanded slightly to align naturally with the flacon's architectural facet
 * and give an authentic physical luxury product look rather than an artificial overlay.
 * Coordinates calibrated with natural margin:
 * top: 40.40%, left: 44.10%, width: 26.50%, height: 30.20%
 */
const FlaconLabel: React.FC<FlaconLabelProps> = ({ name, customMonogram, compact }) => {
  return (
    <div
      className="bottle-label absolute select-none pointer-events-none z-10 text-center"
      style={{
        top: '40.40%',
        left: '44.10%',
        width: '26.50%',
        height: '30.20%',
        transform: compact ? 'translateX(-2.5px)' : 'translateX(-6px)',
      }}
      aria-hidden="true"
    >
      <div className="relative w-full h-full p-[4%] rounded-[1.5px] border border-[#C5A059]/80 bg-gradient-to-b from-[#1A1817] via-[#0E0D0C] to-[#060605] shadow-[0_4px_14px_rgba(0,0,0,0.85),0_1.5px_4px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.16),inset_0_-1px_0_rgba(0,0,0,0.7)] overflow-hidden flex flex-col justify-between items-center">
        {/* Subtle cylindrical bottle reflection and lighting gradient across the plaque */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.3) 0%, rgba(255,255,255,0.03) 22%, rgba(255,255,255,0.07) 48%, rgba(0,0,0,0.2) 100%)',
          }}
        />

        {/* Fine secondary gold inner hairline border */}
        <div className="absolute inset-[2px] border border-[#D4AF37]/35 rounded-[0.5px] pointer-events-none" />

        {/* Micro filigree corner ticks for authentic haute parfumerie craftsmanship */}
        <div className="absolute top-1 left-1 w-1 h-1 border-t border-l border-[#C5A059]/50 pointer-events-none" />
        <div className="absolute top-1 right-1 w-1 h-1 border-t border-r border-[#C5A059]/50 pointer-events-none" />
        <div className="absolute bottom-1 left-1 w-1 h-1 border-b border-l border-[#C5A059]/50 pointer-events-none" />
        <div className="absolute bottom-1 right-1 w-1 h-1 border-b border-r border-[#C5A059]/50 pointer-events-none" />

        {/* Diagonal specular glare sheen on the glass */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />

        {/* Top Brand Mark (Gold Hot-Stamp) */}
        <div className="relative z-1 w-full pt-[2%]">
          <span
            className="uppercase tracking-[0.32em] text-[#C5A059] font-sans font-semibold block leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
            style={{ fontSize: compact ? 'clamp(4.5px, 2cqi, 7.5px)' : 'clamp(5.2px, 2.4cqi, 9.5px)' }}
          >
            FUME
          </span>
        </div>

        {/* Center Perfume Name (Luminous White) & Concentration (Gold) */}
        <div className="relative z-1 w-full px-0.5">
          <h3
            className="font-serif uppercase font-semibold text-white leading-tight tracking-[0.09em] truncate drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]"
            style={{ fontSize: compact ? 'clamp(6.5px, 3.4cqi, 12px)' : 'clamp(7.5px, 3.9cqi, 15.5px)' }}
          >
            {name}
          </h3>
          <span
            className="uppercase tracking-[0.24em] text-[#D4AF37]/90 font-sans font-normal block leading-none mt-[2.5%]"
            style={{ fontSize: compact ? 'clamp(3.6px, 1.6cqi, 6px)' : 'clamp(4.2px, 1.9cqi, 7.5px)' }}
          >
            EAU DE PARFUM
          </span>
        </div>

        {/* Divider & Provenance / Monogram (Crisp White & Warm Gold) */}
        <div className="relative z-1 w-full pb-[2%] flex flex-col items-center">
          <div className="w-[45%] h-[0.5px] bg-[#C5A059]/70 mb-[3%]" />
          <div
            className="flex items-center justify-center gap-0.5 uppercase tracking-[0.16em] text-[#EDE8E1] font-sans leading-none mb-[2%]"
            style={{ fontSize: compact ? 'clamp(3.2px, 1.4cqi, 5.5px)' : 'clamp(3.8px, 1.6cqi, 6.5px)' }}
          >
            <span>GRASSE</span>
            <span className="text-[#C5A059] text-[0.8em]">✦</span>
            <span>PARIS</span>
          </div>

          {customMonogram ? (
            <span
              className="uppercase tracking-[0.14em] text-[#F3D079] font-serif font-semibold block leading-none truncate px-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
              style={{ fontSize: compact ? 'clamp(3.5px, 1.5cqi, 6px)' : 'clamp(4px, 1.7cqi, 7px)' }}
            >
              ENGRAVED: {customMonogram}
            </span>
          ) : (
            <span
              className="uppercase tracking-[0.22em] text-[#C5A059] font-sans font-medium block leading-none"
              style={{ fontSize: compact ? 'clamp(3.2px, 1.4cqi, 5.5px)' : 'clamp(3.6px, 1.5cqi, 6px)' }}
            >
              50 ML · 1.7 FL.OZ.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export const FlaconBottle: React.FC<FlaconBottleProps> = ({
  fragrance,
  variant = 'card',
  className = '',
  themeMode = 'light',
  showQuickAdd = false,
  onQuickAdd,
  customMonogram,
  imageClassName = '',
  customName
}) => {
  const isLight = themeMode === 'light';
  const nameToDisplay = customName || fragrance.name;

  if (variant === 'hero') {
    return (
      <div className={`relative w-full h-full flex items-center justify-center select-none ${className}`}>
        <div className="relative aspect-square w-full max-w-[500px] max-h-full flex items-center justify-center [container-type:inline-size] mx-auto">
          {/* Flacon Image */}
          <img
            src={fragrance.image}
            alt={`FUME ${nameToDisplay} Luxury Flacon`}
            className={`w-full h-full object-contain object-center select-none drop-shadow-[0_30px_70px_rgba(0,0,0,0.85)] ${imageClassName}`}
            loading="eager"
          />

          {/* Integrated Haute Parfumerie Flacon Label */}
          <FlaconLabel name={nameToDisplay} customMonogram={customMonogram} />
        </div>
      </div>
    );
  }

  if (variant === 'detail') {
    return (
      <div className={`relative w-full h-full flex items-center justify-center md:justify-end select-none ${className}`}>
        <div className="relative aspect-square w-auto h-full max-h-full max-w-[380px] sm:max-w-[420px] md:max-w-none md:w-auto md:h-full flex items-center justify-center md:justify-end [container-type:inline-size] mx-auto md:mx-0 md:ml-auto">
          {/* Fragrance Bottle Image */}
          <img
            src={fragrance.image}
            alt={`FUME ${nameToDisplay}`}
            className={`w-full h-full object-contain md:object-right select-none ${imageClassName}`}
          />

          {/* Integrated Haute Parfumerie Flacon Label */}
          <FlaconLabel name={nameToDisplay} customMonogram={customMonogram} />
        </div>
      </div>
    );
  }

  if (variant === 'thumb') {
    return (
      <div className={`relative aspect-square w-full flex items-center justify-center [container-type:inline-size] ${className}`}>
        <img
          src={fragrance.image}
          alt={`FUME ${nameToDisplay}`}
          className={`w-full h-full object-contain select-none ${imageClassName}`}
          loading="lazy"
        />
        <FlaconLabel name={nameToDisplay} customMonogram={customMonogram} compact />
      </div>
    );
  }

  // Standard Product Card Flacon
  return (
    <div
      className={`relative aspect-[3/4] w-full overflow-hidden transition-all duration-500 rounded-sm border flex items-center justify-center ${
        isLight
          ? 'border-[#EAE2D5] group-hover:border-[#C5A059]'
          : 'border-[#1E1E1E] group-hover:border-[#C5A059]/80'
      } ${className}`}
      style={{
        backgroundColor: isLight ? fragrance.pastelBg : '#111111'
      }}
    >
      {/* Subtle Pastel Ambient Halo behind the bottle */}
      <div
        className="absolute inset-0 opacity-40 group-hover:opacity-70 transition-opacity duration-700 blur-[30px] pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${fragrance.pastelGlow} 0%, transparent 70%)`
        }}
      />

      {/* Fragrance Tone Tag */}
      {fragrance.cardTone && (
        <div className="absolute top-3 left-3 z-20 pointer-events-none">
          <span
            className={`text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 font-sans font-medium rounded-xs border backdrop-blur-xs ${
              isLight
                ? 'bg-white/80 border-[#EAE2D5] text-[#7D766E]'
                : 'bg-black/60 border-[#333333] text-[#A8A196]'
            }`}
          >
            {fragrance.cardTone}
          </span>
        </div>
      )}

      {/* Geometrically locked 1:1 Bottle & Label Frame */}
      <div className="relative w-full aspect-square flex items-center justify-center [container-type:inline-size] transition-transform duration-700 ease-out group-hover:scale-105 z-10">
        <img
          src={fragrance.image}
          alt={`FUME ${nameToDisplay}`}
          className={`w-full h-full object-contain object-center select-none ${imageClassName}`}
          loading="lazy"
        />

        {/* Integrated Haute Parfumerie Flacon Label overlapping the white strip */}
        <FlaconLabel name={nameToDisplay} customMonogram={customMonogram} />
      </div>

      {/* Quick Add Overlay on Hover */}
      {showQuickAdd && (
        <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-5 z-30 pointer-events-none group-hover:pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onQuickAdd) onQuickAdd();
            }}
            className="w-full py-3 bg-white text-[#1A1816] hover:bg-[#C5A059] hover:text-white transition-colors text-[10px] uppercase tracking-[0.24em] font-sans font-medium cursor-pointer shadow-md"
          >
            ADD TO BAG
          </button>
        </div>
      )}
    </div>
  );
};
