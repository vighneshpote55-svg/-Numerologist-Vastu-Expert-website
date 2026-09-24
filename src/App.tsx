/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TopBar } from './components/navigation/TopBar';
import { FloatingWhatsApp } from './components/navigation/FloatingWhatsApp';
import { HeroSection } from './components/hero/HeroSection';
import { TrustStatsStrip } from './components/hero/TrustStatsStrip';
import { AboutSection } from './components/sections/AboutSection';
import { ServicesAndPackagesHub } from './components/services/ServicesAndPackagesHub';
import { ToolsSection } from './components/sections/ToolsSection';
import { MahavastuCompassStudio } from './components/vastu/MahavastuCompassStudio';
import { WhoIHelpSection } from './components/sections/WhoIHelpSection';
import { ConsultationFlowSteps } from './components/consultation/ConsultationFlowSteps';
import { ProofAndReviewsSection } from './components/sections/ProofAndReviewsSection';
import { MediaAndInsightsSection } from './components/sections/MediaAndInsightsSection';
import { FAQSection } from './components/sections/FAQSection';
import { FinalCTASection } from './components/sections/FinalCTASection';
import { Footer } from './components/footer/Footer';
import { ConsultationBookingModal } from './components/consultation/ConsultationBookingModal';
import { LeadManagerModal } from './components/admin/LeadManagerModal';

export default function App() {
  const [activeNumber, setActiveNumber] = useState<number>(1);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [modalInitialService, setModalInitialService] = useState<string>('');
  const [isLeadManagerOpen, setIsLeadManagerOpen] = useState<boolean>(false);

  const handleOpenBooking = (serviceName?: string) => {
    setModalInitialService(serviceName || '');
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden relative bg-[#080A14] text-[#F7F4EC] font-sans selection:bg-[#C8A45D] selection:text-[#080A14] antialiased">
      {/* 1. Header Navigation */}
      <TopBar
        onOpenConsultationModal={() => handleOpenBooking()}
        onOpenLeadManager={() => setIsLeadManagerOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* 2. Hero Section */}
        <HeroSection
          activeNumber={activeNumber}
          onSelectNumber={setActiveNumber}
          onOpenConsultationModal={() => handleOpenBooking()}
        />

        {/* 3. Trust Statistics Strip */}
        <TrustStatsStrip />

        {/* 4. About Archanna Nirrmale & Credentials */}
        <AboutSection
          onOpenConsultationModal={() => handleOpenBooking('Personal Consultation with Archanna')}
        />

        {/* 5. Unified Services & Consultation Packages Hub (Numerology · Vastu · Packages) */}
        <ServicesAndPackagesHub
          onOpenConsultationModal={handleOpenBooking}
        />

        {/* 6. Instant Vedic Calculators & Cosmic Numbers Suite */}
        <ToolsSection
          onOpenConsultationModal={handleOpenBooking}
        />

        {/* 7. 16 Mahavastu Zones & Interactive 3D Spatial Compass Studio */}
        <MahavastuCompassStudio
          onOpenConsultationModal={handleOpenBooking}
        />

        {/* 8. Who I Help (Personas) & Step-by-Step Consultation Roadmap */}
        <WhoIHelpSection
          onOpenConsultationModal={handleOpenBooking}
        />
        <ConsultationFlowSteps />

        {/* 9. Proven Real-World Impact & Client Stories (Case Studies + Testimonials) */}
        <ProofAndReviewsSection
          onOpenConsultationModal={handleOpenBooking}
        />

        {/* 10. Knowledge Hub, Media & Frequently Asked Questions */}
        <MediaAndInsightsSection
          onOpenConsultationModal={handleOpenBooking}
        />
        <FAQSection />

        {/* 11. Final High-Impact Conversion CTA Section */}
        <FinalCTASection
          onOpenConsultationModal={() => handleOpenBooking()}
        />
      </main>

      {/* 12. Comprehensive Footer */}
      <Footer
        onOpenConsultationModal={() => handleOpenBooking()}
        onOpenLeadManager={() => setIsLeadManagerOpen(true)}
      />

      {/* 13. Floating Persistent WhatsApp Desk */}
      <FloatingWhatsApp />

      {/* 14. Consultation Booking Modal */}
      <ConsultationBookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBooking}
        initialService={modalInitialService}
      />

      {/* 15. Admin Desk Lead Manager Modal */}
      <LeadManagerModal
        isOpen={isLeadManagerOpen}
        onClose={() => setIsLeadManagerOpen(false)}
      />
    </div>
  );
}
