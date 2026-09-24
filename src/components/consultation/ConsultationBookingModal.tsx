import React, { useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { ConsultationForm } from './ConsultationForm';

interface ConsultationBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const ConsultationBookingModal: React.FC<ConsultationBookingModalProps> = ({
  isOpen,
  onClose,
  initialService = ''
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#10152A] border border-[#C8A45D]/40 rounded-2xl p-6 sm:p-8 shadow-[0_20px_70px_rgba(0,0,0,0.9)] animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#9EA3B5] hover:text-[#F7F4EC] hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 space-y-1 pr-8">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#C8A45D]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Private Advisory Session</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#F7F4EC]">
            Book a Consultation with Archanna
          </h3>
          <p className="text-xs sm:text-sm text-[#9EA3B5]">
            Fill in the details below to request a tailored Numerology or Vastu Shastra consultation.
          </p>
        </div>

        {/* The Form */}
        <ConsultationForm
          initialService={initialService}
          onSuccess={() => {
            // Keep modal open to show confirmation card
          }}
        />

      </div>
    </div>
  );
};
