import React, { useState } from 'react';
import { NUMEROLOGY_NUMBERS } from '../../data/numerologyData';
import { NumerologyNumber } from '../../types';
import { Sparkles, Calendar, Palette, Gem, CheckCircle2, AlertCircle } from 'lucide-react';
import { trackEvent } from '../../lib/analytics';

interface CosmicNumbersTabProps {
  onOpenConsultationModal: (serviceName?: string) => void;
  initialNumber?: number;
}

export const CosmicNumbersTab: React.FC<CosmicNumbersTabProps> = ({
  onOpenConsultationModal,
  initialNumber = 1
}) => {
  const [activeNumber, setActiveNumber] = useState<number>(initialNumber);

  const currentData: NumerologyNumber =
    NUMEROLOGY_NUMBERS.find(n => n.number === activeNumber) || NUMEROLOGY_NUMBERS[0];

  const handleSelect = (num: number) => {
    trackEvent('number_selected', { number: num });
    setActiveNumber(num);
  };

  return (
    <div className="space-y-6">
      {/* 1-9 Number Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {NUMEROLOGY_NUMBERS.map(item => {
          const isSelected = item.number === activeNumber;
          return (
            <button
              key={item.number}
              type="button"
              onClick={() => handleSelect(item.number)}
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-b from-[#C8A45D] to-[#9c7d3b] text-[#080A14] shadow-[0_0_15px_rgba(200,164,93,0.4)] scale-105 font-bold'
                  : 'bg-[#10152A] text-[#E8D5A8] border border-[#C8A45D]/30 hover:border-[#C8A45D]'
              }`}
              title={`Examine Number ${item.number}`}
            >
              <span className="font-serif text-base sm:text-lg">{item.number}</span>
              <span className="text-[9px] uppercase tracking-tight opacity-75">
                {item.number === 1 ? 'Sun' : item.number === 2 ? 'Moon' : item.number === 3 ? 'Jup' : item.number === 4 ? 'Rahu' : item.number === 5 ? 'Merc' : item.number === 6 ? 'Ven' : item.number === 7 ? 'Ketu' : item.number === 8 ? 'Sat' : 'Mars'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Number Card */}
      <div className="bg-[#10152A]/90 border border-[#C8A45D]/30 rounded-2xl p-6 sm:p-7 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Number Badge & Planet */}
          <div className="lg:col-span-4 space-y-4 border-b lg:border-b-0 lg:border-r border-white/10 pb-5 lg:pb-0 lg:pr-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-[#080A14] border border-[#C8A45D] flex items-center justify-center text-[#C8A45D] font-serif text-2xl font-bold">
                {currentData.number}
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#C8A45D] font-mono block">
                  Planetary Archetype
                </span>
                <h3 className="font-serif text-lg font-medium text-[#F7F4EC]">
                  {currentData.title}
                </h3>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-[#9EA3B5]">Ruler:</span>
                <span className="text-[#E8D5A8] font-medium">{currentData.planet}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-[#9EA3B5]">Element:</span>
                <span className="text-[#E8D5A8] font-medium">{currentData.element}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-[#9EA3B5] flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#C8A45D]" /> Lucky Days:
                </span>
                <span className="text-[#E8D5A8]">{currentData.luckyDays}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-[#9EA3B5] flex items-center gap-1">
                  <Palette className="w-3 h-3 text-[#C8A45D]" /> Lucky Colors:
                </span>
                <span className="text-[#E8D5A8]">{currentData.luckyColors}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#9EA3B5] flex items-center gap-1">
                  <Gem className="w-3 h-3 text-[#C8A45D]" /> Gemstone:
                </span>
                <span className="text-[#E8D5A8]">{currentData.gemstoneTradition}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenConsultationModal(`Birth Number ${currentData.number} Chart Guidance`)}
              className="w-full mt-2 py-2 px-3 rounded-lg bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] text-[#080A14] text-xs font-semibold hover:from-[#d8b56f] hover:to-[#f0e2be] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chart Alignment for #{currentData.number}</span>
            </button>
          </div>

          {/* Right Column: Traits, Strengths, Growth */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap gap-1.5">
              {currentData.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 rounded bg-[#080A14] border border-[#C8A45D]/25 text-xs text-[#E8D5A8]"
                >
                  {kw}
                </span>
              ))}
            </div>

            <div>
              <p className="text-xs sm:text-sm text-[#F7F4EC] leading-relaxed">
                {currentData.traditionalMeaning}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-[#080A14]/70 border border-white/5 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Key Strengths</span>
                </div>
                <p className="text-xs text-[#9EA3B5] leading-relaxed">
                  {currentData.strengths.join(' · ')}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#080A14]/70 border border-white/5 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Growth Areas & Remedies</span>
                </div>
                <p className="text-xs text-[#9EA3B5] leading-relaxed">
                  {currentData.growthAreas.join(' · ')}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
