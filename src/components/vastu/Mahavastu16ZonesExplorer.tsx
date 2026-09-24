import React, { useState } from 'react';
import { MAHAVASTU_16_ZONES, MahavastuZoneDetail } from '../../data/mahavastuZonesData';
import { Sparkles, Compass, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { trackEvent } from '../../lib/analytics';

interface Mahavastu16ZonesExplorerProps {
  onOpenConsultationModal: (initialService?: string) => void;
}

export const Mahavastu16ZonesExplorer: React.FC<Mahavastu16ZonesExplorerProps> = ({
  onOpenConsultationModal
}) => {
  const [selectedCode, setSelectedCode] = useState<string>('N');
  const [cardinalFilter, setCardinalFilter] = useState<'All' | 'North' | 'East' | 'South' | 'West'>('All');

  const selectedZone = MAHAVASTU_16_ZONES.find(z => z.code === selectedCode) || MAHAVASTU_16_ZONES[0];

  const filteredZones = cardinalFilter === 'All'
    ? MAHAVASTU_16_ZONES
    : MAHAVASTU_16_ZONES.filter(z => z.cardinalGroup === cardinalFilter);

  const handleSelectZone = (code: string) => {
    trackEvent('mahavastu_zone_select', { code });
    setSelectedCode(code);
  };

  const getElementBadgeColor = (el: string) => {
    if (el.includes('Water')) return 'text-cyan-400 border-cyan-500/30 bg-cyan-950/20';
    if (el.includes('Air')) return 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20';
    if (el.includes('Fire')) return 'text-amber-400 border-amber-500/30 bg-amber-950/20';
    if (el.includes('Earth')) return 'text-yellow-400 border-yellow-500/30 bg-yellow-950/20';
    return 'text-indigo-400 border-indigo-500/30 bg-indigo-950/20'; // Space
  };

  return (
    <section id="mahavastu-zones" className="py-20 lg:py-28 bg-[#080A14] border-t border-[#C8A45D]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10152A] border border-[#C8A45D]/30 text-xs font-mono text-[#E8D5A8] uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-[#C8A45D]" />
            <span>Vedic Spatial Precision</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#F7F4EC] tracking-tight text-balance">
            The 16 Mahavastu Zones of Sacred Architecture
          </h2>

          <p className="text-sm sm:text-base text-[#9EA3B5] leading-relaxed">
            Beyond standard compass directions, authentic classical Vastu divides every premises into 16 distinct 22.5° energetic quadrants. Each zone directly governs a specific sphere of life, health, and commercial flow.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {(['All', 'North', 'East', 'South', 'West'] as const).map(f => (
            <button
              key={f}
              type="button"
              onClick={() => setCardinalFilter(f)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                cardinalFilter === f
                  ? 'bg-[#C8A45D] text-[#080A14] font-semibold'
                  : 'bg-[#10152A] text-[#9EA3B5] hover:text-[#F7F4EC] border border-white/5'
              }`}
            >
              {f === 'All' ? 'All 16 Zones' : `${f} Quadrant`}
            </button>
          ))}
        </div>

        {/* 16 Zones Grid Buttons */}
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-16 gap-2">
          {filteredZones.map(zone => {
            const isSelected = zone.code === selectedCode;
            return (
              <button
                key={zone.code}
                type="button"
                onClick={() => handleSelectZone(zone.code)}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#10152A] border-[#C8A45D] text-[#E8D5A8] shadow-[0_0_15px_rgba(200,164,93,0.3)] ring-1 ring-[#C8A45D]'
                    : 'bg-[#080A14] border-white/10 text-[#9EA3B5] hover:border-[#C8A45D]/40 hover:text-[#F7F4EC]'
                }`}
              >
                <span className="font-mono text-xs font-bold">{zone.code}</span>
                <span className="text-[10px] text-[#9EA3B5] truncate max-w-full mt-0.5">
                  {zone.degreeSpan.split('–')[0].trim()}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Zone Deep Dive Card */}
        <div className="bg-[#10152A]/90 border border-[#C8A45D]/40 rounded-2xl p-6 sm:p-10 backdrop-blur-sm space-y-6 max-w-4xl mx-auto shadow-2xl">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#C8A45D] uppercase tracking-wider">
                  Zone Code: {selectedZone.code}
                </span>
                <span className="text-white/20">·</span>
                <span className="font-mono text-xs text-[#9EA3B5]">
                  Angular Span: {selectedZone.degreeSpan}
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#F7F4EC] mt-1">
                {selectedZone.name}
              </h3>
            </div>

            <div className={`px-3 py-1.5 rounded-lg border text-xs font-medium self-start sm:self-auto ${getElementBadgeColor(selectedZone.element)}`}>
              {selectedZone.element}
            </div>
          </div>

          {/* Governing Attribute & Deity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#080A14] border border-white/10 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8A45D]">
                Life Influence & Attribute
              </span>
              <p className="text-xs sm:text-sm text-[#F7F4EC] font-medium">
                {selectedZone.attribute}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#080A14] border border-white/10 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8D5A8]">
                Presiding Archetype / Deity
              </span>
              <p className="text-xs sm:text-sm text-[#F7F4EC] font-medium">
                {selectedZone.deityArchetype}
              </p>
            </div>
          </div>

          {/* Best Activities vs Avoid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#080A14] border border-emerald-500/20 space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Optimal Room & Activity Placements</span>
              </div>
              <p className="text-[#9EA3B5] leading-relaxed">
                {selectedZone.bestUse}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#080A14] border border-amber-500/20 space-y-2">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <ShieldAlert className="w-4 h-4" />
                <span>Activities & Fixtures to Avoid</span>
              </div>
              <p className="text-[#9EA3B5] leading-relaxed">
                {selectedZone.avoidUse}
              </p>
            </div>
          </div>

          {/* Non-Demolition Practical Remedy */}
          <div className="p-4 rounded-xl bg-[#080A14]/80 border border-[#C8A45D]/30 space-y-1.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C8A45D]" />
              <span className="text-xs font-semibold text-[#F7F4EC]">
                Archanna’s Non-Demolition Spatial Remedy
              </span>
            </div>
            <p className="text-xs text-[#E8D5A8] leading-relaxed">
              {selectedZone.remedy}
            </p>
          </div>

          {/* CTA Footer */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
            <p className="text-xs text-[#9EA3B5] text-center sm:text-left">
              Want your floorplan mapped to all 16 Mahavastu zones with exact degree compass measurements?
            </p>

            <button
              type="button"
              onClick={() => onOpenConsultationModal(`16 Mahavastu Zone Mapping for ${selectedZone.name}`)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] hover:from-[#d5b36e] hover:to-[#f0e0b9] text-[#080A14] font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
            >
              <span>Request 16-Zone Blueprint Audit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
