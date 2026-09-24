import React from 'react';
import { CONSULTATION_PACKAGES, ConsultationPackage } from '../../data/packagesData';
import { Sparkles, Check, ArrowRight, Clock, FileText } from 'lucide-react';
import { trackEvent } from '../../lib/analytics';

interface ConsultationPackagesSectionProps {
  onOpenConsultationModal: (initialService?: string) => void;
}

export const ConsultationPackagesSection: React.FC<ConsultationPackagesSectionProps> = ({
  onOpenConsultationModal
}) => {
  const handleSelectPackage = (pkg: ConsultationPackage) => {
    trackEvent('package_select', { packageId: pkg.id, name: pkg.name });
    onOpenConsultationModal(pkg.name);
  };

  return (
    <section id="packages" className="py-16 lg:py-24 bg-gradient-to-b from-[#080A14] via-[#0d1224] to-[#080A14] border-t border-[#C8A45D]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10152A] border border-[#C8A45D]/30 text-xs font-mono text-[#E8D5A8] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A45D]" />
            <span>Consultation Tiers</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#F7F4EC] tracking-tight">
            Consultation Packages
          </h2>

          <p className="text-xs sm:text-sm text-[#9EA3B5]">
            Structured 1-on-1 advisory sessions with tailored blueprints and zero demolition remedies.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {CONSULTATION_PACKAGES.map(pkg => {
            const isFeatured = pkg.category === 'Master Combined' || pkg.id === 'pkg-personal-numerology';
            return (
              <div
                key={pkg.id}
                className={`rounded-xl flex flex-col justify-between transition-all relative ${
                  isFeatured
                    ? 'bg-[#10152A] border-2 border-[#C8A45D] shadow-[0_0_35px_rgba(200,164,93,0.18)] p-5'
                    : 'bg-[#10152A]/70 border border-[#C8A45D]/30 hover:border-[#C8A45D]/60 p-5'
                }`}
              >
                {/* Optional Badge */}
                {pkg.badge && (
                  <div className="mb-2">
                    <span className="text-[10px] font-mono tracking-wider uppercase text-[#C8A45D] font-semibold block">
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

                  {/* Format & Duration Meta */}
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

                  {/* Deliverables Checklist */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#E8D5A8] block">
                      Deliverables:
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#9EA3B5]">
                      {pkg.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-tight text-[11px]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-4 mt-4 border-t border-white/10 space-y-2.5">
                  <div className="text-[10px] text-[#9EA3B5]">
                    <span className="text-[#C8A45D] font-mono">Best For: </span>
                    {pkg.bestSuitedFor}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectPackage(pkg)}
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
    </section>
  );
};
