import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Check, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { Fragrance } from '../types';
import { FRAGRANCES } from '../data/fragrances';
import { FlaconBottle } from './FlaconBottle';

interface ScentQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFragrance: (fragrance: Fragrance) => void;
  onAddToCart: (fragrance: Fragrance) => void;
}

export const ScentQuizModal: React.FC<ScentQuizModalProps> = ({
  isOpen,
  onClose,
  onSelectFragrance,
  onAddToCart
}) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    gender: 'unisex',
    occasion: 'daily',
    family: 'woody'
  });
  const [recommendation, setRecommendation] = useState<Fragrance | null>(null);

  if (!isOpen) return null;

  const handleAnswer = (key: string, value: string) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);

    if (step < 3) {
      setStep(step + 1);
    } else {
      // Calculate best recommendation
      let match = FRAGRANCES.find(f => {
        if (f.id === 'discovery-set') return false;
        const matchesGender = updated.gender === 'unisex' || f.gender === updated.gender || f.gender === 'unisex';
        const matchesFamily = f.families?.includes(updated.family) || f.olfactoryFamily?.toLowerCase() === updated.family;
        return matchesGender && matchesFamily;
      });

      if (!match) {
        match = FRAGRANCES.find(f => f.id === (updated.gender === 'her' ? 'bloom' : updated.gender === 'him' ? 'desert' : 'owood')) || FRAGRANCES[1];
      }

      setRecommendation(match);
      setStep(4);
    }
  };

  const handleReset = () => {
    setStep(1);
    setRecommendation(null);
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quiz-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#1A1816]/75 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-xl bg-[#F9F6F0] border border-[#E3DDD3] rounded-sm shadow-2xl p-6 sm:p-10 text-[#1A1816] z-10 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close scent finder"
          className="absolute top-4 right-4 p-2 text-[#7D766E] hover:text-[#1A1816] transition-colors rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step Progress Indicator */}
        {step <= 3 && (
          <div className="space-y-2 mb-8">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-[#C49A88] font-sans font-medium">
              <span>Scent Matcher</span>
              <span>Step {step} of 3</span>
            </div>
            <div className="w-full h-1 bg-[#E3DDD3] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C49A88] transition-all duration-500 rounded-full"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Step 1: Target Wearer */}
        {step === 1 && (
          <div className="space-y-6 text-center animate-in fade-in duration-300">
            <div className="space-y-2">
              <h2 id="quiz-modal-title" className="font-serif text-2xl sm:text-3xl uppercase tracking-wider text-[#1A1816]">
                Who Are You Choosing Scent For?
              </h2>
              <p className="text-xs sm:text-sm font-sans text-[#7D766E] max-w-md mx-auto leading-relaxed">
                Select the recipient profile so our nose can curate the most harmonious scent notes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {[
                { label: 'For Him', val: 'him', sub: 'Masculine woods, fresh spices and smoked amber' },
                { label: 'For Her', val: 'her', sub: 'Luminous florals, velvety vanilla and champagne musk' },
                { label: 'Unisex', val: 'unisex', sub: 'Shared botanical distillates and mineral woods' }
              ].map(opt => (
                <button
                  key={opt.val}
                  onClick={() => handleAnswer('gender', opt.val)}
                  className="p-5 border border-[#E3DDD3] bg-white hover:border-[#C49A88] hover:bg-[#F9F6F0] transition-all text-left rounded-xs cursor-pointer group"
                >
                  <span className="font-serif text-base uppercase tracking-wider text-[#1A1816] group-hover:text-[#C49A88] block transition-colors">
                    {opt.label}
                  </span>
                  <span className="text-[10px] font-sans text-[#7D766E] block mt-1 leading-snug">
                    {opt.sub}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Occasion */}
        {step === 2 && (
          <div className="space-y-6 text-center animate-in fade-in duration-300">
            <div className="space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl uppercase tracking-wider text-[#1A1816]">
                What Is Your Primary Occasion?
              </h2>
              <p className="text-xs sm:text-sm font-sans text-[#7D766E] max-w-md mx-auto leading-relaxed">
                Different environments call for specific diffusion rates and sillage envelopes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { label: 'Daily Signature & Work', val: 'daily', desc: 'Refined, versatile, persistent without overpowering colleagues.' },
                { label: 'Evenings & Celebrations', val: 'evening', desc: 'Rich projection, bold presence that lingers on textiles through midnight.' },
                { label: 'Summer Heat & Active', val: 'fresh', desc: 'Invigorating citrus, oceanic breeze and crisp aromatic notes.' },
                { label: 'Intimate & Sensual', val: 'intimate', desc: 'Warm ambergris, skin-contact musk, and sultry night woods.' }
              ].map(opt => (
                <button
                  key={opt.val}
                  onClick={() => handleAnswer('occasion', opt.val)}
                  className="p-5 border border-[#E3DDD3] bg-white hover:border-[#C49A88] hover:bg-[#F9F6F0] transition-all text-left rounded-xs cursor-pointer group"
                >
                  <span className="font-serif text-sm uppercase tracking-wider text-[#1A1816] group-hover:text-[#C49A88] block transition-colors">
                    {opt.label}
                  </span>
                  <span className="text-[10px] font-sans text-[#7D766E] block mt-1 leading-snug">
                    {opt.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Olfactory Vibe */}
        {step === 3 && (
          <div className="space-y-6 text-center animate-in fade-in duration-300">
            <div className="space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl uppercase tracking-wider text-[#1A1816]">
                Which Olfactory Family Captivates You?
              </h2>
              <p className="text-xs sm:text-sm font-sans text-[#7D766E] max-w-md mx-auto leading-relaxed">
                Choose the fragrance backbone that resonates with your personal energy.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { label: 'Woody & Resinous', val: 'woody', desc: 'Sandalwood, Virginia cedarwood, smoked vetiver and oakmoss.' },
                { label: 'Spicy & Oriental', val: 'oriental', desc: 'Rich saffron, golden oud, warm spices and amber accord.' },
                { label: 'Fresh Citrus & Aromatic', val: 'fresh', desc: 'Calabrian bergamot, crisp lavender and invigorating grapefruit.' },
                { label: 'Nocturnal Floral', val: 'oriental', desc: 'Night jasmine, French tuberose and velvety orange blossom.' }
              ].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer('family', opt.val)}
                  className="p-5 border border-[#E3DDD3] bg-white hover:border-[#C49A88] hover:bg-[#F9F6F0] transition-all text-left rounded-xs cursor-pointer group"
                >
                  <span className="font-serif text-sm uppercase tracking-wider text-[#1A1816] group-hover:text-[#C49A88] block transition-colors">
                    {opt.label}
                  </span>
                  <span className="text-[10px] font-sans text-[#7D766E] block mt-1 leading-snug">
                    {opt.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Recommendation Result */}
        {step === 4 && recommendation && (
          <div className="space-y-6 text-center animate-in fade-in zoom-in-95 duration-400">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C49A88] font-sans font-medium block">
                98% Profile Alignment • Signature Recommendation
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl uppercase tracking-wider text-[#1A1816]">
                {recommendation.name}
              </h2>
              <p className="text-xs uppercase tracking-[0.2em] text-[#7D766E] font-sans">
                {recommendation.subtitle}
              </p>
            </div>

            {/* Bottle Preview */}
            <div className="w-48 h-64 mx-auto my-2">
              <FlaconBottle
                fragrance={recommendation}
                variant="card"
                className="w-full h-full"
              />
            </div>

            <p className="text-xs sm:text-sm font-sans text-[#5C5449] max-w-md mx-auto leading-relaxed">
              {recommendation.description}
            </p>

            {/* Pricing & Guarantees */}
            <div className="flex items-center justify-center gap-4 text-xs font-sans text-[#7D766E] pt-1">
              <span className="font-serif text-lg font-medium text-[#1A1816]">
                Rs {recommendation.price.toLocaleString()}
              </span>
              <span>•</span>
              <span>14+ Hrs Persistence</span>
              <span>•</span>
              <span>Cash on Delivery</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                onClick={() => {
                  onAddToCart(recommendation);
                  onClose();
                }}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#1A1816] text-white text-xs uppercase tracking-[0.2em] font-sans font-medium hover:bg-[#C49A88] transition-colors rounded-xs cursor-pointer shadow-md"
              >
                Add Flacon to Bag
              </button>

              <button
                onClick={() => {
                  onSelectFragrance(recommendation);
                  onClose();
                }}
                className="w-full sm:w-auto px-8 py-3.5 border border-[#1A1816] text-[#1A1816] text-xs uppercase tracking-[0.2em] font-sans font-medium hover:bg-[#E3DDD3] transition-colors rounded-xs cursor-pointer"
              >
                View Full Dossier
              </button>
            </div>

            {/* Retake Quiz Option */}
            <div className="pt-3">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-[#7D766E] hover:text-[#1A1816] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Scent Matcher</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
