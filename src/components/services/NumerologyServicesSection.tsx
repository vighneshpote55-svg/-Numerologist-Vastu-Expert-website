import React from 'react';
import { NUMEROLOGY_SERVICES } from '../../data/servicesData';
import { ServiceItem } from '../../types';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { generateWhatsAppLink } from '../../lib/validation';
import { trackEvent } from '../../lib/analytics';

interface NumerologyServicesSectionProps {
  onOpenConsultationModal: (serviceName?: string) => void;
}

export const NumerologyServicesSection: React.FC<NumerologyServicesSectionProps> = ({
  onOpenConsultationModal
}) => {
  const handleWhatsApp = (service: ServiceItem) => {
    trackEvent('whatsapp_click', { service: service.title });
    const url = generateWhatsAppLink({
      fullName: '',
      consultationType: 'Numerology',
      areaOfGuidance: service.title
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="numerology" className="py-16 lg:py-24 bg-[#10152A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#080A14] border border-[#C8A45D]/30 text-xs font-mono text-[#E8D5A8] uppercase tracking-wider">
            <span>Specialized Advisory</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#F7F4EC]">
            Numerology Services
          </h2>
          <p className="text-xs sm:text-sm text-[#9EA3B5]">
            Chaldean & Pythagorean vibrational alignment for individuals, brands, and corporate ventures.
          </p>
        </div>

        {/* Master Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {NUMEROLOGY_SERVICES.map(service => (
            <div
              key={service.id}
              className="flex flex-col justify-between p-5 rounded-xl bg-[#080A14]/90 border border-[#C8A45D]/25 hover:border-[#C8A45D]/60 transition-all hover:shadow-[0_8px_30px_rgba(200,164,93,0.12)] group"
            >
              <div className="space-y-3">
                {/* Highlight & Title */}
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#C8A45D] font-semibold block">
                    {service.highlight}
                  </span>
                  <h3 className="font-serif text-lg font-medium text-[#F7F4EC] group-hover:text-[#E8D5A8] transition-colors mt-0.5">
                    {service.title}
                  </h3>
                  <p className="text-[11px] text-[#E8D5A8]/80 mt-0.5">
                    {service.tagline}
                  </p>
                </div>

                {/* Crisp Description */}
                <p className="text-xs text-[#9EA3B5] leading-relaxed border-t border-white/5 pt-2.5">
                  {service.description}
                </p>

                {/* Key Deliverables Tags */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#9EA3B5] block">
                    Key Deliverables:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {service.deliverables.map((item, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#10152A] border border-white/10 text-[10px] text-[#E8D5A8]"
                      >
                        <CheckCircle2 className="w-2.5 h-2.5 text-[#C8A45D]" />
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Info Required Pill */}
                <div className="text-[10px] text-[#9EA3B5] font-mono pt-1">
                  <span className="text-[#C8A45D]">Required: </span>
                  {service.requirements.join(' · ')}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => {
                    trackEvent('consultation_cta_click', { service: service.title });
                    onOpenConsultationModal(service.title);
                  }}
                  className="flex-1 py-2 px-3 rounded-lg bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] text-[#080A14] text-xs font-semibold hover:from-[#d8b56f] hover:to-[#f0e2be] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Book Service</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleWhatsApp(service)}
                  className="p-2 rounded-lg bg-[#10152A] hover:bg-[#161d36] border border-[#25D366]/40 text-[#25D366] transition-colors cursor-pointer"
                  title={`Enquire on WhatsApp about ${service.title}`}
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
