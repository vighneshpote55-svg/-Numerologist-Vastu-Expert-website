import React, { useState } from 'react';
import { CASE_STUDIES } from '../../data/caseStudiesData';
import { Sparkles, MapPin, CheckCircle2, TrendingUp, Quote, ArrowRight } from 'lucide-react';
import { trackEvent } from '../../lib/analytics';

interface CaseStudiesSectionProps {
  onOpenConsultationModal: (initialService?: string) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  onOpenConsultationModal
}) => {
  const [activeCaseId, setActiveCaseId] = useState<string>(CASE_STUDIES[0].id);

  const activeCase = CASE_STUDIES.find(c => c.id === activeCaseId) || CASE_STUDIES[0];

  const handleSelectCase = (id: string) => {
    trackEvent('case_study_select', { caseId: id });
    setActiveCaseId(id);
  };

  return (
    <section id="case-studies" className="py-16 lg:py-24 bg-[#080A14] border-t border-[#C8A45D]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10152A] border border-[#C8A45D]/30 text-xs font-mono text-[#E8D5A8] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A45D]" />
            <span>Proven Outcomes</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#F7F4EC] tracking-tight">
            Real Transformations, Zero Demolition
          </h2>

          <p className="text-xs sm:text-sm text-[#9EA3B5]">
            Key metrics and verified results from recent non-demolition Vastu and Chaldean numerology audits.
          </p>
        </div>

        {/* Case Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CASE_STUDIES.map(c => (
            <button
              key={c.id}
              type="button"
              onClick={() => handleSelectCase(c.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeCaseId === c.id
                  ? 'bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] text-[#080A14] font-semibold shadow-md'
                  : 'bg-[#10152A] text-[#9EA3B5] hover:text-[#F7F4EC] border border-white/5 hover:border-[#C8A45D]/30'
              }`}
            >
              <span>{c.clientType}</span>
            </button>
          ))}
        </div>

        {/* Active Case Study Detail Box */}
        <div className="bg-[#10152A]/90 border border-[#C8A45D]/35 rounded-2xl p-6 sm:p-8 backdrop-blur-sm space-y-6 max-w-4xl mx-auto shadow-xl">
          
          {/* Header & Metrics */}
          <div className="border-b border-white/10 pb-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#C8A45D]">
                {activeCase.clientType} Case
              </span>
              <div className="flex items-center gap-1.5 text-[#9EA3B5] text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-[#C8A45D]" />
                <span>{activeCase.location}</span>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#F7F4EC]">
                {activeCase.title}
              </h3>
              <p className="text-xs text-[#E8D5A8] mt-0.5">
                {activeCase.subtitle}
              </p>
            </div>

            {/* Key Metrics Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              {activeCase.metrics.map((m, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-[#080A14] border border-emerald-500/40 text-emerald-300 font-mono text-[11px] font-semibold"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Key Challenge & Remedies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#080A14] border border-white/10 space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                Challenge
              </span>
              <p className="text-[#9EA3B5] leading-relaxed">
                {activeCase.keyChallenge}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#080A14] border border-white/10 space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#C8A45D] font-bold block">
                Applied Solutions
              </span>
              <ul className="space-y-1.5 text-[#F7F4EC]">
                {activeCase.keyRemedies.map((remedy, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A45D] shrink-0 mt-0.5" />
                    <span>{remedy}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Measurable Outcome Strip */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#182348] to-[#10152A] border border-[#C8A45D]/40 flex items-start gap-3">
            <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-400 block">
                Outcome
              </span>
              <p className="text-xs sm:text-sm text-[#F7F4EC] leading-relaxed font-medium mt-0.5">
                {activeCase.keyOutcome}
              </p>
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="p-4 rounded-xl bg-[#080A14] border border-[#C8A45D]/20 relative">
            <Quote className="w-5 h-5 text-[#C8A45D]/20 absolute top-3 right-3 pointer-events-none" />
            <p className="text-xs italic text-[#E8D5A8]">
              "{activeCase.testimonialExcerpt}"
            </p>
            <div className="text-[10px] text-[#9EA3B5] font-mono mt-1.5">
              — {activeCase.clientPseudonym}
            </div>
          </div>

          {/* Consultation CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
            <p className="text-xs text-[#9EA3B5]">
              Facing similar blockages?
            </p>

            <button
              type="button"
              onClick={() => onOpenConsultationModal(`Consultation inspired by ${activeCase.title}`)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] text-[#080A14] font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm hover:brightness-105"
            >
              <span>Consult Archanna</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
