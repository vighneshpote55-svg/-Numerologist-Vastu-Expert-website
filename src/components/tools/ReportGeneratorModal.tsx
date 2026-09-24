import React, { useState } from 'react';
import { Printer, Download, Sparkles, X, Check, ShieldCheck, Sun, Moon, Compass, Hash } from 'lucide-react';
import { calculateNameVibration } from '../../lib/numerologyCalculator';
import { calculateBirthNumbers } from '../../lib/numerologyCalculator';
import { calculatePersonalYear } from '../../lib/personalYearCalculator';

interface ReportData {
  fullName: string;
  dob: string;
  propertyType?: string;
  notes?: string;
}

interface ReportGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<ReportData>;
}

export const ReportGeneratorModal: React.FC<ReportGeneratorModalProps> = ({
  isOpen,
  onClose,
  initialData
}) => {
  const currentYear = new Date().getFullYear();
  const [name, setName] = useState(initialData?.fullName || 'Archanna Nirrmale');
  const [dob, setDob] = useState(initialData?.dob || '1992-07-15');

  if (!isOpen) return null;

  const nameResult = calculateNameVibration(name, 'chaldean');
  const birthResult = calculateBirthNumbers(dob);
  const personalYearResult = calculatePersonalYear(dob, currentYear);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#10152A] border border-[#C8A45D]/50 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Action Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C8A45D]" />
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#F7F4EC]">
              Vedic Blueprint Summary Brief
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] text-[#080A14] font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm hover:brightness-105"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#9EA3B5] hover:text-[#F7F4EC] hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Input Parameters bar (hidden on print) */}
        <div className="p-4 rounded-xl bg-[#080A14] border border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs print:hidden">
          <div>
            <label className="block text-[#E8D5A8] font-mono text-[11px] mb-1">
              Full Name to Audit:
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#10152A] border border-[#C8A45D]/30 text-[#F7F4EC] focus:border-[#C8A45D] focus:outline-none uppercase font-sans tracking-wide"
            />
          </div>

          <div>
            <label className="block text-[#E8D5A8] font-mono text-[11px] mb-1">
              Date of Birth:
            </label>
            <input
              type="date"
              value={dob}
              onChange={e => setDob(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#10152A] border border-[#C8A45D]/30 text-[#F7F4EC] focus:border-[#C8A45D] focus:outline-none"
            />
          </div>
        </div>

        {/* PRINTABLE REPORT SHEET CONTAINER */}
        <div id="printable-vedic-report" className="p-6 sm:p-8 bg-[#0b0e1b] border border-[#C8A45D]/40 rounded-xl space-y-6 text-[#F7F4EC] print:bg-white print:text-black print:p-0 print:border-none">
          
          {/* Brand Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#C8A45D]/30 pb-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#C8A45D]">
                Vedic Numerology & Sacred Architecture Summary
              </span>
              <h2 className="font-serif text-2xl font-bold tracking-tight text-[#F7F4EC]">
                Archanna Nirrmale Advisory Brief
              </h2>
              <p className="text-xs text-[#9EA3B5] mt-0.5">
                Certified Practitioner · Non-Demolition Spatial & Vibration Balancing
              </p>
            </div>

            <div className="text-right text-xs space-y-0.5 text-[#9EA3B5]">
              <span className="font-mono block text-[#E8D5A8]">Client Dossier</span>
              <span>Date: {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
          </div>

          {/* Client Identity Block */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-lg bg-[#10152A] border border-white/5 text-xs">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#9EA3B5] block">Audited Name</span>
              <span className="font-semibold text-[#F7F4EC] mt-0.5 block uppercase truncate">{name}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-[#9EA3B5] block">Date of Birth</span>
              <span className="font-mono text-[#F7F4EC] mt-0.5 block">{dob}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-[#9EA3B5] block">Chaldean Compound</span>
              <span className="font-serif font-bold text-[#C8A45D] text-base mt-0.5 block">{nameResult.compoundNumber} / {nameResult.singleDigit}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-[#9EA3B5] block">Driver / Conductor</span>
              <span className="font-serif font-bold text-[#E8D5A8] text-base mt-0.5 block">{birthResult?.mulank} & {birthResult?.bhagyank}</span>
            </div>
          </div>

          {/* Section 1: Name Vibration Analysis */}
          <div className="space-y-2">
            <h4 className="font-serif text-base font-semibold text-[#E8D5A8] flex items-center gap-1.5 border-b border-white/10 pb-1">
              <Hash className="w-4 h-4 text-[#C8A45D]" />
              <span>1. Chaldean Name Vibration Breakdown</span>
            </h4>
            
            <div className="p-3.5 rounded-lg bg-[#10152A]/80 border border-white/5 space-y-2 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-mono text-[#9EA3B5]">Vibrational Verdict: </span>
                  <strong className="text-[#C8A45D]">{nameResult.interpretation?.verdict}</strong>
                </div>
                <div>
                  <span className="font-mono text-[#9EA3B5]">Planetary Governor: </span>
                  <span className="text-[#F7F4EC] font-medium">{nameResult.interpretation?.planetaryAssociation}</span>
                </div>
              </div>
              <p className="text-[#9EA3B5] leading-relaxed text-[11px]">
                {nameResult.interpretation?.description}
              </p>
            </div>
          </div>

          {/* Section 2: Birth Numbers & Synergy */}
          {birthResult && (
            <div className="space-y-2">
              <h4 className="font-serif text-base font-semibold text-[#E8D5A8] flex items-center gap-1.5 border-b border-white/10 pb-1">
                <Sun className="w-4 h-4 text-[#C8A45D]" />
                <span>2. Mulank (Driver) & Bhagyank (Conductor) Dynamics</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-lg bg-[#10152A]/80 border border-white/5 space-y-1">
                  <div className="flex justify-between font-mono">
                    <span className="text-[#C8A45D]">Mulank {birthResult.mulank} (Driver)</span>
                    <span className="text-[#9EA3B5]">{birthResult.driverPlanet}</span>
                  </div>
                  <p className="text-[11px] text-[#9EA3B5] leading-relaxed">
                    Governs core personality, natural talents, and immediate instinctive actions.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#10152A]/80 border border-white/5 space-y-1">
                  <div className="flex justify-between font-mono">
                    <span className="text-[#E8D5A8]">Bhagyank {birthResult.bhagyank} (Conductor)</span>
                    <span className="text-[#9EA3B5]">{birthResult.destinyPlanet}</span>
                  </div>
                  <p className="text-[11px] text-[#9EA3B5] leading-relaxed">
                    Governs overarching destiny, career milestones, and karmic life purpose.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
                <div className="p-2.5 rounded bg-[#10152A] border border-white/5">
                  <span className="text-[10px] font-mono text-[#9EA3B5] block">Auspicious Colors</span>
                  <span className="text-[11px] text-[#F7F4EC] truncate block mt-0.5">{birthResult.luckyColors}</span>
                </div>
                <div className="p-2.5 rounded bg-[#10152A] border border-white/5">
                  <span className="text-[10px] font-mono text-[#9EA3B5] block">Power Days</span>
                  <span className="text-[11px] text-[#F7F4EC] block mt-0.5">{birthResult.luckyDays}</span>
                </div>
                <div className="p-2.5 rounded bg-[#10152A] border border-white/5">
                  <span className="text-[10px] font-mono text-[#9EA3B5] block">Harmonious Numbers</span>
                  <span className="text-[11px] text-emerald-400 block mt-0.5">{birthResult.friendlyNumbers.join(', ')}</span>
                </div>
                <div className="p-2.5 rounded bg-[#10152A] border border-white/5">
                  <span className="text-[10px] font-mono text-[#9EA3B5] block">Caution Numbers</span>
                  <span className="text-[11px] text-amber-400 block mt-0.5">{birthResult.challengingNumbers.length > 0 ? birthResult.challengingNumbers.join(', ') : 'None'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Personal Year Timing */}
          {personalYearResult && (
            <div className="space-y-2">
              <h4 className="font-serif text-base font-semibold text-[#E8D5A8] flex items-center gap-1.5 border-b border-white/10 pb-1">
                <Compass className="w-4 h-4 text-[#C8A45D]" />
                <span>3. Current Cycle: Personal Year {personalYearResult.personalYearNumber} ({currentYear})</span>
              </h4>

              <div className="p-3.5 rounded-lg bg-[#10152A]/80 border border-white/5 space-y-1 text-xs">
                <div className="flex justify-between font-mono">
                  <span className="text-[#F7F4EC] font-semibold">{personalYearResult.theme}</span>
                  <span className="text-[#C8A45D]">{personalYearResult.energyQuality}</span>
                </div>
                <p className="text-[11px] text-[#9EA3B5] leading-relaxed pt-1">
                  <strong>Strategic Guideline: </strong> {personalYearResult.strategicAdvice}
                </p>
              </div>
            </div>
          )}

          {/* Professional Stamp Footer */}
          <div className="pt-4 border-t border-[#C8A45D]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#9EA3B5]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C8A45D]" />
              <span>Prepared for 1-on-1 Consultation Reference · Confidential Client Document</span>
            </div>
            <span className="font-mono text-[#E8D5A8]">
              Contact Desk: +91 90110 23754
            </span>
          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/10 print:hidden">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#080A14] text-[#9EA3B5] hover:text-[#F7F4EC] text-xs transition-colors cursor-pointer"
          >
            Close Window
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] hover:from-[#d5b36e] hover:to-[#f0e0b9] text-[#080A14] font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Print or Export PDF</span>
          </button>
        </div>

      </div>
    </div>
  );
};
