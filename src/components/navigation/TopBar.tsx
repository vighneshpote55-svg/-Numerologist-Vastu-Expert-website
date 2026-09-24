import React, { useState } from 'react';
import { Phone, Menu, X, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { generateWhatsAppLink } from '../../lib/validation';
import { trackEvent } from '../../lib/analytics';
import { ThemeToggle } from '../common/ThemeToggle';

interface TopBarProps {
  onOpenConsultationModal: () => void;
  onOpenLeadManager?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenConsultationModal, onOpenLeadManager }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', { source: 'topbar' });
    const url = generateWhatsAppLink({
      fullName: '',
      consultationType: 'General Consultation',
      areaOfGuidance: 'Personal & Professional Growth'
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Numerology', href: '#numerology' },
    { label: 'Vastu', href: '#vastu' },
    { label: 'Calculators', href: '#tools' },
    { label: 'Packages', href: '#packages' },
    { label: 'Case Studies', href: '#case-studies' },
    { label: 'Insights', href: '#insights' },
    { label: 'FAQ', href: '#faq' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#080A14]/90 backdrop-blur-md border-b border-[#C8A45D]/15 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="group flex flex-col focus:outline-none"
          title="Archanna Nirrmale – Home"
        >
          <span className="font-serif text-xl sm:text-2xl tracking-[0.18em] text-[#F7F4EC] group-hover:text-[#E8D5A8] transition-colors uppercase font-medium">
            Archanna Nirrmale
          </span>
          <span className="text-[10px] tracking-[0.25em] text-[#C8A45D] uppercase font-sans">
            Certified Numerologist & Vastu Expert
          </span>
        </a>

        {/* Zone 2: 4–6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#9EA3B5]">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#F7F4EC] transition-colors relative py-1 focus-visible:outline-none focus-visible:text-[#C8A45D]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1–2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Quick Call */}
          <a
            href="tel:+919011023754"
            onClick={() => trackEvent('phone_click', { source: 'topbar' })}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#E8D5A8] hover:text-white border border-[#C8A45D]/25 hover:border-[#C8A45D]/60 rounded-md transition-colors whitespace-nowrap"
            title="Call +91 9011023754"
          >
            <Phone className="w-3.5 h-3.5 text-[#C8A45D]" />
            <span className="font-mono text-xs">9011023754</span>
          </a>

          {/* Secondary Conversion: WhatsApp Now */}
          <button
            type="button"
            onClick={handleWhatsApp}
            className="hidden md:flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#080A14] bg-[#25D366] hover:bg-[#20ba5a] rounded-md transition-colors whitespace-nowrap shadow-sm cursor-pointer"
            title="Chat directly on WhatsApp"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
            <span>WhatsApp Now</span>
          </button>

          {/* Theme Toggle: Dark / High-Contrast Light */}
          <ThemeToggle />

          {/* Primary Conversion: Book A Consultation */}
          <button
            type="button"
            onClick={() => {
              trackEvent('consultation_cta_click', { source: 'topbar' });
              onOpenConsultationModal();
            }}
            className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-medium text-[#080A14] bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] hover:from-[#d5b36e] hover:to-[#f0e0b9] rounded-md transition-all shadow-[0_0_15px_rgba(200,164,93,0.25)] whitespace-nowrap cursor-pointer active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#080A14]" />
            <span>Book Consultation</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#E8D5A8] hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Adhering to 15% mobile sticky cap rule) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#080A14]/98 border-b border-[#C8A45D]/20 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm font-medium text-[#9EA3B5]">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded hover:bg-[#10152A] hover:text-[#F7F4EC] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs text-[#9EA3B5]">Appearance Theme</span>
              <ThemeToggle showLabel />
            </div>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handleWhatsApp();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold rounded bg-[#25D366] text-[#080A14]"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>WhatsApp Archanna (9011023754)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultationModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold rounded bg-[#C8A45D] text-[#080A14]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book A Consultation</span>
            </button>
          </div>

          {onOpenLeadManager && (
            <div className="text-right pt-1">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLeadManager();
                }}
                className="text-[11px] text-[#9EA3B5] hover:text-[#E8D5A8] underline"
              >
                Lead Manager Console
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
