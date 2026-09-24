import React from 'react';
import { TESTIMONIALS } from '../../data/servicesData';
import { Quote, Sparkles, MapPin, CheckCircle } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-[#10152A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#080A14] border border-[#C8A45D]/30 text-xs font-mono text-[#E8D5A8] uppercase tracking-wider">
            <span>Client Experiences</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#F7F4EC]">
            Trusted by Leaders & Families
          </h2>
          <p className="text-sm sm:text-base text-[#9EA3B5] leading-relaxed">
            Reflections from entrepreneurs, executives, homeowners, and international clients who have sought Archanna’s guidance for their spaces and ventures.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {TESTIMONIALS.map(t => (
            <div
              key={t.id}
              className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#080A14]/90 border border-[#C8A45D]/20 hover:border-[#C8A45D]/50 transition-all shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-full bg-[#10152A] border border-[#C8A45D]/30 flex items-center justify-center text-[#C8A45D]">
                    <Quote className="w-4 h-4 fill-current opacity-80" />
                  </div>
                  <span className="text-[11px] font-mono text-[#C8A45D] bg-[#10152A] px-2.5 py-1 rounded-md border border-white/5">
                    {t.serviceCategory}
                  </span>
                </div>

                <p className="font-serif text-base sm:text-lg text-[#F7F4EC] leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-base font-semibold text-[#F7F4EC]">
                    {t.author}
                  </h4>
                  <p className="text-xs text-[#9EA3B5]">
                    {t.role}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs text-[#E8D5A8] font-mono">
                  <MapPin className="w-3.5 h-3.5 text-[#C8A45D]" />
                  <span>{t.city}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Privacy Note */}
        <div className="mt-8 text-center text-[11px] text-[#9EA3B5]">
          <span>
            Client names and corporate entities are shared with permission or anonymized for private consulting confidentiality.
          </span>
        </div>

      </div>
    </section>
  );
};
