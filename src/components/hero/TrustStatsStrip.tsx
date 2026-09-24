import React from 'react';
import { Award, Users, Globe2, ShieldCheck } from 'lucide-react';

export const TrustStatsStrip: React.FC = () => {
  const stats = [
    {
      icon: Award,
      value: '15+',
      label: 'Years of Experience',
      sublabel: 'Dedicated Vedic & Chaldean practice'
    },
    {
      icon: Users,
      value: '500+',
      label: 'Clients Guided',
      sublabel: 'Founders, families & professionals'
    },
    {
      icon: Globe2,
      value: 'India + Global',
      label: 'International Reach',
      sublabel: 'Virtual & onsite consultations'
    },
    {
      icon: ShieldCheck,
      value: '100%',
      label: 'Practical & Non-Demolition',
      sublabel: 'Zero wall breakage, ethical solutions'
    }
  ];

  return (
    <section className="relative z-10 border-y border-[#C8A45D]/15 bg-[#080A14]/80 backdrop-blur-md py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="flex flex-col items-center text-center p-2.5 sm:p-3 rounded-xl border border-transparent hover:border-[#C8A45D]/15 hover:bg-[#10152A]/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#10152A] border border-[#C8A45D]/30 flex items-center justify-center text-[#C8A45D] mb-3 shadow-inner">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#F7F4EC] tracking-tight tabular-nums">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-[#E8D5A8] mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-[#9EA3B5] mt-0.5 max-w-[160px]">
                  {stat.sublabel}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
