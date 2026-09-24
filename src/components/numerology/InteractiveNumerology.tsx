import React from 'react';
import { NUMEROLOGY_NUMBERS } from '../../data/numerologyData';
import { NumerologyNumber } from '../../types';
import { Sparkles, Calendar, Palette, Gem, Info } from 'lucide-react';
import { trackEvent } from '../../lib/analytics';

interface InteractiveNumerologyProps {
  activeNumber: number;
  onSelectNumber: (num: number) => void;
  onOpenConsultationModal: (serviceName?: string) => void;
}

export const InteractiveNumerology: React.FC<InteractiveNumerologyProps> = ({
  activeNumber,
  onSelectNumber,
  onOpenConsultationModal
}) => {
  const currentData: NumerologyNumber =
    NUMEROLOGY_NUMBERS.find(n => n.number === activeNumber) || NUMEROLOGY_NUMBERS[0];

  const handleSelect = (num: number) => {
    trackEvent('number_selected', { number: num });
    onSelectNumber(num);
  };

  return (
    <section id="numerology-interactive" className="py-16 lg:py-24 bg-[#080A14] relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(200,164,93,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10152A] border border-[#C8A45D]/25 text-xs font-mono text-[#E8D5A8] uppercase tracking-wider">
            <span>Core Creative Concept</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#F7F4EC]">
            Every Number Has a Story
          </h2>
          <p className="text-sm sm:text-base text-[#9EA3B5] leading-relaxed">
            Within traditional numerology practice, each single digit from 1 to 9 embodies a unique archetypal frequency, governing character traits, potential avenues of expression, and vibrational milestones.
          </p>
        </div>

        {/* Number Selection Bar 1–9 */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {NUMEROLOGY_NUMBERS.map(item => {
            const isSelected = item.number === activeNumber;
            return (
              <button
                key={item.number}
                type="button"
                onClick={() => handleSelect(item.number)}
                className={`w-11 h-11 sm:w-14 sm:h-14 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#C8A45D] to-[#9c7d3b] text-[#080A14] shadow-[0_0_20px_rgba(200,164,93,0.5)] scale-110 font-bold'
                    : 'bg-[#10152A] text-[#E8D5A8] border border-[#C8A45D]/30 hover:border-[#C8A45D] hover:bg-[#151c36]'
                }`}
                title={`Examine Number ${item.number}`}
              >
                <span className="font-serif text-lg sm:text-xl">{item.number}</span>
                <span className="text-[9px] uppercase tracking-tight opacity-75">
                  {item.number === 1 ? 'Sun' : item.number === 2 ? 'Moon' : item.number === 3 ? 'Jup' : item.number === 4 ? 'Rahu' : item.number === 5 ? 'Merc' : item.number === 6 ? 'Ven' : item.number === 7 ? 'Ketu' : item.number === 8 ? 'Sat' : 'Mars'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Number Details Card */}
        <div className="bg-[#10152A]/90 border border-[#C8A45D]/30 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-[0_15px_50px_rgba(0,0,0,0.6)] backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Number Badge & Planetary Energy */}
            <div className="lg:col-span-4 flex flex-col items-start space-y-4 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#080A14] border border-[#C8A45D] flex items-center justify-center text-[#C8A45D] font-serif text-3xl sm:text-4xl font-semibold shadow-inner">
                  {currentData.number}
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#C8A45D] font-mono">
                    Archetype
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#F7F4EC]">
                    {currentData.title}
                  </h3>
                </div>
              </div>

              <div className="w-full space-y-2.5 pt-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-[#9EA3B5]">Planetary Ruler:</span>
                  <span className="text-[#E8D5A8] font-medium">{currentData.planet}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-[#9EA3B5]">Element:</span>
                  <span className="text-[#E8D5A8] font-medium">{currentData.element}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-[#9EA3B5] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#C8A45D]" /> Lucky Days:
                  </span>
                  <span className="text-[#E8D5A8]">{currentData.luckyDays}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-[#9EA3B5] flex items-center gap-1">
                    <Palette className="w-3.5 h-3.5 text-[#C8A45D]" /> Harmonious Tones:
                  </span>
                  <span className="text-[#E8D5A8]">{currentData.luckyColors}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#9EA3B5] flex items-center gap-1">
                    <Gem className="w-3.5 h-3.5 text-[#C8A45D]" /> Gemstone Lore:
                  </span>
                  <span className="text-[#E8D5A8]">{currentData.gemstoneTradition}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenConsultationModal(`Birth Number ${currentData.number} Guidance`)}
                className="w-full mt-4 py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] text-[#080A14] text-xs font-semibold hover:from-[#d8b56f] hover:to-[#f0e2be] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Consult On Number {currentData.number} In Your Chart</span>
              </button>
            </div>

            {/* Right Column: In-depth Meaning, Strengths, Growth, and Keywords */}
            <div className="lg:col-span-8 space-y-6">
              {/* Keywords Tag Grid */}
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#9EA3B5] font-mono block mb-2">
                  Key Vibrational Attributes
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentData.keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-md bg-[#080A14] border border-[#C8A45D]/25 text-xs text-[#E8D5A8]"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Traditional Interpretation */}
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#9EA3B5] font-mono block mb-1.5">
                  Traditional Numerology Interpretation
                </span>
                <p className="text-sm sm:text-base text-[#F7F4EC] leading-relaxed">
                  {currentData.traditionalMeaning}
                </p>
              </div>

              {/* Strengths & Growth Areas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#080A14]/60 border border-white/5 space-y-2">
                  <h4 className="text-xs uppercase tracking-wider text-[#C8A45D] font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45D]" />
                    Innate Vibrational Strengths
                  </h4>
                  <ul className="text-xs text-[#9EA3B5] space-y-1.5">
                    {currentData.strengths.map((str, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#C8A45D] font-bold">·</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#080A14]/60 border border-white/5 space-y-2">
                  <h4 className="text-xs uppercase tracking-wider text-[#E8D5A8] font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E8D5A8]" />
                    Harmonic Balance Focus
                  </h4>
                  <ul className="text-xs text-[#9EA3B5] space-y-1.5">
                    {currentData.growthAreas.map((gr, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#E8D5A8] font-bold">·</span>
                        <span>{gr}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Ethical Framing Notice (Section 15 Compliance) */}
              <div className="p-3 rounded-lg bg-[#080A14]/40 border border-white/5 flex items-start gap-2.5 text-[11px] text-[#9EA3B5]">
                <Info className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                <span>
                  Within traditional numerology practice, these associations reflect archetypal patterns intended for personal reflection and harmonic awareness. Numerology is offered as traditional guidance rather than deterministic or medical fact.
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
