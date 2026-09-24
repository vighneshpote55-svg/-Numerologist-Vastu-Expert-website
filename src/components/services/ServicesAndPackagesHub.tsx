import React, { useState, useEffect } from 'react';
import { NUMEROLOGY_SERVICES, VASTU_SERVICES } from '../../data/servicesData';
import { CONSULTATION_PACKAGES, ConsultationPackage } from '../../data/packagesData';
import { ServiceItem } from '../../types';
import { Sparkles, Compass, CheckCircle2, Clock, FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { generateWhatsAppLink } from '../../lib/validation';
import { trackEvent } from '../../lib/analytics';

interface ServicesAndPackagesHubProps {
  onOpenConsultationModal: (serviceName?: string) => void;
  defaultTab?: 'numerology' | 'vastu' | 'packages';
}

export const ServicesAndPackagesHub: React.FC<ServicesAndPackagesHubProps> = ({
  onOpenConsultationModal,
  defaultTab = 'numerology'
}) => {
  const [activeTab, setActiveTab] = useState<'numerology' | 'vastu' | 'packages'>(defaultTab);
  const [numerologyCategory, setNumerologyCategory] = useState<'all' | 'personal' | 'business'>('all');

  // Handle URL hash changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#numerology') setActiveTab('numerology');
      else if (hash === '#vastu') setActiveTab('vastu');
      else if (hash === '#packages') setActiveTab('packages');
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleWhatsApp = (title: string, type: 'Numerology' | 'Vastu' | 'Package') => {
    trackEvent('whatsapp_click', { service: title, type });
    const url = generateWhatsAppLink({
      fullName: '',
      consultationType: type === 'Package' ? 'Package Advisory' : type,
      areaOfGuidance: title
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const filteredNumerology = NUMEROLOGY_SERVICES.filter(s => {
    if (numerologyCategory === 'all') return true;
    if (numerologyCategory === 'personal') {
      return (
        s.id.includes('personal') ||
        s.id.includes('name-correction') ||
        s.id.includes('baby') ||
        s.id.includes('mobile') ||
        s.id.includes('career')
      );
    }
    if (numerologyCategory === 'business') {
      return (
        s.id.includes('business') ||
        s.id.includes('partnership') ||
        s.id.includes('corporate') ||
        s.id.includes('vehicle') ||
        s.id.includes('signature')
      );
    }
    return true;
  });

  return (
    <section id="services" className="py-16 lg:py-24 bg-gradient-to-b from-[#080A14] via-[#0C1022] to-[#080A14] relative border-t border-[#C8A45D]/15">
      {/* Anchor targets */}
      <span id="numerology" className="absolute -top-24 pointer-events-none" />
      <span id="vastu" className="absolute -top-24 pointer-events-none" />
      <span id="packages" className="absolute -top-24 pointer-events-none" />

      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(200,164,93,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10152A] border border-[#C8A45D]/30 text-xs font-mono text-[#E8D5A8] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A45D]" />
            <span>Specialized Advisory & Tiers</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#F7F4EC] tracking-tight">
            Consultation Services & Packages
          </h2>

          <p className="text-xs sm:text-sm text-[#9EA3B5] leading-relaxed max-w-2xl mx-auto">
            Explore authentic Chaldean & Pythagorean numerology, 100% non-demolition Vastu Shastra, or choose a curated all-in-one consultation tier.
          </p>
        </div>

        {/* Master Tab Control */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#10152A]/90 border border-[#C8A45D]/30 shadow-xl backdrop-blur-md gap-1 max-w-full overflow-x-auto">
            
            <button
              type="button"
              onClick={() => {
                setActiveTab('numerology');
                trackEvent('service_tab_switch', { tab: 'numerology' });
              }}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'numerology'
                  ? 'bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] text-[#080A14] shadow-md scale-102'
                  : 'text-[#9EA3B5] hover:text-[#F7F4EC] hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Numerology (11 Services)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('vastu');
                trackEvent('service_tab_switch', { tab: 'vastu' });
              }}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'vastu'
                  ? 'bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] text-[#080A14] shadow-md scale-102'
                  : 'text-[#9EA3B5] hover:text-[#F7F4EC] hover:bg-white/5'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Vastu Shastra (8 Services)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('packages');
                trackEvent('service_tab_switch', { tab: 'packages' });
              }}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'packages'
                  ? 'bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] text-[#080A14] shadow-md scale-102'
                  : 'text-[#9EA3B5] hover:text-[#F7F4EC] hover:bg-white/5'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Curated Packages (4 Tiers)</span>
            </button>

          </div>
        </div>

        {/* TAB 1: NUMEROLOGY SERVICES */}
        {activeTab === 'numerology' && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
            {/* Quick Filter */}
            <div className="flex items-center justify-between flex-wrap gap-3 border-b border-white/10 pb-3">
              <span className="text-xs font-mono text-[#C8A45D] uppercase tracking-wider">
                Showing {filteredNumerology.length} Numerology Specializations
              </span>
              <div className="flex gap-1.5">
                {(['all', 'personal', 'business'] as const).map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setNumerologyCategory(c)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-all cursor-pointer ${
                      numerologyCategory === c
                        ? 'bg-[#C8A45D] text-[#080A14] font-semibold'
                        : 'bg-[#10152A] text-[#9EA3B5] hover:text-[#F7F4EC] border border-white/5'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNumerology.map(service => (
                <div
                  key={service.id}
                  className="flex flex-col justify-between p-5 rounded-xl bg-[#10152A]/90 border border-[#C8A45D]/25 hover:border-[#C8A45D]/60 transition-all hover:shadow-[0_8px_30px_rgba(200,164,93,0.12)] group hover:-translate-y-0.5"
                >
                  <div className="space-y-2.5">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#C8A45D] font-semibold block">
                        {service.highlight}
                      </span>
                      <h3 className="font-serif text-lg font-medium text-[#F7F4EC] group-hover:text-[#E8D5A8] transition-colors mt-0.5">
                        {service.title}
                      </h3>
                      <p className="text-[11px] text-[#E8D5A8]/80 mt-0.5 line-clamp-1">
                        {service.tagline}
                      </p>
                    </div>

                    <p className="text-xs text-[#9EA3B5] leading-relaxed border-t border-white/5 pt-2">
                      {service.description}
                    </p>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#9EA3B5] block">
                        Deliverables:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {service.deliverables.map((item, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#080A14] border border-white/10 text-[10px] text-[#E8D5A8]"
                          >
                            <CheckCircle2 className="w-2.5 h-2.5 text-[#C8A45D]" />
                            <span>{item}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-[10px] text-[#9EA3B5] font-mono">
                      <span className="text-[#C8A45D]">Required: </span>
                      {service.requirements.join(' · ')}
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenConsultationModal(service.title)}
                      className="flex-1 py-2 px-3 rounded-lg bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] text-[#080A14] text-xs font-semibold hover:from-[#d8b56f] hover:to-[#f0e2be] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Book Service</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleWhatsApp(service.title, 'Numerology')}
                      className="p-2 rounded-lg bg-[#080A14] hover:bg-[#161d36] border border-[#25D366]/40 text-[#25D366] transition-colors cursor-pointer"
                      title={`Enquire on WhatsApp about ${service.title}`}
                    >
                      <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: VASTU SERVICES */}
        {activeTab === 'vastu' && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono text-[#C8A45D] uppercase tracking-wider">
                8 Non-Demolition Vastu Shastra Protocols
              </span>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                100% Zero Demolition Guarantee
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {VASTU_SERVICES.map(service => (
                <div
                  key={service.id}
                  className="flex flex-col justify-between p-5 rounded-xl bg-[#10152A]/90 border border-[#C8A45D]/20 hover:border-[#C8A45D]/60 transition-all hover:shadow-[0_8px_30px_rgba(200,164,93,0.12)] group hover:-translate-y-0.5"
                >
                  <div className="space-y-2.5">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#C8A45D] font-semibold block">
                        {service.highlight}
                      </span>
                      <h3 className="font-serif text-lg font-medium text-[#F7F4EC] group-hover:text-[#E8D5A8] transition-colors leading-snug mt-0.5">
                        {service.title}
                      </h3>
                      <p className="text-[11px] text-[#E8D5A8]/80 mt-0.5 line-clamp-1">
                        {service.tagline}
                      </p>
                    </div>

                    <p className="text-xs text-[#9EA3B5] leading-relaxed border-t border-white/5 pt-2">
                      {service.description}
                    </p>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#9EA3B5] block">
                        Deliverables:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {service.deliverables.map((item, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#080A14] border border-white/10 text-[10px] text-[#E8D5A8]"
                          >
                            <CheckCircle2 className="w-2.5 h-2.5 text-[#C8A45D]" />
                            <span>{item}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-[10px] text-[#9EA3B5] font-mono">
                      <span className="text-[#C8A45D]">Required: </span>
                      {service.requirements.join(' · ')}
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenConsultationModal(service.title)}
                      className="flex-1 py-2 px-3 rounded-lg bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] text-[#080A14] text-xs font-semibold hover:from-[#d8b56f] hover:to-[#f0e2be] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Book Vastu</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleWhatsApp(service.title, 'Vastu')}
                      className="p-2 rounded-lg bg-[#080A14] hover:bg-[#151c36] border border-[#25D366]/40 text-[#25D366] transition-colors cursor-pointer"
                      title={`WhatsApp enquiry for ${service.title}`}
                    >
                      <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PACKAGES */}
        {activeTab === 'packages' && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono text-[#C8A45D] uppercase tracking-wider">
                Comprehensive Structured Consultation Tiers
              </span>
              <span className="text-xs text-[#9EA3B5]">
                Includes Written Action Blueprint & 30-Day WhatsApp Clarifications
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {CONSULTATION_PACKAGES.map(pkg => {
                const isFeatured = pkg.category === 'Master Combined' || pkg.id === 'pkg-personal-numerology';
                return (
                  <div
                    key={pkg.id}
                    className={`rounded-2xl flex flex-col justify-between transition-all relative ${
                      isFeatured
                        ? 'bg-[#10152A] border-2 border-[#C8A45D] shadow-[0_0_35px_rgba(200,164,93,0.18)] p-5'
                        : 'bg-[#10152A]/80 border border-[#C8A45D]/30 hover:border-[#C8A45D]/60 p-5'
                    }`}
                  >
                    {pkg.badge && (
                      <div className="mb-2">
                        <span className="text-[10px] font-mono tracking-wider uppercase text-[#C8A45D] font-bold block">
                          {pkg.badge}
                        </span>
                      </div>
                    )}

                    <div className="space-y-3">
                      <div>
                        <h3 className="font-serif text-lg font-semibold text-[#F7F4EC] leading-snug">
                          {pkg.name}
                        </h3>
                        <p className="text-xs text-[#9EA3B5] mt-0.5 leading-relaxed">
                          {pkg.headline}
                        </p>
                      </div>

                      <div className="py-2 px-2.5 rounded-lg bg-[#080A14] border border-white/5 flex items-center justify-between text-[11px] text-[#E8D5A8]">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#C8A45D] shrink-0" />
                          <span>{pkg.duration}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-[#9EA3B5]">
                          <FileText className="w-3 h-3 text-[#C8A45D] shrink-0" />
                          <span>{pkg.deliveryFormat}</span>
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#E8D5A8] block">
                          Deliverables:
                        </span>
                        <ul className="space-y-1.5 text-xs text-[#9EA3B5]">
                          {pkg.deliverables.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="leading-tight text-[11px]">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-white/10 space-y-2.5">
                      <div className="text-[10px] text-[#9EA3B5]">
                        <span className="text-[#C8A45D] font-mono">Best For: </span>
                        {pkg.bestSuitedFor}
                      </div>

                      <button
                        type="button"
                        onClick={() => onOpenConsultationModal(pkg.name)}
                        className={`w-full py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          isFeatured
                            ? 'bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] hover:from-[#d8b56f] hover:to-[#f0e2be] text-[#080A14] shadow-sm'
                            : 'bg-[#080A14] hover:bg-[#151c38] border border-[#C8A45D]/40 hover:border-[#C8A45D] text-[#E8D5A8]'
                        }`}
                      >
                        <span>{pkg.ctaLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
