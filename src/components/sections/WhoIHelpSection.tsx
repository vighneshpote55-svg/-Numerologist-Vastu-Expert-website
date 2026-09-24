import React, { useState } from 'react';
import { Briefcase, Building2, User, Home, Globe2, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';

interface WhoIHelpSectionProps {
  onOpenConsultationModal: (category?: string) => void;
}

export const WhoIHelpSection: React.FC<WhoIHelpSectionProps> = ({ onOpenConsultationModal }) => {
  const categories = [
    {
      id: 'entrepreneurs',
      icon: Briefcase,
      title: 'Founders & Startups',
      subtitle: 'Brand naming, founder synergy & launch timing',
      keywords: ['Chaldean Naming', 'Founder Synergy', 'Launch Dates'],
      painPoints: [
        'Selecting brand names with high commercial magnetism and legal trademark viability',
        'Validating co-founder partnership frequencies and board harmony'
      ],
      solution:
        'Compound Chaldean spelling analysis of brand names, founder synergy audits, and high-velocity launch windows.'
    },
    {
      id: 'homeowners',
      icon: Home,
      title: 'Homeowners & Families',
      subtitle: 'Residential harmony, entrance padas & restful sleep',
      keywords: ['16-Zone Grid', 'Sleep Restoration', 'Zero Demolition'],
      painPoints: [
        'Vetting flats or villas before signing leases or token deposits',
        'Resolving sleep disruption and domestic anxiety without breaking walls'
      ],
      solution:
        '16-zone floor plan diagnostics, elemental copper/brass energy strips, and non-demolition furniture realignments.'
    },
    {
      id: 'professionals',
      icon: Building2,
      title: 'Corporate Leaders',
      subtitle: 'Career transitions, signature graphology & promotion cycles',
      keywords: ['Signature Correction', 'VIP Mobile Numbers', '9-Year Cycles'],
      painPoints: [
        'Breaking career stagnation at senior director/executive levels',
        'Subconscious downward strokes in signatures projecting hesitation'
      ],
      solution:
        '9-Year Personal Cycle forecasting, ascending signature design, and mobile frequency calibration.'
    },
    {
      id: 'nris',
      icon: Globe2,
      title: 'Global NRIs',
      subtitle: 'Virtual advisory across US, UK, UAE & Singapore',
      keywords: ['Virtual HD Calls', 'Western Floorplans', 'Flexible Timezones'],
      painPoints: [
        'Applying Vedic Vastu to high-rise Western condominiums and global coordinates',
        'Coordinating across international time zones with certified English-fluent expertise'
      ],
      solution:
        'HD video consultations, Google Earth compass mapping, and locally accessible non-invasive remedies.'
    },
    {
      id: 'individuals',
      icon: User,
      title: 'Individuals & Couples',
      subtitle: 'Name tuning, marriage synergy & baby names',
      keywords: ['Name Balancing', 'Relationship Synergy', 'Baby Names'],
      painPoints: [
        'Recurring life friction linked to discordant name vibrations',
        'Pre-marital compatibility and selecting auspicious baby names'
      ],
      solution:
        'Alphabetical vibrational tuning, couple harmony charts, and auspicious baby name curation.'
    },
    {
      id: 'students',
      icon: GraduationCap,
      title: 'Students & Career Starters',
      subtitle: 'Stream selection & exam focus orientation',
      keywords: ['Study Direction', 'Exam Timing', 'Planetary Strengths'],
      painPoints: [
        'Choosing between technical, creative, or managerial career streams',
        'Restlessness in study environments and focus dispersion'
      ],
      solution:
        'Planetary strength mapping, study table orientation (facing East/North-East), and focus alignment.'
    }
  ];

  const [activeTab, setActiveTab] = useState(categories[0].id);
  const current = categories.find(c => c.id === activeTab) || categories[0];

  return (
    <section id="who-i-help" className="py-16 lg:py-24 bg-[#080A14] relative border-t border-[#C8A45D]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10152A] border border-[#C8A45D]/30 text-xs font-mono text-[#E8D5A8] uppercase tracking-wider">
            <span>Tailored Advisory</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#F7F4EC]">
            Who Archanna Helps
          </h2>
          <p className="text-xs sm:text-sm text-[#9EA3B5]">
            Targeted solutions tailored for your specific stage of life or business.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {categories.map(cat => {
            const Icon = cat.icon;
            const isActive = cat.id === activeTab;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`p-2.5 rounded-xl flex flex-col items-center text-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#C8A45D] text-[#080A14] shadow-md font-semibold'
                    : 'bg-[#10152A] text-[#9EA3B5] hover:text-[#F7F4EC] border border-white/5 hover:border-[#C8A45D]/30'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#080A14]' : 'text-[#C8A45D]'}`} />
                <span className="text-[11px] leading-tight line-clamp-1">{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Persona Card */}
        <div className="bg-[#10152A] border border-[#C8A45D]/30 rounded-2xl p-5 sm:p-8 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-8 space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#080A14] border border-[#C8A45D]/40 flex items-center justify-center text-[#C8A45D]">
                  <current.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#F7F4EC]">
                    {current.title}
                  </h3>
                  <p className="text-xs text-[#C8A45D] font-mono">
                    {current.subtitle}
                  </p>
                </div>
              </div>

              {/* Keywords Tag Row */}
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {current.keywords.map((kw, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-[#080A14] border border-[#C8A45D]/20 text-[10px] text-[#E8D5A8] font-mono"
                  >
                    {kw}
                  </span>
                ))}
              </div>

              {/* Core Challenges */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#9EA3B5] block">
                  Typical Bottlenecks:
                </span>
                <ul className="space-y-1 text-xs text-[#F7F4EC]/90">
                  {current.painPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#C8A45D] font-bold text-sm leading-none mt-0.5">·</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solution */}
              <div className="p-3.5 rounded-xl bg-[#080A14] border border-white/5 space-y-1 text-xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#E8D5A8] flex items-center gap-1.5 font-semibold">
                  <Sparkles className="w-3 h-3 text-[#C8A45D]" />
                  Archanna’s Solution:
                </span>
                <p className="text-[#9EA3B5] leading-relaxed">
                  {current.solution}
                </p>
              </div>
            </div>

            {/* Right Action Box */}
            <div className="lg:col-span-4 bg-[#080A14] p-5 rounded-xl border border-[#C8A45D]/20 text-center space-y-3">
              <div className="w-9 h-9 mx-auto rounded-full bg-[#10152A] border border-[#C8A45D]/30 flex items-center justify-center text-[#C8A45D]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif text-base font-medium text-[#F7F4EC]">
                  Ready to align this area?
                </h4>
                <p className="text-[11px] text-[#9EA3B5] mt-1">
                  1-on-1 consultation tailored for {current.title.toLowerCase()}.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenConsultationModal(current.title)}
                className="w-full py-2.5 px-3 rounded-lg bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] text-[#080A14] text-xs font-semibold hover:from-[#d8b56f] hover:to-[#f0e2be] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>Book Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
