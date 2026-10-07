import React, { useState } from 'react';
import { ThemeMode } from '../types';
import { Mail, Clock, Check, Send, MessageCircle, MapPin } from 'lucide-react';

interface ContactViewProps {
  onNavigateToCare: () => void;
  themeMode: ThemeMode;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigateToCare }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Bespoke Flacon Commission',
    message: ''
  });

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
      className="relative w-full min-h-screen pt-32 pb-32 px-5 sm:px-8 md:px-12 lg:px-16 bg-pearl text-shadow font-sans"
    >
      <div className="max-w-[1400px] mx-auto space-y-20">
        {/* Header with Breadcrumb */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.4em] text-dusty-rose font-medium">
            <span>HOME</span>
            <span>/</span>
            <span>CLIENT CONCIERGE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-dusty-rose ml-1" />
            <span>EST. 2024</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal uppercase tracking-[0.16em] text-shadow">
            ATELIER CONCIERGE
          </h1>

          <p className="text-sm sm:text-base font-normal tracking-wide leading-relaxed text-shadow/80 max-w-xl mx-auto">
            Olfactory consultations, bespoke flacon commissions, and direct customer care across Pakistan.
          </p>
        </div>

        {/* 2-Column Layout: Atelier Details & Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Channels & Studio */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.35em] text-dusty-rose font-semibold block">
                ATELIER &amp; STUDIO • EST. 2024
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl uppercase tracking-wider text-shadow">
                DIRECT CONTACT
              </h2>
            </div>

            {/* Studio Address Card */}
            <div className="p-8 border border-shadow/[0.1] rounded-sm space-y-4 bg-white shadow-xs">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg uppercase tracking-wider text-dusty-rose">
                  CREATION STUDIO
                </h3>
                <span className="text-[9px] uppercase tracking-widest px-2.5 py-1 border border-dusty-rose/40 text-dusty-rose font-medium rounded-2xs">
                  BY APPOINTMENT
                </span>
              </div>
              
              <div className="flex items-start gap-3 text-xs leading-relaxed text-shadow">
                <MapPin className="w-4 h-4 text-dusty-rose shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium">FUME FRAGRANCES STUDIO</span>
                  <span className="block text-shadow/80">32/A Society Office, PECHS Block 2, Kashmir Road, Karachi</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-shadow/70 pt-2 border-t border-shadow/[0.06]">
                <Clock className="w-4 h-4 text-dusty-rose shrink-0" />
                <span>Monday – Saturday • 10:00 to 19:00 PKT</span>
              </div>
            </div>

            {/* Direct Channels */}
            <div className="p-8 border border-shadow/[0.1] rounded-sm space-y-5 bg-[#F8F5F1]">
              <h3 className="font-serif text-sm uppercase tracking-widest text-dusty-rose font-medium">
                VERIFIED COMMUNICATIONS
              </h3>

              <div className="space-y-4 text-xs font-sans">
                <a
                  href="mailto:jiaaryan20@gmail.com"
                  className="flex items-center gap-3 hover:text-dusty-rose transition-colors group p-3 bg-white rounded-xs border border-shadow/[0.04]"
                >
                  <Mail className="w-4 h-4 text-dusty-rose shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">jiaaryan20@gmail.com</span>
                </a>
                
                <a
                  href="https://wa.me/92381825636"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-dusty-rose transition-colors group p-3 bg-white rounded-xs border border-shadow/[0.04]"
                >
                  <MessageCircle className="w-4 h-4 text-dusty-rose shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">WhatsApp: +92 381 825 636</span>
                </a>
              </div>

              <div className="pt-4 border-t border-shadow/[0.08]">
                <button
                  onClick={onNavigateToCare}
                  className="text-[10px] uppercase tracking-widest text-dusty-rose hover:underline cursor-pointer font-medium"
                >
                  View Client Care &amp; Shipping Guidelines →
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Dossier Form */}
          <div className="lg:col-span-7">
            <div className="border border-shadow/[0.1] p-8 sm:p-12 rounded-sm shadow-md space-y-8 bg-white">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.35em] text-dusty-rose font-semibold block">
                  CLIENT COMMUNICATIONS
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal uppercase tracking-wide text-shadow">
                  TRANSMIT AN INQUIRY
                </h3>
                <p className="text-xs font-sans text-shadow/80">
                  Our fragrance concierge will analyze your request and reply promptly within working hours.
                </p>
              </div>

              {submitted ? (
                <div className="py-16 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full border border-dusty-rose flex items-center justify-center mx-auto text-dusty-rose">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-2xl uppercase tracking-wider text-shadow">
                    INQUIRY DISPATCHED
                  </h4>
                  <p className="text-xs sm:text-sm font-sans max-w-md mx-auto leading-relaxed text-shadow/80">
                    Thank you, {formData.name || 'Patron'}. Your inquiry regarding{' '}
                    <span className="text-dusty-rose font-medium">&quot;{formData.inquiryType}&quot;</span> has been received.
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-6 px-8 py-3.5 bg-shadow text-pearl hover:bg-dusty-rose text-[10px] uppercase tracking-[0.25em] font-semibold cursor-pointer transition-colors"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="uppercase tracking-wider text-[10px] block font-medium text-shadow">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your Full Name"
                        className="w-full border border-shadow/[0.15] bg-[#FAF8F5] px-4 py-3.5 text-shadow focus:border-dusty-rose focus:outline-none rounded-xs"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="uppercase tracking-wider text-[10px] block font-medium text-shadow">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@email.com"
                        className="w-full border border-shadow/[0.15] bg-[#FAF8F5] px-4 py-3.5 text-shadow focus:border-dusty-rose focus:outline-none rounded-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="uppercase tracking-wider text-[10px] block font-medium text-shadow">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+92 300 0000000"
                        className="w-full border border-shadow/[0.15] bg-[#FAF8F5] px-4 py-3.5 text-shadow focus:border-dusty-rose focus:outline-none rounded-xs"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="uppercase tracking-wider text-[10px] block font-medium text-shadow">
                        Inquiry Category
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) =>
                          setFormData({ ...formData, inquiryType: e.target.value })
                        }
                        className="w-full border border-shadow/[0.15] bg-[#FAF8F5] px-4 py-3.5 text-shadow focus:border-dusty-rose focus:outline-none rounded-xs cursor-pointer"
                      >
                        <option value="Bespoke Flacon Commission">Bespoke Flacon Commission</option>
                        <option value="Studio Appointment">Studio Appointment</option>
                        <option value="Private Consultation">Private Consultation</option>
                        <option value="Existing Order Status">Existing Order Status</option>
                        <option value="Fragrance Note Recommendation">Fragrance Note Recommendation</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="uppercase tracking-wider text-[10px] block font-medium text-shadow">
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your olfactory preferences, custom engraving requests, or order details..."
                      className="w-full border border-shadow/[0.15] bg-[#FAF8F5] px-4 py-3.5 text-shadow focus:border-dusty-rose focus:outline-none rounded-xs resize-none"
                    />
                  </div>

                  <div className="pt-2 space-y-3">
                    <button
                      type="submit"
                      className="w-full py-4 uppercase tracking-[0.28em] font-semibold text-[11px] cursor-pointer flex items-center justify-center gap-2 bg-shadow text-pearl hover:bg-dusty-rose transition-colors shadow-sm active:scale-[0.98]"
                    >
                      <span>TRANSMIT INQUIRY</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={`https://wa.me/92381825636?text=${encodeURIComponent(
                        `Hello FUME Concierge, my name is ${formData.name || 'Patron'}${formData.email ? ` (${formData.email})` : ''}.\nInquiry category: ${formData.inquiryType}\nMessage:\n${formData.message || 'I would like to inquire regarding FUME fragrances.'}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 border border-dusty-rose text-shadow hover:bg-dusty-rose/10 uppercase tracking-[0.26em] font-medium text-[10px] cursor-pointer flex items-center justify-center gap-2 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-dusty-rose" />
                      <span>DIRECT CHAT VIA WHATSAPP (+92 381 825 636)</span>
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
