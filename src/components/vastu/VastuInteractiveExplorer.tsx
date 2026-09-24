import React, { useState } from 'react';
import { VASTU_ZONES } from '../../data/vastuData';
import { VastuZone } from '../../types';
import { VastuCompass3D } from '../three/VastuCompass3D';
import { Sparkles, ShieldCheck, Compass, Info, Check, AlertTriangle } from 'lucide-react';
import { trackEvent } from '../../lib/analytics';

interface VastuInteractiveExplorerProps {
  onOpenConsultationModal: (serviceName?: string) => void;
}

export const VastuInteractiveExplorer: React.FC<VastuInteractiveExplorerProps> = ({
  onOpenConsultationModal
}) => {
  const [selectedZone, setSelectedZone] = useState<VastuZone>(VASTU_ZONES[0]);

  const handleSelectZone = (zone: VastuZone) => {
    trackEvent('vastu_zone_inspected', { zone: zone.direction });
    setSelectedZone(zone);
  };

  return (
    <section id="vastu-interactive" className="py-20 lg:py-28 bg-[#10152A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#080A14] border border-[#C8A45D]/30 text-xs font-mono text-[#E8D5A8] uppercase tracking-wider">
            <span>Spatial Geometry</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#F7F4EC]">
            Interactive 3D Vastu Compass & Spatial Zones
          </h2>
          <p className="text-sm sm:text-base text-[#9EA3B5] leading-relaxed">
            Examine how the 8 cardinal and inter-cardinal sectors influence the natural circulation of prana in your home or corporate workplace. Rotate the 3D mandala or select a direction below.
          </p>
        </div>

        {/* Direction Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {VASTU_ZONES.map(zone => {
            const isSelected = zone.code === selectedZone.code;
            return (
              <button
                key={zone.code}
                type="button"
                onClick={() => handleSelectZone(zone)}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#C8A45D] text-[#080A14] shadow-[0_0_15px_rgba(200,164,93,0.4)] font-semibold'
                    : 'bg-[#080A14] text-[#E8D5A8] border border-[#C8A45D]/20 hover:border-[#C8A45D]/50'
                }`}
              >
                <span className="font-mono text-[11px] font-bold">{zone.code}</span>
                <span>{zone.direction}</span>
              </button>
            );
          })}
        </div>

        {/* 3D Canvas + Details Card Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: 3D Compass Viewer */}
          <div className="lg:col-span-5 h-[360px] sm:h-[440px] lg:h-auto min-h-[380px]">
            <VastuCompass3D
              selectedZone={selectedZone}
              onSelectZone={handleSelectZone}
              className="w-full h-full shadow-[0_15px_40px_rgba(0,0,0,0.7)]"
            />
          </div>

          {/* RIGHT: Zone Blueprint Details */}
          <div className="lg:col-span-7 bg-[#080A14] border border-[#C8A45D]/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              
              {/* Header Info */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-[#C8A45D] font-mono">
                    Sector {selectedZone.degrees}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#F7F4EC]">
                    {selectedZone.direction} Zone ({selectedZone.code})
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-widest text-[#9EA3B5] font-mono block">
                    Governing Tattva
                  </span>
                  <span className="text-xs font-semibold text-[#E8D5A8]">
                    {selectedZone.element}
                  </span>
                </div>
              </div>

              {/* Ruling Deity & Traditional Nature */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#10152A]/80 p-3.5 rounded-xl border border-white/5">
                <div>
                  <span className="text-[#9EA3B5] block text-[11px]">Classical Energy:</span>
                  <span className="text-[#E8D5A8] font-medium">{selectedZone.rulingDeity}</span>
                </div>
                <div>
                  <span className="text-[#9EA3B5] block text-[11px]">Governing Sphere:</span>
                  <span className="text-[#E8D5A8] font-medium">{selectedZone.nature}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#F7F4EC] leading-relaxed">
                {selectedZone.description}
              </p>

              {/* Best For vs Avoid For */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-[#10152A]/60 border border-white/5 space-y-2">
                  <h4 className="text-xs uppercase tracking-wider text-[#C8A45D] font-semibold flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#C8A45D]" />
                    Auspicious Space Allocations
                  </h4>
                  <ul className="text-xs text-[#9EA3B5] space-y-1">
                    {selectedZone.bestFor.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#C8A45D] font-bold">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-[#10152A]/60 border border-white/5 space-y-2">
                  <h4 className="text-xs uppercase tracking-wider text-rose-300 font-semibold flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-300" />
                    Activities To Minimize / Rectify
                  </h4>
                  <ul className="text-xs text-[#9EA3B5] space-y-1">
                    {selectedZone.avoidFor.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-rose-300 font-bold">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Non-Demolition Practical Remedy */}
              <div className="p-4 rounded-xl bg-[#10152A] border border-[#C8A45D]/25 space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#C8A45D] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Archanna’s Practical Non-Demolition Remedy
                </span>
                <p className="text-xs text-[#E8D5A8] leading-relaxed">
                  {selectedZone.practicalRemedy}
                </p>
              </div>

            </div>

            {/* Bottom CTA & Legal note */}
            <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] text-[#9EA3B5]">
                Need your home or office floor plan mapped to this sector?
              </span>
              <button
                type="button"
                onClick={() => onOpenConsultationModal(`${selectedZone.direction} Zone Vastu Audit`)}
                className="w-full sm:w-auto py-2.5 px-5 rounded-lg bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] text-[#080A14] text-xs font-semibold hover:from-[#d8b56f] hover:to-[#f0e2be] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Audit This Zone In Your Property</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
