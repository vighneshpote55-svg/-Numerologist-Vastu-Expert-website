import React from 'react';
import { Award, Compass, CheckCircle2, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { generateWhatsAppLink } from '../../lib/validation';
import { trackEvent } from '../../lib/analytics';

interface AboutSectionProps {
  onOpenConsultationModal: (serviceName?: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenConsultationModal }) => {
  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', { source: 'about' });
    const url = generateWhatsAppLink({
      fullName: '',
      consultationType: 'General Consultation',
      areaOfGuidance: 'About Archanna Consultation'
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const keyPoints = [
    {
      title: '15+ Years Experience',
      desc: 'Chaldean numerology, Pythagorean matrices & 16-zone Vedic Vastu Shastra.'
    },
    {
      title: '100% Non-Demolition',
      desc: 'Zero wall breakage; remedies via metallic energy strips, colors & light.'
    },
    {
      title: 'Zero Fear-Mongering',
      desc: 'Calm, rational, and constructive guidance empowering conscious action.'
    },
    {
      title: 'Global High-Rise Ready',
      desc: 'Tested on modern apartments, villas & offices across India, US, UK & UAE.'
    }
  ];

  return (
    <section id="about" className="py-16 lg:py-24 bg-[#080A14] border-t border-[#C8A45D]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Portrait Insignia Visual */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[380px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#10152A] to-[#080A14] border border-[#C8A45D]/30 shadow-xl p-6 sm:p-7 flex flex-col justify-between space-y-6">
              
              {/* Corner Ornamental Accents */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#C8A45D]" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#C8A45D]" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#C8A45D]" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#C8A45D]" />

              {/* Top Seal */}
              <div className="flex items-center justify-between border-b border-[#C8A45D]/20 pb-3 text-[10px] font-mono">
                <span className="tracking-widest uppercase text-[#C8A45D]">
                  Certified Practice
                </span>
                <span className="text-[#9EA3B5]">
                  Est. 2011 · Pune & Global
                </span>
              </div>

              {/* Central Emblem Art */}
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-24 h-24 rounded-full bg-[#10152A] border-2 border-[#C8A45D] flex items-center justify-center shadow-[0_0_25px_rgba(200,164,93,0.3)] relative">
                  <div className="w-16 h-16 rounded-full border border-[#E8D5A8]/30 flex items-center justify-center">
                    <span className="font-serif text-2xl font-semibold text-[#E8D5A8] tracking-wider">
                      AN
                    </span>
                  </div>
                  <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-[#C8A45D] animate-ping" />
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-medium text-[#F7F4EC]">
                    Archanna Nirrmale
                  </h3>
                  <p className="text-[11px] text-[#C8A45D] font-mono tracking-wider mt-0.5 uppercase">
                    Certified Numerologist & Vastu Expert
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                  <span className="px-2 py-0.5 rounded bg-[#10152A] border border-[#C8A45D]/20 text-[10px] text-[#E8D5A8]">
                    Chaldean Numerology
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#10152A] border border-[#C8A45D]/20 text-[10px] text-[#E8D5A8]">
                    16-Zone Mahavastu
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#10152A] border border-[#C8A45D]/20 text-[10px] text-[#E8D5A8]">
                    Zero Demolition
                  </span>
                </div>
              </div>

              {/* Bottom Credential Bar */}
              <div className="border-t border-[#C8A45D]/20 pt-3 flex justify-between items-center text-xs">
                <div className="flex items-center gap-1.5 text-[#E8D5A8] text-[11px]">
                  <Award className="w-3.5 h-3.5 text-[#C8A45D]" />
                  <span>500+ Consultations</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#E8D5A8] text-[11px]">
                  <Compass className="w-3.5 h-3.5 text-[#C8A45D]" />
                  <span>15+ Yrs Practice</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Key Points */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-1.5">
              <span className="text-xs uppercase tracking-[0.2em] text-[#C8A45D] font-mono">
                About Archanna Nirrmale
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#F7F4EC] leading-tight">
                Vedic Wisdom, Non-Demolition Precision
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#9EA3B5] leading-relaxed">
              15+ years guiding founders, corporate executives, and homeowners across India, the US, UK, and UAE. Practical, scientific alignment combining ancient Vedic principles with modern architecture.
            </p>

            {/* Core Pillars 4-grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {keyPoints.map((p, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#10152A]/80 border border-white/5 space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A45D] shrink-0" />
                    <h4 className="text-xs font-semibold text-[#F7F4EC]">{p.title}</h4>
                  </div>
                  <p className="text-[11px] text-[#9EA3B5] leading-relaxed pl-5.5">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  trackEvent('consultation_cta_click', { source: 'about_section' });
                  onOpenConsultationModal('Personal Consultation with Archanna');
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] text-[#080A14] font-semibold text-xs hover:from-[#d8b56f] hover:to-[#f0e2be] transition-all shadow-sm cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Book Consultation</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsApp}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#10152A] hover:bg-[#161e38] border border-[#C8A45D]/30 text-[#E8D5A8] font-medium text-xs transition-all cursor-pointer"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Direct WhatsApp</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
