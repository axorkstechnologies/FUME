import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ThemeMode } from '../types';
import { Mail, Phone, MapPin, Clock, Check, Send, Sparkles, MessageCircle } from 'lucide-react';

interface ContactViewProps {
  onNavigateToCare: () => void;
  themeMode: ThemeMode;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigateToCare, themeMode }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Bespoke Flacon Commission',
    message: ''
  });

  const isLight = themeMode === 'light';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`FUME Inquiry: ${formData.inquiryType} - ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nInquiry Category: ${formData.inquiryType}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:jiaaryan20@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      inquiryType: 'Bespoke Flacon Commission',
      message: ''
    });
  };

  return (
    <div
      className={`relative w-full min-h-screen pt-32 pb-32 px-6 md:px-12 lg:px-16 transition-colors duration-500 ${
        isLight ? 'bg-[#FAF8F5] text-[#1A1816]' : 'bg-[#0a0a0a] text-[#f5f4f0]'
      }`}
    >
      <div className="max-w-[1500px] mx-auto space-y-20">
        {/* Header with Breadcrumb */}
        <div className="text-center space-y-5 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.4em] text-[#C5A059] font-sans font-medium">
            <span>HOME</span>
            <span>/</span>
            <span>CLIENT CONCIERGE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] ml-1" />
            <span>SINCE 2024</span>
          </div>

          <h1
            className={`font-serif text-4xl sm:text-5xl md:text-6xl font-normal uppercase tracking-[0.16em] ${
              isLight ? 'text-[#1A1816]' : 'text-white'
            }`}
          >
            ATELIER CONCIERGE
          </h1>

          <p
            className={`text-sm sm:text-base font-sans font-light tracking-wide leading-relaxed ${
              isLight ? 'text-[#6B6357]' : 'text-[#a9a7a1]'
            }`}
          >
            Private olfactory styling, bespoke monogramming, order dossiers, and atelier visit appointments in Paris and Grasse.
          </p>
        </div>

        {/* 2-Column Layout: Atelier Details & Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Ateliers & Direct Privileges */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A059] font-sans font-medium block">
                SANCTUARIES & HUBS • SINCE 2024
              </span>
              <h2
                className={`font-serif text-2xl sm:text-3xl uppercase tracking-wider ${
                  isLight ? 'text-[#1A1816]' : 'text-white'
                }`}
              >
                OUR ATELIERS
              </h2>
            </div>

            {/* Paris Flagship */}
            <div
              className={`p-6 border rounded-xs space-y-3 transition-colors ${
                isLight ? 'border-[#E6DDD0] bg-white' : 'border-[#222222] bg-[#111111]'
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-lg uppercase tracking-wider text-[#C5A059]">
                  PARIS SANCTUARY
                </h4>
                <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 border border-[#C5A059]/40 text-[#C5A059]">
                  FLAGSHIP
                </span>
              </div>
              <p
                className={`text-xs font-sans leading-relaxed ${
                  isLight ? 'text-[#5C5449]' : 'text-[#a9a7a1]'
                }`}
              >
                14 Rue de Castiglione, 75001 Paris, France
              </p>
              <div className="flex items-center gap-2 text-xs font-sans text-[#8c8985] pt-1">
                <Clock className="w-4 h-4 text-[#C5A059]" />
                <span>Tuesday – Saturday: 11h00 – 19h30</span>
              </div>
            </div>

            {/* Grasse Laboratory */}
            <div
              className={`p-6 border rounded-xs space-y-3 transition-colors ${
                isLight ? 'border-[#E6DDD0] bg-white' : 'border-[#222222] bg-[#111111]'
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-lg uppercase tracking-wider text-[#C5A059]">
                  GRASSE LABORATORY
                </h4>
                <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 border border-[#C5A059]/40 text-[#C5A059]">
                  CREATION LAB
                </span>
              </div>
              <p
                className={`text-xs font-sans leading-relaxed ${
                  isLight ? 'text-[#5C5449]' : 'text-[#a9a7a1]'
                }`}
              >
                8 Boulevard Fragonard, 06130 Grasse, France
              </p>
              <div className="flex items-center gap-2 text-xs font-sans text-[#8c8985] pt-1">
                <Clock className="w-4 h-4 text-[#C5A059]" />
                <span>Private appointments only • Est. 2024</span>
              </div>
            </div>

            {/* Direct Channels */}
            <div
              className={`p-6 border rounded-xs space-y-4 ${
                isLight
                  ? 'border-[#E6DDD0] bg-[#F5F1E8]/70'
                  : 'border-[#222222] bg-[#0d0d0d]'
              }`}
            >
              <h4 className="font-serif text-sm uppercase tracking-widest text-[#C5A059]">
                DIRECT CHANNELS
              </h4>
              <div className="space-y-3 text-xs font-sans">
                <a
                  href="mailto:jiaaryan20@gmail.com"
                  className="flex items-center gap-3 hover:text-[#C5A059] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>jiaaryan20@gmail.com</span>
                </a>
                <a
                  href="tel:+923132970468"
                  className="flex items-center gap-3 hover:text-[#C5A059] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>+92 313 297 0468</span>
                </a>
                <a
                  href="https://wa.me/923132970468"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-[#C5A059] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>WhatsApp: +92 313 297 0468</span>
                </a>
                <div className="flex items-center gap-3 text-[#7D766E]">
                  <MapPin className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>Worldwide White-Glove Carbon-Neutral Dispatch</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E6DDD0]/60">
                <button
                  onClick={onNavigateToCare}
                  className="text-[10px] uppercase tracking-widest text-[#C5A059] hover:underline cursor-pointer"
                >
                  View Shipping & Return Directives →
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Transmission Dossier Form */}
          <div className="lg:col-span-7">
            <div
              className={`border p-8 sm:p-12 rounded-xs shadow-xl space-y-8 ${
                isLight
                  ? 'border-[#E6DDD0] bg-white'
                  : 'border-[#222222] bg-[#0d0d0d]'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A059] font-sans font-medium">
                    DIRECT INQUIRY DOSSIER
                  </span>
                </div>
                <h3
                  className={`font-serif text-2xl sm:text-3xl font-normal uppercase tracking-wide ${
                    isLight ? 'text-[#1A1816]' : 'text-white'
                  }`}
                >
                  TRANSMIT AN INQUIRY
                </h3>
                <p
                  className={`text-xs font-sans font-light ${
                    isLight ? 'text-[#6B6357]' : 'text-[#8c8985]'
                  }`}
                >
                  An olfactory advisor will analyze your requirements and reply within 12 hours.
                </p>
              </div>

              {submitted ? (
                <div className="py-16 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full border border-[#C5A059] flex items-center justify-center mx-auto text-[#C5A059]">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4
                    className={`font-serif text-2xl uppercase tracking-wider ${
                      isLight ? 'text-[#1A1816]' : 'text-white'
                    }`}
                  >
                    DOSSIER RECORDED & DISPATCHED
                  </h4>
                  <p
                    className={`text-xs sm:text-sm font-sans max-w-md mx-auto font-light leading-relaxed ${
                      isLight ? 'text-[#6B6357]' : 'text-[#a9a7a1]'
                    }`}
                  >
                    Thank you, {formData.name || 'Patron'}. Your inquiry regarding{' '}
                    <span className="text-[#C5A059] font-medium">&quot;{formData.inquiryType}&quot;</span> has been transmitted to our senior olfactory concierge in Grasse.
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-6 px-8 py-3.5 bg-[#1A1816] text-[#FAF8F5] hover:bg-[#C5A059] hover:text-black transition-colors uppercase tracking-[0.25em] text-[10px] font-sans font-medium cursor-pointer"
                  >
                    TRANSMIT ANOTHER REQUEST
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 font-sans text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label
                        className={`uppercase tracking-wider text-[10px] block font-medium ${
                          isLight ? 'text-[#5C5449]' : 'text-[#8c8985]'
                        }`}
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Madame / Monsieur de Valois"
                        className={`w-full border px-4 py-3 focus:outline-none rounded-xs ${
                          isLight
                            ? 'border-[#E0D5C3] bg-[#FAF8F5] text-[#1A1816] focus:border-[#C5A059]'
                            : 'border-[#222222] bg-[#141414] text-white focus:border-[#C5A059]'
                        }`}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        className={`uppercase tracking-wider text-[10px] block font-medium ${
                          isLight ? 'text-[#5C5449]' : 'text-[#8c8985]'
                        }`}
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="patron@domain.com"
                        className={`w-full border px-4 py-3 focus:outline-none rounded-xs ${
                          isLight
                            ? 'border-[#E0D5C3] bg-[#FAF8F5] text-[#1A1816] focus:border-[#C5A059]'
                            : 'border-[#222222] bg-[#141414] text-white focus:border-[#C5A059]'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label
                        className={`uppercase tracking-wider text-[10px] block font-medium ${
                          isLight ? 'text-[#5C5449]' : 'text-[#8c8985]'
                        }`}
                      >
                        Direct Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className={`w-full border px-4 py-3 focus:outline-none rounded-xs ${
                          isLight
                            ? 'border-[#E0D5C3] bg-[#FAF8F5] text-[#1A1816] focus:border-[#C5A059]'
                            : 'border-[#222222] bg-[#141414] text-white focus:border-[#C5A059]'
                        }`}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        className={`uppercase tracking-wider text-[10px] block font-medium ${
                          isLight ? 'text-[#5C5449]' : 'text-[#8c8985]'
                        }`}
                      >
                        Inquiry Category
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) =>
                          setFormData({ ...formData, inquiryType: e.target.value })
                        }
                        className={`w-full border px-4 py-3 focus:outline-none rounded-xs cursor-pointer ${
                          isLight
                            ? 'border-[#E0D5C3] bg-[#FAF8F5] text-[#1A1816] focus:border-[#C5A059]'
                            : 'border-[#222222] bg-[#141414] text-white focus:border-[#C5A059]'
                        }`}
                      >
                        <option value="Bespoke Flacon Commission">Bespoke Flacon Commission</option>
                        <option value="Paris Atelier Appointment">Paris Atelier Appointment</option>
                        <option value="Grasse Private Consultation">Grasse Private Consultation</option>
                        <option value="Existing Order Status">Existing Order Status</option>
                        <option value="Fragrance Note Recommendation">Fragrance Note Recommendation</option>
                        <option value="Press & VIP Relations">Press & VIP Relations</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      className={`uppercase tracking-wider text-[10px] block font-medium ${
                        isLight ? 'text-[#5C5449]' : 'text-[#8c8985]'
                      }`}
                    >
                      Message Dossier *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please specify notes preferences, recipient details, flacon engraving requirements, or preferred consultation dates..."
                      className={`w-full border px-4 py-3 focus:outline-none rounded-xs resize-none ${
                        isLight
                          ? 'border-[#E0D5C3] bg-[#FAF8F5] text-[#1A1816] focus:border-[#C5A059]'
                          : 'border-[#222222] bg-[#141414] text-white focus:border-[#C5A059]'
                      }`}
                    />
                  </div>

                  <div className="pt-2 space-y-3">
                    <button
                      type="submit"
                      className={`w-full py-4 transition-all uppercase tracking-[0.28em] font-medium text-[11px] cursor-pointer flex items-center justify-center gap-2 ${
                        isLight
                          ? 'bg-[#1A1816] text-[#FAF8F5] hover:bg-[#C5A059] hover:text-black'
                          : 'bg-white text-black hover:bg-[#C5A059] hover:text-black'
                      }`}
                    >
                      <span>TRANSMIT DOSSIER TO CONCIERGE</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={`https://wa.me/923132970468?text=${encodeURIComponent(
                        `Hello FUME Concierge, my name is ${formData.name || 'Patron'}${formData.email ? ` (${formData.email})` : ''}.\nInquiry category: ${formData.inquiryType}\nMessage:\n${formData.message || 'I would like to inquire regarding FUME haute fragrances.'}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-3.5 border transition-all uppercase tracking-[0.28em] font-medium text-[11px] cursor-pointer flex items-center justify-center gap-2 ${
                        isLight
                          ? 'border-[#C5A059] text-[#1A1816] hover:bg-[#C5A059]/10'
                          : 'border-[#C5A059] text-[#EAE2D5] hover:bg-[#C5A059]/10'
                      }`}
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>DIRECT INQUIRY VIA WHATSAPP (+92 313 297 0468)</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
