import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, Linkedin, Sparkles, ExternalLink } from 'lucide-react';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { generateWhatsAppLink } from '../../lib/validation';
import { trackEvent } from '../../lib/analytics';
import { ThemeToggle } from '../common/ThemeToggle';

interface FooterProps {
  onOpenConsultationModal: () => void;
  onOpenLeadManager?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenConsultationModal,
  onOpenLeadManager
}) => {
  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', { source: 'footer' });
    const url = generateWhatsAppLink({
      fullName: '',
      consultationType: 'General Consultation',
      areaOfGuidance: 'Footer Contact'
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const socials = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/archannanirrmale',
      icon: Instagram,
      handle: '@archannanirrmale'
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61591070087125',
      icon: Facebook,
      handle: 'Archanna Nirrmale'
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/@archannanirrmale',
      icon: Youtube,
      handle: '@archannanirrmale'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/archanna-nirrmale-190991368/',
      icon: Linkedin,
      handle: 'Archanna Nirrmale'
    }
  ];

  return (
    <footer className="bg-[#05060D] border-t border-[#C8A45D]/20 text-[#9EA3B5] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <span className="font-serif text-2xl tracking-[0.16em] text-[#F7F4EC] uppercase font-medium block">
                Archanna Nirrmale
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#C8A45D] uppercase font-sans font-medium">
                Certified Numerologist & Vastu Expert
              </span>
            </div>

            <p className="text-xs leading-relaxed text-[#9EA3B5] max-w-sm">
              Providing methodical, non-demolition Vastu and Chaldean Numerology consultations for entrepreneurs, executives, homeowners, and global families. 15+ years of dedicated practice.
            </p>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3">
              {socials.map(s => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-[#10152A] border border-[#C8A45D]/25 hover:border-[#C8A45D] hover:bg-[#182142] text-[#E8D5A8] flex items-center justify-center transition-colors"
                    title={`Follow Archanna Nirrmale on ${s.name}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Col 2: Services Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#F7F4EC]">
              Key Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#numerology" className="hover:text-[#E8D5A8] transition-colors">
                  Name Correction & Alignment
                </a>
              </li>
              <li>
                <a href="#numerology" className="hover:text-[#E8D5A8] transition-colors">
                  Business Name Numerology
                </a>
              </li>
              <li>
                <a href="#numerology" className="hover:text-[#E8D5A8] transition-colors">
                  Corporate Numerology Advisory
                </a>
              </li>
              <li>
                <a href="#vastu" className="hover:text-[#E8D5A8] transition-colors">
                  Home & Residential Vastu
                </a>
              </li>
              <li>
                <a href="#vastu" className="hover:text-[#E8D5A8] transition-colors">
                  Office & Commercial Vastu
                </a>
              </li>
              <li>
                <a href="#vastu" className="hover:text-[#E8D5A8] transition-colors">
                  Practical Non-Demolition Remedies
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation & Sections (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#F7F4EC]">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#about" className="hover:text-[#E8D5A8] transition-colors">
                  About Archanna
                </a>
              </li>
              <li>
                <a href="#tools" className="hover:text-[#E8D5A8] transition-colors">
                  Name & Birth Calculators
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-[#E8D5A8] transition-colors">
                  Consultation Packages
                </a>
              </li>
              <li>
                <a href="#case-studies" className="hover:text-[#E8D5A8] transition-colors">
                  Real Case Studies
                </a>
              </li>
              <li>
                <a href="#insights" className="hover:text-[#E8D5A8] transition-colors">
                  Media & Insights
                </a>
              </li>
              <li>
                <a href="#mahavastu-zones" className="hover:text-[#E8D5A8] transition-colors">
                  16 Mahavastu Zones
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#E8D5A8] transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Direct Desk & Booking (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#F7F4EC]">
              Consultation Desk
            </h4>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C8A45D]" />
                <a href="tel:+919011023754" className="text-[#F7F4EC] hover:text-[#E8D5A8] font-mono">
                  +91 9011023754
                </a>
              </div>
              <div className="flex items-center gap-2">
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="text-[#25D366] hover:underline font-mono cursor-pointer"
                >
                  WhatsApp: +91 9011023754
                </button>
              </div>
              <div className="flex items-center gap-2 text-[#9EA3B5]">
                <MapPin className="w-4 h-4 text-[#C8A45D]" />
                <span>Pune, India · Global Remote Consultations</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenConsultationModal}
                className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] text-[#080A14] text-xs font-semibold hover:from-[#d8b56f] hover:to-[#f0e2be] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Request Consultation</span>
              </button>
            </div>
          </div>

        </div>

        {/* Ethical Disclaimer (Section 26 & Section 27 Mandatory) */}
        <div className="py-6 border-b border-white/5 text-[11px] leading-relaxed text-[#9EA3B5]/80 space-y-2">
          <p>
            <strong className="text-[#E8D5A8] font-medium">Traditional Advisory Notice: </strong>
            The insights, readings, and directional guidance provided through Numerology and Vastu Shastra are grounded in classical Chaldean, Pythagorean, and Vedic principles. They are offered as a traditional perspective to support informed personal reflection, mindfulness, and spatial harmony. Numerology and Vastu are not deterministic sciences and do not replace certified medical, legal, structural engineering, architectural, or professional financial advice. Individual results, commercial timelines, and outcomes depend on human diligence, market dynamics, and ethical action.
          </p>
        </div>

        {/* Copyright & Utility Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#9EA3B5] gap-4">
          <div>
            © {new Date().getFullYear()} Archanna Nirrmale. All rights reserved.
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>15+ Years Experience</span>
            <span>·</span>
            <span>500+ Clients Guided</span>
            <span>·</span>
            <ThemeToggle showLabel />
            <span>·</span>
            {onOpenLeadManager && (
              <button
                type="button"
                onClick={onOpenLeadManager}
                className="hover:text-[#E8D5A8] underline cursor-pointer"
              >
                Lead Manager
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
