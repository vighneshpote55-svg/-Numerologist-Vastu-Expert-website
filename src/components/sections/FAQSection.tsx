import React, { useState } from 'react';
import { FAQ_DATA } from '../../data/faqData';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { generateWhatsAppLink } from '../../lib/validation';
import { trackEvent } from '../../lib/analytics';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Numerology', 'Vastu', 'General', 'Booking'];

  const filteredFaqs =
    activeCategory === 'All'
      ? FAQ_DATA
      : FAQ_DATA.filter(f => f.category === activeCategory);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleAskQuestion = () => {
    trackEvent('whatsapp_click', { source: 'faq_custom_question' });
    const url = generateWhatsAppLink({
      fullName: '',
      consultationType: 'General Consultation',
      areaOfGuidance: 'I have a question not listed in FAQ'
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-[#080A14] relative border-t border-[#C8A45D]/15">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10152A] border border-[#C8A45D]/30 text-xs font-mono text-[#E8D5A8] uppercase tracking-wider">
            <span>Quick Answers</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#F7F4EC]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#9EA3B5]">
            Essential details regarding preparation, session formats, and non-demolition methods.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(null);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#C8A45D] text-[#080A14] font-semibold shadow-sm'
                  : 'bg-[#10152A] text-[#9EA3B5] hover:text-[#F7F4EC] border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-[#10152A]/80 border border-[#C8A45D]/20 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full py-4 px-5 sm:px-6 flex items-center justify-between text-left gap-4 hover:bg-[#151c36] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg font-medium text-[#F7F4EC]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#C8A45D] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#9EA3B5] leading-relaxed border-t border-white/5">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Have a specific question card */}
        <div className="mt-10 p-6 rounded-2xl bg-[#10152A] border border-[#C8A45D]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-serif text-lg font-medium text-[#F7F4EC]">
              Have a bespoke question about your specific property or chart?
            </h4>
            <p className="text-xs text-[#9EA3B5] mt-0.5">
              Archanna’s consultation desk is happy to clarify prior to scheduling.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAskQuestion}
            className="shrink-0 flex items-center gap-2 py-2.5 px-4 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-[#080A14] font-semibold text-xs transition-all cursor-pointer shadow-sm"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#080A14]" />
            <span>Ask on WhatsApp (+91 9011023754)</span>
          </button>
        </div>

      </div>
    </section>
  );
};
