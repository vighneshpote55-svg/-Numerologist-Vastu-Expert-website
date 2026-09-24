import React, { useState } from 'react';
import { trackEvent } from '../../lib/analytics';
import { generateWhatsAppLink } from '../../lib/validation';
import { Home, Building2, Store, ArrowRight, AlertTriangle, CheckCircle2, ShieldAlert, Sparkles, Compass } from 'lucide-react';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';

interface VastuFloorplanEvaluatorProps {
  onOpenConsultationModal: (initialService?: string) => void;
}

type Direction = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';

export const VastuFloorplanEvaluator: React.FC<VastuFloorplanEvaluatorProps> = ({
  onOpenConsultationModal
}) => {
  const [propertyType, setPropertyType] = useState<'Apartment' | 'Independent House' | 'Office' | 'Retail Shop'>('Apartment');
  const [entrance, setEntrance] = useState<Direction>('NE');
  const [kitchen, setKitchen] = useState<Direction>('SE');
  const [masterBed, setMasterBed] = useState<Direction>('SW');
  const [poojaRoom, setPoojaRoom] = useState<Direction>('NE');
  const [toilet, setToilet] = useState<Direction>('NW');
  const [cashLocker, setCashLocker] = useState<Direction>('N');

  const directionsList: { value: Direction; label: string }[] = [
    { value: 'N', label: 'North (Kuber / Wealth)' },
    { value: 'NE', label: 'North-East (Ishanya / Pure Mind)' },
    { value: 'E', label: 'East (Indra & Surya / Social)' },
    { value: 'SE', label: 'South-East (Agni / Cashflow)' },
    { value: 'S', label: 'South (Yama / Rest & Fame)' },
    { value: 'SW', label: 'South-West (Nairutya / Stability)' },
    { value: 'W', label: 'West (Varuna / Profit)' },
    { value: 'NW', label: 'North-West (Vayu / Support)' }
  ];

  // Evaluate Score & Findings based on classical Vastu rules
  const evaluateVastu = () => {
    let score = 50; // base
    const insights: { type: 'success' | 'warning' | 'critical'; title: string; desc: string; remedy?: string }[] = [];

    // Entrance
    if (['NE', 'N', 'E'].includes(entrance)) {
      score += 15;
      insights.push({
        type: 'success',
        title: `Auspicious Main Entrance (${entrance})`,
        desc: 'Promotes positive prana inflow, clarity, and expanding wealth opportunities.'
      });
    } else if (entrance === 'SW') {
      score -= 15;
      insights.push({
        type: 'critical',
        title: 'South-West Entrance Challenge',
        desc: 'SW entrances can trigger energy drain or sudden expenditures if left unchecked.',
        remedy: 'Install heavy brass threshold strips and lead pyramids to ground energy without structural demolition.'
      });
    } else if (entrance === 'SE') {
      score -= 5;
      insights.push({
        type: 'warning',
        title: 'South-East Entrance Friction',
        desc: 'Agni portal entrance may cause heated disagreements or legal friction.',
        remedy: 'Apply red copper strips along the floor threshold to regulate the fire element.'
      });
    } else {
      score += 5;
      insights.push({
        type: 'success',
        title: `Balanced Entrance (${entrance})`,
        desc: 'Moderate directional vibration; benefits from clean lighting.'
      });
    }

    // Kitchen
    if (kitchen === 'SE') {
      score += 15;
      insights.push({
        type: 'success',
        title: 'Ideal Kitchen in South-East (Agneya)',
        desc: 'Cosmic Fire element in its natural home. Supports healthy digestion and liquid cash flow.'
      });
    } else if (kitchen === 'NE') {
      score -= 20;
      insights.push({
        type: 'critical',
        title: 'Fire in Water Conflict (Kitchen in North-East)',
        desc: 'Severe elemental clash. Fire in the spiritual water zone causes mental anxiety and health strain.',
        remedy: 'Place a polished green marble slab under the stove and embed copper balancing wire around the base.'
      });
    } else if (kitchen === 'NW') {
      score += 5;
      insights.push({
        type: 'warning',
        title: 'Secondary Kitchen Zone (North-West)',
        desc: 'Acceptable secondary location, but keep stove away from North-facing walls.'
      });
    } else if (kitchen === 'SW') {
      score -= 10;
      insights.push({
        type: 'critical',
        title: 'Kitchen in South-West (Earth Zone)',
        desc: 'Fire burns away stability, creating friction among key decision-makers.',
        remedy: 'Apply yellow Jaisalmer marble under cooking hob and balance with brass pyramid energy regulators.'
      });
    }

    // Master Bedroom
    if (masterBed === 'SW' || masterBed === 'S') {
      score += 15;
      insights.push({
        type: 'success',
        title: `Master Bedroom in South-West / South`,
        desc: 'Anchors the master or business director with authoritative stability, restful sleep, and sound judgment.'
      });
    } else if (masterBed === 'NE') {
      score -= 10;
      insights.push({
        type: 'warning',
        title: 'Master Bed in North-East (Ishanya)',
        desc: 'Can cause restlessness and over-intellectualizing; Ishanya is best for meditation, not marital sleep.',
        remedy: 'Keep bedroom minimal, pastel blue/white tones, and shift bed headboard toward South.'
      });
    }

    // Toilet
    if (['WNW', 'NW', 'SSW', 'S'].includes(toilet) || toilet === 'W') {
      score += 10;
      insights.push({
        type: 'success',
        title: 'Sanitary Placement in Disposal Sectors',
        desc: 'Wastewater naturally flows through cleansing sectors, preventing toxic buildup.'
      });
    } else if (toilet === 'NE') {
      score -= 25;
      insights.push({
        type: 'critical',
        title: 'Toilet in North-East (Ishanya Amrut Sthan)',
        desc: 'High severity defect. Drains intellect, intuition, and induces chronic neurological stress.',
        remedy: 'Seal the commode perimeter using stainless steel / zinc strips and place energized natural sea salt bowl.'
      });
    }

    // Cash Locker / Safe
    if (cashLocker === 'N' || cashLocker === 'NE') {
      score += 10;
      insights.push({
        type: 'success',
        title: 'Cash Safe Facing North (Kuber Sthan)',
        desc: 'Optimal alignment to attract continuous commercial liquidity and financial stability.'
      });
    } else if (cashLocker === 'SE' || cashLocker === 'S') {
      score -= 5;
      insights.push({
        type: 'warning',
        title: 'Cash Locker in Fire Sector',
        desc: 'Can lead to rapid, uncontrollable outflow of funds or unexpected expenses.',
        remedy: 'Ensure the safe door opens toward North; add a green velvet lining inside the treasury.'
      });
    }

    const clampedScore = Math.max(20, Math.min(98, score));
    return { score: clampedScore, insights };
  };

  const evaluation = evaluateVastu();

  const handleBookAudit = () => {
    trackEvent('calculator_book_click', {
      type: 'vastu_floorplan',
      propertyType,
      score: evaluation.score
    });
    onOpenConsultationModal(
      `${propertyType} Vastu Blueprint Audit (Entrance: ${entrance}, Score: ${evaluation.score}/100)`
    );
  };

  const handleWhatsAppShare = () => {
    trackEvent('whatsapp_click', {
      source: 'vastu_evaluator',
      propertyType
    });
    const url = generateWhatsAppLink({
      fullName: '',
      consultationType: 'Vastu',
      areaOfGuidance: `Floorplan self-assessment for ${propertyType}: Entrance ${entrance}, Kitchen ${kitchen}, Master Bed ${masterBed}. Self-audit score ${evaluation.score}/100. Requesting Archanna's non-demolition remedy consultation.`
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-[#10152A]/90 border border-[#C8A45D]/30 rounded-2xl p-6 sm:p-8 backdrop-blur-sm space-y-6">
      {/* Header */}
      <div className="border-b border-white/10 pb-5">
        <span className="text-[11px] font-mono tracking-widest uppercase text-[#C8A45D]">
          Virtual Spatial Audit
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#F7F4EC] mt-1">
          Interactive Floorplan & Room Orientation Evaluator
        </h3>
        <p className="text-xs text-[#9EA3B5] mt-1 max-w-2xl">
          Map your home or commercial premises to inspect directional harmony and receive scientific, non-demolition Vedic adjustments.
        </p>
      </div>

      {/* Property Selector */}
      <div className="space-y-2">
        <label className="block text-xs font-medium text-[#E8D5A8]">
          Select Property Type
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { id: 'Apartment', icon: Home, label: 'Apartment / Flat' },
            { id: 'Independent House', icon: Building2, label: 'Villa / Bungalow' },
            { id: 'Office', icon: Building2, label: 'Corporate Office' },
            { id: 'Retail Shop', icon: Store, label: 'Shop / Showroom' }
          ].map(item => {
            const Icon = item.icon;
            const isSelected = propertyType === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setPropertyType(item.id as any)}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs cursor-pointer ${
                  isSelected
                    ? 'bg-[#080A14] border-[#C8A45D] text-[#E8D5A8] shadow-[0_0_15px_rgba(200,164,93,0.2)] font-semibold'
                    : 'bg-[#080A14]/60 border-white/10 text-[#9EA3B5] hover:text-[#F7F4EC] hover:border-white/20'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-[#C8A45D]' : 'text-[#9EA3B5]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Direction Selectors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
        
        {/* Entrance */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-[#E8D5A8]">
            Main Entrance Facing Direction
          </label>
          <select
            value={entrance}
            onChange={e => setEntrance(e.target.value as Direction)}
            className="w-full px-3 py-2.5 rounded-lg bg-[#080A14] border border-[#C8A45D]/30 text-xs text-[#F7F4EC] focus:border-[#C8A45D] focus:outline-none cursor-pointer"
          >
            {directionsList.map(d => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>

        {/* Kitchen */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-[#E8D5A8]">
            Kitchen / Pantry Stove Sector
          </label>
          <select
            value={kitchen}
            onChange={e => setKitchen(e.target.value as Direction)}
            className="w-full px-3 py-2.5 rounded-lg bg-[#080A14] border border-[#C8A45D]/30 text-xs text-[#F7F4EC] focus:border-[#C8A45D] focus:outline-none cursor-pointer"
          >
            {directionsList.map(d => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>

        {/* Master Bedroom */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-[#E8D5A8]">
            Master Bedroom / Director Cabin
          </label>
          <select
            value={masterBed}
            onChange={e => setMasterBed(e.target.value as Direction)}
            className="w-full px-3 py-2.5 rounded-lg bg-[#080A14] border border-[#C8A45D]/30 text-xs text-[#F7F4EC] focus:border-[#C8A45D] focus:outline-none cursor-pointer"
          >
            {directionsList.map(d => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>

        {/* Pooja Room */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-[#E8D5A8]">
            Pooja Shrine / Meditation Corner
          </label>
          <select
            value={poojaRoom}
            onChange={e => setPoojaRoom(e.target.value as Direction)}
            className="w-full px-3 py-2.5 rounded-lg bg-[#080A14] border border-[#C8A45D]/30 text-xs text-[#F7F4EC] focus:border-[#C8A45D] focus:outline-none cursor-pointer"
          >
            {directionsList.map(d => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>

        {/* Toilet */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-[#E8D5A8]">
            Primary Toilet / Washroom Sector
          </label>
          <select
            value={toilet}
            onChange={e => setToilet(e.target.value as Direction)}
            className="w-full px-3 py-2.5 rounded-lg bg-[#080A14] border border-[#C8A45D]/30 text-xs text-[#F7F4EC] focus:border-[#C8A45D] focus:outline-none cursor-pointer"
          >
            {directionsList.map(d => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>

        {/* Cash Locker */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-[#E8D5A8]">
            Cash Locker / Accounts Desk
          </label>
          <select
            value={cashLocker}
            onChange={e => setCashLocker(e.target.value as Direction)}
            className="w-full px-3 py-2.5 rounded-lg bg-[#080A14] border border-[#C8A45D]/30 text-xs text-[#F7F4EC] focus:border-[#C8A45D] focus:outline-none cursor-pointer"
          >
            {directionsList.map(d => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Results & Score Strip */}
      <div className="p-5 rounded-xl bg-[#080A14] border border-[#C8A45D]/40 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#9EA3B5]">
              Estimated Spatial Harmony Index
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className={`font-serif text-3xl sm:text-4xl font-bold ${
                evaluation.score >= 80 ? 'text-emerald-400' : evaluation.score >= 60 ? 'text-[#C8A45D]' : 'text-amber-400'
              }`}>
                {evaluation.score} / 100
              </span>
              <span className="text-xs text-[#9EA3B5]">
                {evaluation.score >= 80 ? 'High Vibrational Cohesion' : evaluation.score >= 60 ? 'Moderate – Needs Sub-Zone Tuning' : 'High Remedy Priority Required'}
              </span>
            </div>
          </div>

          <div className="text-xs text-[#9EA3B5] sm:text-right">
            <span className="font-mono text-[#E8D5A8] block">Pancha Bhuta Equilibrium</span>
            <span>Water · Fire · Air · Earth · Space</span>
          </div>
        </div>

        {/* Findings & Non-Demolition Remedies */}
        <div className="space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#9EA3B5] block">
            Diagnostic Observations & Vedic Remediations
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {evaluation.insights.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg bg-[#10152A] border border-white/5 space-y-1.5 text-xs"
              >
                <div className="flex items-center gap-2">
                  {item.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : item.type === 'critical' ? (
                    <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-[#C8A45D] shrink-0" />
                  )}
                  <strong className="text-[#F7F4EC] font-medium">{item.title}</strong>
                </div>

                <p className="text-[#9EA3B5] text-[11px] leading-relaxed pl-6">
                  {item.desc}
                </p>

                {item.remedy && (
                  <div className="mt-1.5 pl-6 pt-1.5 border-t border-white/5 text-[11px] text-[#E8D5A8] leading-relaxed">
                    <strong className="font-medium text-[#C8A45D]">Non-Demolition Remedy: </strong>
                    {item.remedy}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
          <p className="text-xs text-[#9EA3B5] text-center sm:text-left">
            Have a complex 2D architect layout or blueprint for this {propertyType.toLowerCase()}?
          </p>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleBookAudit}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] hover:from-[#d5b36e] hover:to-[#f0e0b9] text-[#080A14] font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>Request Full Blueprint Audit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={handleWhatsAppShare}
              className="px-3.5 py-2.5 rounded-lg bg-[#080A14] hover:bg-[#151c38] border border-[#25D366]/40 text-[#25D366] text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              title="Share layout for quick review on WhatsApp"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
