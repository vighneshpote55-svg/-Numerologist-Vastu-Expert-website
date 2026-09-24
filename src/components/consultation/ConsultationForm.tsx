import React, { useState, useRef } from 'react';
import { consultationSchema, ConsultationFormValues, generateWhatsAppLink } from '../../lib/validation';
import { saveLead } from '../../lib/storage';
import { trackEvent } from '../../lib/analytics';
import { ConsultationType } from '../../types';
import { Sparkles, CheckCircle2, AlertCircle, Calendar, Clock, User, Phone, Mail, MapPin, Send, Paperclip, X, FileText } from 'lucide-react';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import confetti from 'canvas-confetti';

interface ConsultationFormProps {
  initialService?: string;
  onSuccess?: () => void;
  className?: string;
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({
  initialService = '',
  onSuccess,
  className = ''
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<Partial<ConsultationFormValues>>({
    fullName: '',
    phone: '',
    email: '',
    dateOfBirth: '',
    cityCountry: '',
    consultationType: initialService.toLowerCase().includes('vastu')
      ? 'Vastu'
      : initialService.toLowerCase().includes('business')
      ? 'Business Consultation'
      : 'Numerology',
    preferredDate: '',
    preferredTime: '',
    message: initialService ? `Interested in: ${initialService}` : '',
    attachmentName: '',
    attachmentDataUrl: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [honeypot, setHoneypot] = useState(''); // anti-spam bot trap

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, attachment: 'File size must be under 5MB.' }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        attachmentName: file.name,
        attachmentDataUrl: reader.result as string
      }));
      setErrors(prev => {
        const next = { ...prev };
        delete next.attachment;
        return next;
      });
    };
    reader.readAsDataURL(file);
  };

  const removeAttachment = () => {
    setFormData(prev => ({
      ...prev,
      attachmentName: '',
      attachmentDataUrl: ''
    }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      // Bot detected
      return;
    }

    trackEvent('form_start', { type: formData.consultationType });
    setIsSubmitting(true);
    setErrors({});

    const result = consultationSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach(issue => {
        if (issue.path[0] !== undefined) {
          fieldErrors[String(issue.path[0])] = issue.message;
        }
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const validated = result.data;
      saveLead({
        fullName: validated.fullName,
        phone: validated.phone,
        email: validated.email,
        dateOfBirth: validated.dateOfBirth,
        cityCountry: validated.cityCountry,
        consultationType: validated.consultationType as ConsultationType,
        preferredDate: validated.preferredDate,
        preferredTime: validated.preferredTime,
        message: validated.message,
        attachmentName: validated.attachmentName,
        attachmentDataUrl: validated.attachmentDataUrl
      });

      trackEvent('form_submission', {
        fullName: validated.fullName,
        type: validated.consultationType
      });

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Safe fallback
      }

      setIsSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      setErrors({ form: 'An unexpected error occurred. Please try again or reach out on WhatsApp.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLaunchWhatsApp = () => {
    const url = generateWhatsAppLink({
      fullName: formData.fullName || '',
      dateOfBirth: formData.dateOfBirth,
      consultationType: formData.consultationType || 'General Consultation',
      areaOfGuidance: formData.message || 'Consultation Request'
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (isSuccess) {
    return (
      <div className={`p-8 rounded-2xl bg-[#080A14] border border-[#C8A45D]/40 text-center space-y-5 ${className}`}>
        <div className="w-16 h-16 mx-auto rounded-full bg-[#10152A] border-2 border-[#C8A45D] flex items-center justify-center text-[#C8A45D] shadow-[0_0_30px_rgba(200,164,93,0.3)]">
          <CheckCircle2 className="w-8 h-8 text-[#C8A45D]" />
        </div>

        <div className="space-y-1">
          <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#F7F4EC]">
            Consultation Request Received
          </h3>
          <p className="text-xs sm:text-sm text-[#E8D5A8]">
            Thank you, {formData.fullName}. Archanna’s consultation desk will review your details and confirm appointment availability.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#10152A] border border-white/5 text-xs text-[#9EA3B5] max-w-md mx-auto space-y-1">
          <p>We typically reach back via WhatsApp or phone within 2–4 business hours.</p>
          <p className="font-mono text-[#E8D5A8]">Consultation Desk: +91 9011023754</p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleLaunchWhatsApp}
            className="w-full sm:w-auto py-2.5 px-5 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-[#080A14] font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#080A14]" />
            <span>Connect on WhatsApp Now</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setIsSuccess(false);
              setFormData({
                fullName: '',
                phone: '',
                email: '',
                dateOfBirth: '',
                cityCountry: '',
                consultationType: 'Numerology',
                preferredDate: '',
                preferredTime: '',
                message: ''
              });
            }}
            className="w-full sm:w-auto py-2.5 px-4 rounded-lg bg-[#10152A] text-[#9EA3B5] hover:text-[#F7F4EC] text-xs cursor-pointer"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`} noValidate>
      {/* Anti-spam honeypot */}
      <input
        type="text"
        name="website_hp"
        value={honeypot}
        onChange={e => setHoneypot(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {errors.form && (
        <div className="p-3 rounded-lg bg-red-950/50 border border-red-500/40 text-xs text-red-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errors.form}</span>
        </div>
      )}

      {/* Row 1: Full Name & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-[#E8D5A8] mb-1">
            Full Name <span className="text-[#C8A45D]">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-[#9EA3B5] absolute left-3 top-3" />
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Vikramaditya Deshmukh"
              className={`w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#080A14] border text-xs text-[#F7F4EC] focus:outline-none transition-colors ${
                errors.fullName ? 'border-red-400 focus:border-red-500' : 'border-[#C8A45D]/30 focus:border-[#C8A45D]'
              }`}
            />
          </div>
          {errors.fullName && <p className="text-[11px] text-red-400 mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-[#E8D5A8] mb-1">
            Phone / WhatsApp <span className="text-[#C8A45D]">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-[#9EA3B5] absolute left-3 top-3" />
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 90110 23754"
              className={`w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#080A14] border text-xs text-[#F7F4EC] focus:outline-none transition-colors ${
                errors.phone ? 'border-red-400 focus:border-red-500' : 'border-[#C8A45D]/30 focus:border-[#C8A45D]'
              }`}
            />
          </div>
          {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
        </div>
      </div>

      {/* Row 2: Email & Date of Birth */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-[#E8D5A8] mb-1">
            Email Address (Optional)
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[#9EA3B5] absolute left-3 top-3" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@company.com"
              className={`w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#080A14] border text-xs text-[#F7F4EC] focus:outline-none transition-colors ${
                errors.email ? 'border-red-400' : 'border-[#C8A45D]/30 focus:border-[#C8A45D]'
              }`}
            />
          </div>
          {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-[#E8D5A8] mb-1">
            Date of Birth (For Numerology)
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-[#9EA3B5] absolute left-3 top-3" />
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#080A14] border border-[#C8A45D]/30 text-xs text-[#F7F4EC] focus:border-[#C8A45D] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Row 3: City/Country & Consultation Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-[#E8D5A8] mb-1">
            City / Country
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-[#9EA3B5] absolute left-3 top-3" />
            <input
              type="text"
              name="cityCountry"
              value={formData.cityCountry}
              onChange={handleChange}
              placeholder="e.g. Pune, London, Dubai"
              className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#080A14] border border-[#C8A45D]/30 text-xs text-[#F7F4EC] focus:border-[#C8A45D] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#E8D5A8] mb-1">
            Consultation Type <span className="text-[#C8A45D]">*</span>
          </label>
          <select
            name="consultationType"
            value={formData.consultationType}
            onChange={handleChange}
            className="w-full px-3 py-2.5 rounded-lg bg-[#080A14] border border-[#C8A45D]/30 text-xs text-[#F7F4EC] focus:border-[#C8A45D] focus:outline-none cursor-pointer"
          >
            <option value="Numerology">Numerology (Personal, Name, Mobile)</option>
            <option value="Vastu">Vastu Shastra (Home, Office, Shop)</option>
            <option value="Numerology + Vastu">Combined: Numerology + Vastu</option>
            <option value="Business Consultation">Business & Brand Name Consultation</option>
            <option value="Other">Other Bespoke Advisory</option>
          </select>
        </div>
      </div>

      {/* Row 4: Preferred Date & Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-[#E8D5A8] mb-1">
            Preferred Consultation Date
          </label>
          <input
            type="date"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
            className="w-full px-3 py-2.5 rounded-lg bg-[#080A14] border border-[#C8A45D]/30 text-xs text-[#F7F4EC] focus:border-[#C8A45D] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#E8D5A8] mb-1">
            Preferred Time Window
          </label>
          <div className="relative">
            <Clock className="w-4 h-4 text-[#9EA3B5] absolute left-3 top-3" />
            <input
              type="text"
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
              placeholder="e.g. 11:00 AM IST or Evening"
              className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#080A14] border border-[#C8A45D]/30 text-xs text-[#F7F4EC] focus:border-[#C8A45D] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-medium text-[#E8D5A8] mb-1">
          Brief Message or Specific Area of Concern
        </label>
        <textarea
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          placeholder="Briefly describe what you'd like guidance with (e.g. brand name vibration, bedroom location, career crossroads)..."
          className="w-full px-3 py-2 rounded-lg bg-[#080A14] border border-[#C8A45D]/30 text-xs text-[#F7F4EC] focus:border-[#C8A45D] focus:outline-none resize-none"
        />
        {errors.message && <p className="text-[11px] text-red-400 mt-1">{errors.message}</p>}
      </div>

      {/* File Attachment (Floorplan / Blueprint / Name List) */}
      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-[#E8D5A8]">
          Floorplan, Blueprint or Partner Name List (Optional, max 5MB)
        </label>
        
        {formData.attachmentName ? (
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#10152A] border border-[#C8A45D]/40 text-xs">
            <div className="flex items-center gap-2 text-[#F7F4EC] truncate pr-2">
              <FileText className="w-4 h-4 text-[#C8A45D] shrink-0" />
              <span className="truncate">{formData.attachmentName}</span>
            </div>
            <button
              type="button"
              onClick={removeAttachment}
              className="p-1 text-[#9EA3B5] hover:text-red-400 transition-colors cursor-pointer"
              title="Remove attachment"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.webp"
              onChange={handleFileChange}
              className="hidden"
              id="consultation-file-upload"
            />
            <label
              htmlFor="consultation-file-upload"
              className="flex items-center justify-center gap-2 w-full p-2.5 rounded-lg bg-[#080A14] border border-dashed border-[#C8A45D]/40 text-xs text-[#9EA3B5] hover:text-[#F7F4EC] hover:border-[#C8A45D] transition-colors cursor-pointer"
            >
              <Paperclip className="w-4 h-4 text-[#C8A45D]" />
              <span>Attach architectural layout, sketch, or documents</span>
            </label>
          </div>
        )}
        {errors.attachment && <p className="text-[11px] text-red-400">{errors.attachment}</p>}
      </div>

      {/* Submission CTA */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto flex-1 py-3 px-6 rounded-lg bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] hover:from-[#d8b56f] hover:to-[#f0e2be] text-[#080A14] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <span>Confirming Details...</span>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Confirm & Book Consultation</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleLaunchWhatsApp}
          className="w-full sm:w-auto py-3 px-4 rounded-lg bg-[#10152A] hover:bg-[#161f3d] border border-[#25D366]/40 text-[#25D366] text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
          <span>Prefer Direct WhatsApp</span>
        </button>
      </div>

      <div className="text-[10px] text-[#9EA3B5] text-center pt-1">
        🔒 All details are strictly confidential. We never share your data.
      </div>
    </form>
  );
};
