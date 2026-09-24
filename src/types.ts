export type ConsultationType =
  | 'Numerology'
  | 'Vastu'
  | 'Numerology + Vastu'
  | 'Business Consultation'
  | 'Other';

export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Consultation Scheduled'
  | 'Completed'
  | 'Closed';

export interface ConsultationLead {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  dateOfBirth?: string;
  cityCountry?: string;
  consultationType: ConsultationType;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
  attachmentName?: string;
  attachmentDataUrl?: string;
  timestamp: string;
  status: LeadStatus;
  source: string;
}

export interface NumerologyNumber {
  number: number;
  title: string;
  planet: string;
  element: string;
  keywords: string[];
  traditionalMeaning: string;
  strengths: string[];
  growthAreas: string[];
  luckyDays: string;
  luckyColors: string;
  gemstoneTradition: string;
}

export interface VastuZone {
  id: string;
  direction: string;
  code: 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';
  rulingDeity: string;
  element: string;
  nature: string;
  bestFor: string[];
  avoidFor: string[];
  practicalRemedy: string;
  description: string;
  degrees: string;
}

export interface ServiceItem {
  id: string;
  category: 'numerology' | 'vastu';
  title: string;
  tagline: string;
  description: string;
  whoItIsFor: string;
  requirements: string[];
  deliverables: string[];
  highlight: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  city: string;
  serviceCategory: 'Business Numerology' | 'Residential Vastu' | 'Career Guidance' | 'Brand Naming';
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'General' | 'Numerology' | 'Vastu' | 'Booking';
}
