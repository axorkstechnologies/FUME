import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { ThemeMode } from '../types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  themeMode: ThemeMode;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, themeMode }) => {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const isLight = themeMode === 'light';

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-xl border p-8 md:p-12 shadow-2xl space-y-6 ${
          isLight
            ? 'bg-[#FAF8F5] border-[#E8DFC9] text-[#1A1816]'
            : 'bg-[#0c0c0c] border-[#222222] text-[#f5f4f0]'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-6 right-6 p-2 cursor-pointer transition-colors ${
            isLight ? 'text-[#7D766E] hover:text-[#1A1816]' : 'text-[#8c8985] hover:text-white'
          }`}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A059] block font-sans font-medium">
            CLIENT SERVICES & CONCIERGE • SINCE 2024
          </span>
          <h3
            className={`font-serif text-2xl md:text-3xl font-normal uppercase tracking-[0.16em] ${
              isLight ? 'text-[#1A1816]' : 'text-white'
            }`}
          >
            CONCIERGE INQUIRY
          </h3>
          <p
            className={`text-xs font-light ${
              isLight ? 'text-[#7D766E]' : 'text-[#8c8985]'
            }`}
          >
            Shipping assistance, bespoke flacons, and private appointments.
          </p>
        </div>

        {sent ? (
          <div className="py-12 text-center space-y-3">
            <Check className="w-8 h-8 text-[#C5A059] mx-auto" />
            <p className="font-serif text-lg uppercase tracking-wider text-[#C5A059]">
              MESSAGE DISPATCHED
            </p>
            <p className={`text-xs ${isLight ? 'text-[#7D766E]' : 'text-[#8c8985]'}`}>
              A FUME olfactory advisor will respond to your dossier within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
            <div className="space-y-1">
              <label
                className={`uppercase tracking-wider text-[10px] ${
                  isLight ? 'text-[#7D766E]' : 'text-[#8c8985]'
                }`}
              >
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Madame / Monsieur"
                className={`w-full border px-3 py-2.5 focus:outline-none rounded-xs ${
                  isLight
                    ? 'border-[#E0D5C3] bg-white text-[#1A1816]'
                    : 'border-[#222222] bg-[#111111] text-white'
                }`}
              />
            </div>

            <div className="space-y-1">
              <label
                className={`uppercase tracking-wider text-[10px] ${
                  isLight ? 'text-[#7D766E]' : 'text-[#8c8985]'
                }`}
              >
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="patron@domain.com"
                className={`w-full border px-3 py-2.5 focus:outline-none rounded-xs ${
                  isLight
                    ? 'border-[#E0D5C3] bg-white text-[#1A1816]'
                    : 'border-[#222222] bg-[#111111] text-white'
                }`}
              />
            </div>

            <div className="space-y-1">
              <label
                className={`uppercase tracking-wider text-[10px] ${
                  isLight ? 'text-[#7D766E]' : 'text-[#8c8985]'
                }`}
              >
                Inquiry Details
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Please describe your inquiry..."
                className={`w-full border px-3 py-2.5 focus:outline-none rounded-xs resize-none ${
                  isLight
                    ? 'border-[#E0D5C3] bg-white text-[#1A1816]'
                    : 'border-[#222222] bg-[#111111] text-white'
                }`}
              />
            </div>

            <button
              type="submit"
              className={`w-full py-3.5 transition-colors uppercase tracking-[0.24em] font-medium text-[11px] cursor-pointer mt-2 ${
                isLight
                  ? 'bg-[#1A1816] text-[#FAF8F5] hover:bg-[#C5A059]'
                  : 'bg-white text-black hover:bg-[#C5A059] hover:text-black'
              }`}
            >
              TRANSMIT DOSSIER
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
