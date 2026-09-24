import React from 'react';
import { MessageSquare, Share2, Video, Compass, ArrowRightCircle } from 'lucide-react';

export const ConsultationFlowSteps: React.FC = () => {
  const steps = [
    {
      step: '01',
      icon: MessageSquare,
      title: 'Request',
      subtitle: 'Step 1',
      description: 'Submit your request or message on WhatsApp (+91 9011023754) with your preferred service.'
    },
    {
      step: '02',
      icon: Share2,
      title: 'Share Details',
      subtitle: 'Step 2',
      description: 'Provide Date of Birth & name for Numerology, or floor plan & entrance compass degrees for Vastu.'
    },
    {
      step: '03',
      icon: Video,
      title: '1-on-1 Session',
      subtitle: 'Step 3',
      description: 'Join a private 45–60 min video call. Archanna presents your calculations and answers your questions live.'
    },
    {
      step: '04',
      icon: Compass,
      title: 'Action Blueprint',
      subtitle: 'Step 4',
      description: 'Receive a written summary PDF with exact name spellings, non-demolition remedies, and timing cycles.'
    },
    {
      step: '05',
      icon: ArrowRightCircle,
      title: 'Post Support',
      subtitle: 'Step 5',
      description: 'Implement remedies with post-session WhatsApp clarification support for total confidence.'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-[#10152A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#080A14] border border-[#C8A45D]/30 text-xs font-mono text-[#E8D5A8] uppercase tracking-wider">
            <span>Simple 5-Step Process</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#F7F4EC]">
            How It Works
          </h2>
          <p className="text-xs sm:text-sm text-[#9EA3B5]">
            From initial booking to live session and post-consultation guidance.
          </p>
        </div>

        {/* 5-Step Process Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <div
                key={st.step}
                className="flex flex-col justify-between p-5 rounded-xl bg-[#080A14]/90 border border-[#C8A45D]/20 hover:border-[#C8A45D]/50 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-serif text-xl font-bold text-[#C8A45D]">
                      {st.step}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#10152A] border border-[#C8A45D]/30 flex items-center justify-center text-[#E8D5A8] group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4 text-[#C8A45D]" />
                    </div>
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#9EA3B5] block">
                    {st.subtitle}
                  </span>
                  <h3 className="font-serif text-base font-medium text-[#F7F4EC] group-hover:text-[#E8D5A8] transition-colors mt-0.5">
                    {st.title}
                  </h3>

                  <p className="text-xs text-[#9EA3B5] leading-relaxed mt-2">
                    {st.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-white/5 text-[10px] text-[#C8A45D] font-mono">
                  Stage {i + 1} of 5
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
