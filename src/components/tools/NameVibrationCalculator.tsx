import React, { useState } from 'react';
import {
  calculateNameVibration,
  NumerologySystem
} from '../../lib/numerologyCalculator';
import { trackEvent } from '../../lib/analytics';
import { Sparkles, ArrowRight, RefreshCw, CheckCircle2, AlertTriangle, Shield } from 'lucide-react';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { generateWhatsAppLink } from '../../lib/validation';

interface NameVibrationCalculatorProps {
  onOpenConsultationModal: (initialService?: string) => void;
}

export const NameVibrationCalculator: React.FC<NameVibrationCalculatorProps> = ({
  onOpenConsultationModal
}) => {
  const [inputName, setInputName] = useState('Archanna Nirrmale');
  const [system, setSystem] = useState<NumerologySystem>('chaldean');

  const result = calculateNameVibration(inputName, system);

  const presets = [
    { label: 'Founder Example', name: 'Archanna Nirrmale' },
    { label: 'Tech Brand', name: 'Quantum Leap' },
    { label: 'Luxury Brand', name: 'Aura Veda' },
    { label: 'Executive Name', name: 'Vikram Deshmukh' }
  ];

  const handleBookWithData = () => {
    trackEvent('calculator_book_click', {
      type: 'name_vibration',
      name: inputName,
      compound: result.compoundNumber
    });
    onOpenConsultationModal(`Name Analysis for: ${inputName} (Compound ${result.compoundNumber}/${result.singleDigit})`);
  };

  const handleWhatsAppWithData = () => {
    trackEvent('whatsapp_click', {
      source: 'name_calculator',
      name: inputName
    });
    const url = generateWhatsAppLink({
      fullName: inputName,
      consultationType: 'Numerology',
      areaOfGuidance: `Name Vibration Analysis: "${inputName}" resulted in Compound ${result.compoundNumber} (Root ${result.singleDigit}). Would like Archanna's expert assessment.`
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getVerdictStyle = (verdict?: string) => {
    switch (verdict) {
      case 'Auspicious':
        return 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20';
      case 'Favorable':
        return 'text-[#C8A45D] border-[#C8A45D]/30 bg-[#C8A45D]/10';
      case 'Requires Alignment':
        return 'text-amber-400 border-amber-500/30 bg-amber-950/20';
      default:
        return 'text-[#9EA3B5] border-white/10 bg-white/5';
    }
  };

  return (
    <div className="bg-[#10152A]/90 border border-[#C8A45D]/30 rounded-2xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#C8A45D]">
            Vibrational Name Analysis
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#F7F4EC] mt-1">
            Chaldean & Pythagorean Name Calculator
          </h3>
          <p className="text-xs text-[#9EA3B5] mt-1">
            Test any personal, newborn, or commercial brand name to reveal its esoteric compound vibration.
          </p>
        </div>

        {/* System Selector */}
        <div className="w-full sm:w-auto grid grid-cols-2 sm:inline-flex rounded-lg bg-[#080A14] p-1 border border-white/10 shrink-0">
          <button
            type="button"
            onClick={() => setSystem('chaldean')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer text-center ${
              system === 'chaldean'
                ? 'bg-[#C8A45D] text-[#080A14] font-semibold'
                : 'text-[#9EA3B5] hover:text-[#F7F4EC]'
            }`}
          >
            Chaldean (Vedic)
          </button>
          <button
            type="button"
            onClick={() => setSystem('pythagorean')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer text-center ${
              system === 'pythagorean'
                ? 'bg-[#C8A45D] text-[#080A14] font-semibold'
                : 'text-[#9EA3B5] hover:text-[#F7F4EC]'
            }`}
          >
            Pythagorean (Western)
          </button>
        </div>
      </div>

      {/* Input Box & Presets */}
      <div className="space-y-3">
        <label className="block text-xs font-medium text-[#E8D5A8]">
          Enter Name or Brand (Letters Only)
        </label>
        <div className="relative">
          <input
            type="text"
            value={inputName}
            onChange={e => setInputName(e.target.value)}
            placeholder="Type a full name or business trademark..."
            className="w-full pl-4 pr-12 py-3 rounded-xl bg-[#080A14] border border-[#C8A45D]/40 text-sm sm:text-base text-[#F7F4EC] focus:border-[#C8A45D] focus:outline-none transition-colors tracking-wide font-sans uppercase"
          />
          {inputName && (
            <button
              type="button"
              onClick={() => setInputName('')}
              className="absolute right-3 top-3 text-xs text-[#9EA3B5] hover:text-[#F7F4EC]"
              title="Clear input"
            >
              Clear
            </button>
          )}
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[#9EA3B5]">
          <span className="text-[11px] font-mono">Try examples:</span>
          {presets.map(p => (
            <button
              key={p.name}
              type="button"
              onClick={() => setInputName(p.name)}
              className="px-2.5 py-1 rounded bg-[#080A14] hover:bg-[#151c38] border border-white/10 hover:border-[#C8A45D]/40 text-[11px] text-[#E8D5A8] transition-colors cursor-pointer"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Letter by Letter Breakdown */}
      {result.breakdown.length > 0 ? (
        <div className="space-y-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#9EA3B5]">
              Numerical Breakdown ({system === 'chaldean' ? 'Chaldean Grid' : 'Pythagorean Sequence'})
            </span>
            <div className="flex flex-wrap gap-2 mt-2">
              {result.breakdown.map((item, idx) => (
                <div
                  key={`${item.letter}-${idx}`}
                  className="flex flex-col items-center justify-center w-8 sm:w-10 h-12 sm:h-14 rounded-lg bg-[#080A14] border border-[#C8A45D]/25 shrink-0"
                >
                  <span className="font-serif text-sm sm:text-base font-semibold text-[#F7F4EC]">
                    {item.letter}
                  </span>
                  <span className="font-mono text-[10px] sm:text-xs text-[#C8A45D] mt-0.5">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* Compound Number Card */}
            <div className="p-4 rounded-xl bg-[#080A14] border border-[#C8A45D]/30 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#9EA3B5]">
                Compound Number
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#E8D5A8]">
                  {result.compoundNumber}
                </span>
                <span className="text-xs text-[#9EA3B5]">
                  Sum of all letters
                </span>
              </div>
              <p className="text-xs text-[#E8D5A8] font-medium pt-1">
                {result.interpretation?.name || `Compound ${result.compoundNumber}`}
              </p>
            </div>

            {/* Root Single Digit Card */}
            <div className="p-4 rounded-xl bg-[#080A14] border border-[#C8A45D]/30 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#9EA3B5]">
                Single Root Vibration
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#C8A45D]">
                  {result.singleDigit}
                </span>
                <span className="text-xs text-[#9EA3B5]">
                  Core soul frequency
                </span>
              </div>
              <p className="text-xs text-[#9EA3B5] pt-1">
                Governed by: <strong className="text-[#F7F4EC]">{result.interpretation?.planetaryAssociation.split('–')[0]}</strong>
              </p>
            </div>

            {/* Vibration Status Card */}
            <div className="p-4 rounded-xl bg-[#080A14] border border-[#C8A45D]/30 space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#9EA3B5]">
                  Vibrational Verdict
                </span>
                <div className={`mt-1.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium border ${getVerdictStyle(result.interpretation?.verdict)}`}>
                  {result.interpretation?.verdict === 'Auspicious' ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : result.interpretation?.verdict === 'Requires Alignment' ? (
                    <AlertTriangle className="w-3.5 h-3.5" />
                  ) : (
                    <Shield className="w-3.5 h-3.5" />
                  )}
                  <span>{result.interpretation?.verdict}</span>
                </div>
              </div>

              <span className="text-[11px] text-[#9EA3B5] block">
                {system === 'chaldean' ? 'Ancient Chaldean Esoteric Matrix' : 'Pythagorean Modern Reduction'}
              </span>
            </div>
          </div>

          {/* Full Esoteric Meaning Description */}
          {result.interpretation && (
            <div className="p-4 rounded-xl bg-[#080A14]/80 border border-white/10 space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C8A45D]" />
                <h4 className="font-serif text-sm font-semibold text-[#F7F4EC]">
                  Classical Reading for Compound {result.compoundNumber}: {result.interpretation.name}
                </h4>
              </div>
              <p className="text-xs text-[#9EA3B5] leading-relaxed">
                {result.interpretation.description}
              </p>
              <div className="pt-1 text-[11px] text-[#E8D5A8]/90 font-mono">
                Planetary Ruler: {result.interpretation.planetaryAssociation}
              </div>
            </div>
          )}

          {/* Action Call to Action */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
            <p className="text-xs text-[#9EA3B5] text-center sm:text-left">
              Want Archanna to evaluate if <strong className="text-[#F7F4EC]">{inputName}</strong> aligns with your birth date?
            </p>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleBookWithData}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] hover:from-[#d5b36e] hover:to-[#f0e0b9] text-[#080A14] font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>Book Full Name Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleWhatsAppWithData}
                className="px-3.5 py-2.5 rounded-lg bg-[#080A14] hover:bg-[#151c38] border border-[#25D366]/40 text-[#25D366] text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                title="Discuss this name vibration on WhatsApp"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-xs text-[#9EA3B5] bg-[#080A14] rounded-xl border border-white/5">
          Please enter at least one letter in the input box above to generate the vibration analysis.
        </div>
      )}
    </div>
  );
};
