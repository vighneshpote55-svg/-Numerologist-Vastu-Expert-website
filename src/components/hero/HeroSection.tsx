import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Compass, Phone } from 'lucide-react';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { NumericalUniverse } from '../three/NumericalUniverse';
import { generateWhatsAppLink } from '../../lib/validation';
import { trackEvent } from '../../lib/analytics';

interface HeroSectionProps {
  activeNumber: number;
  onSelectNumber: (num: number) => void;
  onOpenConsultationModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeNumber,
  onSelectNumber,
  onOpenConsultationModal
}) => {
  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', { source: 'hero' });
    const url = generateWhatsAppLink({
      fullName: '',
      consultationType: 'General Consultation',
      areaOfGuidance: 'Personal & Professional Guidance'
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden pt-6 pb-12 lg:py-16">
      {/* Background ambient radial gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[#C8A45D]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-[#10152A] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT: Text + CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Kicker Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10152A] border border-[#C8A45D]/30 text-xs font-mono tracking-wider text-[#E8D5A8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45D] animate-ping" />
              <span>15+ YEARS OF PRACTICE · CERTIFIED EXPERT</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h2 className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#C8A45D] font-medium">
                Archanna Nirrmale
              </h2>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#F7F4EC] leading-[1.12] text-balance">
                Vedic Numerology & Non-Demolition Vastu
              </h1>
            </div>

            {/* Sub-headline prose - Crisp & Key Points */}
            <p className="text-xs sm:text-sm text-[#9EA3B5] leading-relaxed max-w-xl">
              Practical spatial harmony and Chaldean name alignment for founders, businesses, and homes. 100% non-demolition remedies across India and globally.
            </p>

            {/* Key Service Highlights */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Chaldean Matrix', '16 Mahavastu Zones', 'Zero Demolition', 'Brand & Company Naming', 'Pune & Global Online'].map((kw, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-[#10152A] border border-[#C8A45D]/25 text-[11px] text-[#E8D5A8] font-mono"
                >
                  {kw}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              {/* Primary: Book A Consultation */}
              <button
                type="button"
                onClick={() => {
                  trackEvent('consultation_cta_click', { source: 'hero_primary' });
                  onOpenConsultationModal();
                }}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] text-[#080A14] font-medium text-sm sm:text-base hover:from-[#d5b36e] hover:to-[#f0e0b9] transition-all shadow-[0_4px_25px_rgba(200,164,93,0.35)] cursor-pointer active:scale-95 group"
              >
                <Sparkles className="w-4 h-4 text-[#080A14]" />
                <span className="font-semibold">Book A Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary: WhatsApp Now */}
              <button
                type="button"
                onClick={handleWhatsApp}
                className="flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-lg bg-[#10152A] hover:bg-[#161d3a] border border-[#25D366]/40 hover:border-[#25D366] text-[#F7F4EC] font-medium text-sm sm:text-base transition-all cursor-pointer shadow-sm"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Now</span>
              </button>
            </div>

            {/* Fast Trust Indicators */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#9EA3B5]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C8A45D]" />
                <span>100% Non-Demolition Solutions</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#C8A45D]" />
                <span>Chaldean & Pythagorean Models</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#C8A45D]" />
                <a href="tel:+919011023754" className="hover:text-[#E8D5A8] font-mono">
                  +91 9011023754
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: Interactive 3D Numerical Universe */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="w-full max-w-[500px] aspect-square min-h-[280px] max-h-[500px] flex items-center justify-center">
              <NumericalUniverse
                activeNumber={activeNumber}
                onSelectNumber={onSelectNumber}
                className="w-full h-full shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
