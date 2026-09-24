import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { generateWhatsAppLink } from '../../lib/validation';
import { trackEvent } from '../../lib/analytics';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [guidanceArea, setGuidanceArea] = useState('Personal & Career Guidance');
  const [consultationType, setConsultationType] = useState('Numerology');

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    trackEvent('whatsapp_click', {
      source: 'floating_widget',
      consultationType
    });

    const url = generateWhatsAppLink({
      fullName: name.trim(),
      dateOfBirth: dob.trim(),
      consultationType,
      areaOfGuidance: guidanceArea
    });

    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const handleDirectClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end max-w-[calc(100vw-2rem)]">
      {/* WhatsApp Quick Form Popover */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] max-w-sm sm:w-96 rounded-2xl bg-[#10152A] border border-[#C8A45D]/40 shadow-[0_10px_40px_rgba(0,0,0,0.7)] p-4 text-[#F7F4EC] transition-all animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center text-[#080A14] font-bold shadow-md">
                <WhatsAppIcon className="w-5 h-5 text-[#080A14]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold font-serif tracking-wide text-[#F7F4EC]">
                  Archanna Nirrmale
                </h4>
                <p className="text-[11px] text-[#25D366] flex items-center gap-1 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                  Direct Consultation Desk
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Close WhatsApp prompt"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSend} className="mt-3 space-y-2.5 text-xs">
            <div>
              <label className="block text-[11px] text-[#9EA3B5] mb-1">Your Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Vikram Sharma"
                className="w-full px-3 py-2 rounded-lg bg-[#080A14] border border-[#C8A45D]/20 text-[#F7F4EC] focus:border-[#C8A45D] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] text-[#9EA3B5] mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={e => setDob(e.target.value)}
                  className="w-full px-2 py-2 rounded-lg bg-[#080A14] border border-[#C8A45D]/20 text-[#F7F4EC] focus:border-[#C8A45D] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#9EA3B5] mb-1">Consultation</label>
                <select
                  value={consultationType}
                  onChange={e => setConsultationType(e.target.value)}
                  className="w-full px-2 py-2 rounded-lg bg-[#080A14] border border-[#C8A45D]/20 text-[#F7F4EC] focus:border-[#C8A45D] focus:outline-none"
                >
                  <option value="Numerology">Numerology</option>
                  <option value="Vastu">Vastu</option>
                  <option value="Numerology + Vastu">Numerology + Vastu</option>
                  <option value="Business Consultation">Business Naming</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-[#9EA3B5] mb-1">Area you need guidance with</label>
              <input
                type="text"
                value={guidanceArea}
                onChange={e => setGuidanceArea(e.target.value)}
                placeholder="e.g. Career change, home layout, brand name"
                className="w-full px-3 py-2 rounded-lg bg-[#080A14] border border-[#C8A45D]/20 text-[#F7F4EC] focus:border-[#C8A45D] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-2.5 px-4 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-[#080A14] font-semibold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Pre-filled WhatsApp (+91 9011023754)</span>
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        type="button"
        onClick={handleDirectClick}
        className="group flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-[#080A14] shadow-[0_4px_25px_rgba(37,211,102,0.4)] transition-all hover:scale-105 active:scale-95 cursor-pointer font-medium text-xs sm:text-sm"
        title="Chat with Archanna Nirrmale on WhatsApp (9011023754)"
        aria-label="WhatsApp Archanna Nirrmale"
      >
        <WhatsAppIcon className="w-5 h-5 text-[#080A14]" />
        <span className="hidden sm:inline font-semibold">WhatsApp Now</span>
      </button>
    </div>
  );
};
