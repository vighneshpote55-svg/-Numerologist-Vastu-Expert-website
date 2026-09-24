import React from 'react';
import { Sparkles, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { generateWhatsAppLink } from '../../lib/validation';
import { trackEvent } from '../../lib/analytics';

interface FinalCTASectionProps {
  onOpenConsultationModal: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onOpenConsultationModal }) => {
  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', { source: 'final_cta' });
    const url = generateWhatsAppLink({
      fullName: '',
      consultationType: 'General Consultation',
      areaOfGuidance: 'Final CTA Consultation Request'
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-[#080A14] via-[#10152A] to-[#080A14] relative overflow-hidden">
      {/* Background radial gold aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(200,164,93,0.12)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        
        {/* Kicker */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#080A14] border border-[#C8A45D]/40 text-xs font-mono text-[#E8D5A8] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#C8A45D]" />
          <span>Harmonic Alignment</span>
        </div>

        {/* Headline */}
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#F7F4EC] tracking-tight leading-tight max-w-2xl mx-auto">
          Align Your Space & Life Path Today
        </h2>

        {/* Prose */}
        <p className="text-xs sm:text-sm text-[#9EA3B5] max-w-xl mx-auto leading-relaxed">
          Chaldean name correction, brand resonance, and 100% non-demolition Vastu remedies. Virtual & on-site advisory.
        </p>

        {/* Dual Primary CTAs */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => {
              trackEvent('consultation_cta_click', { source: 'final_cta_primary' });
              onOpenConsultationModal();
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] text-[#080A14] font-semibold text-base hover:from-[#d5b36e] hover:to-[#f0e0b9] transition-all shadow-[0_0_30px_rgba(200,164,93,0.4)] cursor-pointer active:scale-95 group"
          >
            <Sparkles className="w-4 h-4 text-[#080A14]" />
            <span>Book A Consultation</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            type="button"
            onClick={handleWhatsApp}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#10152A] hover:bg-[#161d36] border border-[#25D366]/50 hover:border-[#25D366] text-[#F7F4EC] font-medium text-base transition-all cursor-pointer shadow-md"
          >
            <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
            <span>WhatsApp Now (+91 9011023754)</span>
          </button>
        </div>

        {/* Direct Call & Trust line */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[#9EA3B5]">
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[#C8A45D]" />
            <span>Direct Call: </span>
            <a href="tel:+919011023754" className="text-[#E8D5A8] hover:underline font-mono">
              +91 9011023754
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#C8A45D]" />
            <span>Confidential & Private 1-on-1 Sessions</span>
          </div>
        </div>

      </div>
    </section>
  );
};
