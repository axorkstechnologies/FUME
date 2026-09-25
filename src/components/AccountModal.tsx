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
    <div className="fixed inset-0 z-50 bg-pearl/75 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-lg border p-8 md:p-12 shadow-2xl space-y-8 ${
          'bg-pearl border-shadow/10 text-shadow'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-6 right-6 p-2 cursor-pointer transition-colors ${
            'text-shadow/60 hover:text-shadow'
          }`}
          aria-label="Close account modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase tracking-[0.35em] text-dusty-rose font-sans font-medium block">
            FUME ARCHIVE & MEMBERSHIP • SINCE 2024
          </span>
          <h3
            className={`font-serif text-2xl md:text-3xl font-normal uppercase tracking-[0.16em] ${
              'text-shadow'
            }`}
          >
            PATRON ACCESS
          </h3>
        </div>

        {/* Tab Selector */}
        <div
          className={`flex border-b text-xs uppercase tracking-widest font-sans ${
            'border-shadow/10'
          }`}
        >
          <button
            onClick={() => setActiveTab('signin')}
            className={`pb-3 flex-1 text-center cursor-pointer transition-colors ${
              activeTab === 'signin'
                ? 'text-shadow border-b-2 border-shadow/10 font-medium'
                : 'text-shadow/60'
            }`}
          >
            Sanctuary Access
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 flex-1 text-center cursor-pointer transition-colors ${
              activeTab === 'orders'
                ? 'text-shadow border-b-2 border-shadow/10 font-medium'
                : 'text-shadow/60'
            }`}
          >
            Allocation Dossier
          </button>
        </div>

        {/* Content */}
        {activeTab === 'signin' ? (
          isLoggedIn ? (
            <div className="text-center space-y-4 py-6">
              <ShieldCheck className="w-10 h-10 text-dusty-rose mx-auto" />
              <h4 className="font-serif text-xl">AUTHENTICATED PATRON</h4>
              <p
                className={`text-xs font-sans font-light ${
                  'text-shadow/60'
                }`}
              >
                Welcome back, {email}. Your private allocations and complimentary express delivery privileges are active.
              </p>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="text-[10px] uppercase tracking-widest text-shadow/60 hover:text-dusty-rose pt-4"
              >
                SIGN OUT
              </button>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4 font-sans text-xs">
              <div className="space-y-1.5">
                <label
                  className={`uppercase tracking-wider text-[10px] ${
                    'text-shadow/60'
                  }`}
                >
                  Patron Email
                </label>
                <div
                  className={`flex items-center border px-3 py-2.5 rounded-xs ${
                    'border-sand bg-white'
                  }`}
                >
                  <Mail className="w-4 h-4 text-shadow/60 mr-2 shrink-0" />
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
                    'text-shadow/60'
                  }`}
                >
                  Access Key / Password
                </label>
                <div
                  className={`flex items-center border px-3 py-2.5 rounded-xs ${
                    'border-sand bg-white'
                  }`}
                >
                  <Key className="w-4 h-4 text-shadow/60 mr-2 shrink-0" />
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
                  'bg-oyster text-pearl hover:bg-dusty-rose'
                }`}
              >
                ENTER SANCTUARY
              </button>
            </form>
          )
        ) : (
          <div className="text-center py-10 space-y-4 text-xs font-sans">
            <p className={'text-shadow/60'}>
              NO PAST ALLOCATIONS FOUND UNDER THIS CREDENTIAL.
            </p>
            <p className="text-[10px] uppercase tracking-wider text-dusty-rose">
              COMPLIMENTARY SHIPPING & SAMPLER AUTOMATICALLY APPLIED TO FIRST ORDER.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
