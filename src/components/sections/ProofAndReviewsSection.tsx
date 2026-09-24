import React, { useState } from 'react';
import { CASE_STUDIES } from '../../data/caseStudiesData';
import { TESTIMONIALS } from '../../data/servicesData';
import { Sparkles, Quote, MapPin, CheckCircle2, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';
import { trackEvent } from '../../lib/analytics';

interface ProofAndReviewsSectionProps {
  onOpenConsultationModal: (serviceName?: string) => void;
}

export const ProofAndReviewsSection: React.FC<ProofAndReviewsSectionProps> = ({
  onOpenConsultationModal
}) => {
  const [activeTab, setActiveTab] = useState<'cases' | 'reviews'>('cases');
  const [selectedCaseId, setSelectedCaseId] = useState<string>(CASE_STUDIES[0].id);

  const activeCase = CASE_STUDIES.find(c => c.id === selectedCaseId) || CASE_STUDIES[0];

  return (
    <section id="case-studies" className="py-16 lg:py-24 bg-gradient-to-b from-[#080A14] via-[#0D1224] to-[#080A14] border-t border-[#C8A45D]/15 relative">
      <span id="testimonials" className="absolute -top-24 pointer-events-none" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(200,164,93,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10152A] border border-[#C8A45D]/30 text-xs font-mono text-[#E8D5A8] uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5 text-[#C8A45D]" />
            <span>Proven Real-World Impact</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#F7F4EC] tracking-tight">
            Documented Outcomes & Client Experiences
          </h2>

          <p className="text-xs sm:text-sm text-[#9EA3B5] leading-relaxed max-w-2xl mx-auto">
            Explore verified corporate turnaround case studies, name correction transformations, and testimonials from across India and worldwide.
          </p>
        </div>

        {/* Tab Switcher: Case Studies vs Testimonials */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-xl bg-[#10152A] border border-[#C8A45D]/25 gap-1 shadow-md">
            <button
              type="button"
              onClick={() => {
                setActiveTab('cases');
                trackEvent('proof_tab_switch', { tab: 'cases' });
              }}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'cases'
                  ? 'bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] text-[#080A14] shadow'
                  : 'text-[#9EA3B5] hover:text-[#F7F4EC]'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Real Transformations ({CASE_STUDIES.length} Cases)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('reviews');
                trackEvent('proof_tab_switch', { tab: 'reviews' });
              }}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'reviews'
                  ? 'bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] text-[#080A14] shadow'
                  : 'text-[#9EA3B5] hover:text-[#F7F4EC]'
              }`}
            >
              <Quote className="w-4 h-4" />
              <span>Client Endorsements ({TESTIMONIALS.length} Stories)</span>
            </button>
          </div>
        </div>

        {/* TAB 1: CASE STUDIES */}
        {activeTab === 'cases' && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
            {/* Case Studies Selector Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {CASE_STUDIES.map(item => {
                const isSelected = item.id === selectedCaseId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelectedCaseId(item.id);
                      trackEvent('case_study_select', { caseId: item.id });
                    }}
                    className={`text-left p-4 rounded-xl transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-[#10152A] border-[#C8A45D] shadow-[0_0_20px_rgba(200,164,93,0.2)]'
                        : 'bg-[#10152A]/60 border-white/5 hover:border-[#C8A45D]/40'
                    }`}
                  >
                    <span className="text-[10px] font-mono text-[#C8A45D] uppercase tracking-wider block">
                      {item.clientType}
                    </span>
                    <h4 className="font-serif text-sm font-medium text-[#F7F4EC] mt-1 line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-[#9EA3B5] mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#C8A45D] shrink-0" />
                      <span>{item.location}</span>
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Selected Case Study Detail Sheet */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#10152A]/90 border border-[#C8A45D]/30 shadow-2xl space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#C8A45D] bg-[#080A14] px-2.5 py-0.5 rounded border border-[#C8A45D]/30">
                      {activeCase.clientType}
                    </span>
                    <span className="text-xs text-[#9EA3B5] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#C8A45D]" />
                      <span>{activeCase.location}</span>
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-medium text-[#F7F4EC] mt-1.5">
                    {activeCase.title}
                  </h3>
                  <p className="text-xs text-[#E8D5A8] mt-0.5">
                    {activeCase.subtitle}
                  </p>
                </div>

                {/* Metric Badges */}
                <div className="flex flex-wrap gap-2">
                  {activeCase.metrics.map((m, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-[#080A14] border border-[#C8A45D]/40 text-xs font-mono text-[#E8D5A8] font-bold shadow-sm"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Challenge vs Remedies vs Outcome Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#080A14]/70 border border-white/5 space-y-2">
                  <span className="text-xs font-mono font-semibold text-red-400 block uppercase tracking-wide">
                    Initial Bottleneck
                  </span>
                  <p className="text-xs text-[#9EA3B5] leading-relaxed">
                    {activeCase.keyChallenge}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#080A14]/70 border border-[#C8A45D]/20 space-y-2">
                  <span className="text-xs font-mono font-semibold text-[#E8D5A8] block uppercase tracking-wide">
                    Applied Non-Demolition Remedies
                  </span>
                  <ul className="text-xs text-[#9EA3B5] space-y-1.5">
                    {activeCase.keyRemedies.map((r, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A45D] shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#080A14]/70 border border-emerald-500/20 space-y-2">
                  <span className="text-xs font-mono font-semibold text-emerald-400 block uppercase tracking-wide">
                    Measured Outcome
                  </span>
                  <p className="text-xs text-[#9EA3B5] leading-relaxed">
                    {activeCase.keyOutcome}
                  </p>
                </div>
              </div>

              {/* Quote Excerpt */}
              <div className="p-4 rounded-xl bg-[#080A14] border border-white/10 flex items-start gap-3">
                <Quote className="w-5 h-5 text-[#C8A45D] shrink-0 mt-0.5 opacity-80" />
                <div>
                  <p className="font-serif italic text-xs sm:text-sm text-[#F7F4EC] leading-relaxed">
                    "{activeCase.testimonialExcerpt}"
                  </p>
                  <p className="text-[11px] text-[#C8A45D] font-mono mt-1">
                    — {activeCase.clientPseudonym}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
                <span className="text-xs text-[#9EA3B5]">
                  Facing a similar commercial stagnation or residential imbalance?
                </span>
                <button
                  type="button"
                  onClick={() => onOpenConsultationModal(`Consultation inspired by ${activeCase.title}`)}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] text-[#080A14] text-xs font-semibold hover:from-[#d8b56f] hover:to-[#f0e2be] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Request Similar Strategic Analysis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CLIENT TESTIMONIALS */}
        {activeTab === 'reviews' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in zoom-in-95 duration-200">
            {TESTIMONIALS.map(t => (
              <div
                key={t.id}
                className="flex flex-col justify-between p-6 rounded-2xl bg-[#10152A]/90 border border-[#C8A45D]/20 hover:border-[#C8A45D]/50 transition-all shadow-lg hover:-translate-y-0.5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-full bg-[#080A14] border border-[#C8A45D]/30 flex items-center justify-center text-[#C8A45D]">
                      <Quote className="w-3.5 h-3.5 fill-current opacity-80" />
                    </div>
                    <span className="text-[10px] font-mono text-[#C8A45D] bg-[#080A14] px-2.5 py-1 rounded border border-white/5">
                      {t.serviceCategory}
                    </span>
                  </div>

                  <p className="font-serif text-sm sm:text-base text-[#F7F4EC] leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-[#F7F4EC]">
                      {t.author}
                    </h4>
                    <p className="text-[11px] text-[#9EA3B5]">
                      {t.role}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#E8D5A8] font-mono">
                    <MapPin className="w-3 h-3 text-[#C8A45D]" />
                    <span>{t.city}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
