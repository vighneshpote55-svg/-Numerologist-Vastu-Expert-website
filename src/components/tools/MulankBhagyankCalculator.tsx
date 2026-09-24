import React, { useState } from 'react';
import { calculateBirthNumbers } from '../../lib/numerologyCalculator';
import { trackEvent } from '../../lib/analytics';
import { generateWhatsAppLink } from '../../lib/validation';
import { Calendar, Sparkles, ArrowRight, Compass, Sun, Moon } from 'lucide-react';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';

interface MulankBhagyankCalculatorProps {
  onOpenConsultationModal: (initialService?: string) => void;
}

export const MulankBhagyankCalculator: React.FC<MulankBhagyankCalculatorProps> = ({
  onOpenConsultationModal
}) => {
  const [dob, setDob] = useState('1992-07-15');

  const analysis = calculateBirthNumbers(dob);

  const sampleDates = [
    { label: 'Example 1 (Day 15)', date: '1992-07-15' },
    { label: 'Example 2 (Day 01)', date: '1988-11-01' },
    { label: 'Example 3 (Day 28)', date: '1995-04-28' },
    { label: 'Example 4 (Day 09)', date: '1984-09-09' }
  ];

  const handleBookSession = () => {
    if (!analysis) return;
    trackEvent('calculator_book_click', {
      type: 'mulank_bhagyank',
      dob,
      mulank: analysis.mulank,
      bhagyank: analysis.bhagyank
    });
    onOpenConsultationModal(
      `Personal Numerology Session: DOB ${dob} (Mulank ${analysis.mulank} & Bhagyank ${analysis.bhagyank})`
    );
  };

  const handleWhatsAppChat = () => {
    if (!analysis) return;
    trackEvent('whatsapp_click', {
      source: 'mulank_calculator',
      dob
    });
    const url = generateWhatsAppLink({
      fullName: '',
      dateOfBirth: dob,
      consultationType: 'Numerology',
      areaOfGuidance: `Mulank ${analysis.mulank} & Bhagyank ${analysis.bhagyank} Advisory for DOB: ${dob}. Requesting consultation availability.`
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-[#10152A]/90 border border-[#C8A45D]/30 rounded-2xl p-6 sm:p-8 backdrop-blur-sm space-y-6">
      {/* Header */}
      <div className="border-b border-white/10 pb-5">
        <span className="text-[11px] font-mono tracking-widest uppercase text-[#C8A45D]">
          Vedic Life Path & Soul Dynamics
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#F7F4EC] mt-1">
          Mulank (Driver) & Bhagyank (Conductor) Calculator
        </h3>
        <p className="text-xs text-[#9EA3B5] mt-1 max-w-2xl">
          Discover your core Driver number (ruling your basic character) and Conductor number (ruling your overarching life destiny and karmic lessons).
        </p>
      </div>

      {/* Date Picker & Presets */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
        <div className="sm:col-span-6 space-y-1.5">
          <label className="block text-xs font-medium text-[#E8D5A8]">
            Select Your Date of Birth
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

        <div className="sm:col-span-6 flex flex-wrap gap-2 items-center">
          <span className="text-[11px] font-mono text-[#9EA3B5] w-full">Quick Sample Dates:</span>
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
      </div>

      {/* Analysis Output */}
      {analysis && (
        <div className="space-y-6 pt-2">
          {/* Top 2 Primary Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Mulank Card */}
            <div className="p-5 rounded-xl bg-[#080A14] border border-[#C8A45D]/35 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8A45D]">
                    Mulank (Birth / Driver)
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-serif text-4xl sm:text-5xl font-bold text-[#F7F4EC]">
                      {analysis.mulank}
                    </span>
                    <span className="text-xs text-[#9EA3B5]">
                      (From day of birth)
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#10152A] border border-[#C8A45D]/30 flex items-center justify-center text-[#C8A45D]">
                  <Sun className="w-6 h-6" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 space-y-1 text-xs">
                <p className="text-[#E8D5A8] font-medium">
                  Ruling Planet: <span className="text-[#F7F4EC]">{analysis.driverPlanet}</span>
                </p>
                <p className="text-[#9EA3B5] text-[11px] leading-relaxed">
                  Defines your conscious identity, instinctive reactions, temperament, and personal passions.
                </p>
              </div>
            </div>

            {/* Bhagyank Card */}
            <div className="p-5 rounded-xl bg-[#080A14] border border-[#C8A45D]/35 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8D5A8]">
                    Bhagyank (Destiny / Conductor)
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-serif text-4xl sm:text-5xl font-bold text-[#E8D5A8]">
                      {analysis.bhagyank}
                    </span>
                    <span className="text-xs text-[#9EA3B5]">
                      (Sum of full date)
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#10152A] border border-[#C8A45D]/30 flex items-center justify-center text-[#E8D5A8]">
                  <Moon className="w-6 h-6" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 space-y-1 text-xs">
                <p className="text-[#E8D5A8] font-medium">
                  Destiny Planet: <span className="text-[#F7F4EC]">{analysis.destinyPlanet}</span>
                </p>
                <p className="text-[#9EA3B5] text-[11px] leading-relaxed">
                  Shapes your life trajectory, karmic opportunities, public career manifestation, and destiny after age 30.
                </p>
              </div>
            </div>

          </div>

          {/* Compatibility & Dynamics */}
          <div className="p-4 rounded-xl bg-[#080A14]/80 border border-white/10 space-y-3">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#C8A45D]" />
              <h4 className="font-serif text-sm font-semibold text-[#F7F4EC]">
                Driver {analysis.mulank} & Conductor {analysis.bhagyank} Synergy
              </h4>
            </div>
            <p className="text-xs text-[#9EA3B5] leading-relaxed">
              {analysis.compatibilityNote}
            </p>

            {/* Matrix of numbers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-lg bg-[#10152A] border border-white/5">
                <span className="text-[10px] font-mono uppercase text-[#9EA3B5] block">
                  Harmonious Partners
                </span>
                <span className="font-serif text-base font-bold text-emerald-400 mt-1 block">
                  {analysis.friendlyNumbers.join(', ')}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[#10152A] border border-white/5">
                <span className="text-[10px] font-mono uppercase text-[#9EA3B5] block">
                  Friction Avoidance
                </span>
                <span className="font-serif text-base font-bold text-amber-400 mt-1 block">
                  {analysis.challengingNumbers.length > 0 ? analysis.challengingNumbers.join(', ') : 'Universally Adaptable'}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[#10152A] border border-white/5">
                <span className="text-[10px] font-mono uppercase text-[#9EA3B5] block">
                  Auspicious Days
                </span>
                <span className="font-medium text-[#F7F4EC] text-xs mt-1 block">
                  {analysis.luckyDays}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[#10152A] border border-white/5">
                <span className="text-[10px] font-mono uppercase text-[#9EA3B5] block">
                  Power Colors
                </span>
                <span className="font-medium text-[#F7F4EC] text-xs mt-1 block truncate" title={analysis.luckyColors}>
                  {analysis.luckyColors}
                </span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
            <p className="text-xs text-[#9EA3B5] text-center sm:text-left">
              Want a comprehensive 24-month roadmap matching your Mulank {analysis.mulank} & Bhagyank {analysis.bhagyank}?
            </p>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleBookSession}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] hover:from-[#d5b36e] hover:to-[#f0e0b9] text-[#080A14] font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>Book Life Path Session</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleWhatsAppChat}
                className="px-3.5 py-2.5 rounded-lg bg-[#080A14] hover:bg-[#151c38] border border-[#25D366]/40 text-[#25D366] text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                title="Discuss your birth numbers on WhatsApp"
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
