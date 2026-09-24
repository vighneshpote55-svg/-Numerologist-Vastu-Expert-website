import React, { useState } from 'react';
import { MEDIA_RESOURCES, MediaArticle } from '../../data/mediaData';
import { PlayCircle, BookOpen, ExternalLink, Sparkles, Youtube, Instagram, Linkedin, Facebook, ArrowRight } from 'lucide-react';
import { trackEvent } from '../../lib/analytics';

interface MediaAndInsightsSectionProps {
  onOpenConsultationModal: (initialService?: string) => void;
}

export const MediaAndInsightsSection: React.FC<MediaAndInsightsSectionProps> = ({
  onOpenConsultationModal
}) => {
  const [selectedTopic, setSelectedTopic] = useState<'All' | 'Vastu' | 'Numerology' | 'Business' | 'Case Study'>('All');

  const filtered = selectedTopic === 'All'
    ? MEDIA_RESOURCES
    : MEDIA_RESOURCES.filter(item => item.topic === selectedTopic);

  const handleMediaClick = (item: MediaArticle) => {
    trackEvent('media_item_click', {
      title: item.title,
      platform: item.platform,
      type: item.type
    });
  };

  const getPlatformIcon = (platform: MediaArticle['platform']) => {
    switch (platform) {
      case 'YouTube':
        return <Youtube className="w-4 h-4 text-red-400" />;
      case 'Instagram':
        return <Instagram className="w-4 h-4 text-pink-400" />;
      case 'LinkedIn':
        return <Linkedin className="w-4 h-4 text-sky-400" />;
      default:
        return <BookOpen className="w-4 h-4 text-[#C8A45D]" />;
    }
  };

  return (
    <section id="insights" className="py-16 lg:py-24 bg-[#0a0d1a] border-t border-[#C8A45D]/15 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(200,164,93,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10152A] border border-[#C8A45D]/30 text-xs font-mono text-[#E8D5A8] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#C8A45D]" />
              <span>Media & Teachings</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#F7F4EC] tracking-tight">
              Knowledge Hub & Insights
            </h2>

            <p className="text-xs sm:text-sm text-[#9EA3B5]">
              Quick video breakdowns and articles on Chaldean numbers and non-demolition Vastu.
            </p>
          </div>

          {/* Social Hub Links */}
          <div className="flex items-center gap-2">
            <a
              href="https://youtube.com/@archannanirrmale"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-[#10152A] border border-white/10 text-[#9EA3B5] hover:text-red-400 hover:border-red-500/40 transition-colors cursor-pointer"
              title="YouTube Channel"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/archannanirrmale"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-[#10152A] border border-white/10 text-[#9EA3B5] hover:text-pink-400 hover:border-pink-500/40 transition-colors cursor-pointer"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61591070087125"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-[#10152A] border border-white/10 text-[#9EA3B5] hover:text-blue-400 hover:border-blue-500/40 transition-colors cursor-pointer"
              title="Facebook Profile"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/archanna-nirrmale-190991368/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-[#10152A] border border-white/10 text-[#9EA3B5] hover:text-sky-400 hover:border-sky-500/40 transition-colors cursor-pointer"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Topic Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {(['All', 'Vastu', 'Numerology', 'Business', 'Case Study'] as const).map(topic => (
            <button
              key={topic}
              type="button"
              onClick={() => setSelectedTopic(topic)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer border ${
                selectedTopic === topic
                  ? 'bg-[#C8A45D] border-[#C8A45D] text-[#080A14] font-bold shadow-md'
                  : 'bg-[#10152A] border-white/10 text-[#9EA3B5] hover:text-[#F7F4EC] hover:border-white/20'
              }`}
            >
              {topic === 'All' ? 'All Content' : topic}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(item => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-[#10152A]/80 border border-[#C8A45D]/25 hover:border-[#C8A45D]/60 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div className="space-y-4">
                {/* Meta Header */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    {getPlatformIcon(item.platform)}
                    <span className="font-mono text-[#E8D5A8] text-[11px]">{item.platform}</span>
                  </div>
                  <span className="font-mono text-[#9EA3B5] text-[11px]">{item.durationOrReadTime}</span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-lg font-medium text-[#F7F4EC] group-hover:text-[#E8D5A8] transition-colors leading-snug">
                  {item.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-[#9EA3B5] leading-relaxed">
                  {item.summary}
                </p>

                {/* Key Takeaway Pill */}
                <div className="p-3 rounded-xl bg-[#080A14] border border-[#C8A45D]/20 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#C8A45D] block">
                    Core Architectural Principle:
                  </span>
                  <p className="text-[11px] text-[#F7F4EC] italic">
                    "{item.keyTakeaway}"
                  </p>
                </div>
              </div>

              {/* Bottom Footer */}
              <div className="pt-5 mt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-[#9EA3B5]">
                  {item.viewsOrEngagement || item.publishedDate}
                </span>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleMediaClick(item)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E8D5A8] group-hover:text-[#C8A45D] transition-colors cursor-pointer"
                >
                  <span>{item.type === 'video' ? 'Watch Video' : 'Read Article'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#10152A] via-[#151c38] to-[#10152A] border border-[#C8A45D]/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-xl sm:text-2xl font-medium text-[#F7F4EC]">
              Have a Specific Property or Corporate Layout You Want Analyzed?
            </h4>
            <p className="text-xs text-[#9EA3B5]">
              Upload your architectural CAD drawings or sketches for a bespoke non-demolition assessment.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenConsultationModal('Bespoke Architectural Audit')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] hover:from-[#d5b36e] hover:to-[#f0e0b9] text-[#080A14] font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shadow-md"
          >
            <span>Book Architectural Audit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
