import React, { useState } from 'react';
import { MAHAVASTU_16_ZONES } from '../../data/mahavastuZonesData';
import { VASTU_ZONES } from '../../data/vastuData';
import { VastuZone } from '../../types';
import { VastuCompass3D } from '../three/VastuCompass3D';
import { Compass, Sparkles, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { trackEvent } from '../../lib/analytics';

interface MahavastuCompassStudioProps {
  onOpenConsultationModal: (initialService?: string) => void;
}

export const MahavastuCompassStudio: React.FC<MahavastuCompassStudioProps> = ({
  onOpenConsultationModal
}) => {
  const [viewMode, setViewMode] = useState<'zones16' | 'compass3d'>('zones16');
  
  // 16 Zones State
  const [selected16Code, setSelected16Code] = useState<string>('N');
  const [cardinalFilter, setCardinalFilter] = useState<'All' | 'North' | 'East' | 'South' | 'West'>('All');

  // 3D Compass 8-zone State
  const [selected8Zone, setSelected8Zone] = useState<VastuZone>(VASTU_ZONES[0]);

  const activeZone16 = MAHAVASTU_16_ZONES.find(z => z.code === selected16Code) || MAHAVASTU_16_ZONES[0];

  const filtered16Zones = cardinalFilter === 'All'
    ? MAHAVASTU_16_ZONES
    : MAHAVASTU_16_ZONES.filter(z => z.cardinalGroup === cardinalFilter);

  const getElementBadge = (el: string) => {
    if (el.includes('Water')) return 'text-cyan-400 border-cyan-500/30 bg-cyan-950/20';
    if (el.includes('Air')) return 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20';
    if (el.includes('Fire')) return 'text-amber-400 border-amber-500/30 bg-amber-950/20';
    if (el.includes('Earth')) return 'text-yellow-400 border-yellow-500/30 bg-yellow-950/20';
    return 'text-indigo-400 border-indigo-500/30 bg-indigo-950/20';
  };

  return (
    <section id="vastu-interactive" className="py-16 lg:py-24 bg-[#080A14] border-t border-[#C8A45D]/15 relative overflow-hidden">
      <span id="mahavastu-zones" className="absolute -top-24 pointer-events-none" />

      {/* Decorative background glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(200,164,93,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10152A] border border-[#C8A45D]/30 text-xs font-mono text-[#E8D5A8] uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-[#C8A45D]" />
            <span>Vedic Spatial Engineering</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#F7F4EC] tracking-tight">
            16 Mahavastu Zones & 3D Spatial Compass
          </h2>

          <p className="text-xs sm:text-sm text-[#9EA3B5] leading-relaxed max-w-2xl mx-auto">
            Beyond broad compass directions, authentic classical Vastu divides premises into sixteen 22.5° energetic quadrants. Explore zone diagnostics or test our real-time 3D spatial compass below.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-xl bg-[#10152A] border border-[#C8A45D]/25 gap-1 shadow-md">
            <button
              type="button"
              onClick={() => {
                setViewMode('zones16');
                trackEvent('mahavastu_tab_switch', { mode: 'zones16' });
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                viewMode === 'zones16'
                  ? 'bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] text-[#080A14] shadow'
                  : 'text-[#9EA3B5] hover:text-[#F7F4EC]'
              }`}
            >
              <span>16 Sacred Zones Matrix</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setViewMode('compass3d');
                trackEvent('mahavastu_tab_switch', { mode: 'compass3d' });
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                viewMode === 'compass3d'
                  ? 'bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] text-[#080A14] shadow'
                  : 'text-[#9EA3B5] hover:text-[#F7F4EC]'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Interactive 3D Compass</span>
            </button>
          </div>
        </div>

        {/* MODE 1: 16 MAHAVASTU ZONES */}
        {viewMode === 'zones16' && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
            {/* Filter buttons */}
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {(['All', 'North', 'East', 'South', 'West'] as const).map(f => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setCardinalFilter(f)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    cardinalFilter === f
                      ? 'bg-[#C8A45D] text-[#080A14] font-bold shadow-sm'
                      : 'bg-[#10152A] text-[#9EA3B5] hover:text-[#F7F4EC] border border-white/5'
                  }`}
                >
                  {f === 'All' ? 'All 16 Quadrants' : `${f} Quadrant`}
                </button>
              ))}
            </div>

            {/* Zone Selector Chips */}
            <div className="flex flex-wrap justify-center gap-1.5 max-w-4xl mx-auto">
              {filtered16Zones.map(z => {
                const isSelected = z.code === selected16Code;
                return (
                  <button
                    key={z.code}
                    type="button"
                    onClick={() => {
                      setSelected16Code(z.code);
                      trackEvent('mahavastu_zone_select', { code: z.code });
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] text-[#080A14] font-bold shadow-md scale-105'
                        : 'bg-[#10152A] text-[#E8D5A8] border border-[#C8A45D]/20 hover:border-[#C8A45D]/60'
                    }`}
                  >
                    <span>{z.code}</span>
                    <span className="hidden sm:inline text-[11px] opacity-80">({z.name})</span>
                  </button>
                );
              })}
            </div>

            {/* Diagnostic Card for Selected Zone */}
            <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-[#10152A]/90 border border-[#C8A45D]/30 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-[#080A14] border border-[#C8A45D]/40 font-mono text-xs font-bold text-[#E8D5A8]">
                      {activeZone16.code} · {activeZone16.degreeSpan}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded text-xs font-mono border ${getElementBadge(activeZone16.element)}`}>
                      {activeZone16.element}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-medium text-[#F7F4EC] mt-1.5">
                    {activeZone16.name} – {activeZone16.attribute}
                  </h3>
                </div>

                <div className="text-right sm:text-right text-xs font-mono text-[#9EA3B5]">
                  <div>Deity: <span className="text-[#E8D5A8]">{activeZone16.deityArchetype}</span></div>
                </div>
              </div>

              {/* 3-column breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Ideal Usage */}
                <div className="p-4 rounded-xl bg-[#080A14]/70 border border-white/5 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Ideal Activities & Best Use</span>
                  </div>
                  <p className="text-xs text-[#9EA3B5] leading-relaxed">
                    {activeZone16.bestUse}
                  </p>
                </div>

                {/* Common Doshas */}
                <div className="p-4 rounded-xl bg-[#080A14]/70 border border-red-500/10 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-red-400">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Avoid Placements</span>
                  </div>
                  <p className="text-xs text-[#9EA3B5] leading-relaxed">
                    {activeZone16.avoidUse}
                  </p>
                </div>

                {/* Non-demolition Remedy */}
                <div className="p-4 rounded-xl bg-[#080A14]/70 border border-[#C8A45D]/20 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#E8D5A8]">
                    <ShieldCheck className="w-4 h-4 text-[#C8A45D] shrink-0" />
                    <span>Non-Demolition Remedy</span>
                  </div>
                  <p className="text-xs text-[#9EA3B5] leading-relaxed">
                    {activeZone16.remedy}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
                <p className="text-xs text-[#9EA3B5]">
                  Need full spatial analysis of your floorplan's {activeZone16.code} zone?
                </p>
                <button
                  type="button"
                  onClick={() => onOpenConsultationModal(`Floorplan Vastu Audit (${activeZone16.code} Zone)`)}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] text-[#080A14] text-xs font-semibold hover:from-[#d8b56f] hover:to-[#f0e2be] transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Audit This Zone in My Space</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODE 2: INTERACTIVE 3D VASTU COMPASS */}
        {viewMode === 'compass3d' && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
            {/* Zone Selector Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {VASTU_ZONES.map(zone => {
                const isSelected = zone.code === selected8Zone.code;
                return (
                  <button
                    key={zone.code}
                    type="button"
                    onClick={() => {
                      setSelected8Zone(zone);
                      trackEvent('vastu_zone_inspected', { zone: zone.direction });
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#C8A45D] text-[#080A14] font-bold shadow-md'
                        : 'bg-[#10152A] text-[#E8D5A8] border border-[#C8A45D]/20 hover:border-[#C8A45D]/50'
                    }`}
                  >
                    <span className="font-mono text-[11px] font-bold">{zone.code}</span>
                    <span>{zone.direction}</span>
                  </button>
                );
              })}
            </div>

            {/* 3D Canvas + Diagnostic Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
              {/* 3D Canvas */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center">
                <div className="w-full max-w-[400px] aspect-square rounded-2xl bg-[#080A14] border border-[#C8A45D]/25 p-2 shadow-2xl relative flex items-center justify-center">
                  <VastuCompass3D
                    selectedZone={selected8Zone}
                    onSelectZone={setSelected8Zone}
                  />
                </div>
                <span className="text-[11px] text-[#9EA3B5] font-mono mt-2">
                  Interactive WebGL Mandala · Tap zone to inspect
                </span>
              </div>

              {/* Direction Breakdown */}
              <div className="lg:col-span-6 space-y-4 p-4 sm:p-6 rounded-2xl bg-[#10152A]/90 border border-[#C8A45D]/30 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="text-xs font-mono text-[#C8A45D] font-bold uppercase tracking-wider">
                      {selected8Zone.code} · {selected8Zone.rulingDeity}
                    </span>
                    <h3 className="font-serif text-2xl font-medium text-[#F7F4EC] mt-0.5">
                      {selected8Zone.direction} Sector
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded bg-[#080A14] border border-[#C8A45D]/30 text-xs font-mono text-[#E8D5A8]">
                    {selected8Zone.element}
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-semibold text-[#F7F4EC] block">Influence & Sphere:</span>
                    <p className="text-[#9EA3B5] mt-0.5">{selected8Zone.description}</p>
                  </div>

                  <div>
                    <span className="font-semibold text-emerald-400 block">Recommended Rooms:</span>
                    <p className="text-[#9EA3B5] mt-0.5">{selected8Zone.bestFor.join(' · ')}</p>
                  </div>

                  <div>
                    <span className="font-semibold text-red-400 block">Prohibited Placements:</span>
                    <p className="text-[#9EA3B5] mt-0.5">{selected8Zone.avoidFor.join(' · ')}</p>
                  </div>

                  <div className="pt-2 border-t border-white/10">
                    <span className="font-semibold text-[#C8A45D] block">Non-Demolition Remedy:</span>
                    <p className="text-[#9EA3B5] mt-0.5">{selected8Zone.practicalRemedy}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenConsultationModal(`Non-Demolition Remedy for ${selected8Zone.direction}`)}
                  className="w-full mt-2 py-2 px-3 rounded-lg bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] text-[#080A14] text-xs font-semibold hover:from-[#d8b56f] hover:to-[#f0e2be] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Fix My {selected8Zone.direction} Zone Without Demolition</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
