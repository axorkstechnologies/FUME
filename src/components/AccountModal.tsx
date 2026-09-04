import React, { useState } from 'react';
import { X, ShieldCheck, Mail, Key } from 'lucide-react';
import { ThemeMode } from '../types';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  themeMode: ThemeMode;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose, themeMode }) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'orders'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isLight = themeMode === 'light';

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-lg border p-8 md:p-12 shadow-2xl space-y-8 ${
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
          aria-label="Close account modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A059] font-sans font-medium block">
            FUME ARCHIVE & MEMBERSHIP • SINCE 2024
          </span>
          <h3
            className={`font-serif text-2xl md:text-3xl font-normal uppercase tracking-[0.16em] ${
              isLight ? 'text-[#1A1816]' : 'text-white'
            }`}
          >
            PATRON ACCESS
          </h3>
        </div>

        {/* Tab Selector */}
        <div
          className={`flex border-b text-xs uppercase tracking-widest font-sans ${
            isLight ? 'border-[#E8DFC9]' : 'border-[#222222]'
          }`}
        >
          <button
            onClick={() => setActiveTab('signin')}
            className={`pb-3 flex-1 text-center cursor-pointer transition-colors ${
              activeTab === 'signin'
                ? isLight
                  ? 'text-[#1A1816] border-b-2 border-[#1A1816] font-medium'
                  : 'text-white border-b-2 border-[#C5A059] font-medium'
                : isLight
                ? 'text-[#7D766E]'
                : 'text-[#8c8985]'
            }`}
          >
            Sanctuary Access
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 flex-1 text-center cursor-pointer transition-colors ${
              activeTab === 'orders'
                ? isLight
                  ? 'text-[#1A1816] border-b-2 border-[#1A1816] font-medium'
                  : 'text-white border-b-2 border-[#C5A059] font-medium'
                : isLight
                ? 'text-[#7D766E]'
                : 'text-[#8c8985]'
            }`}
          >
            Allocation Dossier
          </button>
        </div>

        {/* Content */}
        {activeTab === 'signin' ? (
          isLoggedIn ? (
            <div className="text-center space-y-4 py-6">
              <ShieldCheck className="w-10 h-10 text-[#C5A059] mx-auto" />
              <h4 className="font-serif text-xl">AUTHENTICATED PATRON</h4>
              <p
                className={`text-xs font-sans font-light ${
                  isLight ? 'text-[#7D766E]' : 'text-[#8c8985]'
                }`}
              >
                Welcome back, {email}. Your private allocations and complimentary express delivery privileges are active.
              </p>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="text-[10px] uppercase tracking-widest text-[#8c8985] hover:text-[#C5A059] pt-4"
              >
                SIGN OUT
              </button>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4 font-sans text-xs">
              <div className="space-y-1.5">
                <label
                  className={`uppercase tracking-wider text-[10px] ${
                    isLight ? 'text-[#7D766E]' : 'text-[#8c8985]'
                  }`}
                >
                  Patron Email
                </label>
                <div
                  className={`flex items-center border px-3 py-2.5 rounded-xs ${
                    isLight ? 'border-[#E0D5C3] bg-white' : 'border-[#222222] bg-[#111111]'
                  }`}
                >
                  <Mail className="w-4 h-4 text-[#8c8985] mr-2 shrink-0" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="patron@domain.com"
                    className="w-full bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  className={`uppercase tracking-wider text-[10px] ${
                    isLight ? 'text-[#7D766E]' : 'text-[#8c8985]'
                  }`}
                >
                  Access Key / Password
                </label>
                <div
                  className={`flex items-center border px-3 py-2.5 rounded-xs ${
                    isLight ? 'border-[#E0D5C3] bg-white' : 'border-[#222222] bg-[#111111]'
                  }`}
                >
                  <Key className="w-4 h-4 text-[#8c8985] mr-2 shrink-0" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`w-full py-3.5 transition-colors uppercase tracking-[0.24em] font-medium text-[11px] cursor-pointer mt-4 ${
                  isLight
                    ? 'bg-[#1A1816] text-[#FAF8F5] hover:bg-[#C5A059]'
                    : 'bg-white text-black hover:bg-[#C5A059] hover:text-black'
                }`}
              >
                ENTER SANCTUARY
              </button>
            </form>
          )
        ) : (
          <div className="text-center py-10 space-y-4 text-xs font-sans">
            <p className={isLight ? 'text-[#7D766E]' : 'text-[#8c8985]'}>
              NO PAST ALLOCATIONS FOUND UNDER THIS CREDENTIAL.
            </p>
            <p className="text-[10px] uppercase tracking-wider text-[#C5A059]">
              COMPLIMENTARY SHIPPING & SAMPLER AUTOMATICALLY APPLIED TO FIRST ORDER.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
