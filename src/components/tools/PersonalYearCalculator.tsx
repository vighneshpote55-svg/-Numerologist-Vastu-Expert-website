import React, { useState } from 'react';
import { calculatePersonalYear, calculateNineYearEpicycle } from '../../lib/personalYearCalculator';
import { trackEvent } from '../../lib/analytics';
import { generateWhatsAppLink } from '../../lib/validation';
import { Calendar, Sparkles, Clock, ArrowRight, AlertCircle, CheckCircle, ChevronRight } from 'lucide-react';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';

interface PersonalYearCalculatorProps {
  onOpenConsultationModal: (initialService?: string) => void;
}

export const PersonalYearCalculator: React.FC<PersonalYearCalculatorProps> = ({
  onOpenConsultationModal
}) => {
  const currentYear = new Date().getFullYear();
  const [dob, setDob] = useState('1992-07-15');
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  const personalYearResult = calculatePersonalYear(dob, selectedYear);
  const epicycle = calculateNineYearEpicycle(dob, currentYear);

  const sampleDates = [
    { label: 'Sample A (July 15)', date: '1992-07-15' },
    { label: 'Sample B (Nov 01)', date: '1988-11-01' },
    { label: 'Sample C (Apr 28)', date: '1995-04-28' },
    { label: 'Sample D (Sept 09)', date: '1984-09-09' }
  ];

  const handleBookWithYear = () => {
    if (!personalYearResult) return;
    trackEvent('calculator_book_click', {
      type: 'personal_year',
      dob,
      targetYear: selectedYear,
      personalYearNumber: personalYearResult.personalYearNumber
    });
    onOpenConsultationModal(
      `Personal Year ${personalYearResult.personalYearNumber} Strategic Planning for ${selectedYear} (DOB: ${dob})`
    );
  };

  const handleWhatsAppWithYear = () => {
    if (!personalYearResult) return;
    trackEvent('whatsapp_click', {
      source: 'personal_year_calculator',
      dob,
      personalYear: personalYearResult.personalYearNumber
    });
    const url = generateWhatsAppLink({
      fullName: '',
      dateOfBirth: dob,
      consultationType: 'Numerology',
      areaOfGuidance: `I checked my Personal Year for ${selectedYear}: It is Year ${personalYearResult.personalYearNumber} (${personalYearResult.theme}). I would like Archanna's strategic advisory for this cycle.`
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-[#10152A]/90 border border-[#C8A45D]/30 rounded-2xl p-6 sm:p-8 backdrop-blur-sm space-y-6">
      {/* Header */}
      <div className="border-b border-white/10 pb-5">
        <span className="text-[11px] font-mono tracking-widest uppercase text-[#C8A45D]">
          Karmic Timing & Epicycle Matrix
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#F7F4EC] mt-1">
          9-Year Personal Year Cycle Forecaster
        </h3>
        <p className="text-xs text-[#9EA3B5] mt-1 max-w-2xl">
          Understand the universal rhythmic tide governing your current year. Align career transitions, capital investments, marriage, and spiritual retreats with cosmic timing.
        </p>
      </div>

      {/* Date & Target Year Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
        <div className="sm:col-span-6 space-y-1.5">
          <label className="block text-xs font-medium text-[#E8D5A8]">
            Your Date of Birth (Day & Month dictate cycle)
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-[#9EA3B5] absolute left-3 top-3" />
            <input
              type="date"
              value={dob}
              onChange={e => setDob(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#080A14] border border-[#C8A45D]/40 text-sm text-[#F7F4EC] focus:border-[#C8A45D] focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="sm:col-span-6 space-y-1.5">
          <label className="block text-xs font-medium text-[#E8D5A8]">
            Target Calendar Year
          </label>
          <div className="flex items-center gap-2">
            {[currentYear - 1, currentYear, currentYear + 1, currentYear + 2].map(yr => (
              <button
                key={yr}
                type="button"
                onClick={() => setSelectedYear(yr)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-mono transition-colors cursor-pointer border ${
                  selectedYear === yr
                    ? 'bg-[#C8A45D] border-[#C8A45D] text-[#080A14] font-bold shadow-md'
                    : 'bg-[#080A14] border-white/10 text-[#9EA3B5] hover:text-[#F7F4EC] hover:border-white/20'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sample Presets */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-[#9EA3B5]">
        <span className="text-[11px] font-mono">Sample DOBs:</span>
        {sampleDates.map(s => (
          <button
            key={s.date}
            type="button"
            onClick={() => setDob(s.date)}
            className="px-2.5 py-1 rounded bg-[#080A14] hover:bg-[#151c38] border border-white/10 hover:border-[#C8A45D]/40 text-[11px] text-[#E8D5A8] transition-colors cursor-pointer"
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Active Personal Year Highlight Card */}
      {personalYearResult && (
        <div className="space-y-6 pt-2">
          
          <div className="p-6 rounded-xl bg-gradient-to-br from-[#10152A] via-[#0b0e1b] to-[#080A14] border border-[#C8A45D]/40 space-y-5 shadow-xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#9EA3B5]">
                  Vibrational Cycle for {selectedYear}
                </span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="font-serif text-4xl sm:text-5xl font-bold text-[#E8D5A8]">
                    Personal Year {personalYearResult.personalYearNumber}
                  </span>
                </div>
                <p className="text-sm font-medium text-[#F7F4EC] mt-1">
                  {personalYearResult.theme}
                </p>
              </div>

              <div className="text-right space-y-1 self-start sm:self-auto">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-medium border border-[#C8A45D]/30 bg-[#C8A45D]/10 text-[#C8A45D]">
                  {personalYearResult.energyQuality}
                </span>
                <p className="text-[11px] font-mono text-[#9EA3B5]">
                  Planetary Ruler: <strong className="text-[#F7F4EC]">{personalYearResult.governingPlanet}</strong>
                </p>
              </div>
            </div>

            {/* Strategic Advice */}
            <div className="p-4 rounded-xl bg-[#080A14] border border-[#C8A45D]/25 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#C8A45D] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Strategic Life Compass</span>
              </div>
              <p className="text-xs sm:text-sm text-[#F7F4EC] leading-relaxed italic">
                "{personalYearResult.strategicAdvice}"
              </p>
            </div>

            {/* Opportunities vs Precautions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-[#080A14]/70 border border-emerald-500/20 space-y-2">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <CheckCircle className="w-4 h-4" />
                  <span>Key Opportunities to Capitalize On</span>
                </div>
                <ul className="space-y-1.5 text-[#9EA3B5]">
                  {personalYearResult.opportunities.map((op, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 leading-snug">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{op}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-[#080A14]/70 border border-amber-500/20 space-y-2">
                <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                  <AlertCircle className="w-4 h-4" />
                  <span>What to Guard Against / Avoid</span>
                </div>
                <ul className="space-y-1.5 text-[#9EA3B5]">
                  {personalYearResult.precautions.map((pr, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 leading-snug">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{pr}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* 9-Year Epicycle Timeline Ribbon */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono uppercase tracking-wider text-[#9EA3B5]">
                Your 9-Year Epicycle Horizon ({currentYear} – {currentYear + 8})
              </span>
              <span className="text-[11px] text-[#C8A45D]">Click any year to view insights</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-9 gap-2">
              {epicycle.map(item => {
                const isSelected = selectedYear === item.year;
                return (
                  <button
                    key={item.year}
                    type="button"
                    onClick={() => setSelectedYear(item.year)}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#10152A] border-[#C8A45D] text-[#E8D5A8] shadow-[0_0_15px_rgba(200,164,93,0.3)] ring-1 ring-[#C8A45D]'
                        : 'bg-[#080A14] border-white/10 text-[#9EA3B5] hover:border-[#C8A45D]/40 hover:text-[#F7F4EC]'
                    }`}
                  >
                    <span className="font-mono text-xs">{item.year}</span>
                    <span className="font-serif text-lg font-bold text-[#E8D5A8] mt-0.5">
                      Yr {item.personalYearNumber}
                    </span>
                    <span className="text-[9px] text-[#9EA3B5] truncate max-w-full text-center mt-0.5">
                      {item.theme.split(',')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CTA Bar */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
            <p className="text-xs text-[#9EA3B5] text-center sm:text-left">
              Want a comprehensive month-by-month timing calendar for your Year {personalYearResult.personalYearNumber}?
            </p>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleBookWithYear}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] hover:from-[#d5b36e] hover:to-[#f0e0b9] text-[#080A14] font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>Book Timing Advisory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleWhatsAppWithYear}
                className="px-3.5 py-2.5 rounded-lg bg-[#080A14] hover:bg-[#151c38] border border-[#25D366]/40 text-[#25D366] text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                title="Discuss timing on WhatsApp"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
