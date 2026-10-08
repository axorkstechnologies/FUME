import React, { useState } from 'react';
import { Mail, MessageCircle, MapPin, ArrowRight } from 'lucide-react';
import { ThemeMode } from '../types';

interface ContactViewProps {
  themeMode: ThemeMode;
}

export const ContactView: React.FC<ContactViewProps> = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'Bespoke Order',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        inquiryType: 'Bespoke Order',
        message: ''
      });
    }, 4000);
  };

  return (
    <div className="relative w-full min-h-screen pt-32 pb-32 px-5 sm:px-8 md:px-12 lg:px-16 bg-pearl text-shadow">
      <div className="max-w-[1400px] mx-auto space-y-16 md:space-y-24">
        
        {/* Header */}
        <div className="text-center space-y-5 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.45em] text-shadow/60 font-sans font-medium block">
              PRIVATE CLIENT SERVICES
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal uppercase tracking-[0.16em] text-shadow">
            THE CONCIERGE
          </h1>
          <p className="text-xs sm:text-sm font-sans font-normal tracking-wider max-w-lg mx-auto text-shadow/80 leading-relaxed">
            For bespoke commissions, private viewing arrangements, and international dispatch inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Contact Details */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="font-serif text-2xl uppercase tracking-[0.14em]">
                DIRECT CORRESPONDENCE
              </h2>
              <p className="text-sm font-sans font-light leading-relaxed text-shadow/80 max-w-md">
                Our advisors are available to assist you with fragrance profiling, bespoke formulations, and securing reserved allocations.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-none bg-shadow/5 flex flex-col items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4 text-shadow" />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-shadow">WHATSAPP CONCIERGE</span>
                  <a href="https://wa.me/923281825636" target="_blank" rel="noreferrer" className="block text-sm font-sans tracking-widest hover:text-shadow/60 transition-colors">
                    +92 328 182 5636
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-none bg-shadow/5 flex flex-col items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-shadow" />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-shadow">EMAIL CORRESPONDENCE</span>
                  <a href="mailto:concierge@fumefragrances.com" className="block text-sm font-sans tracking-widest hover:text-shadow/60 transition-colors">
                    concierge@fumefragrances.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-none bg-shadow/5 flex flex-col items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-shadow" />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-shadow">THE ATELIER</span>
                  <p className="text-sm font-sans tracking-widest leading-relaxed">
                    Studio PECHS Block 2<br />
                    Karachi, Pakistan<br />
                    <span className="text-[10px] text-shadow/60 mt-1 block">STRICTLY BY PRIVATE APPOINTMENT</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-oyster/30 p-8 sm:p-12 border border-shadow/[0.05]">
            {submitted ? (
              <div className="py-24 text-center space-y-6 animate-in fade-in">
                <div className="w-16 h-16 rounded-none bg-shadow/5 flex items-center justify-center mx-auto">
                  <MessageCircle className="w-6 h-6 text-shadow" />
                </div>
                <h3 className="font-serif text-2xl uppercase tracking-[0.14em]">
                  INQUIRY RECEIVED
                </h3>
                <p className="text-sm font-sans font-light leading-relaxed text-shadow/80 max-w-xs mx-auto">
                  Your dossier has been transmitted. A FUME olfactory advisor will respond shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[10px] uppercase tracking-[0.3em] font-semibold text-shadow ml-1">
                    CLIENT NAME
                  </label>
                  <input
                    id="name"
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b border-shadow/20 px-1 py-3 text-sm font-sans tracking-widest focus:outline-none focus:border-shadow transition-colors rounded-none"
                    placeholder="ENTER YOUR FULL NAME"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-[10px] uppercase tracking-[0.3em] font-semibold text-shadow ml-1">
                    EMAIL ADDRESS
                  </label>
                  <input
                    id="email"
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-b border-shadow/20 px-1 py-3 text-sm font-sans tracking-widest focus:outline-none focus:border-shadow transition-colors rounded-none"
                    placeholder="YOUR@EMAIL.COM"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="inquiryType" className="text-[10px] uppercase tracking-[0.3em] font-semibold text-shadow ml-1">
                    SUBJECT OF INQUIRY
                  </label>
                  <select
                    id="inquiryType"
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full bg-transparent border-b border-shadow/20 px-1 py-3 text-sm font-sans tracking-widest focus:outline-none focus:border-shadow transition-colors rounded-none cursor-pointer"
                  >
                    <option value="Bespoke Order">Bespoke Flacon Order</option>
                    <option value="Consultation">Scent Profile Consultation</option>
                    <option value="Order Tracking">Dispatch Tracking</option>
                    <option value="Press / Partnerships">Press & Partnerships</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-[10px] uppercase tracking-[0.3em] font-semibold text-shadow ml-1">
                    MESSAGE
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent border-b border-shadow/20 px-1 py-3 text-sm font-sans tracking-widest focus:outline-none focus:border-shadow transition-colors resize-none rounded-none"
                    placeholder="HOW MAY WE ASSIST YOU?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-5 bg-shadow text-pearl hover:bg-shadow/90 text-[10px] uppercase tracking-[0.3em] font-sans transition-all duration-300 flex items-center justify-center gap-4"
                >
                  <span>TRANSMIT DOSSIER</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
