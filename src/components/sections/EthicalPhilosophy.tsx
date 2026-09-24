import React from 'react';
import { ShieldCheck, Sparkles, Scale, Heart } from 'lucide-react';

export const EthicalPhilosophy: React.FC = () => {
  const commitments = [
    {
      icon: Scale,
      title: 'Scientific Pattern Logic',
      description:
        'Vedic sciences treated as rational mathematical and spatial patterns—never as superstition.'
    },
    {
      icon: ShieldCheck,
      title: 'Zero Fear-Mongering',
      description:
        'No scary "doshas" or panic tactics. Honest, constructive observations designed for peace of mind.'
    },
    {
      icon: Sparkles,
      title: '100% Non-Demolition',
      description:
        'Zero wall or door breakage. Subtle elemental rectifications via metals, colors, and orientation.'
    },
    {
      icon: Heart,
      title: 'Action-Oriented Clarity',
      description:
        'Numbers show natural timing currents; your conscious effort and character steer your destiny.'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#080A14] relative border-t border-[#C8A45D]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="max-w-2xl mx-auto text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10152A] border border-[#C8A45D]/30 text-xs font-mono text-[#E8D5A8] uppercase tracking-wider">
            <span>The Ethical Standard</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#F7F4EC]">
            Our Advisory Principles
          </h2>
          <p className="text-xs sm:text-sm text-[#9EA3B5]">
            Integrity, discernment, and practical solutions grounded in logic and care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {commitments.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                className="p-5 rounded-xl bg-[#10152A]/90 border border-[#C8A45D]/20 hover:border-[#C8A45D]/50 transition-all space-y-2.5"
              >
                <div className="w-10 h-10 rounded-lg bg-[#080A14] border border-[#C8A45D]/30 flex items-center justify-center text-[#C8A45D]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base font-medium text-[#F7F4EC]">
                  {c.title}
                </h3>
                <p className="text-xs text-[#9EA3B5] leading-relaxed">
                  {c.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
