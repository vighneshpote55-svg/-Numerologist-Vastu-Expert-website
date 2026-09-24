import React, { useState } from 'react';
import { NameVibrationCalculator } from '../tools/NameVibrationCalculator';
import { MulankBhagyankCalculator } from '../tools/MulankBhagyankCalculator';
import { VastuFloorplanEvaluator } from '../tools/VastuFloorplanEvaluator';
import { PersonalYearCalculator } from '../tools/PersonalYearCalculator';
import { LiveCompassUtility } from '../tools/LiveCompassUtility';
import { ReportGeneratorModal } from '../tools/ReportGeneratorModal';
import { CosmicNumbersTab } from '../tools/CosmicNumbersTab';
import { Sparkles, Hash, Calendar, Compass, Clock, Navigation, Printer, Layers } from 'lucide-react';
import { trackEvent } from '../../lib/analytics';

interface ToolsSectionProps {
  onOpenConsultationModal: (initialService?: string) => void;
}

export const ToolsSection: React.FC<ToolsSectionProps> = ({ onOpenConsultationModal }) => {
  const [activeTab, setActiveTab] = useState<'name' | 'birth' | 'archetypes' | 'timing' | 'floorplan' | 'compass'>('name');
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);

  const handleTabChange = (tab: 'name' | 'birth' | 'archetypes' | 'timing' | 'floorplan' | 'compass') => {
    trackEvent('tool_tab_switch', { tab });
    setActiveTab(tab);
  };

  return (
    <section id="tools" className="py-16 lg:py-24 bg-[#080A14] border-t border-[#C8A45D]/15 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(200,164,93,0.06)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(24,33,66,0.5)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10152A] border border-[#C8A45D]/30 text-xs font-mono text-[#E8D5A8] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A45D]" />
            <span>Interactive Calculators</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#F7F4EC] tracking-tight">
            Instant Vedic & Vastu Calculators
          </h2>

          <p className="text-xs sm:text-sm text-[#9EA3B5]">
            Check name vibrations, Mulank-Bhagyank life paths, 9-year cycles, and 16-zone floor plans in real time.
          </p>

          {/* Quick PDF Report Generator Trigger */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setIsReportOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#10152A] hover:bg-[#182348] border border-[#C8A45D]/50 text-[#E8D5A8] text-xs font-medium transition-all shadow-sm cursor-pointer hover:border-[#C8A45D]"
            >
              <Printer className="w-3.5 h-3.5 text-[#C8A45D]" />
              <span>Download Printable Dossier PDF</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#10152A] border border-[#C8A45D]/25 max-w-full overflow-x-auto gap-1">
            <button
              type="button"
              onClick={() => handleTabChange('name')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'name'
                  ? 'bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] text-[#080A14] font-semibold shadow-md'
                  : 'text-[#9EA3B5] hover:text-[#F7F4EC]'
              }`}
            >
              <Hash className="w-4 h-4" />
              <span>Name Vibration</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('birth')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'birth'
                  ? 'bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] text-[#080A14] font-semibold shadow-md'
                  : 'text-[#9EA3B5] hover:text-[#F7F4EC]'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Mulank & Bhagyank</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('archetypes')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'archetypes'
                  ? 'bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] text-[#080A14] font-semibold shadow-md'
                  : 'text-[#9EA3B5] hover:text-[#F7F4EC]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Cosmic Numbers (1–9)</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('timing')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'timing'
                  ? 'bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] text-[#080A14] font-semibold shadow-md'
                  : 'text-[#9EA3B5] hover:text-[#F7F4EC]'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>9-Year Cycle</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('floorplan')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'floorplan'
                  ? 'bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] text-[#080A14] font-semibold shadow-md'
                  : 'text-[#9EA3B5] hover:text-[#F7F4EC]'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Floorplan Evaluator</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('compass')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'compass'
                  ? 'bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] text-[#080A14] font-semibold shadow-md'
                  : 'text-[#9EA3B5] hover:text-[#F7F4EC]'
              }`}
            >
              <Navigation className="w-4 h-4" />
              <span>Live Sensor Compass</span>
            </button>
          </div>
        </div>

        {/* Tab Content Panels */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'name' && (
            <NameVibrationCalculator onOpenConsultationModal={onOpenConsultationModal} />
          )}
          {activeTab === 'birth' && (
            <MulankBhagyankCalculator onOpenConsultationModal={onOpenConsultationModal} />
          )}
          {activeTab === 'archetypes' && (
            <CosmicNumbersTab onOpenConsultationModal={onOpenConsultationModal} />
          )}
          {activeTab === 'timing' && (
            <PersonalYearCalculator onOpenConsultationModal={onOpenConsultationModal} />
          )}
          {activeTab === 'floorplan' && (
            <VastuFloorplanEvaluator onOpenConsultationModal={onOpenConsultationModal} />
          )}
          {activeTab === 'compass' && (
            <LiveCompassUtility onOpenConsultationModal={onOpenConsultationModal} />
          )}
        </div>

      </div>

      {/* Printable Report Modal */}
      <ReportGeneratorModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />
    </section>
  );
};
